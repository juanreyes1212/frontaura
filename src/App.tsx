import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ProgressContext } from './context/ProgressContext'
import { useProgress } from './hooks/useProgress'
import Dashboard from './pages/Dashboard'
import Curriculum from './pages/Curriculum'
import TopicDetail from './pages/TopicDetail'
import Progress from './pages/Progress'
import Projects from './pages/Projects'
import Settings from './pages/Settings'

export default function App() {
  const progress = useProgress()

  return (
    <ProgressContext.Provider value={progress}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="curriculum" element={<Curriculum />} />
            <Route path="curriculum/:phaseId/:topicId" element={<TopicDetail />} />
            <Route path="progress" element={<Progress />} />
            <Route path="projects" element={<Projects />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProgressContext.Provider>
  )
}
