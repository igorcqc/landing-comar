import { createHash, randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const TRELLO_BOARD_ID = "c3KlXqqQ";
const TRELLO_LIST_NAME = "NOVOS LEADS - ANÚNCIOS";
const META_API_VERSION = "v21.0";

interface TrelloList {
  id: string;
  name: string;
}

function sha256(input: string): string {
  return createHash("sha256").update(input.trim().toLowerCase()).digest("hex");
}

function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return digits.startsWith("55") ? digits : `55${digits}`;
}

function normalizeForHash(raw: string): string {
  return raw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function formatNameAndId(raw?: string): string {
  if (!raw) return "(n\u00e3o informado)";
  const [name, id] = raw.split("|").map((part) => part.trim());
  if (!name) return "(n\u00e3o informado)";
  return id ? `${name} (ID: ${id})` : name;
}

async function createTrelloCard(params: {
  nome?: string;
  whats?: string;
  ambiente?: string;
  cidade?: string;
  investimento?: string;
  prazo?: string;
  campanha?: string;
  conjunto?: string;
  anuncio?: string;
  posicionamento?: string;
  origem?: string;
}) {
  const apiKey = process.env.TRELLO_API_KEY;
  const token = process.env.TRELLO_TOKEN;

  if (!apiKey || !token) {
    return NextResponse.json(
      { error: "Trello não configurado" },
      { status: 500 }
    );
  }

  const {
    nome,
    whats,
    ambiente,
    cidade,
    investimento,
    prazo,
    campanha,
    conjunto,
    anuncio,
    posicionamento,
    origem,
  } = params;

  try {
    const listsParams = new URLSearchParams({
      key: apiKey,
      token,
      fields: "name",
    });
    const listsRes = await fetch(
      `https://api.trello.com/1/boards/${TRELLO_BOARD_ID}/lists?${listsParams.toString()}`
    );
    if (!listsRes.ok) {
      const detail = await listsRes.text();
      console.error("Trello lists fetch failed", listsRes.status, detail);
      return NextResponse.json(
        { error: "Falha ao buscar listas do Trello" },
        { status: 502 }
      );
    }
    const lists: TrelloList[] = await listsRes.json();
    const list = lists.find(
      (l) => l.name.trim().toUpperCase() === TRELLO_LIST_NAME.trim().toUpperCase()
    );

    if (!list) {
      console.error(
        "Trello list not found, available lists:",
        lists.map((l) => l.name)
      );
      return NextResponse.json(
        { error: "Lista do Trello não encontrada" },
        { status: 404 }
      );
    }

    const desc = [
      `Nome: ${nome || "(não informado)"}`,
      `WhatsApp: ${whats || "(não informado)"}`,
      `Local de atendimento: ${cidade || "(não informado)"}`,
      `Ambiente: ${ambiente || "(não informado)"}`,
      `Investimento: ${investimento || "(não informado)"}`,
      `Prazo para iniciar: ${prazo || "(não informado)"}`,
      "",
      `Campanha: ${formatNameAndId(campanha)}`,
      `Conjunto de anúncios: ${formatNameAndId(conjunto)}`,
      `Anúncio: ${formatNameAndId(anuncio)}`,
      `Posicionamento: ${posicionamento || "(não informado)"}`,
      `Origem: ${origem || "(não informado)"}`,
      "",
      "Canal: formulário do site (landing page)",
    ].join("\n");

    const cardParams = new URLSearchParams({
      key: apiKey,
      token,
      idList: list.id,
      name: "Novo Lead - Landing Page",
      desc,
    });

    const cardRes = await fetch(`https://api.trello.com/1/cards?${cardParams.toString()}`, {
      method: "POST",
    });

    if (!cardRes.ok) {
      const detail = await cardRes.text();
      console.error("Trello card creation failed", cardRes.status, detail);
      return NextResponse.json(
        { error: "Falha ao criar card no Trello" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected error sending lead to Trello", err);
    return NextResponse.json(
      { error: "Erro inesperado ao enviar lead" },
      { status: 500 }
    );
  }
}

async function sendMetaCapiEvent(params: {
  eventId: string;
  eventSourceUrl?: string;
  nome?: string;
  whats?: string;
  cidade?: string;
  fbp?: string;
  fbc?: string;
  clientIp?: string;
  userAgent?: string;
}) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) return;

  const { eventId, eventSourceUrl, nome, whats, cidade, fbp, fbc, clientIp, userAgent } = params;

  const userData: Record<string, unknown> = {};

  const [firstName, ...rest] = (nome || "").trim().split(/\s+/).filter(Boolean);
  const lastName = rest.join(" ");
  if (firstName) userData.fn = [sha256(firstName)];
  if (lastName) userData.ln = [sha256(lastName)];

  if (whats) {
    const phoneHash = sha256(normalizePhone(whats));
    userData.ph = [phoneHash];
    userData.external_id = [phoneHash];
  }

  if (cidade) {
    userData.ct = [sha256(normalizeForHash(cidade))];
  }
  userData.st = [sha256("rs")];
  userData.country = [sha256("br")];

  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;
  if (clientIp) userData.client_ip_address = clientIp;
  if (userAgent) userData.client_user_agent = userAgent;

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: eventSourceUrl,
        action_source: "website",
        user_data: userData,
        custom_data: {
          content_name: "Orçamento",
          content_category: "orcamento",
        },
      },
    ],
    ...(process.env.META_TEST_EVENT_CODE
      ? { test_event_code: process.env.META_TEST_EVENT_CODE }
      : {}),
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${META_API_VERSION}/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error("Meta CAPI event failed", res.status, detail);
    }
  } catch (err) {
    console.error("Unexpected error sending Meta CAPI event", err);
  }
}

