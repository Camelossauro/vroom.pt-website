import { MotorsportEvent, Driver, Testimonial, FAQItem, PricingPlan } from './types';

export const PortugueseTracks = [
  {
    id: 'aia',
    name: 'Autódromo Internacional do Algarve',
    location: 'Portimão',
    length: '4.653 km',
    corners: 15,
    opened: '2008',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=600&auto=format&fit=crop',
    coords: { x: 35, y: 85 } // relative layout coordinates for visual map
  },
  {
    id: 'estoril',
    name: 'Autódromo do Estoril',
    location: 'Cascais',
    length: '4.182 km',
    corners: 13,
    opened: '1972',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=600&auto=format&fit=crop',
    coords: { x: 28, y: 70 }
  },
  {
    id: 'braga',
    name: 'Circuito Vasco Sameiro',
    location: 'Braga',
    length: '3.020 km',
    corners: 13,
    opened: '1990',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=600&auto=format&fit=crop',
    coords: { x: 38, y: 15 }
  },
  {
    id: 'lousada',
    name: 'Pista de Ralicross de Lousada',
    location: 'Lousada',
    length: '1.010 km',
    corners: 7,
    opened: '1987',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop',
    coords: { x: 42, y: 22 }
  },
  {
    id: 'baltar',
    name: 'Kartódromo de Baltar',
    location: 'Paredes',
    length: '1.025 km',
    corners: 11,
    opened: '1995',
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=600&auto=format&fit=crop',
    coords: { x: 39, y: 25 }
  }
];

