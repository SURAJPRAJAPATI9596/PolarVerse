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
  FiLock,
  FiUnlock,
  FiBarChart2,
  FiTrendingUp,
  FiHardDrive,
  FiFolder,
  FiTable,
  FiCode,
} from 'react-icons/fi';
import { GiSnowflake1 } from 'react-icons/gi';

/* ============================================================================
   Datasets — scientific data discovery interface for PolarVerse
   ========================================================================== */

/* -------------------------------------------------------------------------- */
/*  Centralized imagery                                                       */
/* -------------------------------------------------------------------------- */
const IMG = {
  hero: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=2400&q=80',
  featured:
    'https://images.unsplash.com/photo-1613573081262-69e37dfd72f1?auto=format&fit=crop&w=2000&q=80',
  cta: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=2400&q=80',
  d1: 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?auto=format&fit=crop&w=1000&q=80',
  d2: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1000&q=80',
  d3: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1000&q=80',
  d4: 'https://images.unsplash.com/photo-1520637836862-4d197d17c50a?auto=format&fit=crop&w=1000&q=80',
  d5: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?auto=format&fit=crop&w=1000&q=80',
  d6: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?auto=format&fit=crop&w=1000&q=80',
  d7: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=1000&q=80',
  d8: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1000&q=80',
  d9: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1000&q=80',
  d10: 'https://images.unsplash.com/photo-1520637836862-4d197d17c50a?auto=format&fit=crop&w=1000&q=80',
  d11: 'https://images.unsplash.com/photo-1613573081262-69e37dfd72f1?auto=format&fit=crop&w=1000&q=80',
  d12: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=1000&q=80',
};

