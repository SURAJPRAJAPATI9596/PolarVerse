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
  FiCpu,
  FiClock,
  FiChevronRight,
  FiBookmark,
  FiUser,
  FiAward,
  FiLink,
  FiTag,
  FiChevronDown,
  FiSliders,
  FiTrendingUp,
  FiTarget,
  FiZap,
  FiExternalLink,
  FiCheck,
} from 'react-icons/fi';
import { GiSnowflake1 } from 'react-icons/gi';

/* ============================================================================
   Publications — polar research library for PolarVerse
   ========================================================================== */

/* -------------------------------------------------------------------------- */
/*  Scoped theme extensions                                                   */
/* -------------------------------------------------------------------------- */
const STYLES = `
  :root {
    --pv-pub-hero-overlay: #04070f;
    --pv-pub-glass-bg: rgba(4, 7, 15, 0.55);
    --pv-pub-glass-border: rgba(255, 255, 255, 0.18);
    --pv-pub-chip-bg: rgba(4, 7, 15, 0.82);
    --pv-pub-chip-border: rgba(255, 255, 255, 0.20);
    --pv-pub-hero-text: #ffffff;
    --pv-pub-hero-text-dim: rgba(255, 255, 255, 0.72);
    --pv-pub-hero-divider: rgba(255, 255, 255, 0.16);
    --pv-pub-image-overlay: rgba(0, 0, 0, 0.45);
    --pv-pub-aurora-1: rgba(56, 189, 248, 0.30);
    --pv-pub-aurora-2: rgba(167, 139, 250, 0.26);
    --pv-pub-aurora-3: rgba(45, 212, 191, 0.22);
  }
  .dark {
    --pv-pub-image-overlay: rgba(0, 0, 0, 0.50);
    --pv-pub-aurora-1: rgba(56, 189, 248, 0.38);
    --pv-pub-aurora-2: rgba(167, 139, 250, 0.32);
    --pv-pub-aurora-3: rgba(45, 212, 191, 0.28);
  }
`;

/* -------------------------------------------------------------------------- */
/*  Imagery — clearly replaceable demo URLs                                   */
/* -------------------------------------------------------------------------- */
const IMG = {
  hero: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=2400&q=80',
  featured:
    'https://images.unsplash.com/photo-1613573081262-69e37dfd72f1?auto=format&fit=crop&w=2000&q=80',
  cta: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=2400&q=80',
  p1: 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?auto=format&fit=crop&w=1200&q=80',
  p2: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1200&q=80',
  p3: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
  p4: 'https://images.unsplash.com/photo-1520637836862-4d197d17c50a?auto=format&fit=crop&w=1200&q=80',
  p5: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?auto=format&fit=crop&w=1200&q=80',
  p6: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?auto=format&fit=crop&w=1200&q=80',
  p7: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=1200&q=80',
  p8: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80',
  p9: 'https://images.unsplash.com/photo-1613573081262-69e37dfd72f1?auto=format&fit=crop&w=1200&q=80',
  p10: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1200&q=80',
  p11: 'https://images.unsplash.com/photo-1520637836862-4d197d17c50a?auto=format&fit=crop&w=1200&q=80',
  p12: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
  a1: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  a2: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  a3: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  a4: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
};

