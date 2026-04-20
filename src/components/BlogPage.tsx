import React, { useState, useEffect } from 'react';

// ─── Inline styles approach – no Chakra dependency required ──────────────────
// Free images from Unsplash (no attribution needed for demo)
const FREE_IMAGES = {
  react: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
  performance: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
  nextjs: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
  accessibility: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
};

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  slug: string;
  content: string;
  accentColor: string;
}

const sampleBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Responsive Web Applications with React',
    description: 'Learn how to create responsive and accessible web applications using React and modern CSS techniques.',
    date: 'April 2, 2025',
    readTime: '5 min read',
    tags: ['React', 'Web Development', 'CSS'],
    image: FREE_IMAGES.react,
    accentColor: '#00d4ff',
    slug: 'building-responsive-web-applications-with-react',
    content: `
      <p>Building responsive web applications is crucial in today's multi-device world. Users access your sites from desktops, tablets, and mobile phones, and your application needs to adapt seamlessly to all screen sizes.</p>
      <h2>The Importance of Responsiveness</h2>
      <p>A responsive design ensures a consistent user experience across various devices. Without it, users on smaller screens might struggle with cramped layouts, unreadable text, and difficult navigation, leading to frustration and abandonment.</p>
      <h2>Key Principles of Responsive Design with React</h2>
      <h3>1. Mobile-First Approach</h3>
      <p>Start designing and developing for the smallest screen first. This forces you to prioritize content and functionality, making it easier to scale up for larger screens later.</p>
      <h3>2. Flexible Grids and Images</h3>
      <p>Avoid fixed-width layouts. Use percentage-based widths or CSS Grid/Flexbox. For images, set their maximum width to 100% to ensure they scale within their containers.</p>
      <h3>3. Media Queries</h3>
      <p>Media queries are your primary tool for applying different styles based on screen characteristics. In a React component, define these in CSS-in-JS or separate CSS files.</p>
      <h3>4. UI Libraries and Frameworks</h3>
      <p>Libraries like Chakra UI, Material-UI, or Ant Design provide responsive components out-of-the-box, significantly speeding up development time.</p>
      <h2>Accessibility Considerations</h2>
      <p>Responsiveness goes hand-in-hand with accessibility. Ensure your responsive design doesn't compromise keyboard navigation, screen reader compatibility, or color contrast.</p>
    `,
  },
  {
    id: '2',
    title: 'Optimizing Website Performance: Best Practices',
    description: 'Explore techniques to improve website loading speed and overall performance for better user experience.',
    date: 'March 15, 2025',
    readTime: '8 min read',
    tags: ['Performance', 'Optimization'],
    image: FREE_IMAGES.performance,
    accentColor: '#ff6b35',
    slug: 'optimizing-website-performance-best-practices',
    content: `
      <p>Website performance is a critical factor for user experience, SEO, and conversion rates. A fast-loading website keeps users engaged, while a slow one can drive them away.</p>
      <h2>Why Performance Matters</h2>
      <p>Studies show that even a one-second delay in page load time can lead to a significant drop in conversions and page views. Google also uses page speed as a ranking factor.</p>
      <h2>Key Optimization Techniques</h2>
      <h3>1. Image Optimization</h3>
      <p>Compress images with tools like TinyPNG, use modern formats like WebP, and implement lazy loading to load images only when they enter the viewport.</p>
      <h3>2. Minimize CSS and JavaScript</h3>
      <p>Minification removes unnecessary characters from your code, reducing file sizes. Bundling multiple files into one can also reduce HTTP requests.</p>
      <h3>3. Leverage Browser Caching</h3>
      <p>Configure your server to cache static assets. Returning visitors won't re-download these files, leading to faster subsequent loads.</p>
      <h3>4. Enable GZIP Compression</h3>
      <p>GZIP compression can drastically reduce the size of your HTML, CSS, and JavaScript files before they are sent from the server.</p>
    `,
  },
  {
    id: '3',
    title: "Introduction to Next.js: Why It's Great for Developers",
    description: 'Discover the benefits of using Next.js for your web projects and how it simplifies development.',
    date: 'February 28, 2025',
    readTime: '6 min read',
    tags: ['Next.js', 'React'],
    image: FREE_IMAGES.nextjs,
    accentColor: '#a855f7',
    slug: 'introduction-to-nextjs',
    content: `
      <p>Next.js is a popular React framework that enables powerful features like server-side rendering (SSR) and static site generation (SSG), making it a go-to choice for modern web development.</p>
      <h2>What is Next.js?</h2>
      <p>At its core, Next.js is a React framework for building full-stack web applications. It extends React's capabilities by providing a structured way to build web pages, manage data, and optimize performance.</p>
      <h2>Key Features and Benefits</h2>
      <h3>1. Server-Side Rendering and Static Site Generation</h3>
      <p>Next.js offers different rendering strategies. SSR renders pages on the server per request, improving SEO and initial page load. SSG generates HTML at build time, ideal for static content.</p>
      <h3>2. File-System Based Routing</h3>
      <p>Routing in Next.js is intuitive. You create pages by simply adding files to the pages directory, and they automatically become routes.</p>
      <h3>3. Image Optimization</h3>
      <p>The built-in next/image component automatically optimizes images, serving them in modern formats and appropriate sizes.</p>
    `,
  },
  {
    id: '4',
    title: 'Creating Accessible Web Experiences',
    description: 'Learn essential techniques for making your websites accessible to all users, regardless of abilities.',
    date: 'February 10, 2025',
    readTime: '7 min read',
    tags: ['Accessibility', 'UX'],
    image: FREE_IMAGES.accessibility,
    accentColor: '#10b981',
    slug: 'creating-accessible-web-experiences',
    content: `
      <p>Web accessibility means designing and developing websites so that people with disabilities can use them — including those with visual, auditory, motor, and cognitive impairments.</p>
      <h2>Why Accessibility Matters</h2>
      <p>Beyond legal compliance, an accessible website benefits everyone. It improves SEO, usability for all users, and reflects an inclusive approach to design.</p>
      <h2>Core Principles (WCAG)</h2>
      <h3>1. Perceivable</h3>
      <p>Provide text alternatives for non-text content, captions for audio/video, and sufficient color contrast so all users can access the information.</p>
      <h3>2. Operable</h3>
      <p>Ensure all functionality is available via keyboard, provide enough time for users to interact, and avoid content that could cause seizures.</p>
      <h3>3. Understandable</h3>
      <p>Make text readable and understandable, ensure consistency in navigation, and provide clear instructions for forms.</p>
      <h3>4. Robust</h3>
      <p>Use semantic HTML correctly and ensure compatibility with current and future user agents and assistive technologies.</p>
    `,
  },
];

