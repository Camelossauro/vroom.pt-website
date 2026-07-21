import { Trash2 } from 'lucide-react';

export default function TermsOfUseContent({ onOpenDeleteAccount }: { onOpenDeleteAccount: () => void }) {
  return (
    <div className="text-left text-base text-slate-300 font-light space-y-6 leading-relaxed max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">TERMOS E CONDIÇÕES DE UTILIZAÇÃO</h1>
          <p className="text-sm text-slate-400">Última atualização: 21 de julho de 2026</p>
        </div>
        <button 
          onClick={onOpenDeleteAccount}
          className="flex items-center gap-2 px-4 py-2 bg-brand-red/10 text-brand-red border border-brand-red/20 rounded-xl hover:bg-brand-red hover:text-white transition-all text-xs font-semibold w-fit cursor-pointer"
        >
          <Trash2 className="w-4 h-4" /> Como eliminar conta
        </button>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Introdução</h2>
        <p>Os presentes Termos e Condições regulam o acesso e a utilização da aplicação móvel Vroom.pt, do website https://vroomapp.pt e de todos os serviços disponibilizados através da plataforma.</p>
        <p>Ao criar uma conta, aceder ou utilizar a plataforma, o utilizador declara que leu, compreendeu e aceita integralmente os presentes Termos e Condições.</p>
        <p>Caso o utilizador não concorde com qualquer disposição constante deste documento, deverá cessar imediatamente a utilização da plataforma.</p>
        <p>A utilização da Vroom.pt implica igualmente a aceitação da respetiva Política de Privacidade, disponível no website oficial.</p>
      </section>
      
      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Identificação do Prestador do Serviço</h2>
        <p>A plataforma Vroom.pt é disponibilizada por:</p>
        <div className="bg-[#0F1115] p-4 rounded-xl border border-[#262B37] mt-2">
          <p className="font-semibold text-white">João Francisco Quintas Pinheiro</p>
          <p>Empresário em Nome Individual</p>
          <p>Vila Real, Portugal</p>
          <p className="mt-2 text-brand-blue">contacto@vroomapp.pt</p>
        </div>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Objeto</h2>
        <p>A Vroom.pt é uma plataforma digital dedicada ao desporto motorizado em Portugal, permitindo, entre outras funcionalidades:</p>
        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li>consultar eventos;</li>
          <li>acompanhar organizações;</li>
          <li>receber notificações;</li>
          <li>consultar documentação relativa aos eventos;</li>
          <li>gerir eventos por parte das organizações autorizadas;</li>
          <li>divulgar atividades relacionadas com o desporto motorizado.</li>
        </ul>
        <p className="mt-4">A Vroom.pt atua como intermediária tecnológica entre organizações e utilizadores, disponibilizando uma plataforma para divulgação e gestão de eventos.</p>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Definições</h2>
        <div className="space-y-4">
          <div>
            <p className="font-bold text-white">Plataforma</p>
            <p>A aplicação móvel Vroom.pt, o website oficial e todos os serviços associados.</p>
          </div>
          <div>
            <p className="font-bold text-white">Utilizador</p>
            <p>Qualquer pessoa singular que utilize a plataforma.</p>
          </div>
          <div>
            <p className="font-bold text-white">Organização</p>
            <p>Clube, associação, empresa, entidade ou promotor autorizado a publicar e gerir eventos na plataforma.</p>
          </div>
          <div>
            <p className="font-bold text-white">Conta</p>
            <p>Perfil criado para acesso às funcionalidades disponibilizadas.</p>
          </div>
          <div>
            <p className="font-bold text-white">Evento</p>
            <p>Qualquer prova, concentração, passeio, exposição, convívio, festival ou outra atividade relacionada com o desporto motorizado publicada na plataforma.</p>
          </div>
        </div>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Aceitação dos Termos</h2>
        <p>Ao utilizar a plataforma, o utilizador confirma que:</p>
        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li>possui capacidade jurídica para celebrar este acordo ou utiliza a plataforma com autorização do respetivo representante legal, quando aplicável;</li>
          <li>fornecerá informações verdadeiras, completas e atualizadas;</li>
          <li>utilizará a plataforma em conformidade com a legislação aplicável e com os presentes Termos.</li>
        </ul>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Criação de Conta</h2>
        <p>A criação de conta é gratuita.</p>
        <p>O utilizador compromete-se a:</p>
        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li>fornecer dados corretos;</li>
          <li>manter os dados atualizados;</li>
          <li>proteger as suas credenciais de acesso;</li>
          <li>não partilhar a sua palavra-passe com terceiros.</li>
        </ul>
        <p className="mt-4">Cada utilizador é responsável por toda a atividade realizada através da sua conta. Caso suspeite de utilização não autorizada, deverá contactar imediatamente a Vroom.pt.</p>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Contas de Organizações</h2>
        <p>As organizações podem solicitar o acesso às funcionalidades destinadas à publicação e gestão de eventos. A criação da conta não confere automaticamente o direito de publicar conteúdos.</p>
        <p>Todas as organizações estão sujeitas a um processo de verificação manual efetuado pela administração da plataforma. A Vroom.pt poderá:</p>
        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li>aprovar ou rejeitar pedidos de registo;</li>
          <li>solicitar informações adicionais;</li>
          <li>solicitar documentação comprovativa;</li>
          <li>suspender processos de verificação;</li>
          <li>recusar pedidos sem obrigação de apresentar fundamentação pública.</li>
        </ul>
        <p className="mt-4">A aprovação depende exclusivamente da avaliação efetuada pelo administrador da plataforma.</p>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Utilização Permitida</h2>
        <p>Os utilizadores comprometem-se a utilizar a plataforma de forma responsável, respeitando a legislação em vigor, os presentes Termos e os direitos de terceiros.</p>
        <p>É permitido, entre outras ações:</p>
        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li>consultar eventos;</li>
          <li>seguir organizações;</li>
          <li>receber notificações;</li>
          <li>descarregar documentos disponibilizados pelas organizações;</li>
          <li>utilizar as funcionalidades previstas na aplicação.</li>
        </ul>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Utilização Proibida</h2>
        <p>É expressamente proibido:</p>
        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li>utilizar identidades falsas; criar contas fraudulentas;</li>
          <li>tentar aceder a contas de terceiros; interferir com o funcionamento da plataforma;</li>
          <li>contornar mecanismos de segurança; copiar automaticamente conteúdos da plataforma;</li>
          <li>distribuir malware; utilizar robôs ou sistemas automatizados sem autorização;</li>
          <li>publicar conteúdos ilegais; violar direitos de propriedade intelectual;</li>
          <li>utilizar a plataforma para fins ilícitos;</li>
          <li>praticar qualquer comportamento suscetível de prejudicar a Vroom.pt, os restantes utilizadores ou terceiros.</li>
        </ul>
        <p className="mt-4 italic text-brand-red/80">A violação destas regras poderá originar a suspensão ou eliminação imediata da conta, sem direito a qualquer indemnização.</p>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">10. Publicação de Eventos</h2>
        <p>A publicação de eventos encontra-se reservada às organizações previamente aprovadas pela Vroom.pt.</p>
        <p>Cada organização é exclusivamente responsável pelos conteúdos que publica, incluindo descrições, datas, horários, regulamentos, documentos, fotografias, cartazes e localização dos eventos.</p>
        <p>A Vroom.pt não garante que a informação publicada pelas organizações esteja permanentemente atualizada ou isenta de erros. As organizações comprometem-se a manter toda a informação correta, completa e atualizada.</p>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">11. Responsabilidade pelas Informações Publicadas</h2>
        <p>Cada organização é a única responsável pela legalidade, exatidão, integridade, autenticidade e atualização dos conteúdos que publica na plataforma.</p>
        <p>A Vroom.pt não valida previamente o conteúdo técnico dos eventos, regulamentos, horários, documentos ou restantes informações disponibilizadas pelas organizações. A responsabilidade pertence exclusivamente à entidade que a publicou.</p>
        <p>Sempre que tome conhecimento de conteúdos suscetíveis de violar a legislação aplicável ou os presentes Termos, a Vroom.pt poderá proceder à respetiva remoção sem aviso prévio.</p>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">12. Conteúdos Publicados</h2>
        <p>As organizações garantem que possuem todos os direitos necessários sobre os conteúdos que disponibilizam na plataforma. Ao publicar qualquer conteúdo, a organização declara que:</p>
        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li>é titular dos respetivos direitos ou possui autorização para a sua utilização;</li>
          <li>o conteúdo não viola direitos de autor, marcas registadas ou outros direitos de terceiros;</li>
          <li>o conteúdo não contém informação falsa, ofensiva, difamatória, discriminatória ou ilícita;</li>
          <li>a publicação respeita toda a legislação aplicável.</li>
        </ul>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">13. Licença de Utilização dos Conteúdos</h2>
        <p>Os direitos de propriedade intelectual sobre fotografias, logótipos, cartazes, documentos e restantes conteúdos permanecem na titularidade da organização ou do respetivo autor.</p>
        <p>Ao publicar conteúdos na plataforma, a organização concede à Vroom.pt uma licença gratuita, não exclusiva, revogável, mundial e válida enquanto os conteúdos permanecerem publicados.</p>
        <p>Esta licença permite à Vroom.pt apresentar os conteúdos na aplicação/website, promover os eventos e utilizá-los em materiais institucionais ou redes sociais. Esta licença não transfere qualquer direito de propriedade intelectual para a Vroom.pt.</p>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">14. Propriedade Intelectual da Plataforma</h2>
        <p>Todos os direitos relativos à plataforma Vroom.pt pertencem ao respetivo titular ou aos seus licenciadores (nome, identidade visual, logótipos, design, código-fonte, funcionalidades).</p>
        <p>É expressamente proibido copiar, reproduzir, modificar, distribuir ou efetuar engenharia inversa sobre qualquer componente da plataforma.</p>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">15. Suspensão e Encerramento de Contas</h2>
        <p>A Vroom.pt poderá suspender ou eliminar qualquer conta em situações de utilização fraudulenta, abusiva, ilegal ou violação dos presentes Termos. A suspensão poderá ocorrer sem aviso prévio e não confere direito a indemnização.</p>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">16. Disponibilidade do Serviço</h2>
        <p>A Vroom.pt procura assegurar a disponibilidade contínua, mas não garante que os serviços estejam livres de interrupções decorrentes de manutenção, atualizações ou falhas técnicas. Não haverá responsabilidade por prejuízos resultantes da indisponibilidade temporária.</p>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">17. Atualizações da Plataforma</h2>
        <p>A Vroom.pt reserva-se o direito de adicionar ou remover funcionalidades, alterar a interface e modificar serviços a qualquer momento para melhoria do desempenho.</p>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">18. Funcionalidades Pagas</h2>
        <p>A Vroom.pt poderá disponibilizar, no futuro, funcionalidades sujeitas a pagamento. As condições, preços e regras serão previamente divulgadas.</p>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">19. Exclusão de Garantias</h2>
        <p>A plataforma é disponibilizada no estado em que se encontra ("as is"). A Vroom.pt não garante disponibilidade ininterrupta, ausência de erros ou que satisfaça necessidades específicas.</p>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">20. Limitação de Responsabilidade</h2>
        <p>A Vroom.pt não será responsável por danos decorrentes da utilização da plataforma, informações incorretas de organizações, cancelamento de eventos ou falhas de serviços de terceiros.</p>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">21. Indemnização</h2>
        <p>O utilizador/organização compromete-se a indemnizar a Vroom.pt por reclamações resultantes da violação destes Termos, legislação ou direitos de terceiros.</p>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">22. Força Maior</h2>
        <p>A Vroom.pt não será responsabilizada por incumprimentos decorrentes de eventos fora do seu controlo (catástrofes, pandemias, falhas generalizadas de energia, etc).</p>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">23. Comunicações</h2>
        <p>As comunicações serão efetuadas por email, notificações na app ou avisos no website. Contacto: <span className="text-brand-blue">contacto@vroomapp.pt</span></p>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">24. Alterações aos Termos e Condições</h2>
        <p>A Vroom.pt reserva-se o direito de alterar estes Termos. Alterações relevantes serão comunicadas. A continuação da utilização constitui aceitação.</p>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">25. Cessação da Utilização</h2>
        <p>O utilizador pode solicitar a eliminação da conta a qualquer momento. A Vroom.pt também pode terminar o acesso conforme previsto nestes Termos.</p>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">26. Lei Aplicável</h2>
        <p>Os presentes Termos são regulados pela legislação da República Portuguesa.</p>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">27. Resolução de Litígios</h2>
        <p>Procurar-se-á resolução amigável. Litígios serão submetidos aos tribunais portugueses (Comarca de Vila Real quando admissível). Recurso a entidades RAL disponível para consumidores.</p>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">28. Nulidade Parcial</h2>
        <p>A invalidade de uma disposição não afeta as restantes.</p>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">29. Acordo Integral</h2>
        <p>Estes Termos e a Política de Privacidade constituem o acordo integral entre as partes.</p>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">30. Contactos</h2>
        <div className="bg-[#0F1115] p-4 rounded-xl border border-[#262B37]">
          <p className="font-bold text-white">Vroom.pt</p>
          <p>João Francisco Quintas Pinheiro</p>
          <p>Empresário em Nome Individual</p>
          <p>Vila Real, Portugal</p>
          <p className="mt-2 text-brand-blue">contacto@vroomapp.pt</p>
        </div>
      </section>

      <hr className="my-8 border-slate-700" />

      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">31. Entrada em Vigor</h2>
        <p>Estes Termos entram em vigor na data da publicação e aplicam-se a todos os utilizadores. A utilização continuada constitui aceitação integral.</p>
      </section>
    </div>
  );
}
