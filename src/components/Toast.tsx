import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Toast: React.FC = () => {
  const { toast } = useStore();

  if (!toast) return null;

  return (
    <div className="fixed bottom-18 lg:bottom-6 right-4 sm:right-6 z-50 animate-in slide-in-from-bottom-3 duration-200">
      <div className="px-4 py-3 rounded-2xl bg-neutral-900 text-white border border-neutral-700 shadow-2xl flex items-center gap-2.5 text-xs font-semibold max-w-sm">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="leading-snug">{toast}</span>
      </div>
    </div>
  );
};
