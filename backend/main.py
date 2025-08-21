import io
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError
from presidio_image_redactor import ImageRedactorEngine

# Initialize and return the ImageRedactorEngine.
def get_image_redactor_engine() -> ImageRedactorEngine:
    try:
        return ImageRedactorEngine()
    except Exception:
        raise RuntimeError(
            "ImageRedactorEngine could not be initialized. "
            "Please check your installation and ensure all dependencies are met. "
            "Also run: python -m spacy download en_core_web_lg"
        )

# Validate that the uploaded file is an image.
def validate_image_upload(file: UploadFile) -> None:
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image.")

# Open an image from bytes. Raises HTTPException if the image is invalid.
def open_image_from_bytes(image_bytes: bytes) -> Image.Image:
    try:
        return Image.open(io.BytesIO(image_bytes))
    except (UnidentifiedImageError, Exception):
        raise HTTPException(
            status_code=400,
            detail="Unable to open the image file. It may be corrupted or in an unsupported format."
        )

# Redact PII from the image and return a BytesIO stream of the redacted image in PNG format.
def redact_image(image: Image.Image, engine: ImageRedactorEngine, box_color: tuple = (0, 0, 0)) -> io.BytesIO:
    redacted_image = engine.redact(image, box_color)
    img_byte_arr = io.BytesIO()
    redacted_image.save(img_byte_arr, format="PNG")
    img_byte_arr.seek(0)
    return img_byte_arr


# FastAPI App Factory
def create_app() -> FastAPI:
    app = FastAPI(
        title="PII Redaction API",
        description="Upload an image to detect and redact Personally Identifiable Information (PII)."
    )
    
    # CORS configuration
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Initialize the PII redaction engine at startup.
    @app.on_event("startup")
    async def startup_event() -> None:
        app.state.engine = get_image_redactor_engine()

    # Accept an image file, detect and redact PII, and return the processed image.
    @app.post("/redact-image/", response_class=StreamingResponse)
    async def redact_image_endpoint(file: UploadFile = File(...)) -> StreamingResponse:
        validate_image_upload(file)
        image_bytes = await file.read()
        image = open_image_from_bytes(image_bytes)
        engine = app.state.engine
        img_byte_arr = redact_image(image, engine)
        return StreamingResponse(img_byte_arr, media_type="image/png")

    @app.get("/")
    def read_root() -> dict[str, str]:
        return {
            "message": "Welcome to the PII Redaction API. Please use the /docs endpoint for more information."
        }

    return app


app = create_app()
