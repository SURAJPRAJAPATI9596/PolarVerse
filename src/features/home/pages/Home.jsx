import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/* ============================================================================
   PolarVerse — Home
   Editorial landing page. Photography-first. No nav, no footer.
   ========================================================================== */

/* ----------------------------- image helper ------------------------------- */
const img = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const IMG = {
  hero: '1551986782-d0169b3f8fa7',
  mission: '1613573081262-69e37dfd72f1',
  expedition: '1517299321609-52687d1bc55a',
  data: '1483664852095-d6cc6870702d',
  research: '1532187863486-abf9dbad1b69',
  media: '1531366936337-7c912a4589a7',
  academy: '1520637836862-4d197d17c50a',
  publications: '1454391304352-2bf4678b1a7a',
  station1: '1516409304046-9d4a8b4b9c7e',
  station2: '1518877593221-1f28583780b4',
  station3: '1551986782-d0169b3f8fa7',
  station4: '1483664852095-d6cc6870702d',
  g1: '1531366936337-7c912a4589a7',
  g2: '1483664852095-d6cc6870702d',
  g3: '1613573081262-69e37dfd72f1',
  g4: '1517299321609-52687d1bc55a',
  g5: '1520637836862-4d197d17c50a',
  g6: '1518877593221-1f28583780b4',
  cta: '1517299321609-52687d1bc55a',
};

