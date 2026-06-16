import { motion } from 'framer-motion';
import {
  Lightbulb,
  Image as ImageIcon,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Sparkles,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLearningStore } from '../store/learningStore';
import type { Lesson } from '../types';

interface LessonExperienceProps {
  lesson: Lesson;            // the current lesson object
  totalLessons: number;      // total number of lessons in the path
  currentIndex: number;      // 0‑based index of this lesson
  onBack: () => void;
}

export default function LessonExperience({
  lesson,
  totalLessons,
  currentIndex,
  onBack,
}: LessonExperienceProps) {
  const navigate = useNavigate();
  const { startLesson, lessons } = useLearningStore();

  const { content, title, resources } = lesson;

  // Calculate progress
  const lessonNumber = currentIndex + 1;
  const progress = Math.round((lessonNumber / totalLessons) * 100);

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < lessons.length) {
      const nextLesson = lessons[nextIndex];
      startLesson(nextLesson.id);
      navigate(`/lesson/${nextLesson.id}`);
    }
    // Optional: if last lesson, maybe navigate to a completion page
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pb-24 pt-6">
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="text-zinc-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <ArrowLeft size={16} /> Back to Path
        </button>
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-zinc-300">
            Lesson {lessonNumber} of {totalLessons}
          </div>
          <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm font-bold text-indigo-400">{progress}%</div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Title & Level */}
        <div className="mb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
            {/* You can show level from store if needed – here just a placeholder */}
            {useLearningStore.getState().level}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            {title}
          </h1>
        </div>

        {/* Main Lesson Content */}
        <div className="glass-panel rounded-3xl p-8 md:p-10 space-y-10 shadow-2xl relative overflow-hidden">
          {/* Simple Explanation */}
          {content.simpleExplanation && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-2">
                <BrainCircuit size={20} />
                <h2>The Simple Explanation</h2>
              </div>
              <p className="text-lg text-zinc-300 leading-relaxed">
                {content.simpleExplanation}
              </p>
            </section>
          )}

          {/* Analogy */}
          {content.analogy && (
            <section className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 text-indigo-500/20 pointer-events-none">
                <Sparkles size={100} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-indigo-300 font-semibold mb-3">
                  <Lightbulb size={20} />
                  <h3>The Analogy</h3>
                </div>
                <p className="text-xl text-white font-medium leading-relaxed">
                  “{content.analogy}”
                </p>
              </div>
            </section>
          )}

          {/* Real Life Example */}
          {content.realLifeExample && (
            <section className="bg-[#18181b] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-3">
                <ImageIcon size={20} />
                <h3>Real-Life Example</h3>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                {content.realLifeExample}
              </p>
            </section>
          )}

          {/* Key Takeaways */}
          {content.keyTakeaways?.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                Key Takeaways
              </h3>
              <ul className="space-y-3">
                {content.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      className="text-indigo-400 mt-0.5 shrink-0"
                    />
                    <span className="text-zinc-300">{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Resources */}
          {resources?.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                {resources.map((url, idx) => (
                  <li key={idx}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors text-sm"
                    >
                      <ExternalLink size={16} />
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors text-sm">
            Explain Simpler
          </button>
          <button className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors text-sm">
            Give Another Analogy
          </button>
          <button className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors text-sm">
            Quiz Me
          </button>
          <div className="flex-1" />
          {currentIndex + 1 < totalLessons && (
            <button
              onClick={handleNext}
              className="bg-white text-black hover:bg-zinc-200 px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-transform hover:scale-[1.02] shadow-xl"
            >
              Next Lesson <ArrowRight size={18} />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}