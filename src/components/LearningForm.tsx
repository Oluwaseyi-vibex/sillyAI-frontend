// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Search, Brain, Sparkles, Loader2 } from 'lucide-react';
// import type { LearningLevel, LearningState } from '../types';
// import { useNavigate } from 'react-router-dom';
// import { useLearningStore } from '../store/learningStore';
// import { toast } from 'react-toastify';



// const LEVELS: LearningLevel[] = ['Complete Beginner', 'Student', 'Professional'];

// export default function LearningForm() {
//   const [topic, setTopic] = useState('');
//   const [level, setLevel] = useState<LearningLevel>('Complete Beginner');
//   const [isGenerating, setIsGenerating] = useState(false);
//   const navigate = useNavigate();
//   const generatePath = useLearningStore((s) => s.generatePath);


//   // const handleGenerate = async () => {
//   //   if (!topic) return;
//   //   setIsGenerating(true);
//   //   await generatePath(topic, level);
//   //   setIsGenerating(false);
//   //   navigate('/preview');


//   // };

//   const handleGenerate = async () => {
//     if (!topic) return;
//     setIsGenerating(true);
//     try {
//       await generatePath(topic, level);
//       console.log('Store state:', useLearningStore.getState());
//       navigate('/preview');            // only navigate on success
//     } catch (error) {
//       console.error('Failed to generate path', error);
//       // Optionally show a toast
//       toast.error('Failed to generate learning path. Please try again.');
//     } finally {
//       setIsGenerating(false);
//     }
//   };
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, delay: 0.1 }}
//       className="max-w-3xl flex items-center justify-center min-h-screen mx-auto px-4 "
//     >
//       <div className="glass-panel p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
//         {/* Glow effect */}
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

//         <div className="space-y-10 relative z-10">

//           {/* Topic Input */}
//           <div className="space-y-4">
//             <label className="text-xl font-semibold text-white flex items-center gap-2">
//               <Search size={24} className="text-indigo-400" />
//               What would you like to learn?
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value={topic}
//                 onChange={(e) => setTopic(e.target.value)}
//                 placeholder="e.g. How does Blockchain work?"
//                 className="w-full bg-[#18181b] border border-white/10 rounded-2xl px-6 py-5 text-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-inner"
//               />
//               <div className="absolute top-1/2 -translate-y-1/2 right-6 hidden md:flex gap-2">
//                 <span className="text-xs text-zinc-500 bg-white/5 px-2 py-1 rounded-md border border-white/5">Learn React</span>
//                 <span className="text-xs text-zinc-500 bg-white/5 px-2 py-1 rounded-md border border-white/5">Economics</span>
//               </div>
//             </div>
//           </div>

//           {/* Learning Level */}
//           <div className="space-y-4">
//             <label className="text-base font-semibold text-white flex items-center gap-2">
//               <Brain size={18} className="text-indigo-400" />
//               Learning Level
//             </label>
//             <div className="flex w-full gap-3">
//               {LEVELS.map(l => (
//                 <button
//                   key={l}
//                   onClick={() => setLevel(l)}
//                   className={`flex flex-1 px-3 py-4 rounded-xl text-sm font-medium transition-all duration-200 text-center  border ${level === l
//                     ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
//                     : 'bg-[#18181b] border-white/5 text-zinc-400 hover:border-white/20 hover:text-white'
//                     }`}
//                 >
//                   {l}
//                 </button>
//               ))}
//             </div>
//           </div>



//           <div className="pt-6 border-t border-white/10">
//             <button
//               onClick={handleGenerate}
//               disabled={!topic || isGenerating}
//               className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${!topic
//                 ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
//                 : 'bg-white text-black hover:bg-zinc-200 hover:scale-[1.01] shadow-xl hover:shadow-white/20'
//                 }`}
//             >
//               {isGenerating ? (
//                 <>
//                   <Loader2 size={24} className="animate-spin" />
//                   Crafting your lesson...
//                 </>
//               ) : (
//                 <>
//                   <Sparkles size={24} />
//                   Generate Learning Path
//                 </>
//               )}
//             </button>
//           </div>

//         </div>
//       </div>
//     </motion.div>
//   );
// }

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import type { LearningLevel } from '../types';
import { useNavigate } from 'react-router-dom';
import { useLearningStore } from '../store/learningStore';
import { toast } from 'react-toastify';

