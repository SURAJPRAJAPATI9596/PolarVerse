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
  FiCamera,
  FiVideo,
  FiPlay,
  FiImage,
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
  FiUsers,
  FiActivity,
  FiDatabase,
  FiFileText,
  FiBookOpen,
  FiTarget,
  FiSliders,
  FiMaximize2,
  FiGrid,
  FiChevronDown,
} from 'react-icons/fi';
import { GiSnowflake1 } from 'react-icons/gi';

/* ============================================================================
   Media — polar science visual archive for PolarVerse
   ========================================================================== */

/* -------------------------------------------------------------------------- */
/*  Scoped theme extensions                                                   */
/* -------------------------------------------------------------------------- */
const STYLES = `
  :root {
    --pv-media-hero-overlay: #04070f;
    --pv-media-glass-bg: rgba(4, 7, 15, 0.55);
    --pv-media-glass-border: rgba(255, 255, 255, 0.18);
    --pv-media-chip-bg: rgba(4, 7, 15, 0.82);
    --pv-media-chip-border: rgba(255, 255, 255, 0.20);
    --pv-media-hero-text: #ffffff;
    --pv-media-hero-text-dim: rgba(255, 255, 255, 0.72);
    --pv-media-hero-divider: rgba(255, 255, 255, 0.16);
    --pv-media-image-overlay: rgba(0, 0, 0, 0.45);
    --pv-media-scrim: rgba(0, 0, 0, 0.72);
  }
  .dark {
    --pv-media-image-overlay: rgba(0, 0, 0, 0.52);
    --pv-media-scrim: rgba(0, 0, 0, 0.78);
  }

  @keyframes pv-media-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes pv-media-scale-in {
    from { opacity: 0; transform: translateY(12px) scale(0.985); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .pv-media-modal-backdrop { animation: pv-media-fade-in 200ms ease-out; }
  .pv-media-modal-panel    { animation: pv-media-scale-in 240ms cubic-bezier(.16,1,.3,1); }
`;

/* -------------------------------------------------------------------------- */
/*  Imagery — replaceable demo URLs                                           */
/* -------------------------------------------------------------------------- */
const IMG = {
  hero: 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?auto=format&fit=crop&w=2400&q=80',
  featured:
    'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=2000&q=80',
  cta: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=2400&q=80',
  m1: 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?auto=format&fit=crop&w=1200&q=80',
  m2: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1200&q=80',
  m3: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
  m4: 'https://images.unsplash.com/photo-1520637836862-4d197d17c50a?auto=format&fit=crop&w=1200&q=80',
  m5: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?auto=format&fit=crop&w=1200&q=80',
  m6: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?auto=format&fit=crop&w=1200&q=80',
  m7: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=1200&q=80',
  m8: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80',
  m9: 'https://images.unsplash.com/photo-1613573081262-69e37dfd72f1?auto=format&fit=crop&w=1200&q=80',
  m10: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
  m11: 'https://images.unsplash.com/photo-1520637836862-4d197d17c50a?auto=format&fit=crop&w=1200&q=80',
  m12: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1200&q=80',
  m13: 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?auto=format&fit=crop&w=1200&q=80',
  m14: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?auto=format&fit=crop&w=1200&q=80',
  m15: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?auto=format&fit=crop&w=1200&q=80',
  m16: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=1200&q=80',
};

