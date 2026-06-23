// api/lead.js
// ─────────────────────────────────────────────────────────────
// Recebe leads dos dois formulários do site ZARZUR e envia
// e-mail formatado para contaro@zarzurgarantidora.com.br
//
// Variável de ambiente necessária no Vercel:
//   RESEND_API_KEY  →  chave gerada em resend.com
// ─────────────────────────────────────────────────────────────

const DESTINO = ["contato@zarzurgarantidora.com.br"];
const REMETENTE = "ZARZUR Site <noreply@zarzurgarantidora.com.br>";

export default async function handler(req, res) {
  // Preflight CORS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY não configurada");
    return res.status(500).json({ error: "Configuração de e-mail ausente" });
  }

  const body = req.body;
  const tipo = body.tipo; // "orcamento" | "contato"

  let assunto, html;

  if (tipo === "orcamento") {
    assunto = `💼 Novo orçamento — R$ ${body.valor} · ${body.finalidade || "sem finalidade"}`;
    html = templateOrcamento(body);
  } else if (tipo === "contato") {
    assunto = `📬 Novo contato — ${body.nome} · ${body.solucao || "interesse geral"}`;
    html = templateContato(body);
  } else {
    return res.status(400).json({ error: "Tipo de formulário inválido" });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: REMETENTE,
        to: DESTINO,
        reply_to: body.email || undefined,
        subject: assunto,
        html,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Resend error:", err);
      return res.status(500).json({ error: "Falha ao enviar e-mail" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Fetch error:", err);
    return res.status(500).json({ error: "Erro interno" });
  }
}

// ─── Templates ───────────────────────────────────────────────

function templateOrcamento(d) {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f2ec;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f2ec;padding:40px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)">

        <!-- Cabeçalho verde -->
        <tr>
          <td style="background:#044828;padding:28px 40px;text-align:center">
            <p style="margin:0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#C4A86A;font-weight:600">ZARZUR Soluções Financeiras</p>
            <h1 style="margin:8px 0 0;font-size:22px;color:#ffffff;font-weight:600">Nova Solicitação de Orçamento</h1>
          </td>
        </tr>

        <!-- Destaque do valor -->
        <tr>
          <td style="padding:32px 40px 0;text-align:center">
            <p style="margin:0 0 4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#8C7032;font-weight:600">Valor solicitado</p>
            <p style="margin:0;font-size:40px;font-weight:700;color:#044828">R$ ${d.valor}</p>
            ${d.finalidade ? `<p style="margin:8px 0 0;font-size:15px;color:#5C5A52">${d.finalidade}</p>` : ""}
          </td>
        </tr>

        <!-- Dados do solicitante -->
        <tr>
          <td style="padding:28px 40px">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${linha("Nome", d.nome)}
              ${linha("E-mail", d.email ? `<a href="mailto:${d.email}" style="color:#044828">${d.email}</a>` : "—")}
              ${linha("Condomínio", d.condominio || "—")}
              ${d.detalhe ? linha("Detalhes", d.detalhe) : ""}
              ${linha("Recebido em", new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }))}
            </table>
          </td>
        </tr>

        <!-- CTA responder -->
        ${d.email ? `
        <tr>
          <td style="padding:0 40px 32px;text-align:center">
            <a href="mailto:${d.email}?subject=Orçamento ZARZUR — sua solicitação"
               style="display:inline-block;background:#A88840;color:#ffffff;font-weight:600;font-size:14px;padding:14px 32px;border-radius:8px;text-decoration:none;letter-spacing:.04em">
              Responder ao solicitante
            </a>
          </td>
        </tr>` : ""}

        <!-- Rodapé -->
        ${rodape()}
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function templateContato(d) {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f2ec;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f2ec;padding:40px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)">

        <!-- Cabeçalho verde -->
        <tr>
          <td style="background:#044828;padding:28px 40px;text-align:center">
            <p style="margin:0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#C4A86A;font-weight:600">ZARZUR Soluções Financeiras</p>
            <h1 style="margin:8px 0 0;font-size:22px;color:#ffffff;font-weight:600">Novo Contato pelo Site</h1>
          </td>
        </tr>

        <!-- Dados do contato -->
        <tr>
          <td style="padding:32px 40px">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${linha("Nome", d.nome)}
              ${linha("E-mail", d.email ? `<a href="mailto:${d.email}" style="color:#044828">${d.email}</a>` : "—")}
              ${linha("Telefone / WhatsApp", d.telefone || "—")}
              ${linha("Solução de interesse", d.solucao || "—")}
              ${linha("Condomínio", d.condominio || "—")}
              ${linha("Recebido em", new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }))}
            </table>
          </td>
        </tr>

        <!-- CTA responder -->
        ${d.email ? `
        <tr>
          <td style="padding:0 40px 32px;text-align:center">
            <a href="mailto:${d.email}?subject=ZARZUR — retorno ao seu contato"
               style="display:inline-block;background:#A88840;color:#ffffff;font-weight:600;font-size:14px;padding:14px 32px;border-radius:8px;text-decoration:none;letter-spacing:.04em">
              Responder ao contato
            </a>
          </td>
        </tr>` : ""}

        ${rodape()}
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function linha(label, valor) {
  return `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #ECE9E0;vertical-align:top;width:38%">
      <span style="font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#A9A496">${label}</span>
    </td>
    <td style="padding:10px 0 10px 16px;border-bottom:1px solid #ECE9E0;font-size:14px;color:#1A1D1B">${valor || "—"}</td>
  </tr>`;
}

function rodape() {
  return `
  <tr>
    <td style="background:#f4f2ec;padding:20px 40px;text-align:center;border-top:1px solid #ECE9E0">
      <p style="margin:0;font-size:11px;color:#A9A496">
        ZARZUR Soluções Financeiras · São Paulo & Espírito Santo<br>
        Este e-mail foi gerado automaticamente pelo site institucional.
      </p>
    </td>
  </tr>`;
}
