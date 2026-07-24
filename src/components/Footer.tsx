import { MouseEvent } from 'react';
import { Mail, MapPin } from 'lucide-react';
// @ts-ignore
import vroomLogoImg from '../assets/images/vroom_logo_1784301043513.jpg';

export default function Footer({ onOpenPrivacy, onOpenTerms }: { onOpenPrivacy: () => void, onOpenTerms: () => void }) {

  const handleScrollTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(0, elementPosition - offset);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer id="contact" className="bg-[#0F1115] text-white pt-12 sm:pt-20 pb-10 border-t border-[#262B37] relative overflow-hidden">
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 sm:gap-12 mb-10 pb-10 border-b border-[#262B37]">
          
          {/* Column 1: Brand details */}
          <div className="col-span-2 md:col-span-4 flex flex-col items-start gap-3 sm:gap-4 text-left">
            <a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="flex items-center gap-2 group">
              <div className="text-white group-hover:text-brand-blue transition-colors flex items-center">
                <img 
                  src={vroomLogoImg} 
                  alt="Vroom.pt Logo" 
                  className="w-7 h-7 sm:w-8 h-8 object-contain transition-transform duration-300 rounded-xl shadow-md"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-bold text-lg sm:text-xl tracking-tighter text-white">
                Vroom<span className="text-white font-bold">.pt</span>
              </span>
            </a>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
              A central digital do desporto motorizado português.
            </p>
            
            <div className="flex flex-col gap-1.5 mt-1 sm:mt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400 text-left">
                <Mail className="w-3 h-3 text-brand-blue" />
                <span>contacto@vroomapp.pt</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 text-left">
                <MapPin className="w-3 h-3 text-brand-blue" />
                <span>Feito em Vila Real, Portugal 🇵🇹</span>
              </div>
            </div>
          </div>

          {/* Column 2: Platform links */}
          <div className="col-span-1 md:col-span-2 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3">Plataforma</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="hover:text-white transition-colors cursor-pointer">Início</a></li>
              <li><a href="#overview" onClick={(e) => handleScrollTo(e, '#overview')} className="hover:text-white transition-colors cursor-pointer">O Ecossistema</a></li>
              <li><a href="#organizations-section" onClick={(e) => handleScrollTo(e, '#organizations-section')} className="hover:text-white transition-colors cursor-pointer">Como Funciona</a></li>
              <li><a href="#drivers" onClick={(e) => handleScrollTo(e, '#drivers')} className="hover:text-white transition-colors cursor-pointer">Perfil de Pilotos</a></li>
            </ul>
          </div>

          {/* Column 3: Organizations & Drivers links */}
          <div className="col-span-1 md:col-span-2 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3">Parceiros</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><a href="#organizations-section" onClick={(e) => handleScrollTo(e, '#organizations-section')} className="hover:text-white transition-colors cursor-pointer">Registar Clube</a></li>
              <li><a href="#why-vroom" onClick={(e) => handleScrollTo(e, '#why-vroom')} className="hover:text-white transition-colors cursor-pointer">Verificação</a></li>
              <li><a href="#faq" onClick={(e) => handleScrollTo(e, '#faq')} className="hover:text-white transition-colors cursor-pointer">Dúvidas Gerais</a></li>
            </ul>
          </div>

          {/* Column 4: Install App */}
          <div className="col-span-2 md:col-span-4 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3">Instalar App</h4>
            <p className="text-slate-400 text-xs mb-4 font-light leading-relaxed">
              Leve o motorsport no bolso. Descarregue a app oficial.
            </p>
            <div className="flex flex-wrap gap-2">
              <a 
                href="https://apps.apple.com/pt/app/vroom-pt/id6751053867"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-[1.03] active:scale-95 inline-flex items-center justify-center h-[34px] w-[115px] rounded-lg bg-black overflow-hidden relative border border-[#262B37]"
              >
                <img 
                  src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/pt-pt" 
                  alt="Descarregar na App Store" 
                  className="absolute h-[110%] w-auto max-w-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  referrerPolicy="no-referrer"
                />
              </a>
              <a 
                href="https://play.google.com/store/apps/details?id=com.baseguy.shedulebase&hl=pt_PT"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-[1.03] active:scale-95 inline-flex items-center justify-center h-[34px] w-[115px] rounded-lg bg-black overflow-hidden relative border border-[#262B37]"
              >
                <img 
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/pt_badge_web_generic.png" 
                  alt="Disponível no Google Play" 
                  className="absolute h-[140%] w-auto max-w-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  referrerPolicy="no-referrer"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and disclaimer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-center md:text-left">
            <span>© {new Date().getFullYear()} Vroom.pt Portugal. Todos os direitos reservados.</span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span className="text-slate-400 font-medium">Feito em Vila Real, Portugal 🇵🇹</span>
          </div>
          <div className="flex gap-4">
            <button onClick={onOpenTerms} className="hover:text-slate-300 cursor-pointer">Termos de Utilização</button>
            <button onClick={onOpenPrivacy} className="hover:text-slate-300 cursor-pointer">Política de Privacidade</button>
            <a href="#contact" className="hover:text-slate-300">Contacto Geral</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
