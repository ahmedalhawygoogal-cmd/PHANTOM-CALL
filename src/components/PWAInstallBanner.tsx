import React, { useState } from 'react';
import { Download, X, Share, PlusSquare } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (isInstalled || dismissed) {
    return null;
  }

  if (!isInstallable && !isIOS) {
    return null;
  }

  return (
    <>
      <div 
        className="fixed top-3 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-sm rounded-2xl bg-[#0b1330]/90 backdrop-blur-md border border-cyan-500/40 px-3.5 py-2.5 shadow-[0_0_20px_rgba(0,242,254,0.25)] flex items-center justify-between gap-3 text-right"
        dir="rtl"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 flex-shrink-0 shadow-[0_0_10px_rgba(0,242,254,0.3)]">
            <Download className="w-4 h-4" />
          </div>
          <div className="truncate">
            <div className="text-xs font-bold text-white truncate">تثبيت Phantom Call</div>
            <div className="text-[10px] text-gray-400 truncate">تطبيق سريع ومستقل على الهاتف</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {isInstallable && (
            <button
              onClick={install}
              className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#050814] font-bold text-xs shadow-[0_0_12px_rgba(0,242,254,0.5)] transition-all active:scale-95"
            >
              تثبيت
            </button>
          )}

          {isIOS && (
            <button
              onClick={() => setShowIOSGuide(true)}
              className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 font-bold text-xs transition-all active:scale-95"
            >
              تثبيت iOS
            </button>
          )}

          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-lg text-gray-400 hover:text-white"
            aria-label="إغلاق"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* iOS Installation Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" dir="rtl">
          <div className="relative w-full max-w-xs rounded-3xl bg-[#090f26] border border-cyan-500/40 p-6 shadow-2xl text-center">
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 left-4 p-1.5 rounded-xl text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 mx-auto mb-3 shadow-[0_0_20px_rgba(0,242,254,0.3)]">
              <Download className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-white mb-2">تثبيت على iPhone / iPad</h3>
            <div className="space-y-3 text-right text-xs text-gray-300 my-4 bg-[#05091a] p-3.5 rounded-2xl border border-white/5">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                  1
                </span>
                <p>
                  اضغط على زر المشاركة <Share className="w-3.5 h-3.5 inline mx-1 text-cyan-400" /> في متصفح Safari.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                  2
                </span>
                <p>
                  مرر للأسفل واختر <span className="text-white font-bold">إضافة إلى الشاشة الرئيسية (Add to Home Screen)</span> <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-cyan-400" />.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 rounded-xl bg-cyan-500 text-[#050814] font-bold text-sm shadow-[0_0_15px_rgba(0,242,254,0.4)]"
            >
              تم الفهم
            </button>
          </div>
        </div>
      )}
    </>
  );
};
