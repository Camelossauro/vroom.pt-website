import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser middleware
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Events API Endpoint
  app.get("/api/events", async (req, res) => {
    try {
      const supabaseUrl = process.env.VITE_SUPABASE_URL;
      const anonKey = process.env.VITE_SUPABASE_ANON_KEY;

      if (supabaseUrl && anonKey && anonKey !== "placeholder") {
        const response = await fetch(`${supabaseUrl}/rest/v1/eventos_now_v2?select=*&status=eq.published&order=data_inicio.asc`, {
          headers: {
            "apikey": anonKey,
            "Authorization": `Bearer ${anonKey}`
          }
        });

        if (response.ok) {
          const supabaseEvents = await response.json();
          if (Array.isArray(supabaseEvents) && supabaseEvents.length > 0) {
            return res.json({ source: "supabase_api", events: supabaseEvents });
          }
        }
      }

      // Default API Events Data
      const defaultApiEvents = [
        {
          id: "ev-1",
          nome: "Rali de Portugal - WRC 2026",
          natureza: "Competição",
          modalidade: "Rally",
          veiculo_alvo: "Automóveis",
          plano_destaque: "premium",
          ambito: "Internacional",
          data_inicio: "2026-05-14T08:00:00Z",
          data_fim: "2026-05-17T18:00:00Z",
          meses: ["Maio"],
          local: "Fafe & Região Norte",
          organizadora_default: "ACP - Automóvel Club de Portugal",
          logo_organizadora_default: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100&auto=format&fit=crop",
          imagem_evento: "https://vroom-images.b-cdn.net/IMAGENS_EVENTOS_CORRIDAS/A%20ALGARVE/algarve_2.jpg",
          latitude: 41.4518,
          longitude: -8.1706,
          descricao: "A mítica etapa portuguesa do Campeonato do Mundo de Ralis (WRC). Milhares de adeptos reúnem-se na emblemática classificativa de Fafe e no troço de Lousada para ver os melhores pilotos do mundo sobre terra.",
          site_evento: "https://www.ralideportugal.pt",
          is_mensal: false,
          imagens_extra: [
            "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop"
          ],
          views_count: 14250,
          likes_count: 2450,
          organizer_id: "org-acp",
          status: "published"
        },
        {
          id: "ev-2",
          nome: "Estoril Classics 2026",
          natureza: "Competição",
          modalidade: "Velocidade",
          veiculo_alvo: "Automóveis",
          plano_destaque: "premium",
          ambito: "Internacional",
          data_inicio: "2026-10-12T09:00:00Z",
          data_fim: "2026-10-14T18:00:00Z",
          meses: ["Outubro"],
          local: "Autódromo do Estoril",
          organizadora_default: "Race Ready",
          logo_organizadora_default: "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=100&auto=format&fit=crop",
          imagem_evento: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop",
          latitude: 38.7506,
          longitude: -9.3942,
          descricao: "O maior evento de viaturas clássicas do sul da Europa. Veja de perto bólides históricos da Fórmula 1, Classic Endurance, Group C, e o troféu ibérico de Turismos no traçado histórico do Estoril.",
          site_evento: "https://www.estorilclassics.pt",
          is_mensal: false,
          imagens_extra: [
            "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop"
          ],
          views_count: 8900,
          likes_count: 1890,
          organizer_id: "org-raceready",
          status: "published"
        },
        {
          id: "ev-3",
          nome: "Circuito Internacional de Vila Real - WTCR",
          natureza: "Competição",
          modalidade: "Velocidade",
          veiculo_alvo: "Automóveis",
          plano_destaque: "premium",
          ambito: "Internacional",
          data_inicio: "2026-07-03T09:00:00Z",
          data_fim: "2026-07-05T19:00:00Z",
          meses: ["Julho"],
          local: "Circuito de Vila Real",
          organizadora_default: "Associação Automóvel de Vila Real",
          logo_organizadora_default: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=100&auto=format&fit=crop",
          imagem_evento: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop",
          latitude: 41.2959,
          longitude: -7.7464,
          descricao: "A mítica pista citadina de Vila Real acolhe as emoções do Campeonato Nacional e Internacional de Turismos.",
          site_evento: "https://www.circuitovilareal.pt",
          is_mensal: false,
          views_count: 12100,
          likes_count: 3120,
          organizer_id: "org-apcvr",
          status: "published"
        },
        {
          id: "ev-4",
          nome: "Campeonato de Portugal de Ralicross - Lousada",
          natureza: "Competição",
          modalidade: "Ralicross",
          veiculo_alvo: "Automóveis",
          plano_destaque: "default",
          ambito: "Nacional",
          data_inicio: "2026-06-20T09:00:00Z",
          data_fim: "2026-06-21T18:00:00Z",
          meses: ["Junho"],
          local: "Eurocircuito de Lousada",
          organizadora_default: "Clube Automóvel de Lousada",
          imagem_evento: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=800&auto=format&fit=crop",
          latitude: 41.2778,
          longitude: -8.2831,
          descricao: "Muita terra, asfalto, e lutas porta-com-porta no traçado do Eurocircuito de Lousada.",
          is_mensal: false,
          views_count: 4200,
          likes_count: 920,
          organizer_id: "org-cal",
          status: "published"
        },
        {
          id: "ev-5",
          nome: "Encontro Mensal de Clássicos Desportivos - Sintra",
          natureza: "Lazer",
          modalidade: "Circuito",
          veiculo_alvo: "Automóveis",
          plano_destaque: "default",
          ambito: "Regional",
          data_inicio: "2026-06-28T09:00:00Z",
          data_fim: "2026-06-28T13:00:00Z",
          meses: ["Junho"],
          local: "Sintra / Estoril",
          organizadora_default: "Vroom.pt Club Portugal",
          imagem_evento: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800&auto=format&fit=crop",
          descricao: "Um encontro descontraído para proprietários e apaixonados por viaturas desportivas clássicas.",
          is_mensal: true,
          views_count: 2800,
          likes_count: 670,
          organizer_id: "org-vroom",
          status: "published"
        },
        {
          id: "ev-6",
          nome: "Troféu Nacional Enduro / Hard Enduro - Valongo",
          natureza: "Competição",
          modalidade: "Enduro",
          veiculo_alvo: "Motas",
          plano_destaque: "premium",
          ambito: "Nacional",
          data_inicio: "2026-09-05T08:00:00Z",
          data_fim: "2026-09-06T17:00:00Z",
          meses: ["Setembro"],
          local: "Serra de Valongo",
          organizadora_default: "FMP - Federação de Motociclismo de Portugal",
          imagem_evento: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop",
          latitude: 41.1894,
          longitude: -8.4983,
          descricao: "Os melhores pilotos de Hard Enduro superam trilhos extremos na serra de Valongo.",
          site_evento: "https://www.fmp.pt",
          is_mensal: false,
          views_count: 5100,
          likes_count: 1430,
          organizer_id: "org-fmp",
          status: "published"
        },
        {
          id: "ev-7",
          nome: "4 Horas do Portimão - European Le Mans Series",
          natureza: "Competição",
          modalidade: "Velocidade",
          veiculo_alvo: "Automóveis",
          plano_destaque: "premium",
          ambito: "Internacional",
          data_inicio: "2026-10-16T09:00:00Z",
          data_fim: "2026-10-18T18:00:00Z",
          meses: ["Outubro"],
          local: "Autódromo Internacional do Algarve",
          organizadora_default: "Parkalgar / ELMS",
          logo_organizadora_default: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100&auto=format&fit=crop",
          imagem_evento: "https://vroom-images.b-cdn.net/IMAGENS_EVENTOS_CORRIDAS/A%20ALGARVE/algarve_2.jpg",
          latitude: 37.2317,
          longitude: -8.6283,
          descricao: "A mítica grande final da época da European Le Mans Series no Autódromo do Algarve, reunindo protótipos LMP2, LMP3 e GT3.",
          site_evento: "https://www.autodromodoalgarve.com",
          is_mensal: false,
          views_count: 9800,
          likes_count: 2100,
          organizer_id: "org-elms",
          status: "published"
        },
        {
          id: "ev-8",
          nome: "Rali Vinho da Madeira - CPR",
          natureza: "Competição",
          modalidade: "Rally",
          veiculo_alvo: "Automóveis",
          plano_destaque: "premium",
          ambito: "Nacional",
          data_inicio: "2026-07-30T09:00:00Z",
          data_fim: "2026-08-01T19:00:00Z",
          meses: ["Julho", "Agosto"],
          local: "Funchal & Estradas da Madeira",
          organizadora_default: "Club Automóvel da Madeira",
          imagem_evento: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop",
          latitude: 32.6500,
          longitude: -16.9080,
          descricao: "Uma das mais prestigiadas provas em asfalto da Europa, percorrendo as paisagens fabulosas da Ilha da Madeira.",
          site_evento: "https://www.ralivinhomadeira.org",
          is_mensal: false,
          views_count: 11200,
          likes_count: 2900,
          organizer_id: "org-cam",
          status: "published"
        }
      ];

      return res.json({ source: "server_api", events: defaultApiEvents });
    } catch (err: any) {
      console.error("[Vroom API] Error fetching events:", err);
      return res.status(500).json({ error: "Erro ao gerar lista de eventos da API." });
    }
  });

  app.get("/api/events/featured", async (req, res) => {
    try {
      const response = await fetch(`http://localhost:${PORT}/api/events`);
      const data = await response.json();
      if (data && Array.isArray(data.events)) {
        const featured = data.events.filter((ev: any) => 
          ev.plano_destaque === 'premium' || ev.plano_destaque === 'destaque' || ev.plano_destaque === 'gold'
        );
        return res.json({ source: data.source, featuredEvents: featured.length > 0 ? featured : data.events.slice(0, 3) });
      }
      return res.json({ featuredEvents: [] });
    } catch (err: any) {
      return res.status(500).json({ error: "Erro ao carregar eventos em destaque." });
    }
  });

  // DELETE account API route
  app.post("/api/delete-account", async (req, res) => {
    try {
      const { userId } = req.body;
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Cabeçalho Authorization em falta ou inválido." });
      }

      const jwt = authHeader.split(" ")[1];
      const supabaseUrl = process.env.VITE_SUPABASE_URL;
      const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!supabaseUrl) {
        return res.status(500).json({ error: "VITE_SUPABASE_URL não configurado no servidor." });
      }

      if (!serviceRoleKey) {
        return res.status(500).json({ error: "SUPABASE_SERVICE_ROLE_KEY não configurado no servidor." });
      }

      console.log(`[Vroom API] Verifying JWT token for user: ${userId}`);

      // Step 1: Verify the JWT token with Supabase Auth to confirm user identity
      const verifyResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
        method: "GET",
        headers: {
          "apikey": process.env.VITE_SUPABASE_ANON_KEY || "",
          "Authorization": `Bearer ${jwt}`
        }
      });

      if (!verifyResponse.ok) {
        const errText = await verifyResponse.text();
        console.error("[Vroom API] JWT verification failed:", errText);
        return res.status(401).json({ error: "Token de utilizador inválido ou expirado." });
      }

      const verifiedUser = await verifyResponse.json();
      const verifiedUserId = verifiedUser.id || verifiedUser.sub;

      // Ensure the user is only deleting their own account
      if (verifiedUserId !== userId) {
        return res.status(403).json({ error: "Não autorizado a eliminar esta conta." });
      }

      // Step 2: Delete user from auth.users using the service_role key
      console.log(`[Vroom API] Performing secure admin delete on auth.users for ${userId}...`);
      const deleteResponse = await fetch(`${supabaseUrl}/auth/v1/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          "apikey": serviceRoleKey,
          "Authorization": `Bearer ${serviceRoleKey}`
        }
      });

      if (!deleteResponse.ok) {
        const errText = await deleteResponse.text();
        console.error("[Vroom API] Supabase admin delete user failed:", errText);
        return res.status(deleteResponse.status).json({ 
          error: `Falha ao eliminar conta na API do Supabase: ${errText}` 
        });
      }

      console.log(`[Vroom API] Account ${userId} successfully hard deleted via CASCADE.`);

      return res.json({ 
        success: true, 
        message: "A sua conta foi permanentemente apagada com sucesso. Todos os seus dados pessoais foram eliminados em conformidade com as diretivas do RGPD." 
      });

    } catch (err: any) {
      console.error("[Vroom API] Error in delete-account route:", err);
      return res.status(500).json({ error: err.message || "Erro interno do servidor." });
    }
  });

  // Vite middleware setup for assets/front-end
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Vroom backend] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
