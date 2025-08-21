import { Upload } from "lucide-react";

function UploadArea({ handleDrag, handleDrop, dragActive, fileInputRef, handleFileSelect }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Upload Image for PII Detection</h2>
        <p className="text-slate-600">Support for JPG, PNG, and other common image formats</p>
      </div>

      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
          dragActive
            ? "border-blue-400 bg-blue-50"
            : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-blue-100 rounded-full">
            <Upload className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-lg font-medium text-slate-900 mb-1">
            Drag and drop your image here
          </p>
          <p className="text-slate-500">or click to browse files</p>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium cursor-pointer"
          >
            Choose File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default UploadArea;