/* -------------------------------------------------------------------------- */
/*  Demo publications — replaceable with GET /api/v1/publications             */
/* -------------------------------------------------------------------------- */
const PUBLICATIONS = [
  {
    id: 'pub-ice-01',
    title: 'Decadal variability of Antarctic coastal sea-ice extent',
    type: 'Journal Article',
    year: 2026,
    added: '2026-01-18',
    region: 'Antarctic',
    abstract:
      'A sample study describing interannual variability in coastal Antarctic sea-ice extent using a harmonised observation record. Demo content, not a published result.',
    authors: ['A. Sample', 'R. Example', 'K. Demo'],
    institution: 'Polar Research Group (demo)',
    researchAreas: ['Climate Science', 'Oceanography'],
    keywords: ['Sea Ice', 'Antarctic', 'Polar Climate', 'Ocean Circulation'],
    expedition: { id: 'exp-43', number: '43', title: 'Indian Antarctic Expedition' },
    relatedDatasets: 3,
    relatedReports: 2,
    relatedMedia: 4,
    image: IMG.p1,
    journal: 'Demo Polar Journal',
    doi: null,
    language: 'English',
  },
  {
    id: 'pub-aero-02',
    title: 'Aerosol optical properties at an Arctic coastal station',
    type: 'Research Paper',
    year: 2025,
    added: '2025-11-02',
    region: 'Arctic',
    abstract:
      'Sample analysis of aerosol optical properties at an Arctic coastal station across a seasonal cycle. Demo content, not a published result.',
    authors: ['N. Sample', 'P. Demo'],
    institution: 'Atmospheric Sciences Unit (demo)',
    researchAreas: ['Atmospheric Science', 'Climate Science'],
    keywords: ['Atmospheric Change', 'Aerosols', 'Arctic', 'Polar Climate'],
    expedition: { id: 'exp-arctic-12', number: 'AR-12', title: 'Arctic Atmospheric Expedition' },
    relatedDatasets: 2,
    relatedReports: 3,
    relatedMedia: 5,
    image: IMG.p2,
    journal: 'Demo Atmospheric Letters',
    doi: null,
    language: 'English',
  },
  {
    id: 'pub-ctd-03',
    title: 'Southern Ocean hydrography: a sample CTD profile review',
    type: 'Review',
    year: 2025,
    added: '2025-08-14',
    region: 'Antarctic',
    abstract:
      'Illustrative review of CTD profile structure across the Prydz Bay sector. Demo content, not a real published review.',
    authors: ['R. Example', 'K. Demo', 'M. Sample'],
    institution: 'Marine Sciences Division (demo)',
    researchAreas: ['Oceanography'],
    keywords: ['Ocean Circulation', 'Southern Ocean', 'Salinity'],
    expedition: { id: 'exp-so-27', number: 'SO-27', title: 'Southern Ocean Mission' },
    relatedDatasets: 4,
    relatedReports: 1,
    relatedMedia: 3,
    image: IMG.p3,
    journal: 'Demo Ocean Studies',
    doi: null,
    language: 'English',
  },
  {
    id: 'pub-glac-04',
    title: 'Ablation stake observations from a monitored Arctic glacier',
    type: 'Technical Paper',
    year: 2024,
    added: '2024-09-22',
    region: 'Arctic',
    abstract:
      'Sample field note describing seasonal ablation measurements from a single monitored glacier. Demo content.',
    authors: ['S. Demo', 'H. Sample'],
    institution: 'Cryosphere Sciences Group (demo)',
    researchAreas: ['Glaciology', 'Climate Science'],
    keywords: ['Glacial Dynamics', 'Ice Sheets', 'Arctic'],
    expedition: { id: 'exp-arc-glac', number: 'AG-06', title: 'Arctic Glacier Study' },
    relatedDatasets: 3,
    relatedReports: 2,
    relatedMedia: 2,
    image: IMG.p4,
    journal: 'Demo Cryosphere Notes',
    doi: null,
    language: 'English',
  },
  {
    id: 'pub-bio-05',
    title: 'Sampling design for coastal benthic biodiversity surveys',
    type: 'Conference Paper',
    year: 2024,
    added: '2024-07-11',
    region: 'Antarctic',
    abstract:
      'Illustrative sampling design note for coastal benthic biodiversity surveys. Demo content.',
    authors: ['L. Sample', 'M. Demo'],
    institution: 'Marine Biology Unit (demo)',
    researchAreas: ['Biology'],
    keywords: ['Biodiversity', 'Marine Ecosystems', 'Antarctic'],
    expedition: { id: 'exp-bio-04', number: 'MB-04', title: 'Polar Marine Biodiversity' },
    relatedDatasets: 2,
    relatedReports: 3,
    relatedMedia: 4,
    image: IMG.p5,
    journal: 'Demo Marine Biology Proceedings',
    doi: null,
    language: 'English',
  },
  {
    id: 'pub-geo-06',
    title: 'Bedrock lithology notes from an Antarctic oasis',
    type: 'Research Paper',
    year: 2023,
    added: '2023-12-03',
    region: 'Antarctic',
    abstract:
      'Sample description of bedrock lithology and sediment horizons from an Antarctic oasis. Demo content.',
    authors: ['H. Demo', 'D. Sample'],
    institution: 'Geological Survey Unit (demo)',
    researchAreas: ['Geology'],
    keywords: ['Geology', 'Bedrock', 'Antarctic'],
    expedition: { id: 'exp-geo-02', number: 'GG-02', title: 'Antarctic Geology Survey' },
    relatedDatasets: 1,
    relatedReports: 2,
    relatedMedia: 1,
    image: IMG.p6,
    journal: 'Demo Earth Notes',
    doi: null,
    language: 'English',
  },
  {
    id: 'pub-snow-07',
    title: 'Snow chemistry across an Arctic winter: a sample log',
    type: 'Technical Paper',
    year: 2023,
    added: '2023-06-19',
    region: 'Arctic',
    abstract:
      'Illustrative field log of snow chemistry observations at a coastal Arctic station. Demo content.',
    authors: ['N. Sample', 'S. Demo'],
    institution: 'Arctic Station Operations (demo)',
    researchAreas: ['Atmospheric Science', 'Environmental Science'],
    keywords: ['Atmospheric Change', 'Snow', 'Arctic'],
    expedition: { id: 'exp-arc-himadri', number: 'AR-09', title: 'Himadri Winter-Over' },
    relatedDatasets: 2,
    relatedReports: 1,
    relatedMedia: 2,
    image: IMG.p7,
    journal: 'Demo Polar Notes',
    doi: null,
    language: 'English',
  },
  {
    id: 'pub-remote-08',
    title: 'Satellite methods for sea-ice extent: a comparison note',
    type: 'Technical Paper',
    year: 2024,
    added: '2024-05-19',
    region: 'Antarctic',
    abstract:
      'Sample comparison of two satellite-derived sea-ice extent products over a shared sector. Demo content.',
    authors: ['J. Demo', 'A. Sample'],
    institution: 'Remote Sensing Unit (demo)',
    researchAreas: ['Remote Sensing', 'Climate Science'],
    keywords: ['Remote Sensing', 'Sea Ice', 'Polar Climate'],
    expedition: null,
    relatedDatasets: 4,
    relatedReports: 2,
    relatedMedia: 3,
    image: IMG.p8,
    journal: 'Demo Remote Sensing Letters',
    doi: null,
    language: 'English',
  },
  {
    id: 'pub-micro-09',
    title: 'Community profiling of polar soil microorganisms: a sample note',
    type: 'Research Paper',
    year: 2023,
    added: '2023-08-15',
    region: 'Antarctic',
    abstract:
      'Sample note describing methods for profiling polar soil microbial communities. Demo content.',
    authors: ['M. Demo', 'L. Sample'],
    institution: 'Microbiology Group (demo)',
    researchAreas: ['Biology', 'Environmental Science'],
    keywords: ['Biodiversity', 'Permafrost', 'Antarctic'],
    expedition: null,
    relatedDatasets: 2,
    relatedReports: 1,
    relatedMedia: 1,
    image: IMG.p9,
    journal: 'Demo Microbiology Journal',
    doi: null,
    language: 'English',
  },
  {
    id: 'pub-ocean-10',
    title: 'Cross-disciplinary review of polar ocean change (sample)',
    type: 'Review',
    year: 2025,
    added: '2025-03-07',
    region: 'Both Poles',
    abstract: 'Illustrative cross-disciplinary review of polar ocean change themes. Demo content.',
    authors: ['K. Demo', 'N. Sample', 'R. Example'],
    institution: 'Polar Knowledge Office (demo)',
    researchAreas: ['Oceanography', 'Climate Science', 'Biology'],
    keywords: ['Ocean Circulation', 'Marine Ecosystems', 'Polar Climate'],
    expedition: null,
    relatedDatasets: 5,
    relatedReports: 4,
    relatedMedia: 6,
    image: IMG.p10,
    journal: 'Demo Polar Review',
    doi: null,
    language: 'English',
  },
  {
    id: 'pub-glac-11',
    title: 'Mass-balance survey methods for coastal glaciers (sample)',
    type: 'Technical Paper',
    year: 2022,
    added: '2022-10-12',
    region: 'Antarctic',
    abstract: 'Sample survey methods note for coastal glacier mass-balance work. Demo content.',
    authors: ['S. Demo', 'H. Sample'],
    institution: 'Glaciology Group (demo)',
    researchAreas: ['Glaciology'],
    keywords: ['Ice Sheets', 'Glacial Dynamics', 'Antarctic'],
    expedition: { id: 'exp-ice-09', number: 'IC-09', title: 'Ice Sheet Monitoring' },
    relatedDatasets: 3,
    relatedReports: 2,
    relatedMedia: 2,
    image: IMG.p11,
    journal: 'Demo Cryosphere Letters',
    doi: null,
    language: 'English',
  },
  {
    id: 'pub-atmos-12',
    title: 'Boundary-layer behaviour at a polar station (sample note)',
    type: 'Conference Paper',
    year: 2024,
    added: '2024-02-28',
    region: 'Arctic',
    abstract:
      'Illustrative boundary-layer observation note at a coastal polar station. Demo content.',
    authors: ['P. Demo', 'A. Sample'],
    institution: 'Atmospheric Sciences Unit (demo)',
    researchAreas: ['Atmospheric Science'],
    keywords: ['Atmospheric Change', 'Polar Climate', 'Arctic'],
    expedition: { id: 'exp-arctic-12', number: 'AR-12', title: 'Arctic Atmospheric Expedition' },
    relatedDatasets: 2,
    relatedReports: 1,
    relatedMedia: 2,
    image: IMG.p12,
    journal: 'Demo Boundary Layer Proceedings',
    doi: null,
    language: 'English',
  },
];

