import React, { useState, useEffect, useCallback, useRef } from "react";
import { Github, Mail, Download, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ── Free Unsplash images (no attribution required for demo) ──────────────────
const carouselContent = [
  {
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80",
    title: "Clean Code",
    desc: "Writing maintainable, efficient code following best practices",
    tag: "Engineering",
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80",
    title: "Web Design",
    desc: "Creating beautiful, intuitive user interfaces",
    tag: "Design",
  },
  {
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=900&auto=format&fit=crop&q=80",
    title: "React Development",
    desc: "Building robust, scalable web applications",
    tag: "Development",
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=80",
    title: "Brand Identity",
    desc: "Crafting unique visual identities that represent your brand",
    tag: "Branding",
  },
  {
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&auto=format&fit=crop&q=80",
    title: "Full Stack",
    desc: "End-to-end solutions from concept to deployment",
    tag: "Full Stack",
  },
  {
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop&q=80",
    title: "Problem Solving",
    desc: "Finding elegant solutions to complex challenges",
    tag: "Strategy",
  },
];

const AUTOPLAY_DELAY = 4500;

// ── Particle component ────────────────────────────────────────────────────────
function Particle({ style }: { style: React.CSSProperties }) {
  return <div style={{ position: "absolute", borderRadius: "50%", pointerEvents: "none", ...style }} />;
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [hoverBtn, setHoverBtn] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const total = carouselContent.length;

  const go = useCallback(
    (idx: number, dir: number) => {
      setDirection(dir);
      setCurrent((idx + total) % total);
    },
    [total]
  );

  const next = useCallback(() => go(current + 1, 1), [current, go]);
  const prev = useCallback(() => go(current - 1, -1), [current, go]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, AUTOPLAY_DELAY);
    return () => clearInterval(timerRef.current);
  }, [paused, next]);

  const handleManual = (idx: number) => {
    clearInterval(timerRef.current);
    go(idx, idx > current ? 1 : -1);
    setPaused(true);
    timerRef.current = setTimeout(() => setPaused(false), 8000) as unknown as ReturnType<typeof setTimeout>;
  };

  // Slide variants
  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0, scale: 1.04 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.65, ease: [0.32, 0.72, 0, 1] } },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0, scale: 0.97, transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] } }),
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div
      id="home"
      style={{
        minHeight: "100vh",
        background: "#05070d",
        color: "#f0ede8",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Syne:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .hero-btn { cursor: pointer; border: none; outline: none; font-family: 'Syne', sans-serif; transition: all 0.25s ease; }
        .hero-btn:focus-visible { outline: 2px solid #c8a96e; outline-offset: 3px; }
        .nav-dot { cursor: pointer; border: none; background: none; padding: 4px; }
        .carousel-arrow { cursor: pointer; border: none; outline: none; }
        @media (max-width: 768px) {
          .hero-grid { flex-direction: column !important; }
          .hero-text { max-width: 100% !important; text-align: center !important; align-items: center !important; }
          .hero-carousel { width: 100% !important; max-width: 420px !important; margin: 0 auto; }
          .hero-name { font-size: clamp(3rem, 10vw, 4.5rem) !important; }
          .cta-row { justify-content: center !important; flex-wrap: wrap; }
        }
      `}</style>

      {/* ── Background particles ── */}
      {[
        { width: 320, height: 320, top: "5%", left: "60%", background: "radial-gradient(circle, #c8a96e12 0%, transparent 70%)" },
        { width: 500, height: 500, top: "40%", left: "-10%", background: "radial-gradient(circle, #ffffff06 0%, transparent 70%)" },
        { width: 200, height: 200, top: "70%", left: "75%", background: "radial-gradient(circle, #c8a96e09 0%, transparent 70%)" },
      ].map((p, i) => (
        <Particle key={i} style={p as React.CSSProperties} />
      ))}

      {/* ── Noise texture overlay ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
        backgroundSize: "180px",
      }} />

      {/* ── Gold horizontal rule top ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: "linear-gradient(to right, transparent, #c8a96e60, #c8a96e, #c8a96e60, transparent)",
      }} />

      {/* ── Main layout ── */}
      <div
        className="hero-grid"
        style={{
          position: "relative", zIndex: 1,
          maxWidth: "1280px", margin: "0 auto",
          padding: "80px 32px",
          display: "flex", alignItems: "center",
          gap: "64px", width: "100%",
        }}
      >
        {/* ─── LEFT: Text ─────────────────────────────────────────────────── */}
        <motion.div
          className="hero-text"
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{
            flex: "1 1 0", display: "flex", flexDirection: "column",
            gap: "28px", maxWidth: "520px",
          }}
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              border: "1px solid #c8a96e40",
              padding: "7px 18px", borderRadius: "2px",
              background: "#c8a96e08",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#c8a96e", flexShrink: 0 }} />
              <span style={{
                fontFamily: "'Syne', sans-serif", fontSize: "11px",
                fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "#c8a96e",
              }}>Available for work · Nairobi, KE</span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.div variants={fadeUp}>
            <h1
              className="hero-name"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
                fontWeight: 700, lineHeight: 1.0,
                margin: 0, letterSpacing: "-0.01em",
                color: "#f0ede8",
              }}
            >
              Ezekiel
              <br />
              <span style={{
                fontStyle: "italic", fontWeight: 300,
                background: "linear-gradient(135deg, #c8a96e 0%, #e8c988 50%, #c8a96e 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Mburu</span>
            </h1>
          </motion.div>

          {/* Role */}
          <motion.div variants={fadeUp}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ width: "40px", height: "1px", background: "#c8a96e60" }} />
              <span style={{
                fontFamily: "'Syne', sans-serif", fontSize: "13px",
                fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase",
                color: "#8a8070",
              }}>Full Stack Developer</span>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.2rem", fontWeight: 300, lineHeight: 1.8,
              color: "#8a8070", margin: 0, maxWidth: "440px",
              fontStyle: "italic",
            }}
          >
            Passionate about creating innovative web solutions and turning ideas into reality through clean,
            efficient code that delivers exceptional user experiences.
          </motion.p>

          {/* Stats row */}
          <motion.div variants={fadeUp} style={{ display: "flex", gap: "32px" }}>
            {[["3+", "Years Exp."], ["20+", "Projects"], ["∞", "Curiosity"]].map(([num, label]) => (
              <div key={label}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2rem", fontWeight: 700, color: "#c8a96e", lineHeight: 1,
                }}>{num}</div>
                <div style={{
                  fontFamily: "'Syne', sans-serif", fontSize: "10px",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: "#4a4540", marginTop: "4px",
                }}>{label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} className="cta-row" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {/* Primary */}
            <button
              className="hero-btn"
              onMouseEnter={() => setHoverBtn("contact")}
              onMouseLeave={() => setHoverBtn(null)}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "14px 28px",
                background: hoverBtn === "contact" ? "#c8a96e" : "transparent",
                border: "1px solid #c8a96e",
                color: hoverBtn === "contact" ? "#05070d" : "#c8a96e",
                fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em",
                textTransform: "uppercase", borderRadius: "2px",
              }}
            >
              <Mail size={15} />
              Contact Me
            </button>

            {/* GitHub */}
            <button
              className="hero-btn"
              onMouseEnter={() => setHoverBtn("github")}
              onMouseLeave={() => setHoverBtn(null)}
              onClick={() => window.open("https://github.com/Mburuezekiel", "_blank")}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "14px 28px",
                background: hoverBtn === "github" ? "#1a1e2a" : "transparent",
                border: "1px solid #2a2e3a",
                color: hoverBtn === "github" ? "#f0ede8" : "#5a5560",
                fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em",
                textTransform: "uppercase", borderRadius: "2px",
              }}
            >
              <Github size={15} />
              GitHub
            </button>

            {/* Resume */}
            <button
              className="hero-btn"
              onMouseEnter={() => setHoverBtn("resume")}
              onMouseLeave={() => setHoverBtn(null)}
              onClick={() => window.open("#", "_blank")}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "14px 28px",
                background: "transparent",
                border: "1px solid #2a2e3a",
                color: hoverBtn === "resume" ? "#f0ede8" : "#5a5560",
                fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em",
                textTransform: "uppercase", borderRadius: "2px",
                transition: "all 0.25s ease",
              }}
            >
              <Download size={15} />
              Résumé
            </button>
          </motion.div>
        </motion.div>

        {/* ─── RIGHT: Carousel ─────────────────────────────────────────────── */}
        <motion.div
          className="hero-carousel"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ flex: "1 1 0", position: "relative", maxWidth: "560px", width: "100%" }}
        >
          {/* Frame border glow */}
          <div style={{
            position: "absolute", inset: "-1px",
            background: "linear-gradient(135deg, #c8a96e40, transparent, #c8a96e20)",
            borderRadius: "4px", zIndex: 0,
          }} />

          {/* Main carousel box */}
          <div style={{
            position: "relative", zIndex: 1,
            borderRadius: "4px", overflow: "hidden",
            aspectRatio: "4/3",
            background: "#0d1018",
            boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px #c8a96e20",
          }}>
            {/* Slide */}
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ position: "absolute", inset: 0 }}
              >
                <img
                  src={carouselContent[current].image}
                  alt={carouselContent[current].title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {/* Gradient overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(5,7,13,0.92) 0%, rgba(5,7,13,0.2) 50%, transparent 100%)",
                }} />

                {/* Caption */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "28px 28px 24px",
                }}>
                  <div style={{
                    display: "inline-block",
                    fontFamily: "'Syne', sans-serif", fontSize: "10px",
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: "#c8a96e", marginBottom: "8px",
                    padding: "3px 10px", border: "1px solid #c8a96e40",
                    borderRadius: "2px",
                  }}>
                    {carouselContent[current].tag}
                  </div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.5rem", fontWeight: 600, color: "#f0ede8",
                    lineHeight: 1.2, marginBottom: "6px",
                  }}>
                    {carouselContent[current].title}
                  </div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "0.95rem", fontWeight: 300,
                    color: "rgba(240,237,232,0.6)", fontStyle: "italic",
                  }}>
                    {carouselContent[current].desc}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "#1a1e2a", zIndex: 10 }}>
              <motion.div
                key={`bar-${current}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: paused ? 0 : AUTOPLAY_DELAY / 1000, ease: "linear" }}
                style={{ height: "100%", background: "linear-gradient(to right, #c8a96e, #e8c988)" }}
              />
            </div>

            {/* Arrow buttons */}
            {[
              { dir: "left", icon: <ChevronLeft size={18} />, action: () => { handleManual(current === 0 ? total - 1 : current - 1); }, side: { left: "12px" } },
              { dir: "right", icon: <ChevronRight size={18} />, action: () => { handleManual(current === total - 1 ? 0 : current + 1); }, side: { right: "12px" } },
            ].map((btn) => (
              <button
                key={btn.dir}
                className="carousel-arrow"
                onClick={btn.action}
                aria-label={`${btn.dir} slide`}
                style={{
                  position: "absolute", top: "50%", transform: "translateY(-50%)",
                  ...btn.side,
                  width: "40px", height: "40px", borderRadius: "2px",
                  background: "rgba(5,7,13,0.7)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid #c8a96e30",
                  color: "#c8a96e", display: "flex", alignItems: "center", justifyContent: "center",
                  zIndex: 10, cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {btn.icon}
              </button>
            ))}
          </div>

          {/* Dot indicators */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "8px", marginTop: "20px",
          }}>
            {carouselContent.map((_, i) => (
              <button
                key={i}
                className="nav-dot"
                onClick={() => handleManual(i)}
                aria-label={`Slide ${i + 1}`}
                style={{ padding: "4px" }}
              >
                <motion.div
                  animate={{
                    width: i === current ? 28 : 6,
                    background: i === current ? "#c8a96e" : "#2a2e3a",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ height: 2, borderRadius: "1px" }}
                />
              </button>
            ))}
          </div>

          {/* Slide counter */}
          <div style={{
            textAlign: "center", marginTop: "10px",
            fontFamily: "'Syne', sans-serif", fontSize: "10px",
            letterSpacing: "0.14em", color: "#2a2e3a",
          }}>
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </motion.div>
      </div>

      {/* ── Bottom gold rule ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(to right, transparent, #c8a96e30, transparent)",
      }} />

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{
          position: "absolute", bottom: "28px", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
        }}
      >
        <span style={{
          fontFamily: "'Syne', sans-serif", fontSize: "9px",
          letterSpacing: "0.2em", textTransform: "uppercase", color: "#3a3530",
        }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowRight size={12} color="#3a3530" style={{ transform: "rotate(90deg)" }} />
        </motion.div>
      </motion.div>
    </div>
  );
}