function getAllTags(posts: BlogPost[]): string[] {
  const tagsSet = new Set<string>();
  posts.forEach(post => post.tags.forEach(tag => tagsSet.add(tag)));
  return Array.from(tagsSet);
}

// ─── Tiny hook for scroll reveal ─────────────────────────────────────────────
function useScrollReveal(ref: React.RefObject<HTMLElement>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

// ─── Card Component ──────────────────────────────────────────────────────────
function PostCard({ post, onClick, index }: { post: BlogPost; onClick: () => void; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const visible = useScrollReveal(ref as React.RefObject<HTMLElement>);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
        cursor: 'pointer',
        borderRadius: '16px',
        overflow: 'hidden',
        background: '#111827',
        border: `1px solid ${hovered ? post.accentColor + '60' : '#1f2937'}`,
        boxShadow: hovered ? `0 0 32px ${post.accentColor}25, 0 8px 32px rgba(0,0,0,0.4)` : '0 4px 16px rgba(0,0,0,0.3)',
        transition2: 'border 0.3s, box-shadow 0.3s',
        position: 'relative',
      }}
    >
      {/* Image */}
      <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to top, #111827 0%, transparent 60%)`,
        }} />
        {/* Accent line */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: post.accentColor,
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.4s ease',
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: '24px' }}>
        {/* Tags */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          {post.tags.map(tag => (
            <span key={tag} style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '3px 10px',
              borderRadius: '100px',
              background: post.accentColor + '18',
              color: post.accentColor,
              border: `1px solid ${post.accentColor}30`,
            }}>{tag}</span>
          ))}
        </div>

        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '1.2rem',
          fontWeight: 700,
          color: hovered ? '#ffffff' : '#e5e7eb',
          marginBottom: '10px',
          lineHeight: 1.35,
          transition: 'color 0.3s',
        }}>{post.title}</h2>

        <p style={{
          fontSize: '0.875rem',
          color: '#6b7280',
          lineHeight: 1.65,
          marginBottom: '20px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>{post.description}</p>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.78rem',
          color: '#4b5563',
        }}>
          <span>{post.date}</span>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: post.accentColor,
            fontWeight: 600,
          }}>
            {post.readTime}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Blog Component ─────────────────────────────────────────────────────