/* -------------------------------------------------------------------------- */
/*  Domains, keywords, researchers, timeline, connections                     */
/* -------------------------------------------------------------------------- */
const DOMAINS = [
  {
    key: 'Climate Science',
    icon: FiThermometer,
    blurb: 'Long-term variability across polar latitudes.',
  },
  { key: 'Glaciology', icon: FiLayers, blurb: 'Ice sheets, glacier mass balance, and dynamics.' },
  { key: 'Oceanography', icon: FiDroplet, blurb: 'Ocean circulation, sea ice, and productivity.' },
  { key: 'Biology', icon: FiFeather, blurb: 'Marine and terrestrial polar ecosystems.' },
  {
    key: 'Atmospheric Science',
    icon: FiWind,
    blurb: 'Aerosols, snow chemistry, air-mass transport.',
  },
  { key: 'Geology', icon: FiCompass, blurb: 'Bedrock, sediments, and geological evolution.' },
  { key: 'Remote Sensing', icon: FiGlobe, blurb: 'Satellite observation of polar surfaces.' },
  {
    key: 'Environmental Science',
    icon: FiActivity,
    blurb: 'Monitoring polar environments over time.',
  },
];

const KEYWORDS = [
  'Ice Sheets',
  'Sea Ice',
  'Ocean Circulation',
  'Polar Climate',
  'Marine Ecosystems',
  'Permafrost',
  'Remote Sensing',
  'Atmospheric Change',
  'Biodiversity',
  'Glacial Dynamics',
];

const RESEARCHERS = [
  {
    id: 'res-1',
    name: 'Dr. A. Sample',
    focus: 'Polar glaciology',
    institution: 'Cryosphere Sciences Group (demo)',
    region: 'Antarctic',
    areas: ['Glaciology', 'Climate Science'],
    publications: 14,
    avatar: IMG.a1,
  },
  {
    id: 'res-2',
    name: 'Dr. N. Demo',
    focus: 'Arctic atmospheric science',
    institution: 'Atmospheric Sciences Unit (demo)',
    region: 'Arctic',
    areas: ['Atmospheric Science'],
    publications: 11,
    avatar: IMG.a2,
  },
  {
    id: 'res-3',
    name: 'Dr. R. Example',
    focus: 'Southern Ocean hydrography',
    institution: 'Marine Sciences Division (demo)',
    region: 'Antarctic',
    areas: ['Oceanography'],
    publications: 19,
    avatar: IMG.a3,
  },
  {
    id: 'res-4',
    name: 'Dr. M. Sample',
    focus: 'Marine biodiversity',
    institution: 'Marine Biology Unit (demo)',
    region: 'Antarctic',
    areas: ['Biology'],
    publications: 9,
    avatar: IMG.a4,
  },
];

const TIMELINE = [
  { year: 2018, label: 'Baseline surveys' },
  { year: 2020, label: 'Seasonal monitoring' },
  { year: 2022, label: 'Long-term series' },
  { year: 2024, label: 'Cross-domain review' },
  { year: 2026, label: 'Connected archive' },
];

const CONNECTION_CHAIN = [
  {
    icon: FiBookOpen,
    label: 'Publication',
    desc: 'Sample polar ocean change study',
    to: '/knowledge/publications',
  },
  { icon: FiCompass, label: 'Expedition', desc: 'Expedition Alpha (demo)', to: '/expeditions' },
  {
    icon: FiDatabase,
    label: 'Dataset',
    desc: 'Ocean observation dataset (demo)',
    to: '/knowledge/datasets',
  },
  {
    icon: FiFileText,
    label: 'Report',
    desc: 'Expedition findings report (demo)',
    to: '/knowledge/reports',
  },
  { icon: FiImage, label: 'Media', desc: 'Field research story (demo)', to: '/media' },
  {
    icon: FiUser,
    label: 'Researcher',
    desc: 'Sample investigator profile',
    to: '/knowledge/publications',
  },
];

const REGIONS = ['All', 'Arctic', 'Antarctic', 'Both Poles'];
const TYPES = [
  'All',
  'Journal Article',
  'Research Paper',
  'Review',
  'Conference Paper',
  'Technical Paper',
];
const YEARS = ['All', '2026', '2025', '2024', '2023', '2022'];
const SORTS = [
  { key: 'newest', label: 'Newest' },
  { key: 'oldest', label: 'Oldest' },
  { key: 'relevant', label: 'Most relevant' },
  { key: 'az', label: 'A–Z' },
];

