import React, { useState, useEffect } from 'react'
import { Header } from '../../components/layout/Header'
import { Footer } from '../../components/layout/Footer'
import { Card, CardContent, CardHeader } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Calendar, Clock, MapPin, Search, User, LogOut, ChevronRight, Activity, Bell } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-hot-toast'

export default function PatientDashboard() {
  const { user, profile } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchAppointments()
    }
  }, [user])

  const fetchAppointments = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*, doctors(*)')
        .eq('patient_id', user.id)
        .order('appointment_date', { ascending: false })

      if (error) throw error
      setAppointments(data || [])
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = async (id) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: 'cancelled' })
        .eq('id', id)

      if (error) throw error
      toast.success('Appointment cancelled')
      fetchAppointments()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-6">
            <Card className="overflow-hidden border-none shadow-premium">
              <div className="p-8 text-center bg-primary-600 text-white">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                  <User size={40} />
                </div>
                <h3 className="text-xl font-bold">Ali Khan</h3>
                <p className="text-primary-100 text-sm">Patient ID: #SS-9241</p>
              </div>
              <nav className="p-4 space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary-50 text-primary-600 rounded-xl font-bold transition-all">
                  <Activity size={20} />
                  My Dashboard
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-medium transition-all">
                  <Calendar size={20} />
                  Appointments
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-medium transition-all">
                  <User size={20} />
                  My Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-all pt-8 border-t border-slate-50 mt-4">
                  <LogOut size={20} />
                  Sign Out
                </button>
              </nav>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-teal-500 to-emerald-600 text-white border-none shadow-premium">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bell size={20} />
                </div>
                <h4 className="font-bold">Need assistance?</h4>
                <p className="text-teal-50 text-sm leading-relaxed">Our AI assistant can help you find the right specialist.</p>
                <Link to="/ai-assistant" className="block">
                  <Button variant="secondary" size="sm" className="w-full bg-white text-teal-600 border-none font-bold">
                    Start AI Chat
                  </Button>
                </Link>
              </div>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Welcome back, Ali!</h1>
                <p className="text-slate-500">Manage your appointments and healthcare needs.</p>
              </div>
              <Link to="/find-doctors">
                <Button className="gap-2">
                  <Search size={18} />
                  Find New Doctor
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card className="p-6 border-none shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                  <Calendar size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">1</div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Upcoming</div>
                </div>
              </Card>
              <Card className="p-6 border-none shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                  <Activity size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">12</div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Visited</div>
                </div>
              </Card>
              <Card className="p-6 border-none shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                  <Star size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">4</div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Pending Reviews</div>
                </div>
              </Card>
            </div>

            {/* Upcoming Appointments */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Your Appointments</h2>
                <Button variant="ghost" size="sm" className="text-primary-600 font-bold">View History</Button>
              </div>

              <div className="space-y-4">
                {appointments.map((apt) => (
                  <Card key={apt.id} className="p-6 border-none shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-slate-400 text-xl group-hover:bg-primary-50 group-hover:text-primary-500 transition-colors">
                          {apt.doctor.charAt(4)}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-lg font-bold text-slate-900">{apt.doctors?.name || 'Doctor'}</h4>
                          <p className="text-sm text-primary-600 font-semibold">{apt.doctors?.specialty || 'General'}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium pt-1">
                            <span className="flex items-center gap-1">
                              <MapPin size={14} />
                              {apt.doctors?.clinic_name || 'Clinic'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="text-left md:text-right">
                          <div className="flex items-center md:justify-end gap-2 font-bold text-slate-900">
                            <Calendar size={16} className="text-primary-500" />
                            {apt.appointment_date}
                          </div>
                          <div className="flex items-center md:justify-end gap-2 font-bold text-slate-500">
                            <Clock size={16} className="text-primary-500" />
                            {apt.appointment_time}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                          <Badge variant={apt.status === 'pending' || apt.status === 'confirmed' ? 'primary' : 'success'} className="px-4 py-2">
                            {apt.status}
                          </Badge>
                          {(apt.status === 'pending' || apt.status === 'confirmed') && (
                            <Button variant="danger" size="sm" className="px-4" onClick={() => handleCancel(apt.id)}>Cancel</Button>
                          )}
                          <Button variant="secondary" size="sm" className="p-2">
                            <ChevronRight size={20} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Profile Info */}
            <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50 p-6 flex flex-row items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Health Profile</h2>
                <Button variant="outline" size="sm">Edit Profile</Button>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Blood Group</p>
                    <p className="text-lg font-bold text-slate-900">B+ Positive</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Last Checkup</p>
                    <p className="text-lg font-bold text-slate-900">April 28, 2026</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Chronic Conditions</p>
                    <p className="text-lg font-bold text-slate-900">None Reported</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  )
}
