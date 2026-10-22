import React, { useState } from 'react';
import { LogIn, X, Clipboard, User, Hash, AlertCircle } from 'lucide-react';

interface JoinRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinRoom: (roomCode: string, displayName: string) => void;
}

export const JoinRoomModal: React.FC<JoinRoomModalProps> = ({
  isOpen,
  onClose,
  onJoinRoom,
}) => {
  const [roomCode, setRoomCode] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setRoomCode(text.trim().toUpperCase());
        setError('');
      }
    } catch {
      // Fallback if permission blocked
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedCode = roomCode.trim().toUpperCase();
    if (!cleanedCode) {
      setError('يرجى إدخال كود الغرفة');
      return;
    }
    if (cleanedCode.length < 3) {
      setError('كود الغرفة قصير جداً');
      return;
    }

    const finalName = displayName.trim() || `Player-${Math.floor(100 + Math.random() * 900)}`;
    onJoinRoom(cleanedCode, finalName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-[#090e24] border border-cyan-500/40 p-6 md:p-8 shadow-[0_0_50px_rgba(0,242,254,0.3)] overflow-hidden"
        dir="rtl"
      >
        {/* Glows */}
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-44 h-44 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0a1b38] border-2 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,242,254,0.5)] mb-3">
            <LogIn className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-wide">دخول غرفة موجودة</h2>
          <p className="text-sm text-gray-400 mt-1">أدخل كود الغرفة الذي أرسله لك صديقك أو قائد الفريق</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Room Code Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                كود الغرفة (Room Code)
              </label>
              <button
                type="button"
                onClick={handlePaste}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span>لصق الكود</span>
              </button>
            </div>
            
            <div className="relative">
              <input
                type="text"
                value={roomCode}
                onChange={(e) => {
                  setRoomCode(e.target.value.toUpperCase());
                  setError('');
                }}
                placeholder="مثال: PHANTOM-SCRIM-8492"
                className="w-full rounded-2xl bg-[#0c122e] border border-cyan-500/40 px-4 py-3.5 text-cyan-300 placeholder-gray-500 font-rajdhani font-bold text-lg tracking-wider focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 shadow-[inset_0_0_15px_rgba(0,242,254,0.1)] transition-all text-right pr-11"
                autoFocus
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-cyan-400">
                <Hash className="w-4 h-4" />
              </div>
            </div>

            {error && (
              <div className="mt-2 text-xs text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Nickname / Display Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2 flex items-center justify-between">
              <span>اسمك في المكالمة (اختياري)</span>
              <span className="text-gray-500 text-[11px]">Display Name</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="مثال: PhantomGuest"
                maxLength={25}
                className="w-full rounded-2xl bg-[#0c122e] border border-white/10 px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-right pr-11"
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Quick Examples */}
          <div className="p-3 rounded-2xl bg-[#070b1e] border border-white/5">
            <span className="text-[11px] text-gray-400 block mb-1.5">أو جرب غرفة تجريبية سريعة:</span>
            <div className="flex flex-wrap gap-2">
              {['PHANTOM-SCRIMS-PUBG', 'PHANTOM-VALORANT-WAR', 'PHANTOM-COD-ARENA'].map((demoCode) => (
                <button
                  key={demoCode}
                  type="button"
                  onClick={() => {
                    setRoomCode(demoCode);
                    setError('');
                  }}
                  className="text-[11px] font-rajdhani font-semibold text-gray-300 bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 px-2.5 py-1 rounded-lg border border-white/10 transition-colors"
                >
                  {demoCode}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl font-bold text-base text-cyan-200 bg-[#071633] border-2 border-cyan-400 hover:bg-[#0c2452] shadow-[0_0_25px_rgba(0,242,254,0.45)] transition-all duration-200 transform active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5 stroke-[2.5]" />
            <span>انضمام للغرفة الآن</span>
          </button>
        </form>
      </div>
    </div>
  );
};
