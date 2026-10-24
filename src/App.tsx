/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plus, Home } from 'lucide-react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { CreateRoomModal } from './components/CreateRoomModal';
import { JoinRoomModal } from './components/JoinRoomModal';
import { CallView } from './components/CallView';
import { PWAInstallBanner } from './components/PWAInstallBanner';

interface ActiveRoom {
  code: string;
  type: string;
  displayName: string;
}

export default function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState<ActiveRoom | null>(null);

  // Handle room creation
  const handleStartCreatedRoom = (roomCode: string, roomType: string, displayName: string) => {
    setIsCreateModalOpen(false);
    setActiveRoom({
      code: roomCode,
      type: roomType,
      displayName,
    });
  };

  // Handle joining existing room
  const handleJoinExistingRoom = (roomCode: string, displayName: string) => {
    setIsJoinModalOpen(false);
    setActiveRoom({
      code: roomCode,
      type: 'غرفة صوتية',
      displayName,
    });
  };

  // Handle leaving the call
  const handleEndCall = () => {
    setActiveRoom(null);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#040612] text-white flex flex-col items-center justify-between overflow-x-hidden selection:bg-cyan-400 selection:text-black">
      {/* Background Cyber Sci-Fi Elements */}
      <BackgroundEffects />

      {/* Optional PWA Install Banner */}
      <PWAInstallBanner />

      {/* If in an active call, show the Call View with Jitsi Meet */}
      {activeRoom ? (
        <CallView
          key={activeRoom.code}
          roomCode={activeRoom.code}
          roomType={activeRoom.type}
          displayName={activeRoom.displayName}
          onEndCall={handleEndCall}
        />
      ) : (
        /* Main Application View - Exact Replica of Uploaded Design */
        <main className="relative z-10 w-full max-w-[440px] min-h-screen flex flex-col justify-between px-5 pt-8 pb-0 mx-auto select-none">
          {/* Top Logo Section */}
          <header className="w-full pt-4 pb-2 flex justify-center items-center">
            <img
              src="/logo.png"
              alt="Phantom Call Logo"
              className="h-16 w-auto object-contain mix-blend-screen drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-transform duration-300 hover:scale-105"
            />
          </header>

          {/* Center Main Action Buttons - ONLY TWO BUTTONS */}
          <section className="w-full flex-1 flex flex-col items-center justify-center gap-6 my-auto py-8">
            {/* 1. "إنشاء غرفة" (Create Room) - Purple Gradient with + Icon */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="group relative w-full h-[96px] sm:h-[104px] rounded-[32px] p-[2px] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0.5 active:scale-[0.98] focus:outline-none"
              aria-label="إنشاء غرفة"
            >
              {/* Outer Neon Glow */}
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 opacity-80 blur-xl group-hover:opacity-100 group-hover:blur-2xl transition-all duration-300" />

              {/* Main Button Surface */}
              <div className="relative w-full h-full rounded-[30px] bg-gradient-to-r from-[#6929f0] via-[#7d32f5] to-[#5a1cd6] border border-purple-300/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_0_35px_rgba(125,50,245,0.7)] flex items-center justify-center px-8 overflow-hidden">
                {/* Top specular glossy reflection line */}
                <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                {/* Inner flex layout matching mockup: [+] icon on the left, "إنشاء غرفة" on the right */}
                <div className="w-full flex items-center justify-center gap-5" dir="ltr">
                  {/* Plus Icon with soft glow */}
                  <div className="flex-shrink-0 flex items-center justify-center text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                    <Plus className="w-10 h-10 sm:w-11 sm:h-11 stroke-[3.5] text-white" />
                  </div>

                  {/* Arabic Text */}
                  <span 
                    className="font-bold text-[32px] sm:text-[36px] text-white tracking-wide leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                    dir="rtl"
                  >
                    إنشاء غرفة
                  </span>
                </div>
              </div>
            </button>

            {/* 2. "دخول غرفة" (Join Room) - Cyan Outline with Enter Icon */}
            <button
              onClick={() => setIsJoinModalOpen(true)}
              className="group relative w-full h-[96px] sm:h-[104px] rounded-[32px] p-[2px] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0.5 active:scale-[0.98] focus:outline-none"
              aria-label="دخول غرفة"
            >
              {/* Outer Cyan Neon Glow */}
              <div className="absolute inset-0 rounded-[32px] bg-[#00f2fe] opacity-30 blur-xl group-hover:opacity-60 group-hover:blur-2xl transition-all duration-300" />

              {/* Main Button Surface */}
              <div className="relative w-full h-full rounded-[30px] bg-[#061129]/85 backdrop-blur-md border-[2.5px] border-[#00f2fe] shadow-[0_0_25px_rgba(0,242,254,0.4),inset_0_0_18px_rgba(0,242,254,0.12)] flex items-center justify-center px-8 overflow-hidden">
                {/* Inner flex layout matching mockup: Enter icon on the left, "دخول غرفة" on the right */}
                <div className="w-full flex items-center justify-center gap-5" dir="ltr">
                  {/* Cyan Door / Portal Enter Icon matching mockup */}
                  <div className="flex-shrink-0 flex items-center justify-center text-[#00f2fe] filter drop-shadow-[0_0_10px_rgba(0,242,254,0.85)]">
                    <svg
                      width="38"
                      height="46"
                      viewBox="0 0 42 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-9 h-11 sm:w-10 sm:h-12"
                    >
                      {/* Device / Door outline */}
                      <rect
                        x="3"
                        y="3"
                        width="28"
                        height="44"
                        rx="6"
                        stroke="#00f2fe"
                        strokeWidth="3.5"
                      />
                      {/* Inner entrance triangle / arrow pointing inside door */}
                      <path
                        d="M31 16 L17 25 L31 34 Z"
                        fill="#00f2fe"
                      />
                      {/* Small camera/speaker indicator */}
                      <circle cx="17" cy="9" r="1.5" fill="#00f2fe" />
                    </svg>
                  </div>

                  {/* Arabic Text with Neon Glow */}
                  <span 
                    className="font-bold text-[32px] sm:text-[36px] text-[#00f2fe] tracking-wide leading-none drop-shadow-[0_0_14px_rgba(0,242,254,0.7)] text-glow-cyan"
                    dir="rtl"
                  >
                    دخول غرفة
                  </span>
                </div>
              </div>
            </button>
          </section>

          {/* Bottom Navigation Dock: EXACTLY 1 ICON ("الرئيسية" Home) */}
          <footer className="w-full relative mt-auto pt-4 pb-6 flex justify-center">
            {/* Futuristic Angular / Beveled Dock Shape */}
            <div className="relative w-full max-w-[380px] flex justify-center">
              {/* Sci-fi trapezoid dock frame */}
              <div className="relative w-full flex flex-col items-center">
                {/* Angular Top Bevel Line */}
                <div className="w-full flex justify-center">
                  <div 
                    className="w-full h-[68px] rounded-t-[36px] bg-gradient-to-t from-[#060c24] to-[#0a1438] border-t border-x border-cyan-500/30 shadow-[0_-8px_30px_rgba(0,0,0,0.7)] flex flex-col items-center justify-center pt-2"
                  >
                    {/* Active Tab: Home (Only 1 Tab) */}
                    <div className="flex flex-col items-center justify-center cursor-pointer group">
                      {/* Cyan Glowing Home Icon */}
                      <div className="relative flex items-center justify-center text-[#00f2fe] filter drop-shadow-[0_0_8px_rgba(0,242,254,0.9)]">
                        <Home className="w-7 h-7 fill-[#00f2fe] stroke-[#00f2fe] stroke-[1.5]" />
                      </div>

                      {/* Arabic Label: "الرئيسية" */}
                      <span className="font-bold text-sm text-[#00f2fe] mt-0.5 tracking-wide drop-shadow-[0_0_8px_rgba(0,242,254,0.7)]">
                        الرئيسية
                      </span>

                      {/* English Label: "Home" */}
                      <span className="font-rajdhani font-semibold text-[11px] text-cyan-300/70 -mt-0.5 tracking-wider">
                        Home
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>

          {/* Modals */}
          <CreateRoomModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onStartRoom={handleStartCreatedRoom}
          />

          <JoinRoomModal
            isOpen={isJoinModalOpen}
            onClose={() => setIsJoinModalOpen(false)}
            onJoinRoom={handleJoinExistingRoom}
          />
        </main>
      )}
    </div>
  );
}
