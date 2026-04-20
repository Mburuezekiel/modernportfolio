import React, { useState, useRef, useEffect } from 'react';
import { Code, Coffee, Globe, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

// Free Unsplash portrait placeholder (replace with ME import when using locally)
const ME = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80";

// ── Scroll reveal hook ────────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Expertise card ────────────────────────────────────────────────────────────
interface CardProps {
  icon: React.ElementType;
  title: string;
  text: string;
  accent: string;
  delay: number;
  visible: boolean;
}

function ExpertiseCard({ icon: Icon, title, text, accent, delay, visible }: CardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        background: hovered ? '#0d1018' : '#08090f',
        border: `1px solid ${hovered ? accent + '50' : '#1a1e2a'}`,
        borderRadius: '4px',
        padding: '36px 28px',
        boxShadow: hovered ? `0 0 40px ${accent}18, 0 16px 40px rgba(0,0,0,0.4)` : '0 4px 20px rgba(0,0,0,0.3)',
        transition2: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(to right, ${accent}, transparent)`,
        transform: hovered ? 'scaleX(1)' : 'scaleX(0.3)',
        transformOrigin: 'left',
        transition: 'transform 0.4s ease',
      }} />

      {/* Icon */}
      <div style={{
        width: '52px', height: '52px',
        border: `1px solid ${accent}40`,
        borderRadius: '4px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: accent + '10',
        marginBottom: '20px',
        transition: 'background 0.3s',
      }}>
        <Icon size={22} color={accent} />
      </div>

      <div style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: '16px', fontWeight: 700,
        letterSpacing: '0.02em',
        color: '#f0ede8',
        marginBottom: '12px',
      }}>{title}</div>

      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '1.05rem', fontWeight: 300,
        lineHeight: 1.8, color: '#5a5560',
        fontStyle: 'italic', margin: 0,
      }}>{text}</p>
    </div>
  );
}

// ── Main About ────────────────────────────────────────────────────────────────
export default function About() {
  const heroReveal = useReveal(0.1);
  const cardsReveal = useReveal(0.1);
  const [imgHover, setImgHover] = useState(false);
  const [hoverBtn, setHoverBtn] = useState<string | null>(null);

  const expertise = [
    {
      icon: Code,
      title: 'Full Stack Development',
      text: 'Experienced in both frontend and backend technologies, creating complete web solutions with React, Node.js, and more.',
      accent: '#c8a96e',
    },
    {
      icon: Globe,
      title: 'Web Applications',
      text: 'Building responsive and scalable web applications with modern technologies for optimal user experience across all devices.',
      accent: '#6eb5c8',
    },
    {
      icon: Coffee,
      title: 'Problem Solving',
      text: 'Passionate about solving complex problems with clean, efficient code and creative thinking to deliver elegant solutions.',
      accent: '#a06ec8',
    },
  ];

  return (
    <section
      id="about"
      style={{
        background: '#05070d',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Syne:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .about-btn { cursor: pointer; border: none; outline: none; font-family: 'Syne', sans-serif; transition: all 0.25s ease; }
        .about-btn:focus-visible { outline: 2px solid #c8a96e; outline-offset: 3px; }
        @media (max-width: 768px) {
          .about-flex { flex-direction: column !important; align-items: center !important; }
          .about-text { text-align: center !important; align-items: center !important; }
          .about-btns { justify-content: center !important; }
          .expertise-grid { grid-template-columns: 1fr !important; }
          .about-name { font-size: clamp(2.5rem, 8vw, 3.5rem) !important; }
        }
      `}</style>

      {/* Background noise texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
        backgroundSize: '180px',
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '20%', right: '-10%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, #c8a96e08 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Top rule */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(to right, transparent, #c8a96e30, transparent)',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '100px 32px', position: 'relative', zIndex: 1 }}>

        {/* ── Section header ── */}
        <div ref={heroReveal.ref} style={{ marginBottom: '80px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            opacity: heroReveal.visible ? 1 : 0,
            transform: heroReveal.visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            marginBottom: '24px',
          }}>
            <div style={{ width: '40px', height: '1px', background: '#c8a96e60' }} />
            <span style={{
              fontFamily: "'Syne', sans-serif", fontSize: '11px',
              fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#c8a96e',
            }}>About Me</span>
          </div>

          {/* Bio flex */}
          <div
            className="about-flex"
            style={{
              display: 'flex', alignItems: 'center', gap: '72px',
              opacity: heroReveal.visible ? 1 : 0,
              transform: heroReveal.visible ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
            }}
          >
            {/* Portrait */}
            <div style={{ flexShrink: 0 }}>
              <div
                onMouseEnter={() => setImgHover(true)}
                onMouseLeave={() => setImgHover(false)}
                style={{
                  position: 'relative',
                  width: '260px', height: '320px',
                  flexShrink: 0,
                }}
              >
                {/* Gold frame offset */}
                <div style={{
                  position: 'absolute',
                  top: '12px', left: '12px',
                  width: '260px', height: '320px',
                  border: '1px solid #c8a96e40',
                  borderRadius: '4px',
                  transition: 'transform 0.4s ease',
                  transform: imgHover ? 'translate(-4px, -4px)' : 'translate(0,0)',
                }} />

                {/* Photo */}
                <div style={{
                  position: 'relative', zIndex: 1,
                  width: '260px', height: '320px',
                  borderRadius: '4px', overflow: 'hidden',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
                  border: '1px solid #1a1e2a',
                }}>
                  <img
                    src={ME}
                    alt="Ezekiel Mburu"
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transform: imgHover ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  {/* Gradient overlay on image */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(5,7,13,0.5) 0%, transparent 50%)',
                  }} />
                </div>

                {/* "Available" badge */}
                <div style={{
                  position: 'absolute', bottom: '-14px', left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#0d1018',
                  border: '1px solid #c8a96e40',
                  borderRadius: '100px',
                  padding: '6px 16px',
                  display: 'flex', alignItems: 'center', gap: '7px',
                  whiteSpace: 'nowrap', zIndex: 2,
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: '#4ade80',
                    boxShadow: '0 0 6px #4ade80',
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "'Syne', sans-serif", fontSize: '10px',
                    fontWeight: 600, letterSpacing: '0.12em',
                    textTransform: 'uppercase', color: '#8a8878',
                  }}>Open to Work</span>
                </div>
              </div>
            </div>

            {/* Text block */}
            <div
              className="about-text"
              style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}
            >
              <h2
                className="about-name"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2.8rem, 4vw, 4rem)',
                  fontWeight: 700, lineHeight: 1.05,
                  color: '#f0ede8', margin: 0, letterSpacing: '-0.01em',
                }}
              >
                Passionate{' '}
                <span style={{
                  fontStyle: 'italic', fontWeight: 300,
                  background: 'linear-gradient(135deg, #c8a96e 0%, #e8c988 50%, #c8a96e 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>builder</span>
                <br />& problem solver
              </h2>

              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.2rem', fontWeight: 300,
                lineHeight: 1.85, color: '#6b6560',
                fontStyle: 'italic', margin: 0, maxWidth: '520px',
              }}>
                I'm a <strong style={{ color: '#c8a96e', fontWeight: 600, fontStyle: 'normal' }}>Full Stack Developer</strong> with expertise in building
                scalable web applications. With a strong foundation in both front-end and back-end development,
                I create elegant solutions that solve real-world problems.
              </p>

              {/* Mini stats */}
              <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                {[
                  ['React & Node.js', 'Core Stack'],
                  ['REST & GraphQL', 'APIs'],
                  ['Nairobi, KE', 'Location'],
                ].map(([val, label]) => (
                  <div key={label}>
                    <div style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: '13px', fontWeight: 700,
                      color: '#f0ede8', letterSpacing: '0.02em',
                    }}>{val}</div>
                    <div style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: '9px', fontWeight: 500,
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                      color: '#3a3530', marginTop: '3px',
                    }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="about-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  className="about-btn"
                  onMouseEnter={() => setHoverBtn('linkedin')}
                  onMouseLeave={() => setHoverBtn(null)}
                  onClick={() => window.open("https://www.linkedin.com/in/ezekiel-mburu-5aaa00262", "_blank")}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '9px',
                    padding: '12px 24px', borderRadius: '2px',
                    background: hoverBtn === 'linkedin' ? '#c8a96e' : 'transparent',
                    border: '1px solid #c8a96e',
                    color: hoverBtn === 'linkedin' ? '#05070d' : '#c8a96e',
                    fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  <Linkedin size={14} />
                  LinkedIn
                </button>
                <button
                  className="about-btn"
                  onMouseEnter={() => setHoverBtn('github')}
                  onMouseLeave={() => setHoverBtn(null)}
                  onClick={() => window.open("https://github.com/Mburuezekiel", "_blank")}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '9px',
                    padding: '12px 24px', borderRadius: '2px',
                    background: hoverBtn === 'github' ? '#1a1e2a' : 'transparent',
                    border: '1px solid #2a2e3a',
                    color: hoverBtn === 'github' ? '#f0ede8' : '#5a5560',
                    fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  <Github size={14} />
                  GitHub
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Expertise section ── */}
        <div ref={cardsReveal.ref}>
          {/* Heading */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '20px',
            marginBottom: '48px',
            opacity: cardsReveal.visible ? 1 : 0,
            transform: cardsReveal.visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}>
            <div style={{ flex: 1, height: '1px', background: '#1a1e2a' }} />
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '2rem', fontWeight: 700,
              color: '#f0ede8', letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}>
              My{' '}
              <span style={{ fontStyle: 'italic', fontWeight: 300, color: '#c8a96e' }}>Expertise</span>
            </span>
            <div style={{ flex: 1, height: '1px', background: '#1a1e2a' }} />
          </div>

          {/* Cards grid */}
          <div
            className="expertise-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}
          >
            {expertise.map((e, i) => (
              <ExpertiseCard
                key={e.title}
                icon={e.icon}
                title={e.title}
                text={e.text}
                accent={e.accent}
                delay={i * 0.12}
                visible={cardsReveal.visible}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(to right, transparent, #c8a96e20, transparent)',
      }} />
    </section>
  );
}