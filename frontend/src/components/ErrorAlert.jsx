import { AlertCircle } from "lucide-react";

function ErrorAlert({ error }) {
  if (!error) return null;
  return (
    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-center">
        <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
        <p className="text-red-700">{error}</p>
      </div>
    </div>
  );
}

export default ErrorAlert;
