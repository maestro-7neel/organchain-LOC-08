# OrganChain Frontend — Style Guide

A single reference for colors, typography, spacing, and components used across the OrganChain frontend.

---

## 1. Design tokens

### 1.1 Colors

Use CSS variables from `:root` so themes and contrast stay consistent.

| Token | Hex | Usage |
|-------|-----|--------|
| `--white` | `#ffffff` | Cards, inputs (focused), primary surfaces |
| `--off-white` | `#f5f5f3` | Page background, pills, chip backgrounds |
| `--light-grey` | `#e8e8e5` | Borders, dividers, scrollbar track |
| `--mid-grey` | `#c0c0bc` | Secondary text, labels, disabled state |
| `--dark-grey` | `#4a4a46` | Body text, descriptions |
| `--charcoal` | `#1c1c1a` | Primary text, buttons (ghost) |
| `--black` | `#0a0a08` | Headings, primary buttons, nav logo |
| `--accent` | `#0a0a08` | Accent (same as black) |

**Semantic (status / portals)**

| Token | Hex | Usage |
|-------|-----|--------|
| `--green` | `#1a6b3c` | Success, Organ Tracking, positive |
| `--green-light` | `#e8f5ee` | Green backgrounds (badges, tags) |
| `--green-mid` | `#2d9e5f` | Pills, live indicators |
| `--amber` | `#b85c00` | NOTTO, warning, pending |
| `--amber-light` | `#fff3e0` | Amber backgrounds |
| `--cyan` | `#0066aa` | Hospital Donor, info, links |
| `--cyan-light` | `#e0f0ff` | Cyan backgrounds |
| `--rose` | `#c0392b` | Flags, errors, Hospital Receiver |
| `--rose-light` | `#fdecea` | Rose backgrounds |

### 1.2 Typography

| Token | Value | Use for |
|-------|--------|---------|
| `--font-display` | `'Bebas Neue', sans-serif` | Headlines, hero title, portal titles, stats |
| `--font-body` | `'DM Sans', sans-serif` | Body, labels, buttons, UI copy |
| `--font-mono` | `'JetBrains Mono', monospace` | IDs, hashes, codes, badges, timestamps |

**Font loading (in GlobalStyles):**

```html
Bebas Neue (display), DM Sans (300, 400, 500, 600), JetBrains Mono (400, 500, 700)
```

### 1.3 Border radius

| Token | Value |
|-------|--------|
| `--radius-sm` | 6px |
| `--radius-md` | 12px |
| `--radius-lg` | 20px |
| `--radius-xl` | 28px |

Use `--radius-sm` for buttons and inputs; `--radius-lg` / `--radius-xl` for cards and large panels.

### 1.4 Shadows

