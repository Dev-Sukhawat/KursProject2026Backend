import React from 'react';
import { AlertTriangle, X, Loader2 } from 'lucide-react';

export const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Are you sure?", 
  description = "This action cannot be undone. Please confirm to proceed.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger", // Options: "danger" or "warning"
  isLoading = false
}) => {
  if (!isOpen) return null;

  // Configuration based on variant
  const isDanger = variant === "danger";
  const iconColor = isDanger ? "text-red-600" : "text-amber-600";
  const iconBg = isDanger ? "bg-red-100" : "bg-amber-100";
  const btnBg = isDanger 
    ? "bg-red-600 hover:bg-red-700 focus:ring-red-500" 
    : "bg-amber-600 hover:bg-amber-700 focus:ring-amber-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200 relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Close button (X) */}
        <button 
          onClick={onClose}
          disabled={isLoading}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 ${iconBg} rounded-full`}>
            <AlertTriangle className={`w-6 h-6 ${iconColor}`} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors order-2 sm:order-1 disabled:opacity-50"
          >
            {cancelText}
          </button>
          
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-4 py-2.5 ${btnBg} text-white font-medium rounded-xl transition-all shadow-sm order-1 sm:order-2 flex items-center justify-center gap-2 focus:ring-2 focus:ring-offset-2 disabled:opacity-70`}
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};