const STATS = [
  { label: 'Publications', value: 320, suffix: '+', icon: FiBookOpen },
  { label: 'Research domains', value: 8, suffix: '', icon: FiLayers },
  { label: 'Researchers (featured)', value: 24, suffix: '+', icon: FiUsers },
  { label: 'Connected expeditions', value: 42, suffix: '+', icon: FiCompass },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
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

function RegionBadge({ region }) {
  const isArctic = region === 'Arctic';
  const isBoth = region === 'Both Poles';
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
      style={{
        borderColor: isArctic
          ? 'color-mix(in srgb, var(--color-accent-secondary) 45%, transparent)'
          : isBoth
            ? 'color-mix(in srgb, var(--color-accent-primary) 45%, transparent)'
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
      className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium text-[var(--color-text-secondary)]"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <FiBookOpen className="h-2.5 w-2.5" />
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

function BookmarkButton({ active, onClick, size = 'sm' }) {
  const cls = size === 'sm' ? 'h-8 w-8' : 'h-9 w-9';
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      aria-pressed={active}
      aria-label={active ? 'Remove bookmark' : 'Save publication'}
      title={active ? 'Remove bookmark' : 'Save publication'}
      className={`flex ${cls} items-center justify-center rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]`}
      style={{
        borderColor: active ? AC : 'var(--color-border)',
        background: active ? AC_SOFT : 'var(--color-bg-primary)',
        color: active ? AC : 'var(--color-text-secondary)',
      }}
    >
      <FiBookmark className="h-4 w-4" fill={active ? 'currentColor' : 'none'} />
    </button>
  );
}

/* ========================================================================== */
/*  Page                                                                      */
/* ========================================================================== */
export default function Publications({ dark, setDark }) {
  /* ---- state -------------------------------------------------------------- */
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('All');
  const [domain, setDomain] = useState(null);
  const [type, setType] = useState('All');
  const [year, setYear] = useState('All');
  const [keyword, setKeyword] = useState(null);
  const [sort, setSort] = useState('newest');
  const [view, setView] = useState('grid');
  const [bookmarks, setBookmarks] = useState(() => new Set());
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleBookmark = (id) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  /* ---- derived list ------------------------------------------------------ */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = PUBLICATIONS.filter((p) => {
      if (showSavedOnly && !bookmarks.has(p.id)) return false;
      if (region !== 'All' && p.region !== region) return false;
      if (domain && !p.researchAreas.includes(domain)) return false;
      if (type !== 'All' && p.type !== type) return false;
      if (year !== 'All' && String(p.year) !== year) return false;
      if (keyword && !p.keywords.includes(keyword)) return false;

      if (q) {
        const hay = [
          p.title,
          p.abstract,
          p.authors.join(' '),
          p.researchAreas.join(' '),
          p.keywords.join(' '),
          p.region,
          p.institution,
          p.journal || '',
          String(p.year),
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
        const weight = (x) =>
          (x.expedition ? 3 : 0) +
          (bookmarks.has(x.id) ? 2 : 0) +
          Math.min((x.relatedDatasets + x.relatedReports + x.relatedMedia) / 4, 5);
        return weight(b) - weight(a);
      }
      return 0;
    });

    return list;
  }, [query, region, domain, type, year, keyword, sort, showSavedOnly, bookmarks]);

  const featured = PUBLICATIONS[0];
  const recentlyAdded = useMemo(
    () => [...PUBLICATIONS].sort((a, b) => b.added.localeCompare(a.added)).slice(0, 4),
    []
  );

  const hasFilters =
    query !== '' ||
    region !== 'All' ||
    domain !== null ||
    type !== 'All' ||
    year !== 'All' ||
    keyword !== null ||
    showSavedOnly;

  const clearFilters = () => {
    setQuery('');
    setRegion('All');
    setDomain(null);
    setType('All');
    setYear('All');
    setKeyword(null);
    setSort('newest');
    setShowSavedOnly(false);
  };

  const activeFilterCount =
    (region !== 'All' ? 1 : 0) +
    (domain ? 1 : 0) +
    (type !== 'All' ? 1 : 0) +
    (year !== 'All' ? 1 : 0) +
    (keyword ? 1 : 0);

  return (
    <div
      className="min-h-screen antialiased"
      style={{
        background: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
      }}
    >
      <style>{STYLES}</style>

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
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top,
                var(--pv-pub-hero-overlay) 0%,
                color-mix(in srgb, var(--pv-pub-hero-overlay) 65%, transparent) 40%,
                color-mix(in srgb, var(--pv-pub-hero-overlay) 25%, transparent) 100%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right,
                color-mix(in srgb, var(--pv-pub-hero-overlay) 78%, transparent) 0%,
                transparent 55%,
                transparent 100%)`,
            }}
          />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-20 pt-24 sm:px-8 sm:pb-24 sm:pt-32 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div
                className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em]"
                style={{ color: 'var(--pv-pub-hero-text-dim)' }}
              >
                <span className="h-px w-8" style={{ background: 'var(--pv-pub-hero-divider)' }} />
                Polar Research Library
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1
                className="mt-6 text-[2.1rem] font-medium leading-[1.05] tracking-[-0.035em] sm:text-[3rem] lg:text-[3.6rem]"
                style={{ color: 'var(--pv-pub-hero-text)' }}
              >
                Explore the science shaping our understanding of the poles.
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p
                className="mt-6 max-w-xl text-[15px] leading-relaxed sm:text-[16px]"
                style={{ color: 'var(--pv-pub-hero-text-dim)' }}
              >
                PolarVerse connects polar research publications with the expeditions that produced
                them, the datasets they rely on, the reports they grew into, and the media that
                carries them further.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#explorer"
                  className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13.5px] font-medium transition-colors"
                  style={{
                    background: 'var(--pv-pub-hero-text)',
                    color: 'var(--pv-pub-hero-overlay)',
                  }}
                >
                  Explore publications
                  <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#domains"
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[13.5px] font-medium backdrop-blur-sm transition-colors"
                  style={{
                    borderColor: 'color-mix(in srgb, var(--pv-pub-hero-text) 25%, transparent)',
                    color: 'color-mix(in srgb, var(--pv-pub-hero-text) 92%, transparent)',
                  }}
                >
                  <FiLayers className="h-3.5 w-3.5" />
                  Research by topic
                </a>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div
                className="mt-14 flex items-center gap-3 border-t pt-6 text-[11px] font-mono uppercase tracking-[0.18em]"
                style={{
                  borderColor: 'var(--pv-pub-hero-divider)',
                  color: 'color-mix(in srgb, var(--pv-pub-hero-text) 50%, transparent)',
                }}
              >
                <span>READ</span>
                <span
                  className="h-px flex-1"
                  style={{ background: 'var(--pv-pub-hero-divider)' }}
                />
                <span>CONNECT</span>
                <span
                  className="h-px flex-1"
                  style={{ background: 'var(--pv-pub-hero-divider)' }}
                />
                <span>UNDERSTAND</span>
                <span
                  className="h-px flex-1"
                  style={{ background: 'var(--pv-pub-hero-divider)' }}
                />
                <span>SHARE</span>
              </div>
            </Reveal>
          </div>

          {/* side: sample publication metadata card */}
          <div className="lg:col-span-5">
            <Reveal delay={220}>
              <div
                className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-2xl border backdrop-blur-md"
                style={{
                  borderColor: 'var(--pv-pub-glass-border)',
                  background: 'var(--pv-pub-glass-bg)',
                }}
              >
                <div
                  className="flex items-center justify-between border-b px-5 py-3"
                  style={{ borderColor: 'var(--pv-pub-hero-divider)' }}
                >
                  <div
                    className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em]"
                    style={{
                      color: 'color-mix(in srgb, var(--pv-pub-hero-text) 65%, transparent)',
                    }}
                  >
                    <FiBookOpen className="h-3 w-3" />
                    Sample publication index
                  </div>
                  <span
                    className="rounded-full px-2 py-0.5 text-[9.5px] font-mono uppercase tracking-[0.14em]"
                    style={{
                      background: 'color-mix(in srgb, var(--pv-pub-hero-text) 12%, transparent)',
                      color: 'color-mix(in srgb, var(--pv-pub-hero-text) 85%, transparent)',
                    }}
                  >
                    Demo
                  </span>
                </div>

                <div className="space-y-0 p-5">
                  {[
                    { k: 'Publications', v: '320+' },
                    { k: 'Research domains', v: '8' },
                    { k: 'Connected expeditions', v: '42+' },
                    { k: 'Featured researchers', v: '24+' },
                    { k: 'Latest year', v: '2026' },
                  ].map((row, i) => (
                    <div
                      key={row.k}
                      className="flex items-center justify-between border-b py-2.5 last:border-b-0"
                      style={{
                        borderColor: 'rgba(255,255,255,0.08)',
                        opacity: 1 - i * 0.06,
                      }}
                    >
                      <span
                        style={{
                          color: 'color-mix(in srgb, var(--pv-pub-hero-text) 55%, transparent)',
                        }}
                      >
                        {row.k}
                      </span>
                      <span className="font-mono" style={{ color: 'var(--pv-pub-hero-text)' }}>
                        {row.v}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className="border-t px-5 py-3 text-[10px] font-mono uppercase tracking-[0.16em]"
                  style={{
                    borderColor: 'var(--pv-pub-hero-divider)',
                    color: 'color-mix(in srgb, var(--pv-pub-hero-text) 45%, transparent)',
                  }}
                >
                  Sample figures — replaced with live values once the publications API is connected
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
                Publications at a glance
              </p>
              <p className="max-w-sm text-[11.5px] leading-relaxed text-[var(--color-text-secondary)]">
                Sample figures for demonstration — replaced by live values when the publications API
                is connected.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.label} delay={i * 70}>
                  <div className="flex items-start gap-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
                      style={{
                        borderColor: 'var(--color-border)',
                        background: 'var(--color-bg-secondary)',
                        color: AC,
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-[1.6rem] font-medium tracking-tight text-[var(--color-text-primary)] sm:text-[1.85rem]">
                        <Counter to={s.value} suffix={s.suffix} />
                      </div>
                      <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                        {s.label}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
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
                  Search and filter the publication archive
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowSavedOnly((v) => !v)}
                  aria-pressed={showSavedOnly}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                  style={{
                    borderColor: showSavedOnly ? AC : 'var(--color-border)',
                    background: showSavedOnly ? AC_SOFT : 'transparent',
                    color: showSavedOnly ? AC : 'var(--color-text-secondary)',
                  }}
                >
                  <FiBookmark
                    className="h-3.5 w-3.5"
                    fill={showSavedOnly ? 'currentColor' : 'none'}
                  />
                  Saved ({bookmarks.size})
                </button>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12.5px] font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <FiX className="h-3.5 w-3.5" />
                    Clear
                  </button>
                )}
              </div>
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
                placeholder="Search publications, authors, topics, regions…"
                aria-label="Search publications"
                className="w-full rounded-xl border py-3.5 pl-11 pr-11 text-[14px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                style={{
                  background: 'var(--color-bg-secondary)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-primary)',
                }}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                >
                  <FiX className="h-4 w-4" />
                </button>
              )}
            </div>
          </Reveal>

          {/* desktop filters */}
          <div className="mt-8 hidden space-y-6 lg:block">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <FilterGroup label="Polar region" icon={FiGlobe}>
                {REGIONS.map((r) => (
                  <Chip key={r} active={region === r} onClick={() => setRegion(r)}>
                    {r}
                  </Chip>
                ))}
              </FilterGroup>

              <FilterGroup label="Research domain" icon={FiLayers}>
                <Chip active={domain === null} onClick={() => setDomain(null)}>
                  Any
                </Chip>
                {DOMAINS.map((d) => (
                  <Chip key={d.key} active={domain === d.key} onClick={() => setDomain(d.key)}>
                    {d.key}
                  </Chip>
                ))}
              </FilterGroup>

              <FilterGroup label="Publication type" icon={FiBookOpen}>
                {TYPES.map((t) => (
                  <Chip key={t} active={type === t} onClick={() => setType(t)}>
                    {t}
                  </Chip>
                ))}
              </FilterGroup>

              <FilterGroup label="Publication year" icon={FiCalendar}>
                {YEARS.map((y) => (
                  <Chip key={y} active={year === y} onClick={() => setYear(y)}>
                    {y}
                  </Chip>
                ))}
              </FilterGroup>

              <FilterGroup label="Sort by" icon={FiSliders}>
                {SORTS.map((s) => (
                  <Chip key={s.key} active={sort === s.key} onClick={() => setSort(s.key)}>
                    {s.label}
                  </Chip>
                ))}
              </FilterGroup>

              <FilterGroup label="Filter by keyword" icon={FiTag}>
                <Chip active={keyword === null} onClick={() => setKeyword(null)}>
                  Any
                </Chip>
                {KEYWORDS.slice(0, 6).map((k) => (
                  <Chip key={k} active={keyword === k} onClick={() => setKeyword(k)}>
                    {k}
                  </Chip>
                ))}
              </FilterGroup>
            </div>
          </div>

          {/* mobile filters */}
          <div className="mt-6 lg:hidden">
            <button
              type="button"
              onClick={() => setShowMobileFilters((v) => !v)}
              aria-expanded={showMobileFilters}
              className="flex w-full items-center justify-between rounded-xl border px-4 py-3 text-[13px] font-medium text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
              style={{
                borderColor: 'var(--color-border)',
                background: 'var(--color-bg-secondary)',
              }}
            >
              <span className="inline-flex items-center gap-2">
                <FiFilter className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span
                    className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10.5px] font-semibold"
                    style={{ background: AC_SOFT, color: AC }}
                  >
                    {activeFilterCount}
                  </span>
                )}
              </span>
              <FiChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${showMobileFilters ? 'rotate-180' : ''}`}
              />
            </button>

            {showMobileFilters && (
              <div
                className="mt-4 space-y-5 rounded-xl border p-4"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <FilterGroup label="Polar region" icon={FiGlobe}>
                  {REGIONS.map((r) => (
                    <Chip key={r} active={region === r} onClick={() => setRegion(r)}>
                      {r}
                    </Chip>
                  ))}
                </FilterGroup>

                <FilterGroup label="Research domain" icon={FiLayers}>
                  <Chip active={domain === null} onClick={() => setDomain(null)}>
                    Any
                  </Chip>
                  {DOMAINS.map((d) => (
                    <Chip key={d.key} active={domain === d.key} onClick={() => setDomain(d.key)}>
                      {d.key}
                    </Chip>
                  ))}
                </FilterGroup>

                <FilterGroup label="Publication type" icon={FiBookOpen}>
                  {TYPES.map((t) => (
                    <Chip key={t} active={type === t} onClick={() => setType(t)}>
                      {t}
                    </Chip>
                  ))}
                </FilterGroup>

                <FilterGroup label="Publication year" icon={FiCalendar}>
                  {YEARS.map((y) => (
                    <Chip key={y} active={year === y} onClick={() => setYear(y)}>
                      {y}
                    </Chip>
                  ))}
                </FilterGroup>

                <FilterGroup label="Sort by" icon={FiSliders}>
                  {SORTS.map((s) => (
                    <Chip key={s.key} active={sort === s.key} onClick={() => setSort(s.key)}>
                      {s.label}
                    </Chip>
                  ))}
                </FilterGroup>

                <FilterGroup label="Filter by keyword" icon={FiTag}>
                  <Chip active={keyword === null} onClick={() => setKeyword(null)}>
                    Any
                  </Chip>
                  {KEYWORDS.map((k) => (
                    <Chip key={k} active={keyword === k} onClick={() => setKeyword(k)}>
                      {k}
                    </Chip>
                  ))}
                </FilterGroup>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FEATURED PUBLICATION                                             */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div
              className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em]"
              style={{ color: AC }}
            >
              <span className="h-px w-8" style={{ background: AC }} />
              Featured publication
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <div
                  className="relative overflow-hidden rounded-xl border"
                  style={{
                    borderColor: 'var(--color-border)',
                    background: 'var(--color-bg-secondary)',
                  }}
                >
                  <img
                    src={IMG.featured}
                    alt="Field site related to the featured publication"
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top,
                        var(--pv-pub-image-overlay) 0%,
                        transparent 55%,
                        transparent 100%)`,
                    }}
                  />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <RegionBadge region={featured.region} />
                    <TypeBadge type={featured.type} />
                  </div>
                  <div className="absolute inset-x-4 bottom-4">
                    <div
                      className="text-[10.5px] font-mono uppercase tracking-[0.16em]"
                      style={{ color: 'rgba(255,255,255,0.75)' }}
                    >
                      {featured.year} · {featured.journal || 'Demo journal'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <h3 className="text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.9rem]">
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
                    <FiAward className="h-3.5 w-3.5" /> {featured.institution}
                  </span>
                </div>

                <p className="mt-6 text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  {featured.abstract}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {featured.researchAreas.map((a) => (
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
                  {featured.keywords.slice(0, 2).map((k) => (
                    <span
                      key={k}
                      className="rounded-full border px-2.5 py-1 text-[11px] font-medium"
                      style={{ borderColor: AC, color: AC, background: AC_SOFT }}
                    >
                      #{k}
                    </span>
                  ))}
                </div>

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
                        Connected expedition · {featured.expedition.number}
                      </div>
                      <div className="truncate text-[13px] font-medium text-[var(--color-text-primary)]">
                        {featured.expedition.title}
                      </div>
                    </div>
                    <FiChevronRight className="h-4 w-4 text-[var(--color-text-secondary)]" />
                  </Link>
                )}

                <div
                  className="mt-6 grid grid-cols-3 gap-4 border-t pt-6"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <MiniStat label="Datasets" value={featured.relatedDatasets} icon={FiDatabase} />
                  <MiniStat label="Reports" value={featured.relatedReports} icon={FiFileText} />
                  <MiniStat label="Media" value={featured.relatedMedia} icon={FiImage} />
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    to={`/knowledge/publications/${featured.id}`}
                    className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold shadow-sm transition-transform hover:scale-[1.02]"
                    style={{
                      background:
                        'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
                      color: 'var(--color-accent-primary-foreground)',
                    }}
                  >
                    Read publication
                    <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    to={`/knowledge/publications/${featured.id}`}
                    className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent-primary)]"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    View details
                  </Link>
                  <BookmarkButton
                    active={bookmarks.has(featured.id)}
                    onClick={() => toggleBookmark(featured.id)}
                    size="lg"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/* PUBLICATION EXPLORER                                             */}
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
                  Explore publications
                </h2>
                <p className="mt-3 max-w-xl text-[13.5px] text-[var(--color-text-secondary)]">
                  Discover research across polar regions, disciplines, expeditions and scientific
                  themes. Showing{' '}
                  <span className="font-medium text-[var(--color-text-primary)]">
                    {filtered.length}
                  </span>{' '}
                  of {PUBLICATIONS.length} publications.
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
                  <FiBookOpen className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-[16px] font-medium text-[var(--color-text-primary)]">
                  No publications found
                </h3>
                <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                  Try changing your search terms or clearing some filters.
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
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i * 40, 200)}>
                  <PublicationCard
                    publication={p}
                    bookmarked={bookmarks.has(p.id)}
                    onToggleBookmark={() => toggleBookmark(p.id)}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <ul className="mt-12 divide-y border-y" style={{ borderColor: 'var(--color-border)' }}>
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i * 30, 150)}>
                  <li>
                    <PublicationRow
                      publication={p}
                      bookmarked={bookmarks.has(p.id)}
                      onToggleBookmark={() => toggleBookmark(p.id)}
                    />
                  </li>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ================================================================ */}
      {/* RESEARCH DOMAINS                                                 */}
      {/* ================================================================ */}
      <section id="domains" className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-xl">
                <p
                  className="text-[11px] font-medium uppercase tracking-[0.22em]"
                  style={{ color: AC }}
                >
                  Research domains
                </p>
                <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.75rem]">
                  Eight fields, one connected library.
                </h2>
              </div>
              <p className="max-w-sm text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                Click a domain to narrow the publication listing above.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {DOMAINS.map((d, i) => {
              const Icon = d.icon;
              const count = PUBLICATIONS.filter((p) => p.researchAreas.includes(d.key)).length;
              const active = domain === d.key;
              return (
                <Reveal key={d.key} delay={i * 55}>
                  <button
                    type="button"
                    onClick={() => {
                      setDomain(active ? null : d.key);
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
                      {d.key}
                    </span>
                    <span className="text-[12.5px] leading-snug text-[var(--color-text-secondary)]">
                      {d.blurb}
                    </span>
                    <span className="mt-auto pt-3 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                      {count} {count === 1 ? 'publication' : 'publications'}
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* RESEARCHERS                                                      */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="max-w-xl">
              <p
                className="text-[11px] font-medium uppercase tracking-[0.22em]"
                style={{ color: AC }}
              >
                Researchers
              </p>
              <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.75rem]">
                Researchers behind the science.
              </h2>
              <p className="mt-3 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                Sample researcher profiles for demonstration — replaced by real profiles when
                connected to the platform.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RESEARCHERS.map((r, i) => (
              <Reveal key={r.id} delay={i * 60}>
                <div
                  className="group flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1"
                  style={{
                    borderColor: 'var(--color-border)',
                    background: 'var(--color-bg-secondary)',
                  }}
                >
                  <div className="flex items-center gap-3 p-5">
                    <img
                      src={r.avatar}
                      alt={`Portrait of ${r.name} (sample researcher)`}
                      className="h-14 w-14 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <div className="truncate text-[14px] font-medium text-[var(--color-text-primary)]">
                        {r.name}
                      </div>
                      <div className="mt-0.5 truncate text-[11.5px] text-[var(--color-text-secondary)]">
                        {r.focus}
                      </div>
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <div className="text-[11.5px] text-[var(--color-text-secondary)]">
                      {r.institution}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {r.areas.map((a) => (
                        <span
                          key={a}
                          className="rounded-full border px-2 py-0.5 text-[10.5px] text-[var(--color-text-secondary)]"
                          style={{ borderColor: 'var(--color-border)' }}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                    <div
                      className="mt-4 flex items-center justify-between border-t pt-3 text-[11.5px]"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <span className="inline-flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                        <FiBookOpen className="h-3 w-3" />
                        {r.publications} publications
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                        <FiGlobe className="h-3 w-3" />
                        {r.region}
                      </span>
                    </div>
                    <button
                      type="button"
                      disabled
                      title="Researcher profiles will be available once the researcher API is connected"
                      className="mt-4 inline-flex w-full cursor-not-allowed items-center justify-between rounded-lg border px-3 py-2 text-[12px] font-medium text-[var(--color-text-secondary)] opacity-70"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      View researcher
                      <FiArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* KNOWLEDGE CONNECTIONS                                            */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="max-w-xl">
              <p
                className="text-[11px] font-medium uppercase tracking-[0.22em]"
                style={{ color: AC }}
              >
                Knowledge connections
              </p>
              <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.9rem]">
                Every publication connects to a larger story.
              </h2>
              <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
                A publication is not an isolated PDF. It links back to the expedition that produced
                the observations, the dataset those observations produced, the report that framed
                the study, and the media that carried it further.
              </p>
            </div>
          </Reveal>

          <div className="mt-12">
            <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
              {CONNECTION_CHAIN.map((c, i) => {
                const Icon = c.icon;
                return (
                  <Reveal key={c.label} delay={i * 70}>
                    <li className="relative">
                      <Link
                        to={c.to}
                        className="group flex h-full flex-col items-start gap-3 rounded-xl border p-4 transition-colors hover:border-[var(--color-accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                        style={{
                          borderColor: 'var(--color-border)',
                          background: 'var(--color-bg-secondary)',
                        }}
                      >
                        <div className="flex w-full items-center justify-between">
                          <span
                            className="flex h-9 w-9 items-center justify-center rounded-lg"
                            style={{ background: AC_SOFT, color: AC }}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                          {c.label}
                        </div>
                        <div className="text-[12.5px] leading-snug text-[var(--color-text-primary)]">
                          {c.desc}
                        </div>
                      </Link>
                      {i < CONNECTION_CHAIN.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="absolute -right-3 top-1/2 hidden -translate-y-1/2 items-center text-[var(--color-text-secondary)] lg:flex"
                        >
                          <FiArrowRight className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </li>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* RESEARCH SUMMARY PREVIEW + AI CTA                                */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <div
                  className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em]"
                  style={{ color: AC }}
                >
                  <span className="h-px w-8" style={{ background: AC }} />
                  Research insight
                </div>
                <h2 className="mt-5 text-[1.6rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.9rem]">
                  Understand a publication before reading it.
                </h2>
                <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  PolarVerse is designed to summarise a publication's research question, study area,
                  method and connected data — so you can see if it is worth your time before opening
                  the full paper.
                </p>

                <p
                  className="mt-8 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10.5px] font-mono uppercase tracking-[0.14em]"
                  style={{
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: AC }} />
                  Demo research summary — not a scientific result
                </p>

                <Link
                  to="/ai"
                  className="group mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold shadow-sm transition-transform hover:scale-[1.02]"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
                    color: 'var(--color-accent-primary-foreground)',
                  }}
                >
                  <FiCpu className="h-3.5 w-3.5" />
                  Understand this research with AI
                  <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={120}>
                <div
                  className="overflow-hidden rounded-2xl border"
                  style={{
                    borderColor: 'var(--color-border)',
                    background: 'var(--color-bg-secondary)',
                  }}
                >
                  <div
                    className="flex items-center justify-between border-b px-5 py-3"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                      <FiZap className="h-3.5 w-3.5" />
                      Sample research summary
                    </div>
                    <span
                      className="rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.14em]"
                      style={{
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      Demo
                    </span>
                  </div>

                  <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
                    {[
                      {
                        icon: FiTarget,
                        label: 'Research question',
                        value: 'How does polar ocean productivity vary across a season?',
                      },
                      {
                        icon: FiMapPin,
                        label: 'Study area',
                        value: 'Southern Ocean · coastal sector (sample)',
                      },
                      {
                        icon: FiActivity,
                        label: 'Method',
                        value: 'Field sampling and repeat measurements (sample)',
                      },
                      {
                        icon: FiTag,
                        label: 'Key topics',
                        value: 'Ocean Circulation · Marine Ecosystems · Polar Climate',
                      },
                      {
                        icon: FiDatabase,
                        label: 'Connected data',
                        value: '2 datasets · 1 report · 3 media items',
                      },
                      {
                        icon: FiCompass,
                        label: 'Related expedition',
                        value: 'Expedition SO-27 (sample link)',
                      },
                    ].map((row) => {
                      const Icon = row.icon;
                      return (
                        <div
                          key={row.label}
                          className="grid grid-cols-1 gap-2 px-5 py-4 sm:grid-cols-[180px_1fr]"
                          style={{ borderColor: 'var(--color-border)' }}
                        >
                          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                            <Icon className="h-3.5 w-3.5" />
                            {row.label}
                          </div>
                          <div className="text-[13.5px] leading-relaxed text-[var(--color-text-primary)]">
                            {row.value}
                          </div>
                        </div>
                      );
                    })}
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
                  Fresh from the library
                </p>
                <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.75rem]">
                  Recently added
                </h2>
              </div>
              <Link
                to="/knowledge/publications"
                className="group inline-flex items-center gap-2 text-[13px] font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent-primary)]"
              >
                View all publications
                <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>

          <ul className="mt-10 divide-y border-y" style={{ borderColor: 'var(--color-border)' }}>
            {recentlyAdded.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <li>
                  <Link
                    to={`/knowledge/publications/${p.id}`}
                    className="group grid grid-cols-1 items-center gap-5 py-5 transition-colors hover:bg-[var(--color-bg-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] sm:grid-cols-[80px_1fr_auto]"
                  >
                    <div className="overflow-hidden rounded-md">
                      <img
                        src={p.image}
                        alt={`${p.title} cover`}
                        className="aspect-square w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <RegionBadge region={p.region} />
                        <TypeBadge type={p.type} />
                      </div>
                      <h3 className="mt-3 text-[15px] font-medium leading-snug tracking-tight text-[var(--color-text-primary)]">
                        {p.title}
                      </h3>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-[var(--color-text-secondary)]">
                        <span className="inline-flex items-center gap-1.5">
                          <FiCalendar className="h-3 w-3" />
                          {p.year}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <FiClock className="h-3 w-3" />
                          Added {p.added}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <FiUsers className="h-3 w-3" />
                          {p.authors.length} authors
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
                Research timeline
              </p>
              <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.75rem]">
                How polar research evolves.
              </h2>
              <p className="mt-3 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                A visual guide to the themes that appear year on year in the publication archive.
              </p>
            </div>
          </Reveal>

          <div className="relative mt-14">
            <div
              className="absolute left-0 right-0 top-[10px] hidden h-px md:block"
              style={{ background: 'var(--color-border)' }}
            />
            <ol className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-4">
              {TIMELINE.map((t, i) => (
                <Reveal key={t.year} delay={i * 70}>
                  <li className="relative">
                    <div className="flex items-center gap-3 md:block">
                      <span
                        className="relative z-10 flex h-[21px] w-[21px] items-center justify-center rounded-full border"
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
                    <div
                      className="mt-4 rounded-lg border p-4"
                      style={{
                        borderColor: 'var(--color-border)',
                        background: 'var(--color-bg-secondary)',
                      }}
                    >
                      <div className="text-[13px] font-medium text-[var(--color-text-primary)]">
                        {t.label}
                      </div>
                      <div className="mt-1 text-[11.5px] text-[var(--color-text-secondary)]">
                        Sample milestone
                      </div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* KEYWORDS                                                         */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="max-w-xl">
              <p
                className="text-[11px] font-medium uppercase tracking-[0.22em]"
                style={{ color: AC }}
              >
                Explore by keyword
              </p>
              <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.75rem]">
                Start with a theme.
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-2.5">
            <Chip active={keyword === null} onClick={() => setKeyword(null)}>
              Any
            </Chip>
            {KEYWORDS.map((k) => (
              <Chip
                key={k}
                active={keyword === k}
                onClick={() => {
                  setKeyword(keyword === k ? null : k);
                  document
                    .getElementById('explorer')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                #{k}
              </Chip>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CTA                                                              */}
      {/* ================================================================ */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={IMG.cta} alt="" aria-hidden="true" className="h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background: 'color-mix(in srgb, var(--pv-pub-hero-overlay) 75%, transparent)',
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="max-w-2xl">
            <Reveal>
              <h2
                className="text-[1.9rem] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[2.5rem]"
                style={{ color: 'var(--pv-pub-hero-text)' }}
              >
                Go beyond reading research.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p
                className="mt-6 max-w-lg text-[15px] leading-relaxed"
                style={{ color: 'var(--pv-pub-hero-text-dim)' }}
              >
                Publications become more useful when connected with the expeditions that produced
                them, the datasets they rely on, and the learning resources that make them
                understandable.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  to="/expeditions"
                  className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13.5px] font-medium transition-colors"
                  style={{
                    background: 'var(--pv-pub-hero-text)',
                    color: 'var(--pv-pub-hero-overlay)',
                  }}
                >
                  Explore expeditions
                  <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/knowledge/datasets"
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[13.5px] font-medium backdrop-blur-sm transition-colors"
                  style={{
                    borderColor: 'color-mix(in srgb, var(--pv-pub-hero-text) 25%, transparent)',
                    color: 'color-mix(in srgb, var(--pv-pub-hero-text) 92%, transparent)',
                  }}
                >
                  <FiDatabase className="h-3.5 w-3.5" />
                  Explore datasets
                </Link>
                <Link
                  to="/ai"
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[13.5px] font-medium backdrop-blur-sm transition-colors"
                  style={{
                    borderColor: 'color-mix(in srgb, var(--pv-pub-hero-text) 25%, transparent)',
                    color: 'color-mix(in srgb, var(--pv-pub-hero-text) 92%, transparent)',
                  }}
                >
                  <FiCpu className="h-3.5 w-3.5" />
                  Ask AI about research
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

function FilterGroup({ label, icon: Icon, children }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2.5">
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
        <div className="text-[14px] font-medium text-[var(--color-text-primary)]">{value}</div>
        <div className="text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
          {label}
        </div>
      </div>
    </div>
  );
}

function PublicationCard({ publication: p, bookmarked, onToggleBookmark }) {
  return (
    <div
      className="group flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1"
      style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-secondary)' }}
    >
      <Link
        to={`/knowledge/publications/${p.id}`}
        className="relative overflow-hidden focus-visible:outline-none"
        aria-label={`View ${p.title}`}
      >
        <img
          src={p.image}
          alt={`${p.title} cover`}
          className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top,
              var(--pv-pub-image-overlay) 0%,
              transparent 45%,
              transparent 100%)`,
          }}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <RegionBadge region={p.region} />
        </div>
        <div className="absolute right-3 top-3">
          <BookmarkButton active={bookmarked} onClick={onToggleBookmark} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <TypeBadge type={p.type} />
          <span className="text-[11px] font-mono text-[var(--color-text-secondary)]">{p.year}</span>
        </div>

        <h3 className="mt-3 text-[15px] font-medium leading-snug tracking-tight text-[var(--color-text-primary)]">
          <Link
            to={`/knowledge/publications/${p.id}`}
            className="transition-colors hover:text-[var(--color-accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
          >
            {p.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
          {p.abstract}
        </p>

        <div className="mt-3 text-[11.5px] text-[var(--color-text-secondary)]">
          <span className="inline-flex items-center gap-1.5">
            <FiUsers className="h-3 w-3" />
            {p.authors.slice(0, 2).join(', ')}
            {p.authors.length > 2 && ` +${p.authors.length - 2}`}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.researchAreas.slice(0, 2).map((a) => (
            <span
              key={a}
              className="rounded-full border px-2 py-0.5 text-[10.5px] font-medium text-[var(--color-text-secondary)]"
              style={{ borderColor: 'var(--color-border)' }}
            >
              {a}
            </span>
          ))}
          {p.keywords.slice(0, 1).map((k) => (
            <span
              key={k}
              className="rounded-full border px-2 py-0.5 text-[10.5px] font-medium"
              style={{ borderColor: AC, color: AC, background: AC_SOFT }}
            >
              #{k}
            </span>
          ))}
        </div>

        {p.expedition && (
          <Link
            to={`/expeditions/${p.expedition.id}`}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border p-2.5 text-[11.5px] transition-colors hover:border-[var(--color-accent-primary)]"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-primary)' }}
          >
            <FiCompass className="h-3.5 w-3.5" style={{ color: AC }} />
            <span className="truncate font-medium text-[var(--color-text-primary)]">
              Exp. {p.expedition.number} · {p.expedition.title}
            </span>
          </Link>
        )}

        <div
          className="mt-4 flex items-center justify-between border-t pt-4 text-[11.5px] text-[var(--color-text-secondary)]"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <span className="inline-flex items-center gap-1.5">
            <FiDatabase className="h-3 w-3" />
            {p.relatedDatasets} datasets
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FiFileText className="h-3 w-3" />
            {p.relatedReports} reports
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FiImage className="h-3 w-3" />
            {p.relatedMedia} media
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <Link
            to={`/knowledge/publications/${p.id}`}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium transition-transform duration-300 group-hover:translate-x-0.5"
            style={{ color: AC }}
          >
            View publication
            <FiArrowRight className="h-3.5 w-3.5" />
          </Link>
          <BookmarkButton active={bookmarked} onClick={onToggleBookmark} />
        </div>
      </div>
    </div>
  );
}