/* -------------------------------------------------------------------------- */
/*  Demo media dataset — replaceable with GET /api/v1/media                   */
/* -------------------------------------------------------------------------- */
const MEDIA = [
  {
    id: 'md-01',
    type: 'photo',
    title: 'First light over the coastal ice shelf',
    description:
      'Sample image depicting early morning light over a coastal ice shelf. Demo content, not an official PolarVerse media record.',
    image: IMG.m1,
    thumbnail: IMG.m1,
    region: 'Antarctic',
    location: 'Larsemann Hills, East Antarctica',
    year: 2026,
    added: '2026-02-01',
    expedition: { id: 'exp-43', number: '43', title: 'Indian Antarctic Expedition' },
    researchArea: 'Glaciology',
    category: 'Expedition',
    keywords: ['Ice Shelf', 'Antarctic', 'Field Research', 'Dawn'],
    photographer: 'Field Media Team (sample)',
    source: 'Demo Archive',
    relatedReport: 'Expedition 43 field report (sample)',
    relatedDataset: 'Coastal ice-shelf observations (sample)',
    relatedPublication: 'Coastal glacier note (sample)',
  },
  {
    id: 'md-02',
    type: 'photo',
    title: 'Sea-ice floe near a research vessel',
    description:
      'Sample photograph of sea-ice floe patterns observed near a polar research vessel. Demo content.',
    image: IMG.m2,
    thumbnail: IMG.m2,
    region: 'Antarctic',
    location: 'Southern Ocean · Prydz Bay',
    year: 2025,
    added: '2025-12-14',
    expedition: { id: 'exp-so-27', number: 'SO-27', title: 'Southern Ocean Mission' },
    researchArea: 'Oceanography',
    category: 'Research Activity',
    keywords: ['Sea Ice', 'Southern Ocean', 'Vessel', 'Observation'],
    photographer: 'Field Media Team (sample)',
    source: 'Demo Archive',
    relatedReport: 'Southern Ocean cruise log (sample)',
    relatedDataset: 'Sea-ice extent sample dataset',
    relatedPublication: 'Sea-ice variability review (sample)',
  },
  {
    id: 'md-03',
    type: 'video',
    title: 'Journey to an Antarctic research station',
    description:
      'Short sample video narrative describing the voyage to an Antarctic coastal research station. Demo content.',
    image: IMG.m3,
    thumbnail: IMG.m3,
    video: null,
    duration: '4:12',
    region: 'Antarctic',
    location: 'Coastal East Antarctica',
    year: 2025,
    added: '2025-11-08',
    expedition: { id: 'exp-43', number: '43', title: 'Indian Antarctic Expedition' },
    researchArea: 'Remote Sensing',
    category: 'Expedition',
    keywords: ['Voyage', 'Station', 'Antarctic', 'Logistics'],
    photographer: 'Field Media Team (sample)',
    source: 'Demo Archive',
    relatedReport: null,
    relatedDataset: null,
    relatedPublication: null,
  },
  {
    id: 'md-04',
    type: 'photo',
    title: 'Researchers preparing sampling gear',
    description:
      'Sample photograph of field scientists preparing sampling equipment. Demo content.',
    image: IMG.m4,
    thumbnail: IMG.m4,
    region: 'Arctic',
    location: 'Ny-Ålesund, Svalbard',
    year: 2025,
    added: '2025-09-22',
    expedition: { id: 'exp-arctic-12', number: 'AR-12', title: 'Arctic Atmospheric Expedition' },
    researchArea: 'Atmospheric Science',
    category: 'Science in the Field',
    keywords: ['Sampling', 'Fieldwork', 'Arctic', 'Preparations'],
    photographer: 'Field Media Team (sample)',
    source: 'Demo Archive',
    relatedReport: 'Arctic campaign log (sample)',
    relatedDataset: 'Aerosol flux sample dataset',
    relatedPublication: 'Arctic aerosol note (sample)',
  },
  {
    id: 'md-05',
    type: 'photo',
    title: 'Arctic fjord at dusk',
    description: 'Sample photograph illustrating an Arctic fjord landscape at dusk. Demo content.',
    image: IMG.m5,
    thumbnail: IMG.m5,
    region: 'Arctic',
    location: 'Kongsfjorden, Svalbard',
    year: 2025,
    added: '2025-10-04',
    expedition: { id: 'exp-arc-45', number: 'AR-45', title: 'Arctic Marine Microbiology' },
    researchArea: 'Biology',
    category: 'Polar Landscape',
    keywords: ['Fjord', 'Arctic', 'Landscape', 'Dusk'],
    photographer: 'Field Media Team (sample)',
    source: 'Demo Archive',
    relatedReport: null,
    relatedDataset: 'Kongsfjorden sampling record (sample)',
    relatedPublication: null,
  },
  {
    id: 'md-06',
    type: 'video',
    title: 'Life and science in extreme cold',
    description:
      'Sample video narrative on conducting science in extreme cold conditions. Demo content.',
    image: IMG.m6,
    thumbnail: IMG.m6,
    video: null,
    duration: '6:38',
    region: 'Antarctic',
    location: 'Dronning Maud Land',
    year: 2024,
    added: '2024-12-10',
    expedition: { id: 'exp-ice-09', number: 'IC-09', title: 'Ice Sheet Monitoring' },
    researchArea: 'Glaciology',
    category: 'Expedition',
    keywords: ['Fieldwork', 'Extreme Cold', 'Antarctic', 'Ice'],
    photographer: 'Field Media Team (sample)',
    source: 'Demo Archive',
    relatedReport: 'Mass-balance campaign log (sample)',
    relatedDataset: null,
    relatedPublication: 'Coastal glacier methods (sample)',
  },
  {
    id: 'md-07',
    type: 'photo',
    title: 'Aurora over an Arctic station',
    description:
      'Sample photograph depicting aurora activity above an Arctic research station. Demo content.',
    image: IMG.m7,
    thumbnail: IMG.m7,
    region: 'Arctic',
    location: 'Ny-Ålesund, Svalbard',
    year: 2024,
    added: '2024-03-14',
    expedition: { id: 'exp-arc-himadri', number: 'AR-09', title: 'Himadri Winter-Over' },
    researchArea: 'Atmospheric Science',
    category: 'Research Station',
    keywords: ['Aurora', 'Station', 'Arctic', 'Night'],
    photographer: 'Field Media Team (sample)',
    source: 'Demo Archive',
    relatedReport: null,
    relatedDataset: null,
    relatedPublication: null,
  },
  {
    id: 'md-08',
    type: 'video',
    title: 'Collecting environmental observations',
    description:
      'Sample video describing routine environmental observation work at a coastal polar site. Demo content.',
    image: IMG.m8,
    thumbnail: IMG.m8,
    video: null,
    duration: '3:24',
    region: 'Antarctic',
    location: 'Coastal East Antarctica',
    year: 2025,
    added: '2025-08-18',
    expedition: { id: 'exp-43', number: '43', title: 'Indian Antarctic Expedition' },
    researchArea: 'Climate Science',
    category: 'Research Activity',
    keywords: ['Observation', 'Climate', 'Antarctic', 'Monitoring'],
    photographer: 'Field Media Team (sample)',
    source: 'Demo Archive',
    relatedReport: 'Seasonal observation log (sample)',
    relatedDataset: 'Surface observations (sample)',
    relatedPublication: 'Antarctic climate note (sample)',
  },
  {
    id: 'md-09',
    type: 'photo',
    title: 'Iceberg field survey',
    description: 'Sample photograph illustrating iceberg survey operations. Demo content.',
    image: IMG.m9,
    thumbnail: IMG.m9,
    region: 'Antarctic',
    location: 'Prydz Bay, Southern Ocean',
    year: 2024,
    added: '2024-06-03',
    expedition: { id: 'exp-so-27', number: 'SO-27', title: 'Southern Ocean Mission' },
    researchArea: 'Oceanography',
    category: 'Science in the Field',
    keywords: ['Iceberg', 'Survey', 'Ocean', 'Antarctic'],
    photographer: 'Field Media Team (sample)',
    source: 'Demo Archive',
    relatedReport: null,
    relatedDataset: 'Iceberg observations (sample)',
    relatedPublication: null,
  },
  {
    id: 'md-10',
    type: 'photo',
    title: 'Glacier surface detail',
    description: 'Sample close-up photograph of a glacier surface structure. Demo content.',
    image: IMG.m10,
    thumbnail: IMG.m10,
    region: 'Antarctic',
    location: 'Dronning Maud Land',
    year: 2023,
    added: '2023-11-27',
    expedition: { id: 'exp-ice-09', number: 'IC-09', title: 'Ice Sheet Monitoring' },
    researchArea: 'Glaciology',
    category: 'Science in the Field',
    keywords: ['Glacier', 'Ice', 'Antarctic', 'Close-up'],
    photographer: 'Field Media Team (sample)',
    source: 'Demo Archive',
    relatedReport: null,
    relatedDataset: 'Ablation stake record (sample)',
    relatedPublication: null,
  },
  {
    id: 'md-11',
    type: 'photo',
    title: 'Geological survey team at work',
    description:
      'Sample photograph illustrating a geological survey team operating in an Antarctic oasis. Demo content.',
    image: IMG.m11,
    thumbnail: IMG.m11,
    region: 'Antarctic',
    location: 'Schirmacher Oasis',
    year: 2023,
    added: '2023-06-19',
    expedition: { id: 'exp-geo-02', number: 'GG-02', title: 'Antarctic Geology Survey' },
    researchArea: 'Geology',
    category: 'Research Activity',
    keywords: ['Geology', 'Survey', 'Fieldwork', 'Antarctic'],
    photographer: 'Field Media Team (sample)',
    source: 'Demo Archive',
    relatedReport: 'Geological survey log (sample)',
    relatedDataset: 'Bedrock sampling record (sample)',
    relatedPublication: 'Oasis bedrock note (sample)',
  },
  {
    id: 'md-12',
    type: 'video',
    title: 'Inside a polar research expedition',
    description:
      'Sample video narrative offering an inside look at a polar research expedition. Demo content.',
    image: IMG.m12,
    thumbnail: IMG.m12,
    video: null,
    duration: '5:47',
    region: 'Antarctic',
    location: 'Coastal East Antarctica',
    year: 2026,
    added: '2026-01-12',
    expedition: { id: 'exp-43', number: '43', title: 'Indian Antarctic Expedition' },
    researchArea: 'Climate Science',
    category: 'Expedition',
    keywords: ['Expedition', 'Inside look', 'Antarctic', 'Team'],
    photographer: 'Field Media Team (sample)',
    source: 'Demo Archive',
    relatedReport: null,
    relatedDataset: null,
    relatedPublication: null,
  },
  {
    id: 'md-13',
    type: 'photo',
    title: 'Sea-ice edge from the air',
    description: 'Sample aerial photograph of a sea-ice edge. Demo content.',
    image: IMG.m13,
    thumbnail: IMG.m13,
    region: 'Antarctic',
    location: 'Southern Ocean',
    year: 2024,
    added: '2024-09-08',
    expedition: null,
    researchArea: 'Remote Sensing',
    category: 'Polar Landscape',
    keywords: ['Sea Ice', 'Aerial', 'Remote Sensing', 'Antarctic'],
    photographer: 'Field Media Team (sample)',
    source: 'Demo Archive',
    relatedReport: null,
    relatedDataset: 'Satellite sea-ice record (sample)',
    relatedPublication: 'Satellite comparison note (sample)',
  },
  {
    id: 'md-14',
    type: 'photo',
    title: 'Station operations in winter light',
    description:
      'Sample photograph depicting polar station operations during winter light conditions. Demo content.',
    image: IMG.m14,
    thumbnail: IMG.m14,
    region: 'Arctic',
    location: 'Ny-Ålesund, Svalbard',
    year: 2024,
    added: '2024-02-22',
    expedition: { id: 'exp-arc-himadri', number: 'AR-09', title: 'Himadri Winter-Over' },
    researchArea: 'Atmospheric Science',
    category: 'Research Station',
    keywords: ['Station', 'Operations', 'Arctic', 'Winter'],
    photographer: 'Field Media Team (sample)',
    source: 'Demo Archive',
    relatedReport: 'Winter-over log (sample)',
    relatedDataset: null,
    relatedPublication: null,
  },
  {
    id: 'md-15',
    type: 'video',
    title: 'Why polar science matters',
    description: 'Sample outreach video explaining the importance of polar science. Demo content.',
    image: IMG.m15,
    thumbnail: IMG.m15,
    video: null,
    duration: '2:56',
    region: 'Both Poles',
    location: 'Programme-wide',
    year: 2025,
    added: '2025-05-30',
    expedition: null,
    researchArea: 'Climate Science',
    category: 'Outreach',
    keywords: ['Outreach', 'Education', 'Polar Science'],
    photographer: 'Outreach Media Team (sample)',
    source: 'Demo Archive',
    relatedReport: null,
    relatedDataset: null,
    relatedPublication: null,
  },
  {
    id: 'md-16',
    type: 'photo',
    title: 'Ice cave interior survey',
    description:
      'Sample photograph from inside an ice cave surveyed during a field campaign. Demo content.',
    image: IMG.m16,
    thumbnail: IMG.m16,
    region: 'Antarctic',
    location: 'Dronning Maud Land',
    year: 2023,
    added: '2023-10-05',
    expedition: { id: 'exp-ice-09', number: 'IC-09', title: 'Ice Sheet Monitoring' },
    researchArea: 'Glaciology',
    category: 'Science in the Field',
    keywords: ['Ice cave', 'Survey', 'Antarctic', 'Glaciology'],
    photographer: 'Field Media Team (sample)',
    source: 'Demo Archive',
    relatedReport: null,
    relatedDataset: null,
    relatedPublication: null,
  },
];

