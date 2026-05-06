import React, { useState, useEffect } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Input, Select } from '../components/ui/Input'
import { Skeleton } from '../components/ui/Skeleton'
import { Search, MapPin, Filter, Star, Clock, Calendar, ChevronRight, User, Hospital, GraduationCap, Award, ShieldCheck, X, Stethoscope } from 'lucide-react'
import { specialties, cities } from '../data/constants'
import { Link, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function FindDoctors() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const initialQuery = searchParams.get('query') || ''
  const initialCity = searchParams.get('city') || ''

  const [searchTerm, setSearchTerm] = useState(initialQuery)
  const [selectedCity, setSelectedCity] = useState(initialCity)
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [selectedGender, setSelectedGender] = useState('')
  const [priceRange, setPriceRange] = useState(2000)
  const [isLoading, setIsLoading] = useState(true)
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    fetchDoctors()
  }, [searchTerm, selectedCity, selectedSpecialty, selectedGender, priceRange])

  const fetchDoctors = async () => {
    setIsLoading(true)
    try {
      let query = supabase
        .from('doctors')
        .select('*')
        .eq('status', 'approved')

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`)
      }
      if (selectedCity) {
        query = query.eq('city', selectedCity)
      }
      if (selectedSpecialty) {
        query = query.eq('specialty', selectedSpecialty)
      }
      if (selectedGender) {
        query = query.eq('gender', selectedGender)
      }
      if (priceRange) {
        query = query.lte('fee', priceRange)
      }

      const { data, error } = await query
      if (error) throw error
      setDoctors(data)
    } catch (error) {
      console.error('Error fetching doctors:', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Header />
      
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 md:px-8">
        {/* Page Header */}
        <div className="mb-12 space-y-4">
          <Badge variant="primary" className="bg-primary-50 text-primary-600 border-primary-100">Find Doctors</Badge>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Available Specialists</h1>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
            Browse through our network of verified medical professionals in Bannu and Peshawar. 
            Book your appointment in less than 2 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-6">
            <Card className="p-8 sticky top-32 border-slate-100 shadow-soft">
              <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-4">
                <div className="flex items-center gap-2 font-black text-slate-900 uppercase tracking-wider text-xs">
                  <Filter size={16} className="text-primary-500" />
                  Filter Search
                </div>
                {(searchTerm || selectedCity || selectedSpecialty || selectedGender) && (
                  <button 
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCity('')
                      setSelectedSpecialty('')
                      setSelectedGender('')
                      setPriceRange(2000)
                    }}
                    className="text-[10px] font-bold text-primary-600 hover:text-primary-700 uppercase tracking-widest flex items-center gap-1"
                  >
                    Clear <X size={10} />
                  </button>
                )}
              </div>

              <div className="space-y-8">
                <Input 
                  label="Keyword" 
                  placeholder="Doctor, clinic, specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-50/50"
                />

                <Select 
                  label="City"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-slate-50/50"
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </Select>

                <Select 
                  label="Specialty"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="bg-slate-50/50"
                >
                  <option value="">All Specialties</option>
                  {specialties.map(spec => (
                    <option key={spec.id} value={spec.name}>{spec.name}</option>
                  ))}
                </Select>

                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Gender Preference</label>
                  <div className="flex gap-2">
                    {['Male', 'Female'].map(gender => (
                      <button
                        key={gender}
                        onClick={() => setSelectedGender(selectedGender === gender ? '' : gender)}
                        className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold border transition-all ${
                          selectedGender === gender 
                            ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-600/20' 
                            : 'bg-white border-slate-200 text-slate-600 hover:border-primary-200'
                        }`}
                      >
                        {gender}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-50">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Max Consultation Fee</label>
                    <span className="text-sm font-black text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">Rs. {priceRange}</span>
                  </div>
                  <input 
                    type="range" 
                    min="500" 
                    max="3000" 
                    step="100"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    <span>Rs. 500</span>
                    <span>Rs. 3000</span>
                  </div>
                </div>
              </div>
            </Card>

            <div className="p-8 bg-slate-900 rounded-3xl text-white space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldCheck size={80} />
              </div>
              <h4 className="text-lg font-bold relative z-10">Verified Profiles</h4>
              <p className="text-sm text-slate-400 leading-relaxed relative z-10">
                All doctors on SehatSaathi are verified by our medical board for credentials and experience.
              </p>
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 py-3 text-sm font-bold relative z-10">
                Learn about Verification
              </Button>
            </div>
          </aside>

          {/* Doctor Listing */}
          <main className="lg:col-span-3 space-y-8">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <p className="text-slate-500 font-medium">
                Showing <span className="text-slate-900 font-black">{doctors.length}</span> verified specialists
              </p>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sort by:</span>
                <select className="bg-transparent border-none text-sm font-black text-slate-900 outline-none cursor-pointer hover:text-primary-600 transition-colors">
                  <option>Recommended</option>
                  <option>Fee: Low to High</option>
                  <option>Rating: High to Low</option>
                  <option>Experience</option>
                </select>
              </div>
            </div>

            {/* Doctor Cards */}
            <div className="space-y-8">
              {isLoading ? (
                [1, 2, 3].map(i => (
                  <Card key={i} className="p-0 overflow-hidden border-slate-100">
                    <div className="flex flex-col md:flex-row h-[280px]">
                      <Skeleton className="md:w-72 h-full rounded-none" />
                      <div className="flex-1 p-8 space-y-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <Skeleton className="h-8 w-64" />
                            <Skeleton className="h-5 w-40" />
                          </div>
                          <Skeleton className="h-10 w-20" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <Skeleton className="h-12 w-full" />
                          <Skeleton className="h-12 w-full" />
                        </div>
                        <div className="flex justify-between items-center pt-6">
                          <Skeleton className="h-10 w-32" />
                          <Skeleton className="h-12 w-48" />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : doctors.length > 0 ? (
                doctors.map(doctor => (
                  <Card key={doctor.id} className="group hover:border-primary-200 overflow-hidden shadow-soft hover:shadow-premium transition-all duration-500 border-slate-100">
                    <div className="flex flex-col md:flex-row">
                      {/* Doctor Image */}
                      <div className="md:w-72 h-72 md:h-auto relative overflow-hidden">
                        <img 
                          src={doctor.profile_image || "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=800"} 
                          alt={doctor.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-6 left-6">
                          <Badge variant="teal" className="backdrop-blur-md bg-teal-500/10 border-teal-500/20 px-3 py-1.5 font-bold uppercase tracking-widest text-[10px]">
                            Available Today
                          </Badge>
                        </div>
                      </div>

                      {/* Doctor Details */}
                      <CardContent className="flex-1 p-8 md:p-10">
                        <div className="flex flex-col h-full">
                          <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <h3 className="text-2xl md:text-3xl font-black text-slate-900 group-hover:text-primary-600 transition-colors">{doctor.name}</h3>
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                                  <ShieldCheck size={14} fill="currentColor" />
                                </div>
                              </div>
                              <div className="flex flex-wrap items-center gap-4 text-slate-500 font-bold text-sm">
                                <span className="flex items-center gap-2 text-primary-600 bg-primary-50 px-3 py-1 rounded-lg">
                                  <Stethoscope size={16} />
                                  {doctor.specialty}
                                </span>
                                <span className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-lg">
                                  <GraduationCap size={16} />
                                  {doctor.qualification}
                                </span>
                              </div>
                            </div>
                            <div className="text-left md:text-right bg-amber-50/50 p-4 rounded-2xl border border-amber-100/50">
                              <div className="flex items-center md:justify-end gap-1.5 text-amber-500 font-black text-xl mb-1">
                                <Star size={20} fill="currentColor" />
                                {doctor.rating}
                              </div>
                              <p className="text-[10px] text-amber-600 font-black uppercase tracking-[0.1em]">{doctor.reviews} Patient Reviews</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div className="space-y-4">
                              <div className="flex items-center gap-4 text-slate-600 group/item">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover/item:bg-primary-50 group-hover/item:text-primary-500 transition-all">
                                  <Hospital size={18} />
                                </div>
                                <div>
                                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Clinic</p>
                                  <p className="text-sm font-bold text-slate-700">{doctor.clinic_name}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-slate-600 group/item">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover/item:bg-primary-50 group-hover/item:text-primary-500 transition-all">
                                  <MapPin size={18} />
                                </div>
                                <div>
                                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Location</p>
                                  <p className="text-sm font-bold text-slate-700">{doctor.city}</p>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="flex items-center gap-4 text-slate-600 group/item">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover/item:bg-primary-50 group-hover/item:text-primary-500 transition-all">
                                  <Award size={18} />
                                </div>
                                <div>
                                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Experience</p>
                                  <p className="text-sm font-bold text-slate-700">{doctor.experience}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-slate-600 group/item">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover/item:bg-primary-50 group-hover/item:text-primary-500 transition-all">
                                  <User size={18} />
                                </div>
                                <div>
                                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Gender</p>
                                  <p className="text-sm font-bold text-slate-700">{doctor.gender}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-auto flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-slate-100">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shrink-0">
                                <Clock size={20} />
                              </div>
                              <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Consultation Fee</p>
                                <p className="text-3xl font-black text-slate-900">Rs. {doctor.fee}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 w-full md:w-auto">
                              <Link to={`/doctor/${doctor.id}`} className="flex-1 md:flex-none">
                                <Button variant="secondary" className="w-full px-8 font-bold">Details</Button>
                              </Link>
                              <Link to={`/doctor/${doctor.id}`} className="flex-1 md:flex-none">
                                <Button className="w-full px-10 font-bold shadow-xl shadow-primary-600/20">Book Now</Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-24 text-center space-y-8 border-dashed border-2 border-slate-200 bg-white/50">
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mx-auto">
                    <Search size={48} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">No doctors found</h3>
                    <p className="text-slate-500 text-lg max-w-sm mx-auto leading-relaxed">
                      We couldn't find any specialists matching your current filters. Try adjusting your search criteria.
                    </p>
                  </div>
                  <Button 
                    variant="primary" 
                    className="px-10 py-4 font-bold"
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCity('')
                      setSelectedSpecialty('')
                      setSelectedGender('')
                      setPriceRange(2000)
                    }}
                  >
                    Clear All Filters
                  </Button>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}



