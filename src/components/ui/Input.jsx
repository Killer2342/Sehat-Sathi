import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function Input({ label, error, className, ...props }) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-sm font-semibold text-slate-700 ml-1">
          {label}
        </label>
      )}
      <input
        className={twMerge(
          'w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none text-slate-900 placeholder:text-slate-400',
          error && 'border-red-500 focus:ring-red-500/10 focus:border-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500 ml-1 font-medium">{error}</p>
      )}
    </div>
  )
}

export function Select({ label, error, children, className, ...props }) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-sm font-semibold text-slate-700 ml-1">
          {label}
        </label>
      )}
      <select
        className={twMerge(
          'w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none text-slate-900 appearance-none cursor-pointer',
          error && 'border-red-500 focus:ring-red-500/10 focus:border-red-500',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="text-xs text-red-500 ml-1 font-medium">{error}</p>
      )}
    </div>
  )
}
