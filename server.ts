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
