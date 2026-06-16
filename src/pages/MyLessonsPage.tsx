// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { BookOpen, Clock, ArrowRight } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { getAllLesson } from '../api/learn';
// import { useLearningStore } from '../store/learningStore';
// import type { Lesson } from '../types';

// // Shape of a single topic from the API
// interface TopicData {
//     topic: string;
//     level: string;
//     createdAt: string;
//     pathJson: {
//         lessons: Lesson[];
//     };
// }

// export default function MyLessonsPage() {
//     const [topics, setTopics] = useState<TopicData[]>([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();
//     const loadTopic = useLearningStore((s) => s.loadTopic);

//     useEffect(() => {
//         const user = localStorage.getItem('user');
//         if (user) {
//             getAllLesson(user)
//                 .then((response) => {
//                     // response.data is the array of topics
//                     const data = response.data;
//                     if (Array.isArray(data)) {
//                         setTopics(data);
//                     }
//                 })
//                 .catch(console.error)
//                 .finally(() => setLoading(false));
//         } else {
//             setLoading(false);
//         }
//     }, []);

//     const handleViewLessons = (topic: TopicData) => {
//         loadTopic(topic.topic, topic.level as any, topic.pathJson.lessons);
//         navigate('/preview');
//     };

//     // Loading state
//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <p className="text-zinc-400 animate-pulse">Loading your lessons...</p>
//             </div>
//         );
//     }

