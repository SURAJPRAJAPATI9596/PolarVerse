import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiSearch,
  FiFilter,
  FiX,
  FiArrowRight,
  FiArrowUpRight,
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiGrid,
  FiList,
  FiFileText,
  FiDatabase,
  FiBookOpen,
  FiImage,
  FiVideo,
  FiActivity,
  FiLayers,
  FiGlobe,
  FiThermometer,
  FiDroplet,
  FiWind,
  FiFeather,
  FiCompass,
  FiCircle,
} from 'react-icons/fi';
import { GiSnowflake1 } from 'react-icons/gi';

/* ============================================================================
   Expeditions — discovery page for PolarVerse
   ========================================================================== */

/* -------------------------------------------------------------------------- */
/*  Images (centralized so they can be swapped for API-driven media later)    */
/* -------------------------------------------------------------------------- */
const IMG = {
  hero: 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?auto=format&fit=crop&w=2400&q=80',
  featured:
    'https://images.unsplash.com/photo-1613573081262-69e37dfd72f1?auto=format&fit=crop&w=2000&q=80',
  map: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1800&q=80',
  cta: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=2400&q=80',
  e1: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=1200&q=80',
  e2: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1200&q=80',
  e3: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
  e4: 'https://images.unsplash.com/photo-1520637836862-4d197d17c50a?auto=format&fit=crop&w=1200&q=80',
  e5: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?auto=format&fit=crop&w=1200&q=80',
  e6: 'https://images.unsplash.com/photo-1613573081262-69e37dfd72f1?auto=format&fit=crop&w=1200&q=80',
  e7: 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?auto=format&fit=crop&w=1200&q=80',
  e8: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80',
  e9: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1200&q=80',
};

/* -------------------------------------------------------------------------- */
/*  Demo dataset — swap with GET /api/v1/expeditions later                    */
/* -------------------------------------------------------------------------- */
const EXPEDITIONS = [
  {
    id: 'exp-43',
    number: '43',
    title: 'Indian Antarctic Expedition',
    region: 'Antarctic',
    location: 'Larsemann Hills, East Antarctica',
    year: 2026,
    status: 'Active',
    areas: ['Climate', 'Atmospheric Science', 'Oceanography'],
    researchers: 42,
    summary:
      'Environmental and atmospheric research across the Antarctic coast, with coordinated field observation and data collection.',
    image: IMG.e1,
    counts: { reports: 12, datasets: 8, publications: 15, photos: 120, videos: 14 },
  },
  {
    id: 'exp-arctic-12',
    number: 'AR-12',
    title: 'Arctic Atmospheric Research Expedition',
    region: 'Arctic',
    location: 'Ny-Ålesund, Svalbard',
    year: 2025,
    status: 'Completed',
    areas: ['Atmospheric Science', 'Climate'],
    researchers: 24,
    summary:
      'Long-term atmospheric monitoring and aerosol characterisation at the Himadri station.',
    image: IMG.e2,
    counts: { reports: 9, datasets: 11, publications: 6, photos: 84, videos: 7 },
  },
  {
    id: 'exp-so-27',
    number: 'SO-27',
    title: 'Southern Ocean Research Mission',
    region: 'Antarctic',
    location: 'Southern Ocean · Prydz Bay',
    year: 2024,
    status: 'Completed',
    areas: ['Oceanography', 'Biology'],
    researchers: 31,
    summary:
      'Physical and biological oceanography across the Southern Ocean, focusing on productivity and carbon uptake.',
    image: IMG.e3,
    counts: { reports: 14, datasets: 19, publications: 22, photos: 210, videos: 18 },
  },
  {
    id: 'exp-ice-09',
    number: 'IC-09',
    title: 'Ice Sheet Monitoring Expedition',
    region: 'Antarctic',
    location: 'Dronning Maud Land',
    year: 2024,
    status: 'Completed',
    areas: ['Glaciology', 'Climate'],
    researchers: 18,
    summary:
      'Repeated glacier surveys and mass-balance measurements on a coastal ice sheet sector.',
    image: IMG.e4,
    counts: { reports: 6, datasets: 22, publications: 9, photos: 96, videos: 11 },
  },
  {
    id: 'exp-bio-04',
    number: 'MB-04',
    title: 'Polar Marine Biodiversity Expedition',
    region: 'Antarctic',
    location: 'Larsemann Hills coastal waters',
    year: 2023,
    status: 'Completed',
    areas: ['Biology', 'Oceanography'],
    researchers: 22,
    summary:
      'Benthic and pelagic biodiversity surveys in coastal Antarctic waters, using standard sampling protocols.',
    image: IMG.e5,
    counts: { reports: 8, datasets: 14, publications: 17, photos: 148, videos: 9 },
  },
  {
    id: 'exp-arc-glac',
    number: 'AG-06',
    title: 'Arctic Glacier Study Expedition',
    region: 'Arctic',
    location: 'Svalbard glaciers',
    year: 2023,
    status: 'Completed',
    areas: ['Glaciology', 'Climate'],
    researchers: 15,
    summary:
      'Field glaciology in Svalbard — ablation monitoring and glacier dynamics over a seasonal cycle.',
    image: IMG.e6,
    counts: { reports: 5, datasets: 12, publications: 4, photos: 62, videos: 6 },
  },
  {
    id: 'exp-geo-02',
    number: 'GG-02',
    title: 'Antarctic Geology Survey Expedition',
    region: 'Antarctic',
    location: 'Schirmacher Oasis',
    year: 2022,
    status: 'Completed',
    areas: ['Geology', 'Climate'],
    researchers: 12,
    summary:
      'Bedrock and sediment sampling to document the geological evolution of the Schirmacher region.',
    image: IMG.e7,
    counts: { reports: 4, datasets: 6, publications: 8, photos: 74, videos: 3 },
  },
  {
    id: 'exp-arc-himadri',
    number: 'AR-09',
    title: 'Himadri Winter Over Expedition',
    region: 'Arctic',
    location: 'Ny-Ålesund, Svalbard',
    year: 2022,
    status: 'Completed',
    areas: ['Atmospheric Science', 'Biology'],
    researchers: 9,
    summary:
      'Winter-over observations at Himadri, tracking seasonal variability in air and snow chemistry.',
    image: IMG.e8,
    counts: { reports: 3, datasets: 8, publications: 5, photos: 48, videos: 4 },
  },
  {
    id: 'exp-hist-01',
    number: '01',
    title: 'First Indian Antarctic Expedition',
    region: 'Antarctic',
    location: 'Princess Astrid Coast',
    year: 1981,
    status: 'Completed',
    areas: ['Geology', 'Climate'],
    researchers: 21,
    summary:
      'The maiden Indian voyage to Antarctica — establishing the scientific and logistical foundation of the programme.',
    image: IMG.e9,
    counts: { reports: 2, datasets: 3, publications: 4, photos: 24, videos: 0 },
  },
  {
    id: 'exp-arc-45',
    number: 'AR-45',
    title: 'Arctic Marine Microbiology Expedition',
    region: 'Arctic',
    location: 'Kongsfjorden, Svalbard',
    year: 2026,
    status: 'Upcoming',
    areas: ['Biology', 'Oceanography'],
    researchers: 16,
    summary:
      'Planned microbiological sampling in Kongsfjorden, focused on microbial community structure in Arctic fjords.',
    image: IMG.e2,
    counts: { reports: 0, datasets: 0, publications: 0, photos: 0, videos: 0 },
  },
];