export const mockEvents: MotorsportEvent[] = [
  {
    id: 'ev-1',
    title: 'Rali de Portugal - WRC',
    date: '14-17 Maio 2026',
    location: 'Matosinhos / Região Norte',
    category: 'Rali',
    organizer: 'ACP - Automóvel Club de Portugal',
    organizerLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100&auto=format&fit=crop',
    isVerifiedOrganizer: true,
    status: 'Em Breve',
    trackName: 'Troços do Norte (Fafe, Amarante, Lousada)',
    description: 'A mítica etapa portuguesa do Campeonato do Mundo de Ralis (WRC). Milhares de adeptos reúnem-se na emblemática classificativa de Fafe e no troço de Lousada para ver os melhores pilotos do mundo sobre terra.',
    weather: { temp: '22°C', condition: 'Sol' },
    likes: 2450,
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop',
    schedule: [
      { time: 'Quinta-Feira 09:00', activity: 'Shakedown Baltar' },
      { time: 'Quinta-Feira 19:00', activity: 'Super Especial de Lousada' },
      { time: 'Sexta-Feira 08:00', activity: 'Troços de Arganil e Mortágua' },
      { time: 'Sábado 07:30', activity: 'Troços de Vieira do Minho e Amarante' },
      { time: 'Domingo 08:00', activity: 'Fafe Lameirinha & Power Stage' }
    ],
    documents: [
      { name: 'Guia_do_Espectador_WRC_2026.pdf', size: '12.4 MB', type: 'pdf' },
      { name: 'Regulamento_Particular_WRC.pdf', size: '3.1 MB', type: 'pdf' },
      { name: 'Horarios_Detalhados_Oficiais.pdf', size: '1.2 MB', type: 'pdf' }
    ]
  },
  {
    id: 'ev-2',
    title: 'Estoril Classics 2026',
    date: '12-14 Outubro 2026',
    location: 'Cascais',
    category: 'Velocidade',
    organizer: 'Race Ready',
    organizerLogo: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=100&auto=format&fit=crop',
    isVerifiedOrganizer: true,
    status: 'Inscrições Abertas',
    trackName: 'Autódromo do Estoril',
    description: 'O maior evento de viaturas clássicas do sul da Europa. Veja de perto bólides históricos da Fórmula 1, Classic Endurance, Group C, e o troféu ibérico de Turismos no traçado histórico do Estoril.',
    weather: { temp: '19°C', condition: 'Parcialmente Nublado' },
    likes: 1890,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop',
    schedule: [
      { time: 'Sexta-Feira 09:00', activity: 'Treinos Livres de Todas as Categorias' },
      { time: 'Sábado 10:00', activity: 'Qualificações Classic F1 e Endurance' },
      { time: 'Sábado 15:00', activity: 'Corrida 1 - Iberia Historic Endurance' },
      { time: 'Domingo 11:00', activity: 'Desfile de Clássicos & Corrida F1 Históricos' },
      { time: 'Domingo 16:30', activity: 'Corrida Principal Group C' }
    ],
    documents: [
      { name: 'Horarios_Estoril_Classics_2026.pdf', size: '840 KB', type: 'pdf' },
      { name: 'Regulamento_Desportivo_RaceReady.pdf', size: '2.4 MB', type: 'pdf' },
      { name: 'Lista_Inscritos_Provisoria.pdf', size: '1.5 MB', type: 'pdf' }
    ]
  },
  {
    id: 'ev-3',
    title: 'Circuito de Vila Real - WTCR & Nacional',
    date: '03-05 Julho 2026',
    location: 'Vila Real',
    category: 'Velocidade',
    organizer: 'APCVR - Associação Automóvel de Vila Real',
    organizerLogo: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=100&auto=format&fit=crop',
    isVerifiedOrganizer: true,
    status: 'Inscrições Abertas',
    trackName: 'Circuito Internacional de Vila Real',
    description: 'A "Bielorrússia portuguesa" acolhe o lendário circuito citadino de Vila Real. Corridas intensas de Turismos, Clássicos, e a incrível receção do público transmontano nas bancadas naturais.',
    weather: { temp: '28°C', condition: 'Muito Calor' },
    likes: 3120,
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop',
    schedule: [
      { time: 'Sexta-Feira 14:00', activity: 'Treinos Livres CPV (Velocidade)' },
      { time: 'Sábado 09:30', activity: 'Sessões de Qualificação de Vila Real' },
      { time: 'Sábado 16:00', activity: 'Corrida 1 - Super Legends' },
      { time: 'Domingo 10:15', activity: 'Corrida 1 - CPV (Campeonato Nacional)' },
      { time: 'Domingo 15:00', activity: 'Corrida 2 - CPV & Encerramento' }
    ],
    documents: [
      { name: 'Dossier_Inscricoes_Equipas.pdf', size: '4.7 MB', type: 'pdf' },
      { name: 'Regulamento_Particular_VilaReal.pdf', size: '1.8 MB', type: 'pdf' }
    ]
  },
  {
    id: 'ev-4',
    title: 'Campeonato de Portugal de Ralicross - Lousada',
    date: '20-21 Junho 2026',
    location: 'Lousada',
    category: 'Offroad',
    organizer: 'CAL - Clube Automóvel de Lousada',
    status: 'Confirmado',
    trackName: 'Pista de Ralicross de Lousada',
    description: 'Muita terra, asfalto, e lutas porta-com-porta no traçado do Eurocircuito de Lousada. Categoria Super Cars, Super 1600 e Kartcross numa prova eletrizante a contar para o campeonato nacional.',
    weather: { temp: '24°C', condition: 'Limpo' },
    likes: 920,
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=800&auto=format&fit=crop',
    schedule: [
      { time: 'Sábado 10:00', activity: 'Treinos Livres Oficiais' },
      { time: 'Sábado 14:00', activity: 'Manga de Qualificação 1 & 2' },
      { time: 'Domingo 09:30', activity: 'Warm-up & Manga de Qualificação 3' },
      { time: 'Domingo 14:00', activity: 'Meias-Finais e Finais' }
    ],
    documents: [
      { name: 'Ficha_Inscricao_CAL_2026.pdf', size: '550 KB', type: 'pdf' },
      { name: 'Regulamento_Ralicross_Oficial.pdf', size: '2.1 MB', type: 'pdf' }
    ]
  },
  {
    id: 'ev-5',
    title: 'Encontro Nacional de Clássicos Desportivos',
    date: '28 Junho 2026',
    location: 'Sintra / Estoril',
    category: 'Encontro',
    organizer: 'Vroom.pt Club Portugal',
    status: 'Inscrições Abertas',
    trackName: 'Estrada da Lagoa Azul / Sintra',
    description: 'Um encontro descontraído para proprietários e apaixonados por viaturas desportivas clássicas e pré-clássicas. Passagem pela mítica rampa de Sintra e exposição pública no Parque de Monserrate.',
    weather: { temp: '21°C', condition: 'Sol e Brisa Marítima' },
    likes: 670,
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800&auto=format&fit=crop',
    schedule: [
      { time: '09:00', activity: 'Concentração na Marina de Cascais & Café' },
      { time: '10:30', activity: 'Início da Rota Cénica em direção a Sintra' },
      { time: '12:30', activity: 'Exposição das viaturas no Parque' },
      { time: '13:00', activity: 'Almoço Convívio e Entrega de Lembranças' }
    ],
    documents: [
      { name: 'Roadbook_Encontro_Sintra.pdf', size: '3.4 MB', type: 'pdf' },
      { name: 'Regulhas_Participacao_Classicos.pdf', size: '600 KB', type: 'pdf' }
    ]
  }
];

