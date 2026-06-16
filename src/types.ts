export type LearningLevel = 'Complete Beginner' | 'Student' | 'Professional';

export interface LearningState {
  topic: string;
  level: LearningLevel;
  status: 'idle' | 'generating' | 'preview' | 'learning';
}

// types.ts
export interface LessonContent {
  analogy: string;
  keyTakeaways: string[];
  realLifeExample: string;
  simpleExplanation: string;
}

export interface Lesson {
  id: number;
  title: string;
  content: LessonContent;
  resources: string[];
}

export interface LearningState {
  topic: string;
  level: LearningLevel;
  status: 'idle' | 'generating' | 'preview' | 'learning';
  lessons: Lesson[];
  currentLessonId?: number;
}