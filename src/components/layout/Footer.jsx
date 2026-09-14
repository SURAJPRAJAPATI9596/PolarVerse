import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  FiCompass,
  FiFileText,
  FiDatabase,
  FiBookOpen,
  FiFilm,
  FiActivity,
  FiMap,
  FiShare2,
  FiClock,
  FiSearch,
  FiBook,
  FiFeather,
  FiTerminal,
  FiHelpCircle,
  FiCpu,
  FiZap,
  FiFilePlus,
  FiAlignLeft,
  FiInfo,
  FiLayers,
  FiMail,
  FiSend,
  FiGithub,
  FiLinkedin,
  FiYoutube,
  FiTwitter,
  FiChevronDown,
  FiArrowUp,
  FiCheckCircle,
} from 'react-icons/fi';
import { GiSnowflake1 } from 'react-icons/gi';

/* -------------------------------------------------------------------------- */
/*  Content                                                                   */
/* -------------------------------------------------------------------------- */

const COLUMNS = [
  {
    key: 'explore',
    label: 'Explore',
    items: [
      { icon: FiCompass, label: 'Expeditions', to: '/expeditions' },
      { icon: FiFileText, label: 'Reports', to: '/knowledge/reports' },
      { icon: FiDatabase, label: 'Datasets', to: '/knowledge/datasets' },
      { icon: FiBookOpen, label: 'Publications', to: '/knowledge/publications' },
      { icon: FiFilm, label: 'Media', to: '/media' },
      { icon: FiActivity, label: 'Activities', to: '/activities' },
    ],
  },
  {
    key: 'discover',
    label: 'Discover',
    items: [
      { icon: FiMap, label: 'Polar Map', to: '/map' },
      { icon: FiShare2, label: 'Knowledge Connections', to: '/connections' },
      { icon: FiClock, label: 'Expedition Timeline', to: '/timeline' },
      { icon: FiSearch, label: 'Unified Search', to: '/search' },
    ],
  },
  {
    key: 'learn',
    label: 'Learn',
    items: [
      { icon: FiBook, label: 'Student Mode', to: '/learn' },
      { icon: FiFeather, label: 'Research Stories', to: '/research-stories' },
      { icon: FiTerminal, label: 'Polar Glossary', to: '/learn/glossary' },
      { icon: FiCheckCircle, label: 'Quizzes', to: '/learn/quizzes' },
      { icon: FiBookOpen, label: 'Learning Resources', to: '/resources' },
    ],
  },
  {
    key: 'ai',
    label: 'AI Studio',
    accent: true,
    items: [
      { icon: FiCpu, label: 'AI Research Assistant', to: '/ai' },
      { icon: FiZap, label: 'Explain Research', to: '/ai/explain' },
      { icon: FiFilePlus, label: 'Content Generator', to: '/ai/content-generator' },
      { icon: FiAlignLeft, label: 'Research Summarizer', to: '/ai/summarizer' },
    ],
  },
  {
    key: 'resources',
    label: 'Resources',
    items: [
      { icon: FiInfo, label: 'About PolarVerse', to: '/about' },
      { icon: FiLayers, label: 'Knowledge Repository', to: '/knowledge' },
      { icon: FiBookOpen, label: 'Research Resources', to: '/resources' },
      { icon: FiTerminal, label: 'Documentation', to: '/docs' },
      { icon: FiMail, label: 'Contact', to: '/contact' },
      { icon: FiHelpCircle, label: 'Help & Support', to: '/help' },
    ],
  },
];

const SOCIALS = [
  {
    label: 'GitHub',
    icon: FiGithub,
    href: '#',
    disabled: true,
    note: 'Repository — link to be added',
  },
  {
    label: 'LinkedIn',
    icon: FiLinkedin,
    href: '#',
    disabled: true,
    note: 'Official page — link to be added',
  },
  {
    label: 'YouTube',
    icon: FiYoutube,
    href: '#',
    disabled: true,
    note: 'Channel — link to be added',
  },
  {
    label: 'Twitter',
    icon: FiTwitter,
    href: '#',
    disabled: true,
    note: 'Handle — link to be added',
  },
];

const FLOW = [
  { label: 'Explore', tone: 'text-[var(--color-text-primary)]' },
  { label: 'Connect', tone: 'text-[var(--color-text-primary)]' },
  { label: 'Understand', tone: 'text-[var(--color-text-primary)]' },
  { label: 'Share', tone: 'text-[var(--color-text-primary)]' },
];

/* -------------------------------------------------------------------------- */

