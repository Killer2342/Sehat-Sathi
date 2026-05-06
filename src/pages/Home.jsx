import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Stethoscope, ShieldCheck, Clock, Star, MessageSquare, ArrowRight, Activity, HeartPulse, UserRound, Baby, Scissors, Sparkles, Users, ChevronRight, Calendar } from 'lucide-react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { testimonials } from '../data/constants'

const iconMap = {
  HeartPulse: HeartPulse,
  Stethoscope: Stethoscope,
  UserRound: UserRound,
  Baby: Baby,
  Activity: Activity,
  Scissors: Scissors,
}

export default function Home() {
  const [specialties, setSpecialties] = useState([])
  const [featuredDoctors, setFeaturedDoctors] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchHomeData()
  }, [])

  const fetchHomeData = async () => {
    setIsLoading(true)
    try {
      const { data: specData } = await supabase.from('specialties').select('*')
      const { data: docData } = await supabase.from('doctors').select('*').eq('status', 'approved').limit(3)
      
      setSpecialties(specData || [])
      setFeaturedDoctors(docData || [])
    } catch (error) {
      console.error('Error fetching home data:', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 bg-primary-100/50 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-teal-100/50 blur-3xl rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-600 font-semibold text-sm border border-primary-100">
                <ShieldCheck size={18} />
                Trusted by 10,000+ patients in KPK
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1]">
                Book trusted doctors in <span className="text-primary-500">Bannu</span> & <span className="text-teal-500">Peshawar</span> within minutes.
              </h1>
              
              <p className="text-xl text-slate-500 max-w-xl leading-relaxed">
                Find verified doctors, compare availability, check real reviews, and book appointments online with smart healthcare assistance.
              </p>
              
              {/* Search Bar */}
              <Card className="p-2 border-slate-200 shadow-premium max-w-2xl">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.target)
                    const query = formData.get('query')
                    const city = formData.get('city')
                    navigate(`/find-doctors?query=${query}&city=${city}`)
                  }}
                  className="flex flex-col md:flex-row items-center gap-2"
                >
                  <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus-within:border-primary-200 transition-all">
                    <Search size={20} className="text-slate-400" />
                    <input 
                      name="query"
                      type="text" 
                      placeholder="Doctor, specialty, or symptom" 
                      className="bg-transparent border-none outline-none w-full text-slate-900 placeholder:text-slate-400 font-medium"
                    />
                  </div>
                  <div className="w-px h-10 bg-slate-200 hidden md:block" />
                  <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus-within:border-primary-200 transition-all">
                    <MapPin size={20} className="text-slate-400" />
                    <select name="city" className="bg-transparent border-none outline-none w-full text-slate-900 cursor-pointer font-medium">
                      <option value="">Select City</option>
                      <option value="Bannu">Bannu</option>
                      <option value="Peshawar">Peshawar</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-full md:w-auto px-8 py-4 font-bold">Search</Button>
                </form>
              </Card>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <ShieldCheck size={20} className="text-green-500" />
                  Verified Doctors
                </div>
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <ShieldCheck size={20} className="text-primary-500" />
                  Free to Book
                </div>
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Star size={20} className="text-amber-500" />
                  Real Reviews
                </div>
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <MessageSquare size={20} className="text-teal-500" />
                  WhatsApp Confirmation
                </div>
              </div>
            </motion.div>
            
            {/* Right Hero Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <Card className="p-0 overflow-hidden border-none shadow-premium bg-white/40 backdrop-blur-xl border border-white/20">
                  <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=800" 
                    alt="Doctor" 
                    className="w-full h-[500px] object-cover rounded-t-2xl"
                  />
                  <div className="absolute top-6 left-6">
                    <Badge variant="teal" className="px-4 py-2 text-sm backdrop-blur-md bg-teal-500/10 border-teal-500/20">
                      Available Today
                    </Badge>
                  </div>
                  <div className="p-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">Dr. Ayesha Noor</h3>
                        <p className="text-slate-500">Gynecologist • Bannu Medical Complex</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-amber-500 font-bold text-lg">
                          <Star size={20} fill="currentColor" />
                          4.9
                        </div>
                        <p className="text-xs text-slate-400">142 Reviews</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="gray">9:00 AM</Badge>
                      <Badge variant="gray">10:30 AM</Badge>
                      <Badge variant="primary">2:00 PM</Badge>
                    </div>
                    <Button className="w-full py-4 text-lg">Book Appointment</Button>
                  </div>
                </Card>
                
                {/* Floating Stats */}
                <Card className="absolute -bottom-6 -left-12 p-6 shadow-premium bg-white hidden lg:block border-none">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                      <UserRound size={24} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">50+</div>
                      <div className="text-sm text-slate-500">Verified Doctors</div>
                    </div>
                  </div>
                </Card>
                
                <Card className="absolute -top-12 -right-6 p-6 shadow-premium bg-white hidden lg:block border-none">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                      <Clock size={24} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">1,200+</div>
                      <div className="text-sm text-slate-500">Appointments Booked</div>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 bg-white border-y border-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">
            Partnering with top healthcare institutions
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {['Peshawar Medical College', 'Khyber Teaching Hospital', 'Bannu Medical Complex', 'Northwest General Hospital', 'Hayatabad Medical Complex'].map((partner) => (
              <div key={partner} className="text-xl font-black text-slate-900 tracking-tighter italic">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialty Section */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <Badge variant="primary" className="bg-primary-50 text-primary-600 border-primary-100">Our Specialties</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Browse by Specialty</h2>
              <p className="text-slate-500 text-lg max-w-xl">
                Find the right care for your health needs from our wide range of medical specialties.
              </p>
            </div>
            <Link to="/find-doctors">
              <Button variant="secondary" className="group">
                View All Specialties
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialties.map((specialty, idx) => {
              const Icon = iconMap[specialty.icon] || Stethoscope
              return (
                <motion.div
                  key={specialty.id}
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card className="h-full hover:border-primary-200 group cursor-pointer border-slate-100 shadow-soft">
                    <CardContent className="p-10 space-y-8">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary-600 shadow-sm border border-slate-50 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500">
                        <Icon size={32} />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{specialty.name}</h3>
                        <p className="text-slate-500 leading-relaxed">{specialty.description}</p>
                      </div>
                      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Available in KPK</span>
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-500 transition-all">
                          <ArrowRight size={20} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recommended Doctors Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="primary" className="bg-primary-50 text-primary-600 border-primary-100">Top Rated</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Recommended Doctors</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Highly rated specialists with verified patient feedback and proven track records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDoctors.map((doc) => (
              <Card key={doc.id} className="group overflow-hidden border-slate-100 hover:border-primary-200 transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={doc.profile_image || "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=800"} 
                    alt={doc.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm border border-white/20">
                      <Star size={14} className="text-amber-500" fill="currentColor" />
                      <span className="text-sm font-black text-slate-900">{doc.rating || 'New'}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-8 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{doc.name}</h3>
                    <p className="text-sm text-slate-500 font-medium">{doc.specialty} • {doc.clinic_name}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest pb-4 border-b border-slate-50">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      {doc.city}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {doc.experience}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-xl font-black text-slate-900">Rs. {doc.fee}</p>
                    <Link to={`/doctor/${doc.id}`}>
                      <Button variant="secondary" size="sm" className="font-bold">View Profile</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link to="/find-doctors">
              <Button size="lg" className="px-10">Explore All Doctors</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="section-padding bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-600/10 skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <Badge variant="primary" className="bg-primary-500/10 border-primary-500/20 text-primary-400">Why Choose Us</Badge>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1]">
                Smart healthcare booking you can <span className="text-primary-500">trust.</span>
              </h2>
              <div className="space-y-6">
                {[
                  { title: 'Verified Medical Professionals', desc: 'Every doctor on our platform goes through a rigorous verification process.', icon: ShieldCheck },
                  { title: 'AI-Powered Assistance', desc: 'Our smart assistant helps you navigate symptoms and find specialists faster.', icon: Sparkles },
                  { title: 'Real Patient Feedback', desc: 'Access authentic reviews and ratings from our local community in KPK.', icon: Star }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-500 shrink-0">
                      <item.icon size={24} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-white">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Verified Doctors', value: '50+', icon: Stethoscope, color: 'blue' },
                { label: 'Happy Patients', value: '10k+', icon: Users, color: 'teal' },
                { label: 'Appointments', value: '1.2k+', icon: Calendar, color: 'primary' },
                { label: 'KPK Cities', value: '2+', icon: MapPin, color: 'emerald' }
              ].map((stat, idx) => (
                <Card key={idx} className="p-8 bg-white/5 border-white/10 border-none backdrop-blur-sm group hover:bg-white/10 transition-all duration-500">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary-500/20 flex items-center justify-center text-primary-500">
                      <stat.icon size={24} />
                    </div>
                    <div>
                      <div className="text-4xl font-black text-white mb-1 tracking-tight">{stat.value}</div>
                      <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-black text-slate-900">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-lg">Everything you need to know about SehatSaathi.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Is it free to book an appointment?', a: 'Yes, SehatSaathi is free for patients. You only pay the consultation fee at the clinic.' },
              { q: 'How do I know if a doctor is verified?', a: 'Look for the blue shield badge on the doctor’s profile. This indicates we have verified their medical credentials.' },
              { q: 'Can I cancel my appointment?', a: 'Yes, you can cancel your appointment through your patient dashboard at least 2 hours before the scheduled time.' },
              { q: 'What is the AI Symptom Assistant?', a: 'It is a smart tool that analyzes your described symptoms to recommend the most appropriate medical specialty and doctor.' }
            ].map((faq, idx) => (
              <Card key={idx} className="border-slate-100 shadow-none hover:shadow-soft group cursor-pointer transition-all overflow-hidden">
                <div className="p-6 flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{faq.q}</h4>
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-500 transition-all">
                    <ChevronRight size={18} className="group-hover:rotate-90 transition-transform" />
                  </div>
                </div>
                <div className="px-6 pb-6 text-slate-500 leading-relaxed">
                  {faq.a}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-slate-900">How It Works</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Booking a doctor appointment has never been easier. Follow these three simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                step: '01', 
                title: 'Search', 
                desc: 'Find doctors by specialty, city, or symptoms.',
                icon: Search,
                color: 'primary'
              },
              { 
                step: '02', 
                title: 'Choose a Time', 
                desc: 'Pick your preferred date and time slot.',
                icon: Clock,
                color: 'teal'
              },
              { 
                step: '03', 
                title: 'Confirm and Visit', 
                desc: 'Confirm your booking and get appointment details.',
                icon: ShieldCheck,
                color: 'green'
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <Card className="h-full border-none shadow-soft hover:shadow-premium p-10 space-y-8">
                  <div className="flex justify-between items-start">
                    <span className="text-6xl font-black text-slate-100 group-hover:text-primary-50 transition-colors">
                      {item.step}
                    </span>
                    <div className={`w-16 h-16 bg-${item.color}-50 rounded-2xl flex items-center justify-center text-${item.color}-500`}>
                      <item.icon size={32} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
                    <p className="text-slate-500 text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </Card>
                {idx < 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 translate-x-1/2 -translate-y-1/2 z-10">
                    <ArrowRight size={32} className="text-slate-200" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-slate-900">What Our Patients Say</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Don't just take our word for it. Here's what people in Bannu and Peshawar are saying.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((review, idx) => (
              <Card key={idx} className="bg-slate-50 border-none shadow-none p-8 space-y-6">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="text-slate-600 text-lg italic leading-relaxed">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{review.name}</h4>
                    <p className="text-sm text-slate-500">{review.city}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Card className="bg-primary-600 p-12 md:p-20 relative overflow-hidden border-none">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 -skew-x-12 translate-x-1/2" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Are you a doctor? Join SehatSaathi today.
                </h2>
                <p className="text-primary-100 text-xl max-w-lg">
                  Grow your practice, manage appointments efficiently, and reach more patients in Bannu and Peshawar.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/doctors/signup">
                    <Button variant="secondary" size="lg" className="bg-white text-primary-600 border-none px-10">
                      Register Now
                    </Button>
                  </Link>
                  <Link to="/doctors">
                    <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10 px-10">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden lg:flex justify-end">
                <div className="bg-white/20 backdrop-blur-md p-8 rounded-3xl border border-white/30 space-y-6 max-w-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-white">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Verified Profile</h4>
                      <p className="text-primary-100 text-sm">Build trust with patients</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-white">
                      <Star size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Review System</h4>
                      <p className="text-primary-100 text-sm">Manage your reputation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center text-white">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Auto-Scheduling</h4>
                      <p className="text-primary-100 text-sm">Save time on bookings</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
