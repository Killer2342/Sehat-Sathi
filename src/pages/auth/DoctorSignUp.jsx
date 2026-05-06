import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HeartPulse, Camera, Upload, ShieldCheck, ArrowRight, Info } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input, Select } from '../../components/ui/Input'
import { specialties, cities } from '../../data/constants'
import { toast } from 'react-hot-toast'
import { supabase } from '../../lib/supabase'

export default function DoctorSignUp() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    gender: 'Male',
    specialty: 'Cardiologist',
    qualification: '',
    experience: '',
    fee: '',
    city: 'Bannu',
    clinic_name: '',
    clinic_address: '',
    bio: ''
  })
  const [profileImage, setProfileImage] = useState(null)
  const [clinicImage, setClinicImage] = useState(null)

  const handleNext = (e) => {
    e.preventDefault()
    setStep(2)
  }

  const handleFinalSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 1. Sign Up in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (authError) throw authError

      if (authData.user) {
        // 2. Upload Images if any
        let profileUrl = ''
        let clinicUrl = ''

        if (profileImage) {
          const fileExt = profileImage.name.split('.').pop()
          const fileName = `${authData.user.id}.${fileExt}`
          const { error: uploadError } = await supabase.storage
            .from('profiles')
            .upload(fileName, profileImage)
          
          if (uploadError) throw uploadError
          const { data: publicUrl } = supabase.storage.from('profiles').getPublicUrl(fileName)
          profileUrl = publicUrl.publicUrl
        }

        if (clinicImage) {
          const fileExt = clinicImage.name.split('.').pop()
          const fileName = `${authData.user.id}.${fileExt}`
          const { error: uploadError } = await supabase.storage
            .from('clinics')
            .upload(fileName, clinicImage)
          
          if (uploadError) throw uploadError
          const { data: publicUrl } = supabase.storage.from('clinics').getPublicUrl(fileName)
          clinicUrl = publicUrl.publicUrl
        }

        // 3. Create entry in users table
        const { error: userError } = await supabase
          .from('users')
          .insert([
            { id: authData.user.id, name: formData.name, email: formData.email, phone: formData.phone, role: 'doctor' }
          ])
        
        if (userError) throw userError

        // 4. Create entry in doctors table
        const { error: doctorError } = await supabase
          .from('doctors')
          .insert([
            {
              user_id: authData.user.id,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              specialty: formData.specialty,
              qualification: formData.qualification,
              experience: formData.experience,
              fee: parseInt(formData.fee),
              gender: formData.gender,
              city: formData.city,
              clinic_name: formData.clinic_name,
              clinic_address: formData.clinic_address,
              bio: formData.bio,
              profile_image: profileUrl,
              clinic_image: clinicUrl,
              status: 'pending'
            }
          ])

        if (doctorError) throw doctorError

        toast.success('Registration submitted! Admin will verify your profile.')
        navigate('/signin')
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="max-w-4xl mx-auto w-full px-4 py-12 md:py-20 flex-1 flex flex-col">
        {/* Logo */}
        <div className="text-center space-y-4 mb-12">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
              <HeartPulse size={28} />
            </div>
            <span className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-teal-600 bg-clip-text text-transparent">
              SehatSaathi
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Join as a Healthcare Provider</h1>
          
          {/* Progress Bar */}
          <div className="flex items-center justify-center gap-4 max-w-md mx-auto pt-4">
            <div className={`h-2 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-primary-500' : 'bg-slate-200'}`} />
            <div className={`h-2 flex-1 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-primary-500' : 'bg-slate-200'}`} />
          </div>
        </div>

        <Card className="border-none shadow-premium flex-1">
          <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              {step === 1 ? 'Personal & Professional Info' : 'Clinic & Practice Details'}
            </h2>
            <span className="text-sm font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-lg">Step {step} of 2</span>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={step === 1 ? handleNext : handleFinalSubmit} className="space-y-8">
              {step === 1 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 hover:border-primary-300 transition-all cursor-pointer group relative">
                    {profileImage ? (
                      <img src={URL.createObjectURL(profileImage)} className="w-24 h-24 rounded-full object-cover mb-4" />
                    ) : (
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-slate-400 group-hover:text-primary-500 shadow-sm mb-4">
                        <Camera size={32} />
                      </div>
                    )}
                    <p className="font-bold text-slate-700">Upload Profile Image</p>
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      accept="image/*"
                      onChange={(e) => setProfileImage(e.target.files[0])}
                    />
                  </div>

                  <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="Dr. Muhammad Ali" required />
                  <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="ali@hospital.com" required />
                  <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="03xx xxxxxxx" required />
                  <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required />
                  <Select label="Gender" name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Select>
                  <Select label="Specialty" name="specialty" value={formData.specialty} onChange={handleChange} required>
                    {specialties.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                  </Select>
                  <Input label="Qualification" name="qualification" value={formData.qualification} onChange={handleChange} placeholder="MBBS, FCPS" required />
                  <Input label="Experience (Years)" name="experience" value={formData.experience} onChange={handleChange} type="number" placeholder="10" required />
                  <Input label="Consultation Fee (Rs.)" name="fee" value={formData.fee} onChange={handleChange} type="number" placeholder="1000" required />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 flex flex-col items-center justify-center p-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 hover:border-primary-300 transition-all cursor-pointer group relative">
                    {clinicImage ? (
                      <img src={URL.createObjectURL(clinicImage)} className="w-full h-40 object-cover rounded-xl mb-4" />
                    ) : (
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-primary-500 shadow-sm mb-4">
                        <Upload size={32} />
                      </div>
                    )}
                    <p className="font-bold text-slate-700">Upload Clinic Cover Image</p>
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      accept="image/*"
                      onChange={(e) => setClinicImage(e.target.files[0])}
                    />
                  </div>

                  <Select label="City" name="city" value={formData.city} onChange={handleChange} required>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </Select>
                  <Input label="Clinic Name" name="clinic_name" value={formData.clinic_name} onChange={handleChange} placeholder="Al-Shifa Hospital" required />
                  <div className="md:col-span-2">
                    <Input label="Clinic Address" name="clinic_address" value={formData.clinic_address} onChange={handleChange} placeholder="Street 12, Sector A, Peshawar" required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 ml-1 mb-1.5">Short Bio</label>
                    <textarea 
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none text-slate-900 placeholder:text-slate-400 h-32 resize-none"
                      placeholder="Tell patients about your practice..."
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                {step === 2 ? (
                  <Button type="button" variant="secondary" onClick={() => setStep(1)}>
                    Back
                  </Button>
                ) : <div />}
                
                <Button type="submit" className="gap-2 px-10" disabled={isLoading}>
                  {isLoading ? 'Submitting...' : step === 1 ? 'Next Step' : 'Submit Registration'}
                  <ArrowRight size={20} />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-blue-900">Verification Process</h4>
            <p className="text-sm text-blue-700 leading-relaxed">
              Your profile will be reviewed by our admin team within 24-48 hours. Please ensure all information is accurate to avoid delays.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
