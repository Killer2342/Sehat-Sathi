import React from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { 
  TrendingUp, Users, Calendar, ShieldCheck, 
  Globe, MessageSquare, ArrowRight, Star, 
  Activity, CheckCircle2, HeartPulse, Clock
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ForDoctors() {
  const benefits = [
    {
      title: 'Free Profile Setup',
      desc: 'Build your online presence with a professional, verified medical profile.',
      icon: User
    },
    {
      title: 'Appointment Management',
      desc: 'Intuitive dashboard to accept, reschedule, or manage patient bookings.',
      icon: Calendar
    },
    {
      title: 'Patient Reviews',
      desc: 'Build your reputation through real, verified patient feedback.',
      icon: Star
    },
    {
      title: 'Clinic Visibility',
      desc: 'Showcase your clinic with high-quality images and accurate location.',
      icon: Globe
    },
    {
      title: 'WhatsApp Ready',
      desc: 'Automated appointment confirmations sent directly to patients.',
      icon: MessageSquare
    },
    {
      title: 'Local Reach',
      desc: 'Connect with thousands of patients specifically in Bannu and Peshawar.',
      icon: Users
    }
  ]

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 md:pt-56 md:pb-32 relative overflow-hidden bg-slate-900">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-600/10 skew-x-12 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-teal-600/10 blur-3xl rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Badge variant="primary" className="bg-primary-500/10 border-primary-500/20 text-primary-400 px-4 py-2 text-sm">
                For Healthcare Providers
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Grow your practice with <span className="text-primary-500">SehatSaathi</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
                Join verified doctors across Bannu and Peshawar. Manage appointments, build your online reputation, and reach more patients in your city.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/doctors/signup">
                  <Button size="lg" className="px-10 py-5 text-xl shadow-xl shadow-primary-500/20">
                    Join as a Doctor — It's Free
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="border-slate-700 text-white hover:bg-slate-800 px-10">
                  View Demo Dashboard
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4 border-t border-slate-800">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Doc" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-500">
                  <span className="text-white font-bold">50+ Doctors</span> already joined SehatSaathi in KPK
                </p>
              </div>
            </div>
            
            <div className="relative">
              <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700 p-2 overflow-hidden shadow-2xl rotate-2">
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-auto rounded-xl"
                  alt="Doctor Dashboard"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-2xl animate-pulse">
                    <Activity size={40} />
                  </div>
                </div>
              </Card>
              {/* Floating elements */}
              <div className="absolute -top-12 -left-12 bg-white p-6 rounded-3xl shadow-2xl -rotate-6 hidden lg:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Patient Growth</p>
                    <p className="text-xl font-black text-slate-900">+24%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl font-black text-slate-900">Why choose SehatSaathi?</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              We provide the tools you need to digitize your practice and provide a premium experience to your patients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <Card key={idx} className="group hover:border-primary-500/50 transition-all p-10 space-y-6 bg-slate-50 border-none shadow-none">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary-500 shadow-sm group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                  <benefit.icon size={28} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-slate-900">{benefit.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{benefit.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-2">
              <div className="text-6xl font-black text-primary-500">10k+</div>
              <p className="text-xl text-slate-400 font-medium">Active Patients</p>
            </div>
            <div className="space-y-2">
              <div className="text-6xl font-black text-teal-500">50+</div>
              <p className="text-xl text-slate-400 font-medium">Verified Specialists</p>
            </div>
            <div className="space-y-2">
              <div className="text-6xl font-black text-primary-500">98%</div>
              <p className="text-xl text-slate-400 font-medium">Doctor Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black text-slate-900 leading-tight">
                "SehatSaathi has completely transformed how I manage my clinic in Peshawar."
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Before SehatSaathi, my staff spent hours on phone calls. Now, patients book directly through the platform, and I can see my entire day's schedule at a glance. My practice has grown significantly.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200" alt="Doctor" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">Dr. Imran Khattak</h4>
                  <p className="text-slate-500 font-medium">Cardiologist, Bannu</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card className="p-8 bg-blue-50 border-none">
                  <h4 className="text-3xl font-black text-blue-600 mb-2">3x</h4>
                  <p className="text-blue-900 font-bold">More Bookings</p>
                </Card>
                <Card className="p-8 bg-teal-50 border-none">
                  <h4 className="text-3xl font-black text-teal-600 mb-2">60%</h4>
                  <p className="text-teal-900 font-bold">Less Admin Work</p>
                </Card>
              </div>
              <div className="pt-12 space-y-6">
                <Card className="p-8 bg-amber-50 border-none">
                  <h4 className="text-3xl font-black text-amber-600 mb-2">4.9</h4>
                  <p className="text-amber-900 font-bold">Avg. Rating</p>
                </Card>
                <Card className="p-8 bg-slate-50 border-none">
                  <h4 className="text-3xl font-black text-slate-900 mb-2">24/7</h4>
                  <p className="text-slate-900 font-bold">Support</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-10">
          <h2 className="text-5xl font-black text-slate-900 leading-tight">
            Ready to digitize your medical practice?
          </h2>
          <p className="text-xl text-slate-500">
            Join the smartest healthcare platform in KPK today. Registration takes less than 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/doctors/signup">
              <Button size="lg" className="px-12 py-5 text-xl">
                Join Now — It's Free
              </Button>
            </Link>
            <Button variant="secondary" size="lg" className="px-12 py-5 text-xl">
              Schedule a Demo
            </Button>
          </div>
          <p className="text-sm text-slate-400">
            No credit card required • Dedicated support • Verified profiles
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function User({ size, className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
