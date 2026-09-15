import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiSearch,
  FiX,
  FiArrowRight,
  FiArrowUpRight,
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiLayers,
  FiGlobe,
  FiThermometer,
  FiDroplet,
  FiWind,
  FiFeather,
  FiCompass,
  FiCpu,
  FiPlus,
  FiMinus,
  FiCrosshair,
  FiCheck,
  FiCamera,
  FiVideo,
  FiPlay,
  FiImage,
  FiDatabase,
  FiFileText,
  FiBookOpen,
  FiActivity,
  FiZap,
  FiTarget,
  FiChevronRight,
  FiFilter,
  FiChevronDown,
  FiBook,
  FiAward,
} from 'react-icons/fi';
import { GiSnowflake1 } from 'react-icons/gi';

/* ============================================================================
   PolarMap — geographic discovery surface for PolarVerse
   ========================================================================== */

/* -------------------------------------------------------------------------- */
/*  Scoped theme extensions                                                   */
/* -------------------------------------------------------------------------- */
const STYLES = `
  :root {
    --pv-map-hero-overlay: #04070f;
    --pv-map-glass-bg: rgba(4, 7, 15, 0.55);
    --pv-map-glass-border: rgba(255, 255, 255, 0.18);
    --pv-map-chip-bg: rgba(4, 7, 15, 0.82);
    --pv-map-chip-border: rgba(255, 255, 255, 0.20);
    --pv-map-hero-text: #ffffff;
    --pv-map-hero-text-dim: rgba(255, 255, 255, 0.72);
    --pv-map-hero-divider: rgba(255, 255, 255, 0.16);

    --pv-map-ocean-1: #071a33;
    --pv-map-ocean-2: #0a2544;
    --pv-map-ocean-3: #040d1c;
    --pv-map-ice: rgba(186, 230, 253, 0.14);
    --pv-map-grid: rgba(148, 197, 255, 0.12);
    --pv-map-land: rgba(148, 197, 255, 0.09);

    --pv-map-marker-bg: #ffffff;
    --pv-map-marker-border: rgba(255, 255, 255, 0.9);

    --pv-map-aurora-1: rgba(56, 189, 248, 0.30);
    --pv-map-aurora-2: rgba(167, 139, 250, 0.24);
    --pv-map-aurora-3: rgba(45, 212, 191, 0.20);

    --pv-map-route: rgba(56, 189, 248, 0.85);
  }
  .dark {
    --pv-map-aurora-1: rgba(56, 189, 248, 0.40);
    --pv-map-aurora-2: rgba(167, 139, 250, 0.34);
    --pv-map-aurora-3: rgba(45, 212, 191, 0.30);
  }

  @keyframes pv-map-route-dash {
    to { stroke-dashoffset: -60; }
  }
  .pv-map-route {
    stroke-dasharray: 6 8;
    animation: pv-map-route-dash 3.2s linear infinite;
  }

  @keyframes pv-map-pulse {
    0%   { transform: scale(1);   opacity: 0.85; }
    70%  { transform: scale(2.2); opacity: 0;    }
    100% { transform: scale(2.2); opacity: 0;    }
  }
  .pv-map-pulse { animation: pv-map-pulse 2.4s ease-out infinite; transform-origin: center; }

  @keyframes pv-map-fade-in {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .pv-map-fade-in { animation: pv-map-fade-in 240ms cubic-bezier(.16,1,.3,1); }

  .pv-map-marker-hit { transition: transform 160ms ease; }
  .pv-map-marker-hit:hover { transform: translate(-50%, -100%) scale(1.08); }
`;

/* -------------------------------------------------------------------------- */
/*  Imagery                                                                   */
/* -------------------------------------------------------------------------- */
const IMG = {
  hero: 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?auto=format&fit=crop&w=2400&q=80',
  arctic:
    'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1400&q=80',
  antarctic:
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1400&q=80',
  himadri:
    'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=1200&q=80',
  maitri:
    'https://images.unsplash.com/photo-1520637836862-4d197d17c50a?auto=format&fit=crop&w=1200&q=80',
  bharati:
    'https://images.unsplash.com/photo-1613573081262-69e37dfd72f1?auto=format&fit=crop&w=1200&q=80',
  gangotri:
    'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?auto=format&fit=crop&w=1200&q=80',
  svalbard:
    'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80',
  cta: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?auto=format&fit=crop&w=2400&q=80',
};

