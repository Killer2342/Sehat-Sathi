import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import Home from './pages/Home'
import FindDoctors from './pages/FindDoctors'
import DoctorProfile from './pages/DoctorProfile'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import DoctorSignUp from './pages/auth/DoctorSignUp'
import PatientDashboard from './pages/dashboard/PatientDashboard'
import DoctorDashboard from './pages/dashboard/DoctorDashboard'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import AIAssistant from './pages/AIAssistant'
import ForDoctors from './pages/ForDoctors'

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/find-doctors" element={<FindDoctors />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="/doctors" element={<ForDoctors />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        
        {/* Auth Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/doctors/signup" element={<DoctorSignUp />} />
        
        {/* Dashboard Routes (Protected) */}
        <Route 
          path="/dashboard/patient" 
          element={
            <ProtectedRoute role="patient">
              <PatientDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/doctor" 
          element={
            <ProtectedRoute role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/admin" 
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  )
}

export default App
