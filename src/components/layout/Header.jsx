import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  FiChevronDown,
  FiMenu,
  FiX,
  FiSearch,
  FiSun,
  FiMoon,
  FiCompass,
  FiFileText,
  FiDatabase,
  FiBookOpen,
  FiFilm,
  FiMap,
  FiShare2,
  FiClock,
  FiBook,
  FiFeather,
  FiCpu,
  FiLogIn,
} from 'react-icons/fi';
import { GiSnowflake1 } from 'react-icons/gi';

/* -------------------------------------------------------------------------- */
/*  Navigation architecture                                                   */
/* -------------------------------------------------------------------------- */

const NAV = {
  explore: {
    label: 'Explore',
    panelClass: 'w-[520px] grid-cols-2',
    items: [
      {
        icon: FiCompass,
        title: 'Expeditions',
        desc: 'Discover polar expeditions',
        to: '/expeditions',
      },
      {
        icon: FiFileText,
        title: 'Reports',
        desc: 'Explore expedition reports',
        to: '/reports',
      },
      {
        icon: FiDatabase,
        title: 'Datasets',
        desc: 'Access scientific datasets',
        to: '/datasets',
      },
      {
        icon: FiBookOpen,
        title: 'Publications',
        desc: 'Explore research publications',
        to: '/publications',
      },
      { icon: FiFilm, title: 'Media', desc: 'Photos and videos from the field', to: '/media' },
    ],
  },
  discover: {
    label: 'Discover',
    panelClass: 'w-[380px] grid-cols-1',
    items: [
      {
        icon: FiMap,
        title: 'Polar Map',
        desc: 'Explore research locations and expeditions',
        to: '/map',
      },
      {
        icon: FiShare2,
        title: 'Knowledge Connections',
        desc: 'Discover relationships between research resources',
        to: '/connections',
      },
      {
        icon: FiClock,
        title: 'Expedition Timeline',
        desc: "Explore India's polar research journey",
        to: '/timeline',
      },
    ],
  },
  learn: {
    label: 'Learn',
    panelClass: 'w-[340px] grid-cols-1',
    items: [
      {
        icon: FiBook,
        title: 'Student Mode',
        desc: 'Understand polar science through simple explanations',
        to: '/learn',
      },
      {
        icon: FiFeather,
        title: 'Research Stories',
        desc: 'Follow the journey from question to discovery',
        to: '/research-stories',
      },
    ],
  },
};

const AC = 'var(--color-accent-primary)';
const AC_SOFT = 'color-mix(in srgb, var(--color-accent-primary) 12%, transparent)';
const AC_SOFT_HOVER = 'color-mix(in srgb, var(--color-accent-primary) 16%, transparent)';

/* -------------------------------------------------------------------------- */

