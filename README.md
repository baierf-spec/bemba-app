# bemba.com

Africa entry atlas: visa, vaccine and arrival rules for all 54 African countries, by passport.
Static Astro site served by Cloudflare Workers (static assets) with a small Worker API for safari leads stored in D1.

## Kas viduje

| Dalis | Kur |
|---|---|
| Šalių duomenys (54 šalys: vizos EU/UK/US, sveikata, oro uostai, valiuta) | `src/data/countries.ts` |
| Pasai, kuriems generuojami puslapiai (14) | `src/data/passports.ts` |
| Partnerių (affiliate) nuorodos | `src/config/site.ts` |
| pSEO tekstų logika (atsakymai, žingsniai, FAQ) | `src/lib/visa.ts` |
| Puslapių šablonai | `src/pages/` |
| Worker API (`/api/lead`, `/api/health`) | `worker/index.ts` |
| D1 schema | `migrations/0001_leads.sql` |
| Cloudflare konfigūracija | `wrangler.jsonc` |

### Puslapiai (917 iš viso)

- `/` – pagrindinis su tikrintuvu ir animuotu bento bloku
- `/countries/` ir `/countries/{šalis}/` – 54 šalių puslapiai
- `/visa/` , `/visa/{pasas}/` ir `/visa/{pasas}/{šalis}/` – 14 × 54 = 756 pSEO puslapiai („Do Lithuanian citizens need a visa for Tanzania?“)
- `/visa-free-countries/{pasas}/`, `/evisa-countries/{pasas}/`, `/visa-on-arrival-countries/{pasas}/` – 42 sąrašų puslapiai
- `/regions/{regionas}/` – 5 regionų puslapiai
- `/health/yellow-fever/`, `/health/malaria/` – sveikatos suvestinės
- `/guides/` – vadovai: taisyklių pakeitimai 2025–2026, East Africa Tourist Visa, KAZA UNIVISA, oficialūs vizų portalai
- `/costs/` ir `/costs/{šalis}/` – oficialūs parkų mokesčiai, gorilų leidimai, vizos ir pavyzdinės kelionės suma (9 šalys, `src/data/costs.ts`)
- `/compare/` ir `/compare/{pora}/` – 6 palyginimai (Kenya vs Tanzania ir kt., `src/data/comparisons.ts`)
- `/when-to-go/` ir `/when-to-go/{mėnuo}/` – 12 mėnesių puslapių, 24 kryptys (`src/data/seasons.ts`)
- Iliustracijos: originalūs SVG peizažai `src/components/Scene.astro` (8 scenos)
- `/safari/` – užklausų forma (lead-gen) → D1 + Telegram pranešimas
- `/llms.txt`, `/llms-full.txt`, `/data/visa-rules.json` – santraukos ir atviri duomenys AI paieškai (GEO)
- `public/og.png` – socialinių tinklų paveikslėlis (`node scripts/og.mjs`)
- `/about/`, `/disclosure/`, `/privacy/`, `404`, `robots.txt`, `sitemap-index.xml`

Kiekvienas pSEO puslapis turi kanoninę nuorodą, Article + BreadcrumbList + FAQPage JSON-LD ir vidines nuorodas (kiti pasai, kaimyninės šalys).

## Duomenų tikslumas

`src/data/countries.ts` patikrintas 2026-10-27 (`DATA_CHECKED` faile `src/data/sources.ts`) pagal Wikipedia lenteles kelioms EU, UK ir US pilietybėms, oficialius portalus, WHO geltonojo drugio sąrašą ir naujienas apie 2025–2026 pakeitimus. Kiekviename puslapyje rodoma tikrinimo data ir šaltiniai.

Kai vėl patikrinsi duomenis, atnaujink `DATA_CHECKED`. Skirtumai tarp atskirų pasų rašomi `overrides` lauke (pvz. Mozambikas Baltijos šalims ir Lenkijai).

## Vietinis darbas

```bash
npm install
npm run dev                # Astro dev serveris (be API)
npm run preview            # build + wrangler dev (su API ir vietine D1)
npx wrangler d1 migrations apply bemba-leads --local   # pirmą kartą prieš preview
```

## Cloudflare

Jau sukurta tavo paskyroje:

- **D1 duomenų bazė** `bemba-leads` (`108bf214-50e2-4209-910d-b36961a730be`) su lentele `leads`.
- Worker `bemba-app`, prijungtas prie **https://bemba.com** ir **www.bemba.com** (www → 301 į bemba.com per zonos redirect taisyklę).
- D1 migracija `0001_leads.sql` pažymėta kaip pritaikyta (`d1_migrations`).

### Įkėlimas (rekomenduojama: Workers Builds, be tokenų)

1. Cloudflare dashboard → **Workers & Pages → Create → Import a repository**.
2. Pasirink `baierf-spec/bemba-app`, šaką `main`.
3. Build command: `npm run build`. Deploy command: `npx wrangler deploy`.
4. Po kiekvieno `git push` į `main` svetainė persidiegia automatiškai.

Alternatyva: GitHub Actions (`.github/workflows/ci.yml`). Nustatyk repo kintamąjį `DEPLOY_WITH_ACTIONS=true` ir secret `CLOUDFLARE_API_TOKEN`.

### Domenas bemba.com

Prijungtas. Seni A įrašai (185.158.133.1) ištrinti, jų vietą užėmė Worker custom domains.

### Telegram pranešimai apie naujus leadus (nebūtina)

```bash
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
```

### Leadų peržiūra

```bash
npx wrangler d1 execute bemba-leads --remote --command "SELECT * FROM leads ORDER BY id DESC LIMIT 20"
```

## Pajamos

- **Affiliate:** eSIM, draudimas, ekskursijos. Pakeisk URL `src/config/site.ts` savo partnerių nuorodomis (Airalo, SafetyWing, GetYourGuide ar kt.).
- **Safari lead-gen:** užklausos iš `/safari/` ir kiekvieno safari šalies puslapio. Jas parduodi arba persiunti operatoriams už referral mokestį.
- **Reklama:** kai srautas užaugs (AdSense, Ezoic, Mediavine).

## Plėtra

- Daugiau pasų: pridėk eilutę `src/data/passports.ts` → +54 puslapiai.
- Daugiau tekstų: `highlights`, `note` ir kiti laukai `countries.ts`.
- Mėnesinė duomenų peržiūra: n8n arba GitHub Action su Claude API, kuri tikrina portalus ir atidaro PR su pakeitimais.