| Token | Value |
|-------|--------|
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,0.06)` |
| `--shadow-md` | `0 8px 32px rgba(0,0,0,0.10)` |
| `--shadow-lg` | `0 20px 60px rgba(0,0,0,0.14)` |

---

## 2. Type scale & usage

| Element | Font | Size | Weight | Notes |
|---------|------|------|--------|--------|
| Hero title | Display | clamp(52px, 7vw, 84px) | default | Line-height 0.95, letter-spacing 1px |
| Hero title (small) | Display | 0.72em of hero | 400 | “TRACK ORGANS. SAVE LIVES. JUSTIFY !” |
| Hero subtitle | Body | 15px | 400 | Line-height 1.7, --dark-grey |
| Section eyebrow | Body | 10px | 700 | Uppercase, letter-spacing 2–2.5px, --mid-grey |
| Section title | Display | clamp(32px, 4vw, 48px) | default | Portals; letter-spacing 0.5px |
| Portal page title | Display | clamp(40px, 6vw, 72px) | default | Line-height 0.95 |
| Panel title | Display | 20px | default | Letter-spacing 0.5px |
| Portal card name | Display | 26px | default | Letter-spacing 0.5px |
| Body / description | Body | 13–15px | 400 | --dark-grey or --charcoal, line-height 1.6–1.7 |
| Nav link | Body | 14px | 500 | --dark-grey, hover --black |
| Label / form label | Body | 11px | 600 | Uppercase, letter-spacing 1px, --dark-grey |
| Table header | Mono | 10px | - | Uppercase, letter-spacing 1.5px, --mid-grey |
| Table cell | Body | 13px | - | --charcoal |
| Badge | Mono | 10px | 700 | Pills, status |
| Stat value | Display | 28–52px | default | Hero stats and portal stat cards |
| Mono / hash | Mono | 10–11px | - | IDs, hashes; --mid-grey or --dark-grey |

---

## 3. Spacing & layout

### 3.1 Common spacing

- **Nav height:** 64px  
- **Page padding (desktop):** 64px horizontal; 48–80px vertical for body content  
- **Section padding:** e.g. portals 80px 64px; portal body 48px 64px 80px  
- **Gap between elements:** 8px, 12px, 16px, 20px, 24px, 28px, 32px, 48px  
- **Form:** Row gap 16px; label–input gap 6px; form-actions gap 12px  

### 3.2 Grid

- **Landing hero:** 2 columns `1fr 1fr`  
- **Portals grid:** 2 columns, gap 20px  
- **Portal stat row:** 4 columns, gap 16px  
- **Form row:** 2 columns, gap 16px  
- **Panel grid (2-col):** 1fr 1fr, gap 20px  

### 3.3 Breakpoint

- **Max-width 900px:** Single column; nav links hidden; padding 24px; portal-stat-row 2 columns; panel grids 1 column  

---

## 4. Components

### 4.1 Buttons

- **Primary (solid):** `btn-solid` — background `--black`, color `--white`, padding 8px 20px, font 13px weight 600, `--radius-sm`. Hover: slight lift, `--shadow-md`.  
- **With icon:** Add `btn-icon`; use `portals-nav-icon` for the icon (e.g. ▦).  
- **Ghost:** `btn-ghost` — transparent, border 1.5px `--charcoal`. Hover: fill `--charcoal`, text white.  
- **CTA:** `btn-cta` — 16px 32px padding, 15px weight 600; hover lift + scale.  
- **Panel primary:** `btn-action` — 12px 28px, 14px weight 600; hover lift.  
- **Panel secondary:** `btn-action-outline` — border only; hover border/color to charcoal/black.  
- **Flag actions:** `btn-approve` (solid black), `btn-reject` (rose light), `btn-info` (off-white border).  

All buttons: no outline, cursor pointer, font `--font-body`.

### 4.2 Form controls

- **Input/select/textarea:** `form-input` — border 1.5px `--light-grey`, background `--off-white`, padding 11px 14px, 13.5px, `--radius-sm`. Focus: border `--charcoal`, light box-shadow, background `--white`.  
- **Label:** `form-label` — 11px, 600, uppercase, letter-spacing 1px.  
- **Layout:** `form-row` (2 columns), `form-group`, `form-group.full` (span 2).  

### 4.3 Cards & panels

- **Portal card:** `portal-card` + `.green` / `.amber` / `.cyan` / `.rose` — off-white bg, 1.5px border, `--radius-xl`, padding 36px; hover lift, shadow, colored overlay.  
- **Panel:** `panel` — white bg, 1.5px border, `--radius-lg`, padding 28px.  
- **Stat card:** `pstat` — white, border, `--radius-lg`, padding 24px; optional `pstat-accent` bar (2px).  
- **Flag card:** `flag-card` — white, left border 4px `--rose`.  

### 4.4 Badges & tags

- **Badge:** `badge` + `badge-green` | `badge-amber` | `badge-cyan` | `badge-rose` | `badge-grey` — 10px mono 700, padding 3px 10px, pill radius.  
- **Portal tag:** `portal-tag` + color class — 11px, 500, 4px 10px, same semantic colors.  

### 4.5 Navigation

- **Bar:** `nav` — fixed, height 64px, padding 0 40px, backdrop blur, border-bottom.  
- **Logo:** `nav-logo` + `nav-logo-icon` — Display 22px, icon 32×32, `--radius-md`.  
- **Links:** `nav-link` — 14px 500, gap 32px.  
- **Actions:** `nav-actions` — flex gap 12px.  

### 4.6 Tabs

- **Container:** `tab-bar` — off-white, border, `--radius-sm`, padding 4px.  
- **Tab:** `tab-btn`; active: `tab-btn.active` — white bg, shadow.  

### 4.7 Tables

- **Table:** `data-table` — full width, collapsed borders.  
- **Header:** Mono 10px, uppercase, letter-spacing 1.5px, `--mid-grey`, bottom border.  
- **Cell:** 12px padding, 13px, bottom border; row hover `--off-white`.  
- **Mono cell:** `mono`; hash: `hash`.  

### 4.8 Toast

- **Container:** `toast` — fixed bottom-right, black bg, white text, padding 14px 22px, `--radius-md`, shadow; show with `.show`.  
- **Icon:** `toast-icon` (e.g. ✓).  

### 4.9 Other

- **Pill (hero):** `hero-pill` — off-white, border, 20px radius, 11px uppercase; `hero-pill-dot` for status (e.g. pulse).  
- **Live chip:** `portal-live-chip` — pill with border; `live-dot-green` for status dot.  
- **Back link:** `portal-back` — 12px 600 uppercase, `--mid-grey`, hover black.  
- **Footer:** `footer` — mono 11px, `--mid-grey`, top border, padding 32px 64px.  

---

## 5. Animation

- **fadeUp:** opacity 0→1, translateY 24px→0; 0.7s cubic-bezier(0.16, 1, 0.3, 1).  
- **fade-up-1 … fade-up-6:** animation-delay 0.1s–0.6s.  
- **pulse:** opacity and scale; used for status dots.  
- **float / floatSlow:** subtle vertical + rotation for decorative elements.  
- **Easing:** cubic-bezier(0.34, 1.56, 0.64, 1) for CTAs and toasts.  

Use `fade-up` + delay classes for staggered section content.

---

## 6. Accessibility & behaviour

- **Focus:** Form inputs use border and box-shadow on focus (no outline removal without a visible focus style).  
- **Scroll:** `html { scroll-behavior: smooth; }`.  
- **Scrollbar:** 6px width, `--light-grey` track, `--mid-grey` thumb.  
- **Body:** `--font-body`, background `--off-white`, color `--charcoal`, antialiased.  

---

## 7. File reference

- **Global styles:** All design tokens and component classes are defined in `src/App.js` inside the `GlobalStyles` component (injected `<style>` tag).  
- **Usage:** Use the class names and CSS variables from this guide; avoid hardcoding hex or pixel values that already exist as tokens.  

---

*OrganChain · Style guide v1 · Aligned with current frontend (App.js GlobalStyles).*
