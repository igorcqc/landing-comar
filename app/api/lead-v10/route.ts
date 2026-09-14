import { createHash, randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const TRELLO_BOARD_ID = "c3KlXqqQ";
const TRELLO_LIST_NAME = "NOVOS LEADS - ANÚNCIOS";
const META_API_VERSION = "v21.0";

const ALLOWED_LOCAIS = ["São José do Norte", "Rio Grande", "Cassino"];
const ALLOWED_AMBIENTES = [
  "Cozinha ou área gourmet",
  "Dormitório",
  "Closet",
  "Sala",
  "Banheiro",
  "Casa completa",
  "Outro ambiente",
];
const ALLOWED_PRAZOS = [
  "Quero começar agora",
  "Nos próximos 3 meses",
  "Ainda estou planejando",
];
const ALLOWED_INVESTIMENTOS = [
  "Até R$15 mil",
  "R$15 mil a R$30 mil",
  "Acima de R$30 mil",
];

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

function localPhoneDigits(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits.startsWith("55") && digits.length > 11 ? digits.slice(2) : digits;
}

function normalizeForHash(raw: string): string {
  return raw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function formatNameAndId(raw?: string): string {
  if (!raw) return "(não informado)";
  const [name, id] = raw.split("|").map((part) => part.trim());
  if (!name) return "(não informado)";
  return id ? `${name} (ID: ${id})` : name;
}

function invalid(message: string) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

async function createTrelloCard(params: {
  nome: string;
  whats: string;
  ambiente: string;
  cidade: string;
  investimento: string;
  prazo: string;
  campanha?: string;
  conjunto?: string;
  anuncio?: string;
  posicionamento?: string;
  origem?: string;
}) {
  const apiKey = process.env.TRELLO_API_KEY;
  const token = process.env.TRELLO_TOKEN;

  if (!apiKey || !token) {
    throw new Error("Trello não configurado");
  }

  const listsParams = new URLSearchParams({
    key: apiKey,
    token,
    fields: "name",
  });

  const listsRes = await fetch(
    `https://api.trello.com/1/boards/${TRELLO_BOARD_ID}/lists?${listsParams.toString()}`,
    { cache: "no-store" }
  );

  if (!listsRes.ok) {
    throw new Error(`Falha ao buscar listas do Trello: ${listsRes.status}`);
  }

  const lists: TrelloList[] = await listsRes.json();
  const list = lists.find(
    (item) =>
      item.name.trim().toUpperCase() === TRELLO_LIST_NAME.trim().toUpperCase()
  );

  if (!list) {
    throw new Error("Lista do Trello não encontrada");
  }

  const desc = [
    "VERSÃO: Landing V10 / alternativa",
    "",
    `Nome: ${params.nome}`,
    `WhatsApp: ${params.whats}`,
    `Local de atendimento: ${params.cidade}`,
    `Ambiente: ${params.ambiente}`,
    `Investimento: ${params.investimento}`,
    `Prazo para iniciar: ${params.prazo}`,
    "",
    `Campanha: ${formatNameAndId(params.campanha)}`,
    `Conjunto de anúncios: ${formatNameAndId(params.conjunto)}`,
    `Anúncio: ${formatNameAndId(params.anuncio)}`,
    `Posicionamento: ${params.posicionamento || "(não informado)"}`,
    `Origem: ${params.origem || "(não informado)"}`,
    "",
    "Canal: quiz da landing page V10",
  ].join("\n");

  const cardParams = new URLSearchParams({
    key: apiKey,
    token,
    idList: list.id,
    name: `Novo Lead V10 - ${params.nome}`,
    desc,
  });

  const cardRes = await fetch(
    `https://api.trello.com/1/cards?${cardParams.toString()}`,
    { method: "POST" }
  );

  if (!cardRes.ok) {
    throw new Error(`Falha ao criar card no Trello: ${cardRes.status}`);
  }
}

async function sendMetaCapiEvent(params: {
  eventId: string;
  eventSourceUrl?: string;
  nome: string;
  whats: string;
  cidade: string;
  ambiente: string;
  investimento: string;
  prazo: string;
  fbp?: string;
  fbc?: string;
  clientIp?: string;
  userAgent?: string;
}) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) return;

  const userData: Record<string, unknown> = {};
  const [firstName, ...rest] = params.nome.trim().split(/\s+/).filter(Boolean);
  const lastName = rest.join(" ");

  if (firstName) userData.fn = [sha256(firstName)];
  if (lastName) userData.ln = [sha256(lastName)];

  const phoneHash = sha256(normalizePhone(params.whats));
  userData.ph = [phoneHash];
  userData.external_id = [phoneHash];
  userData.ct = [sha256(normalizeForHash(params.cidade))];
  userData.st = [sha256("rs")];
  userData.country = [sha256("br")];

  if (params.fbp) userData.fbp = params.fbp;
  if (params.fbc) userData.fbc = params.fbc;
  if (params.clientIp) userData.client_ip_address = params.clientIp;
  if (params.userAgent) userData.client_user_agent = params.userAgent;

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: params.eventId,
        event_source_url: params.eventSourceUrl,
        action_source: "website",
        user_data: userData,
        custom_data: {
          content_name: params.ambiente,
          content_category: "projeto_v10",
          investment_range: params.investimento,
          project_timing: params.prazo,
        },
      },
    ],
    ...(process.env.META_TEST_EVENT_CODE
      ? { test_event_code: process.env.META_TEST_EVENT_CODE }
      : {}),
  };

  const response = await fetch(
    `https://graph.facebook.com/${META_API_VERSION}/${pixelId}/events?access_token=${accessToken}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const detail = await response.text();
    console.error("Meta CAPI V10 failed", response.status, detail);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nome,
      whats,
      ambiente,
      cidade,
      investimento,
      prazo,
      utm,
      eventId,
      fbp,
      fbc,
      eventSourceUrl,
      website,
      formStartedAt,
    } = body ?? {};

    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (
      typeof formStartedAt !== "number" ||
      Date.now() - formStartedAt < 1800
    ) {
      return invalid("Envio muito rápido. Tente novamente.");
    }

    if (typeof nome !== "string" || nome.trim().length < 2) {
      return invalid("Informe seu nome.");
    }

    if (typeof whats !== "string") {
      return invalid("Informe seu WhatsApp.");
    }

    const phoneDigits = localPhoneDigits(whats);
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      return invalid("Informe um WhatsApp válido com DDD.");
    }

    if (!ALLOWED_AMBIENTES.includes(ambiente)) {
      return invalid("Selecione o ambiente desejado.");
    }

    if (!ALLOWED_LOCAIS.includes(cidade)) {
      return invalid("Selecione o local de atendimento.");
    }

    if (!ALLOWED_PRAZOS.includes(prazo)) {
      return invalid("Selecione quando pretende começar.");
    }

    if (!ALLOWED_INVESTIMENTOS.includes(investimento)) {
      return invalid("Selecione a faixa de investimento.");
    }

    const {
      utm_campaign: campanha,
      utm_term: conjunto,
      utm_content: anuncio,
      utm_medium: posicionamento,
      utm_source: origem,
    } = utm ?? {};

    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      undefined;
    const userAgent = request.headers.get("user-agent") || undefined;
    const dedupeEventId =
      typeof eventId === "string" && eventId ? eventId : randomUUID();

    await createTrelloCard({
      nome: nome.trim(),
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
    });

    await sendMetaCapiEvent({
      eventId: dedupeEventId,
      eventSourceUrl,
      nome: nome.trim(),
      whats,
      cidade,
      ambiente,
      investimento,
      prazo,
      fbp,
      fbc,
      clientIp,
      userAgent,
    });

    return NextResponse.json({ ok: true, eventId: dedupeEventId });
  } catch (error) {
    console.error("V10 lead submission failed", error);
    return NextResponse.json(
      { ok: false, error: "Não foi possível registrar o lead." },
      { status: 500 }
    );
  }
}
