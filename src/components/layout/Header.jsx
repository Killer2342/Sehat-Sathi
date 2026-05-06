import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, HeartPulse, User, LogIn, LogOut, ChevronDown } from 'lucide-react'
import { Button } from '../ui/Button'
import { clsx } from 'clsx'
import { useAuth } from '../../context/AuthContext'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { user, profile, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  const navLinks = [
    { name: 'Find Doctors', path: '/find-doctors' },
    { name: 'How it Works', path: '/#how-it-works' },
    { name: 'For Doctors', path: '/doctors' },
    { name: 'AI Assistant', path: '/ai-assistant' },
  ]

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-4',
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary-600/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            <HeartPulse size={28} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent leading-none">
              SehatSaathi
            </span>
            <span className="text-[10px] font-bold text-primary-600 uppercase tracking-[0.2em] mt-0.5">
              Healthcare
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-bold text-slate-500 hover:text-primary-600 uppercase tracking-widest transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Auth Buttons / Profile */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-1.5 pr-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-100 transition-all group"
              >
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <User size={20} />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-900 leading-none">{profile?.name || 'User'}</p>
                  <p className="text-[10px] font-bold text-primary-600 uppercase tracking-wider mt-1">{profile?.role}</p>
                </div>
                <ChevronDown size={14} className={clsx('text-slate-400 transition-transform', isProfileOpen && 'rotate-180')} />
              </button>

              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-3 w-56 bg-white rounded-2xl shadow-premium border border-slate-100 p-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Link 
                    to={`/dashboard/${profile?.role}`} 
                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-all"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User size={18} />
                    My Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="ghost" size="sm" className="text-slate-500 font-bold hover:text-primary-600">
                  Sign In
                </Button>
              </Link>
              <Link to="/doctors/signup">
                <Button className="px-8 shadow-xl shadow-primary-600/20">
                  Join as Doctor
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-lg font-bold text-slate-700 uppercase tracking-widest"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
            {user ? (
              <>
                <Link to={`/dashboard/${profile?.role}`} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="secondary" className="w-full">Dashboard</Button>
                </Link>
                <Button variant="ghost" onClick={handleLogout} className="text-red-500 font-bold">Sign Out</Button>
              </>
            ) : (
              <>
                <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="secondary" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/doctors/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Join as Doctor
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

