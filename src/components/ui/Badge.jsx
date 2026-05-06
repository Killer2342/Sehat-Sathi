import React from 'react'
import { twMerge } from 'tailwind-merge'

export function Badge({ children, variant = 'primary', className }) {
  const variants = {
    primary: 'bg-primary-50 text-primary-600 border-primary-100',
    teal: 'bg-teal-50 text-teal-600 border-teal-100',
    success: 'bg-green-50 text-green-600 border-green-100',
    warning: 'bg-amber-50 text-amber-600 border-amber-100',
    danger: 'bg-red-50 text-red-600 border-red-100',
    gray: 'bg-slate-50 text-slate-600 border-slate-100',
  }

  return (
    <span
      className={twMerge(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