/* -------------------------------------------------------------------------- */
/*  Demo dataset — replace with GET /api/v1/datasets                          */
/* -------------------------------------------------------------------------- */
const DATASETS = [
  {
    id: 'ds-antarctic-sst',
    title: 'Antarctic Surface Temperature Observations',
    description:
      'Environmental observations collected across selected Antarctic research locations during summer field campaigns.',
    region: 'Antarctic',
    location: 'Larsemann Hills, East Antarctica',
    domain: 'Climate',
    dataType: 'Temperature',
    format: 'CSV',
    access: 'Open',
    period: '2019–2025',
    startYear: 2019,
    endYear: 2025,
    records: 12500,
    frequency: 'Daily',
    expedition: { number: '43', title: 'Indian Antarctic Expedition', id: 'exp-43' },
    source: 'Polar Research Dataset',
    institution: 'Polar Research Group',
    updateDate: '2026-01-12',
    added: '2026-01-12',
    keywords: ['temperature', 'surface', 'climate', 'antarctic'],
    cover: IMG.d1,
    related: { reports: 6, publications: 9, photos: 42, videos: 5, researchers: 24 },
  },
  {
    id: 'ds-arctic-aerosol',
    title: 'Arctic Aerosol Flux Measurements',
    description:
      'Continuous aerosol particle characterisation and flux observations at the Himadri station, Svalbard.',
    region: 'Arctic',
    location: 'Ny-Ålesund, Svalbard',
    domain: 'Atmospheric Science',
    dataType: 'Atmospheric',
    format: 'NetCDF',
    access: 'Restricted',
    period: '2020–2025',
    startYear: 2020,
    endYear: 2025,
    records: 48000,
    frequency: 'Hourly',
    expedition: { number: 'AR-12', title: 'Arctic Atmospheric Expedition', id: 'exp-arctic-12' },
    source: 'Atmospheric Sciences Unit',
    institution: 'Atmospheric Sciences Unit',
    updateDate: '2025-11-20',
    added: '2025-11-20',
    keywords: ['aerosol', 'arctic', 'atmosphere', 'particles'],
    cover: IMG.d2,
    related: { reports: 4, publications: 6, photos: 28, videos: 3, researchers: 18 },
  },
  {
    id: 'ds-southern-ocean-ctd',
    title: 'Southern Ocean CTD Profile Series',
    description:
      'Conductivity-temperature-depth profiles recorded across the Prydz Bay sector and coastal transects.',
    region: 'Antarctic',
    location: 'Prydz Bay, Southern Ocean',
    domain: 'Oceanography',
    dataType: 'Oceanographic',
    format: 'CSV',
    access: 'Open',
    period: '2022–2024',
    startYear: 2022,
    endYear: 2024,
    records: 8600,
    frequency: 'Per station',
    expedition: { number: 'SO-27', title: 'Southern Ocean Mission', id: 'exp-so-27' },
    source: 'Marine Sciences Division',
    institution: 'Marine Sciences Division',
    updateDate: '2024-09-02',
    added: '2024-09-02',
    keywords: ['ctd', 'salinity', 'oceanography', 'profiles'],
    cover: IMG.d3,
    related: { reports: 5, publications: 11, photos: 36, videos: 4, researchers: 22 },
  },
  {
    id: 'ds-icesheet-mass',
    title: 'Coastal Ice-Sheet Mass Balance Records',
    description:
      'Repeated glacier surveys, ablation stake readings and mass-balance estimates from a coastal ice-sheet sector.',
    region: 'Antarctic',
    location: 'Dronning Maud Land',
    domain: 'Glaciology',
    dataType: 'Environmental',
    format: 'CSV',
    access: 'Open',
    period: '2018–2024',
    startYear: 2018,
    endYear: 2024,
    records: 3400,
    frequency: 'Seasonal',
    expedition: { number: 'IC-09', title: 'Ice Sheet Monitoring', id: 'exp-ice-09' },
    source: 'Glaciology Group',
    institution: 'Glaciology Group',
    updateDate: '2024-07-14',
    added: '2024-07-14',
    keywords: ['glacier', 'mass balance', 'ice sheet', 'ablation'],
    cover: IMG.d4,
    related: { reports: 4, publications: 6, photos: 30, videos: 3, researchers: 14 },
  },
  {
    id: 'ds-benthic-biodiversity',
    title: 'Coastal Benthic Biodiversity Records',
    description:
      'Benthic and pelagic biodiversity records from coastal Antarctic waters using standard sampling protocols.',
    region: 'Antarctic',
    location: 'Larsemann Hills coastal waters',
    domain: 'Biology',
    dataType: 'Biological',
    format: 'CSV',
    access: 'Open',
    period: '2021–2023',
    startYear: 2021,
    endYear: 2023,
    records: 5600,
    frequency: 'Per survey',
    expedition: { number: 'MB-04', title: 'Polar Marine Biodiversity', id: 'exp-bio-04' },
    source: 'Marine Biology Unit',
    institution: 'Marine Biology Unit',
    updateDate: '2023-12-10',
    added: '2023-12-10',
    keywords: ['biodiversity', 'benthic', 'marine', 'taxonomy'],
    cover: IMG.d5,
    related: { reports: 4, publications: 8, photos: 44, videos: 4, researchers: 20 },
  },
  {
    id: 'ds-svalbard-glacier',
    title: 'Svalbard Glacier Ablation Stake Readings',
    description:
      'Surface ablation measurements from a monitored Svalbard glacier, with meltwater routing notes.',
    region: 'Arctic',
    location: 'Svalbard glaciers',
    domain: 'Glaciology',
    dataType: 'Environmental',
    format: 'CSV',
    access: 'Open',
    period: '2021–2023',
    startYear: 2021,
    endYear: 2023,
    records: 2100,
    frequency: 'Daily (seasonal)',
    expedition: { number: 'AG-06', title: 'Arctic Glacier Study', id: 'exp-arc-glac' },
    source: 'Cryosphere Sciences Group',
    institution: 'Cryosphere Sciences Group',
    updateDate: '2023-09-22',
    added: '2023-09-22',
    keywords: ['glacier', 'ablation', 'arctic', 'svalbard'],
    cover: IMG.d6,
    related: { reports: 3, publications: 4, photos: 22, videos: 2, researchers: 11 },
  },
  {
    id: 'ds-schirmacher-geo',
    title: 'Schirmacher Oasis Bedrock & Sediment Samples',
    description:
      'Bedrock lithology and sediment core descriptions from the Schirmacher Oasis region.',
    region: 'Antarctic',
    location: 'Schirmacher Oasis',
    domain: 'Geology',
    dataType: 'Geospatial',
    format: 'GeoJSON',
    access: 'Open',
    period: '2019–2022',
    startYear: 2019,
    endYear: 2022,
    records: 480,
    frequency: 'Per sample',
    expedition: { number: 'GG-02', title: 'Antarctic Geology Survey', id: 'exp-geo-02' },
    source: 'Geological Survey Unit',
    institution: 'Geological Survey Unit',
    updateDate: '2022-11-03',
    added: '2022-11-03',
    keywords: ['geology', 'bedrock', 'sediment', 'schirmacher'],
    cover: IMG.d7,
    related: { reports: 3, publications: 5, photos: 18, videos: 1, researchers: 9 },
  },
  {
    id: 'ds-arc-himadri-chem',
    title: 'Himadri Snow Chemistry Time Series',
    description:
      'Snow chemistry observations at Himadri, tracking seasonal variability across a full polar winter.',
    region: 'Arctic',
    location: 'Ny-Ålesund, Svalbard',
    domain: 'Atmospheric Science',
    dataType: 'Environmental',
    format: 'CSV',
    access: 'Open',
    period: '2020–2022',
    startYear: 2020,
    endYear: 2022,
    records: 3200,
    frequency: 'Weekly',
    expedition: { number: 'AR-09', title: 'Himadri Winter-Over', id: 'exp-arc-himadri' },
    source: 'Arctic Station Operations',
    institution: 'Arctic Station Operations',
    updateDate: '2022-06-08',
    added: '2022-06-08',
    keywords: ['snow', 'chemistry', 'arctic', 'himadri'],
    cover: IMG.d8,
    related: { reports: 3, publications: 4, photos: 20, videos: 2, researchers: 8 },
  },
  {
    id: 'ds-seaice-satellite',
    title: 'Southern Ocean Sea-Ice Extent (Satellite)',
    description:
      'Satellite-derived sea-ice extent and concentration fields across the Southern Ocean, with method comparisons.',
    region: 'Antarctic',
    location: 'Southern Ocean',
    domain: 'Remote Sensing',
    dataType: 'Satellite',
    format: 'NetCDF',
    access: 'External Source',
    period: '2015–2024',
    startYear: 2015,
    endYear: 2024,
    records: 72000,
    frequency: 'Daily grid',
    expedition: null,
    source: 'Remote Sensing Unit',
    institution: 'Remote Sensing Unit',
    updateDate: '2024-05-19',
    added: '2024-05-19',
    keywords: ['sea ice', 'satellite', 'remote sensing', 'extent'],
    cover: IMG.d9,
    related: { reports: 4, publications: 7, photos: 14, videos: 2, researchers: 12 },
  },
  {
    id: 'ds-polar-microbial',
    title: 'Polar Soil Microbial Community Profiles',
    description:
      'Soil microbial community profiling from coastal Antarctic sites, documenting diversity and seasonal shifts.',
    region: 'Antarctic',
    location: 'Multiple coastal sites',
    domain: 'Microbiology',
    dataType: 'Biological',
    format: 'CSV',
    access: 'Restricted',
    period: '2021–2023',
    startYear: 2021,
    endYear: 2023,
    records: 1800,
    frequency: 'Per site',
    expedition: null,
    source: 'Microbiology Group',
    institution: 'Microbiology Group',
    updateDate: '2023-08-15',
    added: '2023-08-15',
    keywords: ['microbiology', 'soil', 'community', 'diversity'],
    cover: IMG.d10,
    related: { reports: 2, publications: 5, photos: 12, videos: 1, researchers: 7 },
  },
  {
    id: 'ds-kongsfjorden-marine',
    title: 'Kongsfjorden Marine Microbiology Sampling',
    description:
      'Preliminary microbiological sampling in Kongsfjorden, focused on microbial community structure in Arctic fjords.',
    region: 'Arctic',
    location: 'Kongsfjorden, Svalbard',
    domain: 'Biology',
    dataType: 'Biological',
    format: 'CSV',
    access: 'Open',
    period: '2025–2026',
    startYear: 2025,
    endYear: 2026,
    records: 940,
    frequency: 'Per cruise',
    expedition: { number: 'AR-45', title: 'Arctic Marine Microbiology', id: 'exp-arc-45' },
    source: 'Marine Sciences Division',
    institution: 'Marine Sciences Division',
    updateDate: '2025-10-04',
    added: '2025-10-04',
    keywords: ['microbiology', 'fjord', 'arctic', 'marine'],
    cover: IMG.d11,
    related: { reports: 2, publications: 2, photos: 16, videos: 1, researchers: 12 },
  },
  {
    id: 'ds-annual-observations',
    title: 'Programme Annual Field Observations Compilation',
    description:
      'Consolidated compilation of routine field observations across all polar field campaigns for the 2025 season.',
    region: 'Antarctic',
    location: 'Multiple sites',
    domain: 'Climate',
    dataType: 'Environmental',
    format: 'XLSX',
    access: 'Open',
    period: '2025',
    startYear: 2025,
    endYear: 2025,
    records: 22400,
    frequency: 'Variable',
    expedition: null,
    source: 'Polar Programme Office',
    institution: 'Polar Programme Office',
    updateDate: '2025-12-28',
    added: '2025-12-28',
    keywords: ['annual', 'observations', 'compilation', 'programme'],
    cover: IMG.d12,
    related: { reports: 8, publications: 12, photos: 60, videos: 6, researchers: 90 },
  },
];

