import { useState, useRef, useEffect, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import './landing/landing.css';

// Lazy load the 3D scene
const Scene = lazy(() => import('./landing/Scene'));

function FallbackPoster() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--label-2)', zIndex: -1 }}>
      WebGL Not Supported
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const [dpr, setDpr] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDiving, setIsDiving] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const handleIncline = () => setDpr(2);
  const handleDecline = () => setDpr(1);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100, mass: 0.5 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleDive = () => {
    setIsDiving(true);
    if (isReducedMotion) {
      setTimeout(() => navigate('/app'), 150);
    } else {
      setTimeout(() => navigate('/app'), 650);
    }
  };

  return (
    <div className="landing-root" ref={containerRef}>
      
      {/* 3D BACKGROUND (Completely behind everything) */}
      <div className="landing-canvas-layer">
        <Suspense fallback={<FallbackPoster />}>
          <Canvas
            camera={{ position: [0, 0, 10], fov: 45 }}
            dpr={dpr}
            gl={{ antialias: false, powerPreference: 'high-performance' }}
          >
            <PerformanceMonitor onIncline={handleIncline} onDecline={handleDecline} />
            <Scene progress={smoothProgress.get()} isDiving={isDiving} />
          </Canvas>
        </Suspense>
      </div>

      {/* HTML OVERLAY */}
      <div className="landing-content-layer">
        
        {/* NAV */}
        <div className="v7-nav-wrapper">
          <nav className="v7-nav">
            <div className="v7-nav-brand">P.A.R.S.E</div>
            <div className="v7-nav-links">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="v7-nav-link">Documentation</a>
              <button className="v7-btn-launch" onClick={handleDive}>Launch App</button>
            </div>
          </nav>
        </div>

        {/* HERO SECTION */}
        <section className="v7-hero-section">
          <motion.div 
            className="v7-hero-content landing-interactive"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="v7-hero-kicker">Introducing P.A.R.S.E</div>
            <h1 className="v7-hero-title">Zero Decryption.</h1>
            <p className="v7-hero-subtitle">
              The first network analysis engine that operates entirely on encrypted telemetry. No keys, no payloads, absolute privacy.
            </p>
            <div className="v7-hero-actions">
              <button className="v7-btn-primary" onClick={handleDive}>Enter Dashboard</button>
              <button className="v7-btn-secondary">Read Docs</button>
            </div>
          </motion.div>
        </section>

        {/* STATS SECTION */}
        <section className="v7-stats-section">
          <motion.div 
            className="v7-stat-card glass landing-interactive"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="v7-stat-number tabular-nums">80%</div>
            <p className="v7-stat-desc">
              Of modern web traffic is encrypted, rendering legacy deep-packet inspection <span>useless.</span>
            </p>
          </motion.div>

          <motion.div 
            className="v7-stat-card glass landing-interactive"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="v7-stat-number tabular-nums">68%</div>
            <p className="v7-stat-desc">
              Of malware now hides inside encrypted channels to evade detection. We analyze the <span>shape</span> of traffic, not the contents.
            </p>
          </motion.div>
        </section>

        {/* FEATURES BENTO GRID */}
        <section className="v7-features-section">
          <motion.div 
            className="v7-features-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="v7-features-title">Engineered for absolute security.</h2>
          </motion.div>

          <div className="v7-bento-grid">
            
            <motion.div 
              className="v7-bento-card v7-bento-wide glass landing-interactive"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <div className="v7-bento-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 className="v7-bento-title">Zero-Trust Hardware Binding</h3>
              <p className="v7-bento-desc">
                Every session is cryptographically bound to an authorized MAC address and device fingerprint. Connections from unknown hardware are dropped at the edge.
              </p>
            </motion.div>

            <motion.div 
              className="v7-bento-card glass landing-interactive"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <div className="v7-bento-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <h3 className="v7-bento-title">Micro-Batching</h3>
              <p className="v7-bento-desc">
                Telemetry streams are processed in millisecond micro-batches via XGBoost, allowing real-time risk scoring without persistent storage.
              </p>
            </motion.div>

            <motion.div 
              className="v7-bento-card glass landing-interactive"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              <div className="v7-bento-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <h3 className="v7-bento-title">Privacy Preserving</h3>
              <p className="v7-bento-desc">
                We never intercept TLS handshakes or request certificates. P.A.R.S.E only looks at the shape of the traffic, never the contents.
              </p>
            </motion.div>

          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="v7-footer-section">
          <motion.h2 
            className="v7-footer-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Ready to secure your network?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <button className="v7-btn-primary landing-interactive" onClick={handleDive}>
              Launch P.A.R.S.E Engine
            </button>
          </motion.div>
        </section>
        
      </div>
    </div>
  );
}
