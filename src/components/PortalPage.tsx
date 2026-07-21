import React, { useState, useEffect, FormEvent } from 'react';
import { 
  ArrowLeft, Smartphone, ShieldCheck, Mail, CheckCircle2, Download, Send, Sparkles,
  Lock, User, Trash2, Edit3, LogOut, ArrowRight, Calendar
} from 'lucide-react';
import { authService, OrganizerProfile } from '../services/authService';

interface PortalPageProps {
  onClose: () => void;
  initialTab?: 'fan' | 'organizer';
}

export default function PortalPage({ onClose, initialTab = 'fan' }: PortalPageProps) {
  const [activeTab, setActiveTab] = useState<'fan' | 'organizer'>(initialTab === 'organizer' ? 'organizer' : 'fan');
  const [currentUser, setCurrentUser] = useState<OrganizerProfile | null>(null);
  const [orgName, setOrgName] = useState('');
  const [orgEmail, setOrgEmail] = useState('');
  const [orgPassword, setOrgPassword] = useState('');
  const [orgConfirmPassword, setOrgConfirmPassword] = useState('');
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
  const [deletionOutcomeMessage, setDeletionOutcomeMessage] = useState<{text: string;} | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginFields, setShowLoginFields] = useState(false);
  const [isRegisteredNotice, setIsRegisteredNotice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
  }, [isRegisteredNotice]);

  const handleOrgSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (orgPassword.length < 6) { setToastMessage('Mínimo 6 caracteres.'); return; }
    if (orgPassword !== orgConfirmPassword) { setToastMessage('Palavras-passe não coincidem.'); return; }
    setLoading(true);
    try {
      const response = await authService.registerOrganizer({ nome: orgName, email: orgEmail, password: orgPassword });
      setLoading(false);
      setIsRegisteredNotice(true);
      setCurrentUser(response.profile);
    } catch (err: any) { setLoading(false); setToastMessage(`Erro: ${err.message}`); }
  };

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.login(loginEmail, loginPassword);
      if (response.success && response.profile) {
        setCurrentUser(response.profile);
      } else { setToastMessage(response.message || 'Erro.'); }
    } catch (err: any) { setToastMessage(`Erro: ${err.message}`); }
    finally { setLoading(false); }
  };

  const handleLogout = () => { authService.logout(); setCurrentUser(null); };

  const handleAccountDeletionProcess = async () => {
    if (!currentUser) return;
    
    if (deleteConfirmationText.trim().toLowerCase() !== currentUser.nome.toLowerCase()) {
      setToastMessage('Erro: O nome inserido não corresponde ao nome da sua organização.');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.deleteAccount(currentUser.id, currentUser.jwt);
      setDeletionOutcomeMessage({ text: response.message });
      setCurrentUser(null);
      setShowDeleteConfirm(false);
      setDeleteConfirmationText('');
      setToastMessage('Conta eliminada com sucesso.');
    } catch (err: any) {
      setToastMessage(`Erro ao processar eliminação: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1115] text-white p-4 pt-20 sm:pt-32 sm:p-12">
      <div className="max-w-4xl mx-auto">
        <button onClick={onClose} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 sm:mb-10 transition-colors cursor-pointer text-sm sm:text-base">
          <ArrowLeft className="w-4 h-4 sm:w-5 h-5" /> Voltar ao Início
        </button>

        {toastMessage && (
          <div className="mb-4 bg-slate-900 border border-brand-blue/40 p-3 rounded-lg text-left text-xs sm:text-sm text-slate-200 shadow-xl flex items-center gap-3 animate-fade-in">
            <Sparkles className="w-4 h-4 text-brand-blue flex-shrink-0 animate-bounce" />
            <div className="flex-1 font-light leading-relaxed">{toastMessage}</div>
            <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white font-bold px-1">✕</button>
          </div>
        )}

        <div className="bg-[#1D212B] rounded-xl sm:rounded-2xl border border-[#262B37] p-6 sm:p-12">
          {currentUser ? (
            <div className="space-y-6 sm:space-y-8">
              <h1 className="font-display font-bold text-xl sm:text-3xl text-white">Painel Organizadora</h1>
              <div className="bg-[#171A21] border border-[#262B37] p-4 sm:p-6 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-4 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
                    <User className="w-6 h-6 sm:w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base sm:text-xl text-white">{currentUser.nome}</h4>
                    <p className="text-xs sm:text-sm text-slate-400">{currentUser.email}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="px-3 py-1.5 bg-[#0F1115] hover:bg-red-900/20 text-slate-400 hover:text-red-400 rounded-lg transition-all border border-[#262B37] text-xs sm:text-sm">
                  Sair
                </button>
              </div>
              <div className="bg-[#171A21] border border-[#262B37] p-6 sm:p-8 rounded-lg text-center space-y-5 sm:space-y-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto">
                  <Smartphone className="w-7 h-7 sm:w-8 h-8 text-brand-blue" />
                </div>
                <div className="space-y-2 sm:space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">Gestão de Eventos na App</h3>
                  <p className="text-slate-400 max-w-md mx-auto text-xs sm:text-sm leading-relaxed">
                    A publicação de provas e ferramentas de cronometragem são exclusivas da <strong>Vroom.pt App</strong>.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-2 sm:pt-2">
                  <a 
                    href="https://apps.apple.com/pt/app/vroom-pt/id6751053867"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="transition-all hover:scale-[1.03] active:scale-95 inline-flex items-center justify-center h-[38px] w-[128px] sm:h-[44px] sm:w-[148px] rounded-lg bg-black overflow-hidden relative border border-slate-800"
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
                    className="transition-all hover:scale-[1.03] active:scale-95 inline-flex items-center justify-center h-[38px] w-[128px] sm:h-[44px] sm:w-[148px] rounded-lg bg-black overflow-hidden relative border border-slate-800"
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

              <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4 space-y-3">
                <h5 className="font-bold text-red-400 text-sm sm:text-lg flex items-center gap-2">
                    <Trash2 className="w-4 h-4 sm:w-5 h-5" /> Zona de Risco
                </h5>
                {showDeleteConfirm ? (
                    <div className="space-y-3">
                        <input 
                            type="text"
                            className="w-full bg-[#0F1115] border border-[#262B37] rounded-lg px-3 py-2 text-xs sm:text-sm text-white"
                            placeholder={currentUser.nome}
                            value={deleteConfirmationText}
                            onChange={(e) => setDeleteConfirmationText(e.target.value)}
                        />
                        <div className="flex gap-2">
                            <button onClick={() => setShowDeleteConfirm(false)} className="px-3 py-1.5 bg-slate-800 rounded-lg text-xs">Cancelar</button>
                            <button onClick={handleAccountDeletionProcess} className="px-3 py-1.5 bg-red-600 rounded-lg text-xs">Confirmar</button>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => setShowDeleteConfirm(true)} className="px-4 py-2 bg-red-600/10 text-red-400 rounded-lg text-xs sm:text-sm">Eliminar Conta</button>
                )}
              </div>
            </div>
          ) : (
             <div className="space-y-4 sm:space-y-8">
                <div className="flex bg-[#171A21] p-1 rounded-lg sm:rounded-xl gap-1 border border-[#262B37]">
                  <button 
                    onClick={() => setActiveTab('fan')} 
                    className={`flex-1 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-bold transition-all ${activeTab === 'fan' ? 'bg-[#025bc5] text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-[#1D212B]'}`}
                  >
                    Fãs
                  </button>
                  <button 
                    onClick={() => setActiveTab('organizer')} 
                    className={`flex-1 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-bold transition-all ${activeTab === 'organizer' ? 'bg-[#025bc5] text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-[#1D212B]'}`}
                  >
                    Organizações
                  </button>
                </div>

                {activeTab === 'fan' ? (
                  <div className="space-y-4 text-center py-4 sm:py-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 text-brand-blue" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">A Área de Fãs é na App</h2>
                    <p className="text-slate-400 max-w-sm mx-auto text-xs sm:text-sm">
                      Para seguir provas e gerir o seu perfil de adepto, utilize a nossa aplicação móvel.
                    </p>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 pt-2 sm:pt-4">
                  <a 
                    href="https://apps.apple.com/pt/app/vroom-pt/id6751053867"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all hover:scale-[1.03] active:scale-95 inline-flex items-center justify-center h-[36px] w-[120px] sm:h-[44px] sm:w-[148px] rounded-lg bg-black overflow-hidden relative border border-slate-800"
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
                    className="transition-all hover:scale-[1.03] active:scale-95 inline-flex items-center justify-center h-[36px] w-[120px] sm:h-[44px] sm:w-[148px] rounded-lg bg-black overflow-hidden relative border border-slate-800"
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
                ) : (
                  <div className="space-y-4">
                    {showLoginFields ? (
                      <form onSubmit={handleLoginSubmit} className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">E-mail</label>
                          <input 
                            type="email" 
                            required
                            className="w-full bg-[#171A21] border border-[#262B37] rounded-lg px-3 py-2 text-xs text-white focus:border-brand-blue outline-none transition-colors"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">Senha</label>
                          <input 
                            type="password" 
                            required
                            className="w-full bg-[#171A21] border border-[#262B37] rounded-lg px-3 py-2 text-xs text-white focus:border-brand-blue outline-none transition-colors"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                          />
                        </div>
                        <button 
                          type="submit" 
                          disabled={loading}
                          className="w-full bg-[#025bc5] hover:bg-blue-600 text-white font-bold py-3 rounded-lg text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                          {loading ? 'A processar...' : 'Entrar no Painel'}
                        </button>
                        <button 
                          type="button"
                          onClick={() => setShowLoginFields(false)}
                          className="w-full text-slate-400 text-xs hover:text-white transition-colors"
                        >
                          Não tem conta? Registe-se
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleOrgSubmit} className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">Nome da Organização</label>
                            <input 
                              type="text" 
                              required
                              className="w-full bg-[#171A21] border border-[#262B37] rounded-lg px-3 py-2 text-xs text-white focus:border-brand-blue outline-none transition-colors"
                              value={orgName}
                              onChange={(e) => setOrgName(e.target.value)}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">E-mail</label>
                            <input 
                              type="email" 
                              required
                              className="w-full bg-[#171A21] border border-[#262B37] rounded-lg px-3 py-2 text-xs text-white focus:border-brand-blue outline-none transition-colors"
                              value={orgEmail}
                              onChange={(e) => setOrgEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">Senha</label>
                            <input 
                              type="password" 
                              required
                              className="w-full bg-[#171A21] border border-[#262B37] rounded-lg px-3 py-2 text-xs text-white focus:border-brand-blue outline-none transition-colors"
                              value={orgPassword}
                              onChange={(e) => setOrgPassword(e.target.value)}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">Confirmar</label>
                            <input 
                              type="password" 
                              required
                              className="w-full bg-[#171A21] border border-[#262B37] rounded-lg px-3 py-2 text-xs text-white focus:border-brand-blue outline-none transition-colors"
                              value={orgConfirmPassword}
                              onChange={(e) => setOrgConfirmPassword(e.target.value)}
                            />
                          </div>
                        </div>
                        <button 
                          type="submit" 
                          disabled={loading}
                          className="w-full bg-[#025bc5] hover:bg-blue-600 text-white font-bold py-3 rounded-lg text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                          {loading ? 'A processar...' : 'Criar Conta'}
                        </button>
                        <button 
                          type="button"
                          onClick={() => setShowLoginFields(true)}
                          className="w-full text-slate-400 text-xs hover:text-white transition-colors"
                        >
                          Já tem conta? Inicie sessão
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
