import React, { useState, useEffect, FormEvent } from 'react';
import { 
  ArrowLeft, Smartphone, ShieldCheck, Mail, CheckCircle2, Download, Send, Sparkles,
  Lock, User, Trash2, Edit3, LogOut, ArrowRight, Calendar, Building2, Eye, EyeOff,
  Bell, Shield, KeyRound, AlertTriangle, Check
} from 'lucide-react';
// @ts-ignore
import vroomLogoImg from '../assets/images/vroom_logo_1784301043513.jpg';
import { authService, OrganizerProfile } from '../services/authService';

interface PortalPageProps {
  onClose: () => void;
  initialTab?: 'fan' | 'organizer';
}

export default function PortalPage({ onClose, initialTab = 'fan' }: PortalPageProps) {
  const [activeTab, setActiveTab] = useState<'fan' | 'organizer'>(initialTab === 'organizer' ? 'organizer' : 'fan');
  const [currentUser, setCurrentUser] = useState<OrganizerProfile | null>(null);
  
  // Registration state
  const [orgName, setOrgName] = useState('');
  const [orgEmail, setOrgEmail] = useState('');
  const [orgPassword, setOrgPassword] = useState('');
  const [orgConfirmPassword, setOrgConfirmPassword] = useState('');
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginFields, setShowLoginFields] = useState(false);
  
  // Password Visibility toggles
  const [showLoginPasswordText, setShowLoginPasswordText] = useState(false);
  const [showOrgPasswordText, setShowOrgPasswordText] = useState(false);

  // Deletion modal state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
  
  // Feedback / Loading state
  const [isRegisteredNotice, setIsRegisteredNotice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'error' | 'success' | 'info' } | null>(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
  }, [isRegisteredNotice]);

  const handleOrgSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (orgPassword.length < 6) { 
      setToastMessage({ text: 'A palavra-passe deve ter no mínimo 6 caracteres.', type: 'error' }); 
      return; 
    }
    if (orgPassword !== orgConfirmPassword) { 
      setToastMessage({ text: 'As palavras-passe não coincidem.', type: 'error' }); 
      return; 
    }
    setLoading(true);
    try {
      const response = await authService.registerOrganizer({ nome: orgName, email: orgEmail, password: orgPassword });
      setLoading(false);
      setIsRegisteredNotice(true);
      setCurrentUser(response.profile);
      setToastMessage({ text: 'Conta criada com sucesso! Bem-vindo ao portal.', type: 'success' });
    } catch (err: any) { 
      setLoading(false); 
      setToastMessage({ text: `Erro no registo: ${err.message}`, type: 'error' }); 
    }
  };

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.login(loginEmail, loginPassword);
      if (response.success && response.profile) {
        setCurrentUser(response.profile);
        setToastMessage({ text: 'Sessão iniciada com sucesso!', type: 'success' });
      } else { 
        setToastMessage({ text: response.message || 'Credenciais inválidas.', type: 'error' }); 
      }
    } catch (err: any) { 
      setToastMessage({ text: `Erro ao entrar: ${err.message}`, type: 'error' }); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleLogout = () => { 
    authService.logout(); 
    setCurrentUser(null);
    setToastMessage({ text: 'Sessão terminada.', type: 'info' });
  };

  const handleAccountDeletionProcess = async () => {
    if (!currentUser) return;
    
    if (deleteConfirmationText.trim().toLowerCase() !== currentUser.nome.toLowerCase()) {
      setToastMessage({ text: 'Erro: O nome inserido não corresponde ao nome da sua organização.', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      await authService.deleteAccount(currentUser.id, currentUser.jwt);
      setCurrentUser(null);
      setShowDeleteConfirm(false);
      setDeleteConfirmationText('');
      setToastMessage({ text: 'Conta eliminada com sucesso.', type: 'info' });
    } catch (err: any) {
      setToastMessage({ text: `Erro ao processar eliminação: ${err.message}`, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] text-white p-4 pt-20 sm:pt-28 sm:p-10 relative overflow-hidden flex flex-col justify-center items-center">
      
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-2xl mx-auto relative z-10">
        
        {/* Back button */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <button 
            onClick={onClose} 
            className="group flex items-center gap-2 text-slate-400 hover:text-white transition-all cursor-pointer text-xs sm:text-sm font-medium bg-[#141722]/80 border border-[#262B37] px-4 py-2 rounded-xl shadow-sm hover:border-slate-500"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-brand-blue" /> 
            <span>Voltar ao Início</span>
          </button>

          <div className="flex items-center gap-2">
            <img 
              src={vroomLogoImg} 
              alt="Vroom.pt Logo" 
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain rounded-xl shadow-md"
              referrerPolicy="no-referrer"
            />
            <span className="font-display font-bold text-base sm:text-lg text-white">
              Vroom<span className="text-white font-bold">.pt</span>
            </span>
          </div>
        </div>

        {/* Floating Toast Message */}
        {toastMessage && (
          <div className={`mb-6 p-4 rounded-2xl border backdrop-blur-md shadow-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-200 ${
            toastMessage.type === 'error' 
              ? 'bg-red-500/10 border-red-500/30 text-red-300' 
              : toastMessage.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-brand-blue/10 border-brand-blue/30 text-blue-200'
          }`}>
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              {toastMessage.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />}
              {toastMessage.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
              {toastMessage.type === 'info' && <Sparkles className="w-5 h-5 text-brand-blue shrink-0 animate-pulse" />}
              <span className="font-medium leading-snug">{toastMessage.text}</span>
            </div>
            <button 
              onClick={() => setToastMessage(null)} 
              className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer text-xs font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Main Glassmorphic Auth Card */}
        <div className="bg-gradient-to-b from-[#141822] via-[#10131B] to-[#0D0F15] rounded-2xl sm:rounded-3xl border border-[#262B37] p-6 sm:p-10 shadow-2xl relative">
          
          {/* LOGGED IN ORGANIZER VIEW */}
          {currentUser ? (
            <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262B37]">
                <div>
                  <span className="text-[11px] font-mono text-brand-blue uppercase tracking-widest block mb-1">
                    Painel de Controlo
                  </span>
                  <h1 className="font-display font-bold text-2xl sm:text-3xl text-white">
                    {currentUser.nome}
                  </h1>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                    currentUser.role === 'admin'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                      : currentUser.role === 'unauthorized'
                        ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300'
                        : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  }`}>
                    {currentUser.role === 'admin' ? 'Administrador' : currentUser.role === 'unauthorized' ? 'Pendente' : 'Organização Verificada'}
                  </span>
                  <button 
                    onClick={handleLogout} 
                    className="p-2 bg-[#1A1E29] hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-xl transition-all border border-[#262B37] cursor-pointer"
                    title="Terminar Sessão"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Account Status Card */}
              <div className="bg-[#151923] border border-[#262B37] p-4 sm:p-6 rounded-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center text-brand-blue shrink-0">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-white">{currentUser.nome}</h4>
                    <p className="text-xs text-slate-400">{currentUser.email}</p>
                  </div>
                </div>
              </div>

              {/* App Download Prompt */}
              <div className="bg-gradient-to-r from-brand-blue/10 via-[#151923] to-[#151923] border border-brand-blue/30 p-6 rounded-2xl text-center space-y-4 relative overflow-hidden">
                <div className="w-12 h-12 bg-brand-blue/20 border border-brand-blue/40 rounded-2xl flex items-center justify-center mx-auto text-brand-blue shadow-lg">
                  <Smartphone className="w-6 h-6" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">Gestão de Provas na App Móvel</h3>
                  <p className="text-slate-300 max-w-md mx-auto text-xs sm:text-sm leading-relaxed">
                    A criação de eventos, tempos e cronometragem oficial são geridos diretamente na <strong>Vroom.pt App</strong>.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <a 
                    href="https://apps.apple.com/pt/app/vroom-pt/id6751053867"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-105 active:scale-95 inline-flex items-center justify-center h-[42px] w-[140px] rounded-xl bg-black overflow-hidden relative border border-[#262B37] shadow-md"
                  >
                    <img 
                      src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/pt-pt" 
                      alt="App Store" 
                      className="absolute h-[118%] w-auto max-w-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      referrerPolicy="no-referrer"
                    />
                  </a>
                  
                  <a 
                    href="https://play.google.com/store/apps/details?id=com.baseguy.shedulebase&hl=pt_PT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-105 active:scale-95 inline-flex items-center justify-center h-[42px] w-[140px] rounded-xl bg-black overflow-hidden relative border border-[#262B37] shadow-md"
                  >
                    <img 
                      src="https://play.google.com/intl/en_us/badges/static/images/badges/pt_badge_web_generic.png" 
                      alt="Google Play" 
                      className="absolute h-[142%] w-auto max-w-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      referrerPolicy="no-referrer"
                    />
                  </a>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5 space-y-3">
                <h5 className="font-bold text-red-400 text-xs sm:text-sm flex items-center gap-2">
                  <Trash2 className="w-4 h-4" /> Eliminar Conta de Organizador
                </h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Esta ação é irreversível. Todos os dados associados à sua organização serão permanentemente removidos.
                </p>

                {showDeleteConfirm ? (
                  <div className="space-y-3 pt-2">
                    <input 
                      type="text"
                      className="w-full bg-[#0D0F15] border border-red-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-red-500"
                      placeholder={`Escreva "${currentUser.nome}" para confirmar`}
                      value={deleteConfirmationText}
                      onChange={(e) => setDeleteConfirmationText(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setShowDeleteConfirm(false)} 
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs text-slate-300 font-bold transition-colors cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button 
                        onClick={handleAccountDeletionProcess} 
                        disabled={loading}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-md"
                      >
                        {loading ? 'A eliminar...' : 'Confirmar Eliminação'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowDeleteConfirm(true)} 
                    className="px-4 py-2 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 font-bold rounded-xl text-xs transition-all cursor-pointer"
                  >
                    Eliminar Conta
                  </button>
                )}
              </div>
            </div>
          ) : (
            
            /* LOGGED OUT VIEW - FAN & ORGANIZER TABS */
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Modern Segmented Tab Switcher */}
              <div className="bg-[#0E1117] p-1.5 rounded-2xl border border-[#262B37] grid grid-cols-2 gap-1.5 shadow-inner">
                <button 
                  onClick={() => setActiveTab('fan')} 
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === 'fan' 
                      ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' 
                      : 'text-slate-400 hover:text-white hover:bg-[#161B26]'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Fãs & Adeptos</span>
                </button>

                <button 
                  onClick={() => setActiveTab('organizer')} 
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === 'organizer' 
                      ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' 
                      : 'text-slate-400 hover:text-white hover:bg-[#161B26]'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Organizações</span>
                </button>
              </div>

              {/* TAB CONTENT: Fãs */}
              {activeTab === 'fan' ? (
                <div className="text-center py-6 sm:py-10 space-y-6 animate-in fade-in duration-200">
                  <div className="w-20 h-20 bg-brand-blue/15 border border-brand-blue/30 rounded-3xl flex items-center justify-center mx-auto text-brand-blue shadow-xl shadow-brand-blue/10">
                    <Smartphone className="w-10 h-10" />
                  </div>

                  <div className="space-y-2 max-w-sm mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                      Instale a App Vroom.pt
                    </h2>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Siga eventos automobilísticos em tempo real, guarde itinerários e receba notificações diretas no seu telemóvel.
                    </p>
                  </div>

                  {/* Feature badges */}
                  <div className="grid grid-cols-3 gap-2 max-w-md mx-auto pt-2 text-left">
                    <div className="p-2.5 bg-[#141722] border border-[#262B37] rounded-xl flex flex-col items-center text-center gap-1">
                      <Bell className="w-4 h-4 text-brand-blue" />
                      <span className="text-[10px] font-bold text-slate-200">Notificações</span>
                    </div>
                    <div className="p-2.5 bg-[#141722] border border-[#262B37] rounded-xl flex flex-col items-center text-center gap-1">
                      <Calendar className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10px] font-bold text-slate-200">Calendário</span>
                    </div>
                    <div className="p-2.5 bg-[#141722] border border-[#262B37] rounded-xl flex flex-col items-center text-center gap-1">
                      <Shield className="w-4 h-4 text-purple-400" />
                      <span className="text-[10px] font-bold text-slate-200">Tempos App</span>
                    </div>
                  </div>

                  {/* App Download Store Badges */}
                  <div className="flex flex-wrap justify-center items-center gap-3 pt-4">
                    <a 
                      href="https://apps.apple.com/pt/app/vroom-pt/id6751053867"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform hover:scale-105 active:scale-95 inline-flex items-center justify-center h-[46px] w-[150px] rounded-xl bg-black border border-[#262B37] overflow-hidden relative shadow-lg"
                    >
                      <img 
                        src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/pt-pt" 
                        alt="Descarregar na App Store" 
                        className="absolute h-[118%] w-auto max-w-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        referrerPolicy="no-referrer"
                      />
                    </a>
                    
                    <a 
                      href="https://play.google.com/store/apps/details?id=com.baseguy.shedulebase&hl=pt_PT"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform hover:scale-105 active:scale-95 inline-flex items-center justify-center h-[46px] w-[150px] rounded-xl bg-black border border-[#262B37] overflow-hidden relative shadow-lg"
                    >
                      <img 
                        src="https://play.google.com/intl/en_us/badges/static/images/badges/pt_badge_web_generic.png" 
                        alt="Disponível no Google Play" 
                        className="absolute h-[142%] w-auto max-w-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        referrerPolicy="no-referrer"
                      />
                    </a>
                  </div>
                </div>
              ) : (
                
                /* TAB CONTENT: Organizações (Login or Register) */
                <div className="space-y-6 pt-2 animate-in fade-in duration-200">
                  
                  {/* Mode Selector Header */}
                  <div className="flex items-center justify-between border-b border-[#262B37] pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {showLoginFields ? 'Iniciar Sessão de Organizador' : 'Criar Conta de Organizador'}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {showLoginFields 
                          ? 'Aceda ao seu painel de gestão Vroom.pt' 
                          : 'Registe a sua organização para publicar provas na plataforma'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowLoginFields(!showLoginFields)}
                      className="text-xs font-bold text-brand-blue hover:text-blue-400 underline underline-offset-4 cursor-pointer transition-colors"
                    >
                      {showLoginFields ? 'Criar Conta' : 'Iniciar Sessão'}
                    </button>
                  </div>

                  {/* LOGIN FORM */}
                  {showLoginFields ? (
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                      
                      {/* Email Input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                          E-mail
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input 
                            type="email" 
                            required
                            placeholder="exemplo@organizacao.pt"
                            className="w-full bg-[#0D0F15] border border-[#262B37] focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-600 outline-none transition-all"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Password Input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                          Palavra-passe
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input 
                            type={showLoginPasswordText ? "text" : "password"} 
                            required
                            placeholder="••••••••"
                            className="w-full bg-[#0D0F15] border border-[#262B37] focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 rounded-xl pl-10 pr-10 py-3 text-xs sm:text-sm text-white placeholder:text-slate-600 outline-none transition-all"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => setShowLoginPasswordText(!showLoginPasswordText)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                          >
                            {showLoginPasswordText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-brand-blue hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm shadow-xl shadow-brand-blue/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <KeyRound className="w-4 h-4" />
                            <span>Entrar no Painel</span>
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    
                    /* REGISTER FORM */
                    <form onSubmit={handleOrgSubmit} className="space-y-4">
                      
                      {/* Name & Email inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                            Nome da Organização
                          </label>
                          <div className="relative">
                            <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input 
                              type="text" 
                              required
                              placeholder="ex: Clube Automóvel de..."
                              className="w-full bg-[#0D0F15] border border-[#262B37] focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-600 outline-none transition-all"
                              value={orgName}
                              onChange={(e) => setOrgName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                            E-mail Oficial
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input 
                              type="email" 
                              required
                              placeholder="contacto@clube.pt"
                              className="w-full bg-[#0D0F15] border border-[#262B37] focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-600 outline-none transition-all"
                              value={orgEmail}
                              onChange={(e) => setOrgEmail(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Password & Confirm inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                            Palavra-passe
                          </label>
                          <div className="relative">
                            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input 
                              type={showOrgPasswordText ? "text" : "password"} 
                              required
                              placeholder="Mínimo 6 caracteres"
                              className="w-full bg-[#0D0F15] border border-[#262B37] focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 rounded-xl pl-10 pr-10 py-3 text-xs sm:text-sm text-white placeholder:text-slate-600 outline-none transition-all"
                              value={orgPassword}
                              onChange={(e) => setOrgPassword(e.target.value)}
                            />
                            <button
                              type="button"
                              onClick={() => setShowOrgPasswordText(!showOrgPasswordText)}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                            >
                              {showOrgPasswordText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                            Confirmar Palavra-passe
                          </label>
                          <div className="relative">
                            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input 
                              type={showOrgPasswordText ? "text" : "password"} 
                              required
                              placeholder="Repita a palavra-passe"
                              className="w-full bg-[#0D0F15] border border-[#262B37] focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-600 outline-none transition-all"
                              value={orgConfirmPassword}
                              onChange={(e) => setOrgConfirmPassword(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-brand-blue hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm shadow-xl shadow-brand-blue/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <ShieldCheck className="w-4 h-4" />
                            <span>Criar Conta de Organizador</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