/* ------------------------------- hooks ------------------------------------ */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -80px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, shown];
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(22px)',
        transition: `opacity 900ms cubic-bezier(.16,1,.3,1) ${delay}ms, transform 900ms cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Counter({ to, decimals = 0, duration = 1600, suffix = '' }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!seen) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, duration]);
  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ------------------------------ content ----------------------------------- */
const PILLARS = [
  {
    key: 'expedition',
    label: 'Expeditions',
    title: 'Every mission, in one log',
    body: 'Vessel tracking, station rotations, sample custody. From sail plan to lab bench, in one operational record.',
    image: IMG.expedition,
    size: 'large',
  },
  {
    key: 'data',
    label: 'Datasets',
    title: 'A queryable polar archive',
    body: 'Twelve thousand datasets, harmonised and DOI-minted.',
    image: IMG.data,
    size: 'small',
  },
  {
    key: 'research',
    label: 'Research',
    title: 'Projects linked to outcomes',
    body: 'Investigators, instruments and field sites, cross-referenced against every dataset and paper they produced.',
    textOnly: true,
  },
  {
    key: 'publications',
    label: 'Publications',
    title: '1,280 papers, one graph',
    body: 'A living bibliography with citation links and author networks.',
    image: IMG.publications,
    size: 'small',
  },
  {
    key: 'media',
    label: 'Media',
    title: 'Field footage & station cams',
    body: 'Ice-core drills, drone surveys, satellite mosaics. Geotagged, time-stamped, rights-cleared.',
    image: IMG.media,
    size: 'large',
  },
  {
    key: 'academy',
    label: 'Academy',
    title: 'Learning, for every level',
    body: 'Curriculum-aligned paths from sea-ice physics to polar survival logistics.',
    textOnly: true,
  },
];

const DEEP_DIVES = [
  {
    eyebrow: '01 — Expedition Command',
    title: 'Follow an expedition as it happens.',
    body: 'Vessel positions, weather windows, field-party check-ins and the full chain of custody from ice core to laboratory bench — all on a single live view. Historical expeditions remain fully replayable.',
    bullets: [
      'Live vessel and station telemetry',
      'Day-wise logs with field photography',
      'Sample custody chain, ice to lab',
      'Auto-generated seasonal and annual reports',
    ],
    image: IMG.expedition,
    reverse: false,
  },
  {
    eyebrow: '02 — Polar Data Lake',
    title: 'Forty years of observation, one query.',
    body: 'Glaciology, oceanography, atmospherics and geophysics — harmonised into a single, versioned store. Native support for NetCDF, HDF5, GeoTIFF and CSV, with an open REST API and Python SDK.',
    bullets: [
      'Spatio-temporal faceted search',
      'Version history and DOI minting',
      'One-line Python ingestion',
      'Programmatic export to standard formats',
    ],
    image: IMG.data,
    reverse: true,
  },
];

const STATIONS = [
  {
    name: 'Himadri',
    region: 'Ny-Ålesund, Svalbard',
    since: '2008',
    lat: '78.9° N',
    temp: '−14 °C',
    image: IMG.station1,
    live: true,
  },
  {
    name: 'Maitri',
    region: 'Schirmacher Oasis, Antarctica',
    since: '1989',
    lat: '70.7° S',
    temp: '−27 °C',
    image: IMG.station2,
    live: true,
  },
  {
    name: 'Bharati',
    region: 'Larsemann Hills, Antarctica',
    since: '2012',
    lat: '69.4° S',
    temp: '−31 °C',
    image: IMG.station3,
    live: true,
  },
  {
    name: 'Dakshin Gangotri',
    region: 'Princess Astrid Coast, Antarctica',
    since: '1983',
    lat: '70.1° S',
    temp: 'Heritage',
    image: IMG.station4,
    live: false,
  },
];

const TIMELINE = [
  { year: '1981', text: 'First Indian expedition sets sail for Antarctica.' },
  { year: '1983', text: 'Dakshin Gangotri commissioned on the Princess Astrid Coast.' },
  { year: '1989', text: 'Maitri base established in the Schirmacher Oasis.' },
  { year: '2008', text: "Himadri opens at Ny-Ålesund, marking India's arrival in the Arctic." },
  { year: '2012', text: 'Bharati commissioned — a low-energy station in the Larsemann Hills.' },
  { year: '2026', text: 'PolarVerse unifies the programme into a single platform.' },
];

const INSTITUTIONS = [
  'NCPOR',
  'Ministry of Earth Sciences',
  'ISRO',
  'DST',
  'INCOIS',
  'IITM',
  'NIOT',
];

const GALLERY = [
  { src: IMG.g1, caption: 'Aurora over Himadri · Svalbard', h: 'h-[420px]' },
  { src: IMG.g2, caption: 'Sea-ice survey · Southern Ocean', h: 'h-[420px]' },
  { src: IMG.g3, caption: 'Glacier tongue · Larsemann Hills', h: 'h-[420px]' },
  { src: IMG.g4, caption: 'Field camp · East Antarctica', h: 'h-[320px]' },
  { src: IMG.g5, caption: 'Ice cave survey · 2024', h: 'h-[320px]' },
  { src: IMG.g6, caption: 'Drift ice · 2025', h: 'h-[320px]' },
];

const HERO_STATS = [
  { v: 43, suffix: '', label: 'Expeditions logged' },
  { v: 4, suffix: '', label: 'Stations online' },
  { v: 12.4, suffix: 'K', decimals: 1, label: 'Curated datasets' },
  { v: 1280, suffix: '+', label: 'Papers indexed' },
];

/* ================================ SECTIONS ================================ */

function Hero() {
  return (
    <section className="relative isolate min-h-[92svh] overflow-hidden">
      {/* backdrop */}
      <div className="absolute inset-0 -z-10">
        <img
          src={img(IMG.hero, 2400)}
          alt="Iceberg in Antarctic waters"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04070F] via-[#04070F]/55 to-[#04070F]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04070F]/70 via-transparent to-transparent" />
      </div>

      <div className="mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-between px-5 pb-14 pt-24 sm:px-8 sm:pt-28">
        <div className="max-w-3xl">
          <Reveal delay={80}>
            <h1 className="text-[2.4rem] font-medium leading-[1.05] tracking-[-0.035em] text-white sm:text-[3.6rem] lg:text-[4.4rem]">
              India's polar science,
              <br />
              <span className="text-white/60">finally in one place.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-[15.5px] leading-relaxed text-white/70">
              Four decades of expeditions, observations, datasets and publications from the
              Antarctic, Arctic and Himalaya — connected, searchable, and open to anyone who needs
              them.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/explore"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[13.5px] font-medium text-[#04070F] transition-colors hover:bg-white/90"
              >
                Explore the platform
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link
                to="/media/film"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[13.5px] font-medium text-white/90 backdrop-blur-sm transition-colors hover:border-white/50 hover:text-white"
              >
                Watch the film
              </Link>
            </div>
          </Reveal>
        </div>

        {/* stat row */}
        <Reveal delay={320}>
          <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/15 pt-7 sm:grid-cols-4">
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <div className="text-[1.6rem] font-medium tracking-tight text-white">
                  <Counter to={s.v} suffix={s.suffix} decimals={s.decimals || 0} />
                </div>
                <div className="mt-1.5 text-[11.5px] uppercase tracking-[0.14em] text-white/50">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Institutions() {
  return (
    <section className="border-b border-[var(--color-border)] py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10">
            <p className="shrink-0 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
              Aligned with
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {INSTITUTIONS.map((n) => (
                <span
                  key={n}
                  className="text-[13.5px] font-medium tracking-tight text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-accent-primary)]">
                <span className="h-px w-8 bg-[var(--color-accent-primary)]" />
                The premise
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-[1.85rem] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[2.4rem]">
                Four decades of work, previously scattered across filing cabinets.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                Since 1981, Indian scientists have logged tens of thousands of hours of polar
                observation. PolarVerse is the layer that makes all of it findable — linking every
                expedition to the datasets it produced and the papers it led to.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <Link
                to="/about"
                className="mt-8 inline-flex items-center gap-2 text-[13.5px] font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent-primary)]"
              >
                Read the programme history
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <figure>
                <div className="overflow-hidden rounded-sm bg-[var(--color-bg-secondary)]">
                  <img
                    src={img(IMG.mission, 1600)}
                    alt="Glacier surface in the Larsemann Hills"
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-3 text-[12px] text-[var(--color-text-secondary)]">
                  Glacier survey, Larsemann Hills — field season 2024. Photo: NCPOR archives.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="border-t border-[var(--color-border)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-accent-primary)]">
                <span className="h-px w-8 bg-[var(--color-accent-primary)]" />
                What's inside
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-[1.85rem] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[2.4rem]">
                Six connected workspaces.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={140}>
              <p className="text-[15px] leading-relaxed text-[var(--color-text-secondary)] lg:pt-14">
                Each is a fully-built tool rather than a landing page. Move between them without
                losing context — a paper opens its datasets; a dataset opens the expedition that
                collected it.
              </p>
            </Reveal>
          </div>
        </div>

        {/* editorial grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-6">
          {PILLARS.map((p, i) => {
            const span =
              p.size === 'large'
                ? 'md:col-span-4'
                : p.size === 'small'
                  ? 'md:col-span-2'
                  : 'md:col-span-3';

            return (
              <Reveal key={p.key} delay={i * 70} className={span}>
                {p.textOnly ? (
                  <div className="flex h-full flex-col justify-between rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
                    <div>
                      <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                        {p.label}
                      </div>
                      <h3 className="mt-4 text-[19px] font-medium leading-snug tracking-tight text-[var(--color-text-primary)]">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
                        {p.body}
                      </p>
                    </div>
                    <div className="mt-8">
                      <Link
                        to={`/${p.key}`}
                        className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent-primary)]"
                      >
                        Open
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3.5 w-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={`/${p.key}`}
                    className="group relative block h-full overflow-hidden rounded-sm bg-[#0B1120]"
                  >
                    <div className="aspect-[4/3] md:aspect-auto md:h-[320px]">
                      <img
                        src={img(p.image, 1400)}
                        alt={p.title}
                        className="h-full w-full object-cover opacity-90 transition-transform duration-[900ms] group-hover:scale-[1.04] group-hover:opacity-100"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04070F] via-[#04070F]/40 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">
                        {p.label}
                      </div>
                      <h3 className="mt-2 text-[19px] font-medium leading-snug tracking-tight text-white">
                        {p.title}
                      </h3>
                      <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-white/70">
                        {p.body}
                      </p>
                    </div>
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DeepDives() {
  return (
    <section className="border-t border-[var(--color-border)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl space-y-28 px-5 sm:px-8">
        {DEEP_DIVES.map((d, i) => (
          <div
            key={d.eyebrow}
            className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16 ${
              d.reverse ? '' : ''
            }`}
          >
            <Reveal
              delay={80}
              className={`lg:col-span-7 ${d.reverse ? 'lg:order-2 lg:col-start-6' : ''}`}
            >
              <div className="overflow-hidden rounded-sm bg-[var(--color-bg-secondary)]">
                <img
                  src={img(d.image, 1600)}
                  alt={d.title}
                  className="aspect-[16/11] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>

            <div className={`lg:col-span-5 ${d.reverse ? 'lg:order-1 lg:col-start-1' : ''}`}>
              <Reveal>
                <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-accent-primary)]">
                  {d.eyebrow}
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h3 className="mt-5 text-[1.7rem] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[2rem]">
                  {d.title}
                </h3>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-5 text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  {d.body}
                </p>
              </Reveal>
              <Reveal delay={200}>
                <ul className="mt-7 space-y-3 border-t border-[var(--color-border)] pt-6">
                  {d.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-[13.5px] leading-relaxed text-[var(--color-text-primary)]"
                    >
                      <span className="mt-[9px] h-1 w-4 shrink-0 bg-[var(--color-accent-primary)]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Stations() {
  return (
    <section className="border-t border-[var(--color-border)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-accent-primary)]">
                <span className="h-px w-8 bg-[var(--color-accent-primary)]" />
                Field presence
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-[1.85rem] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[2.4rem]">
                Four stations. Two hemispheres.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <div className="flex items-center gap-2 text-[12.5px] text-[var(--color-text-secondary)]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />3 stations
              reporting live
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATIONS.map((s, i) => (
            <Reveal key={s.name} delay={i * 80}>
              <div className="group">
                <div className="relative overflow-hidden rounded-sm bg-[var(--color-bg-secondary)]">
                  <img
                    src={img(s.image, 900)}
                    alt={s.name}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  {s.live && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      Live
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <h3 className="text-[16px] font-medium tracking-tight text-[var(--color-text-primary)]">
                    {s.name}
                  </h3>
                  <span className="text-[12px] font-mono text-[var(--color-text-secondary)]">
                    {s.lat}
                  </span>
                </div>
                <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  {s.region}
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-[var(--color-border)] pt-3 text-[12px]">
                  <span className="text-[var(--color-text-secondary)]">Since {s.since}</span>
                  <span className="font-medium text-[var(--color-text-primary)]">{s.temp}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="border-t border-[var(--color-border)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-accent-primary)]">
                <span className="h-px w-8 bg-[var(--color-accent-primary)]" />
                1981 — today
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-[1.85rem] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[2.2rem]">
                Four decades, in six lines.
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {TIMELINE.map((t, i) => (
                <Reveal key={t.year} delay={i * 60}>
                  <li className="grid grid-cols-[80px_1fr] items-baseline gap-6 py-5 sm:grid-cols-[100px_1fr]">
                    <span className="text-[13px] font-mono text-[var(--color-accent-primary)]">
                      {t.year}
                    </span>
                    <span className="text-[14px] leading-relaxed text-[var(--color-text-primary)]">
                      {t.text}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="border-t border-[var(--color-border)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-accent-primary)]">
                <span className="h-px w-8 bg-[var(--color-accent-primary)]" />
                Field archive
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-[1.85rem] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[2.2rem]">
                From the ice.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <Link
              to="/media"
              className="inline-flex items-center gap-2 text-[13.5px] font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent-primary)]"
            >
              Open the media vault
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-6">
          <Reveal className="col-span-2 md:col-span-3">
            <figure>
              <div className="overflow-hidden rounded-sm bg-[var(--color-bg-secondary)]">
                <img
                  src={img(GALLERY[0].src, 1200)}
                  alt={GALLERY[0].caption}
                  className="h-[340px] w-full object-cover sm:h-[440px]"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-2.5 text-[11.5px] text-[var(--color-text-secondary)]">
                {GALLERY[0].caption}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={80} className="col-span-2 md:col-span-3">
            <figure>
              <div className="overflow-hidden rounded-sm bg-[var(--color-bg-secondary)]">
                <img
                  src={img(GALLERY[1].src, 1200)}
                  alt={GALLERY[1].caption}
                  className="h-[340px] w-full object-cover sm:h-[440px]"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-2.5 text-[11.5px] text-[var(--color-text-secondary)]">
                {GALLERY[1].caption}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={120} className="col-span-2 md:col-span-2">
            <figure>
              <div className="overflow-hidden rounded-sm bg-[var(--color-bg-secondary)]">
                <img
                  src={img(GALLERY[2].src, 900)}
                  alt={GALLERY[2].caption}
                  className="h-[260px] w-full object-cover sm:h-[300px]"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-2.5 text-[11.5px] text-[var(--color-text-secondary)]">
                {GALLERY[2].caption}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={160} className="col-span-1 md:col-span-2">
            <figure>
              <div className="overflow-hidden rounded-sm bg-[var(--color-bg-secondary)]">
                <img
                  src={img(GALLERY[3].src, 900)}
                  alt={GALLERY[3].caption}
                  className="h-[260px] w-full object-cover sm:h-[300px]"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-2.5 text-[11.5px] text-[var(--color-text-secondary)]">
                {GALLERY[3].caption}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={200} className="col-span-1 md:col-span-2">
            <figure>
              <div className="overflow-hidden rounded-sm bg-[var(--color-bg-secondary)]">
                <img
                  src={img(GALLERY[4].src, 900)}
                  alt={GALLERY[4].caption}
                  className="h-[260px] w-full object-cover sm:h-[300px]"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-2.5 text-[11.5px] text-[var(--color-text-secondary)]">
                {GALLERY[4].caption}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative isolate overflow-hidden border-t border-[var(--color-border)]">
      <div className="absolute inset-0 -z-10">
        <img
          src={img(IMG.cta, 2400)}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#04070F]/70" />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-40">
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="text-[2rem] font-medium leading-[1.1] tracking-[-0.03em] text-white sm:text-[3rem]">
              Start with a single question.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/70">
              Search the archive, follow an expedition, or open a dataset directly. No account
              needed to read; one to contribute.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/explore"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[13.5px] font-medium text-[#04070F] transition-colors hover:bg-white/90"
              >
                Start exploring
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link
                to="/contribute"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[13.5px] font-medium text-white/90 backdrop-blur-sm transition-colors hover:border-white/50 hover:text-white"
              >
                Contribute data
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================= PAGE =================================== */
export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] antialiased mt-1">
      <main>
        <Hero />
        <Institutions />
        <Mission />
        <Pillars />
        <DeepDives />
        <Stations />
        <Timeline />
        <Gallery />
        <CTA />
      </main>
    </div>
  );
}
