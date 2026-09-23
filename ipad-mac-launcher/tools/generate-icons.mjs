import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import * as simpleIcons from "simple-icons";
import { APPS } from "../apps-data.js";

const ROOT = resolve(import.meta.dirname, "..");
const OUTPUT = resolve(ROOT, "icons/apps");
const LUCIDE = resolve(ROOT, "node_modules/lucide-static/icons");

const BRAND_ICONS = {
  github: "siGithub",
  cursor: "siCursor",
  whatsapp: "siWhatsapp",
  assistant: "siGoogleassistant",
  gemini: "siGooglegemini",
  kimi: "siKimi",
  "meta-ai": "siMetaai",
  notion: "siNotion",
  obsidian: "siObsidian",
  linear: "siLinear",
  "python-editor": "siPython",
  tailscale: "siTailscale",
  godaddy: "siGodaddy",
  "google-cloud": "siGooglecloud",
  telegram: "siTelegram",
  instagram: "siInstagram",
  "turkish-airlines": "siTurkishairlines",
  booking: "siBookingdotcom",
  marriott: "siMarriott",
  "google-maps": "siGooglemaps",
  waze: "siWaze",
  "organic-maps": "siOrganicmaps",
  podcasts: "siApplepodcasts",
  "apple-tv": "siAppletv",
  music: "siApplemusic",
  netflix: "siNetflix",
  tiktok: "siTiktok",
  twitch: "siTwitch",
  youtube: "siYoutube",
  "youtube-music": "siYoutubemusic",
  spotify: "siSpotify",
  shazam: "siShazam",
  chrome: "siGooglechrome",
  "google-photos": "siGooglephotos",
  "google-calendar": "siGooglecalendar",
  "google-docs": "siGoogledocs",
  "google-sheets": "siGooglesheets",
  "google-one": "siGoogleone",
  "google-keep": "siGooglekeep",
  authenticator: "siGoogleauthenticator",
  firefox: "siFirefoxbrowser",
  expressvpn: "siExpressvpn",
  dropbox: "siDropbox",
  sahibinden: "siSahibinden",
  threads: "siThreads",
  reddit: "siReddit",
  pinterest: "siPinterest",
  "google-home": "siGooglehome",
  rustdesk: "siRustdesk",
  teamviewer: "siTeamviewer",
  anydesk: "siAnydesk",
  windows: "siWindows11"
};

const LUCIDE_ICONS = {
  files: "folder",
  safari: "compass",
  mail: "mail",
  calendar: "calendar-days",
  notes: "notebook-pen",
  settings: "settings",
  chatgpt: "brain-circuit",
  manus: "hand",
  "grok-bot": "bot",
  grok: "atom",
  tilmo: "bot",
  freeform: "pen-tool",
  journal: "book-open",
  keynote: "presentation",
  goodnotes: "notebook-pen",
  notability: "file-pen-line",
  tasks: "circle-check-big",
  "lead-connector": "contact-round",
  slack: "messages-square",
  zight: "video",
  "web-clipper": "scissors",
  "creative-preview": "scan-eye",
  "google-admin": "shield-user",
  "cloud-search": "search",
  "yahoo-mail": "mail",
  messages: "message-circle",
  facetime: "video",
  contacts: "contact-round",
  phone: "phone",
  viamichelin: "route",
  pegasus: "plane",
  trip: "luggage",
  "db-navigator": "train-front",
  bahnbonus: "ticket-check",
  "museum-card": "landmark",
  tripsy: "map",
  jump: "plane-takeoff",
  "all-events": "calendar-heart",
  "apple-maps": "map-pinned",
  "yandex-navi": "navigation",
  "yandex-maps": "map",
  "radar-map": "radar",
  "satellite-finder": "satellite-dish",
  "satellite-channels": "satellite",
  "itunes-store": "star",
  books: "book-open",
  t24: "newspaper",
  eversolo: "audio-lines",
  "tv-plus": "tv",
  camera: "camera",
  photos: "flower-2",
  garageband: "guitar",
  imovie: "clapperboard",
  sketchbook: "pencil",
  canva: "palette",
  playground: "image-play",
  "photo-booth": "camera",
  doa: "aperture",
  "edge-gallery": "images",
  polycam: "box",
  weather: "cloud-sun",
  stocks: "chart-no-axes-combined",
  "find-my": "locate-fixed",
  shortcuts: "workflow",
  "voice-memos": "audio-waveform",
  measure: "ruler",
  passwords: "key-round",
  preview: "scan-eye",
  health: "heart-pulse",
  tips: "lightbulb",
  translate: "languages",
  "apple-store": "shopping-bag",
  clock: "clock-3",
  feedback: "message-square-warning",
  orbot: "shield-check",
  moonlight: "gamepad-2",
  ups: "package-check",
  fusion: "panels-top-left",
  dolap: "shopping-bag",
  hepsiburada: "shopping-cart",
  amazon: "package",
  garanti: "landmark",
  linkedin: "briefcase-business",
  sudoku: "grid-3x3",
  games: "gamepad-2",
  kelimelik: "puzzle",
  "apple-home": "house-plug",
  "utm-remote": "monitor-up",
  "google-admin": "shield-user"
};