export const mockDrivers: Driver[] = [
  {
    id: 'dr-1',
    name: 'António Félix da Costa',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    car: 'Porsche 99X Electric / FE',
    compNumber: '13',
    championship: 'ABB FIA Formula E World Championship',
    team: 'TAG Heuer Porsche Formula E Team',
    sponsors: ['Porsche', 'Red Bull', 'NOS', 'Sata', 'Vroom.pt'],
    bio: 'Nascido em Cascais, António Félix da Costa é um dos pilotos portugueses mais bem-sucedidos internacionalmente, campeão mundial de Fórmula E (2019-2020) e vencedor de prestigiadas provas como o GP de Macau e as 24 Horas de Le Mans na categoria LMP2.',
    followers: 124500,
    achievements: [
      'Campeão Mundial de Fórmula E (2019/20)',
      'Vencedor das 24H de Le Mans LMP2 (2022)',
      'Bicampeão do GP de Macau F3 (2012, 2016)',
      'Piloto oficial Porsche Motorsport'
    ],
    upcomingRaces: [
      'London E-Prix - Julho 2026',
      'Berlin E-Prix - Agosto 2026'
    ]
  },
  {
    id: 'dr-2',
    name: 'Filipe Albuquerque',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    car: 'Acura ARX-06 (GTP) / Oreca 07 (LMP2)',
    compNumber: '10',
    championship: 'IMSA SportsCar Championship / WEC',
    team: 'Wayne Taylor Racing with Andretti / United Autosports',
    sponsors: ['Acura', 'Andretti', 'Galp', 'BPI', 'Vroom.pt'],
    bio: 'Filipe Albuquerque é o "Speedy" de Coimbra. É uma lenda mundial das corridas de Resistência (Endurance), tendo conquistado vitórias lendárias nas 24 Horas de Daytona, 24 Horas de Le Mans e campeonatos mundiais do WEC e ELMS.',
    followers: 84200,
    achievements: [
      'Vencedor das 24 Horas de Daytona à Geral (2018, 2021)',
      'Vencedor das 24 Horas de Le Mans LMP2 (2020)',
      'Campeão do Mundo FIA WEC LMP2 (2019/20)',
      'Campeão European Le Mans Series (2020)'
    ],
    upcomingRaces: [
      '6 Hours of Watkins Glen - IMSA - Junho 2026',
      'Road America Sportscar Showcase - IMSA - Agosto 2026'
    ]
  },
  {
    id: 'dr-3',
    name: 'Armindo Araújo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    car: 'Skoda Fabia RS Rally2',
    compNumber: '2',
    championship: 'CPR - Campeonato de Portugal de Ralis',
    team: 'The Racing Factory',
    sponsors: ['Skoda', 'Pirelli', 'Valvoline', 'MEO', 'Sata'],
    bio: 'Armindo Araújo é o piloto mais galardoado da história dos ralis em Portugal. Natural de Santo Tirso, arrecadou múltiplos títulos de Campeão Nacional de Ralis e é bicampeão mundial de ralis de produção (PWRC).',
    followers: 43600,
    achievements: [
      '7x Campeão de Portugal de Ralis (CPR)',
      'Bicampeão do Mundo de Ralis de Produção PWRC (2009, 2010)',
      'Vencedor do Rali de Portugal de Produção'
    ],
    upcomingRaces: [
      'Rali de Castelo Branco - CPR - Junho 2026',
      'Rali Vinho da Madeira - CPR - Agosto 2026'
    ]
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'António Silva',
    role: 'Diretor de Competição',
    organization: 'CAM - Clube Automóvel do Minho',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop',
    text: 'A transição para o Vroom.pt Dashboard mudou completamente a forma como gerimos os nossos eventos no Circuito de Braga. Antes, passávamos dias a responder a emails, a validar regulamentos e a enviar atualizações por SMS. Agora, criamos o evento, carregamos os documentos e os mais de 500 subscritores recebem uma notificação push imediata. É um salto tecnológico indispensável para o desporto português.',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Diana Parente',
    role: 'Gestora de Comunicação',
    organization: 'Race Ready / Estoril Classics',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop',
    text: 'Promover eventos de clássicos de grande dimensão requer uma comunicação segmentada e de alto impacto. No Vroom.pt, conseguimos atingir diretamente os entusiastas certos. Os relatórios de visualizações, downloads de documentos de regulamentos e a capacidade de enviar alertas de última hora sobre alterações de horários aumentou a nossa eficiência em mais de 70%.',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Francisco Santos',
    role: 'Presidente',
    organization: 'Clube Escuderia Castelo Branco',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop',
    text: 'Integrámos os planos de rali da Escuderia no Vroom.pt e fomos surpreendidos com a adesão. Tivemos mais de 12.000 visualizações na nossa página de organizador no primeiro mês e milhares de fãs acederam diretamente ao mapa do troço e regulamentos.',
    rating: 5
  }
];