function PublicationRow({ publication: p, bookmarked, onToggleBookmark }) {
  return (
    <div className="group grid grid-cols-1 items-center gap-5 py-5 transition-colors hover:bg-[var(--color-bg-secondary)] sm:grid-cols-[120px_1fr_auto]">
      <Link to={`/knowledge/publications/${p.id}`} className="overflow-hidden rounded-md">
        <img
          src={p.image}
          alt={`${p.title} cover`}
          className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
          loading="lazy"
        />
      </Link>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <RegionBadge region={p.region} />
          <TypeBadge type={p.type} />
          <span className="text-[11.5px] font-mono text-[var(--color-text-secondary)]">
            {p.year}
          </span>
        </div>
        <h3 className="mt-3 text-[15px] font-medium leading-snug tracking-tight text-[var(--color-text-primary)]">
          <Link
            to={`/knowledge/publications/${p.id}`}
            className="transition-colors hover:text-[var(--color-accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
          >
            {p.title}
          </Link>
        </h3>
        <p className="mt-1 text-[12.5px] text-[var(--color-text-secondary)]">
          {p.institution} · {p.authors.slice(0, 2).join(', ')}
          {p.authors.length > 2 && ' et al.'}
        </p>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
          {p.abstract}
        </p>
      </div>

      <div className="flex items-center gap-6 sm:flex-col sm:items-end sm:gap-2">
        <div className="flex gap-4 text-[11px] text-[var(--color-text-secondary)] sm:flex-col sm:items-end">
          <span className="inline-flex items-center gap-1.5">
            <FiDatabase className="h-3 w-3" /> {p.relatedDatasets}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FiFileText className="h-3 w-3" /> {p.relatedReports}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FiImage className="h-3 w-3" /> {p.relatedMedia}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <BookmarkButton active={bookmarked} onClick={onToggleBookmark} />
          <Link
            to={`/knowledge/publications/${p.id}`}
            className="inline-flex items-center gap-1 text-[12.5px] font-medium transition-transform duration-300 group-hover:translate-x-0.5"
            style={{ color: AC }}
          >
            View
            <FiArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
