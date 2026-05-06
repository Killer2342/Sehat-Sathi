import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function Button({ className, variant = 'primary', size = 'md', ...props }) {
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-sm hover:shadow-md active:scale-[0.98]',
    secondary: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-[0.98]',
    outline: 'bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-50 active:scale-[0.98]',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
    danger: 'bg-red-500 hover:bg-red-600 text-white active:scale-[0.98]',
  }

  const sizes = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  }

  return (
    <button
      className={twMerge(
        'rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
}
