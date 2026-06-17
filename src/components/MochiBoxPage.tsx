"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import CartDrawer from "@/components/CartDrawer";
import LogoMark from "@/components/LogoMark";
import {
  addCartLine,
  cartCount,
  loadCart,
  removeCartLine,
  saveCart,
  updateCartQty,
  type CartItem,
} from "@/lib/cart";
import {
  beadsRound,
  beadsShaped,
  clips,
  insideChips,
  loot,
  monthBox,
  occasions,
  products,
  rLabel,
} from "@/lib/mochibox-data";

const CONFETTI_COLORS = [
  "#FF7BAC",
  "#FFD96B",
  "#9EE6C4",
  "#8FD7F4",
  "#C9B6F7",
  "#FFB48F",
];

type ConfettiPart = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  g: number;
  s: number;
  rot: number;
  vr: number;
  c: string;
  life: number;
  shape: "rect" | "circ";
};

function RibbonSpans() {
  return (
    <>
      <span>
        🚚 <b>Doprava zdarma</b> nad 800 Kč
      </span>
      <span>✦</span>
      <span>
        🎀 <b>100% kawaii</b> garance
      </span>
      <span>✦</span>
      <span>
        🎀 <b>Dárek zdarma</b> ke každé objednávce
      </span>
      <span>✦</span>
      <span>
        ♻️ Recyklovatelné <b>balení</b>
      </span>
      <span>✦</span>
      <span>
        💝 Skvělý <b>dárek</b>
      </span>
      <span>✦</span>
    </>
  );
}

