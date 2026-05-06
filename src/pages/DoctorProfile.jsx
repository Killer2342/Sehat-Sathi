import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Input, Select } from '../components/ui/Input'
import { Star, Clock, MapPin, Calendar, ShieldCheck, Stethoscope, Award, GraduationCap, Phone, Mail, Info, ChevronRight, MessageSquare, Sparkles, BookOpen, Languages, Globe } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function DoctorProfile() {
  const { id } = useParams()
  const { user, profile } = useAuth()
  const [doctor, setDoctor] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSlot, setSelectedSlot] = useState('')
  const [bookingStep, setBookingStep] = useState(1) // 1: Info, 2: Success
  const [bookingLoading, setBookingStepLoading] = useState(false)
  const [patientData, setPatientData] = useState({
    name: '',
    phone: '',
    email: '',
    symptoms: ''
  })

  useEffect(() => {
    fetchDoctor()
    if (profile) {
      setPatientData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        symptoms: ''
      })
    }
  }, [id, profile])

  const fetchDoctor = async () => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setDoctor(data)
    } catch (error) {
      console.error('Error fetching doctor:', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBooking = async (e) => {
    e.preventDefault()
    if (!user) {
      toast.error('Please sign in to book an appointment')
      return
    }
    if (!selectedSlot) {
      toast.error('Please select a time slot')
      return
    }

    setBookingStepLoading(true)
    try {
      const { error } = await supabase
        .from('appointments')
        .insert([
          {
            doctor_id: id,
            patient_id: user.id,
            patient_name: patientData.name,
            patient_phone: patientData.phone,
            patient_email: patientData.email,
            symptoms: patientData.symptoms,
            appointment_date: new Date().toISOString().split('T')[0], // Simplified for demo
            appointment_time: selectedSlot,
            status: 'pending'
          }
        ])

      if (error) throw error
      
      toast.success('Appointment request sent!')
      setBookingStep(2)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setBookingStepLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Card className="p-12 text-center space-y-4">
            <h2 className="text-2xl font-bold">Doctor not found</h2>
            <Link to="/find-doctors">
              <Button>Back to Search</Button>
            </Link>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  const slots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'] // Mock slots for now

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      
      {/* Cover Section */}
      <div className="relative h-[300px] md:h-[400px]">
        <img 
          src={doctor.clinic_image || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"} 
          alt="Clinic" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Doctor Info */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="overflow-hidden border-none shadow-premium">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="relative">
                    <img 
                      src={doctor.profile_image || "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400"} 
                      alt={doctor.name} 
                      className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white border-2 border-white">
                      <ShieldCheck size={18} fill="currentColor" />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{doctor.name}</h1>
                        <p className="text-lg text-primary-600 font-semibold flex items-center gap-2">
                          <Stethoscope size={20} />
                          {doctor.specialty}
                        </p>
                      </div>
                      <div className="flex items-center gap-6 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                        <div className="text-center">
                          <div className="flex items-center gap-1 text-amber-500 font-bold text-xl">
                            <Star size={20} fill="currentColor" />
                            {doctor.rating}
                          </div>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{doctor.reviews} Reviews</p>
                        </div>
                        <div className="w-px h-8 bg-slate-200" />
                        <div className="text-center">
                          <div className="text-xl font-bold text-slate-900">{doctor.experience}</div>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Experience</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="gray" className="py-1.5 px-3">
                        <GraduationCap size={14} className="mr-1.5" />
                        {doctor.qualification}
                      </Badge>
                      <Badge variant="gray" className="py-1.5 px-3">
                        <MapPin size={14} className="mr-1.5" />
                        {doctor.city}
                      </Badge>
                      <Badge variant="teal" className="py-1.5 px-3">
                        Verified Doctor
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-slate-100">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Info size={20} className="text-primary-500" />
                        About Doctor
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-lg">
                        {doctor.about}
                      </p>
                    </div>

                    {doctor.languages && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <Languages size={18} className="text-primary-500" />
                          Languages Spoken
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {doctor.languages.map(lang => (
                            <Badge key={lang} variant="gray" className="bg-slate-50 border-slate-100">{lang}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <MapPin size={20} className="text-primary-500" />
                      Clinic Location
                    </h3>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                      <div>
                        <p className="font-bold text-slate-900">{doctor.clinic_name}</p>
                        <p className="text-slate-500">{doctor.city}, Pakistan</p>
                      </div>
                        <Button variant="outline" size="sm" className="w-full">View on Map</Button>
                      </div>
                    </div>

                    {doctor.awards && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <Award size={18} className="text-primary-500" />
                          Awards & Recognition
                        </h3>
                        <ul className="space-y-3">
                          {doctor.awards.map((award, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-sm text-slate-600">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                              {award}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {doctor.publications && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <BookOpen size={18} className="text-primary-500" />
                          Publications
                        </h3>
                        <ul className="space-y-3">
                          {doctor.publications.map((pub, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 italic">
                              <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                              {pub}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Review Summary Section */}
            <Card className="bg-gradient-to-br from-primary-50 to-teal-50 border-none shadow-soft overflow-hidden">
              <CardContent className="p-8 relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Sparkles size={120} className="text-primary-500" />
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                      <Sparkles size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">AI Review Summary</h3>
                  </div>
                  <p className="text-slate-700 text-lg leading-relaxed">
                    Based on <span className="font-bold text-primary-600">{doctor.reviews} patient reviews</span>, {doctor.name} is highly praised for their <strong>professionalism</strong> and <strong>compassionate care</strong>. Patients frequently mention short waiting times and thorough explanations of medical conditions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Excellent Communication', 'Very Professional', 'Thorough Checkup', 'Punctual'].map(tag => (
                      <Badge key={tag} variant="primary" className="bg-white/50 border-primary-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Patient Reviews */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <MessageSquare size={24} className="text-primary-500" />
                Patient Reviews ({doctor.reviews})
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {[1, 2].map(i => (
                  <Card key={i} className="p-8 space-y-4 border-none shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">
                          P
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">Patient #{1240 + i}</h4>
                          <p className="text-xs text-slate-400">2 weeks ago</p>
                        </div>
                      </div>
                      <div className="flex gap-1 text-amber-400">
                        {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                      </div>
                    </div>
                    <p className="text-slate-600">
                      Very satisfied with the consultation. The doctor was very patient and explained everything clearly. Highly recommended!
                    </p>
                  </Card>
                ))}
                <Button variant="ghost" className="w-full text-primary-600 font-bold">View All Reviews</Button>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              <Card className="border-none shadow-premium overflow-hidden">
                <CardHeader className="bg-primary-600 text-white p-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-primary-100 text-sm font-semibold uppercase tracking-wider mb-1">Consultation Fee</p>
                      <h3 className="text-3xl font-black">Rs. {doctor.fee}</h3>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                      <Calendar size={24} />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-8">
                  {bookingStep === 1 ? (
                    <form onSubmit={handleBooking} className="space-y-6">
                      <div className="space-y-4">
                        <label className="block text-sm font-bold text-slate-700">Select Appointment Date</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[0, 1, 2, 3, 4, 5].map(i => {
                            const date = new Date()
                            date.setDate(date.getDate() + i)
                            return (
                              <button
                                key={i}
                                type="button"
                                className="p-3 rounded-xl border border-slate-100 text-center hover:border-primary-500 hover:bg-primary-50 transition-all focus:ring-2 focus:ring-primary-500/20 active:scale-95"
                              >
                                <p className="text-[10px] font-bold text-slate-400 uppercase">{date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                                <p className="text-lg font-bold text-slate-900">{date.getDate()}</p>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="block text-sm font-bold text-slate-700">Available Time Slots</label>
                        <div className="grid grid-cols-2 gap-3">
                          {slots.map(slot => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedSlot(slot)}
                              className={`py-3 px-4 rounded-xl border font-bold text-sm transition-all active:scale-95 ${
                                selectedSlot === slot 
                                  ? 'bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-500/30' 
                                  : 'bg-white border-slate-100 text-slate-600 hover:border-primary-200'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4 pt-4">
                        <Input 
                          label="Patient Name" 
                          placeholder="Full Name" 
                          value={patientData.name}
                          onChange={(e) => setPatientData({...patientData, name: e.target.value})}
                          required 
                        />
                        <Input 
                          label="Phone Number" 
                          placeholder="03xx xxxxxxx" 
                          value={patientData.phone}
                          onChange={(e) => setPatientData({...patientData, phone: e.target.value})}
                          required 
                        />
                        <Input 
                          label="Symptoms (Optional)" 
                          placeholder="e.g. Fever, Headache" 
                          value={patientData.symptoms}
                          onChange={(e) => setPatientData({...patientData, symptoms: e.target.value})}
                        />
                      </div>

                      <Button type="submit" className="w-full py-4 text-lg mt-4 shadow-xl shadow-primary-500/20" disabled={bookingLoading}>
                        {bookingLoading ? 'Processing...' : 'Confirm Appointment'}
                      </Button>
                      <p className="text-center text-xs text-slate-400 font-medium">
                        By booking, you agree to our Terms & Conditions
                      </p>
                    </form>
                  ) : (
                    <div className="text-center space-y-6 py-8">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto animate-bounce">
                        <ShieldCheck size={40} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-slate-900">Booking Confirmed!</h3>
                        <p className="text-slate-500">Your appointment with {doctor.name} has been scheduled for today at {selectedSlot}.</p>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Doctor:</span>
                          <span className="font-bold text-slate-900">{doctor.name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Clinic:</span>
                          <span className="font-bold text-slate-900">{doctor.clinic}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Time:</span>
                          <span className="font-bold text-slate-900">{selectedSlot}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Button className="w-full" onClick={() => setBookingStep(1)}>Book Another</Button>
                        <Link to="/dashboard/patient" className="block">
                          <Button variant="secondary" className="w-full">Go to Dashboard</Button>
                        </Link>
                      </div>
                      <p className="text-xs text-teal-600 font-bold bg-teal-50 py-2 rounded-lg">
                        WhatsApp confirmation sent to your number!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Support Info */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <Phone size={18} className="text-primary-500" />
                  <span className="text-sm font-medium">Need help? Call +92 300 1234567</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Clock size={18} className="text-primary-500" />
                  <span className="text-sm font-medium">Response time: ~10 minutes</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}
