import { Loader2, Image as ImageIcon, CheckCircle } from "lucide-react";

function MaskedImage({ isProcessing, maskedResult }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
          <span>Masked Image</span>
          {maskedResult && <CheckCircle className="w-5 h-5 text-green-500" />}
        </h3>
      </div>
      <div className="p-6">
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center h-96 space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
            <p className="text-gray-600">Processing your image...</p>
            <div className="w-64 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full animate-pulse"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>
        ) : maskedResult ? (
          <>
            <img
              src={maskedResult.url}
              alt="Masked"
              className="w-full h-auto max-h-96 object-contain rounded-lg border border-gray-200"
            />
            <p className="text-sm text-green-600 mt-3 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              PII successfully masked
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 space-y-4 text-gray-400">
            <ImageIcon className="w-16 h-16" />
            <p>Masked image will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MaskedImage;
