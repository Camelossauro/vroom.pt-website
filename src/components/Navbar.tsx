import React, { useState, useEffect, MouseEvent } from 'react';
import { Menu, X, ChevronRight, LogIn, Sparkles, Smartphone, UserPlus, Lock, ShieldAlert, ShieldCheck } from 'lucide-react';
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

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'O Ecossistema', href: '#overview' },
    { name: 'Eventos', href: '#events' },
    { name: 'Organizações', href: '#organizations-section' },
    { name: 'Pilotos', href: '#drivers' },
    { name: 'App Móvel', href: '#app' },
    { name: 'FAQ', href: '#faq' },
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
          ? 'bg-[#0F1115]/95 backdrop-blur-md shadow-lg border-b border-[#262B37] py-2 sm:py-3'
          : 'bg-transparent py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex items-center gap-1.5 sm:gap-2.5 group">
          <div className="text-white group-hover:text-brand-blue transition-colors flex items-center">
            <img 
              src={vroomLogoImg} 
              alt="Vroom.pt Logo" 
              className="w-7 h-7 sm:w-9 h-9 object-contain transition-transform duration-300 rounded-lg sm:rounded-xl shadow-md"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg sm:text-2xl tracking-tighter text-white leading-none">
              Vroom<span className="text-white font-bold">.pt</span>
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isLinkActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-sm font-medium transition-colors hover:text-white relative py-1 ${
                  isLinkActive ? 'text-white' : 'text-slate-400'
                }`}
              >
                {link.name}
                {isLinkActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue rounded-full" />
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
                className="flex items-center gap-1.5 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer animate-pulse"
              >
                <Sparkles className="w-4 h-4" />
                Painel Admin Vroom.pt
              </button>
            ) : currentUser.role === 'unauthorized' ? (
              <button
                onClick={() => onOpenPortal('register')}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-yellow-500/10 border border-yellow-500/40 hover:bg-yellow-500/20 text-yellow-300 font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer animate-pulse"
              >
                <Lock className="w-4 h-4 text-yellow-400" />
                Pendente de Verificação Vroom.pt
              </button>
            ) : (
              <button
                onClick={() => onOpenPortal('register')}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-[#025bc5] hover:bg-blue-600 text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-green-300" />
                Painel Organizador
              </button>
            )
          ) : (
            <button
              onClick={() => onOpenPortal('register')}
              id="nav-signup-btn"
              className="flex items-center gap-1.5 px-5 py-2.5 bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold text-sm rounded-xl transition-all shadow-md cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              Portal de Membro
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors focus:outline-none"
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[65px] bg-[#0F1115] border-b border-[#262B37] shadow-xl transition-all duration-300 ease-in-out origin-top ${
          isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isLinkActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-base font-semibold py-2 transition-colors border-b border-[#262B37] ${
                    isLinkActive ? 'text-white pl-2 border-l-2 border-l-brand-blue' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 pt-2">
            {currentUser ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenPortal('register');
                }}
                className={`flex items-center justify-center gap-2 py-3.5 font-bold rounded-xl transition-all w-full cursor-pointer shadow-md ${
                  currentUser.role === 'admin' 
                    ? 'bg-amber-500 text-black hover:bg-amber-600' 
                    : currentUser.role === 'unauthorized' 
                      ? 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/45 animate-pulse' 
                      : 'bg-brand-blue text-white hover:bg-brand-blue-hover'
                }`}
              >
                {currentUser.role === 'admin' && <Sparkles className="w-4 h-4" />}
                {currentUser.role === 'unauthorized' && <Lock className="w-4 h-4 animate-bounce text-yellow-400" />}
                {currentUser.role === 'authorized' && <ShieldCheck className="w-4 h-4 text-green-300" />}
                {currentUser.role === 'admin' ? 'Painel Admin Vroom.pt' : currentUser.role === 'unauthorized' ? 'Pendente de Verificação Vroom.pt' : 'Painel de Organizador'}
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenPortal('login');
                  }}
                  className="flex items-center justify-center gap-2 py-3 border border-[#262B37] text-slate-300 hover:text-white font-semibold rounded-xl hover:bg-[#1D212B] transition-colors w-full cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-brand-blue" />
                  Sessão Supabase / Demo
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenPortal('register');
                  }}
                  className="flex items-center justify-center gap-2 py-3 bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold rounded-xl transition-colors w-full shadow-md cursor-pointer"
                >
                  Registo de Organizador
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
