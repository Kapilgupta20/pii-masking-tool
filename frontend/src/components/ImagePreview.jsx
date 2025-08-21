function ImagePreview({ uploadedImage }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Original Image</h3>
      </div>
      <div className="p-6">
        <img
          src={uploadedImage.url}
          alt="Original"
          className="w-full h-auto max-h-96 object-contain rounded-lg border border-gray-200"
        />
        <p className="text-sm text-gray-500 mt-3">File: {uploadedImage.file.name}</p>
      </div>
    </div>
  );
}

export default ImagePreview;