//     // Empty state
//     if (topics.length === 0) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-screen px-4">
//                 <BookOpen size={48} className="text-zinc-500 mb-4" />
//                 <h2 className="text-2xl font-bold text-white mb-2">No lessons yet</h2>
//                 <p className="text-zinc-400 mb-6">Generate your first learning path to get started!</p>
//                 <button
//                     onClick={() => navigate('/learn')}
//                     className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full font-medium transition-colors"
//                 >
//                     Create a Path
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-5xl mx-auto px-4 pt-8 pb-24">
//             <h1 className="text-3xl font-bold text-white mb-8">My Lessons</h1>
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {topics.map((topic, idx) => (
//                     <motion.div
//                         key={topic.createdAt || idx}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: idx * 0.05 }}
//                         className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-indigo-500/20 transition-all"
//                     >
//                         <div className="flex items-start justify-between mb-4">
//                             <div>
//                                 <h3 className="text-xl font-semibold text-white">{topic.topic}</h3>
//                                 <span className="text-xs text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-full uppercase">
//                                     {topic.level}
//                                 </span>
//                             </div>
//                             <div className="flex items-center text-zinc-400 text-sm">
//                                 <BookOpen size={16} className="mr-1" />
//                                 {topic.pathJson.lessons.length}
//                             </div>
//                         </div>
//                         <div className="flex items-center text-xs text-zinc-500 mb-4">
//                             <Clock size={14} className="mr-1" />
//                             {new Date(topic.createdAt).toLocaleDateString()}
//                         </div>
//                         <button
//                             onClick={() => handleViewLessons(topic)}
//                             className="w-full bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
//                         >
//                             View Lessons <ArrowRight size={16} />
//                         </button>
//                     </motion.div>
//                 ))}
//             </div>
//         </div>
//     );
// }
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllLesson } from '../api/learn';
import { useLearningStore } from '../store/learningStore';
import type { Lesson } from '../types';

interface TopicData {
    topic: string;
    level: string;
    createdAt: string;
    pathJson: { lessons: Lesson[] };
}

const LEVEL_COLOR: Record<string, string> = {
    'Complete Beginner': 'rgba(79,209,197,0.12)',
    'Student': 'rgba(124,92,252,0.12)',
    'Professional': 'rgba(240,180,80,0.12)',
};
const LEVEL_TEXT: Record<string, string> = {
    'Complete Beginner': 'rgba(79,209,197,0.85)',
    'Student': '#c4b5fd',
    'Professional': 'rgba(240,180,80,0.9)',
};

export default function MyLessonsPage() {
    const [topics, setTopics] = useState<TopicData[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const loadTopic = useLearningStore((s) => s.loadTopic);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            getAllLesson(user)
                .then((response) => {
                    const data = response.data;
                    if (Array.isArray(data)) setTopics(data);
                })
                .catch(console.error)
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const handleViewLessons = (topic: TopicData) => {
        loadTopic(topic.topic, topic.level as any, topic.pathJson.lessons);
        navigate('/preview');
    };

    // ── Loading ──
    if (loading) {
        return (
            <div className="page-root">
                <div className="page-center">
                    <div className="loading-dots">
                        {[0, 1, 2].map((i) => (
                            <span key={i} className="loading-dot" style={{ animationDelay: `${i * 0.18}s` }} />
                        ))}
                    </div>
                    <p className="loading-label">Loading your lessons</p>
                </div>
                <PageStyles />
            </div>
        );
    }

    // ── Empty state ──
    if (topics.length === 0) {
        return (
            <div className="page-root">
                <div className="page-center">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="empty-card"
                    >
                        <div className="empty-icon-wrap">
                            <Compass size={28} style={{ color: '#7c5cfc' }} />
                        </div>
                        <h2 className="empty-heading">No lessons yet</h2>
                        <p className="empty-sub">
                            Generate your first learning path and it'll appear here.
                        </p>
                        <button className="cta-btn" onClick={() => navigate('/learn')}>
                            <span>Create a path</span>
                            <span className="cta-arrow">→</span>
                        </button>
                    </motion.div>
                </div>
                <PageStyles />
            </div>
        );
    }

    // ── List ──
    return (
        <div className="page-root page-padded">
            {/* Ambient orb */}
            <div className="page-orb" />

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="page-header"
            >
                <p className="page-eyebrow">
                    <span className="eyebrow-dot" />
                    {topics.length} {topics.length === 1 ? 'path' : 'paths'}
                </p>
                <h1 className="page-heading">My Lessons</h1>
            </motion.div>

            <div className="lessons-grid">
                {topics.map((topic, idx) => (
                    <motion.div
                        key={topic.createdAt || idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.42, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                        className="lesson-card"
                    >
                        {/* Top row */}
                        <div className="card-top">
                            <span
                                className="level-badge"
                                style={{
                                    background: LEVEL_COLOR[topic.level] ?? 'rgba(124,92,252,0.12)',
                                    color: LEVEL_TEXT[topic.level] ?? '#c4b5fd',
                                }}
                            >
                                {topic.level}
                            </span>
                            <span className="lesson-count">
                                <BookOpen size={13} />
                                {topic.pathJson.lessons.length}
                            </span>
                        </div>

                        {/* Topic name */}
                        <h3 className="card-topic">{topic.topic}</h3>

                        {/* Date */}
                        <div className="card-date">
                            <Clock size={12} />
                            {new Date(topic.createdAt).toLocaleDateString('en-US', {
                                month: 'short', day: 'numeric', year: 'numeric',
                            })}
                        </div>

                        {/* Divider */}
                        <div className="card-divider" />

                        {/* CTA */}
                        <button
                            className="card-btn"
                            onClick={() => handleViewLessons(topic)}
                        >
                            <span>View lessons</span>
                            <ArrowRight size={15} />
                        </button>
                    </motion.div>
                ))}
            </div>

            <PageStyles />
        </div>
    );
}

function PageStyles() {
    return (
        <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');

      .page-root {
        min-height: 100vh;
        background: #09090f;
        position: relative;
        overflow-x: hidden;
        font-family: 'Inter', sans-serif;
      }
      .page-padded {
        max-width: 960px;
        margin: 0 auto;
        padding: 56px 28px 80px;
      }

      .page-orb {
        position: fixed;
        width: 560px; height: 560px;
        top: -180px; right: -180px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(124,92,252,0.13) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
      }

      /* ── Header ── */
      .page-header { position: relative; z-index: 1; margin-bottom: 40px; }
      .page-eyebrow {
        display: flex;
        align-items: center;
        gap: 7px;
        font-size: 10.5px;
        font-weight: 500;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: rgba(124,92,252,0.85);
        margin: 0 0 10px;
      }
      .eyebrow-dot {
        width: 6px; height: 6px;
        border-radius: 50%;
        background: #7c5cfc;
        display: inline-block;
        animation: pulse-dot 2s ease-in-out infinite;
      }
      @keyframes pulse-dot {
        0%,100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(0.6); }
      }
      .page-heading {
        font-family: 'Syne', sans-serif;
        font-weight: 800;
        font-size: clamp(1.75rem, 3vw, 2.4rem);
        letter-spacing: -0.03em;
        color: #f0efff;
        margin: 0;
      }

      /* ── Grid ── */
      .lessons-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
        gap: 16px;
        position: relative;
        z-index: 1;
      }

      /* ── Card ── */
      .lesson-card {
        background: rgba(255,255,255,0.028);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 20px;
        padding: 22px 22px 20px;
        display: flex;
        flex-direction: column;
        gap: 0;
        transition: border-color 0.22s, background 0.22s;
      }
      .lesson-card:hover {
        background: rgba(255,255,255,0.042);
        border-color: rgba(124,92,252,0.28);
      }

      .card-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 14px;
      }
      .level-badge {
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        padding: 4px 10px;
        border-radius: 999px;
      }
      .lesson-count {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 12px;
        color: rgba(240,239,255,0.3);
      }

      .card-topic {
        font-family: 'Syne', sans-serif;
        font-weight: 700;
        font-size: 1.05rem;
        letter-spacing: -0.02em;
        color: #f0efff;
        margin: 0 0 10px;
        line-height: 1.3;
      }

      .card-date {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 11px;
        color: rgba(240,239,255,0.25);
        margin-bottom: 18px;
      }

      .card-divider {
        height: 1px;
        background: rgba(255,255,255,0.06);
        margin-bottom: 16px;
      }

      .card-btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 10px 14px;
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.07);
        background: rgba(255,255,255,0.04);
        color: rgba(240,239,255,0.55);
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }
      .card-btn:hover {
        background: rgba(124,92,252,0.12);
        border-color: rgba(124,92,252,0.35);
        color: #c4b5fd;
      }

      /* ── Loading ── */
      .page-center {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
      }
      .loading-dots { display: flex; gap: 7px; }
      .loading-dot {
        width: 7px; height: 7px;
        border-radius: 50%;
        background: #7c5cfc;
        display: inline-block;
        animation: bounce-dot 1.1s ease-in-out infinite;
      }
      @keyframes bounce-dot {
        0%,80%,100% { transform: scale(0.6); opacity: 0.35; }
        40% { transform: scale(1); opacity: 1; }
      }
      .loading-label {
        font-size: 13px;
        color: rgba(240,239,255,0.28);
        letter-spacing: 0.04em;
        margin: 0;
      }

      /* ── Empty state ── */
      .empty-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        max-width: 320px;
        text-align: center;
      }
      .empty-icon-wrap {
        width: 60px; height: 60px;
        border-radius: 18px;
        background: rgba(124,92,252,0.1);
        border: 1px solid rgba(124,92,252,0.25);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 4px;
      }
      .empty-heading {
        font-family: 'Syne', sans-serif;
        font-weight: 800;
        font-size: 1.5rem;
        letter-spacing: -0.025em;
        color: #f0efff;
        margin: 0;
      }
      .empty-sub {
        font-size: 14px;
        color: rgba(240,239,255,0.38);
        line-height: 1.65;
        margin: 0 0 8px;
      }
      .cta-btn {
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
        transition: background 0.2s, box-shadow 0.3s, transform 0.2s;
        width: 100%;
        margin-top: 4px;
      }
      .cta-btn:hover {
        background: #fff;
        box-shadow: 0 10px 30px rgba(124,92,252,0.22);
        transform: translateY(-1px);
      }
      .cta-arrow {
        width: 28px; height: 28px;
        border-radius: 50%;
        background: rgba(9,9,15,0.1);
        display: flex; align-items: center; justify-content: center;
        font-size: 15px;
      }

      @media (prefers-reduced-motion: reduce) {
        .eyebrow-dot, .loading-dot { animation: none; }
      }
    `}</style>
    );
}