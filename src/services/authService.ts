import { supabase, supabaseUrl, supabaseAnonKey } from '../lib/supabase';

export type UserRole = 'unauthorized' | 'authorized' | 'admin';

export interface OrganizerProfile {
  id: string;
  nome: string;
  email: string;
  regiao: string;
  telefone?: string;
  instagram?: string;
  role: UserRole;
  account_deletion_requested: boolean;
  has_transactions: boolean;
  created_at?: string;
  jwt?: string; // Token saved for authorization
}

// Local simulation keys (fallback when Supabase is not configured)
const PROFILES_KEY = 'vroom_sim_profiles';
const CURRENT_USER_KEY = 'vroom_sim_current_user';

// Setup initial simulated data if not exists
const initializeSimulationDB = () => {
  const existing = localStorage.getItem(PROFILES_KEY);
  if (!existing || existing === 'undefined') {
    const initialProfiles: OrganizerProfile[] = [
      {
        id: 'admin-1',
        nome: 'Administrador Vroom.pt',
        email: 'admin@vroom.pt',
        regiao: 'Lisboa',
        telefone: '+351 912 345 678',
        instagram: '@vroom.pt',
        role: 'admin',
        account_deletion_requested: false,
        has_transactions: false,
        created_at: new Date().toISOString()
      },
      {
        id: 'clube-1',
        nome: 'Clube Automóvel de Braga',
        email: 'geral@cab.pt',
        regiao: 'Braga',
        telefone: '+351 922 444 555',
        instagram: '@cab_braga',
        role: 'authorized',
        account_deletion_requested: false,
        has_transactions: false,
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'clube-2',
        nome: 'Estoril Racing Club',
        email: 'info@estorilracing.pt',
        regiao: 'Cascais / Estoril',
        telefone: '+351 933 555 666',
        instagram: '@estoril_racing',
        role: 'unauthorized',
        account_deletion_requested: false,
        has_transactions: false,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    localStorage.setItem(PROFILES_KEY, JSON.stringify(initialProfiles));
  }
};

initializeSimulationDB();

export const authService = {
  // Check if real Supabase client is properly configured
  isSupabaseConfigured(): boolean {
    const url = import.meta.env.VITE_SUPABASE_URL || (window as any).VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY || (window as any).VITE_SUPABASE_ANON_KEY;
    return !!url && url !== 'undefined' && url !== '' && !!key && key !== 'placeholder' && key !== '';
  },

  // 1. SIGNUP / REGISTER FLOW (Official SDK auth.signUp as specified)
  async registerOrganizer(data: {
    nome: string;
    email: string;
    password?: string;
  }): Promise<{ success: boolean; profile: OrganizerProfile; message: string }> {
    
    const isReal = this.isSupabaseConfigured();
    const temporaryPassword = data.password || 'VroomTemp123!';
    
    if (isReal) {
      console.log('Sending real Supabase auth signup via official SDK...');
      try {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: data.email,
          password: temporaryPassword,
          options: {
            data: {
              full_name: data.nome
            }
          }
        });

        if (signUpError) {
          throw signUpError;
        }

        const realUserId = signUpData.user?.id;
        const jwtToken = signUpData.session?.access_token;

        if (!realUserId) {
          throw new Error('Não foi possível obter o ID do utilizador registado.');
        }

        const newProfile: OrganizerProfile = {
          id: realUserId,
          nome: data.nome,
          email: data.email,
          regiao: 'Geral',
          role: 'unauthorized', // Pending validation by default
          account_deletion_requested: false,
          has_transactions: false,
          created_at: new Date().toISOString(),
          jwt: jwtToken
        };

        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newProfile));
        return {
          success: true,
          profile: newProfile,
          message: 'Conta submetida para verificação. A gestão de eventos e alterações é feita na App Vroom.pt.'
        };

      } catch (error: any) {
        console.error('Real Supabase registration failed:', error);
        throw error;
      }
    }

    // Fallback to simulation
    const simulatedId = 'sim_' + Math.random().toString(36).substring(2, 9);
    const newSimProfile: OrganizerProfile = {
      id: simulatedId,
      nome: data.nome,
      email: data.email,
      regiao: 'Geral',
      role: 'unauthorized',
      account_deletion_requested: false,
      has_transactions: false,
      created_at: new Date().toISOString()
    };

    const profiles = this.getAllProfiles();
    profiles.push(newSimProfile);
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newSimProfile));

    return {
      success: true,
      profile: newSimProfile,
      message: 'Simulação: Conta de organização pendente registada com sucesso.'
    };
  },

  // 2. GET CURRENT LOGGED IN USER
  getCurrentUser(): OrganizerProfile | null {
    const userJson = localStorage.getItem(CURRENT_USER_KEY);
    if (!userJson || userJson === 'undefined' || userJson === 'null') return null;
    try {
      return JSON.parse(userJson) as OrganizerProfile;
    } catch (e) {
      console.error('Failed to parse current user:', e);
      return null;
    }
  },

  // 3. GET PROFILE WITH JWT (Direct HTTP GET as specified)
  async getProfile(userId: string, jwtToken: string): Promise<OrganizerProfile | null> {
    const isReal = this.isSupabaseConfigured();
    if (isReal) {
      console.log(`Sending real Supabase profiles query: id=eq.${userId}`);
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${userId}`, {
          method: 'GET',
          headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${jwtToken}`
          }
        });

        if (response.ok) {
          try {
            const profiles = await response.json();
            if (profiles && Array.isArray(profiles) && profiles.length > 0) {
              const rawProfile = profiles[0];
              const updatedProfile: OrganizerProfile = {
                id: rawProfile.id,
                nome: rawProfile.full_name || rawProfile.nome || 'Organização Vroom',
                email: rawProfile.email || '',
                regiao: rawProfile.regiao || 'Geral',
                telefone: rawProfile.telefone || '',
                instagram: rawProfile.instagram || '',
                role: (rawProfile.role as UserRole) || 'unauthorized',
                account_deletion_requested: !!rawProfile.account_deletion_requested,
                has_transactions: !!rawProfile.has_transactions,
                created_at: rawProfile.created_at,
                jwt: jwtToken
              };
              
              // Sync with current user storage
              localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedProfile));
              return updatedProfile;
            }
          } catch (e) {
            console.error('Failed to parse Supabase profile JSON:', e);
          }
        }
      } catch (error) {
        console.error('Failed to get real Supabase profile:', error);
      }
    }
    return this.getCurrentUser();
  },

  // 4. SECURE ACCOUNT DELETION (Call our secure backend proxy as requested)
  async deleteAccount(userId: string, jwtToken?: string): Promise<{ 
    success: boolean; 
    message: string;
  }> {
    const isReal = this.isSupabaseConfigured();

    if (isReal && jwtToken) {
      console.log(`Invoking secure backend DELETE proxy for user ${userId}...`);
      try {
        const response = await fetch('/api/delete-account', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
          },
          body: JSON.stringify({ userId })
        });

        if (!response.ok) {
          let errorMsg = 'Erro do servidor ao eliminar a conta.';
          try {
            const errData = await response.json();
            errorMsg = errData.error || errorMsg;
          } catch (e) {
            console.error('Failed to parse deletion error JSON:', e);
          }
          throw new Error(errorMsg);
        }

        let result: any = {};
        try {
          result = await response.json();
        } catch (e) {
          console.error('Failed to parse deletion success JSON:', e);
        }
        
        // Success: clear session
        localStorage.removeItem(CURRENT_USER_KEY);
        return {
          success: true,
          message: result.message || 'Conta eliminada definitivamente em conformidade com o RGPD.'
        };

      } catch (error: any) {
        console.error('Real account deletion failed:', error);
        throw error;
      }
    }

    // Fallback to simulation
    console.log(`Performing simulated deletion for ${userId}`);
    const profiles = this.getAllProfiles();
    const filteredProfiles = profiles.filter((p: any) => p.id !== userId);
    localStorage.setItem(PROFILES_KEY, JSON.stringify(filteredProfiles));

    // Clear session
    localStorage.removeItem(CURRENT_USER_KEY);

    return {
      success: true,
      message: 'Simulação: A sua conta foi permanentemente apagada com sucesso.'
    };
  },

  // 5. LOGIN (Real POST request for token generation)
  async login(email: string, password?: string): Promise<{ success: boolean; profile?: OrganizerProfile; message?: string }> {
    const isReal = this.isSupabaseConfigured();
    const loginPassword = password || 'VroomTemp123!';

    if (isReal) {
      console.log('Performing real Supabase login POST token request...');
      try {
        const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
          method: 'POST',
          headers: {
            'apikey': supabaseAnonKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password: loginPassword
          })
        });

        if (!response.ok) {
          let errorMsg = 'Credenciais de início de sessão incorretas.';
          try {
            const errData = await response.json();
            errorMsg = errData.error_description || errData.message || errorMsg;
          } catch (e) {
            console.error('Failed to parse login error JSON:', e);
          }
          return { 
            success: false, 
            message: errorMsg 
          };
        }

        let loginResult: any = {};
        try {
          loginResult = await response.json();
        } catch (e) {
          console.error('Failed to parse login success JSON:', e);
          return { success: false, message: 'Erro ao processar resposta do servidor.' };
        }

        const jwtToken = loginResult.access_token;
        const realUserId = loginResult.user?.id;

        if (!realUserId || !jwtToken) {
          return { success: false, message: 'Dados de início de sessão inválidos.' };
        }

        // Fetch official profile details
        const profile = await this.getProfile(realUserId, jwtToken);
        if (profile) {
          return { success: true, profile };
        } else {
          // Fallback if rest profiles row hasn't been fetched
          const defaultProfile: OrganizerProfile = {
            id: realUserId,
            nome: loginResult.user?.user_metadata?.full_name || loginResult.user?.user_metadata?.nome || 'Organização Vroom',
            email: email,
            regiao: 'Geral',
            role: 'unauthorized',
            account_deletion_requested: false,
            has_transactions: false,
            jwt: jwtToken
          };
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(defaultProfile));
          return { success: true, profile: defaultProfile };
        }

      } catch (error: any) {
        console.error('Real login error:', error);
        return { success: false, message: error.message || 'Erro ao comunicar com o servidor.' };
      }
    }

    // Fallback to simulation
    const profiles = this.getAllProfiles();
    const profile = profiles.find((p: any) => p.email.toLowerCase() === email.toLowerCase());
    
    if (!profile) {
      return { success: false, message: 'Nenhuma conta de simulação encontrada com este e-mail.' };
    }

    if (profile.role === 'admin') {
      return { success: false, message: 'Início de sessão administrativo não suportado.' };
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(profile));
    return { success: true, profile };
  },

  // 6. LOGOUT
  logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // Helpers kept for simulation administration preview
  getAllProfiles(): OrganizerProfile[] {
    const raw = localStorage.getItem(PROFILES_KEY);
    if (!raw || raw === 'undefined' || raw === 'null') return [];
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error('Failed to parse all profiles:', e);
      return [];
    }
  },

  approveOrganizer(userId: string): { success: boolean; profile: OrganizerProfile } {
    const profiles = this.getAllProfiles();
    const idx = profiles.findIndex((p: any) => p.id === userId);
    if (idx !== -1) {
      profiles[idx].role = 'authorized';
      localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        currentUser.role = 'authorized';
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
      }
      return { success: true, profile: profiles[idx] };
    }
    throw new Error('Perfil não encontrado.');
  }
};
