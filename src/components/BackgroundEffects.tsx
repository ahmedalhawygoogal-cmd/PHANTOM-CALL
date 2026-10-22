import React from 'react';

export const BackgroundEffects: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {/* Deep Navy Radial Gradients */}
      <div className="absolute inset-0 bg-[#040612]" />
      <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-gradient-to-b from-[#0e2a5c]/35 via-[#1a1245]/20 to-transparent blur-3xl rounded-full" />
      <div className="absolute top-[40%] -left-[10%] w-[450px] h-[450px] bg-[#00f2fe]/10 blur-[110px] rounded-full" />
      <div className="absolute top-[35%] -right-[10%] w-[450px] h-[450px] bg-[#9333ea]/15 blur-[120px] rounded-full" />
      <div className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-[#00f2fe]/12 blur-3xl rounded-full" />

      {/* Cyber Circuit Vector Overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="circuitGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="circuitGradPurple" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Top Right Circuit Traces */}
        <path d="M 320 0 L 320 120 L 380 180 L 480 180" stroke="url(#circuitGradCyan)" strokeWidth="1.2" fill="none" />
        <path d="M 360 40 L 410 90 L 480 90" stroke="url(#circuitGradCyan)" strokeWidth="1" fill="none" />
        <circle cx="380" cy="180" r="3" fill="#00f2fe" opacity="0.7" />
        <circle cx="410" cy="90" r="2.5" fill="#00f2fe" opacity="0.6" />

        {/* Left Side Circuit Traces */}
        <path d="M 0 260 L 60 260 L 110 310 L 110 420 L 70 460" stroke="url(#circuitGradPurple)" strokeWidth="1.2" fill="none" />
        <path d="M 20 220 L 80 220 L 130 270" stroke="url(#circuitGradCyan)" strokeWidth="1" fill="none" />
        <circle cx="110" cy="310" r="3" fill="#c084fc" opacity="0.7" />
        <circle cx="130" cy="270" r="2.5" fill="#00f2fe" opacity="0.6" />

        {/* Bottom Right Traces */}
        <path d="M 280 650 L 340 590 L 440 590 L 480 630" stroke="url(#circuitGradCyan)" strokeWidth="1.2" fill="none" />
        <circle cx="340" cy="590" r="3" fill="#00f2fe" opacity="0.7" />

        {/* Subtle grid pattern */}
        <pattern id="cyberGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00f2fe" strokeWidth="0.4" strokeOpacity="0.06" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#cyberGrid)" />
      </svg>

      {/* Atmospheric Dust / Glowing Particles */}
      <div className="absolute top-[22%] left-[18%] w-1.5 h-1.5 rounded-full bg-[#00f2fe] opacity-50 blur-[0.5px] animate-pulse" />
      <div className="absolute top-[28%] right-[22%] w-2 h-2 rounded-full bg-[#38bdf8] opacity-60 blur-[1px] animate-ping" style={{ animationDuration: '4s' }} />
      <div className="absolute top-[48%] left-[12%] w-2 h-2 rounded-full bg-[#a855f7] opacity-40 blur-[1px] animate-pulse" />
      <div className="absolute top-[62%] right-[15%] w-1.5 h-1.5 rounded-full bg-[#00f2fe] opacity-50 blur-[0.5px] animate-pulse" />
      <div className="absolute top-[75%] left-[28%] w-1.5 h-1.5 rounded-full bg-[#38bdf8] opacity-60" />
      <div className="absolute top-[82%] right-[30%] w-2 h-2 rounded-full bg-[#00f2fe] opacity-45 blur-[0.5px] animate-pulse" />
    </div>
  );
};
