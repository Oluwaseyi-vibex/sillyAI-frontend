import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useLearningStore } from '../store/learningStore';
import LessonExperience from '../components/LessonExperience';

export default function LessonPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { topic, lessons, backToPreview } = useLearningStore();

    const lessonId = Number(id);
    const lesson = lessons.find(l => l.id === lessonId);
    const currentIndex = lessons.findIndex(l => l.id === lessonId);

    if (!topic || !lesson) {
        return <Navigate to="/learn" replace />;
    }

    const handleBack = () => {
        backToPreview();
        navigate('/preview');
    };

    return (
        <div className="pt-8 pb-12">
            <LessonExperience
                lesson={lesson}
                totalLessons={lessons.length}
                currentIndex={currentIndex}
                onBack={handleBack}
            />
        </div>
    );
}