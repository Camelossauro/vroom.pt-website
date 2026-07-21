export interface DatabaseEvent {
  id: string;
  nome: string;
  natureza: string | null;
  modalidade: string | null;
  veiculo_alvo: string | null;
  plano_destaque: string | null;
  ambito: string | null;
  data_inicio: string | null;
  data_fim: string | null;
  meses: string[] | null;
  local: string | null;
  organizadora_default: string | null;
  cor: string | null;
  descricao: string | null;
  site_evento: string | null;
  logo_organizadora_default: string | null;
  imagem_evento: string | null;
  latitude: number | null;
  longitude: number | null;
  is_mensal: boolean | null;
  imagens_extra: string[] | null;
  notificacao_48h_enviada: boolean | null;
  notificacao_premium_enviada: boolean | null;
  views_count: number;
  organizer_id: string | null;
  status: string | null;
  likes_count: number;
}

export interface MotorsportEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  category: 'Rali' | 'Velocidade' | 'Karting' | 'Offroad' | 'Encontro' | 'Outros';
  organizer: string;
  organizerLogo?: string;
  isVerifiedOrganizer?: boolean;
  status: 'Inscrições Abertas' | 'Confirmado' | 'Terminado' | 'Em Breve';
  trackName: string;
  schedule: { time: string; activity: string }[];
  documents: { name: string; size: string; type: string }[];
  description: string;
  weather: { temp: string; condition: string };
  image: string;
  likes: number;
}

export interface Driver {
  id: string;
  name: string;
  avatar: string;
  car: string;
  compNumber: string;
  championship: string;
  team: string;
  sponsors: string[];
  bio: string;
  followers: number;
  achievements: string[];
  upcomingRaces: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  avatar: string;
  text: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  category: 'fans' | 'organizations' | 'drivers';
  question: string;
  answer: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  ctaText: string;
}
