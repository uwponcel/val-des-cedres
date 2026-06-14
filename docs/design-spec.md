# 9, rue du Val-des-Cèdres - Design Spec

Immersive bilingual luxury real-estate site for a $1,850,000 riverside craftsman
lodge in Morin-Heights, Laurentides, Québec. Listing ULS 21723694, RE/MAX
Collection, brokers at RE/MAX du Cartier Bonjour.

Status: design approved (brainstorm). Build is phased (see Phased Plan).

---

## 1. Goal and audience

Make a serious buyer FEEL the property before they ever visit. Not an MLS clone:
a cinematic, editorial, warm-luxury experience. The 83 real photos are the star,
the chrome serves them.

Reference vibe: Aman resort site, meets a Québec chalet de prestige, meets Kinfolk
editorial. Warm and organic, never cold minimalist tech.

Audience: high-net-worth buyers, Montréal anglophone + francophone, out-of-province
and US. Hence bilingual.

The story that sells this property: nature sanctuary + thermal ritual (spa / sauna /
bain vapeur) + river cascades + total privacy + craftsman warmth.

---

## 2. Locked decisions

- Wow mechanic: cinematic scroll journey (GSAP ScrollTrigger + Lenis) + 3 WebGL accents
  (depth-parallax hero, river water shader, interactive grounds map).
- Language: bilingual, French default, EN toggle in nav. FR is primary copy.
- Features: lead/contact form, interactive location map, mortgage calculator,
  gallery + lightbox, elegant room-by-room index. Plus agent block, financial
  details, inclusions/exclusions.
- Stack: Vite + React + TS + Tailwind + GSAP + Lenis + React-Three-Fiber.
- Backend: Express 5 + Resend (single service). Host: Railway (personal account),
  auto-deploy from GitHub main.

Micro-defaults: map uses MapLibre + free tiles (no API token). River sound is
opt-in, off by default. prefers-reduced-motion and mobile get simplified fallbacks.

---

## 3. The skeleton - one scroll, a descent from sky to river

8 pinned acts. A thin left-edge progress line tracks the descent (sky to river).
Warm-dark immersive base for cinematic acts; cream "paper" base for spec acts.

