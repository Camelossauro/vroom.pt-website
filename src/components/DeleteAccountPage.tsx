import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import DeleteAccountContent from './DeleteAccountContent';

export default function DeleteAccountPage({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F1115] text-white p-6 sm:p-12 md:p-20">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" /> Voltar
        </button>
        <div className="bg-[#171A21] p-8 md:p-12 rounded-2xl border border-[#262B37]">
            <DeleteAccountContent />
        </div>
      </div>
    </div>
  );
}