const CATEGORY_ICONS = {
  "Yapay Zekâ": "sparkles",
  "İş & Notlar": "notebook-tabs",
  Geliştirme: "code-2",
  İletişim: "messages-square",
  Seyahat: "plane",
  Haritalar: "map",
  Medya: "play",
  Yaratıcılık: "palette",
  Google: "grid-3x3",
  Sistem: "app-window",
  Araçlar: "wrench",
  Alışveriş: "shopping-bag",
  Finans: "wallet-cards",
  Sosyal: "users",
  Oyunlar: "gamepad-2",
  "Akıllı Ev": "house-plug",
  "Uzaktan Erişim": "monitor-up"
};

const escapeXML = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const clamp = (value) => Math.max(0, Math.min(255, Math.round(value)));
const toRGB = (hex) => [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16));
const toHex = (rgb) => `#${rgb.map((value) => clamp(value).toString(16).padStart(2, "0")).join("")}`;
const relLuma = (hex) => {
  const [red, green, blue] = toRGB(hex);
  return (red * 299 + green * 587 + blue * 114) / 1000;
};
const isLight = (hex) => relLuma(hex) > 178;
const shift = (hex, amount) => toHex(toRGB(hex).map((value) => value + amount));
const mix = (hex, target, ratio) => toHex(toRGB(hex).map((value, index) => value + (toRGB(target)[index] - value) * ratio));
const saturateForLight = (hex) => (isLight(hex) ? mix(hex, "#101722", 0.35) : hex);

// Authentic brand background gradients (top lighter, bottom darker) with a readable
// glyph colour. Colours are not copyrightable; the marks come from the openly
// licensed simple-icons set. These are original macOS-style tiles, not copies of
// the proprietary multicolour app artwork.
const BRAND_STYLE = {
  netflix: { bg: ["#1b1b1b", "#040404"], fg: "#e50914" },
  youtube: { bg: ["#ff4b4b", "#e00000"], fg: "#ffffff" },
  "youtube-music": { bg: ["#ff4b4b", "#e00000"], fg: "#ffffff" },
  spotify: { bg: ["#25de6d", "#11a049"], fg: "#08331b" },
  whatsapp: { bg: ["#42e06f", "#12b24d"], fg: "#ffffff" },
  telegram: { bg: ["#43bff2", "#1a91d4"], fg: "#ffffff" },
  instagram: { bg: ["#a13bd6", "#f96d3a"], fg: "#ffffff" },
  tiktok: { bg: ["#2b2c31", "#0a0a0d"], fg: "#ffffff" },
  twitch: { bg: ["#a06bff", "#7a3df0"], fg: "#ffffff" },
  reddit: { bg: ["#ff6a3c", "#ff4500"], fg: "#ffffff" },
  linkedin: { bg: ["#3a9be0", "#0a66c2"], fg: "#ffffff" },
  dropbox: { bg: ["#3d8cff", "#0061fe"], fg: "#ffffff" },
  firefox: { bg: ["#ff9a3c", "#e6600a"], fg: "#ffffff" },
  github: { bg: ["#3a3f46", "#0d1117"], fg: "#ffffff" },
  cursor: { bg: ["#2c3038", "#0a0b0d"], fg: "#ffffff" },
  threads: { bg: ["#2b2b2f", "#08080a"], fg: "#ffffff" },
  linear: { bg: ["#3b3e48", "#15161c"], fg: "#9aa2f7" },
  obsidian: { bg: ["#3c2c66", "#180f33"], fg: "#b18cff" },
  notion: { bg: ["#ffffff", "#e7e7e7"], fg: "#0f0f0f" },
  slack: { bg: ["#ffffff", "#ececf1"], fg: "#4a154b" },
  amazon: { bg: ["#37475a", "#131a22"], fg: "#ff9900" },
  kimi: { bg: ["#2a2d34", "#0a0b0e"], fg: "#ffffff" },
  grok: { bg: ["#2a2d34", "#08090c"], fg: "#ffffff" },
  "grok-bot": { bg: ["#2a2d34", "#08090c"], fg: "#ffffff" },
  godaddy: { bg: ["#2f3033", "#0b0c0e"], fg: "#ffffff" },
  tailscale: { bg: ["#33353a", "#0f1013"], fg: "#ffffff" },
  pinterest: { bg: ["#e85668", "#bd081c"], fg: "#ffffff" },
  gemini: { bg: ["#6a8bff", "#a06bff"], fg: "#ffffff" },
  booking: { bg: ["#2f6ad0", "#00337a"], fg: "#ffffff" }
};

// Brand tiles that should keep their hand-tuned data palette (multicolour marks
// that read better on their original light/coloured background).
const KEEP_DATA_BG = new Set(["chrome", "google-photos", "authenticator", "canva"]);

