import React from 'react'
import { Link } from 'react-router-dom'
import { HeartPulse, MessageCircle, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Patients: [
      { name: 'Find Doctors', path: '/find-doctors' },
      { name: 'Book Appointment', path: '/find-doctors' },
      { name: 'Patient Dashboard', path: '/dashboard/patient' },
      { name: 'Reviews', path: '/#reviews' },
    ],
    Doctors: [
      { name: 'Join as Doctor', path: '/doctors/signup' },
      { name: 'Doctor Dashboard', path: '/dashboard/doctor' },
      { name: 'How it Works', path: '/doctors' },
      { name: 'For Clinics', path: '/doctors' },
    ],
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Privacy Policy', path: '/privacy' },
    ],
    Support: [
      { name: 'Help Center', path: '/help' },
      { name: 'FAQs', path: '/faq' },
      { name: 'Medical Disclaimer', path: '/disclaimer' },
      { name: 'Sitemap', path: '/sitemap' },
    ],
  }

  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                <HeartPulse size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-teal-600 bg-clip-text text-transparent">
                SehatSaathi
              </span>
            </Link>
            <p className="text-slate-500 max-w-sm leading-relaxed">
              Connecting patients with trusted doctors across KPK. Your smart healthcare booking companion for a healthier tomorrow.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-primary-500 hover:text-white transition-all duration-300">
                <MessageCircle size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-primary-500 hover:text-white transition-all duration-300">
                <Mail size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-primary-500 hover:text-white transition-all duration-300">
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-6">
              <h4 className="font-bold text-slate-900">{category}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-slate-500 hover:text-primary-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400">
          <p>© {currentYear} SehatSaathi. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-primary-500" />
              Bannu & Peshawar, Pakistan
            </span>
            <span className="flex items-center gap-2 text-red-500/80 font-medium">
              Medical Disclaimer: AI suggestions are for guidance only.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