/* Research domains — used for the categories section */
const DOMAINS = [
  {
    key: 'Climate',
    icon: FiThermometer,
    blurb: 'Temperature, snow, and long-term climate variability.',
  },
  {
    key: 'Oceanography',
    icon: FiDroplet,
    blurb: 'CTD profiles, currents, and sea-ice observations.',
  },
  { key: 'Glaciology', icon: FiLayers, blurb: 'Glacier mass balance, ablation, and ice dynamics.' },
  { key: 'Biology', icon: FiFeather, blurb: 'Benthic, pelagic, and terrestrial polar ecosystems.' },
  {
    key: 'Atmospheric Science',
    icon: FiWind,
    blurb: 'Aerosols, snow chemistry, and air-mass transport.',
  },
  { key: 'Geology', icon: FiCompass, blurb: 'Bedrock, sediment, and geological evolution.' },
  { key: 'Microbiology', icon: FiActivity, blurb: 'Microbial life in extreme polar environments.' },
  { key: 'Remote Sensing', icon: FiGlobe, blurb: 'Satellite observation of polar surfaces.' },
];

const RESEARCH_AREAS = [
  {
    key: 'Climate Change',
    icon: FiTrendingUp,
    blurb: 'Long-term signals in polar atmospheric records.',
  },
  { key: 'Ice Dynamics', icon: FiLayers, blurb: 'Mass balance, flow, and glacier response.' },
  {
    key: 'Ocean Conditions',
    icon: FiDroplet,
    blurb: 'Physical and chemical state of polar waters.',
  },
  {
    key: 'Marine Biodiversity',
    icon: FiFeather,
    blurb: 'Species composition in polar marine habitats.',
  },
  {
    key: 'Atmospheric Processes',
    icon: FiWind,
    blurb: 'Aerosol, cloud, and boundary-layer behaviour.',
  },
  {
    key: 'Polar Microbiology',
    icon: FiActivity,
    blurb: 'Microbial community structure and function.',
  },
  { key: 'Geological Processes', icon: FiCompass, blurb: 'Bedrock evolution and glacial history.' },
  {
    key: 'Environmental Monitoring',
    icon: FiBarChart2,
    blurb: 'Routine field observations, sustained over time.',
  },
];

const STATS = [
  { label: 'Datasets', value: 150, suffix: '+' },
  { label: 'Research domains', value: 8, suffix: '' },
  { label: 'Expeditions', value: 40, suffix: '+' },
  { label: 'Data types', value: 12, suffix: '' },
  { label: 'Years covered', value: 30, suffix: '+' },
];

const REGIONS = ['All', 'Arctic', 'Antarctic'];
const DATA_TYPES = [
  'All',
  'Temperature',
  'Oceanographic',
  'Atmospheric',
  'Biological',
  'Geospatial',
  'Satellite',
  'Environmental',
];
const FORMATS = ['All', 'CSV', 'JSON', 'GeoJSON', 'NetCDF', 'XLSX'];
const PERIODS = [
  { key: 'all', label: 'All' },
  { key: 'recent', label: '2020–2026' },
  { key: 'mid', label: '2010–2019' },
  { key: 'older', label: 'Before 2010' },
];
const ACCESS = ['All', 'Open', 'Restricted', 'External Source'];
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