export default function Header({ dark, setDark }) {
  const location = useLocation();
  const headerRef = useRef(null);
  const closeTimer = useRef(null);

  const [openMenu, setOpenMenu] = useState(null); // 'explore' | 'discover' | 'learn'
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null); // 'explore' | 'discover' | 'learn'

  /* Close everything when route changes */
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, [location.pathname]);

  /* Escape closes */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  /* Outside click closes */
  useEffect(() => {
    const onClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  /* Lock body scroll while mobile panel is open */
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  /* Cleanup pending close timer on unmount */
  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    []
  );

  const groupIsActive = (items) =>
    items.some((it) => location.pathname === it.to || location.pathname.startsWith(it.to + '/'));

  /* ---------------- Dropdown open/close helpers (hover + click) ----------- */
  const handleEnter = (key) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenMenu(key);
  };

  const handleLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpenMenu(null);
      closeTimer.current = null;
    }, 140);
  };

  const handleClick = (key) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenMenu((cur) => (cur === key ? null : key));
  };

  const toggleMobileSection = (key) => setMobileSection((cur) => (cur === key ? null : key));

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b backdrop-blur-xl"
      style={{
        background: 'color-mix(in srgb, var(--color-bg-primary) 88%, transparent)',
        borderColor: 'var(--color-border)',
      }}
    >
      <style>{`
        @keyframes pv-drop-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pv-drop-in { animation: pv-drop-in 150ms cubic-bezier(.2,.8,.2,1); }
      `}</style>

      {/* ------------------------------------------------------------------ */}
      {/* Top bar                                                            */}
      {/* ------------------------------------------------------------------ */}
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6">
        {/* LOGO — left */}
        <Link
          to="/"
          aria-label="PolarVerse — go to homepage"
          className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)]"
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg shadow-sm transition-transform duration-300 hover:scale-[1.06]"
            style={{
              background:
                'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
              color: 'var(--color-accent-primary-foreground)',
            }}
          >
            <GiSnowflake1 className="h-[18px] w-[18px]" />
          </span>
          <span className="text-[16px] font-semibold tracking-tight text-[var(--color-text-primary)]">
            Polar
            <span style={{ color: AC }}>Verse</span>
          </span>
        </Link>

        {/* DESKTOP — everything on the right */}
        <div className="ml-auto hidden items-center gap-8 lg:flex">
          <nav className="flex items-center gap-0.5" aria-label="Primary">
            {Object.entries(NAV).map(([key, group]) => {
              const open = openMenu === key;
              const active = groupIsActive(group.items);

              return (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => handleEnter(key)}
                  onMouseLeave={handleLeave}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={open}
                    aria-controls={`pv-panel-${key}`}
                    onClick={() => handleClick(key)}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                    style={{
                      color: open || active ? AC : 'var(--color-text-primary)',
                      background: open ? AC_SOFT : 'transparent',
                    }}
                  >
                    {group.label}
                    <FiChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {open && (
                    <div
                      id={`pv-panel-${key}`}
                      className={`pv-drop-in absolute right-0 top-full mt-2 grid gap-1 rounded-xl border p-3 ${group.panelClass}`}
                      style={{
                        background: 'var(--color-bg-primary)',
                        borderColor: 'var(--color-border)',
                        boxShadow:
                          '0 24px 60px -25px rgba(0,0,0,0.22), 0 8px 24px -14px rgba(0,0,0,0.14)',
                      }}
                    >
                      {group.items.map((it) => {
                        const Icon = it.icon;
                        return (
                          <NavLink
                            key={it.to}
                            to={it.to}
                            onClick={() => setOpenMenu(null)}
                            className={({ isActive }) =>
                              `group flex items-start gap-3 rounded-lg p-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] ${
                                isActive ? '' : 'hover:bg-[var(--color-bg-secondary)]'
                              }`
                            }
                            style={({ isActive }) =>
                              isActive ? { background: AC_SOFT } : undefined
                            }
                          >
                            {({ isActive }) => (
                              <>
                                <span
                                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors"
                                  style={{
                                    borderColor: isActive ? AC : 'var(--color-border)',
                                    background: isActive
                                      ? AC_SOFT_HOVER
                                      : 'var(--color-bg-secondary)',
                                    color: isActive ? AC : 'var(--color-text-primary)',
                                  }}
                                >
                                  <Icon className="h-[17px] w-[17px]" />
                                </span>
                                <span className="min-w-0">
                                  <span
                                    className="block text-[13.5px] font-medium leading-tight"
                                    style={{
                                      color: isActive ? AC : 'var(--color-text-primary)',
                                    }}
                                  >
                                    {it.title}
                                  </span>
                                  <span className="mt-1 block text-[12px] leading-snug text-[var(--color-text-secondary)]">
                                    {it.desc}
                                  </span>
                                </span>
                              </>
                            )}
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* AI STUDIO */}
            <NavLink
              to="/ai"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
              style={({ isActive }) => ({
                color: isActive ? AC : 'var(--color-text-primary)',
                background: isActive ? AC_SOFT : 'transparent',
              })}
            >
              <FiCpu className="h-4 w-4" />
              AI Studio
            </NavLink>
          </nav>

          <span
            className="mx-1.5 h-5 w-px"
            style={{ background: 'var(--color-border)' }}
            aria-hidden="true"
          />

          <NavLink
            to="/search"
            aria-label="Search"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[13.5px] font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
            style={({ isActive }) => (isActive ? { color: AC, background: AC_SOFT } : undefined)}
          >
            <FiSearch className="h-[17px] w-[17px]" />
            <span>Search</span>
          </NavLink>

          <button
            type="button"
            onClick={() => setDark(!dark)}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            title={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="flex h-9 w-9 items-center justify-center rounded-lg border text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
            style={{ borderColor: 'var(--color-border)' }}
          >
            {dark ? (
              <FiMoon className="h-[17px] w-[17px]" />
            ) : (
              <FiSun className="h-[17px] w-[17px]" />
            )}
          </button>

          <NavLink
            to="/login"
            className="ml-1 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[13.5px] font-semibold shadow-sm transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)] focus-visible:ring-[var(--color-accent-primary)]"
            style={{
              background:
                'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
              color: 'var(--color-accent-primary-foreground)',
            }}
          >
            <FiLogIn className="h-[15px] w-[15px]" />
            Login
          </NavLink>
        </div>

        {/* MOBILE right side — theme + menu */}
        <div className="ml-auto flex items-center gap-1.5 lg:hidden">
          <button
            type="button"
            onClick={() => setDark(!dark)}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="flex h-9 w-9 items-center justify-center rounded-lg border text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
            style={{ borderColor: 'var(--color-border)' }}
          >
            {dark ? (
              <FiMoon className="h-[17px] w-[17px]" />
            ) : (
              <FiSun className="h-[17px] w-[17px]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
            aria-controls="pv-mobile-nav"
            className="flex h-9 w-9 items-center justify-center rounded-lg border text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-bg-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
            style={{ borderColor: 'var(--color-border)' }}
          >
            {mobileOpen ? (
              <FiX className="h-[18px] w-[18px]" />
            ) : (
              <FiMenu className="h-[18px] w-[18px]" />
            )}
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Mobile navigation panel                                            */}
      {/* ------------------------------------------------------------------ */}
      {mobileOpen && (
        <div
          id="pv-mobile-nav"
          className="pv-drop-in border-t lg:hidden"
          style={{
            borderColor: 'var(--color-border)',
            background: 'var(--color-bg-primary)',
          }}
        >
          <nav
            className="mx-auto max-h-[calc(100svh-4rem)] max-w-7xl overflow-y-auto px-4 pb-8 pt-2 sm:px-6"
            aria-label="Mobile primary"
          >
            {Object.entries(NAV).map(([key, group]) => {
              const open = mobileSection === key;
              return (
                <div key={key} className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                  <button
                    type="button"
                    onClick={() => toggleMobileSection(key)}
                    aria-expanded={open}
                    aria-controls={`pv-mobile-${key}`}
                    className="flex w-full items-center justify-between py-4 text-left text-[14.5px] font-medium text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                  >
                    {group.label}
                    <FiChevronDown
                      className={`h-4 w-4 text-[var(--color-text-secondary)] transition-transform duration-200 ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {open && (
                    <div id={`pv-mobile-${key}`} className="pb-3">
                      {group.items.map((it) => {
                        const Icon = it.icon;
                        return (
                          <NavLink
                            key={it.to}
                            to={it.to}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) =>
                              `flex items-start gap-3 rounded-lg p-3 transition-colors ${
                                isActive ? '' : 'hover:bg-[var(--color-bg-secondary)]'
                              }`
                            }
                            style={({ isActive }) =>
                              isActive ? { background: AC_SOFT } : undefined
                            }
                          >
                            {({ isActive }) => (
                              <>
                                <span
                                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
                                  style={{
                                    borderColor: isActive ? AC : 'var(--color-border)',
                                    background: isActive
                                      ? AC_SOFT_HOVER
                                      : 'var(--color-bg-secondary)',
                                    color: isActive ? AC : 'var(--color-text-primary)',
                                  }}
                                >
                                  <Icon className="h-[17px] w-[17px]" />
                                </span>
                                <span className="min-w-0">
                                  <span
                                    className="block text-[13.5px] font-medium"
                                    style={{
                                      color: isActive ? AC : 'var(--color-text-primary)',
                                    }}
                                  >
                                    {it.title}
                                  </span>
                                  <span className="mt-0.5 block text-[12px] leading-snug text-[var(--color-text-secondary)]">
                                    {it.desc}
                                  </span>
                                </span>
                              </>
                            )}
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <NavLink
              to="/ai"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 border-b py-4 text-[14.5px] font-medium focus-visible:outline-none"
              style={({ isActive }) => ({
                borderColor: 'var(--color-border)',
                color: isActive ? AC : 'var(--color-text-primary)',
              })}
            >
              <FiCpu className="h-[18px] w-[18px]" style={{ color: AC }} />
              AI Studio
            </NavLink>

            <NavLink
              to="/search"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 border-b py-4 text-[14.5px] font-medium focus-visible:outline-none"
              style={({ isActive }) => ({
                borderColor: 'var(--color-border)',
                color: isActive ? AC : 'var(--color-text-primary)',
              })}
            >
              <FiSearch className="h-[18px] w-[18px] text-[var(--color-text-secondary)]" />
              Search
            </NavLink>

            <div className="mt-6 flex items-center gap-3">
              <NavLink
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-[14px] font-semibold"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
                  color: 'var(--color-accent-primary-foreground)',
                }}
              >
                <FiLogIn className="h-4 w-4" />
                Login
              </NavLink>

              <NavLink
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="flex flex-1 items-center justify-center rounded-lg border px-4 py-3 text-[14px] font-medium text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-bg-secondary)]"
                style={{ borderColor: 'var(--color-border)' }}
              >
                Register
              </NavLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