/* -------------------------------------------------------------------------- */
/*  Demo marker dataset                                                       */
/*  Coordinates are illustrative sample values for demonstration              */
/* -------------------------------------------------------------------------- */
const MARKERS = [
  {
    id: 'loc-himadri',
    name: 'Himadri Station',
    type: 'station',
    region: 'Arctic',
    latitude: 78.9,
    longitude: 11.9,
    description:
      'Arctic research station site (sample marker). PolarVerse will surface live station status once connected to the official data feed.',
    researchThemes: ['Atmospheric Science', 'Climate', 'Biology'],
    status: 'Operational (sample)',
    image: IMG.himadri,
    connectedResources: { datasets: 8, publications: 12, reports: 4, media: 22 },
    expedition: null,
  },
  {
    id: 'loc-maitri',
    name: 'Maitri',
    type: 'station',
    region: 'Antarctic',
    latitude: -70.77,
    longitude: 11.73,
    description: 'Antarctic research station site in the Schirmacher Oasis region (sample marker).',
    researchThemes: ['Glaciology', 'Geology', 'Climate'],
    status: 'Operational (sample)',
    image: IMG.maitri,
    connectedResources: { datasets: 14, publications: 18, reports: 6, media: 30 },
    expedition: null,
  },
  {
    id: 'loc-bharati',
    name: 'Bharati',
    type: 'station',
    region: 'Antarctic',
    latitude: -69.41,
    longitude: 76.19,
    description: 'Antarctic research station site in the Larsemann Hills region (sample marker).',
    researchThemes: ['Oceanography', 'Biology', 'Remote Sensing'],
    status: 'Operational (sample)',
    image: IMG.bharati,
    connectedResources: { datasets: 11, publications: 15, reports: 5, media: 26 },
    expedition: null,
  },
  {
    id: 'loc-gangotri',
    name: 'Dakshin Gangotri',
    type: 'location',
    region: 'Antarctic',
    latitude: -70.08,
    longitude: 12.0,
    description: 'Historic Antarctic station site on the Princess Astrid Coast (sample marker).',
    researchThemes: ['Geology', 'Climate'],
    status: 'Heritage (sample)',
    image: IMG.gangotri,
    connectedResources: { datasets: 3, publications: 4, reports: 2, media: 8 },
    expedition: null,
  },
  {
    id: 'exp-43-marker',
    name: 'Expedition 43 — Larsemann Hills',
    type: 'expedition',
    region: 'Antarctic',
    latitude: -69.4,
    longitude: 76.2,
    description:
      'Sample expedition marker for a summer campaign covering glaciology and coastal observation.',
    researchThemes: ['Glaciology', 'Climate', 'Oceanography'],
    status: 'Field season 2025–26 (sample)',
    image: IMG.bharati,
    connectedResources: { datasets: 8, publications: 15, reports: 12, media: 42 },
    expedition: { id: 'exp-43', number: '43', title: 'Indian Antarctic Expedition' },
  },
  {
    id: 'exp-arctic-12-marker',
    name: 'Arctic Atmospheric Expedition',
    type: 'expedition',
    region: 'Arctic',
    latitude: 78.92,
    longitude: 11.85,
    description: 'Sample expedition marker for an Arctic atmospheric campaign based at Ny-Ålesund.',
    researchThemes: ['Atmospheric Science', 'Climate'],
    status: 'Completed (sample)',
    image: IMG.svalbard,
    connectedResources: { datasets: 11, publications: 6, reports: 9, media: 28 },
    expedition: { id: 'exp-arctic-12', number: 'AR-12', title: 'Arctic Atmospheric Expedition' },
  },
  {
    id: 'act-ice-core',
    name: 'Ice core sampling activity',
    type: 'activity',
    region: 'Antarctic',
    latitude: -70.5,
    longitude: 74.5,
    description: 'Sample research activity marker for an ice core drilling field campaign.',
    researchThemes: ['Glaciology', 'Climate'],
    status: 'Sample activity',
    image: IMG.antarctic,
    connectedResources: { datasets: 4, publications: 3, reports: 2, media: 12 },
    expedition: { id: 'exp-43', number: '43', title: 'Indian Antarctic Expedition' },
  },
  {
    id: 'ds-antarctic-sst-marker',
    name: 'Antarctic surface temperature dataset',
    type: 'dataset',
    region: 'Antarctic',
    latitude: -69.5,
    longitude: 76.0,
    description: 'Sample dataset marker for a surface temperature observation record.',
    researchThemes: ['Climate', 'Remote Sensing'],
    status: 'Sample dataset',
    image: IMG.antarctic,
    connectedResources: { datasets: 1, publications: 9, reports: 6, media: 42 },
    expedition: { id: 'exp-43', number: '43', title: 'Indian Antarctic Expedition' },
  },
  {
    id: 'pub-seaice-review',
    name: 'Sea-ice variability review',
    type: 'publication',
    region: 'Antarctic',
    latitude: -68.0,
    longitude: 72.0,
    description:
      'Sample publication marker referencing sea-ice variability work in the Southern Ocean.',
    researchThemes: ['Oceanography', 'Climate'],
    status: 'Sample publication',
    image: IMG.antarctic,
    connectedResources: { datasets: 3, publications: 1, reports: 2, media: 6 },
    expedition: null,
  },
  {
    id: 'med-aurora',
    name: 'Aurora over the Arctic station',
    type: 'media',
    region: 'Arctic',
    latitude: 78.9,
    longitude: 11.8,
    description: 'Sample media marker illustrating aurora activity over an Arctic station.',
    researchThemes: ['Atmospheric Science'],
    status: 'Sample media',
    image: IMG.himadri,
    connectedResources: { datasets: 0, publications: 0, reports: 0, media: 1 },
    expedition: { id: 'exp-arc-himadri', number: 'AR-09', title: 'Himadri Winter-Over' },
  },
  {
    id: 'rep-43-field',
    name: 'Expedition 43 field report',
    type: 'report',
    region: 'Antarctic',
    latitude: -69.4,
    longitude: 76.3,
    description: 'Sample report marker for a field report from a summer Antarctic campaign.',
    researchThemes: ['Glaciology', 'Climate'],
    status: 'Sample report',
    image: IMG.bharati,
    connectedResources: { datasets: 8, publications: 15, reports: 1, media: 12 },
    expedition: { id: 'exp-43', number: '43', title: 'Indian Antarctic Expedition' },
  },
  {
    id: 'act-ocean-obs',
    name: 'Coastal ocean observation',
    type: 'activity',
    region: 'Antarctic',
    latitude: -69.6,
    longitude: 76.4,
    description: 'Sample research activity marker for a coastal ocean observation campaign.',
    researchThemes: ['Oceanography'],
    status: 'Sample activity',
    image: IMG.antarctic,
    connectedResources: { datasets: 6, publications: 4, reports: 3, media: 18 },
    expedition: { id: 'exp-so-27', number: 'SO-27', title: 'Southern Ocean Mission' },
  },
];