/* -------------------------------------------------------------------------- */
/*  Static content                                                            */
/* -------------------------------------------------------------------------- */
const STATS = [
  { label: 'Photos', value: 520, suffix: '+', icon: FiCamera },
  { label: 'Videos', value: 84, suffix: '+', icon: FiVideo },
  { label: 'Expeditions covered', value: 32, suffix: '+', icon: FiCompass },
  { label: 'Research stations', value: 15, suffix: '+', icon: FiGlobe },
];

const COLLECTIONS = [
  {
    key: 'Antarctic Expeditions',
    blurb: 'Field media from Antarctic campaigns.',
    category: 'Expedition',
    image: IMG.m1,
    icon: FiCompass,
  },
  {
    key: 'Arctic Expeditions',
    blurb: 'Field media from Arctic campaigns.',
    category: 'Expedition',
    image: IMG.m5,
    icon: FiCompass,
  },
  {
    key: 'Research Stations',
    blurb: 'Life and operations at polar stations.',
    category: 'Research Station',
    image: IMG.m7,
    icon: FiGlobe,
  },
  {
    key: 'Scientists in the Field',
    blurb: 'Researchers at work in polar conditions.',
    category: 'Science in the Field',
    image: IMG.m4,
    icon: FiUsers,
  },
  {
    key: 'Polar Landscapes',
    blurb: 'Ice, ocean and sky at the poles.',
    category: 'Polar Landscape',
    image: IMG.m13,
    icon: FiImage,
  },
  {
    key: 'Research Activities',
    blurb: 'Sampling, surveying and monitoring.',
    category: 'Research Activity',
    image: IMG.m11,
    icon: FiActivity,
  },
];

const ACTIVITIES = [
  {
    key: 'Data Collection',
    icon: FiDatabase,
    area: 'Climate Science',
    image: IMG.m8,
    blurb: 'Routine environmental observations.',
  },
  {
    key: 'Ice Sampling',
    icon: FiLayers,
    area: 'Glaciology',
    image: IMG.m10,
    blurb: 'Ice and snow sampling protocols.',
  },
  {
    key: 'Ocean Observation',
    icon: FiDroplet,
    area: 'Oceanography',
    image: IMG.m2,
    blurb: 'Sea-ice and water-column work.',
  },
  {
    key: 'Atmospheric Monitoring',
    icon: FiWind,
    area: 'Atmospheric Science',
    image: IMG.m4,
    blurb: 'Aerosol and trace-gas monitoring.',
  },
  {
    key: 'Geological Survey',
    icon: FiCompass,
    area: 'Geology',
    image: IMG.m11,
    blurb: 'Bedrock and sediment fieldwork.',
  },
  {
    key: 'Biological Research',
    icon: FiFeather,
    area: 'Biology',
    image: IMG.m5,
    blurb: 'Coastal and marine biodiversity work.',
  },
  {
    key: 'Remote Sensing',
    icon: FiGlobe,
    area: 'Remote Sensing',
    image: IMG.m13,
    blurb: 'Satellite and aerial observation.',
  },
  {
    key: 'Station Operations',
    icon: FiActivity,
    area: 'Atmospheric Science',
    image: IMG.m14,
    blurb: 'Day-to-day station operations.',
  },
];

const EXPEDITION_STORIES = [
  {
    id: 'exp-43',
    name: 'Indian Antarctic Expedition 43',
    region: 'Antarctic',
    year: 2026,
    location: 'Larsemann Hills, East Antarctica',
    story:
      'Sample expedition narrative covering a summer campaign of field observation, ice-shelf monitoring and coastal sampling. Demo content.',
    image: IMG.m1,
    photos: 42,
    videos: 6,
    areas: ['Glaciology', 'Climate Science'],
  },
  {
    id: 'exp-arctic-12',
    name: 'Arctic Atmospheric Expedition',
    region: 'Arctic',
    year: 2025,
    location: 'Ny-Ålesund, Svalbard',
    story:
      'Sample expedition narrative covering aerosol flux observations at a coastal Arctic station. Demo content.',
    image: IMG.m2,
    photos: 28,
    videos: 4,
    areas: ['Atmospheric Science'],
  },
  {
    id: 'exp-so-27',
    name: 'Southern Ocean Mission',
    region: 'Antarctic',
    year: 2024,
    location: 'Prydz Bay',
    story:
      'Sample expedition narrative covering hydrographic transects and sea-ice observations. Demo content.',
    image: IMG.m3,
    photos: 36,
    videos: 5,
    areas: ['Oceanography'],
  },
  {
    id: 'exp-ice-09',
    name: 'Ice Sheet Monitoring',
    region: 'Antarctic',
    year: 2024,
    location: 'Dronning Maud Land',
    story:
      'Sample expedition narrative covering repeated glacier surveys and mass-balance work. Demo content.',
    image: IMG.m10,
    photos: 30,
    videos: 3,
    areas: ['Glaciology', 'Climate Science'],
  },
];

const CONNECTION_CHAIN = [
  { icon: FiImage, label: 'Media', desc: 'Sample field photograph', to: '/media' },
  { icon: FiCompass, label: 'Expedition', desc: 'Expedition 43 (sample link)', to: '/expeditions' },
  { icon: FiMapPin, label: 'Location', desc: 'Larsemann Hills, East Antarctica', to: '/map' },
  {
    icon: FiDatabase,
    label: 'Dataset',
    desc: 'Coastal observations (sample)',
    to: '/knowledge/datasets',
  },
  {
    icon: FiFileText,
    label: 'Report',
    desc: 'Expedition 43 field report (sample)',
    to: '/knowledge/reports',
  },
  {
    icon: FiBookOpen,
    label: 'Publication',
    desc: 'Coastal glacier note (sample)',
    to: '/knowledge/publications',
  },
];

