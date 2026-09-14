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
  FiDownload,
  FiCpu,
  FiClock,
  FiExternalLink,
  FiChevronRight,
} from 'react-icons/fi';
import { GiSnowflake1 } from 'react-icons/gi';

/* ============================================================================
   Reports — scientific knowledge repository for PolarVerse
   ========================================================================== */

/* -------------------------------------------------------------------------- */
/*  Centralized imagery                                                       */
/* -------------------------------------------------------------------------- */
const IMG = {
  hero: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=2400&q=80',
  featured:
    'https://images.unsplash.com/photo-1613573081262-69e37dfd72f1?auto=format&fit=crop&w=2000&q=80',
  cta: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=2400&q=80',
  r1: 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?auto=format&fit=crop&w=1000&q=80',
  r2: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1000&q=80',
  r3: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1000&q=80',
  r4: 'https://images.unsplash.com/photo-1520637836862-4d197d17c50a?auto=format&fit=crop&w=1000&q=80',
  r5: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?auto=format&fit=crop&w=1000&q=80',
  r6: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?auto=format&fit=crop&w=1000&q=80',
  r7: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1000&q=80',
  r8: 'https://images.unsplash.com/photo-1613573081262-69e37dfd72f1?auto=format&fit=crop&w=1000&q=80',
  r9: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1000&q=80',
  r10: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=1000&q=80',
  r11: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1000&q=80',
  r12: 'https://images.unsplash.com/photo-1520637836862-4d197d17c50a?auto=format&fit=crop&w=1000&q=80',
};

