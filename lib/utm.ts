const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

const STORAGE_KEY = "utm_params";

export function captureUtmParams() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const data: Record<string, string> = {};

  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) data[key] = value;
  });

  const fbclid = params.get("fbclid");
  if (fbclid) data.fbclid = fbclid;

  if (Object.keys(data).length === 0) return;

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getStoredUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