| # | Act | Photos | Beat | Mechanic |
|---|-----|--------|------|----------|
| 0 | L'approche | `aer66/67/68/70` | Drone over autumn valley, camera descends to the house | Depth-parallax hero (WebGL #1), scroll-scrub zoom wide aerial to façade |
| 1 | L'arrivée | `pri01` `fac02/65` | Land on timber façade, count-up stats | Door opens, push into interior. Stats: 1.85M, 3 ch, 19 pièces, 48,761 pi², rivière |
| 2 | Le grand intérieur | `sal10-15` `sam16-19` `cui20-24` | Cathedral salon, dining, dream kitchen | Crossfade glide; material close-crops (stone wall, walnut shaker, granite) |
| 3 | Le sanctuaire thermal | `sbp34/35` `sdb48/49` sauna | MOODY scene, the differentiator | Dark palette, drifting steam particles, warm glow. "Spa. Sauna. Bain vapeur." |
| 4 | La rivière | `ver26/27` `tse53` `bal52` `ext58/59/61` | Emotional climax, Chevreuil in cascades | River water shader (WebGL #2); opt-in ambient water sound |
| 5 | Le domaine | `aer71-75` | 48,761 pi², cul-de-sac, no neighbor behind | Interactive map (WebGL #3, MapLibre), animated arcs to amenities |
| 6 | Chaque pièce + dossier | all 83 | 19 rooms, dims, finishes, full spec dossier | Filterable room index, lightbox gallery, building/land specs, finances, inclusions/exclusions |
| 7 | L'invitation | `aer` dusk | Price anchor, convert | Mortgage calc, lead form, two brokers ("Contacter le courtier") |

### Copy tone (FR primary)
Sober, evocative, confident. Examples:
- Hero: « Là où l'architecture rencontre la rivière. »
- Arrivée: « Une demeure de plain-pied, taillée dans le bois et la pierre. »
- Intérieur: « Sous des plafonds cathédrale de 12 pieds. »
- Sanctuaire: « Spa. Sauna. Bain vapeur. Le rituel thermal, à demeure. »
- Rivière: « En bordure de la rivière Chevreuil. Écoutez. »
- Domaine: « 48 761 pi² de nature. Aucun voisin derrière. »
- Pièces: « Dix-neuf pièces. Aucune sans intention. »
- Invitation: « Planifiez une visite privée. »

---

## 4. Design system

- Type: Fraunces (display serif, optical sizing, clip-path mask reveals on headlines)
  + Inter (UI / body). Self-host via @fontsource to avoid FOUT and external deps.
- Color tokens:
  - `ink #1A1612` base immersive
  - `bone #F2ECE0` paper / text
  - `walnut #7A4A2B` bois massif
  - `cognac #A56A3E` warm accent
  - `pine #2C3A2E` forest
  - `ember #C06733` autumn foliage accent
  - `slate-river #3E5763` water act
- Motion: Lenis smooth scroll, GSAP ScrollTrigger pinned/scrubbed scenes, Ken Burns
  zooms, count-up stats, magnetic CTA, clip-path text reveals.
- Accessibility (hard requirements):
  - `prefers-reduced-motion` -> static crossfade fallback, no scrubbing.
  - Mobile (touch) -> simplified crossfade journey, no scrubbed pins.
  - All 3 WebGL accents lazy-loaded via Suspense, each with a 2D fallback.
  - Semantic headings, alt text on photos (bilingual), focus states, `tel:`/form labels.
- Performance: `vite-imagetools` for responsive srcset + blur-up placeholders across 83
  images. Lazy-load below-fold. Preload hero. Lighthouse-minded.

---

## 5. Data model - single source of truth (`src/data/property.ts`)

All facts typed here. All visible strings flow through i18n dictionaries (FR primary).

### Identity
- address: "9, rue du Val-des-Cèdres", city: "Morin-Heights", region: "Laurentides, Québec"
- type: "Maison de plain-pied", uls: "21723694", priceCad: 1850000
- yearBuilt: 2006, roomsTotal: 19, bedrooms: 3, bathrooms: 2, powderRooms: 1
- buildingDims: `51'4" x 30'9" irr.`
- landDims: `216'11" x 309'8"`, landSqFt: 48761, landSqM: 4530
- brand: "RE/MAX Collection", brokerage: "RE/MAX du Cartier Bonjour"

### Agents (Act 7)
- Nathalie Plante, "Courtier immobilier agréé", "RE/MAX du Cartier Bonjour", tel "514 799-4149"
- Rémi Tremblay, "Courtier immobilier", "RE/MAX du Cartier Bonjour", tel "514 347-1666"
- programs: ["Tranquilli-T", "Affiliés RE/MAX Coproprié-T"]

### Mortgage defaults (Act 7, Desjardins-style)
- price 1,850,000, downPayment 370,000 (20%), loan 1,480,000, rate 5.5%,
  amortizationYears 25, frequency "Aux 2 semaines" (biweekly).
- Include a "Note légale" disclaimer; calc is client-side only, estimate only.

### Finances (Act 6 dossier)
- Évaluation municipale 2025: terrain 212,300, bâtiment 1,122,800, total 1,335,100
- Taxes: municipale (2025) 7,253, scolaire (2025) 859, total 8,112
- Dépenses énergétiques: autre 171, total 171

### Inclusions (Act 6)
Cuisinière et four Wolf, hotte Wolf, lave-vaisselle Asko, réfrigérateur Sub-Zero,
tous les luminaires, système d'alarme et caméras reliés, système audio intérieur et
extérieur, aspirateur central, système d'irrigation, 4 ouvre-portes de garage, le spa,
climatiseur mural dans le garage détaché.

### Exclusions (Act 6)
Effets personnels, meubles, laveuse et sécheuse, contenu du cellier et le rack,
cellier dans la salle mécanique, toiles et tableaux, micro-onde, réfrigérateur et
congélateur dans le garage attaché, réfrigérateur dans le garage double détaché.

### Rooms (19) - level / dims / floor / detail
RDC (1er niveau):
1. Hall d'entrée/Vestibule, 8'0"x7'8", Ardoise, passage à la cuisine
2. Passage à la cuisine, 7'2"x3', Ardoise
3. Salon, 20'8"x23'7", Bois, Foyer au bois 2 faces
4. Salle à manger, 18'2"x10'11", Bois, Foyer au bois 2 faces
5. Cuisine, 18'2"x11'4", Ardoise, Îlot central
6. Véranda, 17'11"x11'1", Fibre de verre, Grillagée 3 saisons
7. Salle d'eau, 5'7"x5'3", Ardoise
8. Vestibule d'entrée du garage, 14'4"x9'2", Ardoise et bois
9. Chambre principale, 14'4"x20'3", Bois
10. Penderie (Walk-in), 14'4"x9'2", Bois
11. Salle de bains, 9'1"x16'10", Céramique, plancher chauffant électrique

Rez-de-jardin:
12. Salle familiale, 16'6"x26'10", Bois et céramique, Foyer combustion au bois
13. Salle de sport ou chambre, 18'0"x13'2", Bois et céramique, Foyer combustion au bois
14. Sauna, 6'6"x8'9", Cèdre
15. Chambre à coucher (ou bureau), 15'x16'9", Bois
16. Salle de bains, 10'9"x12'5", Céramique, plancher chauffant

Sous-sol 1:
17. Salle de lavage, 11'1"x8'9", Céramique
18. Rangement, 21'0"x11'3", Béton, salle mécanique
19. Bureau, 23'1"x12'7", Bois

### Highlights / features
Spa extérieur, sauna sec (cèdre), bain vapeur, rivière Chevreuil en cascades + bassin
naturel, cul-de-sac, aucun voisin à l'arrière, 2 garages doubles (attaché + détaché
chauffé), plafonds 12 pi au RDC, 2 foyers au bois (salon/SAM deux faces, salle familiale
manteau de cuivre), cuisine shaker noyer + granit brut, suite des maîtres (walk-in, bain
attenant, plancher chauffant, baignoire à débordement, douche céramique/verre jets),
véranda grillagée 3 saisons, terrasses, balcon, fenêtres Henderson bois (manivelle),
ardoise, sécurité caméras + détecteurs, échangeur d'air, adoucisseur d'eau, climatiseur
central, dômes de lumière naturelle, appliques de cuivre.

### Technical
- Chauffage: air pulsé + plinthes électriques; énergie: électricité
- Foyers: au bois + combustion lente
- Eau: puits artésien; égouts: ECOFLO + fosse septique
- Sous-sol: plafond 9 pi au rez-de-jardin, entrée extérieure, totalement aménagé
- Stationnement: allée (12) + garage (4); allée non pavée

### Proximities (Act 5 map, with distances where known)
- Corridor aérobique: 100 m (marche, vélo, ski de fond)
- Ski alpin Morin-Heights: 500 m
- Saint-Sauveur: 10 min via route 364
- Also: école primaire, école secondaire, garderie/CPE, parc, piste cyclable,
  piste de vélo de montagne, autoroute

---

## 6. Tech architecture

- Frontend: Vite + React 19 + TS + Tailwind. Lenis (smooth scroll), GSAP +
  ScrollTrigger (the spine), React-Three-Fiber + drei (3 WebGL accents, lazy).
- i18n: lightweight context + `fr.json` / `en.json` dictionaries, FR default. No i18next.
- Map: MapLibre GL JS, dark custom style, pitch for a 3D-ish tilt, animated proximity
  arcs. Static image fallback.
- Mortgage calc: pure client-side.
- Backend: Express 5 single service. In production it serves the built `dist/` and
  exposes `POST /api/contact`. In dev, Vite (5173) proxies `/api` to Express (3001).
  - Contact: zod validation + honeypot + IP rate-limit, sends via Resend.
  - Env: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Stubbed so the
    site runs locally without secrets.
- Images: `vite-imagetools` responsive srcset + blur-up.
- Host: Railway (personal account), Nixpacks. Build `npm run build`, start `npm start`.
  Auto-deploy from GitHub `main`. Repo: `uwponcel/val-des-cedres` (private).

### File structure
```
val-des-cedres/
  docs/design-spec.md          # this file
  index.html
  package.json
  vite.config.ts  tsconfig*.json  tailwind.config.js  postcss.config.js
  .env.example  .gitignore  nixpacks/railway notes
  public/photos/...            # optimized property photos
  server/
    index.ts                   # Express: serve dist + /api/contact
    contact.ts                 # zod + honeypot + rate-limit + Resend
  src/
    main.tsx  App.tsx  index.css   # tokens
    data/property.ts             # single source of truth
    i18n/{fr,en}.json  useI18n.ts
    lib/{lenis,gsap,useScrollScene}.ts
    components/
      Nav.tsx  ProgressDescent.tsx
      acts/{Approche,Arrivee,Interieur,Sanctuaire,Riviere,Domaine,Pieces,Invitation}.tsx
      webgl/{HeroDepth,RiverWater,GroundsMap}.tsx   # lazy
      ui/{Stat,RevealText,Lightbox,Field,MortgageCalc,AgentCard}.tsx
```

---

## 7. The design prompt (portable artifact)

```text
Build an immersive, single-page bilingual (FR default / EN toggle) luxury real-estate
site for a $1,850,000 riverside craftsman lodge at 9 rue du Val-des-Cèdres,
Morin-Heights, Laurentides, Québec. Stack: Vite + React + TS + Tailwind + GSAP
ScrollTrigger + Lenis + React-Three-Fiber. Backend: Express 5 + Resend (single
service). Deploy: Railway, auto-deploy from GitHub main.

GOAL: make a serious buyer FEEL the property before visiting. Not an MLS clone: a
cinematic, editorial, warm-luxury experience. Aesthetic: Aman resort meets Québec
chalet de prestige meets Kinfolk. Warm and organic, never cold minimalist tech. The
83 real photos are the star.

STRUCTURE: one vertical scroll = a DESCENT from sky to river, 8 pinned acts, thin
left-edge progress line:
  0 L'APPROCHE   depth-parallax drone hero (WebGL), scroll-scrub zoom aerial to façade.
  1 L'ARRIVÉE    timber façade; count-up stats (1.85M, 3 ch, 19 pièces, 48,761 pi²).
  2 GRAND INTÉRIEUR crossfade glide salon (12ft cathedral, 2-sided wood fireplace,
                 stone wall) to dining to walnut-shaker/granite kitchen; material crops.
  3 SANCTUAIRE THERMAL moody/dark: spa, sauna, bain vapeur, master bath (overflow tub,
                 heated floors). Drifting steam, warm glow. The differentiator.
  4 LA RIVIÈRE   climax. WebGL water shader over the Chevreuil-in-cascades photos;
                 opt-in ambient water sound (muted default).
  5 LE DOMAINE   interactive tilted MapLibre map; animated arcs to alpine ski 500m,
                 aerobic corridor 100m, Saint-Sauveur 10min. 48,761 pi², cul-de-sac,
                 no rear neighbor, river frontage.
  6 CHAQUE PIÈCE 19 rooms + dims as a filterable index (RDC / rez-de-jardin / sous-sol),
                 lightbox gallery, building/land specs, municipal eval + taxes,
                 inclusions/exclusions.
  7 L'INVITATION price anchor; Desjardins-style mortgage calculator (defaults:
                 1.85M, 20% down, 5.5%, 25y, biweekly); private-visit lead form
                 (Express + Resend, honeypot + rate-limit); two brokers Nathalie
                 Plante 514 799-4149 and Rémi Tremblay 514 347-1666, RE/MAX du
                 Cartier Bonjour. Discreet ULS 21723694.

DESIGN SYSTEM:
  Type: Fraunces (display, clip-path reveals) + Inter (UI).
  Color: ink #1A1612, bone #F2ECE0, walnut #7A4A2B, cognac #A56A3E, pine #2C3A2E,
         ember #C06733, slate-river #3E5763. Dark immersive cinematic acts; cream
         paper for spec/room acts.
  Motion: Lenis + GSAP pinned/scrubbed; Ken Burns; count-up; magnetic CTA.
  HARD REQ: prefers-reduced-motion -> static fallback. Mobile -> simplified crossfade,
            no scrubbed pins. All 3 WebGL lazy w/ 2D fallback.
  Perf: vite-imagetools responsive srcset + blur-up (83 imgs).

DATA: one typed src/data/property.ts = single source of truth. All copy via i18n
dictionaries, FR primary.
```

---

## 8. Phased plan (each phase: build, verify, then approve before next)

- P1 Scaffold: project + configs + Tailwind tokens + `property.ts` data + i18n shell +
  Lenis/GSAP setup + Express stub + a minimal running App shell.
- P2 Acts 0-2: Approche (hero depth), Arrivée (stats), Intérieur.
- P3 Acts 3-4: Sanctuaire (steam) + Rivière (water shader). WebGL.
- P4 Acts 5-6: Domaine (MapLibre map) + Chaque pièce (room index, gallery, dossier).
- P5 Act 7 + global: mortgage calc, lead form + Express/Resend, agents, Nav/lang toggle,
  ProgressDescent, reduced-motion + mobile fallbacks, perf pass, full verify.

Per-phase verification: `npx tsc --noEmit`, `npx eslint . --quiet` (if configured),
and a dev-server smoke check. No phase reported complete until type-check passes.

## 9. Open items (needed at build time, stubbed until then)
- Contact form recipient email (`CONTACT_TO_EMAIL`).
- Resend API key (`RESEND_API_KEY`) + verified `CONTACT_FROM_EMAIL` domain.
- Final source photos copied into `public/photos/` (from `C:\Users\uwpon\Desktop\9-val-des-cedres`).
