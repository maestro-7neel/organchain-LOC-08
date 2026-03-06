import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   GLOBAL STYLES injected as a <style> tag
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --white: #ffffff;
      --off-white: #f5f5f3;
      --light-grey: #e8e8e5;
      --mid-grey: #c0c0bc;
      --dark-grey: #4a4a46;
      --charcoal: #1c1c1a;
      --black: #0a0a08;
      --accent: #0a0a08;
      --green: #1a6b3c;
      --green-light: #e8f5ee;
      --green-mid: #2d9e5f;
      --amber: #b85c00;
      --amber-light: #fff3e0;
      --cyan: #3cdef4;
      --cyan-light: #d4f7fc;
      --rose: #c0392b;
      --rose-light: #fdecea;
      --font-display: 'Bebas Neue', sans-serif;
      --font-body: 'DM Sans', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --radius-sm: 6px;
      --radius-md: 12px;
      --radius-lg: 20px;
      --radius-xl: 28px;
      --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
      --shadow-md: 0 8px 32px rgba(0,0,0,0.10);
      --shadow-lg: 0 20px 60px rgba(0,0,0,0.14);
      --mosaic-blue: rgba(220,235,250,0.22);
    }

    /* Unified white dotted background — same across entire site */
    .bg-dots {
      background-color: #f8fafc;
      background-image: radial-gradient(circle at 1px 1px, rgba(26,107,60,0.08) 1.5px, transparent 0);
      background-size: 32px 32px;
    }

    html { scroll-behavior: smooth; }
    body { font-family: var(--font-body); background: var(--off-white); color: var(--charcoal); -webkit-font-smoothing: antialiased; }

    /* ── Scrollbar ── */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--light-grey); }
    ::-webkit-scrollbar-thumb { background: var(--mid-grey); border-radius: 3px; }

    /* ── Animations ── */
    @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes pulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.5;transform:scale(0.8);} }
    @keyframes float { 0%,100%{transform:translateY(0) rotate(-3deg);} 50%{transform:translateY(-18px) rotate(-3deg);} }
    @keyframes floatSlow { 0%,100%{transform:translateY(0) rotate(4deg);} 50%{transform:translateY(-12px) rotate(4deg);} }
    @keyframes shimmer { 0%{background-position:-400px 0;} 100%{background-position:400px 0;} }
    @keyframes spin { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
    @keyframes slideIn { from{opacity:0;transform:translateX(-20px);} to{opacity:1;transform:translateX(0);} }
    @keyframes countUp { from{opacity:0;transform:translateY(10px);} to{opacity:1;transform:translateY(0);} }

    .fade-up { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }
    .fade-up-1 { animation-delay: 0.1s; }
    .fade-up-2 { animation-delay: 0.2s; }
    .fade-up-3 { animation-delay: 0.3s; }
    .fade-up-4 { animation-delay: 0.4s; }
    .fade-up-5 { animation-delay: 0.5s; }
    .fade-up-6 { animation-delay: 0.6s; }

    /* ── Button base ── */
    button { cursor: pointer; border: none; outline: none; font-family: var(--font-body); }

    /* ── Link reset ── */
    a { text-decoration: none; color: inherit; }

    /* ── Nav ── */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      background: var(--black); backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255,255,255,0.12);
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 40px; height: 64px;
    }
    .nav-logo { display: flex; align-items: center; gap: 10px; font-family: var(--font-display); font-size: 22px; letter-spacing: 1px; color: var(--white); cursor: pointer; }
    .nav-logo-icon { width: 32px; height: 32px; background: rgba(255,255,255,0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
    .nav-links { display: flex; align-items: center; gap: 32px; }
    .nav-link { font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.8); transition: color 0.2s; cursor: pointer; }
    .nav-link:hover { color: var(--white); }
    .nav-actions { display: flex; align-items: center; gap: 12px; }
    .nav .btn-ghost { border-color: rgba(255,255,255,0.5); color: var(--white); }
    .nav .btn-ghost:hover { background: var(--white); color: var(--black); }
    .btn-ghost { padding: 8px 20px; background: transparent; border: 1.5px solid var(--charcoal); border-radius: var(--radius-sm); font-size: 13px; font-weight: 600; color: var(--charcoal); transition: all 0.2s; }
    .btn-ghost:hover { background: var(--charcoal); color: var(--white); }
    .nav .btn-solid { background: var(--white); color: var(--black); }
    .nav .btn-solid:hover { background: rgba(255,255,255,0.9); color: var(--black); transform: translateY(-1px); box-shadow: var(--shadow-md); }
    .btn-solid { padding: 8px 20px; background: var(--black); border-radius: var(--radius-sm); font-size: 13px; font-weight: 600; color: var(--white); transition: all 0.2s; }
    .btn-solid:hover { background: var(--charcoal); transform: translateY(-1px); box-shadow: var(--shadow-md); }
    .btn-solid.btn-icon { display: inline-flex; align-items: center; gap: 8px; }
    .portals-nav-icon { font-size: 16px; line-height: 1; opacity: 0.95; }

    /* ── LANDING ── */
    .landing { min-height: 100vh; padding-top: 64px; }
    .landing-hero { display: grid; grid-template-columns: 1.4fr 1fr; min-height: calc(100vh - 64px); border-bottom: 1px solid var(--light-grey); position: relative; }

    /* Left panel */
    .hero-left { padding: 64px 64px 64px 80px; display: flex; flex-direction: column; justify-content: center; position: relative; }
    .hero-pill { display: inline-flex; align-items: center; gap: 8px; background: var(--off-white); border: 1px solid var(--light-grey); border-radius: 20px; padding: 5px 12px 5px 5px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--dark-grey); margin-bottom: 28px; width: fit-content; }
    .hero-pill-dot { width: 6px; height: 6px; background: var(--green-mid); border-radius: 50%; animation: pulse 2s infinite; }
    .hero-title { font-family: var(--font-display); font-size: clamp(52px, 8vw, 96px); line-height: 0.9; letter-spacing: 0.5px; color: var(--black); margin-bottom: 24px; text-balance: balance; }
    .hero-title-inline { display: flex; align-items: baseline; flex-wrap: wrap; gap: 0 0.25em; }
    .hero-title-lines { display: flex; flex-direction: column; gap: 0.05em; }
    .hero-title-sm { font-size: 0.72em; font-weight: 400; }
    .hero-sub { font-size: 16px; font-weight: 400; color: var(--dark-grey); line-height: 1.75; max-width: 580px; margin-bottom: 48px; }
    .btn-cta { display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px; background: var(--black); color: var(--white); border-radius: var(--radius-sm); font-size: 15px; font-weight: 600; transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1); width: fit-content; }
    .btn-cta:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 12px 40px rgba(0,0,0,0.2); }
    /* Value Proposition Bridge Grid */
    .hero-value-bridge { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 32px; margin: 48px 0 48px 0; }
    .value-prop-item { display: flex; flex-direction: column; gap: 12px; }
    .value-prop-header { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: var(--black); }
    .value-prop-text { font-size: 13px; color: var(--dark-grey); line-height: 1.6; }

    /* Connecting path SVG */
    .hero-connector { display: none; }

    /* Hero organ icons */
    .hero-organ-icon { display: flex; flex-direction: column; align-items: center; gap: 6px; font-size: 28px; }
    .hero-organ-icon span:last-child { font-size: 10px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--mid-grey); }
    .trusted-row { margin-top: 48px; }
    .trusted-label { font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--mid-grey); margin-bottom: 14px; }
    .trusted-logos { display: flex; align-items: center; gap: 28px; }
    .trusted-logo { font-family: var(--font-mono); font-size: 11px; font-weight: 700; letter-spacing: 1px; color: var(--mid-grey); }

    /* Center panel — image */
    .hero-center { padding: 48px; display: flex; align-items: center; justify-content: center; background: radial-gradient(ellipse 80% 70% at 50% 50%, rgba(26,107,60,0.06) 0%, transparent 70%); position: relative; transform: translateY(-70px) }
    .hero-visual { background: var(--white); border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-lg), 0 0 0 1px var(--light-grey), 0 0 0 4px rgba(26,107,60,0.08); }
    .hero-visual img { display: block; width: 100%; max-width: 340px; height: auto; }

    /* Right panel */
    .hero-right { padding: 64px 48px 64px 48px; display: flex; flex-direction: column; justify-content: center; border-right: 1px solid var(--light-grey); }
    /* Fourth column — value items vertically, next to the 3 sections */
    .hero-values { padding: 48px 28px 48px 24px; display: flex; flex-direction: column; justify-content: center; gap: 20px; background: var(--off-white); }
    .hero-values .value-strip-item { max-width: 100%; margin: 0; }
    .hero-tagline { font-size: 14px; font-weight: 400; color: var(--dark-grey); line-height: 1.7; max-width: 280px; margin-bottom: 24px; }
    .play-btn { display: flex; align-items: center; gap: 14px; margin-bottom: 48px; cursor: pointer; }
    .play-icon { width: 44px; height: 44px; background: var(--black); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-size: 14px; color: var(--white); transition: all 0.2s; flex-shrink: 0; }
    .play-btn:hover .play-icon { transform: scale(1.05); box-shadow: var(--shadow-md); }
    .play-label { font-size: 14px; font-weight: 600; color: var(--black); }
    .stats-divider { width: 40px; height: 2px; background: var(--light-grey); margin-bottom: 32px; }
    .stats-label-top { font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--mid-grey); margin-bottom: 20px; }
    .stat-big { margin-bottom: 24px; }
    .stat-big-num { font-family: var(--font-display); font-size: 52px; color: var(--black); line-height: 1; }
    .stat-big-num span { font-family: var(--font-body); font-size: 14px; font-weight: 400; color: var(--mid-grey); margin-left: 4px; }
    .stat-big-label { font-size: 13px; color: var(--dark-grey); margin-top: 4px; }
    .reviews-row { display: flex; align-items: center; gap: 12px; margin-top: 8px; }
    .reviews-label { font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--mid-grey); }
    .reviews-label span { color: var(--black); text-decoration: underline; }
    .avatar-stack { display: flex; }
    .avatar { width: 28px; height: 28px; border-radius: 50%; border: 2px solid var(--white); margin-left: -8px; font-size: 14px; display: flex; align-items: center; justify-content: center; background: var(--light-grey); }
    .avatar:first-child { margin-left: 0; }

    /* ── PORTALS SECTION ── */
    .portals-section { padding: 80px 64px; position: relative; }
    .portals-section::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, var(--green) 0%, var(--cyan) 50%, var(--rose) 100%); opacity: 0.6; }
    .portals-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 48px; }
    .portals-title-block {}
    .portals-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: var(--mid-grey); margin-bottom: 12px; }
    .portals-title { font-family: var(--font-display); font-size: clamp(32px, 4vw, 48px); color: var(--black); letter-spacing: 0.5px; }
    .portals-sub { font-size: 14px; color: var(--dark-grey); max-width: 320px; line-height: 1.6; }

    .portals-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

    .portal-card {
      background: var(--white); border: 1.5px solid var(--light-grey);
      border-radius: var(--radius-xl); padding: 36px; cursor: pointer;
      transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
      position: relative; overflow: hidden;
      display: flex; flex-direction: column; gap: 16px;
    }
    .portal-card::before { content:''; position:absolute; inset:0; opacity:0; transition:opacity 0.3s; }
    .portal-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); border-color: transparent; }

    .portal-card.green::before { background: linear-gradient(135deg, rgba(26,107,60,0.04), rgba(45,158,95,0.08)); }
    .portal-card.amber::before { background: linear-gradient(135deg, rgba(184,92,0,0.04), rgba(245,158,11,0.08)); }
    .portal-card.cyan::before { background: linear-gradient(135deg, rgba(0,102,170,0.04), rgba(0,180,200,0.08)); }
    .portal-card.rose::before { background: linear-gradient(135deg, rgba(192,57,43,0.04), rgba(244,63,94,0.08)); }

    .portal-card:hover::before { opacity:1; }
    .portal-card.green:hover { border-color: rgba(26,107,60,0.2); }
    .portal-card.amber:hover { border-color: rgba(184,92,0,0.2); }
    .portal-card.cyan:hover { border-color: rgba(0,102,170,0.2); }
    .portal-card.rose:hover { border-color: rgba(192,57,43,0.2); }

    .portal-icon-wrap { width: 52px; height: 52px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
    .portal-icon-wrap.green { background: var(--green-light); }
    .portal-icon-wrap.amber { background: var(--amber-light); }
    .portal-icon-wrap.cyan { background: var(--cyan-light); }
    .portal-icon-wrap.rose { background: var(--rose-light); }

    .portal-top { display: flex; align-items: center; justify-content: space-between; }
    .portal-arrow { width: 32px; height: 32px; border-radius: 50%; border: 1.5px solid var(--light-grey); display: flex; align-items: center; justify-content: center; font-size: 14px; transition: all 0.3s; color: var(--mid-grey); }
    .portal-card:hover .portal-arrow { background: var(--black); border-color: var(--black); color: var(--white); transform: rotate(45deg); }

    .portal-name { font-family: var(--font-display); font-size: 26px; letter-spacing: 0.5px; color: var(--black); }
    .portal-desc { font-size: 13.5px; color: var(--dark-grey); line-height: 1.65; }
    .portal-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
    .portal-tag { font-size: 11px; font-weight: 500; padding: 4px 10px; border-radius: 20px; font-family: var(--font-mono); }
    .portal-tag.green { background: var(--green-light); color: var(--green); }
    .portal-tag.amber { background: var(--amber-light); color: var(--amber); }
    .portal-tag.cyan { background: var(--cyan-light); color: var(--cyan); }
    .portal-tag.rose { background: var(--rose-light); color: var(--rose); }

    /* ── STATS TICKER ── */
    .stats-band { background: var(--black); padding: 32px 64px 28px; display: flex; flex-direction: column; align-items: center; gap: 20px; overflow: hidden; position: relative; }
    .stats-band::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.02) 50%, transparent 100%); pointer-events: none; }
    .stats-band-heading { font-size: 11px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: rgba(255,255,255,0.6); position: relative; z-index: 1; }
    .stats-band-inner { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 40px; position: relative; z-index: 1; }
    .stats-band-item { display: flex; align-items: center; gap: 14px; white-space: nowrap; }
    .stats-band-icon { width: 40px; height: 40px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; background: rgba(255,255,255,0.1); }
    .stats-band-num { font-family: var(--font-display); font-size: 28px; color: var(--white); letter-spacing: 1px; }
    .stats-band-label { font-size: 12px; color: rgba(255,255,255,0.5); font-weight: 500; }
    .stats-band-sep { width: 1px; height: 32px; background: rgba(255,255,255,0.1); }

    /* ── ABOUT SECTION ── */
    .about-section { padding: 80px 64px; text-align: center; border-bottom: 1px solid var(--light-grey); }
    .about-content { max-width: 640px; margin: 0 auto; }
    .about-title { font-family: var(--font-display); font-size: clamp(28px, 4vw, 42px); letter-spacing: 0.5px; color: var(--black); line-height: 1.2; margin-bottom: 16px; }
    .about-sub { font-size: 18px; font-weight: 500; color: var(--dark-grey); line-height: 1.6; }

    /* ── VALUE STRIP ── */
    .value-strip { display: flex; align-items: center; justify-content: center; gap: 48px; flex-wrap: wrap; padding: 32px 64px; border-bottom: 1px solid var(--light-grey); }
    .value-strip-item { display: flex; align-items: center; gap: 14px; max-width: 200px; }
    .value-strip-icon { width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; background: var(--green-light); color: var(--green); }
    .value-strip-text { font-size: 13px; font-weight: 500; color: var(--dark-grey); line-height: 1.4; }

    /* ── PORTAL PAGE SHARED ── */
    .portal-page { min-height: 100vh; padding-top: 64px; }
    .portal-hero { padding: 72px 64px 56px; border-bottom: 1px solid var(--light-grey); display: grid; grid-template-columns: 1fr auto 1fr; gap: 40px; align-items: center; position: relative; }
    .portal-hero-left { grid-column: 2; text-align: center; display: flex; flex-direction: column; align-items: center; }
    .portal-hero > *:not(.portal-hero-left) { grid-column: 1; justify-self: start; align-self: start; }
    .portal-hero-back { grid-column: 1; justify-self: start; align-self: start; }
    .portal-hero-back .portal-back { margin-bottom: 0; }
    .portal-back { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--mid-grey); margin-bottom: 24px; cursor: pointer; transition: color 0.2s; }
    .portal-back:hover { color: var(--black); }
    .portal-hero-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: var(--mid-grey); margin-bottom: 12px; }
    .portal-hero-title { font-family: var(--font-display); font-size: clamp(40px, 6vw, 72px); color: var(--black); letter-spacing: 0.5px; line-height: 0.95; margin-bottom: 16px; }
    .portal-hero-sub { font-size: 15px; color: var(--dark-grey); max-width: 500px; line-height: 1.7; margin-left: auto; margin-right: auto; }
    .portal-live-chip { display: flex; align-items: center; gap: 8px; background: var(--off-white); border: 1px solid var(--light-grey); border-radius: 20px; padding: 8px 16px; font-family: var(--font-mono); font-size: 11px; color: var(--dark-grey); white-space: nowrap; }
    .live-dot-green { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; animation: pulse 2s infinite; }

    .portal-body { padding: 48px 64px 80px; }

    /* Cards */
    .portal-stat-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 40px; }
    .pstat { background: var(--white); border: 1.5px solid var(--light-grey); border-radius: var(--radius-lg); padding: 24px; }
    .pstat-label { font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--mid-grey); margin-bottom: 10px; }
    .pstat-val { font-family: var(--font-display); font-size: 36px; color: var(--black); line-height: 1; }
    .pstat-sub { font-size: 12px; color: var(--dark-grey); margin-top: 6px; }
    .pstat-accent { width: 100%; height: 2px; border-radius: 2px; margin-bottom: 16px; }

    .panel-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
    .panel-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 20px; }
    .panel { background: var(--white); border: 1.5px solid var(--light-grey); border-radius: var(--radius-lg); padding: 28px; }
    .panel-full { grid-column: span 2; }
    .panel-title { font-family: var(--font-display); font-size: 20px; letter-spacing: 0.5px; color: var(--black); margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; }
    .panel-title-sub { font-size: 12px; font-family: var(--font-mono); color: var(--mid-grey); font-weight: 400; }

    /* Table */
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--mid-grey); padding: 8px 12px; text-align: left; border-bottom: 1.5px solid var(--light-grey); white-space: nowrap; }
    .data-table td { padding: 12px; font-size: 13px; color: var(--charcoal); border-bottom: 1px solid var(--off-white); vertical-align: middle; }
    .data-table tr:last-child td { border-bottom: none; }
    .data-table tr:hover td { background: var(--off-white); }

    .badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-family: var(--font-mono); font-size: 10px; font-weight: 700; }
    .badge-green { background: var(--green-light); color: var(--green); }
    .badge-amber { background: var(--amber-light); color: var(--amber); }
    .badge-cyan { background: var(--cyan-light); color: var(--cyan); }
    .badge-rose { background: var(--rose-light); color: var(--rose); }
    .badge-grey { background: var(--off-white); color: var(--dark-grey); border: 1px solid var(--light-grey); }

    .mono { font-family: var(--font-mono); font-size: 11px; color: var(--mid-grey); }
    .hash { font-family: var(--font-mono); font-size: 10px; color: var(--dark-grey); opacity: 0.7; }

    /* Form */
    .form-section { display: flex; flex-direction: column; gap: 16px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .form-group { display: flex; flex-direction: column; gap: 6px; }
    .form-group.full { grid-column: span 2; }
    .form-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--dark-grey); }
    .form-input { padding: 11px 14px; border: 1.5px solid var(--light-grey); border-radius: var(--radius-sm); background: var(--off-white); font-family: var(--font-body); font-size: 13.5px; color: var(--charcoal); outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
    .form-input:focus { border-color: var(--charcoal); box-shadow: 0 0 0 3px rgba(0,0,0,0.05); background: var(--white); }
    .form-select { appearance: none; }
    .form-textarea { resize: vertical; min-height: 88px; }
    .form-actions { display: flex; gap: 12px; margin-top: 8px; }
    .btn-action { padding: 12px 28px; background: var(--black); color: var(--white); border-radius: var(--radius-sm); font-size: 14px; font-weight: 600; transition: all 0.2s; }
    .btn-action:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
    .btn-action-outline { padding: 12px 28px; background: transparent; border: 1.5px solid var(--light-grey); color: var(--dark-grey); border-radius: var(--radius-sm); font-size: 14px; font-weight: 600; transition: all 0.2s; }
    .btn-action-outline:hover { border-color: var(--charcoal); color: var(--black); }

    /* Timeline */
    .timeline { display: flex; flex-direction: column; }
    .tl-item { display: flex; gap: 16px; padding-bottom: 24px; }
    .tl-item:last-child { padding-bottom: 0; }
    .tl-left { display: flex; flex-direction: column; align-items: center; width: 36px; flex-shrink: 0; }
    .tl-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
    .tl-line { width: 1.5px; flex: 1; background: var(--light-grey); margin-top: 6px; }
    .tl-item:last-child .tl-line { display: none; }
    .tl-event { font-size: 13.5px; color: var(--charcoal); margin-bottom: 4px; font-weight: 500; }
    .tl-meta { font-family: var(--font-mono); font-size: 10px; color: var(--mid-grey); }

    /* Gauge */
    .gauge-item { display: flex; align-items: center; gap: 14px; padding: 14px; background: var(--off-white); border-radius: var(--radius-md); margin-bottom: 10px; border: 1px solid var(--light-grey); }
    .gauge-item:last-child { margin-bottom: 0; }
    .gauge-info { flex: 1; }
    .gauge-name { font-size: 13px; font-weight: 500; color: var(--charcoal); margin-bottom: 6px; }
    .gauge-bar-bg { height: 5px; background: var(--light-grey); border-radius: 3px; overflow: hidden; margin-bottom: 4px; }
    .gauge-fill { height: 100%; border-radius: 3px; }
    .gauge-score { font-family: var(--font-mono); font-size: 11px; }

    /* Score bars */
    .score-row { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
    .score-row:last-child { margin-bottom: 0; }
    .score-label { font-size: 12.5px; color: var(--charcoal); flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .score-bar-bg { flex: 2; height: 5px; background: var(--light-grey); border-radius: 3px; overflow: hidden; }
    .score-bar-fill { height: 100%; border-radius: 3px; transition: width 1s ease; }
    .score-num { font-family: var(--font-mono); font-size: 11px; width: 44px; text-align: right; }

    /* QR Tracker */
    .qr-entry { max-width: 540px; margin: 0 auto; text-align: center; padding: 80px 20px; }
    .qr-icon { font-size: 56px; margin-bottom: 24px; display: block; }
    .qr-title { font-family: var(--font-display); font-size: 48px; color: var(--black); margin-bottom: 12px; }
    .qr-sub { font-size: 15px; color: var(--dark-grey); line-height: 1.7; margin-bottom: 36px; }
    .qr-input-row { display: flex; gap: 10px; }
    .qr-input { flex: 1; padding: 14px 18px; border: 1.5px solid var(--light-grey); border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 15px; color: var(--charcoal); outline: none; background: var(--white); letter-spacing: 3px; text-transform: uppercase; transition: border-color 0.2s; }
    .qr-input:focus { border-color: var(--charcoal); }
    .qr-submit { padding: 14px 28px; background: var(--black); color: var(--white); border-radius: var(--radius-sm); font-size: 14px; font-weight: 700; white-space: nowrap; transition: all 0.2s; }
    .qr-submit:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
    .qr-demo { margin-top: 14px; font-size: 13px; color: var(--mid-grey); cursor: pointer; }
    .qr-demo span { color: var(--black); text-decoration: underline; }
    .qr-privacy { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 24px; font-size: 12px; color: var(--mid-grey); }

    /* Journey view */
    .journey-donor-card { background: var(--black); border-radius: var(--radius-xl); padding: 32px; color: var(--white); text-align: center; margin-bottom: 28px; position: relative; overflow: hidden; }
    .journey-donor-card::before { content:''; position:absolute; inset:0; background:radial-gradient(circle at 50% 100%, rgba(34,211,165,0.15) 0%, transparent 60%); pointer-events:none; }
    .journey-donor-name { font-family: var(--font-display); font-size: 36px; letter-spacing: 1px; color: var(--white); margin-bottom: 8px; }
    .journey-donor-id { font-family: var(--font-mono); font-size: 12px; color: rgba(255,255,255,0.5); margin-bottom: 16px; }
    .journey-organ-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-bottom: 16px; }
    .journey-chip { display: inline-flex; align-items: center; gap: 5px; padding: 5px 12px; border-radius: 20px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); font-size: 12px; color: rgba(255,255,255,0.8); }
    .journey-quote { font-size: 13px; color: rgba(255,255,255,0.5); font-style: italic; }
    .organ-progress-card { background: var(--white); border: 1.5px solid var(--light-grey); border-radius: var(--radius-lg); padding: 22px; margin-bottom: 14px; }
    .op-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
    .op-name { display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 600; color: var(--black); }
    .progress-nodes { display: flex; align-items: center; gap: 0; }
    .pnode { display: flex; flex-direction: column; align-items: center; gap: 5px; flex: 1; }
    .pnode-dot { width: 12px; height: 12px; border-radius: 50%; }
    .pnode-dot.done { background: var(--green); }
    .pnode-dot.active { background: #0066aa; animation: pulse 1.5s infinite; }
    .pnode-dot.wait { background: var(--light-grey); border: 1.5px solid var(--mid-grey); }
    .pnode-label { font-family: var(--font-mono); font-size: 9px; color: var(--mid-grey); text-align: center; }
    .pline { flex: 1; height: 1.5px; margin-bottom: 18px; }
    .pline.done { background: var(--green); }
    .pline.wait { background: var(--light-grey); }

    /* Flag cards */
    .flag-card { background: var(--white); border: 1.5px solid var(--light-grey); border-radius: var(--radius-lg); padding: 24px; margin-bottom: 14px; border-left: 4px solid var(--rose); }
    .flag-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; }
    .flag-id { font-family: var(--font-mono); font-size: 12px; color: var(--rose); font-weight: 700; }
    .flag-time { font-family: var(--font-mono); font-size: 10px; color: var(--mid-grey); }
    .flag-desc { font-size: 13px; color: var(--dark-grey); line-height: 1.6; margin-bottom: 12px; }
    .flag-score-pill { display: inline-flex; align-items: center; gap: 6px; background: var(--rose-light); border: 1px solid rgba(192,57,43,0.2); border-radius: var(--radius-sm); padding: 5px 12px; font-family: var(--font-mono); font-size: 11px; color: var(--rose); margin-bottom: 14px; }
    .flag-actions { display: flex; gap: 8px; flex-wrap: wrap; }
    .btn-reject { padding: 8px 16px; background: var(--rose-light); border: 1px solid rgba(192,57,43,0.3); border-radius: var(--radius-sm); color: var(--rose); font-size: 12px; font-weight: 600; transition: all 0.2s; }
    .btn-approve { padding: 8px 16px; background: var(--black); color: var(--white); border-radius: var(--radius-sm); font-size: 12px; font-weight: 600; transition: all 0.2s; }
    .btn-info { padding: 8px 16px; background: var(--off-white); border: 1.5px solid var(--light-grey); border-radius: var(--radius-sm); color: var(--dark-grey); font-size: 12px; font-weight: 600; transition: all 0.2s; }
    .btn-approve:hover,.btn-reject:hover,.btn-info:hover { transform: translateY(-1px); }

    /* Notification */
    .toast { position: fixed; bottom: 32px; right: 32px; background: var(--black); color: var(--white); padding: 14px 22px; border-radius: var(--radius-md); font-size: 13.5px; z-index: 999; display: flex; align-items: center; gap: 10px; box-shadow: var(--shadow-lg); transform: translateY(100px); opacity: 0; transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1); max-width: 380px; }
    .toast.show { transform: translateY(0); opacity: 1; }
    .toast-icon { font-size: 18px; }

    /* Misc */
    .section-divider { height: 1px; background: var(--light-grey); margin: 0 64px; }
    .footer { padding: 32px 64px; border-top: 1px solid var(--light-grey); display: flex; align-items: center; justify-content: space-between; font-family: var(--font-mono); font-size: 11px; color: var(--mid-grey); }

    /* Tabs */
    .tab-bar { display: flex; gap: 4px; background: var(--off-white); border: 1.5px solid var(--light-grey); border-radius: var(--radius-sm); padding: 4px; width: fit-content; margin-bottom: 24px; }
    .tab-btn { padding: 8px 20px; border-radius: 4px; background: transparent; font-family: var(--font-body); font-size: 13px; font-weight: 500; color: var(--dark-grey); transition: all 0.2s; }
    .tab-btn.active { background: var(--white); color: var(--black); font-weight: 600; box-shadow: var(--shadow-sm); }

    @media (max-width: 900px) {
      .landing-hero { grid-template-columns: 1fr; }
      .hero-left { border-right: none; }
      .hero-center { border-right: none; }
      .hero-right { border-right: none; }
      .hero-values { border-top: 1px solid var(--light-grey); }
      .portals-grid { grid-template-columns: 1fr; }
      .portal-stat-row { grid-template-columns: 1fr 1fr; }
      .panel-grid-2 { grid-template-columns: 1fr; }
      .nav-links { display: none; }
      .portals-section, .portal-hero, .portal-body, .footer, .about-section { padding-left: 24px; padding-right: 24px; }
      .value-strip { padding: 24px 24px; gap: 24px; }
      .stats-band { padding: 24px 24px; gap: 16px; }
      .stats-band-inner { gap: 20px; }
      .stats-band-item { gap: 10px; }
      .stats-band-icon { width: 36px; height: 36px; font-size: 16px; }
    }
  `}</style>
);

/* ── Toast ── */
let toastTimer;
const Toast = ({ msg }) => (
  <div className={`toast ${msg ? "show" : ""}`}>
    <span className="toast-icon">✓</span>
    <span>{msg}</span>
  </div>
);

/* ── Shared Nav ── */
const scrollToPortals = (page, setPage) => {
  if (page !== "home") {
    setPage("home");
    setTimeout(() => document.getElementById("portals")?.scrollIntoView({ behavior: "smooth" }), 200);
  } else {
    document.getElementById("portals")?.scrollIntoView({ behavior: "smooth" });
  }
};

const scrollToAbout = (page, setPage) => {
  if (page !== "home") {
    setPage("home");
    setTimeout(() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), 200);
  } else {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  }
};

const scrollToStats = (page, setPage) => {
  if (page !== "home") {
    setPage("home");
    setTimeout(() => document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" }), 200);
  } else {
    document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" });
  }
};

const Nav = ({ page, setPage }) => (
  <nav className="nav">
    <div className="nav-logo" onClick={() => setPage("home")}>
      <div className="nav-logo-icon">🫀</div>
      ORGANCHAIN
    </div>
    <div className="nav-links">
      <span className="nav-link" onClick={() => scrollToAbout(page, setPage)} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && scrollToAbout(page, setPage)}>About Us</span>
      <span className="nav-link" onClick={() => scrollToStats(page, setPage)} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && scrollToStats(page, setPage)}>Statistics</span>
    </div>
    <div className="nav-actions">
      <button className="btn-solid btn-icon" onClick={() => scrollToPortals(page, setPage)} title="Portals" aria-label="Scroll to Portals">
        <span className="portals-nav-icon" aria-hidden>▦</span>
        <span>Portals</span>
      </button>
    </div>
  </nav>
);

/* ─────────────────────────────────────
   LANDING PAGE
───────────────────────────────────── */
const Landing = ({ setPage }) => (
  <div className="landing bg-dots">
    <div className="landing-hero">
      {/* LEFT — Extended Content */}
      <div className="hero-left">
        <div className="hero-pill fade-up">
          <div className="hero-pill-dot"></div>
          Blockchain-Verified Organ Chain
        </div>
        <h1 className="hero-title hero-title-lines fade-up fade-up-1">
          <span className="hero-title-sm">TRACK ORGANS.</span>
          <span className="hero-title-sm">SAVE LIVES.</span>
          <span className="hero-title-sm">JUSTIFY.</span>
        </h1>
        <p className="hero-sub fade-up fade-up-2">
          Every organ donation — from consent to transplant — permanently recorded on an immutable blockchain. No corruption. Full transparency for every stakeholder in India's organ ecosystem.
        </p>
        <button className="btn-cta fade-up fade-up-3" onClick={() => setPage("tracking")}>
          Track an Organ
          <span>→</span>
        </button>

        {/* Value Proposition Bridge */}
        <div className="hero-value-bridge fade-up fade-up-4">
          <div className="value-prop-item">
            <div className="value-prop-header">Immutable Ledger</div>
            <div className="value-prop-text">Every transaction sealed on Ethereum. Audit trails verified and permanent across the network.</div>
          </div>
          <div className="value-prop-item">
            <div className="value-prop-header">Real-time Matching</div>
            <div className="value-prop-text">AI-powered matching algorithm ensures organs reach the most compatible recipients instantly.</div>
          </div>
          <div className="value-prop-item">
            <div className="value-prop-header">Global Compliance</div>
            <div className="value-prop-text">NOTTO-aligned workflow. Full HIPAA & data sovereignty standards for patient privacy protection.</div>
          </div>
        </div>

        
        <div className="trusted-row fade-up fade-up-6">
          <div className="trusted-label">Trusted by</div>
          <div className="trusted-logos">
            <span className="trusted-logo">NOTTO</span>
            <span className="trusted-logo">AIIMS</span>
            <span className="trusted-logo">APOLLO</span>
            <span className="trusted-logo">MoHFW</span>
          </div>
        </div>
      </div>

      {/* RIGHT — Image */}
      <div className="hero-center">
        <div className="hero-visual" style={{ background: "var(--white)" }}>
          <img src="/heart-hands.png" alt="Hands cradling a heart — care and donation" />
        </div>
      </div>
    </div>

    {/* Total organ donation statistics — after landing hero */}
    <div id="stats" className="stats-band">
      <div className="stats-band-heading">Total organ donation statistics</div>
      <div className="stats-band-inner">
        {[
          ["~15K", "Transplants / year (India)", "🫀"],
          ["500K+", "Patients awaiting organs", "👥"],
          ["250+", "NOTTO-registered hospitals", "🏥"],
          ["~6K", "Deceased donors / year", "💚"],
          ["1 : 40", "Donor to need ratio", "📋"]
        ].map(([n, l, icon], i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {i > 0 && <div className="stats-band-sep"></div>}
            <div className="stats-band-item">
              <div className="stats-band-icon">{icon}</div>
              <div>
                <div className="stats-band-num">{n}</div>
                <div className="stats-band-label">{l}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Portals Grid */}
    <div id="portals" className="portals-section bg-dots">
      <div className="portals-header">
        <div className="portals-title-block">
          <div className="portals-eyebrow">Access Portals</div>
          <div className="portals-title">FOUR GATEWAYS.<br />ONE SYSTEM.</div>
        </div>
        <p className="portals-sub">Each stakeholder in the organ donation chain gets a purpose-built, privacy-respecting portal powered by blockchain verification.</p>
      </div>

      <div className="portals-grid">
        {[
          { key: "tracking", color: "green", icon: "📱", name: "ORGAN TRACKING", desc: "Donor families track their loved one's organ journey from consent to transplant using a unique QR code. Real-time, private, verified.", tags: ["QR Tracker", "Real-time", "Privacy-safe"] },
          { key: "notto", color: "amber", icon: "🏛️", name: "NOTTO PORTAL", desc: "Review flagged allocations, approve overrides, and view the audit trail for all registered hospitals.", tags: ["Flagged cases", "Multi-signature", "Audit log"] },
          { key: "hospital-donor", color: "cyan", icon: "🏥", name: "HOSPITAL DONOR", desc: "Hospital admins register donors, list available organs, log consent events, and monitor AI trust scores for every allocation.", tags: ["Register Donor", "AI Scores", "Audit Trail"] },
          { key: "hospital-receiver", color: "rose", icon: "💉", name: "HOSPITAL RECEIVER", desc: "Receiving hospitals manage incoming organ requests, confirm transplant outcomes, and access the full chain of custody for every organ.", tags: ["Incoming Organs", "Log Transplant", "Chain of Custody"] }
        ].map(p => (
          <div key={p.key} className={`portal-card ${p.color} fade-up`} onClick={() => setPage(p.key)}>
            <div className="portal-top">
              <div className={`portal-icon-wrap ${p.color}`}>{p.icon}</div>
              <div className="portal-arrow">↗</div>
            </div>
            <div className="portal-name">{p.name}</div>
            <div className="portal-desc">{p.desc}</div>
            <div className="portal-tags">
              {p.tags.map(t => <span key={t} className={`portal-tag ${p.color}`}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* About us — below portals */}
    <section id="about" className="about-section bg-dots">
      <div className="about-content">
        <h2 className="about-title">OrganChain — Redefining organ donation transparency.</h2>
        <p className="about-sub">Because every life deserves fairness.</p>
      </div>
    </section>

    <div className="footer bg-dots">
      <span>OrganChain v1.0 · LOC 8.0 · Team Vyaapak Gurus</span>
      <span>0x7f4a2c9e1b3d8f… · Sepolia Testnet</span>
      <span>Patient data never stored on-chain</span>
    </div>
  </div>
);

/* ─────────────────────────────────────
   ORGAN TRACKING PORTAL
───────────────────────────────────── */
const TrackingPortal = ({ setPage, showToast }) => {
  const [step, setStep] = useState("entry");
  const [code, setCode] = useState("");

  const startTracking = () => {
    if (!code.trim()) return;
    setStep("journey");
  };

  if (step === "entry") return (
    <div className="portal-page bg-dots">
      <div className="portal-hero bg-dots">
        <div className="portal-hero-back">
          <div className="portal-back" onClick={() => setPage("home")}>← Back to Home</div>
        </div>
        <div className="portal-hero-left">
          <div className="portal-hero-eyebrow">Donor Family Portal</div>
          <h1 className="portal-hero-title">ORGAN<br />TRACKING</h1>
          <p className="portal-hero-sub">Track your loved one's gift of life — from consent to transplant — in real time. Every step verified on the Ethereum blockchain.</p>
        </div>
        <div className="portal-live-chip"><div className="live-dot-green"></div>Live Chain Data · Sepolia</div>
      </div>
      <div className="portal-body">
        <div className="qr-entry">
          <span className="qr-icon">📱</span>
          <h2 className="qr-title">ENTER YOUR UNIQUE CODE</h2>
          <p className="qr-sub">Your unique organ tracking code was provided by the hospital at the time of donor registration.</p>
          <div className="qr-input-row">
            <input className="qr-input" value={code} onChange={e => setCode(e.target.value)} placeholder="XX-XXXX-XXXX" onKeyDown={e => e.key === "Enter" && startTracking()} />
            <button className="qr-submit" onClick={startTracking}>Track →</button>
          </div>
          <div className="qr-demo">Or <span onClick={() => { setCode("QR-4421-D001"); setTimeout(() => setStep("journey"), 100); }}>load demo journey</span></div>
          <div className="qr-privacy">🔒 Your personal data is never stored on-chain</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="portal-page bg-dots">
      <div className="portal-hero bg-dots">
        <div className="portal-hero-back">
          <div className="portal-back" onClick={() => setStep("entry")}>← Back</div>
        </div>
        <div className="portal-hero-left">
          <div className="portal-hero-eyebrow">Tracking Code: QR-4421-D001</div>
          <h1 className="portal-hero-title">DONOR<br />JOURNEY</h1>
          <p className="portal-hero-sub">Donor D-4421 · AIIMS New Delhi · Registered Dec 15, 2024</p>
        </div>
        <div className="portal-live-chip"><div className="live-dot-green"></div>Heart · In Transit</div>
      </div>
      <div className="portal-body">
        <div className="journey-donor-card fade-up">
          <div style={{ fontSize: 40, marginBottom: 12 }}>💚</div>
          <div className="journey-donor-id">Donor ID: D-4421 · Verified on Sepolia Testnet</div>
          <div className="journey-organ-chips">
            {["🫀 Heart", "🫁 Kidneys ×2", "👁️ Corneas ×2"].map(o => <span key={o} className="journey-chip">{o}</span>)}
          </div>
          <div className="journey-quote">"His generosity continues to give life. Each step is permanently recorded."</div>
        </div>

        <div className="panel-grid-2 fade-up">
          <div className="panel">
            <div className="panel-title">Overall Journey<span className="panel-title-sub">3 of 4 stages complete</span></div>
            <div className="timeline">
              {[
                { dot: "#22c55e", label: "Consent Recorded", meta: "Dec 15, 2024 · 11:30 AM · Block #8,241,060", done: true },
                { dot: "#22c55e", label: "Organs Listed & Matched", meta: "Dec 15, 2024 · 12:42 PM · Block #8,240,998", done: true },
                { dot: "#0066aa", label: "Transport & Dispatch — LIVE", meta: "Dec 15, 2024 · 1:51 PM · Heart in transit", done: false, active: true },
                { dot: "#c0c0bc", label: "Transplant Confirmed", meta: "Awaiting · Corneas already confirmed ✓", done: false },
              ].map((s, i) => (
                <div key={i} className="tl-item">
                  <div className="tl-left">
                    <div className="tl-dot" style={{ background: s.dot, boxShadow: s.active ? `0 0 10px ${s.dot}66` : "none", animation: s.active ? "pulse 1.5s infinite" : "none" }}></div>
                    <div className="tl-line"></div>
                  </div>
                  <div>
                    <div className="tl-event" style={{ color: s.active ? "#0066aa" : s.done ? "#1a6b3c" : "#4a4a46" }}>{s.label}</div>
                    <div className="tl-meta">{s.meta}</div>
                    {s.done && <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#1a6b3c", marginTop: 4 }}>⛓ On-Chain Verified</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="panel">
            <div className="panel-title">Organ by Organ</div>
            {[
              { organ: "🫀 Heart", status: "IN TRANSIT", badge: "cyan", pct: [1,1,1,0.5,0] },
              { organ: "🫁 Kidneys ×2", status: "DISPATCHED", badge: "cyan", pct: [1,1,1,0.5,0] },
              { organ: "👁️ Corneas ×2", status: "TRANSPLANTED", badge: "green", pct: [1,1,1,1,1] },
            ].map(o => (
              <div key={o.organ} className="organ-progress-card">
                <div className="op-header">
                  <div className="op-name">{o.organ}</div>
                  <span className={`badge badge-${o.badge}`}>{o.status}</span>
                </div>
                <div className="progress-nodes">
                  {["Consent", "Listed", "Matched", "Transit", "Done"].map((lbl, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", flex: i < 4 ? 1 : "none" }}>
                      <div className="pnode">
                        <div className={`pnode-dot ${o.pct[i] === 1 ? "done" : o.pct[i] === 0.5 ? "active" : "wait"}`}></div>
                        <div className="pnode-label">{lbl}</div>
                      </div>
                      {i < 4 && <div className="pline" style={{ background: o.pct[i] >= 1 && o.pct[i+1] >= 1 ? "#1a6b3c" : "#e8e8e5" }}></div>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fade-up" style={{ marginTop: 24, textAlign: 'left' }}>
          <button className="btn-action-outline" onClick={() => setPage("home")}>← Home</button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────
   NOTTO PORTAL
───────────────────────────────────── */
const NottoPortal = ({ setPage, showToast }) => {
  const [tab, setTab] = useState("flags");
  return (
    <div className="portal-page bg-dots">
      <div className="portal-hero bg-dots">
        <div className="portal-hero-back">
          <div className="portal-back" onClick={() => setPage("home")}>← Back to Home</div>
        </div>
        <div className="portal-hero-left">
          <div className="portal-hero-eyebrow">National Organ & Tissue Transplant Organisation</div>
          <h1 className="portal-hero-title">NOTTO<br />PORTAL</h1>
          <p className="portal-hero-sub">Review flagged allocations, approve overrides, and view the audit trail for all registered hospitals.</p>
        </div>
        <div>
          <div className="portal-live-chip" style={{ borderColor: "rgba(192,57,43,0.3)", color: "#c0392b", background: "#fdecea" }}>⚠️ 2 cases require review</div>
        </div>
      </div>
      <div className="portal-body">
        <div className="portal-stat-row fade-up">
          {[["47", "Hospitals", "#b85c00"], ["2", "Active flags", "#c0392b"], ["312", "Approved this month", "#1a6b3c"], ["100%", "Audit coverage", "#0066aa"]].map(([v, l, c], i) => (
            <div key={i} className="pstat">
              <div className="pstat-accent" style={{ background: c }}></div>
              <div className="pstat-label">{l}</div>
              <div className="pstat-val" style={{ color: c }}>{v}</div>
            </div>
          ))}
        </div>

        <div className="tab-bar fade-up">
          {[["flags", "⚠️ Flagged cases"], ["multisig", "✍️ Multi-signature"], ["auditlog", "🔗 Audit log"]].map(([k, l]) => (
            <button key={k} className={`tab-btn ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>{l}</button>
          ))}
        </div>

        {tab === "flags" && (
          <div className="fade-up">
            <p style={{ fontSize: 13, color: "var(--dark-grey)", marginBottom: 20, lineHeight: 1.6 }}>Cases with a trust score below 50/100 are auto-flagged. Review and approve or reject; all decisions are recorded on-chain.</p>
            <div className="flag-card">
              <div className="flag-header">
                <div>
                  <div className="flag-id">FLAG-001 · ORG-0088 · Liver</div>
                  <div style={{ fontSize: 12, color: "var(--mid-grey)", marginTop: 3 }}>AIIMS New Delhi · Donor D-4415 → Recipient R-0021</div>
                </div>
                <div className="flag-time">18 min ago · Block #8,241,081</div>
              </div>
              <div className="flag-desc">Blood group mismatch (A+ donor, O+ recipient). Fourteen higher-priority patients were bypassed without medical justification.</div>
              <div className="flag-score-pill">⚠️ Trust score: 31/100</div>
              <div className="flag-actions">
                <button className="btn-reject" onClick={() => showToast("FLAG-001 rejected and escalated")}>🚫 Reject & escalate</button>
                <button className="btn-approve" onClick={() => showToast("FLAG-001 approved — recorded on-chain")}>✅ Approve with override</button>
                <button className="btn-info">📋 Request explanation</button>
              </div>
            </div>
          </div>
        )}

        {tab === "multisig" && (
          <div className="panel fade-up">
            <div className="panel-title">Override request: ORG-0091 Heart</div>
            <p style={{ fontSize: 13, color: "var(--dark-grey)", marginBottom: 20, lineHeight: 1.6 }}>Non-standard allocation. Requires all three NOTTO officer signatures to proceed.</p>
            {[
              { name: "Dr. Rajeev Sharma", role: "NOTTO Senior Officer · NO-0012", signed: true },
              { name: "Dr. Priya Nair", role: "NOTTO Regional Director · NO-0008", signed: true },
              { name: "Dr. Arun Menon", role: "Ministry of Health Liaison · NO-0003", signed: false },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: i < 2 ? "1px solid var(--off-white)" : "none" }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 3 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: "var(--mid-grey)", fontFamily: "var(--font-mono)" }}>{s.role}</div>
                </div>
                <span className={`badge ${s.signed ? "badge-green" : "badge-amber"}`}>{s.signed ? "✅ Signed" : "⏳ Pending"}</span>
              </div>
            ))}
            <div className="form-actions" style={{ marginTop: 20 }}>
              <button className="btn-action" onClick={() => showToast("Signature added — awaiting Dr. Arun Menon")}>✍️ Add my signature</button>
              <button className="btn-action-outline">View full request</button>
            </div>
          </div>
        )}

        {tab === "auditlog" && (
          <div className="panel fade-up">
            <div className="panel-title">Blockchain audit log<span className="panel-title-sub">All hospitals · read-only</span></div>
            <div style={{ overflowX: "auto" }}>
              <table className="data-table">
                <thead><tr><th>Block #</th><th>Event</th><th>Hospital</th><th>Entity</th><th>Timestamp</th><th>TX Hash</th><th>Status</th></tr></thead>
                <tbody>
                  {[
                    ["#8,241,093", "Transplant confirmed", "AIIMS Delhi", "ORG-0091", "14:22:18", "0x7f4a…", "Confirmed"],
                    ["#8,241,081", "Anomaly flagged", "AIIMS Delhi", "ORG-0088", "14:08:41", "0xd9e1…", "Flagged"],
                    ["#8,241,074", "Transport dispatched", "AIIMS Delhi", "ORG-0091", "13:51:09", "0x3a9c…", "On chain"],
                    ["#8,241,060", "Consent recorded", "AIIMS Delhi", "D-4421", "13:30:55", "0x1b2d…", "Confirmed"],
                    ["#8,240,991", "Anomaly flagged", "Apollo Chennai", "ORG-0081", "12:30:55", "0xc1a2…", "Flagged"],
                  ].map((r, i) => (
                    <tr key={i}>
                      <td><span className="mono">{r[0]}</span></td>
                      <td style={{ fontWeight: 500 }}>{r[1]}</td>
                      <td>{r[2]}</td>
                      <td><span className="mono">{r[3]}</span></td>
                      <td><span className="mono">{r[4]}</span></td>
                      <td><span className="hash">{r[5]}</span></td>
                      <td><span className={`badge ${r[6] === "Confirmed" ? "badge-green" : r[6] === "Flagged" ? "badge-rose" : "badge-cyan"}`}>{r[6]}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────
   HOSPITAL DONOR PORTAL
───────────────────────────────────── */
const ORGAN_OPTIONS = ["Heart", "Kidneys", "Liver", "Lungs", "Corneas", "Pancreas"];

const HospitalDonorPortal = ({ setPage, showToast }) => {
  const [tab, setTab] = useState("inventory");
  const [donorIdSeed, setDonorIdSeed] = useState(4431);
  const [form, setForm] = useState({
    bloodGroup: "",
    age: "",
    gender: "",
    causeOfDeath: "",
    declarationDateTime: "",
    organsConsented: {},
    physicianId: "",
    consentRef: "",
    clinicalNotes: "",
  });

  const donorId = `D-${donorIdSeed}`;

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleOrgan = (organ) => {
    setForm(prev => ({
      ...prev,
      organsConsented: { ...prev.organsConsented, [organ]: !prev.organsConsented[organ] },
    }));
  };

  const isOrganSelected = (organ) => !!form.organsConsented[organ];
  const hasAtLeastOneOrgan = ORGAN_OPTIONS.some(isOrganSelected);

  const isFormComplete =
    form.bloodGroup.trim() !== "" &&
    form.age.trim() !== "" &&
    form.gender.trim() !== "" &&
    form.causeOfDeath.trim() !== "" &&
    form.declarationDateTime.trim() !== "" &&
    hasAtLeastOneOrgan &&
    form.physicianId.trim() !== "" &&
    form.consentRef.trim() !== "" &&
    form.clinicalNotes.trim() !== "";

  const clearForm = () => {
    setForm({
      bloodGroup: "",
      age: "",
      gender: "",
      causeOfDeath: "",
      declarationDateTime: "",
      organsConsented: {},
      physicianId: "",
      consentRef: "",
      clinicalNotes: "",
    });
    setDonorIdSeed(prev => prev + 1);
  };

  const handleSubmit = () => {
    showToast(`${donorId} registered · Hashed on-chain · Block #8,241,110`);
    clearForm();
  };

  return (
    <div className="portal-page bg-dots">
      <div className="portal-hero bg-dots">
        <div className="portal-hero-back">
          <div className="portal-back" onClick={() => setPage("home")}>← Back to Home</div>
        </div>
        <div className="portal-hero-left">
          <div className="portal-hero-eyebrow">Hospital Admin Portal · AIIMS New Delhi · H-0041</div>
          <h1 className="portal-hero-title">DONOR<br />PORTAL</h1>
          <p className="portal-hero-sub">Register donors, list available organs, log consent events, and monitor AI trust scores for every allocation in real-time.</p>
        </div>
        <div className="portal-live-chip"><div className="live-dot-green"></div>Chain Connected</div>
      </div>
      <div className="portal-body">
        <div className="portal-stat-row fade-up">
          {[["34", "Active Donors", "#0066aa"], ["12", "Organs Available", "#1a6b3c"], ["5", "Pending Matches", "#b85c00"], ["1", "Flagged", "#c0392b"]].map(([v, l, c], i) => (
            <div key={i} className="pstat">
              <div className="pstat-accent" style={{ background: c }}></div>
              <div className="pstat-label">{l}</div>
              <div className="pstat-val" style={{ color: c }}>{v}</div>
            </div>
          ))}
        </div>

        <div className="tab-bar fade-up">
          {[["inventory", "🫀 Inventory"], ["register", "➕ Register Donor"], ["scores", "🧠 AI Scores"], ["audit", "🔗 Audit Trail"]].map(([k, l]) => (
            <button key={k} className={`tab-btn ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>{l}</button>
          ))}
        </div>

        {tab === "inventory" && (
          <div className="panel fade-up">
            <div className="panel-title">Organ Inventory<button className="btn-action" style={{ fontSize: 12, padding: "8px 18px" }} onClick={() => setTab("register")}>+ Register Donor</button></div>
            <div style={{ overflowX: "auto" }}>
              <table className="data-table">
                <thead><tr><th>Organ ID</th><th>Type</th><th>Blood</th><th>Donor</th><th>Viability</th><th>Trust Score</th><th>Status</th><th>Hash</th></tr></thead>
                <tbody>
                  {[
                    ["ORG-0091", "🫀 Heart", "O+", "D-4421", "4h left", 92, "IN TRANSIT"],
                    ["ORG-0092", "🫁 Kidney L", "O+", "D-4421", "18h left", 96, "AVAILABLE"],
                    ["ORG-0093", "🫁 Kidney R", "O+", "D-4421", "18h left", 96, "AVAILABLE"],
                    ["ORG-0088", "🧬 Liver", "A+", "D-4415", "8h left", 31, "FLAGGED"],
                    ["ORG-0085", "👁️ Corneas", "B+", "D-4410", "5 days", 94, "MATCHED"],
                  ].map((r, i) => (
                    <tr key={i}>
                      <td><span className="mono" style={{ color: "#0066aa" }}>{r[0]}</span></td>
                      <td style={{ fontWeight: 500 }}>{r[1]}</td>
                      <td><span className="badge badge-grey">{r[2]}</span></td>
                      <td><span className="mono">{r[3]}</span></td>
                      <td><span className="mono" style={{ color: r[4].includes("4h") ? "#c0392b" : r[4].includes("8h") ? "#b85c00" : "#1a6b3c" }}>{r[4]}</span></td>
                      <td><span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, color: r[5] > 80 ? "#1a6b3c" : r[5] > 60 ? "#b85c00" : "#c0392b" }}>{r[5]}/100</span></td>
                      <td><span className={`badge ${r[6] === "AVAILABLE" ? "badge-green" : r[6] === "IN TRANSIT" ? "badge-cyan" : r[6] === "MATCHED" ? "badge-amber" : "badge-rose"}`}>{r[6]}</span></td>
                      <td><span className="hash">0x{Math.random().toString(16).slice(2, 8)}…</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "register" && (
          <div className="panel fade-up">
            <div className="panel-title">Register New Donor<span className="panel-title-sub">keccak256 hash stored on-chain only</span></div>
            <p style={{ fontSize: 13, color: "var(--dark-grey)", marginBottom: 24, lineHeight: 1.6 }}>Patient data is encrypted locally. Only a cryptographic hash is stored on-chain — raw data never leaves hospital servers. Complete all fields to enable submission.</p>
            <div className="form-section">
              <div className="form-row">
                <div className="form-group"><label className="form-label">Donor ID (auto)</label><input className="form-input" value={donorId} readOnly style={{ opacity: 0.6 }} /></div>
                <div className="form-group">
                  <label className="form-label">Blood Group</label>
                  <select className="form-input form-select" value={form.bloodGroup} onChange={e => updateForm("bloodGroup", e.target.value)}>
                    <option value="">Select</option>
                    <option value="O+">O+</option><option value="O-">O-</option><option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="AB+">AB+</option><option value="AB-">AB-</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Age</label><input className="form-input" type="number" placeholder="Enter age" value={form.age} onChange={e => updateForm("age", e.target.value)} /></div>
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select className="form-input form-select" value={form.gender} onChange={e => updateForm("gender", e.target.value)}>
                    <option value="">Select</option>
                    <option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Cause of Brain Death</label>
                  <select className="form-input form-select" value={form.causeOfDeath} onChange={e => updateForm("causeOfDeath", e.target.value)}>
                    <option value="">Select</option>
                    <option value="Road Traffic Accident">Road Traffic Accident</option>
                    <option value="Cardiac Arrest">Cardiac Arrest</option>
                    <option value="Stroke">Stroke</option>
                    <option value="Brain Tumor">Brain Tumor</option>
                  </select>
                </div>
                <div className="form-group"><label className="form-label">Declaration Date & Time</label><input className="form-input" type="datetime-local" value={form.declarationDateTime} onChange={e => updateForm("declarationDateTime", e.target.value)} /></div>
              </div>
              <div className="form-group full">
                <label className="form-label">Organs Consented</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 4 }}>
                  {ORGAN_OPTIONS.map(o => (
                    <label key={o} style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--off-white)", border: "1.5px solid var(--light-grey)", padding: "8px 14px", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: 13 }}>
                      <input type="checkbox" checked={isOrganSelected(o)} onChange={() => toggleOrgan(o)} /> {o}
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Attending Physician ID</label><input className="form-input" placeholder="e.g. DR-2210" value={form.physicianId} onChange={e => updateForm("physicianId", e.target.value)} /></div>
                <div className="form-group"><label className="form-label">NOC / Consent Ref</label><input className="form-input" placeholder="e.g. NOC-AIIMS-2024-0041" value={form.consentRef} onChange={e => updateForm("consentRef", e.target.value)} /></div>
              </div>
              <div className="form-group full"><label className="form-label">Clinical Notes</label><textarea className="form-input form-textarea" placeholder="Any relevant notes..." value={form.clinicalNotes} onChange={e => updateForm("clinicalNotes", e.target.value)}></textarea></div>
              <div className="form-actions">
                {isFormComplete && (
                  <button className="btn-action" onClick={handleSubmit}>⛓ Register & Hash On-Chain</button>
                )}
                {!isFormComplete && (
                  <p style={{ fontSize: 12, color: "var(--mid-grey)", marginRight: 12 }}>Complete all fields above to enable submit.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {tab === "scores" && (
          <div className="panel fade-up">
            <div className="panel-title">AI Trust Score Engine<span className="panel-title-sub">Scores below 50 auto-flagged to NOTTO</span></div>
            {[
              { icon: "🫁", name: "Kidney L (ORG-0092) → R-2241 · Blood ✓ · Waitlist #1", pct: 96, color: "#22c55e", status: "CLEAR" },
              { icon: "🫀", name: "Heart (ORG-0091) → R-1988 · Blood ✓ · Proximity ✓", pct: 92, color: "#22c55e", status: "CLEAR" },
              { icon: "🧬", name: "Liver (ORG-0088) → R-0021 · Blood mismatch ⚠️ · Skipped 14 patients", pct: 31, color: "#ef4444", status: "FLAGGED" },
              { icon: "👁️", name: "Corneas (ORG-0085) → R-1190 · Tissue match ✓ · Waitlist #2", pct: 94, color: "#22c55e", status: "CLEAR" },
              { icon: "🫁", name: "Lungs (ORG-0079) → Searching · AB+ · 3 candidates", pct: 78, color: "#f59e0b", status: "REVIEW" },
            ].map((g, i) => (
              <div key={i} className="gauge-item" style={{ borderLeft: g.status === "FLAGGED" ? "3px solid #ef4444" : "3px solid transparent" }}>
                <div style={{ fontSize: 24 }}>{g.icon}</div>
                <div className="gauge-info">
                  <div className="gauge-name">{g.name}</div>
                  <div className="gauge-bar-bg"><div className="gauge-fill" style={{ width: `${g.pct}%`, background: g.color }}></div></div>
                  <div className="gauge-score" style={{ color: g.color }}>{g.pct}/100</div>
                </div>
                <span className={`badge ${g.status === "CLEAR" ? "badge-green" : g.status === "FLAGGED" ? "badge-rose" : "badge-amber"}`}>{g.status}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "audit" && (
          <div className="panel fade-up">
            <div className="panel-title">Blockchain Audit Trail<span className="panel-title-sub">Read-only · Tamper-proof</span></div>
            <div style={{ overflowX: "auto" }}>
              <table className="data-table">
                <thead><tr><th>Block #</th><th>Event</th><th>Entity</th><th>By</th><th>Timestamp</th><th>TX Hash</th><th>Status</th></tr></thead>
                <tbody>
                  {[
                    ["#8,241,093", "Transplant Confirmed", "ORG-0091→R-2241", "DR-2210", "14:22:18", "0x7f4a…", "SUCCESS"],
                    ["#8,241,081", "Anomaly Flagged", "ORG-0088 Liver", "AI Engine", "14:08:41", "0xd9e1…", "FLAGGED"],
                    ["#8,241,074", "Transport Dispatched", "ORG-0091 Heart", "Admin H-0041", "13:51:09", "0x3a9c…", "ON CHAIN"],
                    ["#8,241,060", "Consent Recorded", "Donor D-4421", "Admin H-0041", "13:30:55", "0x1b2d…", "SUCCESS"],
                    ["#8,240,998", "Organ Matched", "ORG-0085→R-1190", "NOTTO System", "12:42:30", "0x8c3b…", "SUCCESS"],
                  ].map((r, i) => (
                    <tr key={i}>
                      <td><span className="mono">{r[0]}</span></td>
                      <td style={{ fontWeight: 500 }}>{r[1]}</td>
                      <td><span className="mono">{r[2]}</span></td>
                      <td style={{ fontSize: 12, color: "var(--dark-grey)" }}>{r[3]}</td>
                      <td><span className="mono">{r[4]}</span></td>
                      <td><span className="hash">{r[5]}</span></td>
                      <td><span className={`badge ${r[6] === "SUCCESS" ? "badge-green" : r[6] === "FLAGGED" ? "badge-rose" : "badge-cyan"}`}>{r[6]}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────
   HOSPITAL RECEIVER PORTAL
───────────────────────────────────── */
const HospitalReceiverPortal = ({ setPage, showToast }) => {
  const [tab, setTab] = useState("incoming");
  return (
    <div className="portal-page bg-dots">
      <div className="portal-hero bg-dots">
        <div className="portal-hero-back">
          <div className="portal-back" onClick={() => setPage("home")}>← Back to Home</div>
        </div>
        <div className="portal-hero-left">
          <div className="portal-hero-eyebrow">Receiving Hospital Portal · Kokilaben Hospital · H-0027</div>
          <h1 className="portal-hero-title">RECEIVER<br />PORTAL</h1>
          <p className="portal-hero-sub">Manage incoming organ requests, confirm transplant outcomes, and access the full blockchain chain of custody for every incoming organ.</p>
        </div>
        <div className="portal-live-chip"><div className="live-dot-green"></div>1 Organ Incoming</div>
      </div>
      <div className="portal-body">
        <div className="portal-stat-row fade-up">
          {[["8", "Patients on Waitlist", "#c0392b"], ["1", "Organ Incoming", "#0066aa"], ["3", "Transplants This Month", "#1a6b3c"], ["98.2%", "Acceptance Rate", "#b85c00"]].map(([v, l, c], i) => (
            <div key={i} className="pstat">
              <div className="pstat-accent" style={{ background: c }}></div>
              <div className="pstat-label">{l}</div>
              <div className="pstat-val" style={{ color: c }}>{v}</div>
            </div>
          ))}
        </div>

        <div className="tab-bar fade-up">
          {[["incoming", "📦 Incoming Organs"], ["waitlist", "📋 Waitlist"], ["transplant", "✅ Log Transplant"], ["custody", "🔗 Chain of Custody"]].map(([k, l]) => (
            <button key={k} className={`tab-btn ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>{l}</button>
          ))}
        </div>

        {tab === "incoming" && (
          <div className="fade-up">
            <div style={{ background: "#e0f0ff", border: "1.5px solid rgba(0,102,170,0.2)", borderRadius: "var(--radius-lg)", padding: "20px 24px", marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 12, height: 12, background: "#0066aa", borderRadius: "50%", animation: "pulse 1.5s infinite", flexShrink: 0 }}></div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#0066aa", marginBottom: 3 }}>LIVE — Heart incoming from AIIMS Delhi</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#4a4a46" }}>ETA: ~2 hours · ORG-0091 · O+ · Trust Score: 92/100 · Transport ID: T-9821</div>
              </div>
              <button className="btn-action" style={{ marginLeft: "auto", fontSize: 12, padding: "8px 16px", flexShrink: 0 }} onClick={() => showToast("Acceptance confirmed · Block #8,241,200")}>Confirm Acceptance</button>
            </div>

            <div className="panel">
              <div className="panel-title">Incoming Organ Details</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                {[
                  ["Organ ID", "ORG-0091"], ["Type", "🫀 Heart"], ["Blood Group", "O+"], ["Donor Hospital", "AIIMS New Delhi"],
                  ["Trust Score", "92/100 ✅"], ["Dispatch Time", "Dec 15, 2024 · 1:51 PM"], ["Viability Window", "4 hours remaining"], ["Transport ID", "T-9821"],
                ].map(([k, v]) => (
                  <div key={k} style={{ background: "var(--off-white)", border: "1px solid var(--light-grey)", borderRadius: "var(--radius-sm)", padding: "12px 16px" }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--mid-grey)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 5 }}>{k}</div>
                    <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--black)", fontFamily: k === "Organ ID" || k === "Transport ID" ? "var(--font-mono)" : "inherit" }}>{v}</div>
                  </div>
                ))}
              </div>

              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--mid-grey)", borderTop: "1px solid var(--light-grey)", paddingTop: 16 }}>
                <div style={{ marginBottom: 6 }}>Chain verified: Consent → Listed → Matched → Dispatched ✓</div>
                <div>TX Hash: 0x3a9c81d2f4e5b6c7… · Block #8,241,074 · Sepolia Testnet</div>
              </div>
            </div>
          </div>
        )}

        {tab === "waitlist" && (
          <div className="panel fade-up">
            <div className="panel-title">Recipient Waitlist</div>
            <div style={{ overflowX: "auto" }}>
              <table className="data-table">
                <thead><tr><th>Recipient ID</th><th>Organ Needed</th><th>Blood</th><th>Waitlist Rank</th><th>Urgency</th><th>Days Waiting</th><th>Status</th></tr></thead>
                <tbody>
                  {[
                    ["R-1988", "🫀 Heart", "O+", "#1", "CRITICAL", "142", "MATCHED"],
                    ["R-2241", "🫁 Kidney", "O+", "#2", "HIGH", "89", "AVAILABLE"],
                    ["R-3301", "🧬 Liver", "A+", "#3", "MODERATE", "211", "WAITING"],
                    ["R-0099", "🫁 Lungs", "AB+", "#4", "HIGH", "67", "WAITING"],
                    ["R-4410", "👁️ Corneas", "B+", "#5", "LOW", "310", "WAITING"],
                  ].map((r, i) => (
                    <tr key={i}>
                      <td><span className="mono" style={{ color: "#c0392b" }}>{r[0]}</span></td>
                      <td style={{ fontWeight: 500 }}>{r[1]}</td>
                      <td><span className="badge badge-grey">{r[2]}</span></td>
                      <td style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700 }}>{r[3]}</td>
                      <td><span className={`badge ${r[4] === "CRITICAL" ? "badge-rose" : r[4] === "HIGH" ? "badge-amber" : "badge-grey"}`}>{r[4]}</span></td>
                      <td style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{r[5]}d</td>
                      <td><span className={`badge ${r[6] === "MATCHED" ? "badge-green" : r[6] === "AVAILABLE" ? "badge-cyan" : "badge-grey"}`}>{r[6]}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "transplant" && (
          <div className="panel fade-up">
            <div className="panel-title">Log Transplant Event<span className="panel-title-sub">Immutable once committed</span></div>
            <p style={{ fontSize: 13, color: "var(--dark-grey)", marginBottom: 24, lineHeight: 1.6 }}>Creates a permanent, unalterable record on Ethereum. Donor family's QR tracker is automatically updated on confirmation.</p>
            <div className="form-section">
              <div className="form-row">
                <div className="form-group"><label className="form-label">Organ ID</label><select className="form-input form-select"><option>ORG-0091 — Heart (O+)</option><option>ORG-0092 — Kidney L</option></select></div>
                <div className="form-group"><label className="form-label">Recipient ID</label><input className="form-input" placeholder="e.g. R-1988" /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Performing Surgeon ID</label><input className="form-input" placeholder="e.g. DR-3301" /></div>
                <div className="form-group"><label className="form-label">Operation Theatre</label><input className="form-input" placeholder="e.g. OT-2, Block A" /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Transplant Date & Time</label><input className="form-input" type="datetime-local" /></div>
                <div className="form-group"><label className="form-label">Duration (hours)</label><input className="form-input" type="number" placeholder="e.g. 6" /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Outcome</label><select className="form-input form-select"><option>Successful</option><option>Complications — Stable</option><option>Failed</option></select></div>
                <div className="form-group"><label className="form-label">NOTTO Approval Ref</label><input className="form-input" placeholder="e.g. NOTTO-APR-2024-0882" /></div>
              </div>
              <div className="form-group full"><label className="form-label">Post-Op Notes</label><textarea className="form-input form-textarea" placeholder="Post-operative notes..."></textarea></div>
              <div className="form-actions">
                <button className="btn-action" onClick={() => showToast("Transplant confirmed on-chain · Block #8,241,115 · QR sent to donor family ✅")}>✅ Confirm & Log On-Chain</button>
                <button className="btn-action-outline">Save Draft</button>
              </div>
            </div>
          </div>
        )}

        {tab === "custody" && (
          <div className="panel fade-up">
            <div className="panel-title">Chain of Custody — ORG-0091 Heart</div>
            <div className="timeline">
              {[
                { dot: "#22c55e", label: "Donor consent recorded — AIIMS Delhi", meta: "Block #8,241,060 · Dec 15 13:30 · Donor D-4421", hash: "0x1b2d4e6f…", done: true },
                { dot: "#22c55e", label: "Organ listed on national registry", meta: "Block #8,241,070 · NOTTO System", hash: "0x4c5e6f7a…", done: true },
                { dot: "#22c55e", label: "Matched to Recipient R-1988 · Trust 92/100", meta: "Block #8,240,998 · NOTTO AI Engine", hash: "0x8c3b59aa…", done: true },
                { dot: "#22c55e", label: "Transport dispatched · T-9821 · Delhi→Mumbai", meta: "Block #8,241,074 · Dec 15 13:51 · Admin H-0041", hash: "0x3a9c81d2…", done: true },
                { dot: "#0066aa", label: "In transit — ETA 2 hours remaining", meta: "Live · Tracking ID: T-9821 · Air ambulance", hash: null, done: false, active: true },
                { dot: "#c0c0bc", label: "Transplant confirmation — Kokilaben Mumbai", meta: "Awaiting surgeon confirmation", hash: null, done: false },
              ].map((s, i) => (
                <div key={i} className="tl-item">
                  <div className="tl-left">
                    <div className="tl-dot" style={{ background: s.dot, animation: s.active ? "pulse 1.5s infinite" : "none" }}></div>
                    <div className="tl-line"></div>
                  </div>
                  <div>
                    <div className="tl-event" style={{ color: s.active ? "#0066aa" : s.done ? "#1a6b3c" : "#c0c0bc" }}>{s.label}</div>
                    <div className="tl-meta">{s.meta}</div>
                    {s.hash && <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#4a4a46", opacity: 0.6, marginTop: 3 }}>TX: {s.hash} · ⛓ Verified</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────
   APP ROOT
───────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => setToast(""), 4500);
  };

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const pages = {
    home: <Landing setPage={setPage} />,
    tracking: <TrackingPortal setPage={setPage} showToast={showToast} />,
    notto: <NottoPortal setPage={setPage} showToast={showToast} />,
    "hospital-donor": <HospitalDonorPortal setPage={setPage} showToast={showToast} />,
    "hospital-receiver": <HospitalReceiverPortal setPage={setPage} showToast={showToast} />,
  };

  return (
    <>
      <GlobalStyles />
      <Nav page={page} setPage={setPage} />
      {pages[page] || pages["home"]}
      <Toast msg={toast} />
    </>
  );
}
