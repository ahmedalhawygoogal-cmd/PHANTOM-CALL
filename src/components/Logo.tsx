import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.25 : 1;

  return (
    <div className={`flex items-center justify-center select-none ${className}`} dir="ltr">
      <div 
        className="flex items-center gap-3.5 transition-transform duration-300 hover:scale-105"
        style={{ transform: `scale(${scale})` }}
      >
        {/* PC Icon Mark */}
        <div className="relative flex items-center">
          <svg
            width="96"
            height="72"
            viewBox="0 0 130 95"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_0_12px_rgba(0,242,254,0.35)]"
          >
            <defs>
              <linearGradient id="pGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0062d2" />
                <stop offset="50%" stopColor="#0047ba" />
                <stop offset="100%" stopColor="#00358e" />
              </linearGradient>
              <linearGradient id="cGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38e1ff" />
                <stop offset="50%" stopColor="#00f2fe" />
                <stop offset="100%" stopColor="#00c4dd" />
              </linearGradient>
              <filter id="cReceiverGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Letter P */}
            <path
              d="M10 12 H48 C63 12 74 23 74 38 C74 53 63 64 48 64 H29 V86 H10 V12 Z M29 30 V46 H46 C52 46 56 42 56 38 C56 34 52 30 46 30 H29 Z"
              fill="url(#pGradient)"
            />

            {/* Letter C styled as Phone Receiver */}
            <g filter="url(#cReceiverGlow)">
              <path
                d="M104 18 
                   C124 28 135 48 130 70 
                   C125 90 102 101 82 94 
                   C70 89 62 82 56 72 
                   L71 61 
                   C75 67 82 72 90 74 
                   C102 78 116 71 118 56 
                   C121 42 112 28 97 22 
                   C91 20 86 20 80 23 
                   L71 8 
                   C81 4 92 6 104 18 Z"
                fill="url(#cGradient)"
              />
              {/* Receiver Cutout Lines */}
              <line x1="91" y1="13" x2="109" y2="28" stroke="#050814" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="63" y1="67" x2="80" y2="82" stroke="#050814" strokeWidth="3.5" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        {/* Brand Text Stack */}
        <div className="flex flex-col items-start justify-center">
          <span className="font-rajdhani font-bold text-[32px] leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Phantom
          </span>
          <div className="relative">
            <span className="font-rajdhani font-bold text-[32px] leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Call
            </span>
            <div className="mt-1 h-[3.5px] w-full rounded-full bg-gradient-to-r from-[#00f2fe] to-[#00c4dd] shadow-[0_0_8px_#00f2fe]" />
          </div>
        </div>
      </div>
    </div>
  );
};
