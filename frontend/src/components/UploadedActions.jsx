import { CheckCircle, Download } from "lucide-react";

function UploadedActions({ isProcessing, maskedResult, processImage, downloadMaskedImage, resetApp }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Image Uploaded Successfully</h3>
            <p className="text-slate-600">Ready for PII detection and masking</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {!isProcessing && !maskedResult && (
            <button
              onClick={processImage}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium cursor-pointer"
            >
              Process Image
            </button>
          )}
          {maskedResult && (
            <button
              onClick={downloadMaskedImage}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 cursor-pointer"
            >
              <Download className="w-5 h-5" />
              <span>Download</span>
            </button>
          )}
          <button
            onClick={resetApp}
            className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200 font-medium cursor-pointer"
          >
            Upload New
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadedActions;