/* Research areas — each with a representative icon */
const RESEARCH_AREAS = [
  {
    key: 'Climate',
    icon: FiThermometer,
    blurb: 'Long-term climate variability across polar latitudes.',
  },
  { key: 'Glaciology', icon: FiLayers, blurb: 'Ice sheets, glacier mass balance and dynamics.' },
  { key: 'Oceanography', icon: FiDroplet, blurb: 'Ocean circulation, sea-ice and productivity.' },
  { key: 'Biology', icon: FiFeather, blurb: 'Marine and terrestrial polar ecosystems.' },
  {
    key: 'Atmospheric Science',
    icon: FiWind,
    blurb: 'Aerosols, snow chemistry and air-mass transport.',
  },
  { key: 'Geology', icon: FiCompass, blurb: 'Bedrock, sediments and geological evolution.' },
  { key: 'Remote Sensing', icon: FiGlobe, blurb: 'Satellite observation of polar surfaces.' },
];

/* Statistics (demo values — replace with backend when available) */
const STATS = [
  { label: 'Expeditions logged', value: 120, suffix: '+' },
  { label: 'Research areas', value: 7, suffix: '' },
  { label: 'Polar stations', value: 4, suffix: '' },
  { label: 'Researchers engaged', value: 480, suffix: '+' },
];

/* Timeline milestones (subset used for the visual journey) */
const TIMELINE = [
  { year: 1981, id: 'exp-hist-01', number: '01', region: 'Antarctic', title: 'First voyage' },
  { year: 1983, id: 'exp-hist-01', number: '02', region: 'Antarctic', title: 'Dakshin Gangotri' },
  { year: 1989, id: 'exp-hist-01', number: '12', region: 'Antarctic', title: 'Maitri base' },
  { year: 2008, id: 'exp-arc-12', number: 'AR-02', region: 'Arctic', title: 'Himadri opens' },
  {
    year: 2012,
    id: 'exp-ice-09',
    number: 'IC-05',
    region: 'Antarctic',
    title: 'Bharati commissioned',
  },
  { year: 2026, id: 'exp-43', number: '43', region: 'Antarctic', title: 'Expedition 43 active' },
];

const REGIONS = ['All', 'Arctic', 'Antarctic'];
const STATUSES = ['All', 'Active', 'Completed', 'Upcoming'];
const YEARS = [
  { key: 'all', label: 'All Years' },
  { key: 'recent', label: '2022 & later' },
  { key: 'older', label: 'Before 2022' },
];
const SORTS = [
  { key: 'newest', label: 'Newest first' },
  { key: 'oldest', label: 'Oldest first' },
  { key: 'name', label: 'Name (A–Z)' },
];

/* -------------------------------------------------------------------------- */
/*  Small helpers                                                             */
/* -------------------------------------------------------------------------- */
const AC = 'var(--color-accent-primary)';
const AC_SOFT = 'color-mix(in srgb, var(--color-accent-primary) 10%, transparent)';

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
      { threshold, rootMargin: '0px 0px -60px 0px' }
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
        transform: shown ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 700ms cubic-bezier(.16,1,.3,1) ${delay}ms, transform 700ms cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Counter({ to, suffix = '', duration = 1400 }) {
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
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, duration]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