export default function Footer({ dark, setDark }) {
  const [openSection, setOpenSection] = useState(null); // mobile accordion
  const [subscribed, setSubscribed] = useState(false);

  /* Newsletter is UI-only. Reveal a short confirmation but do not call
     any backend. Auto-dismiss after 4s so the footer stays calm. */
  useEffect(() => {
    if (!subscribed) return;
    const t = setTimeout(() => setSubscribed(false), 4000);
    return () => clearTimeout(t);
  }, [subscribed]);

  const toggleSection = (key) => setOpenSection((cur) => (cur === key ? null : key));

  const handleSubscribe = (e) => {
    e.preventDefault();
    // No backend. Just surface an informational message.
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative mt-24 border-t"
      style={{
        background: 'var(--color-bg-primary)',
        borderColor: 'var(--color-border)',
      }}
    >
      {/* ---------------------------------------------------------------- */}
      {/* Polar backdrop — subtle latitude/longitude grid + aurora arc      */}
      {/* ---------------------------------------------------------------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 overflow-hidden"
      >
        {/* longitudes */}
        <svg
          viewBox="0 0 1200 260"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full opacity-[0.08]"
        >
          <defs>
            <linearGradient id="pv-f-lon" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-accent-primary)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--color-accent-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {Array.from({ length: 13 }).map((_, i) => {
            const x = (i / 12) * 1200;
            return (
              <line key={i} x1={x} y1="0" x2={x} y2="260" stroke="url(#pv-f-lon)" strokeWidth="1" />
            );
          })}
          {Array.from({ length: 5 }).map((_, i) => {
            const y = (i / 4) * 260;
            return (
              <line
                key={`h-${i}`}
                x1="0"
                y1={y}
                x2="1200"
                y2={y}
                stroke="var(--color-accent-primary)"
                strokeOpacity="0.35"
                strokeWidth="1"
              />
            );
          })}
        </svg>
        {/* aurora arc */}
        <div
          className="absolute -top-24 left-1/2 h-56 w-[80%] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(closest-side, color-mix(in srgb, var(--color-accent-primary) 22%, transparent), transparent 72%)',
          }}
        />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Main content                                                     */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20">
        {/* ============================================================ */}
        {/* Brand + Newsletter                                           */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Brand block */}
          <div className="lg:col-span-5">
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)]"
              aria-label="PolarVerse home"
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl shadow-sm"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
                  color: 'var(--color-accent-primary-foreground)',
                }}
              >
                <GiSnowflake1 className="h-5 w-5" />
              </span>
              <span className="text-[20px] font-semibold tracking-tight text-[var(--color-text-primary)]">
                Polar
                <span style={{ color: 'var(--color-accent-primary)' }}>Verse</span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
              Connecting polar science, research, data and knowledge for researchers, students and
              the public — one platform for expeditions, datasets, publications, media and outreach.
            </p>

            {/* SIH label — subtle, not shouty */}

            {/* Knowledge-flow statement */}
            <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-[12px] font-medium">
              {FLOW.map((f, i) => (
                <React.Fragment key={f.label}>
                  <span
                    className="uppercase tracking-[0.14em]"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {f.label}
                  </span>
                  {i < FLOW.length - 1 && (
                    <span
                      className="select-none"
                      style={{ color: 'var(--color-accent-primary)' }}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className="mt-2 text-[12px] text-[var(--color-text-secondary)]">
              From expedition data to accessible knowledge.
            </p>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 lg:col-start-9">
            <div
              className="rounded-2xl border p-5"
              style={{
                borderColor: 'var(--color-border)',
                background: 'var(--color-bg-secondary)',
              }}
            >
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-primary)]">
                Stay connected
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                Updates on polar research, expeditions and new datasets.
              </p>

              <form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-2 sm:flex-row">
                <label htmlFor="pv-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="pv-newsletter-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="min-w-0 flex-1 rounded-lg border px-3.5 py-2.5 text-[13px] outline-none transition-colors focus:border-[var(--color-accent-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                  style={{
                    background: 'var(--color-bg-primary)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-primary)',
                  }}
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold shadow-sm transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-secondary)] focus-visible:ring-[var(--color-accent-primary)]"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
                    color: 'var(--color-accent-primary-foreground)',
                  }}
                >
                  <FiSend className="h-[14px] w-[14px]" />
                  Subscribe
                </button>
              </form>

              {subscribed && (
                <p
                  role="status"
                  className="mt-3 flex items-start gap-2 text-[12px] leading-snug"
                  style={{ color: 'var(--color-accent-primary)' }}
                >
                  <FiCheckCircle className="mt-[2px] h-3.5 w-3.5 shrink-0" />
                  Newsletter delivery isn't wired up yet — this is a UI preview for the SIH demo.
                </p>
              )}

              <p className="mt-3 text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
                No marketing. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* Link columns — desktop grid / mobile accordion               */}
        {/* ============================================================ */}
        <div
          className="mt-16 grid grid-cols-1 gap-x-8 gap-y-0 border-t pt-10 lg:grid-cols-12 lg:gap-y-10"
          style={{ borderColor: 'var(--color-border)' }}
        >
          {COLUMNS.map((col) => (
            <div
              key={col.key}
              className={
                col.key === 'resources' ? 'lg:col-span-12 xl:col-span-12' : 'lg:col-span-3'
              }
            >
              {/* Desktop heading */}
              <h3
                className="hidden text-[12px] font-semibold uppercase tracking-[0.16em] lg:block"
                style={{
                  color: col.accent ? 'var(--color-accent-primary)' : 'var(--color-text-primary)',
                }}
              >
                <span className="inline-flex items-center gap-2">
                  {col.accent && (
                    <FiCpu
                      className="h-3.5 w-3.5"
                      style={{ color: 'var(--color-accent-primary)' }}
                    />
                  )}
                  {col.label}
                </span>
              </h3>

              {/* Mobile heading — collapsible */}
              <button
                type="button"
                onClick={() => toggleSection(col.key)}
                aria-expanded={openSection === col.key}
                aria-controls={`pv-footer-${col.key}`}
                className="flex w-full items-center justify-between border-b py-4 text-left text-[14px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] lg:hidden"
                style={{
                  borderColor: 'var(--color-border)',
                  color: col.accent ? 'var(--color-accent-primary)' : 'var(--color-text-primary)',
                }}
              >
                <span className="inline-flex items-center gap-2">
                  {col.accent && (
                    <FiCpu className="h-4 w-4" style={{ color: 'var(--color-accent-primary)' }} />
                  )}
                  {col.label}
                </span>
                <FiChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    openSection === col.key ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Items — visible on desktop, toggle on mobile */}
              <ul
                id={`pv-footer-${col.key}`}
                className={`${
                  openSection === col.key ? 'block' : 'hidden'
                } mt-2 space-y-0.5 pb-4 lg:mt-5 lg:block lg:pb-0`}
              >
                {col.items.map((it) => {
                  const Icon = it.icon;
                  return (
                    <li key={it.to + it.label}>
                      <NavLink
                        to={it.to}
                        className="group flex items-center gap-2.5 rounded-lg px-2 py-2 text-[13px] transition-colors hover:bg-[var(--color-bg-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                        style={({ isActive }) => ({
                          color: isActive
                            ? 'var(--color-accent-primary)'
                            : 'var(--color-text-secondary)',
                        })}
                      >
                        {({ isActive }) => (
                          <>
                            <Icon
                              className="h-[15px] w-[15px] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                              style={{
                                color: isActive
                                  ? 'var(--color-accent-primary)'
                                  : 'var(--color-text-secondary)',
                              }}
                            />
                            <span className="transition-colors group-hover:text-[var(--color-text-primary)]">
                              {it.label}
                            </span>
                          </>
                        )}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* ============================================================ */}
        {/* Polar knowledge visual — connected nodes on a sphere         */}
        {/* ============================================================ */}
        <div
          className="relative mt-16 overflow-hidden rounded-2xl border"
          style={{
            borderColor: 'var(--color-border)',
            background:
              'linear-gradient(180deg, color-mix(in srgb, var(--color-accent-primary) 5%, var(--color-bg-secondary)) 0%, var(--color-bg-secondary) 100%)',
          }}
        >
          <div className="grid grid-cols-1 items-center gap-8 p-7 sm:p-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-primary)]">
                Connected across the polar world
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
                Every expedition, dataset, publication and story is linked — so a field observation
                in the Larsemann Hills can lead you to the paper it shaped and the classroom it
                inspired.
              </p>
            </div>

            {/* SVG network */}
            <div className="lg:col-span-8">
              <svg
                viewBox="0 0 640 220"
                className="h-[200px] w-full"
                role="img"
                aria-label="Network of connected polar research resources"
              >
                <defs>
                  <linearGradient id="pv-f-link" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--color-accent-primary)" stopOpacity="0.9" />
                    <stop
                      offset="100%"
                      stopColor="var(--color-accent-secondary)"
                      stopOpacity="0.35"
                    />
                  </linearGradient>
                  <radialGradient id="pv-f-node" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--color-accent-primary)" />
                    <stop offset="100%" stopColor="var(--color-accent-secondary)" />
                  </radialGradient>
                </defs>

                {/* soft arc backdrop */}
                <path
                  d="M20 170 Q320 -10 620 170"
                  fill="none"
                  stroke="url(#pv-f-link)"
                  strokeWidth="1.2"
                  strokeDasharray="3 6"
                  opacity="0.45"
                />
                <path
                  d="M20 190 Q320 30 620 190"
                  fill="none"
                  stroke="url(#pv-f-link)"
                  strokeWidth="1"
                  strokeDasharray="2 8"
                  opacity="0.28"
                />

                {/* Connections */}
                {(() => {
                  const nodes = [
                    { x: 70, y: 150, r: 5, label: 'Expeditions' },
                    { x: 165, y: 90, r: 6, label: 'Datasets' },
                    { x: 265, y: 140, r: 5, label: 'Publications' },
                    { x: 340, y: 68, r: 7, label: 'PolarVerse' },
                    { x: 415, y: 138, r: 5, label: 'Media' },
                    { x: 520, y: 88, r: 6, label: 'Learn' },
                    { x: 590, y: 152, r: 5, label: 'AI Studio' },
                  ];
                  const edges = [
                    [0, 1],
                    [1, 2],
                    [2, 3],
                    [3, 4],
                    [4, 5],
                    [5, 6],
                    [1, 3],
                    [3, 5],
                    [0, 3],
                    [3, 6],
                  ];
                  return (
                    <>
                      {edges.map(([a, b], i) => {
                        const na = nodes[a];
                        const nb = nodes[b];
                        return (
                          <line
                            key={i}
                            x1={na.x}
                            y1={na.y}
                            x2={nb.x}
                            y2={nb.y}
                            stroke="url(#pv-f-link)"
                            strokeWidth="1.1"
                            opacity="0.55"
                          />
                        );
                      })}
                      {nodes.map((n, i) => (
                        <g key={i}>
                          <circle
                            cx={n.x}
                            cy={n.y}
                            r={n.r + 6}
                            fill="var(--color-accent-primary)"
                            opacity="0.1"
                          />
                          <circle cx={n.x} cy={n.y} r={n.r} fill="url(#pv-f-node)" />
                          <text
                            x={n.x}
                            y={n.y - n.r - 8}
                            textAnchor="middle"
                            fontSize="10.5"
                            fontWeight="500"
                            fill="var(--color-text-secondary)"
                          >
                            {n.label}
                          </text>
                        </g>
                      ))}
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* Socials + Back to top                                        */}
        {/* ============================================================ */}
        <div className="mt-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
              Follow the project
            </p>
            <ul className="mt-3 flex items-center gap-2">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.label}>
                    <button
                      type="button"
                      disabled
                      title={s.note}
                      aria-label={`${s.label} — link to be added`}
                      className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-lg border text-[var(--color-text-secondary)] opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <Icon className="h-[16px] w-[16px]" />
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-2 text-[11px] text-[var(--color-text-secondary)]">
              Official links will be published once confirmed.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-[12.5px] font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent-primary)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <FiArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            Back to top
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Bottom bar                                                       */}
      {/* ---------------------------------------------------------------- */}
      <div
        className="relative border-t"
        style={{
          borderColor: 'var(--color-border)',
          background: 'var(--color-bg-secondary)',
        }}
      >
        <div className="mx-auto max-w-7xl gap-4 px-4 py-6 sm:flex-row sm:items-center sm:px-6">
          <p className="text-[12px] text-[var(--color-text-secondary)] text-center">
            © 2026 PolarVerse. All rights reserved.
          </p>

          {/* <nav aria-label="Legal"> */}
          {/* <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px]">
              {[
                { label: 'Privacy', to: '/privacy' },
                { label: 'Terms', to: '/terms' },
                { label: 'Accessibility', to: '/accessibility' },
              ].map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className="rounded transition-colors hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                    style={({ isActive }) => ({
                      color: isActive
                        ? 'var(--color-accent-primary)'
                        : 'var(--color-text-secondary)',
                    })}
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
              <li aria-hidden="true" className="hidden sm:block">
                <span className="block h-3 w-px" style={{ background: 'var(--color-border)' }} />
              </li>
            </ul> */}
          {/* </nav> */}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Floating back-to-top — appears after scrolling                   */}
      {/* ---------------------------------------------------------------- */}
      <FloatingBackToTop />
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Floating back-to-top (kept in the same file per constraints)              */
/* -------------------------------------------------------------------------- */
function FloatingBackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      }`}
      style={{
        borderColor: 'var(--color-border)',
        background: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
      }}
    >
      <FiArrowUp className="h-[18px] w-[18px]" />
    </button>
  );
}
