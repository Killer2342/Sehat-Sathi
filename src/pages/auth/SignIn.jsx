import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HeartPulse, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { toast } from 'react-hot-toast'
import { supabase } from '../../lib/supabase'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignIn = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Fetch user role from users table
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single()

      if (profileError) throw profileError

      toast.success(`Welcome back!`)
      
      if (profile.role === 'patient') navigate('/dashboard/patient')
      else if (profile.role === 'doctor') navigate('/dashboard/doctor')
      else navigate('/dashboard/admin')
      
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
              <HeartPulse size={28} />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-teal-600 bg-clip-text text-transparent">
              SehatSaathi
            </span>
          </Link>
          <p className="text-slate-500 font-medium">Welcome back! Please enter your details.</p>
        </div>

        <Card className="border-none shadow-premium overflow-hidden">
          {/* Role Switcher */}
          <div className="flex border-b border-slate-100">
            {['patient', 'doctor', 'admin'].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all ${
                  role === r 
                    ? 'text-primary-600 border-b-2 border-primary-500 bg-primary-50/30' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <CardContent className="p-8 space-y-6">
            <form onSubmit={handleSignIn} className="space-y-4">
              <Input 
                label="Email Address" 
                type="email" 
                placeholder="name@example.com" 
                required 
                className="pl-11"
                icon={<Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />}
              />
              
              <div className="relative">
                <Input 
                  label="Password" 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[38px] text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500" />
                  <span className="text-sm text-slate-500 font-medium">Remember me</span>
                </label>
                <Link to="#" className="text-sm font-bold text-primary-600 hover:text-primary-700">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full py-4 text-lg mt-2">
                Sign In
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-400 font-bold">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="secondary" className="w-full gap-2">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                Google
              </Button>
              <Button variant="secondary" className="w-full gap-2">
                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5" alt="Facebook" />
                Facebook
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-slate-500 font-medium">
          Don't have an account?{' '}
          <Link 
            to={role === 'doctor' ? '/doctors/signup' : '/signup'} 
            className="text-primary-600 font-bold hover:text-primary-700 inline-flex items-center gap-1 group"
          >
            Sign up for free
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </p>
      </div>
    </div>
  )
}
