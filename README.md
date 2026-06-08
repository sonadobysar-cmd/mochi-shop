# Mochi Box — Kawaii Mystery Shop

Demo e-shop **もこもこ Mochi Box** — věrná kopie `reference/mochibox.html` v Next.js.

## Live

**https://mochi-shop-tau.vercel.app**

## Lokální spuštění

```bash
npm install
npm run dev
```

Otevři [http://localhost:3000](http://localhost:3000).

## GitHub (jednorázově)

Repozitář na GitHubu ještě neexistuje. Vytvoř ho a pushni kód:

1. Na [github.com/new](https://github.com/new) vytvoř repo **`mochi-shop`** (veřejné, bez README).
2. V terminálu:

```bash
cd ~/mochi-shop
git remote add origin git@github.com:sonadobysar-cmd/mochi-shop.git
git push -u origin main
```

3. Ve Vercelu: Project → Settings → Git → Connect Repository → `sonadobysar-cmd/mochi-shop`.

## Struktura

| Soubor | Popis |
|--------|--------|
| `reference/mochibox.html` | Původní šablona (1:1 zdroj) |
| `src/app/globals.css` | CSS zkopírované ze šablony |
| `src/components/MochiBoxPage.tsx` | Celá stránka + interaktivita |
| `src/lib/mochibox-data.ts` | Produkty, korálky, gacha loot |
