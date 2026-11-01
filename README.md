# Portfolio — Alber Ashraf Flagship Engineering Showcase

Flagship single-page engineering portfolio built with **Angular 21 Standalone Components**, **Angular Signals**, and **Tailwind CSS v4**, directly synchronized with the repository's Single Source of Truth (`Identity/docs/master-profile.json`) and canonical CV artifacts (`Identity/CV/`).

---

## Architectural Highlights

- **Framework & Reactivity**: Angular 21 with Standalone Components and fine-grained Angular Signals for reactive state, computed project filtering, and zero change-detection overhead.
- **Design System ("Tactile Dark Engineering")**:
  - Palette: `#07090E` (Deep Carbon canvas), `#10131C` (Glassmorphic Bento cards), `#6366F1` (Electric Indigo .NET Core), `#F43F5E` (Coral Rose Angular/Frontend), `#10B981` (Emerald Cloud/Data).
  - Custom directives:
    - `[appSpotlightTilt]`: Real-time cursor coordinate tracking with dynamic border illumination and subtle 3D perspective tilt.
    - `[appScrollReveal]`: IntersectionObserver engine for smooth staggered spring-physics reveals.
- **Interactive Components**:
  - **HUD Floating Glass Navbar**: Section scroll-spy, status telemetry, and modal triggers.
  - **Executive Portrait Frame**: Conic aura glow, blueprint overlay, fallback technical schematic, and live drag-and-drop photo uploader.
  - **Live Architecture Playground**: 4-layer interactive request flow beam with verified production code inspector.
  - **Technical Arsenal Matrix**: Cross-referencing 5-domain Bento Grid where clicking any skill pill highlights associated systems.
  - **System Architectures Matrix (9 Systems)**: 4-mode filter with dynamic card spotlight mode on `Frontend & UI Focus`.
  - **Project Cockpit Drawer**: In-page slide-over dossier with interactive SVG architecture blueprints and tabbed breakdown.
  - **Dual-CV In-Page Modal**: Embedded PDF previewer toggling between 1-Page Executive and 2-Page Detailed CVs with direct download.

---

## Commands

```bash
# Start local development server (http://localhost:4200)
npm start
# or: ng serve

# Sync latest master-profile.json & CV PDFs, then compile production bundle
npm run build
```

---

## Single Source of Truth (SSOT) Sync

The portfolio automatically pulls from `docs/master-profile.json` during build via `npm run sync:data` (hooked to `prebuild`). Any updates to profile data or projects immediately propagate across the portfolio, 1-page CV, and 2-page detailed CV.
