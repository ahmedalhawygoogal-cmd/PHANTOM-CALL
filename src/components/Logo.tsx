import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const heightClass = size === 'sm' ? 'h-12' : size === 'lg' ? 'h-20' : 'h-16';

  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <img
        src="/logo.png"
        alt="Phantom Call Logo"
        className={`${heightClass} w-auto object-contain p-2 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-transform duration-300 hover:scale-105`}
      />
    </div>
  );
};