const deriveBrand = (brand) => {
  const hex = `#${brand.hex}`;
  const luma = relLuma(hex);
  if (luma < 60) return { bg: [shift(hex, 46), shift(hex, 14)], fg: "#ffffff" };
  if (luma > 214) return { bg: [shift(hex, 4), shift(hex, -26)], fg: "#16202e" };
  return { bg: [shift(hex, 30), shift(hex, -16)], fg: "#ffffff" };
};

const brandPalette = (app, brand) => {
  if (BRAND_STYLE[app.id]) return BRAND_STYLE[app.id];
  if (brand && !KEEP_DATA_BG.has(app.id)) return deriveBrand(brand);
  return null;
};

const lucideMarkup = async (name, foreground) => {
  const source = await readFile(resolve(LUCIDE, `${name}.svg`), "utf8");
  const inner = source.match(/<svg[\s\S]*?>([\s\S]*?)<\/svg>/)?.[1]?.trim();
  if (!inner) throw new Error(`Could not parse Lucide icon: ${name}`);
  return `<g transform="translate(28 28) scale(3)" color="${foreground}" stroke-width="2.05" stroke-linecap="round" stroke-linejoin="round">${inner}</g>`;
};

const finderMarkup = () => `
  <path d="M34 35h30v58H39a5 5 0 0 1-5-5V35Z" fill="#f4fbff" fill-opacity=".95"/>
  <path d="M64 35h25a5 5 0 0 1 5 5v48a5 5 0 0 1-5 5H64V35Z" fill="#2574d9" fill-opacity=".72"/>
  <path d="M64 35c-1 15-8 23-18 29" fill="none" stroke="#2f7fdc" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M64 35c1 15 8 23 18 29" fill="none" stroke="#fff" stroke-opacity=".84" stroke-width="3.4" stroke-linecap="round"/>
  <circle cx="51" cy="58" r="2.3" fill="#24568e"/>
  <circle cx="77" cy="58" r="2.3" fill="#fff"/>
  <path d="M47 75c9 8 25 8 34 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
`;

const iconMarkup = async (app, brand, foreground, accent) => {
  if (app.id === "files") return finderMarkup();

  if (brand) {
    return `<path d="${brand.path}" fill="${foreground}" transform="translate(33 33) scale(2.583)"/>`;
  }

  const lucide = LUCIDE_ICONS[app.id] ?? CATEGORY_ICONS[app.category];
  if (lucide) return lucideMarkup(lucide, accent);

  return `<text x="64" y="74" text-anchor="middle" fill="${accent}" font-family="-apple-system,BlinkMacSystemFont,'Helvetica Neue',sans-serif" font-size="35" font-weight="750" letter-spacing="-.04em">${escapeXML(app.symbol.slice(0, 3))}</text>`;
};

const buildSVG = async (app) => {
  const brandName = BRAND_ICONS[app.id];
  const brand = brandName ? simpleIcons[brandName] : undefined;
  const palette = brandPalette(app, brand);

  const [start, end] = palette ? palette.bg : app.colors;
  const foreground = palette ? palette.fg : isLight(start) ? "#172131" : "#ffffff";
  // System/utility glyphs are single-colour line art: keep them white on dark tiles,
  // but tint them with a saturated accent on light tiles so they read like filled
  // iOS-style icons instead of faint outlines.
  const accent = palette ? palette.fg : isLight(start) ? saturateForLight(end) : "#ffffff";
  const mark = await iconMarkup(app, brand, foreground, accent);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="${escapeXML(app.name)}">
  <defs>
    <linearGradient id="bg" x1="18" y1="12" x2="112" y2="120" gradientUnits="userSpaceOnUse">
      <stop stop-color="${start}"/>
      <stop offset="1" stop-color="${end}"/>
    </linearGradient>
    <linearGradient id="shine" x1="64" y1="7" x2="64" y2="75" gradientUnits="userSpaceOnUse">
      <stop stop-color="#fff" stop-opacity=".38"/>
      <stop offset=".72" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-15%" width="140%" height="160%">
      <feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#000" flood-opacity=".3"/>
    </filter>
  </defs>
  <g filter="url(#shadow)">
    <rect x="6" y="5" width="116" height="116" rx="28" fill="url(#bg)"/>
    <rect x="7" y="6" width="114" height="114" rx="27" fill="none" stroke="#fff" stroke-opacity=".28"/>
    <path d="M12 52C18 20 38 9 64 9s46 11 52 43c-15-8-33-12-52-12s-37 4-52 12Z" fill="url(#shine)"/>
    ${mark}
  </g>
</svg>
`;
};

await mkdir(OUTPUT, { recursive: true });
await Promise.all(APPS.map(async (app) => {
  const path = resolve(OUTPUT, `${app.id}.svg`);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, await buildSVG(app));
}));
await writeFile(
  resolve(OUTPUT, "manifest.json"),
  `${JSON.stringify(APPS.map((app) => `./icons/apps/${app.id}.svg`), null, 2)}\n`
);

console.log(`Generated ${APPS.length} macOS-style app icons.`);
