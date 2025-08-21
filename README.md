# PII Masking Tool

A web application for detecting and masking Personally Identifiable Information (PII) in images. Built with a React frontend (Vite) and a Python backend.

## Tech Stack

- **Frontend:** React, Vite, JavaScript
- **Backend:** Python, FastAPI
- **PII Detection & Masking:** Microsoft Presidio (presidio-image-redactor)
- **Image Processing:** Pillow

## Features

- Upload images containing PII
- Automatic detection and masking of PII in images
- Preview masked images before downloading
- User-friendly drag-and-drop interface
- Download masked images securely


## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- Python 3.8+
- pip

### Backend Dependencies

- [presidio-image-redactor](https://github.com/microsoft/presidio)
- [spaCy](https://spacy.io/) with the `en_core_web_lg` model

### Backend Setup

1. Install Tesseract OCR (required by presidio-image-redactor):
	- **Windows:** Download and install from [Tesseract at UB Mannheim](https://github.com/UB-Mannheim/tesseract/wiki). Add the installation path (e.g., `C:\Program Files\Tesseract-OCR`) to your system's PATH environment variable.
	- **macOS:** `brew install tesseract`
	- **Linux (Debian/Ubuntu):** `sudo apt-get install tesseract-ocr`

2. Navigate to the backend directory:
	```sh
	cd backend
	```
3. Install dependencies:
	```sh
	pip install fastapi uvicorn pillow presidio-image-redactor spacy
	```
4. Download the required spaCy model:
	```sh
	python -m spacy download en_core_web_lg
	```
5. Run the backend server:
	```sh
	uvicorn main:app --reload
	```

### Frontend Setup

1. Navigate to the frontend directory:
	```sh
	cd frontend
	```
2. Install dependencies:
	```sh
	npm install
	```
3. Start the development server:
	```sh
	npm run dev
	```
4. Open your browser and go to the URL shown in the terminal (usually `http://localhost:5173`).

## Usage

1. Open the frontend in your browser.
2. Upload an image containing PII.
3. The backend will process and mask PII in the image.
4. Preview and download the masked image.


## About Presidio

This project uses [Microsoft Presidio](https://github.com/microsoft/presidio), an open-source framework for detecting and anonymizing PII. The backend leverages the `presidio-image-redactor` library to automatically detect and mask sensitive information in images. The spaCy NLP model (`en_core_web_lg`) is required for entity recognition.
