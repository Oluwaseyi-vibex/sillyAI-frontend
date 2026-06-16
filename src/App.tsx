// import { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, Outlet } from 'react-router-dom';
// import './App.css';
// import type { LearningState } from './types';
// import LearningForm from './components/LearningForm';
// import Sidebar from './components/Sidebar';
// import LearningPathPreview from './components/LearningPathPreview';
// import LessonExperience from './components/LessonExperience';
// import Home from './pages/home';
// import Login from './pages/login';
// import Signup from './pages/signup';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }
//   return <>{children}</>;
// }

// function PublicRoute({ children }: { children: React.ReactNode }) {
//   const token = localStorage.getItem('token');
//   if (token) {
//     return <Navigate to="/learn" replace />;
//   }
//   return <>{children}</>;
// }
// function DashboardLayout() {
//   return (
//     <div className="min-h-screen bg-[#09090b] text-[#fafafa] font-sans selection:bg-indigo-500/30">
//       <Sidebar />
//       <main className="md:ml-64 min-h-screen">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// function DashboardPage({ setLearningState }: { setLearningState: React.Dispatch<React.SetStateAction<LearningState>> }) {
//   const navigate = useNavigate();

//   const handleGenerate = (state: Omit<LearningState, 'status'>) => {
//     setLearningState({ ...state, status: 'preview' });
//     navigate('/preview');
//   };

//   return (
//     <div className="p-6">
//       <LearningForm onGenerate={handleGenerate} />
//     </div>
//   );
// }

// function PreviewPage({ learningState, setLearningState }: { learningState: LearningState, setLearningState: React.Dispatch<React.SetStateAction<LearningState>> }) {
//   const navigate = useNavigate();

//   if (!learningState.topic) {
//     return <Navigate to="/" replace />;
//   }
//   const handleStartLesson = () => {
//     setLearningState(prev => ({ ...prev, status: 'learning' }));
//     navigate('/lesson/1');
//   };
//   return (
//     <div className="pt-20 pb-12">
//       <LearningPathPreview
//         topic={learningState.topic}
//         onStartLesson={handleStartLesson}
//       />
//     </div>
//   );
// }
// function LessonPage({ learningState, setLearningState }: { learningState: LearningState, setLearningState: React.Dispatch<React.SetStateAction<LearningState>> }) {
//   const navigate = useNavigate();

//   if (!learningState.topic) {
//     return <Navigate to="/" replace />;
//   }
//   const handleBackToPath = () => {
//     setLearningState(prev => ({ ...prev, status: 'preview' }));
//     navigate('/preview');
//   };
//   return (
//     <div className="pt-8 pb-12">
//       <LessonExperience
//         state={learningState}
//         onBack={handleBackToPath}
//       />
//     </div>
//   );
// }
// function App() {
//   const [learningState, setLearningState] = useState<LearningState>({
//     topic: '',
//     level: 'Complete Beginner',
//     status: 'idle'
//   });
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
//         <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

//         <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
//           <Route path="/learn" element={<DashboardPage setLearningState={setLearningState} />} />
//           <Route path="/preview" element={<PreviewPage learningState={learningState} setLearningState={setLearningState} />} />
//           <Route path="/lesson/:id" element={<LessonPage learningState={learningState} setLearningState={setLearningState} />} />
//         </Route>
//       </Routes>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />

//     </Router>
//   );
// }
// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Sidebar from './components/Sidebar';
import DashboardPage from './components/LearningForm'; // we'll rename for clarity
import PreviewPage from './components/PreviewPage';
import LessonPage from './components/LessonPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyLessonsPage from './pages/MyLessonsPage';




function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] font-sans selection:bg-indigo-500/30">
      <Sidebar />
      <main className="md:ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  }

  function PublicRoute({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem('token');
    if (token) {
      return <Navigate to="/learn" replace />;
    }
    return <>{children}</>;
  }


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/learn" element={<DashboardPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/lesson/:id" element={<LessonPage />} />
          <Route path="/mylessons" element={<MyLessonsPage />} />   {/* ← new */}
        </Route>
      </Routes>
      <ToastContainer />
    </Router>

  );
}
export default App;