const LEVELS: { value: LearningLevel; icon: string; desc: string }[] = [
  { value: 'Complete Beginner', icon: '🌱', desc: 'Start from zero' },
  { value: 'Student', icon: '📘', desc: 'Building foundations' },
  { value: 'Professional', icon: '⚡', desc: 'Deep & advanced' },
];

const SUGGESTIONS = [
  'Blockchain', 'Quantum physics', 'React', 'Machine learning', 'Economics',
];

export default function LearningForm() {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState<LearningLevel>('Complete Beginner');
  const [isGenerating, setIsGenerating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const generatePath = useLearningStore((s) => s.generatePath);

  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    try {
      await generatePath(topic, level);
      console.log('Store state:', useLearningStore.getState());
      navigate('/preview');
    } catch (error) {
      console.error('Failed to generate path', error);
      toast.error('Failed to generate learning path. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="lf-root">
      {/* Ambient orbs */}
      <div className="lf-orb lf-orb-a" />
      <div className="lf-orb lf-orb-b" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="lf-card"
      >
        {/* ── Left panel ── */}
        <div className="lf-left">
          <div className="lf-eyebrow">
            <span className="lf-eyebrow-dot" />
            AI Learning Engine
          </div>

          <h1 className="lf-headline">
            Learn<br />anything,<br />
            <em>your way.</em>
          </h1>

          <p className="lf-subtext">
            Describe a topic and pick your starting point. We'll build a path
            that fits where you are right now.
          </p>

          <div>
            <p className="lf-field-label">Try asking about</p>
            <div className="lf-tags">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className="lf-tag"
                  onClick={() => {
                    setTopic(s);
                    inputRef.current?.focus();
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="lf-right">
          {/* Topic input */}
          <div>
            <p className="lf-field-label">What do you want to learn?</p>
            <div className="lf-input-wrap">
              <input
                ref={inputRef}
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isGenerating && topic && handleGenerate()}
                placeholder="e.g. How does Blockchain work?"
                className="lf-input"
              />
              <span className="lf-input-glow" />
            </div>
          </div>

          {/* Level selector */}
          <div>
            <p className="lf-field-label">Your level</p>
            <div className="lf-levels">
              {LEVELS.map(({ value, icon, desc }) => (
                <button
                  key={value}
                  onClick={() => setLevel(value)}
                  className={`lf-level-btn${level === value ? ' active' : ''}`}
                >
                  <span className="lf-level-icon">{icon}</span>
                  <span className="lf-level-name">{value}</span>
                  <span className="lf-level-desc">{desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.button
            onClick={handleGenerate}
            disabled={!topic || isGenerating}
            className="lf-cta"
            whileHover={topic && !isGenerating ? { y: -2 } : {}}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            {isGenerating ? (
              <>
                <span>Crafting your lesson…</span>
                <Loader2 size={20} className="lf-spinner" />
              </>
            ) : (
              <>
                <span>Generate learning path</span>
                <span className="lf-cta-arrow">→</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');

        .lf-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
          background: #09090f;
          position: relative;
          overflow: hidden;
        }

        /* ── Ambient orbs ── */
        .lf-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .lf-orb-a {
          width: 640px; height: 640px;
          top: -260px; left: -200px;
          background: radial-gradient(circle, rgba(124,92,252,0.18) 0%, transparent 70%);
        }
        .lf-orb-b {
          width: 420px; height: 420px;
          bottom: -140px; right: -120px;
          background: radial-gradient(circle, rgba(79,209,197,0.1) 0%, transparent 70%);
        }

        /* ── Card ── */
        .lf-card {
          position: relative;
          width: 100%;
          max-width: 800px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: rgba(255,255,255,0.028);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 28px;
          overflow: hidden;
          z-index: 1;
        }

        /* ── Left panel ── */
        .lf-left {
          padding: 52px 44px;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .lf-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(124,92,252,0.9);
        }
        .lf-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #7c5cfc;
          display: inline-block;
          animation: lf-pulse 2s ease-in-out infinite;
        }
        @keyframes lf-pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.65); }
        }

        .lf-headline {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 3.5vw, 2.65rem);
          line-height: 1.07;
          letter-spacing: -0.03em;
          color: #f0efff;
          margin: 0;
        }
        .lf-headline em {
          font-style: italic;
          color: #7c5cfc;
        }

        .lf-subtext {
          font-size: 14px;
          color: rgba(240,239,255,0.42);
          line-height: 1.7;
          margin: 0;
          max-width: 28ch;
        }

        .lf-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 10px;
        }
        .lf-tag {
          font-size: 11.5px;
          color: rgba(240,239,255,0.35);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 999px;
          padding: 5px 13px;
          cursor: pointer;
          transition: color 0.18s, border-color 0.18s, background 0.18s;
        }
        .lf-tag:hover {
          color: rgba(240,239,255,0.75);
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.07);
        }

        /* ── Right panel ── */
        .lf-right {
          padding: 52px 44px;
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .lf-field-label {
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.11em;
          text-transform: uppercase;
          color: rgba(240,239,255,0.28);
          margin: 0 0 12px;
        }

        /* ── Input ── */
        .lf-input-wrap { position: relative; }
        .lf-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 0;
          padding: 10px 0;
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: #f0efff;
          outline: none;
          transition: border-color 0.3s;
          box-sizing: border-box;
        }
        .lf-input::placeholder { color: rgba(240,239,255,0.18); font-weight: 400; }
        .lf-input:focus { border-bottom-color: rgba(124,92,252,0.4); }
        .lf-input-glow {
          position: absolute;
          bottom: -1px; left: 0;
          height: 1.5px; width: 0%;
          background: linear-gradient(90deg, #7c5cfc, #4fd1c5);
          border-radius: 2px;
          transition: width 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }
        .lf-input:focus ~ .lf-input-glow { width: 100%; }

        /* ── Levels ── */
        .lf-levels { display: flex; flex-direction: column; gap: 8px; }
        .lf-level-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 15px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.22s ease;
          width: 100%;
        }
        .lf-level-btn:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.12);
        }
        .lf-level-btn.active {
          background: rgba(124,92,252,0.1);
          border-color: rgba(124,92,252,0.38);
        }
        .lf-level-icon {
          width: 32px; height: 32px;
          border-radius: 8px;
          background: rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center;
          font-size: 15px;
          flex-shrink: 0;
        }
        .lf-level-btn.active .lf-level-icon { background: rgba(124,92,252,0.2); }
        .lf-level-name {
          font-size: 13.5px;
          font-weight: 500;
          color: rgba(240,239,255,0.5);
          transition: color 0.2s;
          text-align: left;
          flex: 1;
        }
        .lf-level-btn.active .lf-level-name { color: #c4b5fd; }
        .lf-level-desc {
          font-size: 11px;
          color: rgba(240,239,255,0.22);
          white-space: nowrap;
        }
        .lf-level-btn.active .lf-level-desc { color: rgba(196,181,253,0.45); }

        /* ── CTA ── */
        .lf-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 18px 22px;
          border-radius: 16px;
          border: none;
          cursor: pointer;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.01em;
          background: #f0efff;
          color: #09090f;
          transition: background 0.2s, box-shadow 0.3s;
        }
        .lf-cta:disabled {
          background: rgba(255,255,255,0.07);
          color: rgba(240,239,255,0.22);
          cursor: not-allowed;
        }
        .lf-cta:not(:disabled):hover {
          background: #fff;
          box-shadow: 0 12px 36px rgba(124,92,252,0.22);
        }
        .lf-cta-arrow {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(9,9,15,0.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 17px;
          transition: transform 0.3s;
        }
        .lf-cta:not(:disabled):hover .lf-cta-arrow { transform: translateX(3px); }
        .lf-cta:disabled .lf-cta-arrow {
          background: rgba(255,255,255,0.05);
          color: rgba(240,239,255,0.18);
        }
        .lf-spinner { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .lf-card { grid-template-columns: 1fr; }
          .lf-left {
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.06);
            padding: 40px 28px;
          }
          .lf-right { padding: 36px 28px; }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .lf-eyebrow-dot { animation: none; }
          .lf-input-glow { transition: none; }
          .lf-spinner { animation: none; }
        }
      `}</style>
    </div>
  );
}