function RegionBadge({ region }) {
  const isArctic = region === 'Arctic';
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
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

function AccessBadge({ access }) {
  const tone =
    access === 'Open'
      ? {
          bg: 'rgba(16,185,129,0.12)',
          border: 'rgba(16,185,129,0.45)',
          color: 'rgb(16,185,129)',
          icon: FiUnlock,
        }
      : access === 'Restricted'
        ? {
            bg: 'rgba(245,158,11,0.12)',
            border: 'rgba(245,158,11,0.45)',
            color: 'rgb(217,119,6)',
            icon: FiLock,
          }
        : {
            bg: 'rgba(100,116,139,0.12)',
            border: 'rgba(100,116,139,0.45)',
            color: 'var(--color-text-secondary)',
            icon: FiExternalLink,
          };
  const Icon = tone.icon;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
      style={{ background: tone.bg, borderColor: tone.border, color: tone.color }}
    >
      <Icon className="h-2.5 w-2.5" />
      {access}
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

function formatNumber(n) {
  return n.toLocaleString('en-US');
}

/* ========================================================================== */
/*  Page                                                                      */
/* ========================================================================== */
export default function Datasets({ dark, setDark }) {
  /* ---- state ------------------------------------------------------------- */
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('All');
  const [domain, setDomain] = useState(null);
  const [dataType, setDataType] = useState('All');
  const [format, setFormat] = useState('All');
  const [period, setPeriod] = useState('all');
  const [access, setAccess] = useState('All');
  const [sort, setSort] = useState('newest');
  const [view, setView] = useState('grid');

  /* ---- derived list ------------------------------------------------------ */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = DATASETS.filter((d) => {
      if (region !== 'All' && d.region !== region) return false;
      if (domain && d.domain !== domain) return false;
      if (dataType !== 'All' && d.dataType !== dataType) return false;
      if (format !== 'All' && d.format !== format) return false;
      if (access !== 'All' && d.access !== access) return false;

      if (period === 'recent' && d.endYear < 2020) return false;
      if (period === 'mid' && (d.endYear < 2010 || d.startYear > 2019)) return false;
      if (period === 'older' && d.startYear >= 2010) return false;

      if (q) {
        const hay = [
          d.title,
          d.description,
          d.location,
          d.domain,
          d.dataType,
          d.format,
          d.institution,
          d.keywords.join(' '),
          d.expedition?.title || '',
          d.expedition?.number || '',
        ]
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === 'newest') return b.added.localeCompare(a.added);
      if (sort === 'oldest') return a.added.localeCompare(b.added);
      if (sort === 'az') return a.title.localeCompare(b.title);
      if (sort === 'relevant') {
        const weight = (x) => (x.expedition ? 3 : 0) + Math.min(x.records / 5000, 6);
        return weight(b) - weight(a);
      }
      return 0;
    });

    return list;
  }, [query, region, domain, dataType, format, period, access, sort]);

  const featured = DATASETS[0];
  const recentlyAdded = useMemo(
    () => [...DATASETS].sort((a, b) => b.added.localeCompare(a.added)).slice(0, 5),
    []
  );

  const hasFilters =
    query !== '' ||
    region !== 'All' ||
    domain !== null ||
    dataType !== 'All' ||
    format !== 'All' ||
    period !== 'all' ||
    access !== 'All';

  const clearFilters = () => {
    setQuery('');
    setRegion('All');
    setDomain(null);
    setDataType('All');
    setFormat('All');
    setPeriod('all');
    setAccess('All');
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
            alt="Antarctic sea ice and open water"
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
                Polar Scientific Data
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-[2.1rem] font-medium leading-[1.05] tracking-[-0.035em] text-white sm:text-[3.2rem] lg:text-[3.8rem]">
                Explore polar datasets.
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-[16px]">
                Discover scientific datasets collected across polar expeditions, research stations,
                field observations and environmental studies — each linked to the reports,
                publications and researchers that produced them.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#explorer"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[13.5px] font-medium text-[#04070F] transition-colors hover:bg-white/90"
                >
                  Explore datasets
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

            <Reveal delay={280}>
              <div className="mt-14 flex items-center gap-3 border-t border-white/15 pt-6 text-[11px] font-mono uppercase tracking-[0.18em] text-white/50">
                <span>COLLECT</span>
                <span className="h-px flex-1 bg-white/15" />
                <span>CURATE</span>
                <span className="h-px flex-1 bg-white/15" />
                <span>CONNECT</span>
                <span className="h-px flex-1 bg-white/15" />
                <span>USE</span>
              </div>
            </Reveal>
          </div>

          {/* data visual composition */}
          <div className="lg:col-span-5">
            <Reveal delay={220}>
              <div className="relative mx-auto aspect-square w-full max-w-[400px]">
                <div
                  className="absolute inset-0 overflow-hidden rounded-2xl border"
                  style={{
                    borderColor: 'rgba(255,255,255,0.18)',
                    background: 'rgba(4,7,15,0.55)',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  {/* mini chart on top */}
                  <div className="border-b border-white/10 p-4">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.16em] text-white/60">
                      <span>Sample temperature index</span>
                      <span>Demo</span>
                    </div>
                    <svg viewBox="0 0 300 80" className="mt-3 h-16 w-full">
                      <polyline
                        points="0,60 30,55 60,50 90,52 120,44 150,38 180,32 210,26 240,22 270,18 300,14"
                        fill="none"
                        stroke="rgb(56,189,248)"
                        strokeWidth="1.5"
                      />
                      <polyline
                        points="0,60 30,55 60,50 90,52 120,44 150,38 180,32 210,26 240,22 270,18 300,14 300,80 0,80"
                        fill="rgba(56,189,248,0.15)"
                        stroke="none"
                      />
                    </svg>
                  </div>

                  {/* metadata rows */}
                  <div className="space-y-0 p-4 text-[11px]">
                    {[
                      { k: 'Records', v: '12,500' },
                      { k: 'Frequency', v: 'Daily' },
                      { k: 'Format', v: 'CSV' },
                      { k: 'Period', v: '2019–2025' },
                      { k: 'Access', v: 'Open' },
                    ].map((row, i) => (
                      <div
                        key={row.k}
                        className="flex items-center justify-between border-b border-white/5 py-2.5 last:border-b-0"
                        style={{ opacity: 1 - i * 0.08 }}
                      >
                        <span className="text-white/50">{row.k}</span>
                        <span className="font-mono text-white">{row.v}</span>
                      </div>
                    ))}
                  </div>

                  {/* latitude strip */}
                  <div className="border-t border-white/10 p-4 text-[10px] font-mono uppercase tracking-[0.16em] text-white/40">
                    <div className="flex items-center justify-between">
                      <span>69.4° S</span>
                      <span>76.2° E</span>
                    </div>
                  </div>
                </div>

                {/* corner accent */}
                <div
                  className="absolute -bottom-3 -right-3 rounded-lg border px-3 py-1.5 text-[10.5px] font-mono shadow-lg"
                  style={{
                    borderColor: 'rgba(255,255,255,0.2)',
                    background: 'rgba(4,7,15,0.85)',
                    color: '#fff',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  CSV · 12,500 records
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
                Data at a glance
              </p>
              <p className="max-w-sm text-[11.5px] leading-relaxed text-[var(--color-text-secondary)]">
                Sample figures for demonstration — replaced by live values once the datasets API is
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
                  Find scientific data
                </p>
                <h2 className="mt-3 text-[1.35rem] font-medium tracking-tight text-[var(--color-text-primary)] sm:text-[1.55rem]">
                  Search and filter the archive
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
                placeholder="Search datasets by title, topic, expedition, location or keyword…"
                aria-label="Search datasets"
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
            {/* region + domain */}
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
                    <FiLayers className="h-3 w-3" />
                    Research domain
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Chip active={domain === null} onClick={() => setDomain(null)}>
                      Any
                    </Chip>
                    {DOMAINS.map((d) => (
                      <Chip key={d.key} active={domain === d.key} onClick={() => setDomain(d.key)}>
                        {d.key}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* data type + format */}
            <Reveal delay={160}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                    <FiActivity className="h-3 w-3" />
                    Data type
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {DATA_TYPES.map((t) => (
                      <Chip key={t} active={dataType === t} onClick={() => setDataType(t)}>
                        {t}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                    <FiFileText className="h-3 w-3" />
                    Format
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {FORMATS.map((f) => (
                      <Chip key={f} active={format === f} onClick={() => setFormat(f)}>
                        {f}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* period + access */}
            <Reveal delay={200}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                    <FiCalendar className="h-3 w-3" />
                    Collection period
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {PERIODS.map((p) => (
                      <Chip key={p.key} active={period === p.key} onClick={() => setPeriod(p.key)}>
                        {p.label}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                    <FiUnlock className="h-3 w-3" />
                    Access
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ACCESS.map((a) => (
                      <Chip key={a} active={access === a} onClick={() => setAccess(a)}>
                        {a}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* sort */}
            <Reveal delay={240}>
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FEATURED DATASET                                                 */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div
              className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em]"
              style={{ color: AC }}
            >
              <span className="h-px w-8" style={{ background: AC }} />
              Featured dataset
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7">
                <div
                  className="relative overflow-hidden rounded-xl border"
                  style={{
                    borderColor: 'var(--color-border)',
                    background: 'var(--color-bg-secondary)',
                  }}
                >
                  {/* visual header */}
                  <div className="relative aspect-[16/10]">
                    <img
                      src={IMG.featured}
                      alt="Featured dataset field site"
                      className="h-full w-full object-cover opacity-80"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to top, color-mix(in srgb, var(--color-bg-primary) 92%, transparent), transparent 60%)',
                      }}
                    />

                    {/* chart overlay */}
                    <div className="absolute inset-x-6 bottom-6">
                      <div
                        className="rounded-lg border p-4 backdrop-blur-md"
                        style={{
                          borderColor: 'color-mix(in srgb, var(--color-border) 80%, transparent)',
                          background:
                            'color-mix(in srgb, var(--color-bg-primary) 82%, transparent)',
                        }}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                          <span>Annual mean surface temperature</span>
                          <span style={{ color: AC }}>Demo</span>
                        </div>
                        <svg viewBox="0 0 400 60" className="mt-3 h-14 w-full">
                          <defs>
                            <linearGradient id="ds-trend" x1="0" y1="0" x2="0" y2="1">
                              <stop
                                offset="0%"
                                stopColor="var(--color-accent-primary)"
                                stopOpacity="0.35"
                              />
                              <stop
                                offset="100%"
                                stopColor="var(--color-accent-primary)"
                                stopOpacity="0"
                              />
                            </linearGradient>
                          </defs>
                          {[0, 15, 30, 45].map((y) => (
                            <line
                              key={y}
                              x1="0"
                              y1={y}
                              x2="400"
                              y2={y}
                              stroke="var(--color-border)"
                              strokeWidth="0.5"
                              strokeDasharray="2 4"
                            />
                          ))}
                          <polyline
                            points="0,45 40,42 80,38 120,40 160,34 200,30 240,26 280,22 320,20 360,17 400,14"
                            fill="none"
                            stroke="var(--color-accent-primary)"
                            strokeWidth="1.6"
                          />
                          <polygon
                            points="0,45 40,42 80,38 120,40 160,34 200,30 240,26 280,22 320,20 360,17 400,14 400,60 0,60"
                            fill="url(#ds-trend)"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <RegionBadge region={featured.region} />
                      <AccessBadge access={featured.access} />
                    </div>
                  </div>

                  {/* metadata grid */}
                  <div
                    className="grid grid-cols-2 gap-x-6 gap-y-4 border-t p-5 sm:grid-cols-3"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    {[
                      { k: 'Records', v: formatNumber(featured.records) },
                      { k: 'Format', v: featured.format },
                      { k: 'Frequency', v: featured.frequency },
                      { k: 'Period', v: featured.period },
                      { k: 'Source', v: featured.institution },
                      { k: 'Updated', v: featured.updateDate },
                    ].map((m) => (
                      <div key={m.k}>
                        <div className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                          {m.k}
                        </div>
                        <div className="mt-1 text-[13.5px] font-medium text-[var(--color-text-primary)]">
                          {m.v}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* copy */}
              <div className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-medium text-[var(--color-text-secondary)]"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <FiLayers className="h-2.5 w-2.5" />
                    {featured.domain}
                  </span>
                </div>

                <h3 className="mt-5 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.85rem]">
                  {featured.title}
                </h3>

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-[var(--color-text-secondary)]">
                  <span className="inline-flex items-center gap-1.5">
                    <FiCalendar className="h-3.5 w-3.5" />
                    {featured.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FiMapPin className="h-3.5 w-3.5" />
                    {featured.location}
                  </span>
                </div>

                <p className="mt-6 text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  {featured.description}
                </p>

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

                {/* mini data preview */}
                <div
                  className="mt-6 overflow-hidden rounded-lg border"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <div
                    className="flex items-center justify-between px-3 py-2 text-[10.5px] font-mono uppercase tracking-[0.14em] text-[var(--color-text-secondary)]"
                    style={{ background: 'var(--color-bg-secondary)' }}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <FiTable className="h-3 w-3" /> Data preview
                    </span>
                    <span>Demo</span>
                  </div>
                  <table className="w-full text-[11.5px]">
                    <thead>
                      <tr style={{ background: 'var(--color-bg-secondary)' }}>
                        <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]">
                          Date
                        </th>
                        <th className="px-3 py-2 text-left font-medium text-[var(--color-text-secondary)]">
                          Location
                        </th>
                        <th className="px-3 py-2 text-right font-medium text-[var(--color-text-secondary)]">
                          Temp (°C)
                        </th>
                        <th className="px-3 py-2 text-right font-medium text-[var(--color-text-secondary)]">
                          Depth (m)
                        </th>
                      </tr>
                    </thead>
                    <tbody style={{ background: 'var(--color-bg-primary)' }}>
                      {[
                        { d: '2025-01-12', l: 'BH-01', t: '−18.4', dp: '0.5' },
                        { d: '2025-01-12', l: 'BH-02', t: '−19.1', dp: '1.0' },
                        { d: '2025-01-13', l: 'BH-01', t: '−17.9', dp: '0.5' },
                        { d: '2025-01-13', l: 'BH-03', t: '−20.2', dp: '2.0' },
                      ].map((row, i) => (
                        <tr
                          key={i}
                          className="border-t"
                          style={{ borderColor: 'var(--color-border)' }}
                        >
                          <td className="px-3 py-2 font-mono text-[var(--color-text-primary)]">
                            {row.d}
                          </td>
                          <td className="px-3 py-2 text-[var(--color-text-secondary)]">{row.l}</td>
                          <td className="px-3 py-2 text-right font-mono text-[var(--color-text-primary)]">
                            {row.t}
                          </td>
                          <td className="px-3 py-2 text-right font-mono text-[var(--color-text-secondary)]">
                            {row.dp}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div
                    className="flex items-center justify-between border-t px-3 py-2 text-[11px]"
                    style={{
                      borderColor: 'var(--color-border)',
                      background: 'var(--color-bg-secondary)',
                    }}
                  >
                    <span className="text-[var(--color-text-secondary)]">
                      Showing 4 of {formatNumber(featured.records)} rows
                    </span>
                    <Link
                      to={`/knowledge/datasets/${featured.id}`}
                      className="inline-flex items-center gap-1 font-medium transition-colors hover:underline"
                      style={{ color: AC }}
                    >
                      View full dataset
                      <FiArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    to={`/knowledge/datasets/${featured.id}`}
                    className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold shadow-sm transition-transform hover:scale-[1.02]"
                    style={{
                      background:
                        'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
                      color: 'var(--color-accent-primary-foreground)',
                    }}
                  >
                    Explore dataset
                    <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                  <button
                    type="button"
                    disabled
                    title="Download will be enabled once files are served by the datasets API"
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
      {/* DATA CATEGORIES                                                  */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="max-w-xl">
              <p
                className="text-[11px] font-medium uppercase tracking-[0.22em]"
                style={{ color: AC }}
              >
                Explore by domain
              </p>
              <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.75rem]">
                Eight research domains, one data archive.
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {DOMAINS.map((d, i) => {
              const Icon = d.icon;
              const count = DATASETS.filter((x) => x.domain === d.key).length;
              const active = domain === d.key;
              return (
                <Reveal key={d.key} delay={i * 55}>
                  <button
                    type="button"
                    onClick={() => setDomain(active ? null : d.key)}
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
                      {count} {count === 1 ? 'dataset' : 'datasets'}
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* DATASET EXPLORER                                                 */}
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
                  Scientific datasets
                </h2>
                <p className="mt-3 text-[13.5px] text-[var(--color-text-secondary)]">
                  Showing{' '}
                  <span className="font-medium text-[var(--color-text-primary)]">
                    {filtered.length}
                  </span>{' '}
                  of {DATASETS.length} datasets
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
                  <FiDatabase className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-[16px] font-medium text-[var(--color-text-primary)]">
                  No datasets found
                </h3>
                <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                  Try changing your search terms or filters to see more results from the archive.
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
              {filtered.map((d, i) => (
                <Reveal key={d.id} delay={Math.min(i * 40, 200)}>
                  <DatasetCard dataset={d} />
                </Reveal>
              ))}
            </div>
          ) : (
            <ul className="mt-12 divide-y border-y" style={{ borderColor: 'var(--color-border)' }}>
              {filtered.map((d, i) => (
                <Reveal key={d.id} delay={Math.min(i * 30, 150)}>
                  <li>
                    <DatasetRow dataset={d} />
                  </li>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ================================================================ */}
      {/* DATA VISUALIZATION PREVIEW                                       */}
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
                  See the data
                </div>
                <h2 className="mt-5 text-[1.6rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[2rem]">
                  From numbers to signals.
                </h2>
                <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  Every dataset opens onto a visual summary — trend lines, coverage charts, and
                  observation density — so researchers and students can judge what the data actually
                  contains before reading the full file.
                </p>

                <p
                  className="mt-8 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10.5px] font-mono uppercase tracking-[0.14em] text-[var(--color-text-secondary)]"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  Demo visualization — not official observational data
                </p>

                <div className="mt-8 grid grid-cols-2 gap-6">
                  {[
                    { l: 'Observations plotted', v: '12,500' },
                    { l: 'Coverage', v: '6 yrs' },
                    { l: 'Grid resolution', v: '1 km' },
                    { l: 'Uncertainty bands', v: '±0.3°C' },
                  ].map((m) => (
                    <div key={m.l}>
                      <div className="text-[15px] font-medium text-[var(--color-text-primary)]">
                        {m.v}
                      </div>
                      <div className="mt-1 text-[10.5px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                        {m.l}
                      </div>
                    </div>
                  ))}
                </div>
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
                      <FiBarChart2 className="h-3.5 w-3.5" />
                      Annual mean surface temperature index
                    </div>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.14em]"
                      style={{ background: 'rgba(245,158,11,0.12)', color: 'rgb(217,119,6)' }}
                    >
                      Demo
                    </span>
                  </div>

                  <div className="p-6">
                    {/* chart area */}
                    <svg viewBox="0 0 600 200" className="h-56 w-full">
                      <defs>
                        <linearGradient id="ds-fill" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="0%"
                            stopColor="var(--color-accent-primary)"
                            stopOpacity="0.4"
                          />
                          <stop
                            offset="100%"
                            stopColor="var(--color-accent-primary)"
                            stopOpacity="0"
                          />
                        </linearGradient>
                        <linearGradient id="ds-line" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="var(--color-accent-primary)" />
                          <stop offset="100%" stopColor="var(--color-accent-secondary)" />
                        </linearGradient>
                      </defs>

                      {/* grid */}
                      {[40, 80, 120, 160].map((y) => (
                        <line
                          key={y}
                          x1="40"
                          y1={y}
                          x2="580"
                          y2={y}
                          stroke="var(--color-border)"
                          strokeWidth="0.5"
                          strokeDasharray="2 4"
                        />
                      ))}
                      {/* baseline */}
                      <line
                        x1="40"
                        y1="170"
                        x2="580"
                        y2="170"
                        stroke="var(--color-border)"
                        strokeWidth="1"
                      />

                      {/* secondary series */}
                      <polyline
                        points="40,100 90,95 140,88 190,92 240,80 290,72 340,65 390,58 440,54 490,48 540,44 580,40"
                        fill="none"
                        stroke="var(--color-accent-secondary)"
                        strokeWidth="1.3"
                        strokeOpacity="0.75"
                        strokeDasharray="4 3"
                      />

                      {/* primary series */}
                      <polyline
                        points="40,110 90,102 140,95 190,98 240,86 290,78 340,70 390,62 440,58 490,52 540,48 580,42"
                        fill="none"
                        stroke="url(#ds-line)"
                        strokeWidth="2"
                      />
                      <polygon
                        points="40,110 90,102 140,95 190,98 240,86 290,78 340,70 390,62 440,58 490,52 540,48 580,42 580,170 40,170"
                        fill="url(#ds-fill)"
                      />

                      {/* points */}
                      {[
                        [40, 110],
                        [90, 102],
                        [140, 95],
                        [190, 98],
                        [240, 86],
                        [290, 78],
                        [340, 70],
                        [390, 62],
                        [440, 58],
                        [490, 52],
                        [540, 48],
                        [580, 42],
                      ].map(([x, y], i) => (
                        <circle key={i} cx={x} cy={y} r="2.5" fill="var(--color-accent-primary)" />
                      ))}

                      {/* year labels */}
                      {['2019', '2020', '2021', '2022', '2023', '2024'].map((y, i) => (
                        <text
                          key={y}
                          x={40 + i * 108}
                          y="192"
                          textAnchor="middle"
                          fontSize="10"
                          fill="var(--color-text-secondary)"
                        >
                          {y}
                        </text>
                      ))}
                    </svg>

                    {/* legend */}
                    <div
                      className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-4 text-[11px]"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <span className="inline-flex items-center gap-2 text-[var(--color-text-secondary)]">
                        <span className="h-2 w-2 rounded-full" style={{ background: AC }} />
                        Annual mean
                      </span>
                      <span className="inline-flex items-center gap-2 text-[var(--color-text-secondary)]">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: 'var(--color-accent-secondary)' }}
                        />
                        Reference range
                      </span>
                      <span className="ml-auto text-[10.5px] font-mono uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                        Sample chart · replaceable with real series
                      </span>
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
                  Every dataset tells a larger story.
                </h2>
                <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  A dataset is not just a file. It traces back to the expedition that collected it,
                  and forward into the reports, publications and media that rely on it.
                </p>

                <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                  Sample from the featured dataset
                </p>
                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                  {[
                    { icon: FiCompass, label: 'Expedition', value: 1 },
                    { icon: FiFileText, label: 'Reports', value: featured.related.reports },
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
                      <FiDatabase className="mx-auto h-6 w-6" style={{ color: AC }} />
                      <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                        Dataset
                      </div>
                      <div className="mt-1 text-[12.5px] font-medium text-[var(--color-text-primary)]">
                        {featured.format} · {formatNumber(featured.records)}
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
                          icon: FiFileText,
                          label: 'Related Reports',
                          note: `${featured.related.reports} documents`,
                          to: '/knowledge/reports',
                        },
                        {
                          icon: FiBookOpen,
                          label: 'Related Publications',
                          note: `${featured.related.publications} indexed`,
                          to: '/knowledge/publications',
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
                  Recently added datasets
                </h2>
              </div>
              <Link
                to="/knowledge"
                className="group inline-flex items-center gap-2 text-[13px] font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent-primary)]"
              >
                Browse all
                <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>

          <ul className="mt-10 divide-y border-y" style={{ borderColor: 'var(--color-border)' }}>
            {recentlyAdded.map((d, i) => (
              <Reveal key={d.id} delay={i * 60}>
                <li>
                  <Link
                    to={`/knowledge/datasets/${d.id}`}
                    className="group grid grid-cols-1 items-center gap-5 py-5 transition-colors hover:bg-[var(--color-bg-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] sm:grid-cols-[80px_1fr_auto]"
                  >
                    <div className="overflow-hidden rounded-md">
                      <img
                        src={d.cover}
                        alt={`${d.title} visual`}
                        className="aspect-square w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <RegionBadge region={d.region} />
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10.5px] font-medium text-[var(--color-text-secondary)]"
                          style={{ borderColor: 'var(--color-border)' }}
                        >
                          <FiLayers className="h-2.5 w-2.5" />
                          {d.domain}
                        </span>
                        <AccessBadge access={d.access} />
                      </div>
                      <h3 className="mt-3 text-[15px] font-medium leading-snug tracking-tight text-[var(--color-text-primary)]">
                        {d.title}
                      </h3>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-[var(--color-text-secondary)]">
                        <span className="inline-flex items-center gap-1.5">
                          <FiClock className="h-3 w-3" />
                          Added {d.added}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <FiFileText className="h-3 w-3" />
                          {d.format} · {formatNumber(d.records)} records
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <FiCalendar className="h-3 w-3" />
                          {d.period}
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
                  What polar data tells us
                </p>
                <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.75rem]">
                  Eight research questions, one archive.
                </h2>
              </div>
              <p className="max-w-sm text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                Click a research area to narrow the dataset listing above.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {RESEARCH_AREAS.map((r, i) => {
              const Icon = r.icon;
              const count = DATASETS.filter(
                (x) =>
                  x.domain ===
                  r.key
                    .replace(' Change', '')
                    .replace(' Dynamics', '')
                    .replace(' Conditions', '')
                    .replace(' Biodiversity', '')
                    .replace(' Processes', '')
                    .replace(' Microbiology', '')
                    .replace(' Processes', '')
                    .replace(' Monitoring', '')
              ).length;
              // Fallback count — nicer to just count via keyword overlap
              const realCount =
                DATASETS.filter((x) =>
                  r.key
                    .toLowerCase()
                    .split(' ')
                    .some((word) => x.keywords.join(' ').includes(word.toLowerCase()))
                ).length ||
                DATASETS.filter((x) =>
                  x.keywords.some((k) => r.key.toLowerCase().includes(k.toLowerCase()))
                ).length;
              const shownCount = Math.max(realCount, 1);
              return (
                <Reveal key={r.key} delay={i * 55}>
                  <button
                    type="button"
                    onClick={() => {
                      // map the research area to a domain filter when possible
                      const map = {
                        'Climate Change': 'Climate',
                        'Ice Dynamics': 'Glaciology',
                        'Ocean Conditions': 'Oceanography',
                        'Marine Biodiversity': 'Biology',
                        'Atmospheric Processes': 'Atmospheric Science',
                        'Polar Microbiology': 'Microbiology',
                        'Geological Processes': 'Geology',
                        'Environmental Monitoring': 'Climate',
                      };
                      setDomain(map[r.key] || null);
                      document
                        .getElementById('explorer')
                        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    aria-pressed={false}
                    className="group flex h-full w-full flex-col items-start gap-3 rounded-xl border p-5 text-left transition-colors hover:border-[var(--color-accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                    style={{
                      borderColor: 'var(--color-border)',
                      background: 'var(--color-bg-secondary)',
                    }}
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-lg border"
                      style={{
                        borderColor: 'var(--color-border)',
                        background: 'var(--color-bg-primary)',
                        color: 'var(--color-text-primary)',
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
                      {shownCount} {shownCount === 1 ? 'dataset' : 'datasets'}
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* DATA JOURNEY — FROM FIELD TO KNOWLEDGE                           */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="max-w-2xl">
              <p
                className="text-[11px] font-medium uppercase tracking-[0.22em]"
                style={{ color: AC }}
              >
                From field to knowledge
              </p>
              <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.75rem]">
                How a field observation becomes shared knowledge.
              </h2>
            </div>
          </Reveal>

          <div className="mt-14">
            <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-7">
              {[
                {
                  icon: FiCompass,
                  label: 'Field Expedition',
                  note: 'A scientific mission departs',
                },
                { icon: FiActivity, label: 'Data Collection', note: 'Observations and samples' },
                { icon: FiDatabase, label: 'Dataset', note: 'Structured and curated' },
                { icon: FiBarChart2, label: 'Analysis', note: 'Scientists interpret' },
                { icon: FiFileText, label: 'Publication', note: 'Findings recorded' },
                { icon: FiBookOpen, label: 'Knowledge', note: 'Connected to the archive' },
                { icon: FiGlobe, label: 'Public Outreach', note: 'Accessible to everyone' },
              ].map((step, i) => {
                const Icon = step.icon;
                return (
                  <Reveal key={step.label} delay={i * 60}>
                    <li
                      className="relative flex flex-col items-start gap-3 rounded-xl border p-4"
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
                      <div className="text-[13px] font-medium text-[var(--color-text-primary)]">
                        {step.label}
                      </div>
                      <div className="text-[11.5px] leading-snug text-[var(--color-text-secondary)]">
                        {step.note}
                      </div>
                      {i < 6 && (
                        <span
                          aria-hidden="true"
                          className="absolute right-[-10px] top-1/2 hidden h-px w-5 -translate-y-1/2 lg:block"
                          style={{ background: 'var(--color-border)' }}
                        />
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
                Data is the evidence. Follow it back to the field.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/70">
                Every dataset in PolarVerse traces to an expedition, a team, and a story. Open one
                and see how far the thread runs.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  to="/knowledge/datasets"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[13.5px] font-medium text-[#04070F] transition-colors hover:bg-white/90"
                >
                  Browse all datasets
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

function DatasetCard({ dataset: d }) {
  return (
    <div
      className="group flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1"
      style={{
        borderColor: 'var(--color-border)',
        background: 'var(--color-bg-secondary)',
      }}
    >
      <Link
        to={`/knowledge/datasets/${d.id}`}
        className="relative overflow-hidden focus-visible:outline-none"
        aria-label={`View ${d.title}`}
      >
        <img
          src={d.cover}
          alt={`${d.title} visual`}
          className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <RegionBadge region={d.region} />
        </div>
        <div className="absolute right-3 top-3">
          <AccessBadge access={d.access} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10.5px] font-medium text-[var(--color-text-secondary)]"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <FiLayers className="h-2.5 w-2.5" />
            {d.domain}
          </span>
          <span className="text-[11px] font-mono text-[var(--color-text-secondary)]">
            {d.period}
          </span>
        </div>

        <h3 className="mt-3 text-[15px] font-medium leading-snug tracking-tight text-[var(--color-text-primary)]">
          <Link
            to={`/knowledge/datasets/${d.id}`}
            className="transition-colors hover:text-[var(--color-accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
          >
            {d.title}
          </Link>
        </h3>

        <p className="mt-1.5 text-[12.5px] leading-snug text-[var(--color-text-secondary)]">
          <FiMapPin className="mr-1 inline h-3 w-3 -translate-y-[1px]" />
          {d.location}
        </p>

        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
          {d.description}
        </p>

        {d.expedition && (
          <Link
            to={`/expeditions/${d.expedition.id}`}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border p-2.5 text-[11.5px] transition-colors hover:border-[var(--color-accent-primary)]"
            style={{
              borderColor: 'var(--color-border)',
              background: 'var(--color-bg-primary)',
            }}
          >
            <FiCompass className="h-3.5 w-3.5" style={{ color: AC }} />
            <span className="truncate font-medium text-[var(--color-text-primary)]">
              Exp. {d.expedition.number} · {d.expedition.title}
            </span>
          </Link>
        )}

        <div
          className="mt-4 flex items-center justify-between border-t pt-4 text-[11.5px] text-[var(--color-text-secondary)]"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <span className="inline-flex items-center gap-1.5">
            <FiFileText className="h-3 w-3" />
            {d.format} · {formatNumber(d.records)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FiDatabase className="h-3 w-3" />
            {d.dataType}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <Link
            to={`/knowledge/datasets/${d.id}`}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium transition-transform duration-300 group-hover:translate-x-0.5"
            style={{ color: AC }}
          >
            Explore dataset
            <FiArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            disabled
            title={
              d.access === 'Open'
                ? 'Download will be enabled once files are served by the datasets API'
                : 'This dataset is not directly downloadable — source access required'
            }
            aria-label="Download dataset — pending backend"
            className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[11.5px] text-[var(--color-text-secondary)] opacity-70"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <FiDownload className="h-3 w-3" />
            {d.access === 'Open' ? 'Pending' : 'Source'}
          </button>
        </div>
      </div>
    </div>
  );
}

function DatasetRow({ dataset: d }) {
  return (
    <Link
      to={`/knowledge/datasets/${d.id}`}
      className="group grid grid-cols-1 items-center gap-5 py-5 transition-colors hover:bg-[var(--color-bg-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] sm:grid-cols-[120px_1fr_auto]"
    >
      <div className="overflow-hidden rounded-md">
        <img
          src={d.cover}
          alt={`${d.title} visual`}
          className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
          loading="lazy"
        />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <RegionBadge region={d.region} />
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10.5px] font-medium text-[var(--color-text-secondary)]"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <FiLayers className="h-2.5 w-2.5" />
            {d.domain}
          </span>
          <AccessBadge access={d.access} />
        </div>
        <h3 className="mt-3 text-[15px] font-medium leading-snug tracking-tight text-[var(--color-text-primary)]">
          {d.title}
        </h3>
        <p className="mt-1 text-[12.5px] text-[var(--color-text-secondary)]">
          <FiMapPin className="mr-1 inline h-3 w-3 -translate-y-[1px]" />
          {d.location} · {d.institution}
        </p>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
          {d.description}
        </p>
      </div>

      <div className="flex items-center gap-6 sm:flex-col sm:items-end sm:gap-2">
        <div className="flex gap-4 text-[11px] text-[var(--color-text-secondary)] sm:flex-col sm:items-end">
          <span className="inline-flex items-center gap-1.5">
            <FiFileText className="h-3 w-3" /> {d.format}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FiDatabase className="h-3 w-3" /> {formatNumber(d.records)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FiCalendar className="h-3 w-3" /> {d.period}
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
