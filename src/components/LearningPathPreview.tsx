import { useLearningStore } from '../store/learningStore';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function LearningPathPreview({
  topic,
  onStartLesson,
}: {
  topic: string;
  onStartLesson: () => void;
}) {
  const { lessons } = useLearningStore();

  console.log('LearningPathPreview - lessons:', lessons);

  return (
    <div className="lpv-root">
      {/* Ambient orb */}
      <div className="lpv-orb" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="lpv-inner"
      >
        {/* ── Header ── */}
        <div className="lpv-header">
          <div className="lpv-header-left">
            <p className="lpv-eyebrow">
              <span className="lpv-eyebrow-dot" />
              Learning Path
            </p>
            <h2 className="lpv-heading">{topic}</h2>
            <div className="lpv-meta">
              <span className="lpv-meta-item">
                <BookOpen size={13} />
                {lessons.length} lessons
              </span>
              <span className="lpv-meta-dot" />
              <span className="lpv-meta-item">Progress: 0%</span>
            </div>
          </div>

          <motion.button
            onClick={onStartLesson}
            className="lpv-cta"
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <span>Start journey</span>
            <span className="lpv-cta-arrow">→</span>
          </motion.button>
        </div>

        {/* ── Lesson list ── */}
        <div className="lpv-list">
          {/* Connector line */}
          <div className="lpv-line" />

          {lessons.map((lesson, idx) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="lpv-row"
            >
              {/* Node */}
              <div className="lpv-node-col">
                {idx === 0 ? (
                  <div className="lpv-node lpv-node-active">
                    <div className="lpv-node-inner" />
                  </div>
                ) : (
                  <div className="lpv-node lpv-node-idle">
                    <div className="lpv-node-num">{idx + 1}</div>
                  </div>
                )}
              </div>

              {/* Card */}
              <div className={`lpv-card${idx === 0 ? ' lpv-card-active' : ''}`}>
                <div className="lpv-card-body">
                  {/* Lesson number badge */}
                  <div className={`lpv-badge${idx === 0 ? ' lpv-badge-active' : ''}`}>
                    {String(lesson.id).padStart(2, '0')}
                  </div>

                  <div className="lpv-card-text">
                    <h3 className="lpv-lesson-title">{lesson.title}</h3>
                    <p className="lpv-lesson-sub">
                      {lesson.content?.keyTakeaways?.[0] || 'Explore this concept'}
                    </p>
                  </div>

                  {idx === 0 && (
                    <button className="lpv-start-btn" onClick={onStartLesson}>
                      Begin
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');

        .lpv-root {
          min-height: 100vh;
          background: #09090f;
          position: relative;
          overflow-x: hidden;
          font-family: 'Inter', sans-serif;
          padding: 52px 24px 96px;
        }

        .lpv-orb {
          position: fixed;
          width: 500px; height: 500px;
          top: -160px; right: -160px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(124,92,252,0.13) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .lpv-inner {
          max-width: 780px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Header ── */
        .lpv-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }
        .lpv-header-left { display: flex; flex-direction: column; gap: 8px; }

        .lpv-eyebrow {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(124,92,252,0.85);
          margin: 0;
        }
        .lpv-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #7c5cfc;
          display: inline-block;
          animation: lpv-pulse 2s ease-in-out infinite;
        }
        @keyframes lpv-pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.6); }
        }

        .lpv-heading {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          letter-spacing: -0.03em;
          color: #f0efff;
          margin: 0;
        }

        .lpv-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 2px;
        }
        .lpv-meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12.5px;
          color: rgba(240,239,255,0.3);
        }
        .lpv-meta-dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: rgba(240,239,255,0.15);
        }

        /* ── CTA ── */
        .lpv-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
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
          transition: background 0.2s, box-shadow 0.3s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .lpv-cta:hover {
          background: #fff;
          box-shadow: 0 10px 30px rgba(124,92,252,0.22);
        }
        .lpv-cta-arrow {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: rgba(9,9,15,0.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 15px;
          flex-shrink: 0;
        }

        /* ── List ── */
        .lpv-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* Vertical connector */
        .lpv-line {
          display: none;
          position: absolute;
          left: 19px;
          top: 40px;
          bottom: 40px;
          width: 1px;
          background: linear-gradient(
            to bottom,
            rgba(124,92,252,0.4) 0%,
            rgba(124,92,252,0.1) 40%,
            rgba(255,255,255,0.04) 100%
          );
          z-index: 0;
        }
        @media (min-width: 560px) { .lpv-line { display: block; } }

        /* ── Row ── */
        .lpv-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          position: relative;
          z-index: 1;
        }

        /* Node column */
        .lpv-node-col {
          display: none;
          width: 40px;
          flex-shrink: 0;
          padding-top: 18px;
          justify-content: center;
        }
        @media (min-width: 560px) { .lpv-node-col { display: flex; } }

        .lpv-node {
          width: 22px; height: 22px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .lpv-node-active {
          background: rgba(124,92,252,0.2);
          border: 1.5px solid rgba(124,92,252,0.7);
          box-shadow: 0 0 0 4px rgba(124,92,252,0.08);
        }
        .lpv-node-inner {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #7c5cfc;
        }
        .lpv-node-idle {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .lpv-node-num {
          font-size: 9px;
          font-weight: 600;
          color: rgba(240,239,255,0.25);
        }

        /* Card */
        .lpv-card {
          flex: 1;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 18px 20px;
          transition: border-color 0.2s, background 0.2s;
        }
        .lpv-card:hover {
          background: rgba(255,255,255,0.038);
          border-color: rgba(255,255,255,0.1);
        }
        .lpv-card-active {
          background: rgba(124,92,252,0.07);
          border-color: rgba(124,92,252,0.3);
        }
        .lpv-card-active:hover {
          background: rgba(124,92,252,0.1);
          border-color: rgba(124,92,252,0.4);
        }

        .lpv-card-body {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .lpv-badge {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: rgba(240,239,255,0.3);
          flex-shrink: 0;
        }
        .lpv-badge-active {
          background: rgba(124,92,252,0.18);
          border-color: rgba(124,92,252,0.35);
          color: #c4b5fd;
        }

        .lpv-card-text { flex: 1; min-width: 0; }
        .lpv-lesson-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: -0.015em;
          color: #f0efff;
          margin: 0 0 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .lpv-lesson-sub {
          font-size: 12.5px;
          color: rgba(240,239,255,0.32);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Inline start button */
        .lpv-start-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 10px;
          border: 1px solid rgba(124,92,252,0.35);
          background: rgba(124,92,252,0.12);
          color: #c4b5fd;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          transition: all 0.2s;
        }
        .lpv-start-btn:hover {
          background: rgba(124,92,252,0.22);
          border-color: rgba(124,92,252,0.55);
        }

        @media (prefers-reduced-motion: reduce) {
          .lpv-eyebrow-dot { animation: none; }
        }
      `}</style>
    </div>
  );
}