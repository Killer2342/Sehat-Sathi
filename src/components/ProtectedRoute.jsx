import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const ProtectedRoute = ({ children, role }) => {
  const { user, profile, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  if (role && profile?.role !== role) {
    // Redirect to their own dashboard if role doesn't match
    if (profile?.role === 'patient') return <Navigate to="/dashboard/patient" replace />
    if (profile?.role === 'doctor') return <Navigate to="/dashboard/doctor" replace />
    if (profile?.role === 'admin') return <Navigate to="/dashboard/admin" replace />
    return <Navigate to="/" replace />
  }

  return children
}
