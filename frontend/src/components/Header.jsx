import { EyeOff } from "lucide-react";

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <EyeOff className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">PII Masking Tool</h1>
            <p className="text-slate-600">
              Automatically detect and mask personally identifiable information in images
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