export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(sampleBlogPosts);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const allTags = getAllTags(sampleBlogPosts);

  useEffect(() => {
    if (selectedPost) return;
    let results = sampleBlogPosts;
    if (searchTerm) {
      const t = searchTerm.toLowerCase();
      results = results.filter(p =>
        p.title.toLowerCase().includes(t) ||
        p.description.toLowerCase().includes(t) ||
        p.tags.some(tag => tag.toLowerCase().includes(t))
      );
    }
    if (activeTag) results = results.filter(p => p.tags.includes(activeTag));
    setFilteredPosts(results);
  }, [searchTerm, activeTag, selectedPost]);

  // ── Single post view ──────────────────────────────────────────────────────
  if (selectedPost) {
    return (
      <div style={{ minHeight: '100vh', background: '#030712', color: '#e5e7eb', fontFamily: "'Inter', sans-serif" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
          .blog-content h2 { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700; color: #f9fafb; margin: 2rem 0 1rem; }
          .blog-content h3 { font-size: 1.15rem; font-weight: 600; color: #d1d5db; margin: 1.5rem 0 0.75rem; }
          .blog-content p { color: #9ca3af; line-height: 1.85; margin-bottom: 1.2rem; }
          .blog-content code { background: #1f2937; padding: 2px 8px; border-radius: 4px; font-family: monospace; font-size: 0.875rem; color: #60a5fa; }
          .blog-content pre { background: #111827; border: 1px solid #374151; padding: 1.25rem; border-radius: 10px; overflow-x: auto; margin: 1.5rem 0; }
          .blog-content ul, .blog-content ol { margin-left: 1.5rem; margin-bottom: 1.2rem; color: #9ca3af; }
          .blog-content li { margin-bottom: 0.5rem; line-height: 1.7; }
          .blog-content strong { color: #e5e7eb; }
        `}</style>

        {/* Hero */}
        <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
          <img src={selectedPost.image} alt={selectedPost.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${selectedPost.accentColor}20 0%, transparent 60%, #030712 100%)` }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '180px', background: 'linear-gradient(to top, #030712, transparent)' }} />
          
          {/* Back button */}
          <button
            onClick={() => setSelectedPost(null)}
            style={{
              position: 'absolute',
              top: '28px',
              left: '28px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#e5e7eb',
              padding: '10px 18px',
              borderRadius: '100px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'all 0.2s',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            All Posts
          </button>
        </div>

        {/* Article */}
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px 80px' }}>
          {/* Meta */}
          <div style={{ textAlign: 'center', marginTop: '-60px', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {selectedPost.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '4px 14px', borderRadius: '100px',
                  background: selectedPost.accentColor + '20', color: selectedPost.accentColor,
                  border: `1px solid ${selectedPost.accentColor}40`,
                }}>{tag}</span>
              ))}
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.2,
              marginBottom: '16px',
            }}>{selectedPost.title}</h1>

            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '40px' }}>
              {selectedPost.date} &bull; {selectedPost.readTime}
            </p>

            <div style={{ height: '1px', background: `linear-gradient(to right, transparent, ${selectedPost.accentColor}50, transparent)`, marginBottom: '40px' }} />
          </div>

          {/* Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: selectedPost.content }}
          />
        </div>
      </div>
    );
  }

  // ── Blog list view ────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: '#e5e7eb', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #00d4ff30; color: #fff; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #030712; }
        ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 3px; }
        .tag-btn { transition: all 0.2s ease; }
        .tag-btn:hover { transform: translateY(-1px); }
        .search-input::placeholder { color: #4b5563; }
        .grid-layout { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
        @media (max-width: 680px) { .grid-layout { grid-template-columns: 1fr; } }
      `}</style>

      {/* ── Header ── */}
      <div style={{ textAlign: 'center', padding: '80px 24px 60px', position: 'relative' }}>
        {/* Ambient glow */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse at center, #00d4ff08 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#00d4ff10', border: '1px solid #00d4ff25',
          padding: '6px 16px', borderRadius: '100px',
          fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: '#00d4ff', marginBottom: '24px',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00d4ff', display: 'inline-block' }} />
          Writing & Tutorials
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 900,
          color: '#ffffff',
          lineHeight: 1.1,
          marginBottom: '16px',
          letterSpacing: '-0.02em',
        }}>
          Thoughts &{' '}
          <span style={{ color: '#00d4ff', fontStyle: 'italic' }}>Ideas</span>
        </h1>

        <p style={{ color: '#6b7280', fontSize: '1.05rem', maxWidth: '460px', margin: '0 auto 40px', lineHeight: 1.7 }}>
          Exploring web development, design patterns, and the craft of building great software.
        </p>

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: '440px', margin: '0 auto' }}>
          <svg style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: searchFocused ? '#00d4ff' : '#4b5563', transition: 'color 0.2s' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            className="search-input"
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              width: '100%',
              padding: '14px 16px 14px 48px',
              background: '#0d1117',
              border: `1px solid ${searchFocused ? '#00d4ff50' : '#1f2937'}`,
              borderRadius: '12px',
              color: '#e5e7eb',
              fontSize: '0.9rem',
              outline: 'none',
              boxShadow: searchFocused ? '0 0 0 3px #00d4ff12' : 'none',
              transition: 'all 0.2s',
            }}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} style={{
              position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', display: 'flex',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          )}
        </div>
      </div>

      {/* ── Tag filters ── */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', padding: '0 24px 48px' }}>
        <button
          className="tag-btn"
          onClick={() => setActiveTag(null)}
          style={{
            padding: '7px 18px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
            background: activeTag === null ? '#e5e7eb' : '#111827',
            color: activeTag === null ? '#030712' : '#6b7280',
            transition: 'all 0.2s',
          }}
        >All</button>
        {allTags.map(tag => (
          <button
            key={tag}
            className="tag-btn"
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            style={{
              padding: '7px 18px', borderRadius: '100px', border: '1px solid',
              borderColor: activeTag === tag ? '#00d4ff' : '#1f2937',
              background: activeTag === tag ? '#00d4ff15' : 'transparent',
              color: activeTag === tag ? '#00d4ff' : '#6b7280',
              cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, transition: 'all 0.2s',
            }}
          >{tag}</button>
        ))}
      </div>

      {/* ── Grid ── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 100px' }}>
        {filteredPosts.length > 0 ? (
          <div className="grid-layout">
            {filteredPosts.map((post, i) => (
              <PostCard key={post.id} post={post} onClick={() => setSelectedPost(post)} index={i} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', color: '#e5e7eb', marginBottom: '8px' }}>No articles found</h3>
            <p style={{ color: '#6b7280' }}>Try adjusting your search or filter to find what you're looking for.</p>
            <button onClick={() => { setSearchTerm(''); setActiveTag(null); }} style={{
              marginTop: '20px', padding: '10px 22px', borderRadius: '8px', border: 'none',
              background: '#1f2937', color: '#e5e7eb', cursor: 'pointer', fontWeight: 500,
            }}>Clear all filters</button>
          </div>
        )}
      </div>
    </div>
  );
}