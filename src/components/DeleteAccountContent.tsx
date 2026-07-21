export default function DeleteAccountContent() {
  return (
    <div className="text-left text-base text-slate-300 font-light space-y-6 leading-relaxed max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-2">COMO ELIMINAR A MINHA CONTA</h1>
      <p className="text-sm text-slate-400 mb-8">Informações para organizações sobre a remoção de dados e encerramento de conta.</p>

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Através da Aplicação Móvel</h2>
        <p>A forma mais rápida de eliminar a sua conta de organização é diretamente na aplicação Vroom.pt:</p>
        <ul className="list-disc pl-5 space-y-3 mt-4">
          <li>Abra a aplicação <span className="text-white font-medium">Vroom.pt</span> no seu dispositivo.</li>
          <li>Aceda ao seu <span className="text-white font-medium">Perfil</span> (botão "Criar Evento" no canto inferior direito).</li>
          <li>Toque em <span className="text-white font-medium">Editar Perfil</span> (botão com um lápis).</li>
          <li>Desça até ao fim e selecione a opção <span className="text-brand-red font-medium">Eliminar Conta</span>.</li>
          <li>Confirme a sua decisão na janela de aviso.</li>
        </ul>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Através deste Website (Portal)</h2>
        <p>Também pode gerir e eliminar a sua conta de organização através do nosso portal web:</p>
        <ul className="list-disc pl-5 space-y-3 mt-4">
          <li>Aceda ao <span className="text-white font-medium">Portal Vroom.pt</span> no topo desta página.</li>
          <li>Faça <span className="text-white font-medium">Login</span> com as suas credenciais.</li>
          <li>Aceda à área de <span className="text-white font-medium">Definições de Conta</span>.</li>
          <li>Clique no botão <span className="text-brand-red font-medium">Eliminar Conta Permanentemente</span>.</li>
        </ul>
      </section>
      
      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Solicitação via E-mail</h2>
        <p>Caso não consiga eliminar a conta através da app nem do website, pode solicitar a eliminação manual da sua conta enviando um e-mail para:</p>
        <div className="bg-[#0F1115] p-4 rounded-xl border border-[#262B37] mt-2">
          <p className="font-semibold text-brand-blue">contacto@vroomapp.pt</p>
          <p className="text-xs mt-1 text-slate-500">Nota: O pedido deve ser enviado a partir do endereço de e-mail associado à conta que deseja eliminar.</p>
        </div>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. O que acontece aos meus dados?</h2>
        <p>Ao confirmar a eliminação da conta:</p>
        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li>O seu perfil deixará de estar visível para outros utilizadores.</li>
          <li>As suas informações pessoais (nome, e-mail, fotografia) serão removidas permanentemente dos nossos servidores ativos num prazo de 30 dias.</li>
          <li>Históricos de eventos seguidos e notificações serão apagados.</li>
        </ul>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Período de Retenção</h2>
        <p>Por motivos de segurança e conformidade legal, alguns dados podem ser mantidos em cópias de segurança (backups) por um período adicional, mas nunca serão utilizados para fins comerciais ou de marketing após a eliminação da conta.</p>
      </section>
    </div>
  );
}
