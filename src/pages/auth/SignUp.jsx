import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HeartPulse, Mail, Lock, User, Phone, ArrowRight, ShieldCheck } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { toast } from 'react-hot-toast'
import { supabase } from '../../lib/supabase'

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match')
    }
    
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error

      if (data.user) {
        // Insert into our custom users table
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            { 
              id: data.user.id, 
              name: formData.name, 
              email: formData.email, 
              phone: formData.phone,
              role: 'patient'
            }
          ])

        if (profileError) throw profileError
        
        toast.success('Registration successful! Please check your email for verification.')
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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-20">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
              <HeartPulse size={28} />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-teal-600 bg-clip-text text-transparent">
              SehatSaathi
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Create Patient Account</h1>
          <p className="text-slate-500 font-medium">Join SehatSaathi to book trusted doctors.</p>
        </div>

        <Card className="border-none shadow-premium">
          <CardContent className="p-8 space-y-6">
            <form onSubmit={handleSignUp} className="space-y-4">
              <Input label="Full Name" placeholder="John Doe" required />
              <Input label="Email Address" type="email" placeholder="name@example.com" required />
              <Input label="Phone Number" placeholder="03xx xxxxxxx" required />
              <Input label="Password" type="password" placeholder="••••••••" required />
              <Input label="Confirm Password" type="password" placeholder="••••••••" required />

              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-300 text-primary-500" required />
                <span className="text-xs text-slate-500 leading-relaxed font-medium">
                  I agree to the <Link to="#" className="text-primary-600 font-bold">Terms of Service</Link> and <Link to="#" className="text-primary-600 font-bold">Privacy Policy</Link>. I understand that AI suggestions are for guidance only.
                </span>
              </div>

              <Button type="submit" className="w-full py-4 text-lg mt-2">
                Create Account
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-slate-500 font-medium">
          Already have an account?{' '}
          <Link to="/signin" className="text-primary-600 font-bold hover:text-primary-700">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
