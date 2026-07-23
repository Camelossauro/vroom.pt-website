import React, { useState, useEffect, MouseEvent } from 'react';
import { 
  Menu, X, ChevronRight, Sparkles, Smartphone, UserPlus, Lock, 
  ShieldCheck, Home, Layers, Calendar, Building2, Flag, HelpCircle, ArrowRight
} from 'lucide-react';
// @ts-ignore
import vroomLogoImg from '../assets/images/vroom_logo_1784301043513.jpg';
import { authService, OrganizerProfile } from '../services/authService';

interface NavbarProps {
  onOpenPortal: (mode: 'login' | 'register' | 'dashboard') => void;
  activeSection: string;
}

export default function Navbar({ onOpenPortal, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<OrganizerProfile | null>(null);

  useEffect(() => {
    const checkUser = () => {
      const user = authService.getCurrentUser();
      setCurrentUser(user);
    };
    checkUser();
    const interval = setInterval(checkUser, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background body scroll when mobile menu dropdown is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Início', href: '#home', icon: Home },
    { name: 'O Ecossistema', href: '#overview', icon: Layers },
    { name: 'Eventos', href: '#events', icon: Calendar },
    { name: 'Organizações', href: '#organizations-section', icon: Building2 },
    { name: 'Pilotos', href: '#drivers', icon: Flag },
    { name: 'App Móvel', href: '#app', icon: Smartphone },
    { name: 'FAQ', href: '#faq', icon: HelpCircle },
  ];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0D0F14]/95 backdrop-blur-md shadow-xl border-b border-[#262B37] py-2.5 sm:py-3.5'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-3.5 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex items-center gap-2 group">
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

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isLinkActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-xs xl:text-sm font-semibold transition-all hover:text-white relative py-1 flex items-center gap-1.5 ${
                  isLinkActive ? 'text-white font-bold' : 'text-slate-400'
                }`}
              >
                {link.name}
                {isLinkActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue rounded-full shadow-[0_0_8px_rgba(2,91,197,0.8)]" />
                )}
              </a>
            );
          })}
        </div>

        {/* Action Buttons (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          {currentUser ? (
            currentUser.role === 'admin' ? (
              <button
                onClick={() => onOpenPortal('register')}
                className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer animate-pulse"
              >
                <Sparkles className="w-4 h-4 fill-black" />
                Painel Admin
              </button>
            ) : currentUser.role === 'unauthorized' ? (
              <button
                onClick={() => onOpenPortal('register')}
                className="flex items-center gap-1.5 px-4 py-2 bg-yellow-500/10 border border-yellow-500/40 hover:bg-yellow-500/20 text-yellow-300 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer"
              >
                <Lock className="w-4 h-4 text-yellow-400" />
                Pendente de Verificação
              </button>
            ) : (
              <button
                onClick={() => onOpenPortal('register')}
                className="flex items-center gap-1.5 px-4.5 py-2 bg-[#025bc5] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                Painel Organizador
              </button>
            )
          ) : (
            <button
              onClick={() => onOpenPortal('register')}
              id="nav-signup-btn"
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-brand-blue/20 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              Portal de Membro
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-[#141720]/80 border border-[#262B37] active:scale-95 transition-all focus:outline-none cursor-pointer"
          aria-label="Alternar menu"
          id="mobile-menu-toggle"
        >
          {isOpen ? <X className="w-5 h-5 text-brand-blue" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Modern Enhanced Mobile Dropdown Drawer */}
      {isOpen && (
        <>
          {/* Backdrop Overlay to close menu and dim page */}
          <div 
            onClick={() => setIsOpen(false)}
            onTouchMove={(e) => e.preventDefault()}
            className="lg:hidden fixed inset-0 top-[58px] sm:top-[68px] bg-black/75 backdrop-blur-sm z-40 animate-in fade-in duration-200"
          />

          <div 
            className="lg:hidden fixed inset-x-0 top-[58px] sm:top-[68px] bg-[#0E1117] border-b border-[#262B37] shadow-2xl transition-all duration-300 z-50 max-h-[calc(100vh-68px)] overflow-y-auto animate-in slide-in-from-top-2"
          >
            <div className="p-4 sm:p-5 space-y-4 sm:space-y-5 max-w-md mx-auto">
              {/* Quick Portal Access Card inside Mobile Menu */}
              <div className="p-3.5 bg-gradient-to-r from-[#161B26] to-[#12151D] border border-[#262B37] rounded-2xl flex items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="p-2.5 bg-brand-blue/15 border border-brand-blue/30 text-brand-blue rounded-xl shrink-0">
                    {currentUser?.role === 'admin' ? (
                      <Sparkles className="w-5 h-5 text-amber-400" />
                    ) : currentUser ? (
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <UserPlus className="w-5 h-5" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      {currentUser ? 'Sessão Ativa' : 'Área de Membros'}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                      {currentUser ? currentUser.nome : 'Portal de Membros'}
                    </h4>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenPortal('register');
                  }}
                  className="px-3.5 py-2 bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-md active:scale-95"
                >
                  <span>{currentUser ? 'Painel' : 'Entrar'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Navigation Grid / List */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-3 block mb-1">
                  Navegação Principal
                </span>
                <div className="grid grid-cols-1 gap-1">
                  {navLinks.map((link) => {
                    const isLinkActive = activeSection === link.href.slice(1);
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                          isLinkActive 
                            ? 'bg-brand-blue/15 text-white font-bold border border-brand-blue/30' 
                            : 'text-slate-300 hover:text-white hover:bg-[#161B26]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-lg ${isLinkActive ? 'bg-brand-blue text-white' : 'bg-[#181C26] text-slate-400'}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <span className="text-sm">{link.name}</span>
                        </div>

                        <ChevronRight className={`w-4 h-4 transition-transform ${isLinkActive ? 'text-brand-blue translate-x-0.5' : 'text-slate-400'}`} />
                      </a>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </>
      )}
    </nav>
  );
}