const REGIONS = ['All', 'Arctic', 'Antarctic', 'Both Poles'];
const YEARS = ['All', '2026', '2025', '2024', '2023', 'Older'];
const AREAS = [
  'All',
  'Climate Science',
  'Glaciology',
  'Oceanography',
  'Biology',
  'Atmospheric Science',
  'Geology',
  'Remote Sensing',
];
const CATEGORIES = [
  'All',
  'Expedition',
  'Research Station',
  'Research Activity',
  'Science in the Field',
  'Polar Landscape',
  'Outreach',
];
const SORTS = [
  { key: 'newest', label: 'Newest' },
  { key: 'oldest', label: 'Oldest' },
  { key: 'az', label: 'A–Z' },
  { key: 'relevant', label: 'Most relevant' },
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

function TypeBadge({ type }) {
  const isVideo = type === 'video';
  const Icon = isVideo ? FiVideo : FiCamera;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em]"
      style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
    >
      <Icon className="h-2.5 w-2.5" />
      {isVideo ? 'Video' : 'Photo'}
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

/* ========================================================================== */
/*  Page                                                                      */
/* ========================================================================== */
export default function Media({ dark, setDark }) {
  /* ---- state -------------------------------------------------------------- */
  const [query, setQuery] = useState('');
  const [typeTab, setTypeTab] = useState('all'); // all | photo | video
  const [region, setRegion] = useState('All');
  const [year, setYear] = useState('All');
  const [area, setArea] = useState('All');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('newest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => new Set());
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [videoItem, setVideoItem] = useState(null);

  /* body scroll lock while a modal is open */
  useEffect(() => {
    if (!lightboxItem && !videoItem) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightboxItem, videoItem]);

  /* escape closes */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setLightboxItem(null);
        setVideoItem(null);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const toggleBookmark = (id) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  /* ---- derived ------------------------------------------------------------ */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = MEDIA.filter((m) => {
      if (typeTab !== 'all' && m.type !== typeTab) return false;
      if (showSavedOnly && !bookmarks.has(m.id)) return false;
      if (region !== 'All' && m.region !== region) return false;
      if (year !== 'All') {
        if (year === 'Older' && m.year >= 2023) return false;
        if (year !== 'Older' && String(m.year) !== year) return false;
      }
      if (area !== 'All' && m.researchArea !== area) return false;
      if (category !== 'All' && m.category !== category) return false;

      if (q) {
        const hay = [
          m.title,
          m.description,
          m.location,
          m.region,
          m.researchArea,
          m.category,
          m.keywords.join(' '),
          m.expedition?.title || '',
          m.expedition?.number || '',
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
        const w = (x) => (x.expedition ? 3 : 0) + (x.video ? 1 : 0) + (bookmarks.has(x.id) ? 1 : 0);
        return w(b) - w(a);
      }
      return 0;
    });

    return list;
  }, [query, typeTab, region, year, area, category, sort, showSavedOnly, bookmarks]);

  const photos = useMemo(() => MEDIA.filter((m) => m.type === 'photo').slice(0, 9), []);
  const videos = useMemo(() => MEDIA.filter((m) => m.type === 'video'), []);
  const recentlyAdded = useMemo(
    () => [...MEDIA].sort((a, b) => b.added.localeCompare(a.added)).slice(0, 8),
    []
  );
  const featured = MEDIA[0];

  const hasFilters =
    query !== '' ||
    typeTab !== 'all' ||
    region !== 'All' ||
    year !== 'All' ||
    area !== 'All' ||
    category !== 'All' ||
    showSavedOnly;

  const activeFilterCount =
    (region !== 'All' ? 1 : 0) +
    (year !== 'All' ? 1 : 0) +
    (area !== 'All' ? 1 : 0) +
    (category !== 'All' ? 1 : 0);

  const clearFilters = () => {
    setQuery('');
    setTypeTab('all');
    setRegion('All');
    setYear('All');
    setArea('All');
    setCategory('All');
    setSort('newest');
    setShowSavedOnly(false);
  };

  const openItem = (m) => {
    if (m.type === 'video') setVideoItem(m);
    else setLightboxItem(m);
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
            alt="Antarctic coastal scene with ice and open water"
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top,
                var(--pv-media-hero-overlay) 0%,
                color-mix(in srgb, var(--pv-media-hero-overlay) 62%, transparent) 40%,
                color-mix(in srgb, var(--pv-media-hero-overlay) 22%, transparent) 100%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right,
                color-mix(in srgb, var(--pv-media-hero-overlay) 76%, transparent) 0%,
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
                style={{ color: 'var(--pv-media-hero-text-dim)' }}
              >
                <span className="h-px w-8" style={{ background: 'var(--pv-media-hero-divider)' }} />
                Polar Media Archive
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1
                className="mt-6 text-[2.1rem] font-medium leading-[1.05] tracking-[-0.035em] sm:text-[3rem] lg:text-[3.6rem]"
                style={{ color: 'var(--pv-media-hero-text)' }}
              >
                Experience polar science.
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p
                className="mt-6 max-w-xl text-[15px] leading-relaxed sm:text-[16px]"
                style={{ color: 'var(--pv-media-hero-text-dim)' }}
              >
                Explore the people, places, expeditions, discoveries and research activities that
                bring polar science to life — each image connected to the expedition and research it
                came from.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#explorer"
                  className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13.5px] font-medium transition-colors"
                  style={{
                    background: 'var(--pv-media-hero-text)',
                    color: 'var(--pv-media-hero-overlay)',
                  }}
                >
                  Explore media
                  <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
                <Link
                  to="/expeditions"
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[13.5px] font-medium backdrop-blur-sm transition-colors"
                  style={{
                    borderColor: 'color-mix(in srgb, var(--pv-media-hero-text) 25%, transparent)',
                    color: 'color-mix(in srgb, var(--pv-media-hero-text) 92%, transparent)',
                  }}
                >
                  <FiCompass className="h-3.5 w-3.5" />
                  Explore expeditions
                </Link>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div
                className="mt-14 flex flex-wrap items-center gap-3 border-t pt-6 text-[11px] font-mono uppercase tracking-[0.18em]"
                style={{
                  borderColor: 'var(--pv-media-hero-divider)',
                  color: 'color-mix(in srgb, var(--pv-media-hero-text) 55%, transparent)',
                }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <FiCamera className="h-3 w-3" /> Photo
                </span>
                <span
                  className="h-px flex-1"
                  style={{ background: 'var(--pv-media-hero-divider)' }}
                />
                <span className="inline-flex items-center gap-1.5">
                  <FiVideo className="h-3 w-3" /> Video
                </span>
                <span
                  className="h-px flex-1"
                  style={{ background: 'var(--pv-media-hero-divider)' }}
                />
                <span className="inline-flex items-center gap-1.5">
                  <FiCompass className="h-3 w-3" /> Expedition
                </span>
                <span
                  className="h-px flex-1"
                  style={{ background: 'var(--pv-media-hero-divider)' }}
                />
                <span className="inline-flex items-center gap-1.5">
                  <FiActivity className="h-3 w-3" /> Field Research
                </span>
              </div>
            </Reveal>
          </div>

          {/* stacked media composition */}
          <div className="lg:col-span-5">
            <Reveal delay={220}>
              <div className="relative mx-auto w-full max-w-[420px]">
                {/* primary image */}
                <div
                  className="relative overflow-hidden rounded-2xl border shadow-2xl"
                  style={{ borderColor: 'var(--pv-media-glass-border)' }}
                >
                  <img
                    src={IMG.featured}
                    alt="Featured polar field photograph"
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top,
                        rgba(0,0,0,0.72) 0%,
                        rgba(0,0,0,0.10) 55%,
                        transparent 100%)`,
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div
                      className="text-[10.5px] font-mono uppercase tracking-[0.16em]"
                      style={{ color: 'rgba(255,255,255,0.7)' }}
                    >
                      Antarctic · Expedition 43 · 2026
                    </div>
                    <div className="mt-2 text-[15px] font-medium leading-snug text-white">
                      Inside an Antarctic research expedition
                    </div>
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10.5px] font-medium text-white backdrop-blur-sm">
                      <FiCamera className="h-3 w-3" />
                      Photo · Glaciology
                    </div>
                  </div>
                </div>

                {/* secondary image card */}
                <div
                  className="absolute -bottom-6 -left-6 hidden w-[180px] overflow-hidden rounded-xl border shadow-xl sm:block"
                  style={{
                    borderColor: 'var(--pv-media-glass-border)',
                    background: 'var(--pv-media-chip-bg)',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <img
                    src={IMG.m3}
                    alt="Sample Arctic station media"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="px-3 py-2.5">
                    <div
                      className="text-[10px] font-mono uppercase tracking-[0.14em]"
                      style={{ color: 'rgba(255,255,255,0.55)' }}
                    >
                      Arctic · AR-12 · 2025
                    </div>
                    <div className="mt-1 text-[12px] font-medium leading-snug text-white">
                      Field observations at a coastal station
                    </div>
                  </div>
                </div>

                {/* video card */}
                <div
                  className="absolute -top-6 -right-6 hidden w-[200px] overflow-hidden rounded-xl border shadow-xl sm:block"
                  style={{
                    borderColor: 'var(--pv-media-glass-border)',
                    background: 'var(--pv-media-chip-bg)',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <div className="relative">
                    <img
                      src={IMG.m6}
                      alt="Sample polar research video thumbnail"
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#04070F]">
                        <FiPlay className="h-4 w-4" fill="currentColor" />
                      </span>
                    </div>
                    <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-mono text-white">
                      6:38
                    </span>
                  </div>
                  <div className="px-3 py-2.5">
                    <div
                      className="text-[10px] font-mono uppercase tracking-[0.14em]"
                      style={{ color: 'rgba(255,255,255,0.55)' }}
                    >
                      Antarctic · 2024
                    </div>
                    <div className="mt-1 text-[12px] font-medium leading-snug text-white">
                      Life and science in extreme cold
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
                Media at a glance
              </p>
              <p className="max-w-sm text-[11.5px] leading-relaxed text-[var(--color-text-secondary)]">
                Sample figures for demonstration — replaced by live values once the media API is
                connected.
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
      {/* FEATURED MEDIA                                                   */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div
              className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em]"
              style={{ color: AC }}
            >
              <span className="h-px w-8" style={{ background: AC }} />
              Featured story
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7">
                <button
                  type="button"
                  onClick={() => openItem(featured)}
                  className="group relative block w-full overflow-hidden rounded-xl border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                  style={{ borderColor: 'var(--color-border)' }}
                  aria-label={`Open featured media: ${featured.title}`}
                >
                  <img
                    src={IMG.featured}
                    alt="Featured media — Antarctic research field site"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top,
                        var(--pv-media-scrim) 0%,
                        rgba(0,0,0,0.10) 55%,
                        transparent 100%)`,
                    }}
                  />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <RegionBadge region="Antarctic" />
                    <TypeBadge type="photo" />
                  </div>
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[10.5px] font-mono uppercase tracking-[0.16em] text-white/70">
                        Expedition 43 · 2026
                      </div>
                      <div className="mt-1.5 text-[15px] font-medium leading-snug text-white">
                        Inside an Antarctic research expedition
                      </div>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/90 text-[#04070F] transition-transform duration-300 group-hover:scale-110">
                      <FiMaximize2 className="h-4 w-4" />
                    </span>
                  </div>
                </button>
              </div>

              <div className="lg:col-span-5">
                <h3 className="text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.8rem]">
                  Inside an Antarctic research expedition.
                </h3>

                <p className="mt-5 text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  Follow researchers as they collect observations, document environmental conditions
                  and conduct scientific activities in one of the world's most extreme environments.
                </p>

                <div
                  className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t pt-6"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  {[
                    { icon: FiCompass, k: 'Expedition', v: 'Expedition 43' },
                    { icon: FiMapPin, k: 'Location', v: 'Larsemann Hills' },
                    { icon: FiCalendar, k: 'Year', v: '2026' },
                    { icon: FiLayers, k: 'Research area', v: 'Glaciology' },
                    { icon: FiCamera, k: 'Media type', v: 'Photograph' },
                    { icon: FiUsers, k: 'Team', v: 'Field party' },
                  ].map((row) => {
                    const Icon = row.icon;
                    return (
                      <div key={row.k}>
                        <div className="flex items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                          <Icon className="h-3 w-3" />
                          {row.k}
                        </div>
                        <div className="mt-1 text-[13.5px] font-medium text-[var(--color-text-primary)]">
                          {row.v}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openItem(featured)}
                    className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold shadow-sm transition-transform hover:scale-[1.02]"
                    style={{
                      background:
                        'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
                      color: 'var(--color-accent-primary-foreground)',
                    }}
                  >
                    View story
                    <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                  <Link
                    to="/expeditions/exp-43"
                    className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent-primary)]"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <FiCompass className="h-3.5 w-3.5" />
                    Explore expedition
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
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
                  Explore the media archive
                </p>
                <h2 className="mt-3 text-[1.35rem] font-medium tracking-tight text-[var(--color-text-primary)] sm:text-[1.55rem]">
                  Search and filter polar media
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
                placeholder="Search photos, videos, expeditions, locations, research topics…"
                aria-label="Search media"
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
              <FilterGroup label="Media type" icon={FiGrid}>
                <Chip active={typeTab === 'all'} onClick={() => setTypeTab('all')}>
                  All
                </Chip>
                <Chip active={typeTab === 'photo'} onClick={() => setTypeTab('photo')}>
                  Photos
                </Chip>
                <Chip active={typeTab === 'video'} onClick={() => setTypeTab('video')}>
                  Videos
                </Chip>
              </FilterGroup>

              <FilterGroup label="Region" icon={FiGlobe}>
                {REGIONS.map((r) => (
                  <Chip key={r} active={region === r} onClick={() => setRegion(r)}>
                    {r}
                  </Chip>
                ))}
              </FilterGroup>

              <FilterGroup label="Year" icon={FiCalendar}>
                {YEARS.map((y) => (
                  <Chip key={y} active={year === y} onClick={() => setYear(y)}>
                    {y}
                  </Chip>
                ))}
              </FilterGroup>

              <FilterGroup label="Research area" icon={FiLayers}>
                {AREAS.map((a) => (
                  <Chip key={a} active={area === a} onClick={() => setArea(a)}>
                    {a}
                  </Chip>
                ))}
              </FilterGroup>

              <FilterGroup label="Context" icon={FiActivity}>
                {CATEGORIES.map((c) => (
                  <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
                    {c}
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
                <FilterGroup label="Media type" icon={FiGrid}>
                  <Chip active={typeTab === 'all'} onClick={() => setTypeTab('all')}>
                    All
                  </Chip>
                  <Chip active={typeTab === 'photo'} onClick={() => setTypeTab('photo')}>
                    Photos
                  </Chip>
                  <Chip active={typeTab === 'video'} onClick={() => setTypeTab('video')}>
                    Videos
                  </Chip>
                </FilterGroup>
                <FilterGroup label="Region" icon={FiGlobe}>
                  {REGIONS.map((r) => (
                    <Chip key={r} active={region === r} onClick={() => setRegion(r)}>
                      {r}
                    </Chip>
                  ))}
                </FilterGroup>
                <FilterGroup label="Year" icon={FiCalendar}>
                  {YEARS.map((y) => (
                    <Chip key={y} active={year === y} onClick={() => setYear(y)}>
                      {y}
                    </Chip>
                  ))}
                </FilterGroup>
                <FilterGroup label="Research area" icon={FiLayers}>
                  {AREAS.map((a) => (
                    <Chip key={a} active={area === a} onClick={() => setArea(a)}>
                      {a}
                    </Chip>
                  ))}
                </FilterGroup>
                <FilterGroup label="Context" icon={FiActivity}>
                  {CATEGORIES.map((c) => (
                    <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
                      {c}
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
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* MEDIA EXPLORER                                                   */}
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
                  Explore polar media
                </h2>
                <p className="mt-3 text-[13.5px] text-[var(--color-text-secondary)]">
                  Showing{' '}
                  <span className="font-medium text-[var(--color-text-primary)]">
                    {filtered.length}
                  </span>{' '}
                  of {MEDIA.length} media items
                </p>
              </div>

              <div
                className="inline-flex items-center gap-1 rounded-full border p-1"
                style={{ borderColor: 'var(--color-border)' }}
                role="tablist"
                aria-label="Media type"
              >
                {[
                  { k: 'all', label: 'All' },
                  { k: 'photo', label: 'Photos' },
                  { k: 'video', label: 'Videos' },
                ].map((t) => (
                  <button
                    key={t.k}
                    type="button"
                    role="tab"
                    aria-selected={typeTab === t.k}
                    onClick={() => setTypeTab(t.k)}
                    className="rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                    style={{
                      background: typeTab === t.k ? AC_SOFT : 'transparent',
                      color: typeTab === t.k ? AC : 'var(--color-text-secondary)',
                    }}
                  >
                    {t.label}
                  </button>
                ))}
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
                  <FiCamera className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-[16px] font-medium text-[var(--color-text-primary)]">
                  No media found
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
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((m, i) => (
                <Reveal key={m.id} delay={Math.min(i * 40, 200)}>
                  <MediaCard
                    media={m}
                    bookmarked={bookmarks.has(m.id)}
                    onToggleBookmark={() => toggleBookmark(m.id)}
                    onOpen={() => openItem(m)}
                  />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================================================================ */}
      {/* PHOTO GALLERY                                                    */}
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
                  Photo gallery
                </p>
                <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.75rem]">
                  Field photography from the archive.
                </h2>
              </div>
              <p className="max-w-sm text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                Click any photograph to open a large view with its metadata.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {photos.map((p, i) => {
              const spans = [
                'col-span-2 row-span-2',
                'col-span-1 row-span-1',
                'col-span-1 row-span-1',
                'col-span-1 row-span-1',
                'col-span-1 row-span-1',
                'col-span-2 row-span-1',
                'col-span-1 row-span-1',
                'col-span-1 row-span-1',
                'col-span-1 row-span-1',
              ];
              const cls = spans[i] || 'col-span-1 row-span-1';
              return (
                <Reveal key={p.id} delay={i * 50} className={cls}>
                  <button
                    type="button"
                    onClick={() => setLightboxItem(p)}
                    aria-label={`Open photograph: ${p.title}`}
                    className="group relative block h-full w-full overflow-hidden rounded-xl border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full min-h-[180px] w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(to top,
                          var(--pv-media-scrim) 0%,
                          transparent 60%)`,
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="text-[10.5px] font-mono uppercase tracking-[0.14em] text-white/70">
                        {p.region} · {p.year}
                      </div>
                      <div className="mt-1 text-[13px] font-medium leading-snug text-white line-clamp-2">
                        {p.title}
                      </div>
                    </div>
                    <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-[#04070F] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <FiMaximize2 className="h-3.5 w-3.5" />
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* VIDEO STORIES                                                    */}
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
                  Stories in motion
                </p>
                <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.75rem]">
                  Video stories from the field.
                </h2>
              </div>
              <p className="max-w-sm text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                Sample narratives for the PolarVerse media repository.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {videos.map((v, i) => (
              <Reveal key={v.id} delay={i * 70}>
                <button
                  type="button"
                  onClick={() => setVideoItem(v)}
                  aria-label={`Open video: ${v.title}`}
                  className="group block w-full overflow-hidden rounded-xl border text-left transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                  style={{
                    borderColor: 'var(--color-border)',
                    background: 'var(--color-bg-secondary)',
                  }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={v.thumbnail}
                      alt={v.title}
                      className="aspect-[16/9] w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors duration-300 group-hover:bg-black/40">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-[#04070F] shadow-xl transition-transform duration-300 group-hover:scale-110">
                        <FiPlay className="h-5 w-5" fill="currentColor" />
                      </span>
                    </div>
                    {v.duration && (
                      <span className="absolute bottom-3 right-3 rounded bg-black/75 px-2 py-0.5 text-[11px] font-mono text-white">
                        {v.duration}
                      </span>
                    )}
                    <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                      <RegionBadge region={v.region} />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                      {v.year} · {v.location}
                    </div>
                    <h3 className="mt-2 text-[15px] font-medium leading-snug text-[var(--color-text-primary)]">
                      {v.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                      {v.description}
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* COLLECTIONS                                                      */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="max-w-xl">
              <p
                className="text-[11px] font-medium uppercase tracking-[0.22em]"
                style={{ color: AC }}
              >
                Collections
              </p>
              <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.75rem]">
                Explore media collections.
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COLLECTIONS.map((c, i) => {
              const count = MEDIA.filter((m) => m.category === c.category).length;
              const active = category === c.category;
              const Icon = c.icon;
              return (
                <Reveal key={c.key} delay={i * 60}>
                  <button
                    type="button"
                    onClick={() => {
                      setCategory(active ? 'All' : c.category);
                      document
                        .getElementById('explorer')
                        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    aria-pressed={active}
                    className="group relative block h-full w-full overflow-hidden rounded-xl border text-left transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                    style={{
                      borderColor: active ? AC : 'var(--color-border)',
                      background: 'var(--color-bg-secondary)',
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={c.image}
                        alt={`${c.key} collection`}
                        className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(to top,
                            var(--pv-media-scrim) 0%,
                            transparent 60%)`,
                        }}
                      />
                      <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 text-[#04070F]">
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-[15px] font-medium leading-snug text-[var(--color-text-primary)]">
                        {c.key}
                      </h3>
                      <p className="mt-1.5 text-[12.5px] leading-snug text-[var(--color-text-secondary)]">
                        {c.blurb}
                      </p>
                      <div className="mt-3 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                        {count} {count === 1 ? 'item' : 'items'}
                      </div>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* EXPEDITION STORIES                                               */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="max-w-xl">
              <p
                className="text-[11px] font-medium uppercase tracking-[0.22em]"
                style={{ color: AC }}
              >
                Expeditions through the lens
              </p>
              <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.75rem]">
                Stories behind the media.
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {EXPEDITION_STORIES.map((e, i) => (
              <Reveal key={e.id} delay={i * 70}>
                <div
                  className="group flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1"
                  style={{
                    borderColor: 'var(--color-border)',
                    background: 'var(--color-bg-secondary)',
                  }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={e.image}
                      alt={`${e.name} field photograph`}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to top,
                          var(--pv-media-scrim) 0%,
                          transparent 55%)`,
                      }}
                    />
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <RegionBadge region={e.region} />
                    </div>
                    <div className="absolute inset-x-4 bottom-4">
                      <div className="text-[10.5px] font-mono uppercase tracking-[0.16em] text-white/75">
                        {e.year} · {e.location}
                      </div>
                      <h3 className="mt-1.5 text-[15px] font-medium leading-snug text-white">
                        {e.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="line-clamp-3 text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
                      {e.story}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {e.areas.map((a) => (
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
                      className="mt-5 flex items-center justify-between border-t pt-4 text-[11.5px] text-[var(--color-text-secondary)]"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <FiCamera className="h-3 w-3" /> {e.photos} photos
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <FiVideo className="h-3 w-3" /> {e.videos} videos
                      </span>
                    </div>

                    <Link
                      to={`/expeditions/${e.id}`}
                      className="group mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent-primary)]"
                    >
                      Explore expedition
                      <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
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
                Every image tells a research story.
              </h2>
              <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
                A photograph is not an isolated frame. It links back to the expedition that produced
                it, the location it was taken at, and the datasets, reports and publications that
                grew from the work shown.
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
      {/* RESEARCH ACTIVITIES                                              */}
      {/* ================================================================ */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="max-w-xl">
              <p
                className="text-[11px] font-medium uppercase tracking-[0.22em]"
                style={{ color: AC }}
              >
                Science in the field
              </p>
              <h2 className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-[1.75rem]">
                Research activities behind the archive.
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ACTIVITIES.map((a, i) => {
              const Icon = a.icon;
              const count = MEDIA.filter((m) => m.researchArea === a.area).length;
              const active = area === a.area;
              return (
                <Reveal key={a.key} delay={i * 55}>
                  <button
                    type="button"
                    onClick={() => {
                      setArea(active ? 'All' : a.area);
                      document
                        .getElementById('explorer')
                        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    aria-pressed={active}
                    className="group relative block h-full w-full overflow-hidden rounded-xl border text-left transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                    style={{
                      borderColor: active ? AC : 'var(--color-border)',
                      background: 'var(--color-bg-secondary)',
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={a.image}
                        alt={`${a.key} field activity`}
                        className="aspect-[16/9] w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(to top,
                            var(--pv-media-scrim) 0%,
                            transparent 60%)`,
                        }}
                      />
                      <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 text-[#04070F]">
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="text-[14px] font-medium text-[var(--color-text-primary)]">
                        {a.key}
                      </div>
                      <div className="mt-1 text-[12px] leading-snug text-[var(--color-text-secondary)]">
                        {a.blurb}
                      </div>
                      <div className="mt-3 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                        {count} {count === 1 ? 'item' : 'items'}
                      </div>
                    </div>
                  </button>
                </Reveal>
              );
            })}
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
                  Recently added
                </h2>
              </div>
              <Link
                to="/media"
                className="group inline-flex items-center gap-2 text-[13px] font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent-primary)]"
              >
                View all media
                <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>

          <ul className="mt-10 divide-y border-y" style={{ borderColor: 'var(--color-border)' }}>
            {recentlyAdded.map((m, i) => (
              <Reveal key={m.id} delay={i * 50}>
                <li>
                  <button
                    type="button"
                    onClick={() => openItem(m)}
                    className="group grid w-full grid-cols-1 items-center gap-5 py-5 text-left transition-colors hover:bg-[var(--color-bg-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] sm:grid-cols-[80px_1fr_auto]"
                  >
                    <div className="relative overflow-hidden rounded-md">
                      <img
                        src={m.thumbnail}
                        alt={m.title}
                        className="aspect-square w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                      {m.type === 'video' && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                          <FiPlay className="h-4 w-4 text-white" fill="currentColor" />
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <RegionBadge region={m.region} />
                        <TypeBadge type={m.type} />
                      </div>
                      <h3 className="mt-3 text-[15px] font-medium leading-snug tracking-tight text-[var(--color-text-primary)]">
                        {m.title}
                      </h3>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-[var(--color-text-secondary)]">
                        <span className="inline-flex items-center gap-1.5">
                          <FiMapPin className="h-3 w-3" />
                          {m.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <FiCalendar className="h-3 w-3" />
                          {m.year}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <FiClock className="h-3 w-3" />
                          Added {m.added}
                        </span>
                      </div>
                    </div>

                    <span
                      className="hidden items-center gap-1 text-[12.5px] font-medium transition-transform duration-300 group-hover:translate-x-0.5 sm:inline-flex"
                      style={{ color: AC }}
                    >
                      Open
                      <FiArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </button>
                </li>
              </Reveal>
            ))}
          </ul>
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
              background: 'color-mix(in srgb, var(--pv-media-hero-overlay) 78%, transparent)',
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="max-w-2xl">
            <Reveal>
              <h2
                className="text-[1.9rem] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[2.5rem]"
                style={{ color: 'var(--pv-media-hero-text)' }}
              >
                See the science. Discover the story.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p
                className="mt-6 max-w-lg text-[15px] leading-relaxed"
                style={{ color: 'var(--pv-media-hero-text-dim)' }}
              >
                Explore expeditions, research, datasets, publications and the people behind polar
                science — all connected through one platform.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  to="/expeditions"
                  className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13.5px] font-medium transition-colors"
                  style={{
                    background: 'var(--pv-media-hero-text)',
                    color: 'var(--pv-media-hero-overlay)',
                  }}
                >
                  Explore expeditions
                  <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/knowledge/publications"
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[13.5px] font-medium backdrop-blur-sm transition-colors"
                  style={{
                    borderColor: 'color-mix(in srgb, var(--pv-media-hero-text) 25%, transparent)',
                    color: 'color-mix(in srgb, var(--pv-media-hero-text) 92%, transparent)',
                  }}
                >
                  <FiBookOpen className="h-3.5 w-3.5" />
                  Explore publications
                </Link>
                <Link
                  to="/knowledge/datasets"
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[13.5px] font-medium backdrop-blur-sm transition-colors"
                  style={{
                    borderColor: 'color-mix(in srgb, var(--pv-media-hero-text) 25%, transparent)',
                    color: 'color-mix(in srgb, var(--pv-media-hero-text) 92%, transparent)',
                  }}
                >
                  <FiDatabase className="h-3.5 w-3.5" />
                  Explore datasets
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* LIGHTBOX MODAL                                                   */}
      {/* ================================================================ */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          className="pv-media-modal-backdrop fixed inset-0 z-[80] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.82)' }}
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="pv-media-modal-panel relative w-full max-w-5xl overflow-hidden rounded-2xl border"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-primary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxItem(null)}
              aria-label="Close lightbox"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <FiX className="h-4 w-4" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  className="h-full max-h-[70vh] w-full object-cover"
                />
              </div>
              <div className="overflow-y-auto p-6 lg:col-span-2 lg:max-h-[70vh]">
                <div className="flex flex-wrap gap-2">
                  <RegionBadge region={lightboxItem.region} />
                  <TypeBadge type={lightboxItem.type} />
                </div>
                <h3 className="mt-4 text-[18px] font-medium leading-snug text-[var(--color-text-primary)]">
                  {lightboxItem.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  {lightboxItem.description}
                </p>

                <dl
                  className="mt-6 space-y-3 border-t pt-5"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  {[
                    { k: 'Location', v: lightboxItem.location, icon: FiMapPin },
                    { k: 'Year', v: lightboxItem.year, icon: FiCalendar },
                    { k: 'Research area', v: lightboxItem.researchArea, icon: FiLayers },
                    { k: 'Context', v: lightboxItem.category, icon: FiActivity },
                    { k: 'Photographer', v: lightboxItem.photographer, icon: FiUsers },
                    {
                      k: 'Expedition',
                      v: lightboxItem.expedition
                        ? `Exp. ${lightboxItem.expedition.number} · ${lightboxItem.expedition.title}`
                        : 'Programme-wide',
                      icon: FiCompass,
                    },
                  ].map((row) => {
                    const Icon = row.icon;
                    return (
                      <div key={row.k} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                          style={{ background: AC_SOFT, color: AC }}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <div className="min-w-0">
                          <div className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                            {row.k}
                          </div>
                          <div className="mt-0.5 text-[13px] font-medium text-[var(--color-text-primary)]">
                            {row.v}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </dl>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {lightboxItem.keywords.map((k) => (
                    <span
                      key={k}
                      className="rounded-full border px-2 py-0.5 text-[10.5px] text-[var(--color-text-secondary)]"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      #{k}
                    </span>
                  ))}
                </div>

                <p className="mt-6 text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
                  Demo content — media detail pages will connect to the PolarVerse media repository.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* VIDEO MODAL                                                      */}
      {/* ================================================================ */}
      {videoItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={videoItem.title}
          className="pv-media-modal-backdrop fixed inset-0 z-[80] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.82)' }}
          onClick={() => setVideoItem(null)}
        >
          <div
            className="pv-media-modal-panel relative w-full max-w-4xl overflow-hidden rounded-2xl border"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-primary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setVideoItem(null)}
              aria-label="Close video preview"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <FiX className="h-4 w-4" />
            </button>

            <div className="relative">
              <img
                src={videoItem.thumbnail}
                alt={videoItem.title}
                className="aspect-video w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/55">
                <div className="flex flex-col items-center gap-3 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-[#04070F] shadow-2xl">
                    <FiPlay className="h-6 w-6" fill="currentColor" />
                  </span>
                  <p className="max-w-xs text-[12.5px] font-medium text-white/90">
                    Video preview will connect to the PolarVerse media repository.
                  </p>
                </div>
              </div>
              {videoItem.duration && (
                <span className="absolute bottom-3 right-3 rounded bg-black/75 px-2 py-1 text-[11px] font-mono text-white">
                  {videoItem.duration}
                </span>
              )}
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                <RegionBadge region={videoItem.region} />
                <TypeBadge type="video" />
              </div>
              <h3 className="mt-4 text-[18px] font-medium leading-snug text-[var(--color-text-primary)]">
                {videoItem.title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
                {videoItem.description}
              </p>

              <div
                className="mt-6 grid grid-cols-2 gap-4 border-t pt-5 sm:grid-cols-4"
                style={{ borderColor: 'var(--color-border)' }}
              >
                {[
                  {
                    k: 'Expedition',
                    v: videoItem.expedition ? `Exp. ${videoItem.expedition.number}` : '—',
                  },
                  { k: 'Location', v: videoItem.location },
                  { k: 'Year', v: videoItem.year },
                  { k: 'Research', v: videoItem.researchArea },
                ].map((row) => (
                  <div key={row.k}>
                    <div className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                      {row.k}
                    </div>
                    <div className="mt-1 text-[13px] font-medium text-[var(--color-text-primary)]">
                      {row.v}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/ai"
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12.5px] font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent-primary)]"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <FiCpu className="h-3.5 w-3.5" style={{ color: AC }} />
                  Understand this expedition
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ========================================================================== */
/*  Sub-views                                                                 */
/* ========================================================================== */

function MediaCard({ media: m, bookmarked, onToggleBookmark, onOpen }) {
  const isVideo = m.type === 'video';
  return (
    <div
      className="group flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1"
      style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-secondary)' }}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${isVideo ? 'video' : 'photograph'}: ${m.title}`}
        className="relative block overflow-hidden text-left focus-visible:outline-none"
      >
        <img
          src={m.thumbnail}
          alt={m.title}
          className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top,
              var(--pv-media-image-overlay) 0%,
              transparent 45%,
              transparent 100%)`,
          }}
        />

        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#04070F] shadow-lg transition-transform duration-300 group-hover:scale-110">
              <FiPlay className="h-4 w-4" fill="currentColor" />
            </span>
          </div>
        )}

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <RegionBadge region={m.region} />
        </div>

        <div className="absolute right-3 top-3" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleBookmark();
            }}
            aria-pressed={bookmarked}
            aria-label={bookmarked ? 'Remove bookmark' : 'Save media'}
            title={bookmarked ? 'Remove bookmark' : 'Save media'}
            className="flex h-8 w-8 items-center justify-center rounded-lg border backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
            style={{
              borderColor: bookmarked ? AC : 'rgba(255,255,255,0.35)',
              background: bookmarked ? AC_SOFT : 'rgba(0,0,0,0.45)',
              color: bookmarked ? AC : '#ffffff',
            }}
          >
            <FiBookmark className="h-3.5 w-3.5" fill={bookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {isVideo && m.duration && (
          <span className="absolute bottom-3 right-3 rounded bg-black/75 px-1.5 py-0.5 text-[10.5px] font-mono text-white">
            {m.duration}
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <TypeBadge type={m.type} />
          <span className="text-[11px] font-mono text-[var(--color-text-secondary)]">{m.year}</span>
        </div>

        <h3 className="mt-3 text-[15px] font-medium leading-snug tracking-tight text-[var(--color-text-primary)]">
          {m.title}
        </h3>

        <p className="mt-1.5 text-[12.5px] leading-snug text-[var(--color-text-secondary)]">
          <FiMapPin className="mr-1 inline h-3 w-3 -translate-y-[1px]" />
          {m.location}
        </p>

        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
          {m.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <span
            className="rounded-full border px-2 py-0.5 text-[10.5px] font-medium text-[var(--color-text-secondary)]"
            style={{ borderColor: 'var(--color-border)' }}
          >
            {m.researchArea}
          </span>
          <span
            className="rounded-full border px-2 py-0.5 text-[10.5px] font-medium text-[var(--color-text-secondary)]"
            style={{ borderColor: 'var(--color-border)' }}
          >
            {m.category}
          </span>
        </div>

        {m.expedition && (
          <Link
            to={`/expeditions/${m.expedition.id}`}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border p-2.5 text-[11.5px] transition-colors hover:border-[var(--color-accent-primary)]"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-primary)' }}
          >
            <FiCompass className="h-3.5 w-3.5" style={{ color: AC }} />
            <span className="truncate font-medium text-[var(--color-text-primary)]">
              Exp. {m.expedition.number} · {m.expedition.title}
            </span>
          </Link>
        )}

        <div
          className="mt-4 flex items-center justify-between border-t pt-4 text-[11.5px] text-[var(--color-text-secondary)]"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <span className="inline-flex items-center gap-1.5">
            <FiCamera className="h-3 w-3" />
            {isVideo ? 'Video' : 'Photo'}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FiClock className="h-3 w-3" />
            Added {m.added}
          </span>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium transition-transform duration-300 group-hover:translate-x-0.5 focus-visible:outline-none"
            style={{ color: AC }}
          >
            {isVideo ? 'Play video' : 'View photo'}
            <FiArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
