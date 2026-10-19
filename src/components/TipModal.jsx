import React, { useState, useEffect } from 'react';
import { Coffee, X, ExternalLink } from 'lucide-react';

export default function TipModal({ isOpen: controlledIsOpen, onClose: controlledOnClose }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen);
    }
  }, [controlledIsOpen]);

  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener('open-tip-modal', handleOpenEvent);
    return () => window.removeEventListener('open-tip-modal', handleOpenEvent);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (controlledOnClose) controlledOnClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tip-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all flex flex-col">
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 h-2 w-full shrink-0" />

        <div className="p-5 sm:p-6">
          {/* Top Bar with Title and Close Button */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-amber-50 text-amber-700 rounded-xl">
                <Coffee className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h3 id="tip-modal-title" className="text-base sm:text-lg font-bold text-slate-900">
                  Support the Developer
                </h3>
                <p className="text-xs text-slate-500">
                  Support calculatecgpa.github.io
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="py-4 space-y-4 text-slate-600 text-xs sm:text-sm">
            <p className="leading-relaxed">
              <strong>calculatecgpa.github.io</strong> is 100% free, private, and ad-free. If this calculator helped you with your semester or cumulative grades, consider supporting on Ko-fi to help cover hosting and maintenance!
            </p>

            {/* Ko-fi Link Card */}
            <a
              href="https://ko-fi.com/kishara"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl border-2 border-amber-300 bg-amber-50 hover:bg-amber-100 transition-all group shadow-sm hover:shadow-md cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-black shadow-2xs">
                  <Coffee className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-amber-950">
                    Support on Ko-fi
                  </div>
                  <div className="text-xs text-amber-800 font-medium">
                    ko-fi.com/kishara
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-950 bg-amber-300 group-hover:bg-amber-400 px-3.5 py-2 rounded-xl transition-colors shrink-0">
                <span>Support</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          </div>

          {/* Footer Note */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Thank you for your support! ☕✨
            </span>
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
