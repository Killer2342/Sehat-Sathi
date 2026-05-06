import React, { useState, useEffect } from 'react'
import { Header } from '../../components/layout/Header'
import { Footer } from '../../components/layout/Footer'
import { Card, CardContent, CardHeader } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Input, Select } from '../../components/ui/Input'
import { 
  Users, Calendar, Clock, TrendingUp, CheckCircle, XCircle, 
  Settings, User, Camera, LogOut, MoreVertical, Bell, Filter
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

export default function DoctorDashboard() {
  const { user, profile } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [doctorInfo, setDoctorInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchDoctorData()
    }
  }, [user])

  const fetchDoctorData = async () => {
    setIsLoading(true)
    try {
      // Get doctor profile
      const { data: docData, error: docError } = await supabase
        .from('doctors')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (docError) throw docError
      setDoctorInfo(docData)

      // Get appointments
      const { data: aptData, error: aptError } = await supabase
        .from('appointments')
        .select('*')
        .eq('doctor_id', docData.id)
        .order('created_at', { ascending: false })

      if (aptError) throw aptError
      setAppointments(aptData || [])
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error
      
      toast.success(`Appointment ${newStatus.toLowerCase()}`)
      fetchDoctorData()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-72 space-y-6">
            <Card className="overflow-hidden border-none shadow-premium">
              <div className="p-8 text-center bg-slate-900 text-white relative">
                <div className="absolute top-4 right-4 text-primary-400">
                  <CheckCircle size={20} fill="currentColor" className="text-primary-500" />
                </div>
                <div className="relative inline-block mb-4">
                  <img 
                    src={doctorInfo?.profile_image || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400"} 
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-slate-800 shadow-xl"
                    alt="Doctor"
                  />
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white border-4 border-slate-900">
                    <Camera size={14} />
                  </button>
                </div>
                <h3 className="text-xl font-bold">{doctorInfo?.name || 'Dr. Name'}</h3>
                <p className="text-slate-400 text-sm font-medium">{doctorInfo?.specialty} • {doctorInfo?.city}</p>
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-slate-400">Status</span>
                    <Badge variant={doctorInfo?.status === 'approved' ? 'success' : 'warning'} className="bg-white/10 text-white border-none">
                      {doctorInfo?.status}
                    </Badge>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 w-[92%]" />
                  </div>
                </div>
              </div>
              <nav className="p-4 space-y-1">
                {[
                  { icon: TrendingUp, label: 'Overview', active: true },
                  { icon: Calendar, label: 'Appointments' },
                  { icon: Clock, label: 'Manage Availability' },
                  { icon: User, label: 'Edit Profile' },
                  { icon: Settings, label: 'Settings' },
                ].map((item) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                      item.active ? 'bg-primary-50 text-primary-600' : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <item.icon size={20} />
                    {item.label}
                  </button>
                ))}
                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-all pt-8 border-t border-slate-50 mt-4">
                  <LogOut size={20} />
                  Sign Out
                </button>
              </nav>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
              <div className="flex items-center gap-3">
                <Button variant="secondary" size="sm" className="gap-2">
                  <Filter size={18} />
                  Filters
                </Button>
                <Button size="sm" className="gap-2">
                  <Calendar size={18} />
                  Today
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Appointments', value: appointments.length, icon: Calendar, color: 'blue', trend: 'Lifetime', up: true },
                { label: 'Today Appointments', value: appointments.filter(a => a.appointment_date === new Date().toISOString().split('T')[0]).length, icon: Calendar, color: 'teal', trend: 'Daily', up: true },
                { label: 'Pending Requests', value: appointments.filter(a => a.status === 'pending').length, icon: Clock, color: 'amber', trend: 'Action', up: false },
                { label: 'Confirmed', value: appointments.filter(a => a.status === 'confirmed').length, icon: CheckCircle, color: 'primary', trend: 'Active', up: true },
              ].map((stat) => (
                <Card key={stat.label} className="p-8 border-none shadow-soft flex flex-col gap-6 group hover:bg-slate-900 transition-all duration-500">
                  <div className="flex justify-between items-start">
                    <div className={`w-14 h-14 bg-${stat.color}-50 rounded-2xl flex items-center justify-center text-${stat.color}-600 group-hover:bg-white/10 group-hover:text-white transition-all duration-500`}>
                      <stat.icon size={28} />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${stat.up ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'} group-hover:bg-white/5`}>
                      {stat.trend}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-slate-900 group-hover:text-white transition-all duration-500">{stat.value}</div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-widest group-hover:text-slate-500 transition-all duration-500">{stat.label}</div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Performance Chart Placeholder */}
            <Card className="p-8 border-none shadow-soft">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Patient Growth Analytics</h3>
                  <p className="text-sm text-slate-500">Monthly patient visit overview</p>
                </div>
                <Select className="w-40 py-2 text-sm" defaultValue="This Month">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>Last 6 Months</option>
                </Select>
              </div>
              <div className="h-64 flex items-end gap-3 px-4">
                {[40, 60, 45, 90, 65, 80, 55, 70, 85, 60, 75, 95].map((h, i) => (
                  <div key={i} className="flex-1 group relative">
                    <div 
                      className="w-full bg-slate-100 rounded-t-lg group-hover:bg-primary-500 transition-all duration-500 cursor-pointer"
                      style={{ height: `${h}%` }}
                    />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {h*10} pts
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-6 px-4">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                  <span key={m} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m}</span>
                ))}
              </div>
            </Card>

            {/* Appointment Requests */}
            <Card className="border-none shadow-premium overflow-hidden">
              <CardHeader className="p-8 border-b border-slate-50 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Recent Appointment Requests</h2>
                <Badge variant="primary">5 Pending</Badge>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-wider">
                        <th className="px-8 py-4">Patient</th>
                        <th className="px-8 py-4">Date & Time</th>
                        <th className="px-8 py-4">Reason</th>
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {appointments.map((apt) => (
                        <tr key={apt.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-400">
                                {apt.patient_name.charAt(0)}
                              </div>
                              <span className="font-bold text-slate-900">{apt.patient_name}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="space-y-0.5">
                              <p className="font-bold text-slate-900">{apt.appointment_date}</p>
                              <p className="text-sm text-slate-400 font-medium">{apt.appointment_time}</p>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-slate-600 font-medium">{apt.symptoms || 'General Checkup'}</span>
                          </td>
                          <td className="px-8 py-6">
                            <Badge variant={apt.status === 'pending' ? 'warning' : 'primary'}>
                              {apt.status}
                            </Badge>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {apt.status === 'pending' && (
                                <>
                                  <Button 
                                    size="sm" 
                                    className="h-9 px-4 bg-green-500 hover:bg-green-600"
                                    onClick={() => handleStatusChange(apt.id, 'confirmed')}
                                  >
                                    Accept
                                  </Button>
                                  <Button 
                                    variant="secondary" 
                                    size="sm" 
                                    className="text-red-500 hover:bg-red-50 hover:border-red-200"
                                    onClick={() => handleStatusChange(apt.id, 'rejected')}
                                  >
                                    Reject
                                  </Button>
                                </>
                              )}
                              {apt.status === 'confirmed' && (
                                <Button 
                                  size="sm" 
                                  className="h-9 px-4 bg-blue-500 hover:bg-blue-600"
                                  onClick={() => handleStatusChange(apt.id, 'completed')}
                                >
                                  Mark Completed
                                </Button>
                              )}
                              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                                <MoreVertical size={18} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions / Schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-8 border-none shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Clock size={20} className="text-primary-500" />
                  Availability Today
                </h3>
                <div className="space-y-4">
                  {[
                    { slot: '09:00 AM - 12:00 PM', status: 'Active', color: 'green' },
                    { slot: '02:00 PM - 05:00 PM', status: 'Active', color: 'green' },
                    { slot: '06:00 PM - 09:00 PM', status: 'Off', color: 'slate' },
                  ].map((s) => (
                    <div key={s.slot} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="font-bold text-slate-700">{s.slot}</span>
                      <div className="flex items-center gap-3">
                        <Badge variant={s.color === 'green' ? 'success' : 'gray'}>{s.status}</Badge>
                        <button className="text-slate-400 hover:text-primary-500 transition-colors">
                          <Settings size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4">Manage All Slots</Button>
                </div>
              </Card>

              <Card className="p-8 border-none shadow-sm bg-primary-600 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-20">
                  <TrendingUp size={120} />
                </div>
                <div className="relative z-10 space-y-6">
                  <h3 className="text-lg font-bold">Monthly Revenue</h3>
                  <div>
                    <div className="text-4xl font-black mb-2">Rs. 142,500</div>
                    <p className="text-primary-100 text-sm font-medium flex items-center gap-2">
                      <TrendingUp size={16} />
                      +12% from last month
                    </p>
                  </div>
                  <div className="pt-4">
                    <Button variant="secondary" className="w-full bg-white text-primary-600 border-none font-bold">
                      View Detailed Analytics
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  )
}
