import { NextRequest, NextResponse } from "next/server";

const TRELLO_BOARD_ID = "c3KlXqqQ";
const TRELLO_LIST_NAME = "NOVOS LEADS - ANÚNCIOS";

interface TrelloList {
  id: string;
  name: string;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.TRELLO_API_KEY;
  const token = process.env.TRELLO_TOKEN;

  if (!apiKey || !token) {
    return NextResponse.json(
      { error: "Trello não configurado" },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { nome, whats, ambiente, cidade, investimento } = body ?? {};

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
      `Ambiente: ${ambiente || "(não informado)"}`,
      `Cidade: ${cidade || "(não informado)"}`,
      `Investimento: ${investimento || "(não informado)"}`,
      "",
      "Origem: formulário do site (landing page)",
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
