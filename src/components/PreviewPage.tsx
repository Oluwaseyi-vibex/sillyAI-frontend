import { useNavigate, Navigate } from 'react-router-dom';
import { useLearningStore } from '../store/learningStore';
import LearningPathPreview from '../components/LearningPathPreview';

export default function PreviewPage() {
    const navigate = useNavigate();
    const { topic, lessons, startLesson } = useLearningStore();

    // ✅ Always return a JSX element
    if (!topic) {
        return <Navigate to="/learn" replace />;
    }

    const handleStartLesson = () => {
        if (lessons.length > 0) {
            startLesson(lessons[0].id);
            navigate(`/lesson/${lessons[0].id}`);
        }
    };
    console.log('PreviewPage - topic:', topic, 'lessons:', lessons);
    return (
        <div className="pt-20 pb-12">

            <LearningPathPreview topic={topic} onStartLesson={handleStartLesson} />
        </div>
    );
}