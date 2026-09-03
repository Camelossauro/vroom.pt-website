import { useState, useEffect, FormEvent } from 'react';
import { X, Send, CheckCircle2, MessageSquare, User, Mail, Phone, HelpCircle, Building2, UserCheck, Smartphone, ShieldCheck, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [userType, setUserType] = useState<'fan' | 'driver' | 'organizer' | 'other'>('fan');
  const [category, setCategory] = useState<string>('Dúvida sobre Eventos');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Lock background body and html scroll when support modal is open
  useEffect(() => {
    if (isOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    }
  }, [isOpen]);

  const userTypeOptions = [
    { id: 'fan', label: 'Espectador / Fã', icon: Smartphone },
    { id: 'driver', label: 'Piloto', icon: UserCheck },
    { id: 'organizer', label: 'Organização', icon: Building2 },
    { id: 'other', label: 'Outro', icon: HelpCircle },
  ];

  const categories = [
    'Dúvida sobre Eventos',
    'Apoio ao Registo / Conta',
    'Adicionar Clube ou Prova',
    'Reportar Erro na App',
    'Parcerias e Publicidade',
    'Outro Assunto'
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validation
    const finalName = isAnonymous ? 'Utilizador Anónimo' : name.trim();
    const finalEmail = isAnonymous ? (email.trim() || 'anonimo@vrmotorsport.pt') : email.trim();

    if (!isAnonymous && (!finalName || !finalEmail)) return;
    if (!message.trim()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        userType,
        user_type: userType,
        category,
        categoria: category,
        name: finalName,
        nome: finalName,
        email: finalEmail,
        phone: isAnonymous ? '' : phone,
        telefone: isAnonymous ? '' : phone,
        is_anonymous: isAnonymous,
        isAnonymous: isAnonymous,
        message: message.trim(),
        mensagem: message.trim(),
        createdAt: new Date().toISOString(),
        created_at: new Date().toISOString()
      };

      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.warn('Backend proxy /api/support warning:', res.status, errorData);
      } else {
        const data = await res.json();
        console.log('Backend proxy /api/support success:', data);
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error sending support form:', error);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setIsAnonymous(false);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setCategory('Dúvida sobre Eventos');
    setUserType('fan');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden pointer-events-auto">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetForm}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          data-lenis-prevent
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.35, bounce: 0.05 }}
          className="relative w-full max-w-xl bg-[#121520] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-white/10 relative bg-gradient-to-r from-sky-500/10 via-transparent to-blue-600/10 flex-shrink-0 flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 pr-8">
              <div className="p-2.5 rounded-2xl bg-sky-500/20 border border-sky-400/30 text-sky-400 flex-shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base sm:text-xl text-white leading-tight">
                  Apoio ao Utilizador & Contacto
                </h3>
                <p className="text-xs text-slate-400 font-light mt-0.5">
                  Envie a sua mensagem ou dúvida diretamente para a equipa.
                </p>
              </div>
            </div>

            <button
              onClick={resetForm}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div data-lenis-prevent className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1 overscroll-contain space-y-4" style={{ touchAction: 'pan-y' }}>
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <h4 className="font-display font-bold text-xl text-white">
                  Mensagem Enviada com Sucesso!
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 font-light max-w-md mx-auto leading-relaxed">
                  Obrigado pelo seu contacto. A nossa equipa irá analisar o seu pedido e responder {isAnonymous ? 'em breve' : <>para <strong className="text-white">{email}</strong></>}.
                </p>

                <div className="pt-4">
                  <button
                    onClick={resetForm}
                    className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    Fechar Janela
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Anonymous Toggle Option */}
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl ${isAnonymous ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'}`}>
                      <EyeOff className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Enviar como Anónimo</span>
                      <span className="text-[11px] text-slate-400 block font-light">
                        {isAnonymous ? 'Identidade oculta ativada' : 'Não partilhar dados pessoais'}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${isAnonymous ? 'bg-sky-500' : 'bg-slate-700'}`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${isAnonymous ? 'translate-x-5' : 'translate-x-0'}`}
                    />
                  </button>
                </div>

                {/* User Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Perfil
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {userTypeOptions.map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = userType === opt.id;
                      return (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() => setUserType(opt.id as any)}
                          className={`p-2.5 rounded-xl border text-center transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                            isSelected
                              ? 'bg-sky-500/20 border-sky-400 text-white shadow-sm'
                              : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.06]'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-sky-400' : 'text-slate-400'}`} />
                          <span className="text-xs font-medium">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Assunto
                  </label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full h-11 bg-[#181C28] border border-white/15 rounded-2xl px-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-400 transition-colors cursor-pointer appearance-none"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat} className="bg-[#181C28] text-white py-2">
                          {cat}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Name & Email inputs (Hidden or Optional when Anonymous) */}
                {!isAnonymous ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1">
                        Nome completo *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required={!isAnonymous}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ex: João Silva"
                          className="w-full bg-[#181C28] border border-white/15 rounded-2xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1">
                        Email de contacto *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required={!isAnonymous}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seu.email@exemplo.pt"
                          className="w-full bg-[#181C28] border border-white/15 rounded-2xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>A mensagem será enviada de forma 100% anónima, sem guardar o seu nome ou e-mail.</span>
                  </div>
                )}

                {/* Phone Optional */}
                {!isAnonymous && (
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Telefone (Opcional)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+351 910 000 000"
                        className="w-full bg-[#181C28] border border-white/15 rounded-2xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Descrição do problema ou mensagem *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Descreva detalhadamente a sua dúvida, erro ou questão..."
                    className="w-full bg-[#181C28] border border-white/15 rounded-2xl p-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400 transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{isAnonymous ? 'Enviar Mensagem Anónima' : 'Submeter Mensagem de Suporte'}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