function RegionBadge({ region, size = 'sm' }) {
  const isArctic = region === 'Arctic';
  const cls = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[11px]';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-semibold uppercase tracking-[0.12em] ${cls}`}
      style={{
        borderColor: isArctic
          ? 'color-mix(in srgb, var(--color-accent-secondary) 45%, transparent)'
          : 'color-mix(in srgb, var(--color-accent-primary) 45%, transparent)',
        background: isArctic
          ? 'color-mix(in srgb, var(--color-accent-secondary) 12%, transparent)'
          : AC_SOFT,
        color: isArctic ? 'var(--color-accent-secondary)' : AC,
      }}
    >
      <FiMapPin className="h-2.5 w-2.5" />
      {region}
    </span>
  );
}

function StatusDot({ status }) {
  const color =
    status === 'Active'
      ? 'rgb(16 185 129)'
      : status === 'Upcoming'
        ? 'rgb(59 130 246)'
        : 'var(--color-text-secondary)';
  return (
    <span className="inline-flex items-center gap-1.5 text-[11.5px] font-medium" style={{ color }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {status}
    </span>
  );
}

function Chip({ children, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
      style={{
        borderColor: active ? AC : 'var(--color-border)',
        background: active ? AC_SOFT : 'var(--color-bg-primary)',
        color: active ? AC : 'var(--color-text-secondary)',
      }}
    >
      {children}
    </button>
  );
}

/* ========================================================================== */
/*  Page                                                                      */
/* ========================================================================== */
export default function Expeditions({ dark, setDark }) {
  /* ---- filter state ------------------------------------------------------ */
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('All');
  const [yearRange, setYearRange] = useState('all');
  const [status, setStatus] = useState('All');
  const [area, setArea] = useState(null);
  const [sort, setSort] = useState('newest');
  const [view, setView] = useState('grid');

  /* ---- derived list ------------------------------------------------------ */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = EXPEDITIONS.filter((e) => {
      if (region !== 'All' && e.region !== region) return false;
      if (status !== 'All' && e.status !== status) return false;
      if (area && !e.areas.includes(area)) return false;

      if (yearRange === 'recent' && e.year < 2022) return false;
      if (yearRange === 'older' && e.year >= 2022) return false;

      if (q) {
        const hay =
          `${e.title} ${e.location} ${e.year} ${e.number} ${e.areas.join(' ')} ${e.summary}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === 'newest') return b.year - a.year;
      if (sort === 'oldest') return a.year - b.year;
      if (sort === 'name') return a.title.localeCompare(b.title);
      return 0;
    });

    return list;
  }, [query, region, yearRange, status, area, sort]);

  const featured = EXPEDITIONS[0];
  const hasFilters =
    query !== '' || region !== 'All' || yearRange !== 'all' || status !== 'All' || area !== null;

  const clearFilters = () => {
    setQuery('');
    setRegion('All');
    setYearRange('all');
    setStatus('All');
    setArea(null);
    setSort('newest');
  };

  return (
    <div
      className="min-h-screen antialiased"
      style={{
        background: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
      }}
    >
      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={IMG.hero}
            alt="Iceberg drifting in Antarctic waters"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04070F] via-[#04070F]/65 to-[#04070F]/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04070F]/75 via-transparent to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-5 pb-20 pt-24 sm:px-8 sm:pb-24 sm:pt-32">
          <Reveal>
            <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/70">
              <span className="h-px w-8 bg-white/40" />
              Polar Exploration · Research · Discovery
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 max-w-3xl text-[2.2rem] font-medium leading-[1.05] tracking-[-0.035em] text-white sm:text-[3.4rem] lg:text-[4rem]">
              Explore polar expeditions.
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-[16px]">
              Discover expeditions, research missions, field observations, and scientific journeys
              across the Arctic and Antarctic — each connected to the datasets, reports and
              publications it produced.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#explorer"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[13.5px] font-medium text-[#04070F] transition-colors hover:bg-white/90"
              >
                Explore expeditions
                <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <Link
                to="/map"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[13.5px] font-medium text-white/90 backdrop-blur-sm transition-colors hover:border-white/50 hover:text-white"
              >
                <FiGlobe className="h-3.5 w-3.5" />
                View polar map
              </Link>
            </div>
          </Reveal>

          {/* latitude strip */}
          <Reveal delay={280}>
            <div className="mt-16 flex items-center gap-3 border-t border-white/15 pt-6 text-[11px] font-mono uppercase tracking-[0.18em] text-white/50">
              <span>78.9° N</span>
              <span className="h-px flex-1 bg-white/15" />
              <span>66.5° N · Arctic Circle</span>
              <span className="hidden h-px flex-1 bg-white/15 sm:block" />
              <span className="hidden sm:inline">66.5° S · Antarctic Circle</span>
              <span className="h-px flex-1 bg-white/15" />
              <span>69.4° S</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/* STATISTICS                                                       */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p
                  className="text-[11px] font-medium uppercase tracking-[0.22em]"
                  style={{ color: AC }}
                >
                  Programme at a glance
                </p>
                <h2 className="mt-3 text-[1.35rem] font-medium tracking-tight text-[var(--color-text-primary)] sm:text-[1.5rem]">
                  A compact index of India's polar activity
                </h2>
              </div>
              <p className="hidden max-w-xs text-[11.5px] leading-relaxed text-[var(--color-text-secondary)] sm:block">
                Sample figures for demonstration — replaced by live values when the data API is
                connected.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div>
                  <div className="text-[1.9rem] font-medium tracking-tight text-[var(--color-text-primary)] sm:text-[2.2rem]">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-2 text-[11.5px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SEARCH & FILTERS                                                 */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p
                  className="text-[11px] font-medium uppercase tracking-[0.22em]"
                  style={{ color: AC }}
                >
                  Find an expedition
                </p>
                <h2 className="mt-3 text-[1.35rem] font-medium tracking-tight text-[var(--color-text-primary)] sm:text-[1.5rem]">
                  Search and narrow the archive
                </h2>
              </div>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12.5px] font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <FiX className="h-3.5 w-3.5" />
                  Clear filters
                </button>
              )}
            </div>
          </Reveal>

          {/* search input */}
          <Reveal delay={80}>
            <div className="relative mt-8">
              <FiSearch
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-secondary)]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by expedition name, location, year, or research area…"
                aria-label="Search expeditions"
                className="w-full rounded-xl border py-3.5 pl-11 pr-4 text-[14px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                style={{
                  background: 'var(--color-bg-secondary)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-primary)',
                }}
              />
            </div>
          </Reveal>

          {/* filter rows */}
          <div className="mt-8 space-y-6">
            {/* region + status */}
            <Reveal delay={120}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                    <FiMapPin className="h-3 w-3" />
                    Region
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {REGIONS.map((r) => (
                      <Chip key={r} active={region === r} onClick={() => setRegion(r)}>
                        {r}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                    <FiActivity className="h-3 w-3" />
                    Status
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {STATUSES.map((s) => (
                      <Chip key={s} active={status === s} onClick={() => setStatus(s)}>
                        {s}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* year + sort */}
            <Reveal delay={160}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                    <FiCalendar className="h-3 w-3" />
                    Year
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {YEARS.map((y) => (
                      <Chip
                        key={y.key}
                        active={yearRange === y.key}
                        onClick={() => setYearRange(y.key)}
                      >
                        {y.label}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                    <FiFilter className="h-3 w-3" />
                    Sort
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SORTS.map((s) => (
                      <Chip key={s.key} active={sort === s.key} onClick={() => setSort(s.key)}>
                        {s.label}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* research area */}
            <Reveal delay={200}>
              <div>
                <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                  <FiLayers className="h-3 w-3" />
                  Research area
                </div>
                <div className="flex flex-wrap gap-2">
                  <Chip active={area === null} onClick={() => setArea(null)}>
                    Any
                  </Chip>
                  {RESEARCH_AREAS.map((r) => (
                    <Chip key={r.key} active={area === r.key} onClick={() => setArea(r.key)}>
                      {r.key}
                    </Chip>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FEATURED EXPEDITION                                              */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div
              className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em]"
              style={{ color: AC }}
            >
              <span className="h-px w-8" style={{ background: AC }} />
              Featured expedition
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
              {/* image */}
              <div className="lg:col-span-7">
                <Link
                  to={`/expeditions/${featured.id}`}
                  className="group relative block overflow-hidden rounded-sm"
                >
                  <img
                    src={IMG.featured}
                    alt="Antarctic research field site"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.02]"
                  />
                  <span
                    className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
                    style={{
                      background: 'rgba(4,7,15,0.72)',
                      color: '#fff',
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Live · Expedition {featured.number}
                  </span>
                </Link>
              </div>

              {/* copy */}
              <div className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-3">
                  <RegionBadge region={featured.region} size="md" />
                  <StatusDot status={featured.status} />
                </div>

                <h3 className="mt-5 text-[1.6rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.9rem]">
                  {featured.title}
                </h3>

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-[var(--color-text-secondary)]">
                  <span className="inline-flex items-center gap-1.5">
                    <FiCalendar className="h-3.5 w-3.5" /> {featured.year}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FiMapPin className="h-3.5 w-3.5" /> {featured.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FiUsers className="h-3.5 w-3.5" /> {featured.researchers} researchers
                  </span>
                </div>

                <p className="mt-6 text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  {featured.summary}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {featured.areas.map((a) => (
                    <span
                      key={a}
                      className="rounded-full border px-2.5 py-1 text-[11px] font-medium"
                      style={{
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {a}
                    </span>
                  ))}
                </div>

                {/* connected counts */}
                <div
                  className="mt-8 grid grid-cols-3 gap-4 border-t pt-6"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <Stat label="Reports" value={featured.counts.reports} />
                  <Stat label="Datasets" value={featured.counts.datasets} />
                  <Stat label="Publications" value={featured.counts.publications} />
                </div>

                <Link
                  to={`/expeditions/${featured.id}`}
                  className="group mt-8 inline-flex items-center gap-2 text-[13.5px] font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent-primary)]"
                >
                  View expedition
                  <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/* RESEARCH AREAS                                                   */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-xl">
                <p
                  className="text-[11px] font-medium uppercase tracking-[0.22em]"
                  style={{ color: AC }}
                >
                  What polar expeditions study
                </p>
                <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.75rem]">
                  Seven fields, one connected research programme.
                </h2>
              </div>
              <p className="max-w-sm text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                Click a field to narrow the expedition listing below.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {RESEARCH_AREAS.map((r, i) => {
              const Icon = r.icon;
              const count = EXPEDITIONS.filter((e) => e.areas.includes(r.key)).length;
              const active = area === r.key;
              return (
                <Reveal key={r.key} delay={i * 60}>
                  <button
                    type="button"
                    onClick={() => setArea(active ? null : r.key)}
                    aria-pressed={active}
                    className="group flex h-full w-full flex-col items-start gap-3 rounded-xl border p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                    style={{
                      borderColor: active ? AC : 'var(--color-border)',
                      background: active ? AC_SOFT : 'var(--color-bg-secondary)',
                    }}
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-lg border"
                      style={{
                        borderColor: active ? AC : 'var(--color-border)',
                        background: 'var(--color-bg-primary)',
                        color: active ? AC : 'var(--color-text-primary)',
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-[14px] font-medium text-[var(--color-text-primary)]">
                      {r.key}
                    </span>
                    <span className="text-[12.5px] leading-snug text-[var(--color-text-secondary)]">
                      {r.blurb}
                    </span>
                    <span className="mt-auto pt-3 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                      {count} {count === 1 ? 'expedition' : 'expeditions'}
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* EXPEDITION EXPLORER                                              */}
      {/* ================================================================ */}
      <section id="explorer" className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p
                  className="text-[11px] font-medium uppercase tracking-[0.22em]"
                  style={{ color: AC }}
                >
                  The archive
                </p>
                <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.75rem]">
                  All expeditions
                </h2>
                <p className="mt-3 text-[13.5px] text-[var(--color-text-secondary)]">
                  Showing{' '}
                  <span className="font-medium text-[var(--color-text-primary)]">
                    {filtered.length}
                  </span>{' '}
                  of {EXPEDITIONS.length} expeditions
                </p>
              </div>

              {/* view toggle */}
              <div
                className="inline-flex items-center gap-1 rounded-full border p-1"
                style={{ borderColor: 'var(--color-border)' }}
                role="group"
                aria-label="Layout"
              >
                <button
                  type="button"
                  onClick={() => setView('grid')}
                  aria-pressed={view === 'grid'}
                  aria-label="Grid view"
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                  style={{
                    background: view === 'grid' ? AC_SOFT : 'transparent',
                    color: view === 'grid' ? AC : 'var(--color-text-secondary)',
                  }}
                >
                  <FiGrid className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setView('list')}
                  aria-pressed={view === 'list'}
                  aria-label="List view"
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                  style={{
                    background: view === 'list' ? AC_SOFT : 'transparent',
                    color: view === 'list' ? AC : 'var(--color-text-secondary)',
                  }}
                >
                  <FiList className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </Reveal>

          {/* results */}
          {filtered.length === 0 ? (
            <Reveal>
              <div
                className="mt-12 flex flex-col items-center justify-center rounded-2xl border px-6 py-16 text-center"
                style={{
                  borderColor: 'var(--color-border)',
                  background: 'var(--color-bg-secondary)',
                }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full border"
                  style={{
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  <FiSearch className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-[16px] font-medium text-[var(--color-text-primary)]">
                  No expeditions found
                </h3>
                <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                  Try changing your search or filters to see more results from the archive.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
                    color: 'var(--color-accent-primary-foreground)',
                  }}
                >
                  <FiX className="h-3.5 w-3.5" />
                  Clear filters
                </button>
              </div>
            </Reveal>
          ) : view === 'grid' ? (
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((e, i) => (
                <Reveal key={e.id} delay={Math.min(i * 40, 200)}>
                  <ExpeditionCard expedition={e} />
                </Reveal>
              ))}
            </div>
          ) : (
            <ul className="mt-12 divide-y border-y" style={{ borderColor: 'var(--color-border)' }}>
              {filtered.map((e, i) => (
                <Reveal key={e.id} delay={Math.min(i * 30, 150)}>
                  <li>
                    <ExpeditionRow expedition={e} />
                  </li>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ================================================================ */}
      {/* TIMELINE                                                         */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="max-w-xl">
              <p
                className="text-[11px] font-medium uppercase tracking-[0.22em]"
                style={{ color: AC }}
              >
                Polar research journey
              </p>
              <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.75rem]">
                Four decades, in six milestones.
              </h2>
            </div>
          </Reveal>

          <div className="relative mt-14">
            {/* horizontal line */}
            <div
              className="absolute left-0 right-0 top-[10px] hidden h-px md:block"
              style={{ background: 'var(--color-border)' }}
            />
            <ol className="grid grid-cols-1 gap-8 md:grid-cols-6 md:gap-4">
              {TIMELINE.map((t, i) => (
                <Reveal key={`${t.year}-${t.number}`} delay={i * 70}>
                  <li className="relative">
                    <div className="flex items-center gap-3 md:block">
                      <span
                        className="relative z-10 hidden h-[21px] w-[21px] items-center justify-center rounded-full border md:flex"
                        style={{
                          borderColor: AC,
                          background: 'var(--color-bg-primary)',
                        }}
                      >
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            background:
                              'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
                          }}
                        />
                      </span>
                      <span
                        className="md:hidden inline-flex h-[21px] w-[21px] items-center justify-center rounded-full border"
                        style={{ borderColor: AC, background: 'var(--color-bg-primary)' }}
                      >
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            background:
                              'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
                          }}
                        />
                      </span>
                      <span className="text-[13px] font-mono" style={{ color: AC }}>
                        {t.year}
                      </span>
                    </div>

                    <Link
                      to={`/expeditions/${t.id}`}
                      className="group mt-4 block rounded-lg border p-4 transition-colors hover:border-[var(--color-accent-primary)] md:mt-5"
                      style={{
                        borderColor: 'var(--color-border)',
                        background: 'var(--color-bg-secondary)',
                      }}
                    >
                      <div className="text-[10.5px] font-mono uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                        Exp. {t.number} · {t.region}
                      </div>
                      <div className="mt-2 text-[13.5px] font-medium leading-snug text-[var(--color-text-primary)]">
                        {t.title}
                      </div>
                      <div
                        className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-medium opacity-0 transition-opacity group-hover:opacity-100"
                        style={{ color: AC }}
                      >
                        View
                        <FiArrowRight className="h-3 w-3" />
                      </div>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* MAP PREVIEW                                                      */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <div
                  className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em]"
                  style={{ color: AC }}
                >
                  <span className="h-px w-8" style={{ background: AC }} />
                  Geography of research
                </div>
                <h2 className="mt-5 text-[1.6rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[2rem]">
                  Where polar research takes us.
                </h2>
                <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  Four Indian stations, dozens of field sites and every expedition route plotted on
                  one interactive map — layered with the datasets and publications each location
                  produced.
                </p>

                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                  {[
                    { label: 'Himadri · Arctic', color: 'var(--color-accent-secondary)' },
                    { label: 'Maitri · Antarctic', color: 'var(--color-accent-primary)' },
                    { label: 'Bharati · Antarctic', color: 'var(--color-accent-primary)' },
                    { label: 'Field sites', color: 'var(--color-text-secondary)' },
                  ].map((l) => (
                    <span
                      key={l.label}
                      className="inline-flex items-center gap-2 text-[12px] text-[var(--color-text-secondary)]"
                    >
                      <span className="h-2 w-2 rounded-full" style={{ background: l.color }} />
                      {l.label}
                    </span>
                  ))}
                </div>

                <Link
                  to="/map"
                  className="group mt-8 inline-flex items-center gap-2 text-[13.5px] font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent-primary)]"
                >
                  Explore the polar map
                  <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Reveal>
            </div>

            {/* stylized globe */}
            <div className="lg:col-span-7">
              <Reveal delay={120}>
                <div
                  className="relative overflow-hidden rounded-2xl border"
                  style={{
                    borderColor: 'var(--color-border)',
                    background: 'var(--color-bg-secondary)',
                  }}
                >
                  <div className="relative aspect-[5/4] w-full">
                    <img
                      src={IMG.map}
                      alt="Stylised Arctic landscape — used as a backdrop for the polar map preview"
                      className="absolute inset-0 h-full w-full object-cover opacity-40"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'radial-gradient(circle at 50% 45%, transparent 0%, color-mix(in srgb, var(--color-bg-primary) 75%, transparent) 75%)',
                      }}
                    />

                    {/* SVG globe with plotting markers */}
                    <svg
                      viewBox="0 0 600 480"
                      className="absolute inset-0 h-full w-full"
                      role="img"
                      aria-label="Stylised polar globe with research locations"
                    >
                      <defs>
                        <linearGradient id="pv-globe-fill" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="0%"
                            stopColor="var(--color-accent-primary)"
                            stopOpacity="0.22"
                          />
                          <stop
                            offset="100%"
                            stopColor="var(--color-accent-secondary)"
                            stopOpacity="0.06"
                          />
                        </linearGradient>
                        <radialGradient id="pv-globe-node" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="var(--color-accent-primary)" />
                          <stop offset="100%" stopColor="var(--color-accent-secondary)" />
                        </radialGradient>
                      </defs>

                      {/* outer circle */}
                      <circle
                        cx="300"
                        cy="240"
                        r="180"
                        fill="url(#pv-globe-fill)"
                        stroke="var(--color-accent-primary)"
                        strokeOpacity="0.35"
                      />

                      {/* latitudes */}
                      {[-120, -60, 0, 60, 120].map((dy, i) => (
                        <ellipse
                          key={i}
                          cx="300"
                          cy={240 + dy}
                          rx={Math.sqrt(Math.max(180 * 180 - dy * dy, 0))}
                          ry="10"
                          fill="none"
                          stroke="var(--color-accent-primary)"
                          strokeOpacity="0.22"
                        />
                      ))}

                      {/* longitudes */}
                      {[30, 60, 90, 120, 150].map((r, i) => (
                        <ellipse
                          key={i}
                          cx="300"
                          cy="240"
                          rx={Math.abs(180 * Math.cos((r * Math.PI) / 180))}
                          ry="180"
                          fill="none"
                          stroke="var(--color-accent-primary)"
                          strokeOpacity="0.18"
                        />
                      ))}

                      {/* plotted stations */}
                      {[
                        {
                          x: 250,
                          y: 120,
                          label: 'Himadri',
                          color: 'var(--color-accent-secondary)',
                        },
                        { x: 340, y: 340, label: 'Maitri', color: 'var(--color-accent-primary)' },
                        { x: 400, y: 360, label: 'Bharati', color: 'var(--color-accent-primary)' },
                        {
                          x: 200,
                          y: 380,
                          label: 'Field site A',
                          color: 'var(--color-text-secondary)',
                        },
                        {
                          x: 430,
                          y: 200,
                          label: 'Field site B',
                          color: 'var(--color-text-secondary)',
                        },
                      ].map((p, i) => (
                        <g key={i}>
                          <circle cx={p.x} cy={p.y} r="10" fill={p.color} opacity="0.18" />
                          <circle cx={p.x} cy={p.y} r="4" fill="url(#pv-globe-node)" />
                        </g>
                      ))}
                    </svg>

                    {/* legend chip */}
                    <div
                      className="absolute bottom-4 left-4 rounded-lg border px-3 py-2 backdrop-blur-md"
                      style={{
                        borderColor: 'var(--color-border)',
                        background: 'color-mix(in srgb, var(--color-bg-primary) 85%, transparent)',
                      }}
                    >
                      <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                        Stations online
                      </div>
                      <div className="mt-1 flex items-center gap-3 text-[11.5px] text-[var(--color-text-primary)]">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> 3 active
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-text-secondary)]" />{' '}
                          1 heritage
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* KNOWLEDGE CONNECTIONS                                            */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <div
                  className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em]"
                  style={{ color: AC }}
                >
                  <span className="h-px w-8" style={{ background: AC }} />
                  Knowledge connections
                </div>
                <h2 className="mt-5 text-[1.6rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[2rem]">
                  Every expedition tells a larger story.
                </h2>
                <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  An expedition is not an isolated record. It is the origin point of reports,
                  datasets, publications and media — all linked, all searchable, all part of the
                  same research thread.
                </p>

                <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                  Sample from Expedition 43
                </p>
                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                  {[
                    { icon: FiFileText, label: 'Reports', value: 12 },
                    { icon: FiDatabase, label: 'Datasets', value: 8 },
                    { icon: FiBookOpen, label: 'Publications', value: 15 },
                    { icon: FiImage, label: 'Photos', value: 120 },
                    { icon: FiVideo, label: 'Videos', value: 14 },
                    { icon: FiUsers, label: 'Researchers', value: 42 },
                  ].map((c) => {
                    const Icon = c.icon;
                    return (
                      <div key={c.label} className="flex items-center gap-2.5">
                        <span
                          className="flex h-8 w-8 items-center justify-center rounded-lg border"
                          style={{
                            borderColor: 'var(--color-border)',
                            color: AC,
                            background: 'var(--color-bg-secondary)',
                          }}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <div className="min-w-0">
                          <div className="text-[14px] font-medium text-[var(--color-text-primary)]">
                            {c.value}
                          </div>
                          <div className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                            {c.label}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            </div>

            {/* connection diagram */}
            <div className="lg:col-span-7">
              <Reveal delay={120}>
                <div
                  className="rounded-2xl border p-6 sm:p-8"
                  style={{
                    borderColor: 'var(--color-border)',
                    background: 'var(--color-bg-secondary)',
                  }}
                >
                  <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[160px_1fr]">
                    {/* source node */}
                    <div
                      className="rounded-xl border p-5 text-center"
                      style={{
                        borderColor: AC,
                        background: AC_SOFT,
                      }}
                    >
                      <GiSnowflake1 className="mx-auto h-6 w-6" style={{ color: AC }} />
                      <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                        Expedition
                      </div>
                      <div className="mt-1 text-[13px] font-medium text-[var(--color-text-primary)]">
                        Exp 43 · 2026
                      </div>
                    </div>

                    {/* resource list */}
                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {[
                        {
                          icon: FiFileText,
                          label: 'Field Reports',
                          note: '12 entries',
                          to: '/knowledge/reports',
                        },
                        {
                          icon: FiDatabase,
                          label: 'Scientific Datasets',
                          note: '8 curated',
                          to: '/knowledge/datasets',
                        },
                        {
                          icon: FiBookOpen,
                          label: 'Publications',
                          note: '15 indexed',
                          to: '/knowledge/publications',
                        },
                        {
                          icon: FiImage,
                          label: 'Field Photography',
                          note: '120 assets',
                          to: '/media',
                        },
                        { icon: FiVideo, label: 'Video Footage', note: '14 clips', to: '/media' },
                        {
                          icon: FiUsers,
                          label: 'Investigators',
                          note: '42 people',
                          to: '/knowledge',
                        },
                      ].map((r) => {
                        const Icon = r.icon;
                        return (
                          <li key={r.label}>
                            <Link
                              to={r.to}
                              className="group flex items-center gap-3 rounded-lg border p-3 transition-colors hover:border-[var(--color-accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                              style={{
                                borderColor: 'var(--color-border)',
                                background: 'var(--color-bg-primary)',
                              }}
                            >
                              <span
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                                style={{ background: AC_SOFT, color: AC }}
                              >
                                <Icon className="h-3.5 w-3.5" />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-[12.5px] font-medium text-[var(--color-text-primary)]">
                                  {r.label}
                                </span>
                                <span className="block text-[11px] text-[var(--color-text-secondary)]">
                                  {r.note}
                                </span>
                              </span>
                              <FiArrowRight
                                className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                style={{ color: AC }}
                              />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CTA                                                              */}
      {/* ================================================================ */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={IMG.cta} alt="" aria-hidden="true" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#04070F]/75" />
        </div>

        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="max-w-2xl">
            <Reveal>
              <h2 className="text-[1.9rem] font-medium leading-[1.1] tracking-[-0.03em] text-white sm:text-[2.5rem]">
                Start with an expedition.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/70">
                Open any expedition to see the datasets, reports and publications it produced — or
                jump straight to the polar map to explore by location.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#explorer"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[13.5px] font-medium text-[#04070F] transition-colors hover:bg-white/90"
                >
                  Browse expeditions
                  <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
                <Link
                  to="/map"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[13.5px] font-medium text-white/90 backdrop-blur-sm transition-colors hover:border-white/50 hover:text-white"
                >
                  <FiGlobe className="h-3.5 w-3.5" />
                  Open polar map
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ========================================================================== */
/*  Sub-views                                                                 */
/* ========================================================================== */

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-[1.35rem] font-medium text-[var(--color-text-primary)]">{value}</div>
      <div className="mt-1 text-[10.5px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
        {label}
      </div>
    </div>
  );
}

function ExpeditionCard({ expedition: e }) {
  return (
    <Link
      to={`/expeditions/${e.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
      style={{
        borderColor: 'var(--color-border)',
        background: 'var(--color-bg-secondary)',
      }}
    >
      <div className="relative overflow-hidden">
        <img
          src={e.image}
          alt={`${e.title} — field site`}
          className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <RegionBadge region={e.region} />
        </div>
        <div
          className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10.5px] font-mono"
          style={{
            background: 'rgba(4,7,15,0.72)',
            color: '#fff',
            backdropFilter: 'blur(6px)',
          }}
        >
          Exp. {e.number}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 text-[11.5px] text-[var(--color-text-secondary)]">
          <span className="inline-flex items-center gap-1.5">
            <FiCalendar className="h-3 w-3" />
            {e.year}
          </span>
          <StatusDot status={e.status} />
        </div>

        <h3 className="mt-3 text-[15.5px] font-medium leading-snug tracking-tight text-[var(--color-text-primary)]">
          {e.title}
        </h3>

        <p className="mt-1.5 text-[12.5px] leading-snug text-[var(--color-text-secondary)]">
          <FiMapPin className="mr-1 inline h-3 w-3 -translate-y-[1px]" />
          {e.location}
        </p>

        <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
          {e.summary}
        </p>

        {/* areas */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {e.areas.slice(0, 3).map((a) => (
            <span
              key={a}
              className="rounded-full border px-2 py-0.5 text-[10.5px] font-medium text-[var(--color-text-secondary)]"
              style={{ borderColor: 'var(--color-border)' }}
            >
              {a}
            </span>
          ))}
        </div>

        {/* connected counts */}
        <div
          className="mt-4 grid grid-cols-3 gap-3 border-t pt-4 text-[11px]"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <CountPill icon={FiFileText} label="Reports" value={e.counts.reports} />
          <CountPill icon={FiDatabase} label="Datasets" value={e.counts.datasets} />
          <CountPill icon={FiBookOpen} label="Papers" value={e.counts.publications} />
        </div>

        {/* footer */}
        <div
          className="mt-5 flex items-center justify-between border-t pt-4"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <span className="inline-flex items-center gap-1.5 text-[11.5px] text-[var(--color-text-secondary)]">
            <FiUsers className="h-3 w-3" />
            {e.researchers} researchers
          </span>
          <span
            className="inline-flex items-center gap-1 text-[12px] font-medium transition-transform duration-300 group-hover:translate-x-0.5"
            style={{ color: AC }}
          >
            View
            <FiArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function ExpeditionRow({ expedition: e }) {
  return (
    <Link
      to={`/expeditions/${e.id}`}
      className="group grid grid-cols-1 items-center gap-5 py-5 transition-colors hover:bg-[var(--color-bg-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] sm:grid-cols-[140px_1fr_auto]"
    >
      <div className="overflow-hidden rounded-md">
        <img
          src={e.image}
          alt={`${e.title} — field site`}
          className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04] sm:aspect-[4/3]"
          loading="lazy"
        />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <RegionBadge region={e.region} />
          <span className="text-[11.5px] font-mono text-[var(--color-text-secondary)]">
            Exp. {e.number} · {e.year}
          </span>
          <StatusDot status={e.status} />
        </div>
        <h3 className="mt-3 text-[15.5px] font-medium leading-snug tracking-tight text-[var(--color-text-primary)]">
          {e.title}
        </h3>
        <p className="mt-1 text-[12.5px] text-[var(--color-text-secondary)]">
          <FiMapPin className="mr-1 inline h-3 w-3 -translate-y-[1px]" />
          {e.location}
        </p>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
          {e.summary}
        </p>
      </div>

      <div className="flex items-center gap-6 sm:flex-col sm:items-end sm:gap-2">
        <div className="flex gap-4 text-[11px] text-[var(--color-text-secondary)] sm:flex-col sm:items-end">
          <span className="inline-flex items-center gap-1.5">
            <FiFileText className="h-3 w-3" /> {e.counts.reports}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FiDatabase className="h-3 w-3" /> {e.counts.datasets}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FiBookOpen className="h-3 w-3" /> {e.counts.publications}
          </span>
        </div>
        <span
          className="inline-flex items-center gap-1 text-[12.5px] font-medium transition-transform duration-300 group-hover:translate-x-0.5"
          style={{ color: AC }}
        >
          View
          <FiArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

function CountPill({ icon: Icon, label, value }) {
  return (
    <span className="inline-flex flex-col gap-1 text-[var(--color-text-secondary)]">
      <span className="inline-flex items-center gap-1.5">
        <Icon className="h-3 w-3" />
        <span className="text-[11.5px] font-medium text-[var(--color-text-primary)]">{value}</span>
      </span>
      <span className="text-[10px] uppercase tracking-[0.1em]">{label}</span>
    </span>
  );
}