/* -------------------------------------------------------------------------- */
/*  Expedition routes                                                         */
/* -------------------------------------------------------------------------- */
const ROUTES = [
  {
    id: 'route-antarctic',
    name: 'Antarctic coastal survey (sample)',
    region: 'Antarctic',
    color: 'var(--color-accent-primary)',
    points: [
      [-68.0, 70.0],
      [-69.4, 76.2],
      [-69.6, 76.4],
      [-70.0, 12.0],
      [-70.77, 11.73],
    ],
  },
  {
    id: 'route-arctic',
    name: 'Arctic atmospheric transect (sample)',
    region: 'Arctic',
    color: 'var(--color-accent-secondary)',
    points: [
      [76.5, 8.0],
      [78.9, 11.9],
      [79.2, 12.4],
      [80.0, 15.5],
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Layer definitions                                                         */
/* -------------------------------------------------------------------------- */
const LAYERS = [
  { key: 'station', label: 'Research Stations', icon: FiGlobe, tone: 'accent' },
  { key: 'expedition', label: 'Expeditions', icon: FiCompass, tone: 'accent' },
  { key: 'activity', label: 'Research Activities', icon: FiActivity, tone: 'secondary' },
  { key: 'dataset', label: 'Datasets', icon: FiDatabase, tone: 'secondary' },
  { key: 'publication', label: 'Publications', icon: FiBookOpen, tone: 'secondary' },
  { key: 'report', label: 'Reports', icon: FiFileText, tone: 'secondary' },
  { key: 'media', label: 'Media', icon: FiImage, tone: 'secondary' },
  { key: 'location', label: 'Important Locations', icon: FiMapPin, tone: 'accent' },
];

const TYPE_META = {
  station: { icon: FiGlobe, label: 'Research Station' },
  expedition: { icon: FiCompass, label: 'Expedition' },
  activity: { icon: FiActivity, label: 'Research Activity' },
  dataset: { icon: FiDatabase, label: 'Dataset' },
  publication: { icon: FiBookOpen, label: 'Publication' },
  report: { icon: FiFileText, label: 'Report' },
  media: { icon: FiImage, label: 'Media' },
  location: { icon: FiMapPin, label: 'Location' },
};

/* -------------------------------------------------------------------------- */
/*  Research themes                                                           */
/* -------------------------------------------------------------------------- */
const THEMES = [
  { key: 'Climate', icon: FiThermometer, blurb: 'Long-term variability across polar latitudes.' },
  { key: 'Oceanography', icon: FiDroplet, blurb: 'Ocean circulation, sea-ice and productivity.' },
  { key: 'Glaciology', icon: FiLayers, blurb: 'Ice sheets, glacier mass balance and dynamics.' },
  { key: 'Biology', icon: FiFeather, blurb: 'Marine and terrestrial polar ecosystems.' },
  {
    key: 'Atmospheric Science',
    icon: FiWind,
    blurb: 'Aerosols, snow chemistry and air-mass transport.',
  },
  { key: 'Geology', icon: FiCompass, blurb: 'Bedrock, sediments and geological evolution.' },
  { key: 'Remote Sensing', icon: FiGlobe, blurb: 'Satellite observation of polar surfaces.' },
];

/* -------------------------------------------------------------------------- */
/*  Region cards                                                              */
/* -------------------------------------------------------------------------- */
const REGION_CARDS = [
  {
    key: 'Arctic',
    title: 'The Arctic',
    blurb:
      'Sea-ice, atmospheric chemistry, fjord ecology and a coastal research station on Svalbard.',
    image: IMG.arctic,
    themes: ['Atmospheric Science', 'Biology', 'Climate'],
    stats: { stations: 1, expeditions: 8, resources: 142 },
  },
  {
    key: 'Antarctic',
    title: 'The Antarctic',
    blurb:
      'Ice sheets, coastal oceanography, glaciology and a long-running research programme in the polar south.',
    image: IMG.antarctic,
    themes: ['Glaciology', 'Oceanography', 'Geology'],
    stats: { stations: 3, expeditions: 24, resources: 318 },
  },
];

/* -------------------------------------------------------------------------- */
/*  Featured polar locations                                                  */
/* -------------------------------------------------------------------------- */
const FEATURED_LOCATIONS = [
  {
    id: 'loc-himadri',
    name: 'Himadri',
    region: 'Arctic',
    focus: 'Atmospheric science',
    resources: ['Datasets', 'Publications', 'Media'],
    image: IMG.himadri,
  },
  {
    id: 'loc-maitri',
    name: 'Maitri',
    region: 'Antarctic',
    focus: 'Glaciology & geology',
    resources: ['Datasets', 'Reports', 'Publications'],
    image: IMG.maitri,
  },
  {
    id: 'loc-bharati',
    name: 'Bharati',
    region: 'Antarctic',
    focus: 'Oceanography & biology',
    resources: ['Datasets', 'Reports', 'Media'],
    image: IMG.bharati,
  },
];

/* -------------------------------------------------------------------------- */
/*  Connection flow                                                           */
/* -------------------------------------------------------------------------- */
const CONNECTION_CHAIN = [
  { icon: FiMapPin, label: 'Location', desc: 'Bharati (Larsemann Hills)' },
  { icon: FiCompass, label: 'Expedition', desc: 'Expedition 43 (sample)' },
  { icon: FiActivity, label: 'Research Activity', desc: 'Coastal ocean observation' },
  { icon: FiDatabase, label: 'Dataset', desc: 'Surface observations (sample)' },
  { icon: FiFileText, label: 'Publication', desc: 'Coastal glacier note (sample)' },
  { icon: FiImage, label: 'Media', desc: 'Field photograph (sample)' },
];

/* -------------------------------------------------------------------------- */
/*  Recent activity                                                           */
/* -------------------------------------------------------------------------- */
const RECENT_ACTIVITY = [
  { icon: FiCompass, text: 'Expedition 43 field log added', when: '2h ago', tag: 'Expedition' },
  { icon: FiFileText, text: 'Field report connected to Bharati', when: '5h ago', tag: 'Report' },
  { icon: FiDatabase, text: 'New dataset linked to Maitri', when: '1d ago', tag: 'Dataset' },
  {
    icon: FiBookOpen,
    text: 'Publication indexed — sea-ice review',
    when: '2d ago',
    tag: 'Publication',
  },
  { icon: FiImage, text: 'Media added to Himadri station', when: '3d ago', tag: 'Media' },
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

function regionTone(region) {
  const isArctic = region === 'Arctic';
  return {
    border: isArctic
      ? 'color-mix(in srgb, var(--color-accent-secondary) 45%, transparent)'
      : 'color-mix(in srgb, var(--color-accent-primary) 45%, transparent)',
    bg: isArctic ? 'color-mix(in srgb, var(--color-accent-secondary) 12%, transparent)' : AC_SOFT,
    color: isArctic ? 'var(--color-accent-secondary)' : AC,
  };
}

function RegionBadge({ region }) {
  const tone = regionTone(region);
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
      style={{ borderColor: tone.border, background: tone.bg, color: tone.color }}
    >
      <FiMapPin className="h-2.5 w-2.5" />
      {region}
    </span>
  );
}

function TypeBadge({ type }) {
  const meta = TYPE_META[type] || { label: type, icon: FiMapPin };
  const Icon = meta.icon;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-text-secondary)]"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <Icon className="h-2.5 w-2.5" />
      {meta.label}
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

/* Convert lat/lng into normalized x/y on our map plane */
function projectToPlane(lat, lng, region) {
  if (region === 'Arctic') {
    // Arctic view: latitude 60..90 → x, longitude -180..180 → y
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 30) * 100;
    return { x: clamp(x), y: clamp(y) };
  }
  // Antarctic view: latitude -90..-60 → x, longitude -180..180 → y
  const x = ((lng + 180) / 360) * 100;
  const y = ((lat - -90) / 30) * 100;
  return { x: clamp(x), y: clamp(y) };
}

function clamp(v) {
  return Math.max(4, Math.min(96, v));
}

/* ========================================================================== */
/*  Page                                                                      */
/* ========================================================================== */
export default function PolarMap({ dark, setDark }) {
  /* ---- state -------------------------------------------------------------- */
  const [region, setRegion] = useState('Arctic'); // Arctic | Antarctic | Both
  const [query, setQuery] = useState('');
  const [activeLayers, setActiveLayers] = useState(
    () => new Set(['station', 'expedition', 'activity'])
  );
  const [selectedId, setSelectedId] = useState(null);
  const [showRoutes, setShowRoutes] = useState(true);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [theme, setTheme] = useState('All');
  const [showLayerPanel, setShowLayerPanel] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);

  /* ---- derived markers ---------------------------------------------------- */
  const visibleMarkers = useMemo(() => {
    const q = query.trim().toLowerCase();

    return MARKERS.filter((m) => {
      if (region !== 'Both' && m.region !== region) return false;
      if (!activeLayers.has(m.type)) return false;
      if (theme !== 'All' && !m.researchThemes.includes(theme)) return false;

      if (q) {
        const hay = [
          m.name,
          m.description,
          m.region,
          m.researchThemes.join(' '),
          m.expedition?.title || '',
          m.expedition?.number || '',
        ]
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [region, query, activeLayers, theme]);

  const selected = useMemo(
    () => visibleMarkers.find((m) => m.id === selectedId) || null,
    [visibleMarkers, selectedId]
  );

  const visibleRoutes = useMemo(
    () => ROUTES.filter((r) => region === 'Both' || r.region === region),
    [region]
  );

  const toggleLayer = (key) => {
    setActiveLayers((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
    setSelectedId(null);
  };

  const resetAll = () => {
    setRegion('Arctic');
    setQuery('');
    setActiveLayers(new Set(['station', 'expedition', 'activity']));
    setSelectedId(null);
    setShowRoutes(true);
    setSelectedRouteId(null);
    setTheme('All');
    setMapZoom(1);
  };

  const setRegionAndReset = (r) => {
    setRegion(r);
    setSelectedId(null);
    setSelectedRouteId(null);
  };

  return (
    <div
      className="min-h-screen antialiased"
      style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}
    >
      <style>{STYLES}</style>

      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={IMG.hero}
            alt="Polar landscape with ice and open water"
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top,
                var(--pv-map-hero-overlay) 0%,
                color-mix(in srgb, var(--pv-map-hero-overlay) 65%, transparent) 40%,
                color-mix(in srgb, var(--pv-map-hero-overlay) 22%, transparent) 100%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right,
                color-mix(in srgb, var(--pv-map-hero-overlay) 78%, transparent) 0%,
                transparent 55%,
                transparent 100%)`,
            }}
          />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-20 pt-24 sm:px-8 sm:pb-24 sm:pt-32 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div
                className="inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] backdrop-blur-sm"
                style={{
                  borderColor: 'var(--pv-map-glass-border)',
                  background: 'var(--pv-map-chip-bg)',
                  color: 'var(--pv-map-hero-text)',
                }}
              >
                <FiCrosshair className="h-3 w-3" style={{ color: 'var(--color-accent-primary)' }} />
                Polar Discovery
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1
                className="mt-6 text-[2.1rem] font-medium leading-[1.05] tracking-[-0.035em] sm:text-[3rem] lg:text-[3.6rem]"
                style={{ color: 'var(--pv-map-hero-text)' }}
              >
                Explore the polar world.
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p
                className="mt-6 max-w-xl text-[15px] leading-relaxed sm:text-[16px]"
                style={{ color: 'var(--pv-map-hero-text-dim)' }}
              >
                Where polar science happens, what it produced, and who it involves — all in one map.
                Explore research stations, expeditions, field activities, datasets, publications and
                media across both polar regions.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#map"
                  className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13.5px] font-medium transition-colors"
                  style={{
                    background: 'var(--pv-map-hero-text)',
                    color: 'var(--pv-map-hero-overlay)',
                  }}
                >
                  Explore map
                  <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
                <Link
                  to="/expeditions"
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[13.5px] font-medium backdrop-blur-sm transition-colors"
                  style={{
                    borderColor: 'color-mix(in srgb, var(--pv-map-hero-text) 25%, transparent)',
                    color: 'color-mix(in srgb, var(--pv-map-hero-text) 92%, transparent)',
                  }}
                >
                  <FiCompass className="h-3.5 w-3.5" />
                  View expeditions
                </Link>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div
                className="mt-14 flex flex-wrap items-center gap-3 border-t pt-6 text-[11px] font-mono uppercase tracking-[0.18em]"
                style={{
                  borderColor: 'var(--pv-map-hero-divider)',
                  color: 'color-mix(in srgb, var(--pv-map-hero-text) 55%, transparent)',
                }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <FiGlobe className="h-3 w-3" /> Stations
                </span>
                <span
                  className="h-px flex-1"
                  style={{ background: 'var(--pv-map-hero-divider)' }}
                />
                <span className="inline-flex items-center gap-1.5">
                  <FiCompass className="h-3 w-3" /> Expeditions
                </span>
                <span
                  className="h-px flex-1"
                  style={{ background: 'var(--pv-map-hero-divider)' }}
                />
                <span className="inline-flex items-center gap-1.5">
                  <FiDatabase className="h-3 w-3" /> Data
                </span>
                <span
                  className="h-px flex-1"
                  style={{ background: 'var(--pv-map-hero-divider)' }}
                />
                <span className="inline-flex items-center gap-1.5">
                  <FiBookOpen className="h-3 w-3" /> Publications
                </span>
              </div>
            </Reveal>
          </div>

          {/* side preview card */}
          <div className="lg:col-span-5">
            <Reveal delay={220}>
              <div
                className="mx-auto w-full max-w-[420px] overflow-hidden rounded-2xl border backdrop-blur-md"
                style={{
                  borderColor: 'var(--pv-map-glass-border)',
                  background: 'var(--pv-map-glass-bg)',
                }}
              >
                <div
                  className="flex items-center justify-between border-b px-5 py-3"
                  style={{ borderColor: 'var(--pv-map-hero-divider)' }}
                >
                  <div
                    className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em]"
                    style={{
                      color: 'color-mix(in srgb, var(--pv-map-hero-text) 65%, transparent)',
                    }}
                  >
                    <FiCrosshair className="h-3 w-3" />
                    Sample map overview
                  </div>
                  <span
                    className="rounded-full px-2 py-0.5 text-[9.5px] font-mono uppercase tracking-[0.14em]"
                    style={{
                      background: 'color-mix(in srgb, var(--pv-map-hero-text) 12%, transparent)',
                      color: 'color-mix(in srgb, var(--pv-map-hero-text) 85%, transparent)',
                    }}
                  >
                    Demo
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 p-5">
                  {[
                    { k: 'Markers', v: MARKERS.length },
                    { k: 'Routes', v: ROUTES.length },
                    { k: 'Research themes', v: THEMES.length },
                    { k: 'Regions', v: 2 },
                  ].map((row) => (
                    <div
                      key={row.k}
                      className="rounded-lg border p-3"
                      style={{
                        borderColor: 'var(--pv-map-hero-divider)',
                        background: 'color-mix(in srgb, var(--pv-map-hero-text) 5%, transparent)',
                      }}
                    >
                      <div
                        className="font-mono text-[18px]"
                        style={{ color: 'var(--pv-map-hero-text)' }}
                      >
                        {row.v}
                      </div>
                      <div
                        className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em]"
                        style={{
                          color: 'color-mix(in srgb, var(--pv-map-hero-text) 55%, transparent)',
                        }}
                      >
                        {row.k}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="border-t px-5 py-3 text-[10px] font-mono uppercase tracking-[0.16em]"
                  style={{
                    borderColor: 'var(--pv-map-hero-divider)',
                    color: 'color-mix(in srgb, var(--pv-map-hero-text) 45%, transparent)',
                  }}
                >
                  Sample figures — replaced by live values once the map API is connected
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* MAP STATISTICS                                                   */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <p
                className="text-[11px] font-medium uppercase tracking-[0.22em]"
                style={{ color: AC }}
              >
                Discovery at a glance
              </p>
              <p className="max-w-sm text-[11.5px] leading-relaxed text-[var(--color-text-secondary)]">
                Sample figures for demonstration — replaced by live values once the map API is
                connected.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { label: 'Research stations', value: 4, suffix: '' },
              { label: 'Expeditions', value: 32, suffix: '+' },
              { label: 'Research activities', value: 46, suffix: '+' },
              { label: 'Knowledge resources', value: 480, suffix: '+' },
              { label: 'Polar regions', value: 2, suffix: '' },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 60}>
                <div>
                  <div className="text-[1.7rem] font-medium tracking-tight text-[var(--color-text-primary)] sm:text-[1.9rem]">
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
      {/* MAP EXPLORER                                                     */}
      {/* ================================================================ */}
      <section id="map" className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p
                  className="text-[11px] font-medium uppercase tracking-[0.22em]"
                  style={{ color: AC }}
                >
                  Map explorer
                </p>
                <h2 className="mt-3 text-[1.35rem] font-medium tracking-tight text-[var(--color-text-primary)] sm:text-[1.55rem]">
                  Discover polar science geographically
                </h2>
                <p className="mt-2 max-w-xl text-[13.5px] text-[var(--color-text-secondary)]">
                  Switch regions, toggle layers, search and click a marker to see its connected
                  knowledge.
                </p>
              </div>
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12.5px] font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <FiX className="h-3.5 w-3.5" />
                Reset
              </button>
            </div>
          </Reveal>

          {/* region tabs + search */}
          <Reveal delay={80}>
            <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
              <div
                className="inline-flex items-center gap-1 rounded-full border p-1"
                style={{ borderColor: 'var(--color-border)' }}
                role="tablist"
                aria-label="Polar region"
              >
                {['Arctic', 'Antarctic', 'Both'].map((r) => (
                  <button
                    key={r}
                    role="tab"
                    aria-selected={region === r}
                    type="button"
                    onClick={() => setRegionAndReset(r)}
                    className="rounded-full px-4 py-2 text-[12.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                    style={{
                      background: region === r ? AC_SOFT : 'transparent',
                      color: region === r ? AC : 'var(--color-text-secondary)',
                    }}
                  >
                    {r === 'Both' ? 'Both Poles' : r}
                  </button>
                ))}
              </div>

              <div className="relative flex-1">
                <FiSearch
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-secondary)]"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search stations, expeditions, locations, research…"
                  aria-label="Search polar map"
                  className="w-full rounded-xl border py-3 pl-11 pr-11 text-[13.5px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
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

              <button
                type="button"
                onClick={() => setShowLayerPanel((v) => !v)}
                aria-expanded={showLayerPanel}
                className="inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-[12.5px] font-medium text-[var(--color-text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] lg:hidden"
                style={{
                  borderColor: 'var(--color-border)',
                  background: 'var(--color-bg-secondary)',
                }}
              >
                <FiLayers className="h-4 w-4" />
                Layers
                <span className="ml-1 text-[11px] text-[var(--color-text-secondary)]">
                  {activeLayers.size}
                </span>
              </button>
            </div>
          </Reveal>

          {/* main layout */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* left column: layers + themes */}
            <aside className={`lg:col-span-3 ${showLayerPanel ? 'block' : 'hidden lg:block'}`}>
              <div
                className="space-y-5 rounded-2xl border p-5"
                style={{
                  borderColor: 'var(--color-border)',
                  background: 'var(--color-bg-secondary)',
                }}
              >
                <div>
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                    <FiLayers className="h-3 w-3" />
                    Layers
                  </div>
                  <ul className="space-y-1.5">
                    {LAYERS.map((l) => {
                      const Icon = l.icon;
                      const active = activeLayers.has(l.key);
                      return (
                        <li key={l.key}>
                          <button
                            type="button"
                            onClick={() => toggleLayer(l.key)}
                            aria-pressed={active}
                            className="group flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                            style={{
                              borderColor: active ? AC : 'var(--color-border)',
                              background: active ? AC_SOFT : 'var(--color-bg-primary)',
                            }}
                          >
                            <span
                              className="flex h-6 w-6 items-center justify-center rounded-md"
                              style={{
                                background: active ? AC : 'var(--color-bg-secondary)',
                                color: active
                                  ? 'var(--color-accent-primary-foreground)'
                                  : 'var(--color-text-secondary)',
                              }}
                            >
                              <Icon className="h-3.5 w-3.5" />
                            </span>
                            <span
                              className="flex-1 text-[12.5px] font-medium"
                              style={{ color: active ? AC : 'var(--color-text-primary)' }}
                            >
                              {l.label}
                            </span>
                            {active && <FiCheck className="h-3.5 w-3.5" style={{ color: AC }} />}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="border-t pt-5" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                    <FiActivity className="h-3 w-3" />
                    Expedition routes
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowRoutes((v) => !v)}
                    aria-pressed={showRoutes}
                    className="flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                    style={{
                      borderColor: showRoutes ? AC : 'var(--color-border)',
                      background: showRoutes ? AC_SOFT : 'var(--color-bg-primary)',
                    }}
                  >
                    <span
                      className="text-[12.5px] font-medium"
                      style={{ color: showRoutes ? AC : 'var(--color-text-primary)' }}
                    >
                      {showRoutes ? 'Routes shown' : 'Routes hidden'}
                    </span>
                    <span
                      className="flex h-5 w-9 items-center rounded-full p-0.5 transition-colors"
                      style={{
                        background: showRoutes ? AC : 'var(--color-border)',
                      }}
                    >
                      <span
                        className="h-4 w-4 rounded-full bg-white shadow-sm transition-transform"
                        style={{ transform: showRoutes ? 'translateX(16px)' : 'translateX(0)' }}
                      />
                    </span>
                  </button>
                </div>

                <div className="border-t pt-5" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                    <FiFilter className="h-3 w-3" />
                    Research theme
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <Chip active={theme === 'All'} onClick={() => setTheme('All')}>
                      All
                    </Chip>
                    {THEMES.map((t) => (
                      <Chip key={t.key} active={theme === t.key} onClick={() => setTheme(t.key)}>
                        {t.key}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* center: map */}
            <div className="lg:col-span-6">
              <div
                className="relative overflow-hidden rounded-2xl border"
                style={{ borderColor: 'var(--color-border)', background: 'var(--pv-map-ocean-3)' }}
              >
                <PolarMapCanvas
                  markers={visibleMarkers}
                  routes={showRoutes ? visibleRoutes : []}
                  region={region}
                  selectedId={selectedId}
                  onSelect={(id) => setSelectedId(id === selectedId ? null : id)}
                  zoom={mapZoom}
                  onZoomIn={() => setMapZoom((z) => Math.min(z + 0.15, 1.45))}
                  onZoomOut={() => setMapZoom((z) => Math.max(z - 0.15, 0.75))}
                  onResetZoom={() => setMapZoom(1)}
                  selectedRouteId={selectedRouteId}
                  onSelectRoute={(id) => setSelectedRouteId(id === selectedRouteId ? null : id)}
                />

                {/* search/match indicator */}
                <div
                  className="pointer-events-none absolute left-4 top-4 rounded-lg border px-3 py-1.5 text-[10.5px] font-mono uppercase tracking-[0.14em] backdrop-blur-sm"
                  style={{
                    borderColor: 'var(--pv-map-chip-border)',
                    background: 'var(--pv-map-chip-bg)',
                    color: '#ffffff',
                  }}
                >
                  {region} · {visibleMarkers.length} marker{visibleMarkers.length === 1 ? '' : 's'}
                </div>
              </div>

              {/* legend */}
              <div
                className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border px-4 py-3"
                style={{
                  borderColor: 'var(--color-border)',
                  background: 'var(--color-bg-secondary)',
                }}
              >
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                  Legend
                </span>
                {Object.entries(TYPE_META).map(([key, meta]) => {
                  const Icon = meta.icon;
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1.5 text-[11.5px] text-[var(--color-text-secondary)]"
                    >
                      <span
                        className="flex h-5 w-5 items-center justify-center rounded-md"
                        style={{ background: 'var(--color-bg-primary)', color: AC }}
                      >
                        <Icon className="h-3 w-3" />
                      </span>
                      {meta.label}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* right: selected details */}
            <aside className="lg:col-span-3">
              <div
                className="sticky top-24 space-y-4 rounded-2xl border p-5"
                style={{
                  borderColor: 'var(--color-border)',
                  background: 'var(--color-bg-secondary)',
                }}
              >
                {selected ? (
                  <div className="pv-map-fade-in">
                    <div className="flex items-start justify-between gap-3">
                      <RegionBadge region={selected.region} />
                      <button
                        type="button"
                        onClick={() => setSelectedId(null)}
                        aria-label="Close selected location"
                        className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                      >
                        <FiX className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div
                      className="mt-4 overflow-hidden rounded-lg border"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <img
                        src={selected.image}
                        alt={`Illustrative imagery for ${selected.name}`}
                        className="aspect-[16/10] w-full object-cover"
                      />
                    </div>

                    <h3 className="mt-4 text-[15px] font-medium leading-snug text-[var(--color-text-primary)]">
                      {selected.name}
                    </h3>
                    <div className="mt-1.5">
                      <TypeBadge type={selected.type} />
                    </div>

                    <p className="mt-3 text-[12.5px] leading-relaxed text-[var(--color-text-secondary)]">
                      {selected.description}
                    </p>

                    <dl
                      className="mt-4 space-y-2 border-t pt-4"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <Row icon={FiTarget} k="Status" v={selected.status} />
                      <Row
                        icon={FiCrosshair}
                        k="Coordinates"
                        v={`${selected.latitude.toFixed(2)}° , ${selected.longitude.toFixed(2)}°`}
                      />
                      {selected.expedition && (
                        <Row
                          icon={FiCompass}
                          k="Expedition"
                          v={`Exp. ${selected.expedition.number}`}
                        />
                      )}
                    </dl>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {selected.researchThemes.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border px-2 py-0.5 text-[10.5px] text-[var(--color-text-secondary)]"
                          style={{ borderColor: 'var(--color-border)' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div
                      className="mt-4 grid grid-cols-2 gap-2 border-t pt-4"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      {[
                        {
                          icon: FiDatabase,
                          k: 'Datasets',
                          v: selected.connectedResources.datasets,
                        },
                        {
                          icon: FiBookOpen,
                          k: 'Publications',
                          v: selected.connectedResources.publications,
                        },
                        { icon: FiFileText, k: 'Reports', v: selected.connectedResources.reports },
                        { icon: FiImage, k: 'Media', v: selected.connectedResources.media },
                      ].map((c) => {
                        const Icon = c.icon;
                        return (
                          <div key={c.k} className="flex items-center gap-2">
                            <span
                              className="flex h-7 w-7 items-center justify-center rounded-md"
                              style={{ background: AC_SOFT, color: AC }}
                            >
                              <Icon className="h-3.5 w-3.5" />
                            </span>
                            <div className="min-w-0">
                              <div className="text-[13px] font-medium text-[var(--color-text-primary)]">
                                {c.v}
                              </div>
                              <div className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-secondary)]">
                                {c.k}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {selected.expedition && (
                        <Link
                          to={`/expeditions/${selected.expedition.id}`}
                          className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold shadow-sm transition-transform hover:scale-[1.02]"
                          style={{
                            background:
                              'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
                            color: 'var(--color-accent-primary-foreground)',
                          }}
                        >
                          <FiCompass className="h-3 w-3" />
                          View expedition
                        </Link>
                      )}
                      <Link
                        to="/knowledge"
                        className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12px] font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent-primary)]"
                        style={{ borderColor: 'var(--color-border)' }}
                      >
                        Explore resources
                        <FiArrowRight className="h-3 w-3" />
                      </Link>
                    </div>

                    <p className="mt-4 text-[10.5px] leading-relaxed text-[var(--color-text-secondary)]">
                      Sample marker — coordinates are illustrative demonstration values.
                    </p>
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <span
                      className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border"
                      style={{
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      <FiCrosshair className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-[14px] font-medium text-[var(--color-text-primary)]">
                      Select a marker
                    </h3>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
                      Click any marker on the map to see its connected expeditions, datasets,
                      reports and publications.
                    </p>
                  </div>
                )}

                {showRoutes && visibleRoutes.length > 0 && (
                  <div className="border-t pt-4" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                      Expedition routes
                    </div>
                    <ul className="space-y-1.5">
                      {visibleRoutes.map((r) => {
                        const active = selectedRouteId === r.id;
                        return (
                          <li key={r.id}>
                            <button
                              type="button"
                              onClick={() => setSelectedRouteId(active ? null : r.id)}
                              aria-pressed={active}
                              className="flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-[12px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                              style={{
                                borderColor: active ? AC : 'var(--color-border)',
                                background: active ? AC_SOFT : 'var(--color-bg-primary)',
                                color: active ? AC : 'var(--color-text-primary)',
                              }}
                            >
                              <span
                                className="h-1.5 w-6 shrink-0 rounded-full"
                                style={{ background: r.color }}
                              />
                              <span className="min-w-0 flex-1 truncate">{r.name}</span>
                              <span className="text-[10.5px] text-[var(--color-text-secondary)]">
                                {r.points.length} pts
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* DISCOVER BY REGION                                               */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="max-w-xl">
              <p
                className="text-[11px] font-medium uppercase tracking-[0.22em]"
                style={{ color: AC }}
              >
                Discover by region
              </p>
              <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.75rem]">
                Two poles, one scientific programme.
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {REGION_CARDS.map((r, i) => (
              <Reveal key={r.key} delay={i * 80}>
                <button
                  type="button"
                  onClick={() => {
                    setRegionAndReset(r.key);
                    document
                      .getElementById('map')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="group relative block h-full w-full overflow-hidden rounded-2xl border text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <div className="relative">
                    <img
                      src={r.image}
                      alt={`${r.title} sample landscape`}
                      className="aspect-[16/9] w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to top,
                          rgba(4,7,15,0.85) 0%,
                          rgba(4,7,15,0.15) 55%,
                          transparent 100%)`,
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <div className="text-[10.5px] font-mono uppercase tracking-[0.16em] text-white/70">
                        {r.key === 'Arctic' ? 'Northern hemisphere' : 'Southern hemisphere'}
                      </div>
                      <h3 className="mt-2 text-[1.35rem] font-medium leading-tight text-white">
                        {r.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
                      {r.blurb}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {r.themes.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border px-2 py-0.5 text-[10.5px] text-[var(--color-text-secondary)]"
                          style={{ borderColor: 'var(--color-border)' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div
                      className="mt-5 grid grid-cols-3 gap-3 border-t pt-4 text-[11px]"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      {[
                        { k: 'Stations', v: r.stats.stations },
                        { k: 'Expeditions', v: r.stats.expeditions },
                        { k: 'Resources', v: r.stats.resources },
                      ].map((s) => (
                        <div key={s.k}>
                          <div className="text-[14px] font-medium text-[var(--color-text-primary)]">
                            {s.v}
                          </div>
                          <div className="mt-0.5 text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-secondary)]">
                            {s.k}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div
                      className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium transition-transform duration-300 group-hover:translate-x-0.5"
                      style={{ color: AC }}
                    >
                      Explore region
                      <FiArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FEATURED LOCATIONS                                               */}
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
                  Featured locations
                </p>
                <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.75rem]">
                  Notable polar sites.
                </h2>
              </div>
              <Link
                to="/expeditions"
                className="group inline-flex items-center gap-2 text-[13px] font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent-primary)]"
              >
                Browse all locations
                <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_LOCATIONS.map((l, i) => (
              <Reveal key={l.id} delay={i * 70}>
                <div
                  className="group flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1"
                  style={{
                    borderColor: 'var(--color-border)',
                    background: 'var(--color-bg-secondary)',
                  }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={l.image}
                      alt={`Illustrative imagery for ${l.name}`}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div className="absolute left-3 top-3">
                      <RegionBadge region={l.region} />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-[15px] font-medium leading-snug text-[var(--color-text-primary)]">
                      {l.name}
                    </h3>
                    <div className="mt-1 text-[12px] text-[var(--color-text-secondary)]">
                      Focus: {l.focus}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {l.resources.map((r) => (
                        <span
                          key={r}
                          className="rounded-full border px-2 py-0.5 text-[10.5px] text-[var(--color-text-secondary)]"
                          style={{ borderColor: 'var(--color-border)' }}
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setRegionAndReset(l.region);
                        setSelectedId(l.id);
                        document
                          .getElementById('map')
                          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="group mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium transition-transform duration-300 hover:translate-x-0.5 focus-visible:outline-none"
                      style={{ color: AC }}
                    >
                      View on map
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
      {/* RESEARCH THEMES                                                  */}
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
                  Research themes
                </p>
                <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.75rem]">
                  Explore polar science by theme.
                </h2>
              </div>
              <p className="max-w-sm text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                Click a theme to filter the map above.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {THEMES.map((t, i) => {
              const Icon = t.icon;
              const count = MARKERS.filter((m) => m.researchThemes.includes(t.key)).length;
              const active = theme === t.key;
              return (
                <Reveal key={t.key} delay={i * 55}>
                  <button
                    type="button"
                    onClick={() => {
                      setTheme(active ? 'All' : t.key);
                      document
                        .getElementById('map')
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
                      {t.key}
                    </span>
                    <span className="text-[12.5px] leading-snug text-[var(--color-text-secondary)]">
                      {t.blurb}
                    </span>
                    <span className="mt-auto pt-3 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                      {count} marker{count === 1 ? '' : 's'}
                    </span>
                  </button>
                </Reveal>
              );
            })}
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
                Connected knowledge
              </p>
              <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.9rem]">
                The map is a gateway, not just geography.
              </h2>
              <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
                One marker opens onto an expedition, which produced a research activity, which
                generated a dataset, which informed a publication, which fed into media — all
                connected through PolarVerse.
              </p>
            </div>
          </Reveal>

          <div className="mt-12">
            <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
              {CONNECTION_CHAIN.map((c, i) => {
                const Icon = c.icon;
                return (
                  <Reveal key={c.label} delay={i * 60}>
                    <li className="relative">
                      <div
                        className="flex h-full flex-col items-start gap-3 rounded-xl border p-4"
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
                      </div>
                      {i < CONNECTION_CHAIN.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-[var(--color-text-secondary)] lg:flex"
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
      {/* RECENT ACTIVITY                                                  */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <p
                  className="text-[11px] font-medium uppercase tracking-[0.22em]"
                  style={{ color: AC }}
                >
                  Recent activity
                </p>
                <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.75rem]">
                  What's changing on the map.
                </h2>
                <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  Sample activity feed showing how the archive grows as new material is indexed and
                  connected.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <ul
                className="divide-y rounded-2xl border"
                style={{
                  borderColor: 'var(--color-border)',
                  background: 'var(--color-bg-secondary)',
                }}
              >
                {RECENT_ACTIVITY.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <Reveal key={i} delay={i * 60}>
                      <li className="flex items-start gap-3 p-4">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                          style={{ background: AC_SOFT, color: AC }}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="text-[13px] font-medium text-[var(--color-text-primary)]">
                            {a.text}
                          </div>
                          <div className="mt-1 flex items-center gap-3 text-[11px] text-[var(--color-text-secondary)]">
                            <span
                              className="rounded-full border px-2 py-0.5"
                              style={{ borderColor: 'var(--color-border)' }}
                            >
                              {a.tag}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <FiCalendar className="h-3 w-3" />
                              {a.when}
                            </span>
                          </div>
                        </div>
                      </li>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* STUDENT CTA                                                      */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-2xl border p-8 sm:p-12"
              style={{
                borderColor: 'var(--color-border)',
                background: 'var(--color-bg-secondary)',
              }}
            >
              <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <p
                    className="text-[11px] font-medium uppercase tracking-[0.22em]"
                    style={{ color: AC }}
                  >
                    For students
                  </p>
                  <h2 className="mt-4 text-[1.6rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[2rem]">
                    Start your polar science journey.
                  </h2>
                  <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">
                    Explore stations, expeditions, research topics and knowledge resources through
                    the map — with student-friendly explanations and learning paths.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      to="/learn"
                      className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-[13px] font-semibold shadow-sm transition-transform hover:scale-[1.02]"
                      style={{
                        background:
                          'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
                        color: 'var(--color-accent-primary-foreground)',
                      }}
                    >
                      <FiBook className="h-3.5 w-3.5" />
                      Enter student mode
                      <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                      to="/research-stories"
                      className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[13px] font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent-primary)]"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <FiAward className="h-3.5 w-3.5" />
                      Explore research stories
                    </Link>
                  </div>
                </div>
                <div className="hidden lg:col-span-5 lg:block">
                  <div
                    className="rounded-2xl border p-6"
                    style={{
                      borderColor: 'var(--color-border)',
                      background: 'var(--color-bg-primary)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ background: AC_SOFT, color: AC }}
                      >
                        <GiSnowflake1 className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="text-[13.5px] font-medium text-[var(--color-text-primary)]">
                          Every marker tells a story
                        </div>
                        <div className="mt-0.5 text-[11.5px] text-[var(--color-text-secondary)]">
                          Learn how an expedition becomes a dataset, a paper, and a media story.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FINAL CTA                                                        */}
      {/* ================================================================ */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={IMG.cta} alt="" aria-hidden="true" className="h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background: 'color-mix(in srgb, var(--pv-map-hero-overlay) 78%, transparent)',
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="max-w-2xl">
            <Reveal>
              <h2
                className="text-[1.9rem] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[2.5rem]"
                style={{ color: 'var(--pv-map-hero-text)' }}
              >
                Discover the research behind the map.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p
                className="mt-6 max-w-lg text-[15px] leading-relaxed"
                style={{ color: 'var(--pv-map-hero-text-dim)' }}
              >
                Every marker leads somewhere — a mission, a dataset, a paper, a field photograph.
                Follow the thread.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  to="/expeditions"
                  className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13.5px] font-medium transition-colors"
                  style={{
                    background: 'var(--pv-map-hero-text)',
                    color: 'var(--pv-map-hero-overlay)',
                  }}
                >
                  Explore expeditions
                  <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/knowledge"
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[13.5px] font-medium backdrop-blur-sm transition-colors"
                  style={{
                    borderColor: 'color-mix(in srgb, var(--pv-map-hero-text) 25%, transparent)',
                    color: 'color-mix(in srgb, var(--pv-map-hero-text) 92%, transparent)',
                  }}
                >
                  <FiBookOpen className="h-3.5 w-3.5" />
                  Browse knowledge repository
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
/*  Map canvas                                                                */
/* ========================================================================== */
function PolarMapCanvas({
  markers,
  routes,
  region,
  selectedId,
  onSelect,
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  selectedRouteId,
  onSelectRoute,
}) {
  const [hoverId, setHoverId] = useState(null);
  const isBoth = region === 'Both';

  return (
    <div className="relative aspect-[5/4] w-full overflow-hidden lg:aspect-[16/12]">
      {/* backdrop gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 50% 20%,
            var(--pv-map-ocean-2) 0%,
            var(--pv-map-ocean-1) 45%,
            var(--pv-map-ocean-3) 100%)`,
        }}
      />

      {/* aurora blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/4 top-0 h-1/2 w-1/2 rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, var(--pv-map-aurora-1), transparent 65%)` }}
        />
        <div
          className="absolute right-0 bottom-0 h-1/2 w-1/3 rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, var(--pv-map-aurora-2), transparent 65%)` }}
        />
        <div
          className="absolute left-0 bottom-1/4 h-1/3 w-1/3 rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, var(--pv-map-aurora-3), transparent 65%)` }}
        />
      </div>

      {/* SVG map plane */}
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'center center',
          transition: 'transform 320ms cubic-bezier(.16,1,.3,1)',
        }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <radialGradient id="pv-map-ice-cap" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="var(--pv-map-ice)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--pv-map-ice)" stopOpacity="0" />
            </radialGradient>
            <pattern id="pv-map-grid" width="6.25" height="6.25" patternUnits="userSpaceOnUse">
              <path
                d="M 6.25 0 L 0 0 0 6.25"
                fill="none"
                stroke="var(--pv-map-grid)"
                strokeWidth="0.15"
              />
            </pattern>
          </defs>

          {/* polar ice caps */}
          <circle cx="50" cy="22" r="32" fill="url(#pv-map-ice-cap)" />
          <circle cx="50" cy="80" r="34" fill="url(#pv-map-ice-cap)" />

          {/* grid */}
          <rect width="100" height="100" fill="url(#pv-map-grid)" />

          {/* latitude/longitude arcs (sample) */}
          {[15, 30, 45, 60, 75, 85].map((r) => (
            <ellipse
              key={`lat-${r}`}
              cx="50"
              cy="50"
              rx="46"
              ry={r * 0.5}
              fill="none"
              stroke="var(--pv-map-grid)"
              strokeWidth="0.12"
            />
          ))}
          {[-60, -30, 0, 30, 60].map((x) => (
            <line
              key={`lon-${x}`}
              x1={50 + x}
              y1="0"
              x2={50 + x}
              y2="100"
              stroke="var(--pv-map-grid)"
              strokeWidth="0.12"
            />
          ))}

          {/* equator hint */}
          <line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            stroke="var(--pv-map-grid)"
            strokeWidth="0.2"
            strokeDasharray="1 1.5"
          />

          {/* routes */}
          {routes.map((r) => {
            const active = selectedRouteId === r.id;
            const pts = r.points
              .map(([lat, lng]) => {
                const p = isBoth
                  ? projectToPlane(lat, lng, lat >= 0 ? 'Arctic' : 'Antarctic')
                  : projectToPlane(lat, lng, region);
                return `${p.x},${p.y}`;
              })
              .join(' ');
            return (
              <g
                key={r.id}
                onClick={() => onSelectRoute && onSelectRoute(r.id)}
                style={{ cursor: 'pointer' }}
              >
                <polyline
                  points={pts}
                  fill="none"
                  stroke={r.color}
                  strokeOpacity={active ? 1 : 0.6}
                  strokeWidth={active ? 0.45 : 0.3}
                  className="pv-map-route"
                />
                {r.points.map(([lat, lng], i) => {
                  const p = isBoth
                    ? projectToPlane(lat, lng, lat >= 0 ? 'Arctic' : 'Antarctic')
                    : projectToPlane(lat, lng, region);
                  return (
                    <circle
                      key={i}
                      cx={p.x}
                      cy={p.y}
                      r="0.55"
                      fill={r.color}
                      stroke="rgba(255,255,255,0.85)"
                      strokeWidth="0.15"
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>

        {/* markers */}
        {markers.map((m) => {
          const zone = isBoth ? (m.region === 'Arctic' ? 'Arctic' : 'Antarctic') : region;
          const { x, y } = projectToPlane(m.latitude, m.longitude, zone);
          const meta = TYPE_META[m.type] || { icon: FiMapPin };
          const Icon = meta.icon;
          const isSelected = m.id === selectedId;
          const isHover = m.id === hoverId;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelect(m.id)}
              onMouseEnter={() => setHoverId(m.id)}
              onMouseLeave={() => setHoverId(null)}
              aria-label={`${meta.label}: ${m.name}`}
              className="pv-map-marker-hit absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -100%)',
                zIndex: isSelected || isHover ? 20 : 10,
              }}
            >
              <span
                className="relative flex h-7 w-7 items-center justify-center rounded-full border-2 shadow-lg transition-transform"
                style={{
                  background: isSelected ? AC : 'var(--pv-map-marker-bg)',
                  borderColor: isSelected ? AC : 'var(--pv-map-marker-border)',
                  color: isSelected ? 'var(--color-accent-primary-foreground)' : AC,
                }}
              >
                <Icon className="h-3.5 w-3.5" />
                {isSelected && (
                  <span
                    className="pv-map-pulse absolute inset-0 rounded-full"
                    style={{ border: `2px solid ${AC}` }}
                  />
                )}
              </span>
              {(isHover || isSelected) && (
                <span
                  className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md border px-2 py-1 text-[10.5px] font-medium shadow-md"
                  style={{
                    borderColor: 'var(--color-border)',
                    background: 'var(--color-bg-primary)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {m.name}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* region label */}
      <div
        className="pointer-events-none absolute right-4 top-4 rounded-lg border px-3 py-1.5 text-[10.5px] font-mono uppercase tracking-[0.14em] backdrop-blur-sm"
        style={{
          borderColor: 'var(--pv-map-chip-border)',
          background: 'var(--pv-map-chip-bg)',
          color: '#ffffff',
        }}
      >
        {region === 'Both' ? 'Both poles' : region}
      </div>

      {/* compass */}
      <div
        className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-sm"
        style={{
          borderColor: 'var(--pv-map-chip-border)',
          background: 'var(--pv-map-chip-bg)',
          color: '#ffffff',
        }}
        aria-hidden="true"
      >
        <span className="relative flex h-full w-full items-center justify-center">
          <FiCrosshair className="h-4 w-4" />
          <span className="absolute left-1/2 top-1.5 h-1 w-1 -translate-x-1/2 rounded-full bg-white" />
        </span>
      </div>

      {/* zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1.5">
        <button
          type="button"
          onClick={onZoomIn}
          aria-label="Zoom in"
          className="flex h-8 w-8 items-center justify-center rounded-md border backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
          style={{
            borderColor: 'var(--pv-map-chip-border)',
            background: 'var(--pv-map-chip-bg)',
            color: '#ffffff',
          }}
        >
          <FiPlus className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={onZoomOut}
          aria-label="Zoom out"
          className="flex h-8 w-8 items-center justify-center rounded-md border backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
          style={{
            borderColor: 'var(--pv-map-chip-border)',
            background: 'var(--pv-map-chip-bg)',
            color: '#ffffff',
          }}
        >
          <FiMinus className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={onResetZoom}
          aria-label="Reset zoom"
          className="flex h-8 w-8 items-center justify-center rounded-md border backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
          style={{
            borderColor: 'var(--pv-map-chip-border)',
            background: 'var(--pv-map-chip-bg)',
            color: '#ffffff',
          }}
        >
          <FiCrosshair className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function Row({ icon: Icon, k, v }) {
  return (
    <div className="flex items-start gap-2.5">
      <span
        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
        style={{ background: AC_SOFT, color: AC }}
      >
        <Icon className="h-3 w-3" />
      </span>
      <div className="min-w-0">
        <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
          {k}
        </div>
        <div className="mt-0.5 text-[12px] font-medium text-[var(--color-text-primary)]">{v}</div>
      </div>
    </div>
  );
}
