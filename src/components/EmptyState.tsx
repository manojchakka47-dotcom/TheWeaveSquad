import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ElementType;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon = AlertCircle
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 my-6">
      <div className="w-14 h-14 rounded-full bg-cyan-950/60 border border-[#00F0FF]/30 flex items-center justify-center mb-4 text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.2)]">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-mono">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-slate-300 max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-900 to-slate-900 border border-[#00F0FF]/50 text-[#00F0FF] font-semibold text-sm hover:border-[#00F0FF] hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};
