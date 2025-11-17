'use client'

import { useState, useEffect } from 'react'

export default function CosmicBadge({ bucketSlug }: { bucketSlug: string }) {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const isDismissed = localStorage.getItem('cosmic-badge-dismissed')
    if (!isDismissed) {
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])
  
  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('cosmic-badge-dismissed', 'true')
  }
  
  if (!isVisible) return null
  
  return (
    <a
      href={`https://www.cosmicjs.com?utm_source=bucket_${bucketSlug}&utm_medium=referral&utm_campaign=app_badge&utm_content=built_with_cosmic`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 flex items-center gap-2 text-gray-800 dark:text-gray-200 text-sm font-medium no-underline transition-colors duration-200 z-50"
      style={{
        position: 'fixed',
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        padding: '12px 16px',
        width: '180px'
      }}
      onMouseEnter={(e) => {
        const isDark = document.documentElement.classList.contains('dark')
        e.currentTarget.style.backgroundColor = isDark ? '#1f2937' : '#f9fafb'
      }}
      onMouseLeave={(e) => {
        const isDark = document.documentElement.classList.contains('dark')
        e.currentTarget.style.backgroundColor = isDark ? '#111827' : 'white'
        e.currentTarget.style.borderColor = isDark ? '#374151' : '#e5e7eb'
      }}
    >
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleDismiss()
        }}
        className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-200 z-10"
        aria-label="Dismiss badge"
      >
        ×
      </button>
      
      <img 
        src="https://cdn.cosmicjs.com/b67de7d0-c810-11ed-b01d-23d7b265c299-logo508x500.svg" 
        alt="Cosmic Logo" 
        className="w-5 h-5"
      />
      Built with Cosmic
    </a>
  )
}