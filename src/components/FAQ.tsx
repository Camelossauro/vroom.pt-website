import { useState } from 'react';
import { faqData } from '../data';
import { ChevronDown, Smartphone, LayoutDashboard, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState<'fans' | 'organizations' | 'drivers'>('fans');
  const [expandedId, setExpandedId] = useState<string | null>('faq-f1');

  const filteredFaqs = faqData.filter(faq => faq.category === selectedCategory);

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const categories = [
    { id: 'fans' as const, label: 'Para Adeptos', icon: Smartphone, defaultFaq: 'faq-f1' },
    { id: 'organizations' as const, label: 'Para Clubes', icon: LayoutDashboard, defaultFaq: 'faq-o1' },
    { id: 'drivers' as const, label: 'Para Pilotos', icon: UserCheck, defaultFaq: null },
  ];

  return (
    <section id="faq" className="py-10 sm:py-20 bg-[#0F1115] relative border-b border-[#262B37]">
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-16"
        >
          <span className="text-[10px] font-montserrat font-bold text-slate-400 tracking-widest uppercase">
            Dúvidas Frequentes
          </span>
          <h2 className="font-display font-bold text-xl sm:text-4xl lg:text-5xl text-white tracking-tight mt-3 mb-3 sm:mb-6 leading-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-slate-400 text-xs sm:text-lg font-light leading-relaxed">
            Selecione a categoria correspondente para encontrar respostas rápidas.
          </p>
        </motion.div>

        {/* Categories Tab Selector with Animated Background Pill */}
        <div className="flex bg-[#171A21] p-1 rounded-xl gap-1 max-w-lg mx-auto mb-6 sm:mb-12 border border-[#262B37]">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setExpandedId(cat.defaultFaq);
                }}
                whileTap={{ scale: 0.96 }}
                className={`relative flex-1 py-2.5 sm:py-3 rounded-lg text-[10px] sm:text-xs font-bold transition-colors flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer z-10 ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="faqTabPill"
                    className="absolute inset-0 bg-brand-blue rounded-lg shadow-md -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5 sm:w-4 h-4 relative z-10" />
                <span className="relative z-10">{cat.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Accordions List Container with Category Switching Animation */}
        <div className="bg-[#1D212B] p-4 sm:p-6 md:p-8 rounded-2xl border border-[#262B37] shadow-xl relative z-10 text-left overflow-hidden min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {selectedCategory === 'drivers' ? (
                <div className="py-12 text-center">
                  <UserCheck className="w-8 h-8 text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-300 font-semibold text-lg">Esta parte ainda está para vir.</p>
                  <p className="text-slate-500 text-sm mt-2">Estamos a preparar funcionalidades exclusivas para pilotos.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => {
                    const isExpanded = expandedId === faq.id;
                    return (
                      <div 
                        key={faq.id}
                        className="border-b border-[#262B37] last:border-0 pb-4 last:pb-0 pt-4 first:pt-0"
                      >
                        <button
                          onClick={() => toggleExpand(faq.id)}
                          className="w-full flex items-center justify-between text-left py-2 font-bold text-white hover:text-brand-blue transition-colors gap-4 cursor-pointer group"
                        >
                          <span className="text-sm md:text-base font-semibold leading-tight group-hover:text-brand-blue transition-colors">
                            {faq.question}
                          </span>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex-shrink-0"
                          >
                            <ChevronDown className={`w-4 h-4 ${isExpanded ? 'text-brand-blue' : 'text-slate-400'}`} />
                          </motion.div>
                        </button>
                        
                        {/* Animated Expandable Answer */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed pt-2">
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Support Banner */}
        <div className="text-center mt-12">
          <p className="text-xs text-slate-400 font-light">
            Ainda tem dúvidas? <a href="mailto:contacto@vroomapp.pt" className="font-semibold text-brand-blue hover:text-white cursor-pointer hover:underline">Entre em contacto com o nosso suporte português</a>. Resposta em menos de 2 horas.
          </p>
        </div>

      </div>
    </section>
  );
}

