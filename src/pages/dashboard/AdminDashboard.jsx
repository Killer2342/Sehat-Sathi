import React, { useState, useEffect } from 'react'
import { Header } from '../../components/layout/Header'
import { Footer } from '../../components/layout/Footer'
import { Card, CardContent, CardHeader } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { 
  Users, Calendar, ShieldCheck, Activity, 
  Search, Bell, MoreVertical, CheckCircle, 
  XCircle, Filter, MapPin, Stethoscope, TrendingUp
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { supabase } from '../../lib/supabase'

export default function AdminDashboard() {
  const [pendingDoctors, setPendingDoctors] = useState([])
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
    pendingApprovals: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      // Fetch stats
      const { count: doctorsCount } = await supabase.from('doctors').select('*', { count: 'exact', head: true })
      const { count: patientsCount } = await supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'patient')
      const { count: appointmentsCount } = await supabase.from('appointments').select('*', { count: 'exact', head: true })
      const { data: pendingDocs, count: pendingCount } = await supabase.from('doctors').select('*', { count: 'exact' }).eq('status', 'pending')

      setStats({
        totalDoctors: doctorsCount || 0,
        totalPatients: patientsCount || 0,
        totalAppointments: appointmentsCount || 0,
        pendingApprovals: pendingCount || 0
      })
      setPendingDoctors(pendingDocs || [])
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = async (id) => {
    try {
      const { error } = await supabase
        .from('doctors')
        .update({ status: 'approved' })
        .eq('id', id)

      if (error) throw error
      
      toast.success('Doctor approved successfully!')
      fetchData()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleReject = async (id) => {
    try {
      const { error } = await supabase
        .from('doctors')
        .update({ status: 'rejected' })
        .eq('id', id)

      if (error) throw error
      
      toast.error('Doctor registration rejected.')
      fetchData()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900">Admin Command Center</h1>
            <p className="text-slate-500 text-lg font-medium">Platform overview and management.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-slate-50">
                3
              </div>
              <Button variant="secondary" className="p-3">
                <Bell size={24} />
              </Button>
            </div>
            <Button className="gap-2">
              <Activity size={20} />
              Platform Stats
            </Button>
          </div>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Doctors', value: stats.totalDoctors, icon: Stethoscope, color: 'blue', sub: 'Verified & Pending' },
            { label: 'Total Patients', value: stats.totalPatients, icon: Users, color: 'teal', sub: 'Active accounts' },
            { label: 'Appointments', value: stats.totalAppointments, icon: Calendar, color: 'primary', sub: 'Total bookings' },
            { label: 'Pending Approval', value: stats.pendingApprovals, icon: ShieldCheck, color: 'amber', sub: 'Action required' },
          ].map((stat) => (
            <Card key={stat.label} className="p-8 border-none shadow-premium flex flex-col gap-4 group hover:bg-slate-900 transition-all duration-500">
              <div className={`w-14 h-14 bg-${stat.color}-100 rounded-2xl flex items-center justify-center text-${stat.color}-600 group-hover:bg-white/10 group-hover:text-white transition-all`}>
                <stat.icon size={28} />
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900 group-hover:text-white transition-all">{stat.value}</div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider group-hover:text-slate-500 transition-all mb-2">{stat.label}</div>
                <div className={`text-xs font-bold text-${stat.color}-600 group-hover:text-${stat.color}-400`}>{stat.sub}</div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Doctors Table */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-premium overflow-hidden">
              <CardHeader className="p-8 border-b border-slate-50 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Pending Doctor Approvals</h2>
                <Badge variant="warning">{pendingDoctors.length} New Requests</Badge>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                        <th className="px-8 py-4">Doctor Info</th>
                        <th className="px-8 py-4">Specialty</th>
                        <th className="px-8 py-4">Applied</th>
                        <th className="px-8 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {pendingDoctors.map((doc) => (
                        <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-slate-400 text-lg">
                                {doc.name.charAt(4)}
                              </div>
                              <div>
                                <p className="font-bold text-slate-900">{doc.name}</p>
                                <p className="text-sm text-slate-400 font-medium flex items-center gap-1">
                                  <MapPin size={12} />
                                  {doc.city}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <Badge variant="primary" className="bg-primary-50 text-primary-600 border-primary-100">
                              {doc.specialty}
                            </Badge>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-sm text-slate-500 font-medium">{doc.date}</span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button 
                                size="sm" 
                                className="bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/20"
                                onClick={() => handleApprove(doc.id)}
                              >
                                Approve
                              </Button>
                              <Button 
                                variant="secondary" 
                                size="sm" 
                                className="text-red-500 hover:bg-red-50 border-transparent hover:border-red-100"
                                onClick={() => handleReject(doc.id)}
                              >
                                Reject
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

            {/* Recent Appointments */}
            <Card className="border-none shadow-premium overflow-hidden">
              <CardHeader className="p-8 border-b border-slate-50 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Recent Platform Activity</h2>
                <Button variant="ghost" size="sm" className="text-primary-600 font-bold">View Logs</Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-8 space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between gap-6 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
                          <CheckCircle size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">Appointment Completed</p>
                          <p className="text-sm text-slate-500">Ali Khan visited Dr. Imran Khattak</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-900">Rs. 1,200</p>
                        <p className="text-xs text-slate-400">15 mins ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Platform Health Sidebar */}
          <div className="space-y-6">
            <Card className="p-8 border-none shadow-premium bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">
              <div className="absolute -bottom-6 -right-6 p-8 opacity-10">
                <TrendingUp size={140} />
              </div>
              <div className="relative z-10 space-y-6">
                <h3 className="text-xl font-bold">Platform Revenue</h3>
                <div>
                  <div className="text-5xl font-black mb-2">Rs. 2.4M</div>
                  <p className="text-slate-400 font-medium">Total consultation volume</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Commission</p>
                    <p className="text-lg font-bold">Rs. 240k</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Growth</p>
                    <p className="text-lg font-bold text-green-400">+18%</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-none shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900">Manage Categories</h3>
              <div className="space-y-3">
                {['Specialties', 'Cities', 'Pricing Tiers', 'AI Rules'].map(cat => (
                  <button key={cat} className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary-200 hover:bg-white transition-all group">
                    <span className="font-bold text-slate-700 group-hover:text-primary-600">{cat}</span>
                    <MoreVertical size={18} className="text-slate-400" />
                  </button>
                ))}
              </div>
              <Button variant="outline" className="w-full">System Settings</Button>
            </Card>

            <div className="p-8 bg-primary-50 rounded-3xl border border-primary-100 space-y-4">
              <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
                <Activity size={24} />
              </div>
              <h4 className="text-xl font-bold text-primary-900">System Health</h4>
              <p className="text-primary-700 text-sm leading-relaxed">
                All systems are operational. AI Assistant response time is stable at <span className="font-bold">1.2s</span>.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