/* -------------------------------------------------------------------------- */
/*  Demo dataset — replace with GET /api/v1/reports                           */
/* -------------------------------------------------------------------------- */
const REPORTS = [
  {
    id: 'rep-43-2026',
    title: 'Antarctic Expedition Research Report 2026',
    type: 'Expedition Report',
    region: 'Antarctic',
    year: 2026,
    added: '2026-02-14',
    description:
      'Comprehensive observations and field findings collected during the 2026 Antarctic summer campaign, covering glaciology, atmospheric chemistry and coastal oceanography.',
    authors: ['A. Mehra', 'S. Krishnan', 'R. Iyer', 'T. Banerjee'],
    institution: 'Polar Research Group',
    areas: ['Climate', 'Oceanography', 'Glaciology'],
    expedition: { number: '43', title: 'Indian Antarctic Expedition', id: 'exp-43' },
    pages: 86,
    fileType: 'PDF',
    cover: IMG.r1,
    related: { datasets: 8, publications: 15, photos: 120, videos: 14, researchers: 42 },
  },
  {
    id: 'rep-ar-12-2025',
    title: 'Arctic Atmospheric Observations 2025',
    type: 'Scientific Report',
    region: 'Arctic',
    year: 2025,
    added: '2025-11-03',
    description:
      'Aerosol characterisation and trace-gas monitoring at Ny-Ålesund, documenting seasonal variability in Arctic air chemistry.',
    authors: ['N. Sundaram', 'P. Verma'],
    institution: 'Atmospheric Sciences Unit',
    areas: ['Atmospheric Science', 'Climate'],
    expedition: { number: 'AR-12', title: 'Arctic Atmospheric Expedition', id: 'exp-arctic-12' },
    pages: 62,
    fileType: 'PDF',
    cover: IMG.r2,
    related: { datasets: 11, publications: 6, photos: 84, videos: 7, researchers: 24 },
  },
  {
    id: 'rep-so-27-2024',
    title: 'Southern Ocean Productivity Study',
    type: 'Scientific Report',
    region: 'Antarctic',
    year: 2024,
    added: '2024-08-21',
    description:
      'Physical and biological oceanography across the Prydz Bay sector, focusing on primary productivity and carbon uptake pathways.',
    authors: ['R. Iyer', 'K. Menon', 'J. Fernandes'],
    institution: 'Marine Sciences Division',
    areas: ['Oceanography', 'Biology'],
    expedition: { number: 'SO-27', title: 'Southern Ocean Mission', id: 'exp-so-27' },
    pages: 112,
    fileType: 'PDF',
    cover: IMG.r3,
    related: { datasets: 19, publications: 22, photos: 210, videos: 18, researchers: 31 },
  },
  {
    id: 'rep-ice-09-2024',
    title: 'Coastal Ice Sheet Mass Balance 2024',
    type: 'Technical Report',
    region: 'Antarctic',
    year: 2024,
    added: '2024-06-12',
    description:
      'Repeated glacier surveys, ablation measurements and mass-balance estimates from a coastal ice-sheet sector in Dronning Maud Land.',
    authors: ['S. Krishnan', 'H. Rao'],
    institution: 'Glaciology Group',
    areas: ['Glaciology', 'Climate'],
    expedition: { number: 'IC-09', title: 'Ice Sheet Monitoring', id: 'exp-ice-09' },
    pages: 48,
    fileType: 'PDF',
    cover: IMG.r4,
    related: { datasets: 22, publications: 9, photos: 96, videos: 11, researchers: 18 },
  },
  {
    id: 'rep-mb-04-2023',
    title: 'Marine Biodiversity Survey — Coastal Antarctica',
    type: 'Scientific Report',
    region: 'Antarctic',
    year: 2023,
    added: '2023-12-05',
    description:
      'Benthic and pelagic biodiversity surveys using standard sampling protocols, with taxonomic notes on coastal invertebrate communities.',
    authors: ['L. Deshmukh', 'M. Sen'],
    institution: 'Marine Biology Unit',
    areas: ['Biology', 'Oceanography'],
    expedition: { number: 'MB-04', title: 'Polar Marine Biodiversity', id: 'exp-bio-04' },
    pages: 74,
    fileType: 'PDF',
    cover: IMG.r5,
    related: { datasets: 14, publications: 17, photos: 148, videos: 9, researchers: 22 },
  },
  {
    id: 'rep-ag-06-2023',
    title: 'Svalbard Glacier Dynamics Field Study',
    type: 'Scientific Report',
    region: 'Arctic',
    year: 2023,
    added: '2023-09-18',
    description:
      'Seasonal glacier dynamics and ablation monitoring at Svalbard, with a focus on meltwater routing and surface energy balance.',
    authors: ['P. Verma', 'S. Anand'],
    institution: 'Cryosphere Sciences Group',
    areas: ['Glaciology', 'Climate'],
    expedition: { number: 'AG-06', title: 'Arctic Glacier Study', id: 'exp-arc-glac' },
    pages: 58,
    fileType: 'PDF',
    cover: IMG.r6,
    related: { datasets: 12, publications: 4, photos: 62, videos: 6, researchers: 15 },
  },
  {
    id: 'rep-gg-02-2022',
    title: 'Schirmacher Oasis Bedrock Geology Report',
    type: 'Technical Report',
    region: 'Antarctic',
    year: 2022,
    added: '2022-10-02',
    description:
      'Bedrock and sediment sampling to document the geological evolution of the Schirmacher region and its glacial history.',
    authors: ['H. Rao', 'D. Pillai'],
    institution: 'Geological Survey Unit',
    areas: ['Geology'],
    expedition: { number: 'GG-02', title: 'Antarctic Geology Survey', id: 'exp-geo-02' },
    pages: 44,
    fileType: 'PDF',
    cover: IMG.r7,
    related: { datasets: 6, publications: 8, photos: 74, videos: 3, researchers: 12 },
  },
  {
    id: 'rep-ar-09-2022',
    title: 'Himadri Winter-Over Observation Log',
    type: 'Institutional Report',
    region: 'Arctic',
    year: 2022,
    added: '2022-05-27',
    description:
      'Winter-over atmospheric and snow-chemistry observations at Himadri, tracking seasonal variability across a full polar winter.',
    authors: ['N. Sundaram'],
    institution: 'Arctic Station Operations',
    areas: ['Atmospheric Science', 'Biology'],
    expedition: { number: 'AR-09', title: 'Himadri Winter-Over', id: 'exp-arc-himadri' },
    pages: 36,
    fileType: 'PDF',
    cover: IMG.r8,
    related: { datasets: 8, publications: 5, photos: 48, videos: 4, researchers: 9 },
  },
  {
    id: 'rep-ann-2025',
    title: 'Programme Annual Report 2025',
    type: 'Annual Report',
    region: 'Antarctic',
    year: 2025,
    added: '2025-12-20',
    description:
      'Consolidated annual summary of programme activities, milestones and outcomes across all polar field campaigns for the 2025 season.',
    authors: ['Programme Office'],
    institution: 'Polar Programme Office',
    areas: ['Climate', 'Oceanography', 'Glaciology', 'Biology'],
    expedition: null,
    pages: 128,
    fileType: 'PDF',
    cover: IMG.r9,
    related: { datasets: 40, publications: 55, photos: 300, videos: 30, researchers: 180 },
  },
  {
    id: 'rep-remote-2024',
    title: 'Satellite Remote Sensing of Sea-Ice 2024',
    type: 'Technical Report',
    region: 'Antarctic',
    year: 2024,
    added: '2024-04-09',
    description:
      'Satellite-based observation of sea-ice extent and concentration across the Southern Ocean, with an emphasis on method comparisons.',
    authors: ['J. Fernandes', 'A. Mehra'],
    institution: 'Remote Sensing Unit',
    areas: ['Remote Sensing', 'Climate'],
    expedition: null,
    pages: 52,
    fileType: 'PDF',
    cover: IMG.r10,
    related: { datasets: 25, publications: 11, photos: 40, videos: 5, researchers: 14 },
  },
  {
    id: 'rep-micro-2023',
    title: 'Microbial Communities in Polar Soils',
    type: 'Scientific Report',
    region: 'Antarctic',
    year: 2023,
    added: '2023-07-30',
    description:
      'Soil microbial community profiling from coastal Antarctic sites, documenting diversity and seasonal shifts under extreme conditions.',
    authors: ['M. Sen', 'L. Deshmukh'],
    institution: 'Microbiology Group',
    areas: ['Microbiology', 'Biology'],
    expedition: null,
    pages: 60,
    fileType: 'PDF',
    cover: IMG.r11,
    related: { datasets: 9, publications: 12, photos: 55, videos: 4, researchers: 11 },
  },
  {
    id: 'rep-arc-marine-2025',
    title: 'Arctic Marine Microbiology Preliminary Notes',
    type: 'Scientific Report',
    region: 'Arctic',
    year: 2025,
    added: '2025-09-14',
    description:
      'Preliminary microbiological sampling in Kongsfjorden, with an emphasis on microbial community structure in Arctic fjord waters.',
    authors: ['S. Anand', 'K. Menon'],
    institution: 'Marine Sciences Division',
    areas: ['Microbiology', 'Oceanography'],
    expedition: { number: 'AR-45', title: 'Arctic Marine Microbiology', id: 'exp-arc-45' },
    pages: 40,
    fileType: 'PDF',
    cover: IMG.r12,
    related: { datasets: 7, publications: 3, photos: 34, videos: 2, researchers: 16 },
  },
];