export default function MochiBoxPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [cartReady, setCartReady] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [newsEmail, setNewsEmail] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [boxVisible, setBoxVisible] = useState(true);
  const [boxShaking, setBoxShaking] = useState(false);
  const [revealVisible, setRevealVisible] = useState(false);
  const [gachaHint, setGachaHint] = useState("Klepni na krabičku ↑");
  const [gachaBtnText, setGachaBtnText] = useState("✦ Zatřást krabičkou");
  const [selectedOccasion, setSelectedOccasion] = useState("");
  const [occasionResult, setOccasionResult] = useState(
    "Zatím nic nevybráno — klikni výš ✨",
  );
  const [personName, setPersonName] = useState("");
  const [itemEmoji, setItemEmoji] = useState("🧸");
  const [itemName, setItemName] = useState("Plyšový medvídek");
  const [rarityText, setRarityText] = useState("Běžné");
  const [rarityClass, setRarityClass] = useState("rarity r-common");

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const partsRef = useRef<ConfettiPart[]>([]);
  const rafRef = useRef<number | null>(null);

  const resizeCanvas = useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    cv.width = window.innerWidth;
    cv.height = window.innerHeight;
  }, []);

  const confettiLoop = useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, cv.width, cv.height);
    partsRef.current.forEach((p) => {
      p.vy += p.g;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life--;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.c;
      ctx.strokeStyle = "#43283C";
      ctx.lineWidth = 1.5;
      if (p.shape === "rect") {
        ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s);
        ctx.strokeRect(-p.s / 2, -p.s / 2, p.s, p.s);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.s / 2, 0, 7);
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();
    });
    partsRef.current = partsRef.current.filter(
      (p) => p.life > 0 && p.y < cv.height + 40,
    );
    if (partsRef.current.length) {
      rafRef.current = requestAnimationFrame(confettiLoop);
    } else {
      rafRef.current = null;
      ctx.clearRect(0, 0, cv.width, cv.height);
    }
  }, []);

  const confettiBurst = useCallback(
    (n: number) => {
      for (let i = 0; i < n; i++) {
        partsRef.current.push({
          x: window.innerWidth / 2,
          y: window.innerHeight * 0.42,
          vx: (Math.random() - 0.5) * 14,
          vy: Math.random() * -13 - 4,
          g: 0.32 + Math.random() * 0.2,
          s: 7 + Math.random() * 8,
          rot: Math.random() * 6,
          vr: (Math.random() - 0.5) * 0.4,
          c: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          life: 120,
          shape: Math.random() < 0.5 ? "rect" : "circ",
        });
      }
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(confettiLoop);
      }
    },
    [confettiLoop],
  );

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [resizeCanvas]);

  useEffect(() => {
    setCartItems(loadCart());
    setCartReady(true);
  }, []);

  useEffect(() => {
    if (cartReady) saveCart(cartItems);
  }, [cartItems, cartReady]);

  const closeNav = useCallback(() => setNavOpen(false), []);

  useEffect(() => {
    if (!cartOpen && !navOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (cartOpen) setCartOpen(false);
      if (navOpen) setNavOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [cartOpen, navOpen]);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToastVisible(false);
      setToastMsg("");
    }, 2600);
  }, []);

  const addToCart = useCallback(
    (
      name: string,
      price: number,
      emoji: string,
      options?: { occasion?: string; personName?: string },
    ) => {
      setCartItems((items) =>
        addCartLine(items, {
          name,
          emoji,
          price,
          occasion: options?.occasion ?? selectedOccasion,
          personName: options?.personName ?? personName,
        }),
      );
      setCartOpen(true);
      toast(`💝 Přidáno do košíku: ${name}`);
    },
    [toast, selectedOccasion, personName],
  );

  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) return;
    const count = cartCount(cartItems);
    const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = subtotal >= 800 ? 0 : 89;
    const total = subtotal + shipping;
    confettiBurst(100);
    setCartItems([]);
    setCartOpen(false);
    toast(
      `🎉 Objednávka odeslána! ${count} položek za ${total.toLocaleString("cs-CZ")} Kč — brzy ti napíšeme 💌`,
    );
  }, [cartItems, confettiBurst, toast]);

  const subscribe = useCallback(() => {
    if (newsEmail && newsEmail.includes("@")) {
      toast("🎉 Vítej v Mochi klubu! Slevový kód je na cestě.");
      setNewsEmail("");
    } else {
      toast("📧 Zadej prosím platný e-mail");
    }
  }, [newsEmail, toast]);

  const openGacha = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    setRevealVisible(false);
    setBoxVisible(true);
    setBoxShaking(true);
    setGachaHint("Třesu, třesu... 🎲");
    setGachaBtnText("⏳ Třesu...");

    setTimeout(() => {
      setBoxShaking(false);
      setBoxVisible(false);

      const r = Math.random();
      let pool: typeof loot;
      if (r < 0.1) pool = loot.filter((l) => l.r === "super");
      else if (r < 0.4) pool = loot.filter((l) => l.r === "rare");
      else pool = loot.filter((l) => l.r === "common");

      const item = pool[Math.floor(Math.random() * pool.length)];
      setItemEmoji(item.e);
      setItemName(item.n);
      const [text, cls] = rLabel[item.r];
      setRarityText(text);
      setRarityClass(`rarity ${cls}`);
      setRevealVisible(true);
      confettiBurst(item.r === "super" ? 160 : 70);
      setGachaHint(
        item.r === "super"
          ? "JACKPOT! 🎉 Tohle je extrémně vzácné!"
          : "Hurá! Co dál? 💕",
      );
      setGachaBtnText("✦ Zkusit znovu");
      setSpinning(false);
    }, 1300);
  }, [spinning, confettiBurst]);

  return (
    <>
      <nav>
        <a className="logo" href="#top" onClick={closeNav}>
          <LogoMark className="logo-mark" />
          <span>
            <b>Mochi&nbsp;Box</b>
            <small>もこもこ · MYSTERY SHOP</small>
          </span>
        </a>
        <div className="nav-actions">
          <button
            type="button"
            className="nav-burger"
            aria-expanded={navOpen}
            aria-controls="nav-menu"
            aria-label={navOpen ? "Zavřít menu" : "Otevřít menu"}
            onClick={() => setNavOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <div className={`navlinks${navOpen ? " open" : ""}`} id="nav-menu">
            <a href="#boxmesice" onClick={closeNav}>
              Box měsíce
            </a>
            <a href="#boxy" onClick={closeNav}>
              Boxy
            </a>
            <a href="#gacha" onClick={closeNav}>
              Vyzkoušej
            </a>
            <a href="#uvnitr" onClick={closeNav}>
              Co je uvnitř
            </a>
            <a href="#baleni" onClick={closeNav}>
              Jak balíme
            </a>
            <a href="#recenze" onClick={closeNav}>
              Recenze
            </a>
          </div>
          <button
            type="button"
            className="cart-btn"
            onClick={() => {
              closeNav();
              setCartOpen(true);
            }}
            aria-label={`Košík, ${cartCount(cartItems)} položek`}
          >
            Košík <span className="cart-count">{cartCount(cartItems)}</span>
          </button>
        </div>
      </nav>
      <button
        type="button"
        className={`nav-scrim${navOpen ? " open" : ""}`}
        aria-hidden={!navOpen}
        tabIndex={navOpen ? 0 : -1}
        onClick={closeNav}
      />

      <header className="hero" id="top">
        <svg className="doodle d1" viewBox="0 0 100 100">
          <path
            d="M50 88C20 64 8 46 8 30 8 16 18 8 30 8c10 0 16 6 20 12 4-6 10-12 20-12 12 0 22 8 22 22 0 16-12 34-42 58z"
            fill="#FF7BAC"
            stroke="#43283C"
            strokeWidth="5"
          />
        </svg>
        <svg className="doodle d2" viewBox="0 0 100 100">
          <path
            d="M50 6l11 26 28 2-21 19 6 28-24-15-24 15 6-28L11 34l28-2z"
            fill="#FFD96B"
            stroke="#43283C"
            strokeWidth="5"
            strokeLinejoin="round"
          />
        </svg>
        <svg className="doodle d3" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="#9EE6C4" stroke="#43283C" strokeWidth="5" />
          <circle cx="40" cy="45" r="4" fill="#43283C" />
          <circle cx="60" cy="45" r="4" fill="#43283C" />
          <path
            d="M40 60q10 8 20 0"
            fill="none"
            stroke="#43283C"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
        <svg className="doodle d4" viewBox="0 0 100 100">
          <path
            d="M50 14c20 0 30 16 30 30 0 18-14 30-30 42C34 74 20 62 20 44c0-14 10-30 30-30z"
            fill="#C9B6F7"
            stroke="#43283C"
            strokeWidth="5"
          />
        </svg>
        <svg className="doodle d5" viewBox="0 0 100 100">
          <path
            d="M50 8l10 30 32 0-26 19 10 31-26-19-26 19 10-31L8 38l32 0z"
            fill="#8FD7F4"
            stroke="#43283C"
            strokeWidth="5"
            strokeLinejoin="round"
          />
        </svg>
        <svg className="doodle d6" viewBox="0 0 100 100">
          <circle cx="50" cy="55" r="35" fill="#FFB48F" stroke="#43283C" strokeWidth="5" />
          <path
            d="M30 30l40 0M50 18l0 18"
            stroke="#43283C"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>

        <span className="eyebrow">✦ Nová zásilka právě dorazila ✦</span>
        <h1>
          Otevři kouzlo
          <br />
          v každé <span className="wiggle">krabičce</span>!
        </h1>
        <p className="lead">
          Ručně skládané kawaii mystery boxy plné roztomilých plyšáků, samolepek,
          papírnictví a japonských sladkostí. Nikdy nevíš, co tě uvnitř čeká — a
          právě to je ta zábava! 💕
        </p>
        <div className="hero-cta">
          <a href="#boxy" className="btn btn-pink">
            ✦ Vybrat svůj box
          </a>
          <a href="#gacha" className="btn btn-cream">
            🎁 Zkusit otevřít zdarma
          </a>
        </div>

        <svg className="mascot" viewBox="0 0 200 200">
          <g stroke="#43283C" strokeWidth="5">
            <ellipse cx="100" cy="110" rx="74" ry="68" fill="#FFF0F6" />
            <circle cx="74" cy="104" r="7" fill="#43283C" stroke="none" />
            <circle cx="126" cy="104" r="7" fill="#43283C" stroke="none" />
            <circle cx="62" cy="122" r="9" fill="#FF7BAC" stroke="none" opacity=".75" />
            <circle cx="138" cy="122" r="9" fill="#FF7BAC" stroke="none" opacity=".75" />
            <path d="M86 124q14 12 28 0" fill="none" strokeLinecap="round" />
            <path d="M70 52c4-14 22-14 26 0" fill="none" strokeLinecap="round" />
            <path d="M104 52c4-14 22-14 26 0" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      </header>

      <div className="ribbon">
        <div className="ribbon-track">
          <RibbonSpans />
          <RibbonSpans />
        </div>
      </div>

      <div className="month-banner" id="boxmesice">
        <div className="month-card">
          <div className="mb-badge">{monthBox.emoji}</div>
          <div className="mb-info">
            <span className="month-tag">{monthBox.tag}</span>
            <h3>
              Box měsíce: <span>{monthBox.title}</span>
            </h3>
            <p>{monthBox.desc}</p>
          </div>
          <div className="mb-buy">
            <span className="month-price">
              {monthBox.price} Kč <s>{monthBox.old} Kč</s>
            </span>
            <button
              type="button"
              className="month-btn"
              onClick={() =>
                addToCart(monthBox.cartName, monthBox.price, monthBox.emoji, {
                  occasion: "",
                  personName: "",
                })
              }
            >
              Chci ho! 🐱
            </button>
          </div>
        </div>
      </div>

      <section className="gacha-section section-pad" id="gacha">
        <div className="wrap">
          <div className="sec-title">
            <span className="jp">ガチャ・ガチャ</span>
            <h2>Vyzkoušej si gachu!</h2>
          </div>
          <p className="sec-sub">
            Klepni na krabičku a podívej se, co by z tvého mystery boxu mohlo
            vypadnout. Každé otevření je překvapení! 🎲
          </p>

          <div className="gacha">
            <span className="tag">🎁 Mystery Box · zkušební režim</span>
            <div className="box-stage">
              {boxVisible && (
                <svg
                  id="mysteryBox"
                  className={boxShaking ? "box-shake" : undefined}
                  viewBox="0 0 200 200"
                  onClick={openGacha}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") openGacha();
                  }}
                  aria-label="Otevřít mystery box"
                >
                  <g stroke="#43283C" strokeWidth="5" strokeLinejoin="round">
                    <path
                      d="M30 78h140v98a8 8 0 01-8 8H38a8 8 0 01-8-8z"
                      fill="#FF7BAC"
                    />
                    <rect x="22" y="58" width="156" height="28" rx="6" fill="#FFB6D4" />
                    <rect x="88" y="58" width="24" height="128" fill="#FFD96B" />
                    <path
                      d="M100 58c-6-22-34-30-40-14-5 13 16 16 40 14z"
                      fill="#C9B6F7"
                    />
                    <path
                      d="M100 58c6-22 34-30 40-14 5 13-16 16-40 14z"
                      fill="#9EE6C4"
                    />
                    <circle cx="100" cy="52" r="7" fill="#fff" />
                  </g>
                </svg>
              )}
            </div>
            <div className={`reveal${revealVisible ? " show" : ""}`} id="reveal">
              <span className={rarityClass} id="rarity">
                {rarityText}
              </span>
              <div className="item-emoji" id="itemEmoji">
                {itemEmoji}
              </div>
              <div className="item-name" id="itemName">
                {itemName}
              </div>
            </div>
            <p className="hint" id="gachaHint">
              {gachaHint}
            </p>
            <button
              type="button"
              className="btn btn-pink"
              id="gachaBtn"
              onClick={openGacha}
            >
              {gachaBtnText}
            </button>
          </div>
        </div>
      </section>

      <section className="section-pad" id="boxy">
        <div className="wrap">
          <div className="sec-title">
            <span className="jp">ミステリーボックス</span>
            <h2>Vyber si svůj box</h2>
          </div>
          <p className="sec-sub">
            Nejdřív <b>velikost</b> (kolik toho dostaneš), pak{" "}
            <b>příležitost</b> (jaká nálada). Korálky a systém jsou pořád stejné.
            🎀
          </p>

          <div className="occasion-box">
            <h3>Pro jakou příležitost? 💌</h3>
            <p>Vyber náladu — obsah a vzkaz v balení doladíme přesně na míru.</p>
            <div className="occasion-pills" id="occasionPills">
              {occasions.map((o) => (
                <button
                  key={o.n}
                  type="button"
                  className={`pill${selectedOccasion === o.n ? " active" : ""}`}
                  onClick={() => {
                    setSelectedOccasion(o.n);
                    setOccasionResult(
                      `Vybráno: ${o.e} ${o.n} — teď zvol velikost ↓`,
                    );
                  }}
                >
                  {o.e} {o.n}
                </button>
              ))}
            </div>
            <div className="occasion-result" id="occasionResult">
              {occasionResult}
            </div>
            <div className="person-wrap">
              <label htmlFor="personName">
                Pro koho to je? Napiš jméno na kartičku 💌
              </label>
              <input
                className="person-input"
                id="personName"
                type="text"
                maxLength={40}
                placeholder="např. Pro Aničku ♡ (nepovinné)"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
              />
            </div>
          </div>

          <p className="size-heading">A teď velikost:</p>
          <div className="product-showcase" id="productGrid">
            {products.map((p) => {
              const savings =
                p.old && p.old > p.price
                  ? Math.round(((p.old - p.price) / p.old) * 100)
                  : null;

              return (
                <article
                  key={p.name}
                  className={`product-card product-card--${p.tier}${p.badge ? " product-card--tagged" : ""}`}
                >
                  {p.badge ? (
                    <span className="product-card__ribbon">{p.badge}</span>
                  ) : null}
                  <div className="product-card__head">
                    <span className="product-card__tier">{p.tagline}</span>
                    <div className="product-card__emoji">{p.emoji}</div>
                    <h3>{p.name}</h3>
                  </div>
                  {p.gold > 0 ? (
                    <div className="gold-stuha">✨ Šance na gold: {p.gold}%</div>
                  ) : null}
                  <div className="product-card__price">
                    <span className="product-card__amount">
                      {p.old ? <s>{p.old} Kč</s> : null}
                      {p.price} Kč
                    </span>
                    {savings ? (
                      <span className="product-card__save">
                        Ušetříš {savings} %
                      </span>
                    ) : null}
                  </div>
                  <p className="product-card__desc">{p.desc}</p>
                  <ul className="product-card__perks">
                    {p.perks.map((perk) => (
                      <li key={perk}>{perk}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="product-card__cta"
                    onClick={() => addToCart(p.name, p.price, p.emoji)}
                  >
                    {p.tier === "hero"
                      ? "Chci Mega Box 🛒"
                      : p.tier === "lux"
                        ? "Chci Luxury Box 💎"
                        : "Přidat do košíku 🛒"}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="section-pad"
        id="uvnitr"
        style={{
          background: "var(--lav)",
          borderTop: "3px solid var(--line)",
          borderBottom: "3px solid var(--line)",
        }}
      >
        <div className="wrap">
          <div className="sec-title">
            <span className="jp">なかみ</span>
            <h2>Co může být uvnitř?</h2>
          </div>
          <p className="sec-sub">
            Každý box je namíchaný z těchto kategorií — poměr je vždy překvapení!
            ✨
          </p>
          <div className="inside-grid">
            {insideChips.map((chip) => (
              <div key={chip.label} className="chip">
                <span className="e">{chip.e}</span>
                <b>{chip.label}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="packing section-pad" id="baleni">
        <div className="wrap">
          <div className="pack-flex">
            <div className="pack-text">
              <span className="jp">こんぽう・ライブ</span>
              <h2>Žádné triky. Jen lžička, korálky a náhoda.</h2>
              <p>
                Každý box skládáme naživo před kamerou. Lžičkou hrábneme do
                korálků, přebytek proseješ sítkem — a to, co zůstane, určuje, co
                do tvého boxu zabalíme. Vidíš to celé, od první lžíce až po
                zalepení. 🥄
              </p>
              <ul className="pack-points">
                <li>
                  <span className="tick">✓</span>
                  <span>
                    <b>100 % férové.</b> Náhoda probíhá před tvýma očima, nic
                    není nastrčené.
                  </span>
                </li>
                <li>
                  <span className="tick">✓</span>
                  <span>
                    <b>Každý korálek = kategorie.</b> Podle barev skládáme tvoji
                    sadu (klíč najdeš níž).
                  </span>
                </li>
                <li>
                  <span className="tick">✓</span>
                  <span>
                    <b>Ručně, s láskou.</b> Žádný stroj — jen my, lžička a hromada
                    roztomilostí.
                  </span>
                </li>
              </ul>
            </div>
            <div
              className="phone"
              onClick={() => toast("🎬 Sem přijde tvoje TikTok / Reels video!")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  toast("🎬 Sem přijde tvoje TikTok / Reels video!");
              }}
              role="button"
              tabIndex={0}
            >
              <div className="notch" />
              <div className="screen">
                <div className="hands">🙌</div>
                <div className="play" />
                <div className="vidcap">
                  🥄 Skládám box #247 ✦ poslouchej ten zvuk korálků
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bead-key section-pad" id="klic">
        <div className="wrap">
          <div className="sec-title">
            <span className="jp">ビーズの かぎ</span>
            <h2>Korálkový klíč 🔮</h2>
          </div>
          <p className="sec-sub">
            Korálky mají <b>tři úrovně hodnoty</b>: kulaté barevné = základní věci,{" "}
            <b>tvarované = hodnotnější dárky</b>, zlatý = vzácný jackpot. U videa
            hned poznáš, co padlo! 🎲
          </p>
          <h3 className="bead-subhead">🔵 Základní · kulaté barevné korálky</h3>
          <div className="bead-grid" id="beadGrid">
            {beadsRound.map((b) => {
              const special = b.c === "gem";
              return (
                <div key={b.name} className="bead-row">
                  <span
                    className={`bead${special ? ` ${b.c}` : ""}`}
                    style={special ? undefined : { background: b.c }}
                  />
                  <span className="lbl">
                    <b>
                      {b.e} {b.name}
                    </b>
                    <span>{b.note}</span>
                  </span>
                </div>
              );
            })}
          </div>
          <h3 className="bead-subhead">
            🎁 Střední vrstva · tvarované korálky (hodnotnější dárky)
          </h3>
          <div className="bead-grid" id="beadGridShaped">
            {beadsShaped.map((b) => (
              <div key={b.name} className="bead-row">
                <span className="bead-shape">{b.s}</span>
                <span className="lbl">
                  <b>
                    {b.e} {b.name}
                  </b>
                  <span>{b.note}</span>
                </span>
              </div>
            ))}
          </div>
          <h3 className="bead-subhead">🏆 Top · vzácný zlatý korálek</h3>
          <div className="gold-showcase">
            <span className="bead gold" />
            <div>
              <b>✨ Vzácný bonus</b>
              <span className="sub">zlatý korálek · prémiový dárek zdarma</span>
            </div>
          </div>
          <p className="bead-note">
            Zlatý korálek se objeví jen výjimečně (cca 1 box z 20–30). Když
            uslyšíš to cinknutí zlata, je to výhra — prémiový dárek navíc! 🏆
          </p>
        </div>
      </section>

      <section className="section-pad" id="videa">
        <div className="wrap">
          <div className="feed-head">
            <div className="sec-title" style={{ margin: 0 }}>
              <span className="jp">@mochibox</span>
              <h2>Sleduj, jak balíme ✂️</h2>
            </div>
            <a
              href="#"
              className="btn btn-pink"
              onClick={(e) => {
                e.preventDefault();
                toast("📱 Propoj sem svůj TikTok / Instagram profil");
              }}
            >
              ＋ Sledovat @mochibox
            </a>
          </div>
          <div className="feed-grid" id="feedGrid">
            {clips.map((c, i) => (
              <div
                key={i}
                className="clip"
                style={{ background: c.g }}
                onClick={() => toast("🎬 Sem napoj konkrétní video z profilu")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    toast("🎬 Sem napoj konkrétní video z profilu");
                }}
                role="button"
                tabIndex={0}
              >
                <span className="tt">▶ {c.t}</span>
                <span className="miniplay" />
                <span className="views">♥ {c.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="steps section-pad" id="jak">
        <div className="wrap">
          <div className="sec-title">
            <span className="jp">かんたん 3ステップ</span>
            <h2>Jak to funguje</h2>
          </div>
          <p className="sec-sub">Tři krůčky k tvému balíčku štěstí. 📦</p>
          <div className="steps-grid">
            <div className="step">
              <span className="num">1</span>
              <span className="e">🛍️</span>
              <h3>Vyber box</h3>
              <p>Zvol velikost a téma podle nálady i rozpočtu.</p>
            </div>
            <div className="step">
              <span className="num">2</span>
              <span className="e">✨</span>
              <h3>My namícháme</h3>
              <p>Ručně skládáme překvapení tak, aby ti udělalo radost.</p>
            </div>
            <div className="step">
              <span className="num">3</span>
              <span className="e">📬</span>
              <h3>Otevři &amp; zaraduj se</h3>
              <p>Balíček dorazí a tebe čeká kawaii nadílka!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" id="recenze">
        <div className="wrap">
          <div className="sec-title">
            <span className="jp">レビュー</span>
            <h2>Co říkají naši fanoušci</h2>
          </div>
          <p className="sec-sub">Přes 12 000 spokojených sběratelů roztomilostí. 💌</p>
          <div className="reviews-grid">
            <div className="review">
              <div className="stars">★★★★★</div>
              <p>
                „Nejlepší překvapení v poště! Plyšák uvnitř je teď můj nový
                nejlepší kamarád. Objednávám další!“
              </p>
              <div className="who">
                <span className="av" style={{ background: "#FFD96B" }}>
                  🐰
                </span>
                <div>
                  <b>Terka K.</b>
                  <span>Praha</span>
                </div>
              </div>
            </div>
            <div className="review">
              <div className="stars">★★★★★</div>
              <p>
                „Koupila jsem Mega Box jako dárek a měla obří úspěch. Balení samo
                o sobě je tak roztomilé, že jsem ho nechtěla otevřít!“
              </p>
              <div className="who">
                <span className="av" style={{ background: "#9EE6C4" }}>
                  🐱
                </span>
                <div>
                  <b>Lucie M.</b>
                  <span>Brno</span>
                </div>
              </div>
            </div>
            <div className="review">
              <div className="stars">★★★★★</div>
              <p>
                „Samolepky a papírnictví jsou naprosto boží. Konečně mystery box,
                kde fakt všechno použiju. 10/10 kawaii!“
              </p>
              <div className="who">
                <span className="av" style={{ background: "#C9B6F7" }}>
                  🐻
                </span>
                <div>
                  <b>Adam V.</b>
                  <span>Ostrava</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-pad"
        style={{
          background: "var(--milk)",
          borderTop: "3px solid var(--line)",
        }}
      >
        <div className="wrap">
          <div className="news">
            <h2>Připoj se k Mochi klubu! 🎀</h2>
            <p>Sleva 10 % na první box + první vědět o nových zásilkách.</p>
            <div className="form">
              <input
                type="email"
                id="newsEmail"
                placeholder="tvuj@email.cz"
                aria-label="email"
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
              />
              <button type="button" className="btn btn-cream" onClick={subscribe}>
                Chci slevu ✦
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="foot-logo-wrap">
          <Image
            src="/mochi-box-logo.png"
            alt="Mochi Box — Mystery Shop"
            width={560}
            height={560}
            className="foot-logo-img"
            priority={false}
          />
        </div>
        <div className="foot-links">
          <a href="#boxy">Boxy</a>
          <a href="#jak">Jak to funguje</a>
          <a href="#recenze">Recenze</a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toast("💌 Napiš nám na ahoj@mochibox.cz");
            }}
          >
            Kontakt
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toast("🚚 Doručení 2–4 pracovní dny");
            }}
          >
            Doprava
          </a>
        </div>
        <p className="foot-copy">
          © 2026 Mochi Box · Vyrobeno s 💕 a spoustou cukru · Toto je ukázkový
          demo e-shop
        </p>
      </footer>

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onQtyChange={(id, delta) =>
          setCartItems((items) => updateCartQty(items, id, delta))
        }
        onRemove={(id) =>
          setCartItems((items) => removeCartLine(items, id))
        }
        onCheckout={handleCheckout}
      />

      <div id="toast" className={toastVisible ? "show" : ""}>
        {toastMsg}
      </div>
      <canvas id="confetti" ref={canvasRef} />
    </>
  );
}
