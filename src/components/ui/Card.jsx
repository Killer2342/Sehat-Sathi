import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function Card({ className, children, ...props }) {
  return (
    <div
      className={twMerge(
        'bg-white rounded-2xl shadow-soft border border-slate-100 transition-all duration-500',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={twMerge('p-6 border-b border-slate-50', className)} {...props}>
      {children}
    </div>
  )
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={twMerge('p-6', className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div className={twMerge('p-6 border-t border-slate-50', className)} {...props}>
      {children}
    </div>
  )
}
