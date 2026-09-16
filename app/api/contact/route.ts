import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const META_API_VERSION = "v21.0";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const {
    eventId,
    eventSourceUrl,
    referrer,
    ctaSource,
    pageVersion,
    trafficType,
    source,
    utm,
    fbp,
    fbc,
  } = body ?? {};

  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "2761295380787318";
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    return NextResponse.json({ ok: true, capi: "not_configured" });
  }

  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    undefined;
  const userAgent = request.headers.get("user-agent") || undefined;

  const userData: Record<string, unknown> = {};
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;
  if (clientIp) userData.client_ip_address = clientIp;
  if (userAgent) userData.client_user_agent = userAgent;

  const customData: Record<string, unknown> = {
    content_name: "WhatsApp",
    content_category: "contato_whatsapp",
    contact_method: "whatsapp",
    page_version: pageVersion || "organic",
    traffic_type: trafficType || "unknown",
    source: source || utm?.utm_source || "direct",
    cta_source: ctaSource || "unknown",
  };

  if (utm?.utm_source) customData.utm_source = utm.utm_source;
  if (utm?.utm_medium) customData.utm_medium = utm.utm_medium;
  if (utm?.utm_campaign) customData.utm_campaign = utm.utm_campaign;
  if (utm?.utm_term) customData.utm_term = utm.utm_term;
  if (utm?.utm_content) customData.utm_content = utm.utm_content;
  if (referrer) customData.referrer = referrer;

  const payload = {
    data: [
      {
        event_name: "Contact",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId || randomUUID(),
        event_source_url: eventSourceUrl || request.headers.get("referer") || undefined,
        action_source: "website",
        user_data: userData,
        custom_data: customData,
      },
    ],
    ...(process.env.META_TEST_EVENT_CODE
      ? { test_event_code: process.env.META_TEST_EVENT_CODE }
      : {}),
  };

  try {
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
      console.error("Meta Contact CAPI event failed", response.status, detail);
      return NextResponse.json({ ok: false, error: "capi_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unexpected error sending Meta Contact CAPI event", error);
    return NextResponse.json({ ok: false, error: "capi_failed" }, { status: 500 });
  }
}
