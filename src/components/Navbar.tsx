// NAVBAR
// ============================================================
import React, { useState, useEffect } from 'react';
import { Home, Info, Wrench, Briefcase, FileText, Mail, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
 
const navItems = [
  { name: 'Home', icon: Home, id: 'home' },
  { name: 'About', icon: Info, id: 'about' },
  { name: 'Skills', icon: Wrench, id: 'skills' },
  { name: 'Projects', icon: Briefcase, id: 'projects' },
  { name: 'Blogs', icon: FileText, id: 'blogs' },
  { name: 'Contact', icon: Mail, id: 'contact' },
];
 
export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
 
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 140 && r.bottom > 80) { setActiveSection(item.id); break; }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
 
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
      setActiveSection(id);
      setMobileOpen(false);
    }
  };
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
        .nav-link { cursor: pointer; background: none; border: none; outline: none; font-family: 'Syne', sans-serif; }
        .nav-link:focus-visible { outline: 2px solid #c8a96e; outline-offset: 2px; border-radius: 2px; }
      `}</style>
 
      {/* ── Desktop Navbar ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: '64px',
        background: scrolled ? 'rgba(5,7,13,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(200,169,110,0.15)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto', padding: '0 32px',
          height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="nav-link"
            onClick={() => scrollTo('home')}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '6px 0',
            }}
          >
            <div style={{
              width: '30px', height: '30px', borderRadius: '4px',
              background: 'linear-gradient(135deg, #c8a96e, #e8c988)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Syne', sans-serif", fontSize: '13px', fontWeight: 800,
              color: '#05070d',
            }}>E</div>
            <span style={{
              fontFamily: "'Syne', sans-serif", fontSize: '15px', fontWeight: 700,
              color: '#f0ede8', letterSpacing: '0.04em',
            }}>Ezekiel<span style={{ color: '#c8a96e' }}>.</span></span>
          </motion.button>
 
          {/* Desktop links */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            className="desktop-nav"
          >
            <style>{`.desktop-nav { display: flex; } @media(max-width:768px){.desktop-nav{display:none!important;}}`}</style>
            {navItems.map((item) => {
              const active = activeSection === item.id;
              const isHov = hovered === item.id;
              return (
                <button
                  key={item.id}
                  className="nav-link"
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => scrollTo(item.id)}
                  style={{
                    padding: '8px 16px', borderRadius: '2px',
                    color: active ? '#c8a96e' : isHov ? '#f0ede8' : '#5a5560',
                    fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    background: active ? 'rgba(200,169,110,0.08)' : isHov ? 'rgba(240,237,232,0.04)' : 'transparent',
                    borderBottom: active ? '1px solid #c8a96e' : '1px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                >{item.name}</button>
              );
            })}
          </motion.div>
 
          {/* Mobile menu button */}
          <button
            className="nav-link mobile-menu-btn"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
            style={{ color: '#f0ede8', padding: '8px', display: 'none' }}
          >
            <style>{`.mobile-menu-btn{display:none!important;} @media(max-width:768px){.mobile-menu-btn{display:flex!important;}}`}</style>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
 
      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', top: '64px', left: 0, right: 0,
              background: 'rgba(5,7,13,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(200,169,110,0.15)',
              zIndex: 999, padding: '16px 24px 24px',
            }}
          >
            {navItems.map((item, i) => {
              const Icon = item.icon;
              const active = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="nav-link"
                  onClick={() => scrollTo(item.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    gap: '14px', padding: '14px 16px', borderRadius: '4px',
                    color: active ? '#c8a96e' : '#8a8878',
                    background: active ? 'rgba(200,169,110,0.08)' : 'transparent',
                    fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em',
                    textTransform: 'uppercase', marginBottom: '4px',
                    textAlign: 'left',
                  }}
                >
                  <Icon size={16} />
                  {item.name}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
 