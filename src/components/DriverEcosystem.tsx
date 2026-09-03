import { 
  Users, User
} from 'lucide-react';
import { motion } from 'motion/react';
import { mockDrivers } from '../data';

export default function DriverEcosystem() {
  return (
    <section id="drivers" className="py-12 sm:py-20 bg-[#0F1115] relative border-b border-[#262B37]">
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.3 }}
          className="max-w-xl mx-auto liquid-glass-card rounded-2xl p-8 sm:p-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full mb-4">
            <span className="flex h-2 w-2 relative">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
            </span>
            <span className="text-xs font-bold text-brand-blue uppercase font-montserrat">PILOTOS</span>
          </div>
          
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mt-1 mb-4">
            Está para vir
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base font-light">
            Novidades e perfis oficiais de pilotos em breve na plataforma Vroom.pt.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
