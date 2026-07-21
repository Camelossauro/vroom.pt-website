import { useState, useEffect } from 'react';
import { X, Smartphone, ArrowRight, Download, Sparkles } from 'lucide-react';
// @ts-ignore
import vroomLogoImg from '../assets/images/vroom_logo_1784301043513.jpg';

export default function MobileSmartBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [deviceOS, setDeviceOS] = useState<'ios' | 'android' | 'other'>('other');

  useEffect(() => {
    // Check if user previously dismissed the banner
    const isDismissed = localStorage.getItem('vroom_mobile_banner_dismissed') === 'true';
    if (isDismissed) return;

    // Detect if device is mobile
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    const isAndroid = /android/i.test(userAgent);

    if (isIOS) {
      setDeviceOS('ios');
      setIsVisible(true);
    } else if (isAndroid) {
      setDeviceOS('android');
      setIsVisible(true);
    } else {
      // For general mobile screen widths (like dev mode emulator)
      const isMobileWidth = window.innerWidth < 768;
      if (isMobileWidth) {
        setDeviceOS('other');
        setIsVisible(true);
      }
    }

    // Also handle resizing
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsVisible(false);
      } else {
        const alreadyDismissed = localStorage.getItem('vroom_mobile_banner_dismissed') === 'true';
        if (!alreadyDismissed) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('vroom_mobile_banner_dismissed', 'true');
  };

  if (!isVisible) return null;

  const appStoreUrl = "https://apps.apple.com/pt/app/vroom-pt/id6751053867";
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.baseguy.shedulebase&hl=pt_PT";
  
  const targetUrl = deviceOS === 'ios' ? appStoreUrl : playStoreUrl;
  const storeName = deviceOS === 'ios' ? 'App Store' : deviceOS === 'android' ? 'Google Play' : 'App Store';

  return (
    <div className="fixed bottom-5 left-4 right-4 z-50 md:hidden animate-slide-up">
      <div className="bg-slate-950/95 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-3 relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-brand-blue/20 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-3 relative z-10">
          {/* Logo */}
          <img 
            src={vroomLogoImg} 
            alt="Vroom.pt" 
            className="w-11 h-11 object-cover rounded-xl border border-white/10 shadow-md flex-shrink-0"
            referrerPolicy="no-referrer"
          />
          
          <div className="flex flex-col text-left">
            <h4 className="font-bold text-white text-sm leading-tight">Vroom.pt</h4>
          </div>
        </div>

        {/* CTAs and Close Button */}
        <div className="flex items-center gap-2.5 relative z-10">
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDismiss} // auto-dismiss once they go to store
            className="flex items-center gap-1.5 px-4 py-2 bg-brand-blue hover:bg-brand-blue-hover text-white font-bold text-xs rounded-xl transition-all shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Instalar</span>
          </a>
          
          <button
            onClick={handleDismiss}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
