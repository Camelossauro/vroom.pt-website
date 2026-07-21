import { useState } from 'react';
import { faqData } from '../data';
import { ChevronDown, Smartphone, LayoutDashboard, UserCheck } from 'lucide-react';

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

  return (
    <section id="faq" className="py-10 sm:py-20 bg-[#0F1115] relative border-b border-[#262B37]">
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <span className="text-[10px] font-montserrat font-bold text-slate-400 tracking-widest uppercase">
            Dúvidas Frequentes
          </span>
          <h2 className="font-display font-bold text-xl sm:text-4xl lg:text-5xl text-white tracking-tight mt-3 mb-3 sm:mb-6 leading-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-slate-400 text-xs sm:text-lg font-light leading-relaxed">
            Selecione a categoria correspondente para encontrar respostas rápidas.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex bg-[#171A21] p-1 rounded-xl gap-1 max-w-lg mx-auto mb-6 sm:mb-12 border border-[#262B37]">
          <button
            onClick={() => {
              setSelectedCategory('fans');
              setExpandedId('faq-f1');
            }}
            className={`flex-1 py-2.5 sm:py-3 rounded-xl text-[10px] sm:text-xs font-bold transition-all text-center flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
              selectedCategory === 'fans' 
                ? 'bg-brand-blue text-white shadow-sm' 
                : 'text-slate-400 hover:text-white hover:bg-[#1D212B]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Para Adeptos
          </button>
          
          <button
            onClick={() => {
              setSelectedCategory('organizations');
              setExpandedId('faq-o1');
            }}
            className={`flex-1 py-2.5 sm:py-3 rounded-xl text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
              selectedCategory === 'organizations' 
                ? 'bg-brand-blue text-white shadow-sm' 
                : 'text-slate-400 hover:text-white hover:bg-[#1D212B]'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Para Clubes
          </button>

          <button
            onClick={() => {
              setSelectedCategory('drivers');
              setExpandedId(null);
            }}
            className={`flex-1 py-2.5 sm:py-3 rounded-xl text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
              selectedCategory === 'drivers' 
                ? 'bg-brand-blue text-white shadow-sm' 
                : 'text-slate-400 hover:text-white hover:bg-[#1D212B]'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Para Pilotos
          </button>
        </div>

        {/* Accordions List */}
        <div className="space-y-4 bg-[#1D212B] p-4 sm:p-6 md:p-8 rounded-xl border border-[#262B37] shadow-sm relative z-10 text-left">
          {selectedCategory === 'drivers' ? (
            <div className="py-12 text-center">
              <UserCheck className="w-8 h-8 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-300 font-semibold text-lg">Esta parte ainda está para vir.</p>
              <p className="text-slate-500 text-sm mt-2">Estamos a preparar funcionalidades exclusivas para pilotos.</p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="border-b border-[#262B37] last:border-0 pb-4 last:pb-0 pt-4 first:pt-0"
                >
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full flex items-center justify-between text-left py-2 font-bold text-white hover:text-brand-blue transition-colors gap-4 cursor-pointer"
                  >
                    <span className="text-sm md:text-base font-semibold leading-tight">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${
                      isExpanded ? 'rotate-180 text-brand-blue' : ''
                    }`} />
                  </button>
                  
                  {/* Expandable answer */}
                  <div className={`overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'max-h-40 opacity-100 mt-2.5' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Support Banner */}
        <div className="text-center mt-12">
          <p className="text-xs text-slate-400 font-light">
            Ainda tem dúvidas? <button onClick={() => window.location.href = 'mailto:contacto@vroomapp.pt'} className="font-semibold text-brand-blue hover:text-white cursor-pointer hover:underline">Entre em contacto com o nosso suporte português</button>. Resposta em menos de 2 horas.
          </p>
        </div>

      </div>
    </section>
  );
}
