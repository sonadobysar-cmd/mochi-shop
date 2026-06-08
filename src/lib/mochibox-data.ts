export type ProductTier = "starter" | "bestseller" | "hero" | "lux";

export type Product = {
  emoji: string;
  name: string;
  tagline: string;
  desc: string;
  price: number;
  old: number | null;
  badge: string | null;
  tier: ProductTier;
  perks: string[];
  gold: number;
};

export const monthBox = {
  emoji: "🐱",
  tag: "⏳ JEN V ČERVENCI · LIMITKA",
  title: "Kitty Love 🎀",
  desc: "Kočičkami a srdíčky laděná limitka. Mění se každý měsíc — samostatný box, kupuješ rovnou bez výběru velikosti.",
  price: 499,
  old: 699,
  cartName: "Box měsíce: Kitty Love",
};

export const occasions = [
  { e: "💝", n: "Sobě" },
  { e: "💛", n: "Pro kámošku" },
  { e: "🌈", n: "Hlavu vzhůru" },
  { e: "🎂", n: "Narozeniny" },
  { e: "♈", n: "Tvoje znamení" },
  { e: "💌", n: "Jen tak, myslím na tebe" },
  { e: "🎓", n: "Gratulace / úspěch" },
  { e: "🤍", n: "Soustrast / útěcha" },
  { e: "💗", n: "Výročí / láska" },
  { e: "🤒", n: "Brzy se uzdrav" },
  { e: "🙏", n: "Poděkování" },
  { e: "👶", n: "Pro novopečenou mámu" },
  { e: "🎄", n: "Vánoce" },
  { e: "❤️", n: "Valentýn" },
  { e: "💐", n: "Den matek" },
];

export const products: Product[] = [
  {
    emoji: "🍬",
    name: "Mini Box",
    tagline: "Na první ochutnávku",
    desc: "Ochutnávka kawaii. 3–4 roztomilé překvapení.",
    price: 299,
    old: null,
    badge: null,
    tier: "starter",
    perks: ["3–4 překvapení", "Plyšák nebo papírnictví", "Skvělý malý dárek"],
    gold: 0,
  },
  {
    emoji: "🎁",
    name: "Klasik Box",
    tagline: "Nejprodávanější volba",
    desc: "Náš bestseller. 6–8 ručně vybraných pokladů.",
    price: 599,
    old: 799,
    badge: "NEJ ✦",
    tier: "bestseller",
    perks: ["6–8 ručně vybraných pokladů", "Mix plyšáků a papírnictví", "Doprava zdarma"],
    gold: 3,
  },
  {
    emoji: "📦",
    name: "Mega Box",
    tagline: "Maximum kawaii",
    desc: "10–14 věcí včetně velkého plyšáka. Maximum radosti!",
    price: 999,
    old: 1299,
    badge: "HIT 🔥",
    tier: "hero",
    perks: ["10–14 věcí v boxu", "Velký plyšák zaručeně", "Bonusové samolepky navíc"],
    gold: 5,
  },
  {
    emoji: "💎",
    name: "Luxury Box",
    tagline: "Prémiová edice",
    desc: "Vše z Megy + zaručený prémiový kousek, top šance na gold dárek a nejhezčí balení.",
    price: 1499,
    old: null,
    badge: "LUXUS ✨",
    tier: "lux",
    perks: ["Prémiový kousek zaručeně", "Nejhezčí balení", "Top šance na gold dárek"],
    gold: 12,
  },
];

export type BeadRound = {
  c: string;
  e: string;
  name: string;
  note: string;
};

export const beadsRound: BeadRound[] = [
  { c: "var(--strawberry)", e: "💄", name: "Lesky na rty", note: "růžový korálek" },
  { c: "var(--lav)", e: "🧸", name: "Mini plyšáci", note: "fialový korálek" },
  { c: "var(--sky)", e: "📓", name: "Deníčky", note: "modrý korálek" },
  { c: "var(--mint)", e: "✏️", name: "Propisky", note: "mátový korálek" },
  { c: "var(--butter)", e: "🏷️", name: "Stickery", note: "žlutý korálek" },
  { c: "var(--peach)", e: "🔑", name: "Klíčenky", note: "broskvový korálek" },
  { c: "#FFF6E9", e: "📎", name: "Sponky", note: "krémový korálek" },
  { c: "#5FC8C0", e: "🔖", name: "Záložky", note: "tyrkysový korálek" },
  { c: "#B86FD9", e: "🪙", name: "Placky", note: "švestkový korálek" },
  { c: "#A9744F", e: "👜", name: "Mini taška", note: "hnědý korálek" },
  { c: "#FF8A3D", e: "🐙", name: "Squishy", note: "oranžový korálek" },
  { c: "#D6336C", e: "📿", name: "Náramek", note: "sytě růžový korálek" },
  { c: "#6C5CE7", e: "💎", name: "Náušnice", note: "indigový korálek" },
  { c: "#2B2B2B", e: "💍", name: "Prstýnek", note: "černý korálek" },
  { c: "#9AA7B0", e: "📏", name: "Pravítko", note: "ocelový korálek" },
  { c: "#FFC2D1", e: "📝", name: "Memo bloček", note: "pudrový korálek" },
  { c: "#8B4FA8", e: "📔", name: "Mini zápisník", note: "ametystový korálek" },
  { c: "#C6FF00", e: "🖍️", name: "Zvýrazňovač", note: "neonový korálek" },
  { c: "#5AC8FA", e: "🎨", name: "Washi páska", note: "blankytný korálek" },
  { c: "gem", e: "🩹", name: "Gumy", note: "třpytivý korálek s kamínkama" },
];

export const beadsShaped = [
  { s: "🦋", e: "🎀", name: "Čelenka", note: "tvar motýl" },
  { s: "🌸", e: "🧴", name: "Voňavka", note: "tvar kytka" },
  { s: "💗", e: "🪞", name: "Zrcátko", note: "tvar srdce" },
  { s: "⭐", e: "🧦", name: "Ponožky", note: "tvar hvězda" },
  { s: "🌙", e: "😴", name: "Maska na spaní", note: "tvar měsíc" },
  { s: "🐚", e: "🪮", name: "Hřeben", note: "tvar mušle" },
  { s: "🍀", e: "🧖", name: "Maska na pleť", note: "tvar čtyřlístek" },
  { s: "🍒", e: "🗜️", name: "Skřipec", note: "tvar třešně" },
  { s: "🐻", e: "🔦", name: "Baterka", note: "tvar méďa" },
  { s: "🌷", e: "👛", name: "Peněženka", note: "tvar tulipán" },
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
