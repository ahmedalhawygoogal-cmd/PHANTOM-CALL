import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { PhoneOff, Copy, Check, MicOff, Shield, Radio, Volume2, AlertCircle } from 'lucide-react';
import { toJitsiRoomName } from '../utils/roomCode';

interface CallViewProps {
  roomCode: string;
  roomType?: string;
  displayName: string;
  onEndCall: () => void;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    JitsiMeetExternalAPI: any;
  }
}

export const CallView: React.FC<CallViewProps> = ({
  roomCode,
  roomType = 'غرفة عامة',
  displayName,
  onEndCall,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jitsiApiRef = useRef<any>(null);

  const [copied, setCopied] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [micPermission, setMicPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [isLoading, setIsLoading] = useState(true);
  const [useIframeFallback, setUseIframeFallback] = useState(false);

  const sanitizedRoom = useMemo(() => toJitsiRoomName(roomCode), [roomCode]);

  // Call duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Safe exit handler
  const handleExitCall = useCallback(() => {
    if (jitsiApiRef.current) {
      try {
        jitsiApiRef.current.executeCommand('hangup');
        jitsiApiRef.current.dispose();
      } catch (err) {
        console.warn('Jitsi dispose error:', err);
      }
      jitsiApiRef.current = null;
    }
    onEndCall();
  }, [onEndCall]);

  // Request & check audio permission
  useEffect(() => {
    const requestAudioPermission = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          setMicPermission('granted');
          // Free initial test stream tracks
          stream.getTracks().forEach((track) => track.stop());
        }
      } catch (err) {
        console.warn('Microphone permission error:', err);
        setMicPermission('denied');
      }
    };

    requestAudioPermission();
  }, []);

  // Initialize Jitsi Meet External API or fallback
  useEffect(() => {
    let scriptElement: HTMLScriptElement | null = null;
    let isCancelled = false;

    const initJitsi = () => {
      if (isCancelled || !containerRef.current) return;

      if (!window.JitsiMeetExternalAPI) {
        setUseIframeFallback(true);
        setIsLoading(false);
        return;
      }

      try {
        containerRef.current.innerHTML = '';
        console.log('Connecting to dynamic Jitsi roomName:', sanitizedRoom);
        const api = new window.JitsiMeetExternalAPI('meet.jit.si', {
          roomName: sanitizedRoom,
          parentNode: containerRef.current,
          width: '100%',
          height: '100%',
          userInfo: {
            displayName: displayName,
          },
          configOverwrite: {
            startWithAudioMuted: false,
            startWithVideoMuted: true,
            prejoinPageEnabled: false,
            disableDeepLinking: true,
            enableWelcomePage: false,
            enableClosePage: false,
            defaultLanguage: 'ar',
          },
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            SHOW_BRAND_WATERMARK: false,
            SHOW_POWERED_BY: false,
            DEFAULT_BACKGROUND: '#050814',
            TOOLBAR_BUTTONS: [
              'microphone',
              'camera',
              'closedcaptions',
              'desktop',
              'fullscreen',
              'fodeviceselection',
              'hangup',
              'profile',
              'chat',
              'settings',
              'raisehand',
              'videoquality',
              'tileview',
              'mute-everyone',
            ],
          },
        });

        api.addEventListener('videoConferenceLeft', () => {
          handleExitCall();
        });

        api.addEventListener('readyToClose', () => {
          handleExitCall();
        });

        api.addEventListener('audioMuteStatusChanged', (muted: { muted: boolean }) => {
          console.log('Audio muted status:', muted);
        });

        jitsiApiRef.current = api;
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to init JitsiMeetExternalAPI:', err);
        setUseIframeFallback(true);
        setIsLoading(false);
      }
    };

    if (window.JitsiMeetExternalAPI) {
      initJitsi();
    } else {
      scriptElement = document.createElement('script');
      scriptElement.src = 'https://meet.jit.si/external_api.js';
      scriptElement.async = true;
      scriptElement.onload = () => {
        initJitsi();
      };
      scriptElement.onerror = () => {
        console.warn('Jitsi script load failed, switching to direct iframe');
        setUseIframeFallback(true);
        setIsLoading(false);
      };
      document.body.appendChild(scriptElement);
    }

    return () => {
      isCancelled = true;
      if (jitsiApiRef.current) {
        try {
          jitsiApiRef.current.dispose();
        } catch (e) {
          console.error(e);
        }
        jitsiApiRef.current = null;
      }
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, [sanitizedRoom, displayName, handleExitCall]);

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-[#050814] text-white overflow-hidden select-none" dir="rtl">
      {/* Top Cyber Call Header */}
      <header className="relative z-50 flex items-center justify-between px-4 py-3 bg-[#070b1e]/95 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        {/* Left / Start Info: Room Type & Code */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="text-xs font-bold text-gray-200 hidden sm:inline">{roomType}</span>
          </div>

          <button
            onClick={copyRoomCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0c1433] border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 transition-all active:scale-95 text-xs font-rajdhani font-bold tracking-wider shadow-[0_0_10px_rgba(0,242,254,0.15)]"
            title="انقر لنسخ كود الغرفة"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-sans">تم النسخ!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
                <span>{roomCode}</span>
              </>
            )}
          </button>
        </div>

        {/* Center: Live Call Timer */}
        <div className="flex items-center gap-2 bg-black/40 px-3.5 py-1 rounded-full border border-white/10 font-rajdhani font-bold text-base text-gray-200">
          <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
          <span>{formatDuration(seconds)}</span>
        </div>

        {/* Right / End Action: End Call Button */}
        <div className="flex items-center gap-2">
          {/* Audio Permission status */}
          <div 
            className={`hidden md:flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg border ${
              micPermission === 'granted'
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
            }`}
          >
            {micPermission === 'granted' ? (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span>المايك مفعل</span>
              </>
            ) : (
              <>
                <MicOff className="w-3.5 h-3.5" />
                <span>تحقق من إذن الصوت</span>
              </>
            )}
          </div>

          {/* Clean Red End Call Button */}
          <button
            onClick={handleExitCall}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(225,29,72,0.6)] border border-rose-400/40 transition-all duration-200 transform active:scale-95"
          >
            <PhoneOff className="w-4 h-4 stroke-[2.5]" />
            <span>إنهاء المكالمة</span>
          </button>
        </div>
      </header>

      {/* Mic Warning if denied */}
      {micPermission === 'denied' && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 text-xs text-amber-200 flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>يرجى السماح بالوصول للميكروفون من إعدادات المتصفح لكي يسمعك زملاؤك في الغرفة.</span>
        </div>
      )}

      {/* Main Jitsi Container */}
      <div className="relative flex-1 w-full h-full bg-[#030611] overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050814] z-20">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin" />
              <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <p className="mt-4 text-sm font-semibold text-gray-300 tracking-wide">
              جاري تجهيز غرفة الصوت المشفرة...
            </p>
            <span className="text-xs text-cyan-400 font-rajdhani mt-1">{roomCode}</span>
          </div>
        )}

        {useIframeFallback ? (
          <iframe
            src={`https://meet.jit.si/${sanitizedRoom}#config.prejoinPageEnabled=false&config.startWithAudioMuted=false&config.disableDeepLinking=true&userInfo.displayName=${encodeURIComponent(
              displayName
            )}`}
            title="Phantom Call Audio Room"
            className="w-full h-full border-0"
            allow="camera; microphone; display-capture; autoplay; clipboard-write; speaker-selection"
          />
        ) : (
          <div ref={containerRef} className="w-full h-full" />
        )}
      </div>

      {/* Mobile Floating End Call / Quick Controls Bar */}
      <div className="md:hidden py-2.5 px-4 bg-[#05091a]/95 backdrop-blur-md border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span>تشفير مباشر للغرفة</span>
        </div>
        <button
          onClick={handleExitCall}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs shadow-[0_0_15px_rgba(239,68,68,0.5)] border border-red-400/40 active:scale-95 transition-transform"
        >
          <PhoneOff className="w-3.5 h-3.5" />
          <span>إنهاء المكالمة</span>
        </button>
      </div>
    </div>
  );
};