/* Report types — used for the category section */
const REPORT_TYPES = [
  {
    key: 'Expedition Report',
    icon: FiCompass,
    blurb: 'Detailed records from polar field missions.',
  },
  {
    key: 'Technical Report',
    icon: FiLayers,
    blurb: 'Technical findings, procedures and scientific documentation.',
  },
  {
    key: 'Scientific Report',
    icon: FiActivity,
    blurb: 'Research findings and scientific observations.',
  },
  {
    key: 'Institutional Report',
    icon: FiFileText,
    blurb: 'Institutional activities and programme updates.',
  },
  {
    key: 'Annual Report',
    icon: FiCalendar,
    blurb: 'Year-wise summaries and major milestones.',
  },
];

const RESEARCH_AREAS = [
  { key: 'Climate', icon: FiThermometer, blurb: 'Long-term variability across polar latitudes.' },
  { key: 'Glaciology', icon: FiLayers, blurb: 'Ice sheets, glacier mass balance and dynamics.' },
  { key: 'Oceanography', icon: FiDroplet, blurb: 'Ocean circulation, sea-ice and productivity.' },
  { key: 'Biology', icon: FiFeather, blurb: 'Marine and terrestrial polar ecosystems.' },
  {
    key: 'Atmospheric Science',
    icon: FiWind,
    blurb: 'Aerosols, snow chemistry, air-mass transport.',
  },
  { key: 'Geology', icon: FiCompass, blurb: 'Bedrock, sediments and geological evolution.' },
  { key: 'Microbiology', icon: FiActivity, blurb: 'Microbial life in extreme polar environments.' },
  { key: 'Remote Sensing', icon: FiGlobe, blurb: 'Satellite observation of polar surfaces.' },
];

const STATS = [
  { label: 'Reports', value: 250, suffix: '+' },
  { label: 'Expedition Reports', value: 120, suffix: '+' },
  { label: 'Technical Reports', value: 65, suffix: '+' },
  { label: 'Research Areas', value: 8, suffix: '' },
  { label: 'Years Covered', value: 30, suffix: '+' },
];