export const faqData: FAQItem[] = [
  // FANS
  {
    id: 'faq-f1',
    category: 'fans',
    question: 'A aplicação móvel Vroom.pt é gratuita?',
    answer: 'Sim, a plataforma Vroom.pt é 100% gratuita para todos. Para os adeptos, explorar eventos, calendários, regulamentos e usar a aplicação móvel não tem qualquer custo. Para os organizadores, a criação de perfil verificado e a publicação de eventos também são totalmente gratuitas.'
  },
  {
    id: 'faq-f2',
    category: 'fans',
    question: 'Como posso receber notificações de novos eventos na minha zona?',
    answer: 'Na aplicação móvel, pode ativar a geolocalização e as notificações push. Sempre que for publicado um evento (Rali, Velocidade, Ralicross, ou Concentrações de Clássicos) num raio selecionado ou num autódromo que siga, receberá um alerta automático com todos os detalhes e links rápidos.'
  },
  {
    id: 'faq-f3',
    category: 'fans',
    question: 'Posso navegar diretamente para o local da prova através da app?',
    answer: 'Sim! Cada evento tem as coordenadas GPS exatas, quer seja o Autódromo do Estoril ou uma curva específica de um troço de rali na serra. Basta clicar no ícone de navegação da app para abrir diretamente as indicações no Google Maps, Apple Maps ou Waze.'
  },
  // ORGANIZATIONS
  {
    id: 'faq-o1',
    category: 'organizations',
    question: 'Como funciona o Vroom.pt para as Organizações de automobilismo?',
    answer: 'O Vroom.pt funciona como uma plataforma integrada de comunicação. Através da app oficial, as organizações verificadas (clubes, promotores, autódromos) podem publicar os seus calendários oficiais de provas, atualizar horários provisórios, anexar regulamentos particulares e comunicar alertas de segurança de última hora que chegam como notificações push diretamente aos telemóveis dos espetadores nos troços.'
  },
  {
    id: 'faq-o2',
    category: 'organizations',
    question: 'Como posso obter a verificação oficial do meu clube?',
    answer: 'Basta clicar em "Verificar Clube" no canto superior direito do site ou no botão de registo na secção de Organizações. Introduza o nome oficial do clube, e-mail corporativo e região de atuação. A nossa equipa de validação nacional valida a autenticidade jurídica da organização e ativa as permissões de edição no prazo máximo de 24h.'
  },
  {
    id: 'faq-o3',
    category: 'organizations',
    question: 'Existem custos de adesão para os organizadores e clubes?',
    answer: 'Não. A presença básica, a criação de perfil verificado e a publicação autónoma de eventos no Vroom.pt são totalmente livres de encargos. Queremos digitalizar e unir todo o desporto motorizado nacional, por isso garantimos que as ferramentas de base estão acessíveis a todas as comissões organizadoras de Portugal de forma gratuita.'
  },
  // DRIVERS
  {
    id: 'faq-d1',
    category: 'drivers',
    question: 'Como posso reivindicar a minha Página de Piloto Oficial?',
    answer: 'Os pilotos licenciados em Portugal podem solicitar a verificação de perfil. Basta preencher o formulário de piloto, carregar o seu palmarés, fotografia oficial, equipa e o carro atual. Após aprovação rápida pela equipa do Vroom.pt, obterá o visto azul e acesso de edição do perfil.'
  },
  {
    id: 'faq-d2',
    category: 'drivers',
    question: 'Como é que a página ajuda a atrair patrocinadores?',
    answer: 'O Vroom.pt funciona como o portfólio digital oficial do piloto. Pode exibir os logótipos e links dos seus patrocinadores com alta visibilidade numa plataforma focada em entusiastas e marcas de desporto motorizado. A sua contagem de seguidores, palmarés e calendário de provas integrado servem de social proof para apresentar a marcas parceiras.'
  },
  {
    id: 'faq-d3',
    category: 'drivers',
    question: 'Posso interagir diretamente com os meus fãs através da app?',
    answer: 'Brevemente, os pilotos poderão publicar updates rápidos diretamente do parque de assistência (fotos, tempos virtuais, notas de troço). Todos os utilizadores que seguem a sua página recebem um alerta push instantâneo, mantendo-os ligados à sua prestação na pista ou troço de rali.'
  }
];

export const pricingPlans: PricingPlan[] = [];
