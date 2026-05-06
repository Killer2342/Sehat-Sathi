import React, { useState, useEffect } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Input } from '../components/ui/Input'
import { 
  Sparkles, MessageSquare, Send, AlertTriangle, 
  Stethoscope, ShieldCheck, HeartPulse, User, 
  ArrowRight, Search, Info
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AIAssistant() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    const { data } = await supabase.from('doctors').select('*').eq('status', 'approved')
    setDoctors(data || [])
  }

  const analyzeSymptoms = (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsAnalyzing(true)
    
    // Simple rule-based logic for demo
    setTimeout(() => {
      const q = query.toLowerCase()
      let specialtyName = 'General Physician'
      let urgency = 'Medium'
      let guidance = 'Based on your symptoms, a consultation with a general physician is recommended for a preliminary checkup.'

      if (q.includes('heart') || q.includes('chest') || q.includes('breath')) {
        specialtyName = 'Cardiologist'
        urgency = 'High'
        guidance = 'Chest pain and shortness of breath can be serious. We recommend seeing a cardiologist immediately.'
      } else if (q.includes('skin') || q.includes('rash') || q.includes('acne')) {
        specialtyName = 'Dermatologist'
        urgency = 'Low'
        guidance = 'Skin related issues are best handled by a specialist dermatologist.'
      } else if (q.includes('teeth') || q.includes('tooth') || q.includes('gum')) {
        specialtyName = 'Dentist'
        urgency = 'Medium'
        guidance = 'A dentist can help diagnose and treat oral health issues.'
      }

      const recommendedDoctor = doctors.find(d => d.specialty === specialtyName) || doctors[0]

      setResult({
        specialty: specialtyName,
        urgency,
        doctor: recommendedDoctor,
        guidance
      })
      setIsAnalyzing(false)
    }, 1500)
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20 max-w-4xl mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <div className="w-16 h-16 bg-primary-500 rounded-3xl flex items-center justify-center text-white mx-auto shadow-xl shadow-primary-500/20 mb-6">
            <Sparkles size={32} />
          </div>
          <h1 className="text-4xl font-black text-slate-900">AI Symptom Assistant</h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Describe your symptoms in plain English, and our smart assistant will guide you to the right specialist.
          </p>
        </div>

        <div className="space-y-8">
          {/* Input Section */}
          <Card className="border-none shadow-premium overflow-hidden">
            <CardContent className="p-8">
              <form onSubmit={analyzeSymptoms} className="space-y-6">
                <div className="relative">
                  <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full px-6 py-6 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none text-slate-900 placeholder:text-slate-400 text-lg h-40 resize-none"
                    placeholder="Example: I have a persistent headache and feel dizzy since morning..."
                  />
                  <div className="absolute bottom-4 right-4 text-xs text-slate-400 font-bold uppercase tracking-wider">
                    Powered by SehatSaathi AI
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full py-5 text-xl font-bold shadow-xl shadow-primary-500/20 gap-3"
                  disabled={isAnalyzing || !query.trim()}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing Symptoms...
                    </>
                  ) : (
                    <>
                      <Sparkles size={24} />
                      Analyze Now
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Medical Disclaimer */}
          <div className="flex items-start gap-4 p-6 bg-amber-50 rounded-2xl border border-amber-100">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-amber-900">Medical Disclaimer</h4>
              <p className="text-sm text-amber-800 leading-relaxed">
                SehatSaathi AI suggestions are for guidance only and are <strong>not a medical diagnosis</strong>. In case of an emergency, please visit the nearest hospital immediately.
              </p>
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest px-4">AI Recommendations</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-8 border-none shadow-sm space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                      <Stethoscope size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Suggested Specialty</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-3xl font-black text-slate-900 mb-1">{result.specialty}</div>
                      <Badge variant={result.urgency === 'High' ? 'danger' : result.urgency === 'Medium' ? 'warning' : 'primary'} className="px-3 py-1">
                        Urgency: {result.urgency}
                      </Badge>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {result.guidance}
                    </p>
                  </div>
                </Card>

                {result.doctor && (
                  <Card className="p-8 border-none shadow-premium bg-gradient-to-br from-white to-slate-50 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600">
                        <User size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Recommended Doctor</h3>
                    </div>
                    <div className="flex gap-4">
                      <img 
                        src={result.doctor.profile_image || "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=800"} 
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-md"
                        alt={result.doctor.name}
                      />
                      <div>
                        <h4 className="text-xl font-bold text-slate-900">{result.doctor.name}</h4>
                        <p className="text-sm text-slate-500 font-medium mb-2">{result.doctor.clinic_name}</p>
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase">
                          <HeartPulse size={12} />
                          {result.doctor.specialty}
                        </div>
                      </div>
                    </div>
                    <Link to={`/doctor/${result.doctor.id}`}>
                      <Button className="w-full mt-2 gap-2">
                        View Profile & Book
                        <ArrowRight size={18} />
                      </Button>
                    </Link>
                  </Card>
                )}
              </div>

              <Card className="p-8 bg-slate-900 text-white border-none shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Info size={120} />
                </div>
                <div className="relative z-10 space-y-4">
                  <h3 className="text-xl font-bold">Why this recommendation?</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Our AI analyzed keywords in your description and matched them with medical patterns associated with specific specialties. This helps you skip the guesswork and find the right expert faster.
                  </p>
                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-primary-400 uppercase tracking-wider">
                      <ShieldCheck size={16} />
                      Verified Algorithms
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
                      <ShieldCheck size={16} />
                      Local Data Focused
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