// Anti-abuso: sem isso, um robô cria cards falsos no Trello e dispara eventos
// Lead falsos no CAPI (sujando a otimização da campanha).
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const recentRequests = new Map<string, number[]>();

// Por instância serverless: não é um limite global, mas barra rajadas de um mesmo IP.
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recentRequests.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  hits.push(now);
  recentRequests.set(ip, hits);
  if (recentRequests.size > 5000) recentRequests.clear();
  return hits.length > RATE_LIMIT_MAX;
}

// Navegadores sempre mandam Origin em POST; exige que seja o próprio site.
function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function text(value: unknown, max: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : undefined;
}

export async function POST(request: NextRequest) {
  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    undefined;

  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Origem não permitida" }, { status: 403 });
  }
  if (isRateLimited(clientIp ?? "unknown")) {
    return NextResponse.json({ error: "Muitas tentativas" }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Requisição inválida" }, { status: 400 });
  }

  const nome = text(body.nome, 120);
  const whats = text(body.whats, 30);
  const ambiente = text(body.ambiente, 120);
  const cidade = text(body.cidade, 120);
  const investimento = text(body.investimento, 120);
  const prazo = text(body.prazo, 120);
  const eventId = text(body.eventId, 100);
  const fbp = text(body.fbp, 200);
  const fbc = text(body.fbc, 500);
  const eventSourceUrl = text(body.eventSourceUrl, 1000);
  const utm = body.utm && typeof body.utm === "object" ? body.utm : {};

  if (!nome && !whats) {
    return NextResponse.json(
      { error: "Nome ou WhatsApp obrigatório" },
      { status: 400 }
    );
  }

  const whatsDigits = whats?.replace(/\D/g, "") ?? "";
  // Folgado de propósito: o formulário aceita texto livre e perder lead real custa mais que um card de spam.
  if (whats && (whatsDigits.length < 8 || whatsDigits.length > 15)) {
    return NextResponse.json({ error: "WhatsApp inválido" }, { status: 400 });
  }

  const campanha = text(utm.utm_campaign, 200);
  const conjunto = text(utm.utm_term, 200);
  const anuncio = text(utm.utm_content, 200);
  const posicionamento = text(utm.utm_medium, 200);
  const origem = text(utm.utm_source, 200);
  const userAgent = request.headers.get("user-agent") || undefined;

  const [trelloResult] = await Promise.allSettled([
    createTrelloCard({
      nome,
      whats,
      ambiente,
      cidade,
      investimento,
      prazo,
      campanha,
      conjunto,
      anuncio,
      posicionamento,
      origem,
    }),
    sendMetaCapiEvent({
      eventId: eventId || randomUUID(),
      eventSourceUrl,
      nome,
      whats,
      cidade,
      fbp,
      fbc,
      clientIp,
      userAgent,
    }),
  ]);

  if (trelloResult.status === "fulfilled") {
    return trelloResult.value;
  }

  console.error("Trello card creation rejected", trelloResult.reason);
  return NextResponse.json(
    { error: "Erro inesperado ao enviar lead" },
    { status: 500 }
  );
}
