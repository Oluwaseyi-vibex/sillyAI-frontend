import { create } from 'zustand';
import type { Lesson, LearningState, LearningLevel } from '../types'; // Import LearningLevel
import axiosInstance from '../lib/axiosInstance';

interface LearningStore extends LearningState {
    generatePath: (topic: string, level: LearningLevel) => Promise<void>;  // ← narrowed
    startLesson: (lessonId: number) => void;
    backToPreview: () => void;
    fetchLessons: (userId: string) => Promise<void>;
    reset: () => void;
    loadTopic: (topic: string, level: LearningLevel, lessons: Lesson[]) => void;
}

const initialState: LearningState = {
    topic: '',
    level: 'Complete Beginner',
    status: 'idle',
    lessons: [],
    currentLessonId: undefined,
};

export const useLearningStore = create<LearningStore>((set) => ({
    ...initialState,
    loadTopic: (topic, level, lessons) =>
        set({
            topic,
            level,
            lessons,
            status: 'preview',
            currentLessonId: undefined,
        }),
    // generatePath now requires level: LearningLevel
    generatePath: async (topic, level) => {
        set({ topic, level, status: 'generating', lessons: [], currentLessonId: undefined });

        // try {
        const response = await axiosInstance.post('/api/v1/learn/generate-path', { topic, level });
        const rawData = response.data.data;
        const path = Array.isArray(rawData) ? rawData[0] : rawData;
        const lessons: Lesson[] = path?.pathJson?.lessons || [];

        localStorage.setItem('learningPath', JSON.stringify({ topic, level, lessons }));

        set({ lessons, status: 'preview' });
        // } catch (error) {
        //     console.error(error);
        //     set({ status: 'idle' }); // or handle error state
        // }
    },

    startLesson: (lessonId) => {
        set({ currentLessonId: lessonId, status: 'learning' });
    },

    backToPreview: () => {
        set({ status: 'preview', currentLessonId: undefined });
    },

    fetchLessons: async (userId) => {
        try {
            const response = await axiosInstance.get(`/api/v1/learn/getAllLesson/${userId}`);
            const rawData = response.data.data;
            const path = Array.isArray(rawData) ? rawData[0] : rawData;
            const lessons: Lesson[] = path?.pathJson?.lessons || [];

            if (lessons.length > 0) {
                const topic = path?.topic || '';
                const level: LearningLevel = (path?.level as LearningLevel) || 'Complete Beginner'; // cast
                set({ topic, level, lessons, status: 'preview' });
                localStorage.setItem('learningPath', JSON.stringify({ topic, level, lessons }));
            }
        } catch (error) {
            console.error('Failed to fetch lessons', error);
        }
    },

    reset: () => set(initialState),
}));