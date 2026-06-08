export const products = [
  {
    emoji: "🍬",
    name: "Mini Box",
    desc: "Ochutnávka kawaii. 3–4 roztomilé překvapení.",
    price: 299,
    old: null as number | null,
    badge: null as string | null,
    feat: false,
  },
  {
    emoji: "🎁",
    name: "Klasik Box",
    desc: "Náš bestseller. 6–8 ručně vybraných pokladů.",
    price: 599,
    old: 799,
    badge: "NEJ ✦",
    feat: false,
  },
  {
    emoji: "📦",
    name: "Mega Box",
    desc: "10–14 věcí včetně velkého plyšáka. Maximum radosti!",
    price: 999,
    old: 1299,
    badge: "HIT 🔥",
    feat: true,
  },
  {
    emoji: "🌸",
    name: "Sezónní Box",
    desc: "Limitka podle ročního období. Jen dokud zásoby stačí.",
    price: 749,
    old: null,
    badge: "LIMIT",
    feat: false,
  },
];

export const beads = [
  { c: "var(--strawberry)", e: "💄", name: "Lesky na rty", note: "růžový korálek" },
  { c: "var(--lav)", e: "🧸", name: "Mini plyšáci", note: "fialový korálek" },
  { c: "var(--sky)", e: "📓", name: "Deníčky", note: "modrý korálek" },
  { c: "var(--mint)", e: "✏️", name: "Propisky", note: "mátový korálek" },
  { c: "var(--butter)", e: "🏷️", name: "Stickery", note: "žlutý korálek" },
  { c: "var(--peach)", e: "🔑", name: "Klíčenky", note: "broskvový korálek" },
  { c: "#FF5C5C", e: "🍬", name: "Sladkosti", note: "červený korálek" },
  { c: "#FFF6E9", e: "📎", name: "Sponky", note: "krémový korálek" },
  { c: "#5FC8C0", e: "🔖", name: "Záložky", note: "tyrkysový korálek" },
  { c: "#B86FD9", e: "🪙", name: "Placky", note: "švestkový korálek" },
  { c: "holo", e: "🩹", name: "Gumy", note: "třpytivý korálek" },
  { c: "gold", e: "✨", name: "Vzácný bonus", note: "zlatý korálek" },
];

export const clips = [
  { g: "linear-gradient(160deg,#FF7BAC,#C9B6F7)", v: "2,4 mil", t: "TikTok" },
  { g: "linear-gradient(160deg,#8FD7F4,#9EE6C4)", v: "890 tis", t: "Reels" },
  { g: "linear-gradient(160deg,#FFD96B,#FFB48F)", v: "1,1 mil", t: "TikTok" },
  { g: "linear-gradient(160deg,#C9B6F7,#FF7BAC)", v: "640 tis", t: "YT Shorts" },
];

export const insideChips = [
  { e: "🧸", label: "Mini plyšáci" },
  { e: "✏️", label: "Propisky" },
  { e: "📓", label: "Deníčky" },
  { e: "🔑", label: "Klíčenky" },
  { e: "📎", label: "Sponky" },
  { e: "🔖", label: "Záložky" },
  { e: "💄", label: "Lesky na rty" },
  { e: "🩹", label: "Gumy" },
  { e: "🪙", label: "Placky" },
  { e: "🏷️", label: "Stickery" },
  { e: "🍬", label: "Sladkosti" },
  { e: "✨", label: "+ bonusy" },
];

export const loot = [
  { e: "🧸", n: "Plyšový medvídek", r: "rare" as const },
  { e: "🐰", n: "Plyšový králíček", r: "rare" as const },
  { e: "🏷️", n: "Sada samolepek", r: "common" as const },
  { e: "✏️", n: "Pastelové pero", r: "common" as const },
  { e: "🍡", n: "Mochi dango", r: "common" as const },
  { e: "🍓", n: "Jahodový pocky", r: "common" as const },
  { e: "🔑", n: "Kawaii klíčenka", r: "common" as const },
  { e: "🎀", n: "Saténová mašle", r: "common" as const },
  { e: "🐱", n: "Plyšová kočička", r: "rare" as const },
  { e: "🦄", n: "Zlatý jednorožec", r: "super" as const },
  { e: "⭐", n: "Holografický odznáček", r: "rare" as const },
  { e: "🌈", n: "Duhový mega plyšák", r: "super" as const },
  { e: "🧁", n: "Cupcake gumovátko", r: "common" as const },
  { e: "👑", n: "Sběratelská korunka", r: "super" as const },
];

export const rLabel: Record<
  "common" | "rare" | "super",
  [string, string]
> = {
  common: ["Běžné", "r-common"],
  rare: ["Vzácné ✦", "r-rare"],
  super: ["SUPER VZÁCNÉ! ✨", "r-super"],
};
