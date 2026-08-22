import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ToastNotification: React.FC = () => {
  const { toast } = useShop();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-none">
      <div className="flex items-center gap-3 px-4 py-3 bg-[#292725] text-[#FCFAF7] rounded-xl shadow-xl border border-[#817870]/40 max-w-sm pointer-events-auto">
        {toast.type === 'success' ? (
          <CheckCircle2 className="w-4 h-4 text-[#D8CEC3] shrink-0" />
        ) : (
          <Info className="w-4 h-4 text-[#D8CEC3] shrink-0" />
        )}
        <span className="text-xs font-medium font-sans-body leading-snug">
          {toast.message}
        </span>
      </div>
    </div>
  );
};