const REGIONS = ['All', 'Arctic', 'Antarctic'];
const YEARS = ['All', '2026', '2025', '2024', '2023', 'Older'];
const SORTS = [
  { key: 'newest', label: 'Newest' },
  { key: 'oldest', label: 'Oldest' },
  { key: 'az', label: 'A–Z' },
  { key: 'relevant', label: 'Most relevant' },
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

function TypeBadge({ type }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-medium text-[var(--color-text-secondary)]"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <FiFileText className="h-2.5 w-2.5" />
      {type}
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
export default function Reports({ dark, setDark }) {
  /* ---- filter state ------------------------------------------------------ */
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');
  const [region, setRegion] = useState('All');
  const [area, setArea] = useState(null);
  const [year, setYear] = useState('All');
  const [sort, setSort] = useState('newest');
  const [view, setView] = useState('grid');

  /* ---- derived list ------------------------------------------------------ */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = REPORTS.filter((r) => {
      if (type !== 'All' && r.type !== type) return false;
      if (region !== 'All' && r.region !== region) return false;
      if (area && !r.areas.includes(area)) return false;

      if (year !== 'All') {
        if (year === 'Older' && r.year >= 2023) return false;
        if (year !== 'Older' && r.year !== Number(year)) return false;
      }

      if (q) {
        const hay = [
          r.title,
          r.description,
          r.institution,
          r.authors.join(' '),
          r.areas.join(' '),
          r.expedition?.title || '',
          r.expedition?.number || '',
          r.year,
        ]
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === 'newest') return b.year - a.year || b.added.localeCompare(a.added);
      if (sort === 'oldest') return a.year - b.year || a.added.localeCompare(b.added);
      if (sort === 'az') return a.title.localeCompare(b.title);
      if (sort === 'relevant') {
        // heuristic — reports with expedition + more resources rank first
        const weight = (x) =>
          (x.expedition ? 2 : 0) +
          Math.min(Object.values(x.related).reduce((s, n) => s + n, 0) / 100, 5);
        return weight(b) - weight(a);
      }
      return 0;
    });

    return list;
  }, [query, type, region, area, year, sort]);

  const featured = REPORTS[0];
  const recentlyAdded = useMemo(
    () => [...REPORTS].sort((a, b) => b.added.localeCompare(a.added)).slice(0, 5),
    []
  );

  const hasFilters =
    query !== '' || type !== 'All' || region !== 'All' || year !== 'All' || area !== null;

  const clearFilters = () => {
    setQuery('');
    setType('All');
    setRegion('All');
    setYear('All');
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
            alt="Antarctic field site at dusk"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04070F] via-[#04070F]/65 to-[#04070F]/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04070F]/75 via-transparent to-transparent" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-20 pt-24 sm:px-8 sm:pb-24 sm:pt-32 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/70">
                <span className="h-px w-8 bg-white/40" />
                Polar Knowledge Repository
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-[2.1rem] font-medium leading-[1.05] tracking-[-0.035em] text-white sm:text-[3.2rem] lg:text-[3.8rem]">
                Explore polar research reports.
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-[16px]">
                Discover expedition reports, technical documents, scientific findings and
                institutional research from India's polar journey — each linked to the datasets,
                publications and media that surround it.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#explorer"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[13.5px] font-medium text-[#04070F] transition-colors hover:bg-white/90"
                >
                  Explore reports
                  <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
                <Link
                  to="/expeditions"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[13.5px] font-medium text-white/90 backdrop-blur-sm transition-colors hover:border-white/50 hover:text-white"
                >
                  <FiCompass className="h-3.5 w-3.5" />
                  Browse expeditions
                </Link>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-14 flex items-center gap-3 border-t border-white/15 pt-6 text-[11px] font-mono uppercase tracking-[0.18em] text-white/50">
                <span>REPORTS</span>
                <span className="h-px flex-1 bg-white/15" />
                <span>EXPEDITIONS</span>
                <span className="h-px flex-1 bg-white/15" />
                <span>DATASETS</span>
                <span className="h-px flex-1 bg-white/15" />
                <span>PUBLICATIONS</span>
              </div>
            </Reveal>
          </div>

          {/* stacked cover composition */}
          <div className="lg:col-span-5">
            <Reveal delay={220}>
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[380px]">
                <div
                  className="absolute inset-x-6 top-8 h-full rounded-lg border shadow-2xl"
                  style={{
                    borderColor: 'rgba(255,255,255,0.14)',
                    background: 'rgba(255,255,255,0.05)',
                    transform: 'rotate(-6deg)',
                  }}
                />
                <div
                  className="absolute inset-x-3 top-4 h-full rounded-lg border shadow-2xl"
                  style={{
                    borderColor: 'rgba(255,255,255,0.16)',
                    background: 'rgba(255,255,255,0.07)',
                    transform: 'rotate(-3deg)',
                  }}
                />
                <div
                  className="relative overflow-hidden rounded-lg border shadow-2xl"
                  style={{ borderColor: 'rgba(255,255,255,0.22)' }}
                >
                  <img
                    src={IMG.featured}
                    alt="Antarctic research report cover"
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="text-[10.5px] font-mono uppercase tracking-[0.16em] text-white/60">
                      Expedition Report · 2026
                    </div>
                    <div className="mt-2 text-[15px] font-medium leading-tight text-white">
                      Antarctic Expedition Research Report
                    </div>
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10.5px] font-medium text-white backdrop-blur-sm">
                      <FiFileText className="h-3 w-3" />
                      PDF · 86 pages
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* STATISTICS                                                       */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <p
                className="text-[11px] font-medium uppercase tracking-[0.22em]"
                style={{ color: AC }}
              >
                Repository at a glance
              </p>
              <p className="max-w-sm text-[11.5px] leading-relaxed text-[var(--color-text-secondary)]">
                Sample figures for demonstration — replaced by live values when the reports API is
                connected.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <div>
                  <div className="text-[1.8rem] font-medium tracking-tight text-[var(--color-text-primary)] sm:text-[2rem]">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
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
      <section id="explorer" className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p
                  className="text-[11px] font-medium uppercase tracking-[0.22em]"
                  style={{ color: AC }}
                >
                  Find scientific knowledge
                </p>
                <h2 className="mt-3 text-[1.35rem] font-medium tracking-tight text-[var(--color-text-primary)] sm:text-[1.55rem]">
                  Search and narrow the repository
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
                placeholder="Search reports by title, expedition, topic, author or year…"
                aria-label="Search reports"
                className="w-full rounded-xl border py-3.5 pl-11 pr-4 text-[14px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                style={{
                  background: 'var(--color-bg-secondary)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-primary)',
                }}
              />
            </div>
          </Reveal>

          <div className="mt-8 space-y-6">
            {/* type + region */}
            <Reveal delay={120}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                    <FiFileText className="h-3 w-3" />
                    Report type
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Chip active={type === 'All'} onClick={() => setType('All')}>
                      All
                    </Chip>
                    {REPORT_TYPES.map((t) => (
                      <Chip key={t.key} active={type === t.key} onClick={() => setType(t.key)}>
                        {t.key}
                      </Chip>
                    ))}
                  </div>
                </div>

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
                      <Chip key={y} active={year === y} onClick={() => setYear(y)}>
                        {y}
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

            {/* area */}
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
      {/* FEATURED REPORT                                                  */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div
              className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em]"
              style={{ color: AC }}
            >
              <span className="h-px w-8" style={{ background: AC }} />
              Featured report
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <Link
                  to={`/reports/${featured.id}`}
                  className="group relative block overflow-hidden rounded-sm border"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <img
                    src={IMG.featured}
                    alt="Featured report cover"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="text-[10.5px] font-mono uppercase tracking-[0.16em] text-white/70">
                      {featured.region} · {featured.year}
                    </div>
                    <div className="mt-2 text-[15px] font-medium leading-snug text-white">
                      {featured.title}
                    </div>
                  </div>
                </Link>
              </div>

              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-3">
                  <TypeBadge type={featured.type} />
                  <RegionBadge region={featured.region} />
                </div>

                <h3 className="mt-5 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.85rem]">
                  {featured.title}
                </h3>

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-[var(--color-text-secondary)]">
                  <span className="inline-flex items-center gap-1.5">
                    <FiCalendar className="h-3.5 w-3.5" /> {featured.year}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FiUsers className="h-3.5 w-3.5" /> {featured.authors.length} authors
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FiFileText className="h-3.5 w-3.5" /> {featured.pages} pages ·{' '}
                    {featured.fileType}
                  </span>
                </div>

                <p className="mt-6 text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  {featured.description}
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

                {/* expedition connection */}
                {featured.expedition && (
                  <Link
                    to={`/expeditions/${featured.expedition.id}`}
                    className="mt-6 flex items-center gap-3 rounded-xl border p-3 transition-colors hover:border-[var(--color-accent-primary)]"
                    style={{
                      borderColor: 'var(--color-border)',
                      background: 'var(--color-bg-secondary)',
                    }}
                  >
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{ background: AC_SOFT, color: AC }}
                    >
                      <FiCompass className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                        Expedition {featured.expedition.number}
                      </div>
                      <div className="truncate text-[13px] font-medium text-[var(--color-text-primary)]">
                        {featured.expedition.title}
                      </div>
                    </div>
                    <FiChevronRight className="h-4 w-4 text-[var(--color-text-secondary)]" />
                  </Link>
                )}

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    to={`/reports/${featured.id}`}
                    className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold shadow-sm transition-transform hover:scale-[1.02]"
                    style={{
                      background:
                        'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
                      color: 'var(--color-accent-primary-foreground)',
                    }}
                  >
                    View report
                    <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                  <button
                    type="button"
                    disabled
                    title="Download will be enabled once files are served by the reports API"
                    className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-medium text-[var(--color-text-secondary)] opacity-70"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <FiDownload className="h-3.5 w-3.5" />
                    Download · pending
                  </button>
                  <Link
                    to="/ai"
                    className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent-primary)]"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <FiCpu className="h-3.5 w-3.5" style={{ color: AC }} />
                    Understand with AI
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/* REPORT CATEGORIES                                                */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="max-w-xl">
              <p
                className="text-[11px] font-medium uppercase tracking-[0.22em]"
                style={{ color: AC }}
              >
                Explore by type
              </p>
              <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.75rem]">
                Five categories of polar knowledge.
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {REPORT_TYPES.map((t, i) => {
              const Icon = t.icon;
              const count = REPORTS.filter((r) => r.type === t.key).length;
              const active = type === t.key;
              return (
                <Reveal key={t.key} delay={i * 60}>
                  <button
                    type="button"
                    onClick={() => setType(active ? 'All' : t.key)}
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
                    <span className="text-[13.5px] font-medium leading-snug text-[var(--color-text-primary)]">
                      {t.key}
                    </span>
                    <span className="text-[12px] leading-snug text-[var(--color-text-secondary)]">
                      {t.blurb}
                    </span>
                    <span className="mt-auto pt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                      {count} {count === 1 ? 'report' : 'reports'}
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* REPORT EXPLORER                                                  */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
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
                  Research reports
                </h2>
                <p className="mt-3 text-[13.5px] text-[var(--color-text-secondary)]">
                  Showing{' '}
                  <span className="font-medium text-[var(--color-text-primary)]">
                    {filtered.length}
                  </span>{' '}
                  of {REPORTS.length} reports
                </p>
              </div>

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
                  No reports found
                </h3>
                <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                  Try changing your search terms or filters to see more results from the repository.
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
              {filtered.map((r, i) => (
                <Reveal key={r.id} delay={Math.min(i * 40, 200)}>
                  <ReportCard report={r} />
                </Reveal>
              ))}
            </div>
          ) : (
            <ul className="mt-12 divide-y border-y" style={{ borderColor: 'var(--color-border)' }}>
              {filtered.map((r, i) => (
                <Reveal key={r.id} delay={Math.min(i * 30, 150)}>
                  <li>
                    <ReportRow report={r} />
                  </li>
                </Reveal>
              ))}
            </ul>
          )}
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
                  Every report connects to a larger story.
                </h2>
                <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  A report is not an isolated document. It opens onto the expedition that produced
                  it, the datasets it used, the publications it shaped, and the media captured along
                  the way.
                </p>

                <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                  Sample from the featured report
                </p>
                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                  {[
                    { icon: FiCompass, label: 'Expedition', value: 1 },
                    { icon: FiDatabase, label: 'Datasets', value: featured.related.datasets },
                    {
                      icon: FiBookOpen,
                      label: 'Publications',
                      value: featured.related.publications,
                    },
                    { icon: FiImage, label: 'Photos', value: featured.related.photos },
                    { icon: FiVideo, label: 'Videos', value: featured.related.videos },
                    { icon: FiUsers, label: 'Researchers', value: featured.related.researchers },
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
                    <div
                      className="rounded-xl border p-5 text-center"
                      style={{
                        borderColor: AC,
                        background: AC_SOFT,
                      }}
                    >
                      <FiFileText className="mx-auto h-6 w-6" style={{ color: AC }} />
                      <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                        Report
                      </div>
                      <div className="mt-1 text-[12.5px] font-medium text-[var(--color-text-primary)]">
                        {featured.year} · {featured.fileType}
                      </div>
                    </div>

                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {[
                        {
                          icon: FiCompass,
                          label: 'Related Expedition',
                          note: featured.expedition
                            ? `Exp. ${featured.expedition.number}`
                            : 'Programme-wide',
                          to: featured.expedition
                            ? `/expeditions/${featured.expedition.id}`
                            : '/expeditions',
                        },
                        {
                          icon: FiDatabase,
                          label: 'Related Datasets',
                          note: `${featured.related.datasets} curated`,
                          to: '/datasets',
                        },
                        {
                          icon: FiBookOpen,
                          label: 'Related Publications',
                          note: `${featured.related.publications} indexed`,
                          to: '/publications',
                        },
                        {
                          icon: FiImage,
                          label: 'Related Photos',
                          note: `${featured.related.photos} assets`,
                          to: '/media',
                        },
                        {
                          icon: FiVideo,
                          label: 'Related Videos',
                          note: `${featured.related.videos} clips`,
                          to: '/media',
                        },
                        {
                          icon: FiUsers,
                          label: 'Investigators',
                          note: `${featured.related.researchers} people`,
                          to: '/',
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
      {/* RECENTLY ADDED                                                   */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p
                  className="text-[11px] font-medium uppercase tracking-[0.22em]"
                  style={{ color: AC }}
                >
                  Fresh from the archive
                </p>
                <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.75rem]">
                  Recently added reports
                </h2>
              </div>
              <Link
                to="/"
                className="group inline-flex items-center gap-2 text-[13px] font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent-primary)]"
              >
                Browse all
                <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>

          <ul className="mt-10 divide-y border-y" style={{ borderColor: 'var(--color-border)' }}>
            {recentlyAdded.map((r, i) => (
              <Reveal key={r.id} delay={i * 60}>
                <li>
                  <Link
                    to={`/reports/${r.id}`}
                    className="group grid grid-cols-1 items-center gap-5 py-5 transition-colors hover:bg-[var(--color-bg-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] sm:grid-cols-[80px_1fr_auto]"
                  >
                    <div className="overflow-hidden rounded-md">
                      <img
                        src={r.cover}
                        alt={`${r.title} cover`}
                        className="aspect-square w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <TypeBadge type={r.type} />
                        <RegionBadge region={r.region} />
                      </div>
                      <h3 className="mt-3 text-[15px] font-medium leading-snug tracking-tight text-[var(--color-text-primary)]">
                        {r.title}
                      </h3>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-[var(--color-text-secondary)]">
                        <span className="inline-flex items-center gap-1.5">
                          <FiCalendar className="h-3 w-3" />
                          {r.year}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <FiClock className="h-3 w-3" />
                          Added {r.added}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <FiFileText className="h-3 w-3" />
                          {r.pages} pages
                        </span>
                      </div>
                    </div>

                    <span
                      className="hidden items-center gap-1 text-[12.5px] font-medium transition-transform duration-300 group-hover:translate-x-0.5 sm:inline-flex"
                      style={{ color: AC }}
                    >
                      View
                      <FiArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
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
                  What these reports study
                </p>
                <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.75rem]">
                  Eight fields, one connected programme.
                </h2>
              </div>
              <p className="max-w-sm text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                Click a field to narrow the report listing above.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {RESEARCH_AREAS.map((r, i) => {
              const Icon = r.icon;
              const count = REPORTS.filter((x) => x.areas.includes(r.key)).length;
              const active = area === r.key;
              return (
                <Reveal key={r.key} delay={i * 55}>
                  <button
                    type="button"
                    onClick={() => {
                      setArea(active ? null : r.key);
                      document
                        .getElementById('explorer')
                        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
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
                      {count} {count === 1 ? 'report' : 'reports'}
                    </span>
                  </button>
                </Reveal>
              );
            })}
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
                Open a report. Follow its story.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/70">
                Every report connects to an expedition, a dataset, a publication — and ultimately to
                the researchers who made the observation. Start anywhere.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  to="/reports"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[13.5px] font-medium text-[#04070F] transition-colors hover:bg-white/90"
                >
                  Browse all reports
                  <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/ai"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[13.5px] font-medium text-white/90 backdrop-blur-sm transition-colors hover:border-white/50 hover:text-white"
                >
                  <FiCpu className="h-3.5 w-3.5" />
                  Understand with AI
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

function ReportCard({ report: r }) {
  return (
    <div
      className="group flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1"
      style={{
        borderColor: 'var(--color-border)',
        background: 'var(--color-bg-secondary)',
      }}
    >
      <Link
        to={`/reports/${r.id}`}
        className="relative overflow-hidden focus-visible:outline-none"
        aria-label={`View ${r.title}`}
      >
        <img
          src={r.cover}
          alt={`${r.title} cover`}
          className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <RegionBadge region={r.region} />
        </div>
        <div
          className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10.5px] font-mono"
          style={{
            background: 'rgba(4,7,15,0.72)',
            color: '#fff',
            backdropFilter: 'blur(6px)',
          }}
        >
          {r.year}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <TypeBadge type={r.type} />

        <h3 className="mt-3 text-[15px] font-medium leading-snug tracking-tight text-[var(--color-text-primary)]">
          <Link
            to={`/reports/${r.id}`}
            className="transition-colors hover:text-[var(--color-accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
          >
            {r.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
          {r.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {r.areas.slice(0, 3).map((a) => (
            <span
              key={a}
              className="rounded-full border px-2 py-0.5 text-[10.5px] font-medium text-[var(--color-text-secondary)]"
              style={{ borderColor: 'var(--color-border)' }}
            >
              {a}
            </span>
          ))}
        </div>

        {r.expedition && (
          <Link
            to={`/expeditions/${r.expedition.id}`}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border p-2.5 text-[11.5px] transition-colors hover:border-[var(--color-accent-primary)]"
            style={{
              borderColor: 'var(--color-border)',
              background: 'var(--color-bg-primary)',
            }}
          >
            <FiCompass className="h-3.5 w-3.5" style={{ color: AC }} />
            <span className="truncate font-medium text-[var(--color-text-primary)]">
              Exp. {r.expedition.number} · {r.expedition.title}
            </span>
          </Link>
        )}

        <div
          className="mt-4 flex items-center justify-between border-t pt-4 text-[11.5px] text-[var(--color-text-secondary)]"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <span className="inline-flex items-center gap-1.5">
            <FiFileText className="h-3 w-3" />
            {r.fileType} · {r.pages} pages
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FiDatabase className="h-3 w-3" />
            {r.related.datasets} · {r.related.publications}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <Link
            to={`/reports/${r.id}`}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium transition-transform duration-300 group-hover:translate-x-0.5"
            style={{ color: AC }}
          >
            View report
            <FiArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            disabled
            title="Download will be enabled once files are served by the reports API"
            aria-label="Download report — pending backend"
            className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[11.5px] text-[var(--color-text-secondary)] opacity-70"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <FiDownload className="h-3 w-3" />
            Pending
          </button>
        </div>
      </div>
    </div>
  );
}

function ReportRow({ report: r }) {
  return (
    <Link
      to={`/reports/${r.id}`}
      className="group grid grid-cols-1 items-center gap-5 py-5 transition-colors hover:bg-[var(--color-bg-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] sm:grid-cols-[120px_1fr_auto]"
    >
      <div className="overflow-hidden rounded-md">
        <img
          src={r.cover}
          alt={`${r.title} cover`}
          className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
          loading="lazy"
        />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <TypeBadge type={r.type} />
          <RegionBadge region={r.region} />
          <span className="text-[11.5px] font-mono text-[var(--color-text-secondary)]">
            {r.year}
          </span>
        </div>
        <h3 className="mt-3 text-[15px] font-medium leading-snug tracking-tight text-[var(--color-text-primary)]">
          {r.title}
        </h3>
        <p className="mt-1 text-[12.5px] text-[var(--color-text-secondary)]">
          {r.institution} · {r.authors.slice(0, 2).join(', ')}
          {r.authors.length > 2 && ' et al.'}
        </p>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
          {r.description}
        </p>
      </div>

      <div className="flex items-center gap-6 sm:flex-col sm:items-end sm:gap-2">
        <div className="flex gap-4 text-[11px] text-[var(--color-text-secondary)] sm:flex-col sm:items-end">
          <span className="inline-flex items-center gap-1.5">
            <FiFileText className="h-3 w-3" /> {r.pages}p
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FiDatabase className="h-3 w-3" /> {r.related.datasets}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FiBookOpen className="h-3 w-3" /> {r.related.publications}
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
