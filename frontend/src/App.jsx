import { useState, useRef } from "react";
import Header from "./components/Header";
import UploadArea from "./components/UploadArea";
import ErrorAlert from "./components/ErrorAlert";
import UploadedActions from "./components/UploadedActions";
import ImagePreview from "./components/ImagePreview";
import MaskedImage from "./components/MaskedImage";
import { validateImage, createDownloadLink } from "./utils/imageUtils";

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [maskedResult, setMaskedResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleImageUpload = (file) => {
    const validationError = validateImage(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setMaskedResult(null);
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage({ file, url: imageUrl });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const processImage = async () => {
    if (!uploadedImage) return;
    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", uploadedImage.file);

      const response = await fetch("http://localhost:8000/redact-image/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const blob = await response.blob();
      const maskedImageUrl = URL.createObjectURL(blob);
      setMaskedResult({ url: maskedImageUrl, blob });
    } catch (err) {
      setError("Failed to process image. Please try again or check your backend connection.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadMaskedImage = () => {
    if (maskedResult) {
      createDownloadLink(
        maskedResult.url,
        `masked_${uploadedImage?.file.name || "image.jpg"}`
      );
    }
  };

  const resetApp = () => {
    if (uploadedImage) URL.revokeObjectURL(uploadedImage.url);
    if (maskedResult) URL.revokeObjectURL(maskedResult.url);
    setUploadedImage(null);
    setMaskedResult(null);
    setError(null);
    setIsProcessing(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {!uploadedImage && (
          <UploadArea
            handleDrag={handleDrag}
            handleDrop={handleDrop}
            dragActive={dragActive}
            fileInputRef={fileInputRef}
            handleFileSelect={handleFileSelect}
          />
        )}
        <ErrorAlert error={error} />
        {uploadedImage && (
          <div className="space-y-6">
            <UploadedActions
              isProcessing={isProcessing}
              maskedResult={maskedResult}
              processImage={processImage}
              downloadMaskedImage={downloadMaskedImage}
              resetApp={resetApp}
            />
            <div className="grid md:grid-cols-2 gap-6">
              <ImagePreview uploadedImage={uploadedImage} />
              <MaskedImage isProcessing={isProcessing} maskedResult={maskedResult} />
            </div>
          </div>
        )}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Your images are processed securely. Original files are not stored permanently.</p>
        </div>
      </main>
    </div>
  );
}

export default App;
