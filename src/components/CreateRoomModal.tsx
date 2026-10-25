import React, { useState, useEffect } from 'react';
import { Plus, X, Shield, Swords, Gamepad2, Trophy, Sparkles, User, Copy, Check, RefreshCw } from 'lucide-react';
import { generateRandomRoomCode } from '../utils/roomCode';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartRoom: (roomCode: string, roomType: string, displayName: string) => void;
  initialRoomCode?: string;
}

export type RoomTypeKey = 'scrims' | 'ranked' | 'casual' | 'tournament';

interface RoomTypeOption {
  key: RoomTypeKey;
  titleAr: string;
  titleEn: string;
  desc: string;
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
}

const ROOM_TYPES: RoomTypeOption[] = [
  {
    key: 'scrims',
    titleAr: 'سكرمز (Scrims)',
    titleEn: 'Team Scrims',
    desc: 'مباريات تدريبية وتنسيق بين الكلانات والفرق',
    icon: <Swords className="w-5 h-5 text-purple-300" />,
    gradient: 'from-purple-900/40 to-indigo-900/40',
    borderColor: 'border-purple-500/50',
  },
  {
    key: 'ranked',
    titleAr: 'رانكد (Ranked)',
    titleEn: 'Ranked Match',
    desc: 'مكالمات تنافسية هادئة وسريعة بدون تشويش',
    icon: <Shield className="w-5 h-5 text-cyan-300" />,
    gradient: 'from-cyan-950/40 to-blue-900/40',
    borderColor: 'border-cyan-500/50',
  },
  {
    key: 'casual',
    titleAr: 'كاجوال (Casual)',
    titleEn: 'Casual Play',
    desc: 'لعب خفيف مع الأصدقاء وسوالف جيمرز',
    icon: <Gamepad2 className="w-5 h-5 text-emerald-300" />,
    gradient: 'from-emerald-950/40 to-teal-900/40',
    borderColor: 'border-emerald-500/50',
  },
  {
    key: 'tournament',
    titleAr: 'بطولات (Tournament)',
    titleEn: 'Championship',
    desc: 'غرف صوتية مخصصة للنهائيات والبطولات الرسمية',
    icon: <Trophy className="w-5 h-5 text-amber-300" />,
    gradient: 'from-amber-950/40 to-orange-900/40',
    borderColor: 'border-amber-500/50',
  },
];

export const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  isOpen,
  onClose,
  onStartRoom,
  initialRoomCode,
}) => {
  const [selectedType, setSelectedType] = useState<RoomTypeKey>('scrims');
  const [displayName, setDisplayName] = useState('');
  const [generatedCode, setGeneratedCode] = useState(() => initialRoomCode || generateRandomRoomCode());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setGeneratedCode(initialRoomCode || generateRandomRoomCode());
    setCopied(false);
  }, [isOpen, initialRoomCode]);

  if (!isOpen) return null;

  const currentOption = ROOM_TYPES.find((t) => t.key === selectedType) || ROOM_TYPES[0];

  const handleCopyCode = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRegenerateCode = (e: React.MouseEvent) => {
    e.preventDefault();
    setGeneratedCode(generateRandomRoomCode());
    setCopied(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = displayName.trim() || `Player-${Math.floor(100 + Math.random() * 900)}`;
    onStartRoom(generatedCode, currentOption.titleAr, finalName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-[#090e24] border border-purple-500/30 p-6 md:p-8 shadow-[0_0_50px_rgba(147,51,234,0.35)] overflow-hidden"
        dir="rtl"
      >
        {/* Subtle decorative glow */}
        <div className="absolute -top-20 -left-20 w-44 h-44 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-44 h-44 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

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
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-[0_0_20px_rgba(147,51,234,0.5)] mb-3">
            <Plus className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-wide">إنشاء غرفة جديدة</h2>
          <p className="text-sm text-gray-400 mt-1">كود الغرفة يتم توليده عشوائياً ويمكنك نسخه ومشاركته</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Room Type Selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2.5">
              نوع الغرفة (Room Type)
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {ROOM_TYPES.map((type) => {
                const isSelected = selectedType === type.key;
                return (
                  <button
                    key={type.key}
                    type="button"
                    onClick={() => setSelectedType(type.key)}
                    className={`relative text-right p-3 rounded-2xl border transition-all duration-200 flex flex-col gap-1.5 ${
                      isSelected
                        ? `bg-gradient-to-br ${type.gradient} ${type.borderColor} ring-2 ring-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]`
                        : 'bg-[#0d1433]/70 border-white/5 hover:border-white/20 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-1.5 rounded-lg bg-black/30">{type.icon}</div>
                      {isSelected && (
                        <span className="text-[10px] font-semibold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30">
                          محدد
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{type.titleAr}</div>
                      <div className="text-[11px] text-gray-400 leading-snug line-clamp-1">{type.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
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
                placeholder="مثال: PhantomGhost"
                maxLength={25}
                className="w-full rounded-2xl bg-[#0c122e] border border-white/10 px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-right pr-11"
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Generated Dynamic Code Display with 1-Click Copy and Regenerate */}
          <div className="rounded-2xl bg-[#060a1c] border border-cyan-500/40 p-4 space-y-2.5 shadow-[inset_0_0_15px_rgba(0,242,254,0.1)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>كود الغرفة العشوائي الخاص بك:</span>
              </span>
              <button
                type="button"
                onClick={handleRegenerateCode}
                className="text-gray-400 hover:text-cyan-300 flex items-center gap-1 text-[11px] transition-colors"
                title="توليد كود آخر"
              >
                <RefreshCw className="w-3 h-3" />
                <span>كود جديد</span>
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 bg-[#0a122e] px-4 py-3 rounded-xl border border-white/10">
              <span className="font-rajdhani font-bold text-xl text-cyan-300 tracking-widest select-all">
                {generatedCode}
              </span>

              <button
                type="button"
                onClick={handleCopyCode}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  copied
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 active:scale-95'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ الكود</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-gray-400">
              {copied ? '✅ تم نسخ الكود، يمكنك إرساله لأصدقائك للانضمام فوراً.' : '💡 شارك هذا الكود مع أصدقائك ليدخلوا لنفس الغرفة معك.'}
            </p>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(147,51,234,0.6)] border border-purple-300/40 transition-all duration-200 transform active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>دخول الغرفة وبدء المكالمة</span>
          </button>
        </form>
      </div>
    </div>
  );
};
