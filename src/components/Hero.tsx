import { PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="hero-root">
      {/* Orbs */}
      <div className="hero-orb hero-orb-a" />
      <div className="hero-orb hero-orb-b" />
      <div className="hero-orb hero-orb-c" />

      {/* Nav */}
      <nav className="hero-nav">
        <div className="hero-logo">
          <span className="hero-logo-mark">
            <span className="hero-logo-dot" />
          </span>
          <span className="hero-logo-text">SillyAI</span>
        </div>
        <div className="hero-nav-actions">
          <Link to="/login" className="hero-signin">Sign in</Link>
          <Link to="/signup" className="hero-signup">
            Get started
            <span className="hero-signup-arrow">→</span>
          </Link>
        </div>
      </nav>

      {/* Main grid */}
      <div className="hero-grid">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="hero-copy"
        >
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            AI-Powered Learning
          </div>

          <h1 className="hero-heading">
            Learn anything,<br />
            <em>your way.</em>
          </h1>

          <p className="hero-sub">
            Personalized learning paths that adapt to your level and pace.
            No more generic tutorials — just clear, direct explanations built for you.
          </p>

          <div className="hero-actions">
            <Link to="/dashboard">
              <button className="hero-cta-primary">
                <span>Start learning</span>
                <span className="hero-cta-arrow">→</span>
              </button>
            </Link>
            <button className="hero-cta-ghost">
              <PlayCircle size={16} />
              See demo
            </button>
          </div>

          {/* Social proof */}
          <div className="hero-proof">
            <div className="hero-proof-avatars">
              {['E', 'M', 'K', 'R'].map((l, i) => (
                <div key={i} className="hero-avatar" style={{ zIndex: 4 - i }}>
                  {l}
                </div>
              ))}
            </div>
            <p className="hero-proof-text">Joined by 2,400+ learners this month</p>
          </div>
        </motion.div>

        {/* Right: UI preview card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="hero-card-wrap"
        >
          <div className="hero-card">
            {/* Card inner glow */}
            <div className="hero-card-glow" />

            {/* Eyebrow row */}
            <div className="hero-card-header">
              <div className="hero-card-eyebrow">
                <span className="hero-eyebrow-dot" style={{ animationDelay: '0.6s' }} />
                Generating path
              </div>
              <span className="hero-card-count">8 lessons</span>
            </div>

            {/* Topic */}
            <div className="hero-card-topic">
              <h2 className="hero-card-topic-name">Blockchain Fundamentals</h2>
              <span className="hero-card-level">Complete Beginner</span>
            </div>

            {/* Lesson rows */}
            <div className="hero-lessons">
              {[
                { n: '01', title: 'What is a blockchain?', active: true },
                { n: '02', title: 'How consensus works', active: false },
                { n: '03', title: 'Wallets & keys explained', active: false },
              ].map(({ n, title, active }) => (
                <div key={n} className={`hero-lesson${active ? ' hero-lesson-active' : ''}`}>
                  <div className={`hero-lesson-badge${active ? ' hero-lesson-badge-active' : ''}`}>{n}</div>
                  <span className={`hero-lesson-title${active ? ' hero-lesson-title-active' : ''}`}>{title}</span>
                  {active && <span className="hero-lesson-start">Begin →</span>}
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="hero-card-cta">
              <div className="hero-card-cta-inner">
                <span className="hero-card-cta-text">Ready to start</span>
                <div className="hero-card-cta-btn">Start journey →</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');

        .hero-root {
          min-height: 100vh;
          background: #09090f;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
        }

        /* ── Orbs ── */
        .hero-orb { position: absolute; border-radius: 50%; pointer-events: none; }
        .hero-orb-a {
          width: 700px; height: 700px;
          top: -320px; left: -220px;
          background: radial-gradient(circle, rgba(124,92,252,0.17) 0%, transparent 68%);
        }
        .hero-orb-b {
          width: 480px; height: 480px;
          bottom: -180px; right: -160px;
          background: radial-gradient(circle, rgba(79,209,197,0.09) 0%, transparent 70%);
        }
        .hero-orb-c {
          width: 340px; height: 340px;
          top: 30%; right: 20%;
          background: radial-gradient(circle, rgba(124,92,252,0.07) 0%, transparent 70%);
        }

        /* ── Nav ── */
        .hero-nav {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 40px;
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }
        .hero-logo {
          display: flex;
          align-items: center;
          gap: 9px;
        }
        .hero-logo-mark {
          width: 28px; height: 28px;
          border-radius: 8px;
          background: rgba(124,92,252,0.22);
          border: 1px solid rgba(124,92,252,0.4);
          display: flex; align-items: center; justify-content: center;
        }
        .hero-logo-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #7c5cfc;
        }
        .hero-logo-text {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          letter-spacing: -0.025em;
          color: #f0efff;
        }
        .hero-nav-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .hero-signin {
          font-size: 13.5px;
          font-weight: 500;
          color: rgba(240,239,255,0.4);
          text-decoration: none;
          transition: color 0.2s;
        }
        .hero-signin:hover { color: rgba(240,239,255,0.8); }
        .hero-signup {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 18px;
          border-radius: 12px;
          border: none;
          background: #f0efff;
          color: #09090f;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: -0.01em;
          text-decoration: none;
          transition: background 0.2s, box-shadow 0.2s;
        }
        .hero-signup:hover {
          background: #fff;
          box-shadow: 0 8px 24px rgba(124,92,252,0.2);
        }
        .hero-signup-arrow {
          width: 22px; height: 22px;
          border-radius: 50%;
          background: rgba(9,9,15,0.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
        }

        /* ── Grid ── */
        .hero-grid {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 40px 80px;
          width: 100%;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr; padding: 24px 24px 64px; }
          .hero-card-wrap { display: none; }
          .hero-nav { padding: 24px; }
        }

        /* ── Copy ── */
        .hero-copy {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(124,92,252,0.85);
          margin-bottom: 20px;
        }
        .hero-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #7c5cfc;
          display: inline-block;
          animation: hero-pulse 2s ease-in-out infinite;
        }
        @keyframes hero-pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.6); }
        }

        .hero-heading {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          line-height: 1.06;
          letter-spacing: -0.035em;
          color: #f0efff;
          margin: 0 0 20px;
        }
        .hero-heading em {
          font-style: italic;
          color: #7c5cfc;
        }

        .hero-sub {
          font-size: 15.5px;
          color: rgba(240,239,255,0.4);
          line-height: 1.7;
          margin: 0 0 36px;
          max-width: 42ch;
        }

        /* ── Actions ── */
        .hero-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .hero-cta-primary {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px 22px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: -0.01em;
          background: #f0efff;
          color: #09090f;
          transition: background 0.2s, box-shadow 0.25s, transform 0.2s;
        }
        .hero-cta-primary:hover {
          background: #fff;
          box-shadow: 0 12px 32px rgba(124,92,252,0.22);
          transform: translateY(-1px);
        }
        .hero-cta-arrow {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: rgba(9,9,15,0.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 15px;
        }
        .hero-cta-ghost {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 15px 20px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background: transparent;
          color: rgba(240,239,255,0.45);
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .hero-cta-ghost:hover {
          border-color: rgba(255,255,255,0.15);
          color: rgba(240,239,255,0.75);
          background: rgba(255,255,255,0.04);
        }

        /* ── Social proof ── */
        .hero-proof {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .hero-proof-avatars { display: flex; }
        .hero-avatar {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: rgba(124,92,252,0.2);
          border: 1.5px solid #09090f;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          font-weight: 700;
          color: #c4b5fd;
          margin-left: -8px;
        }
        .hero-avatar:first-child { margin-left: 0; }
        .hero-proof-text {
          font-size: 12px;
          color: rgba(240,239,255,0.28);
          margin: 0;
        }

        /* ── Preview card ── */
        .hero-card-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hero-card {
          width: 100%;
          max-width: 380px;
          background: rgba(255,255,255,0.028);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 26px;
          position: relative;
          overflow: hidden;
        }
        .hero-card-glow {
          position: absolute;
          width: 280px; height: 280px;
          top: -140px; right: -80px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(124,92,252,0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .hero-card-eyebrow {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(124,92,252,0.8);
        }
        .hero-card-count {
          font-size: 11px;
          color: rgba(240,239,255,0.25);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 3px 9px;
          border-radius: 999px;
        }

        .hero-card-topic { margin-bottom: 20px; }
        .hero-card-topic-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.15rem;
          letter-spacing: -0.025em;
          color: #f0efff;
          margin: 0 0 7px;
        }
        .hero-card-level {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(79,209,197,0.8);
          background: rgba(79,209,197,0.1);
          padding: 3px 9px;
          border-radius: 999px;
        }

        /* Lessons */
        .hero-lessons {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }
        .hero-lesson {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 11px 13px;
          border-radius: 12px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.05);
        }
        .hero-lesson-active {
          background: rgba(124,92,252,0.08);
          border-color: rgba(124,92,252,0.28);
        }
        .hero-lesson-badge {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          font-weight: 700;
          color: rgba(240,239,255,0.28);
          flex-shrink: 0;
        }
        .hero-lesson-badge-active {
          background: rgba(124,92,252,0.18);
          border-color: rgba(124,92,252,0.35);
          color: #c4b5fd;
        }
        .hero-lesson-title {
          flex: 1;
          font-size: 12.5px;
          font-weight: 500;
          color: rgba(240,239,255,0.35);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .hero-lesson-title-active { color: rgba(240,239,255,0.85); }
        .hero-lesson-start {
          font-size: 11px;
          font-weight: 600;
          color: #c4b5fd;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* Card CTA */
        .hero-card-cta {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 16px;
        }
        .hero-card-cta-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .hero-card-cta-text {
          font-size: 12px;
          color: rgba(240,239,255,0.25);
        }
        .hero-card-cta-btn {
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #09090f;
          background: #f0efff;
          padding: 8px 14px;
          border-radius: 10px;
          letter-spacing: -0.01em;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-eyebrow-dot { animation: none; }
        }
      `}</style>
    </div>
  );
}