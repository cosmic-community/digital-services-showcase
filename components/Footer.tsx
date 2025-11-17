'use client'

import Link from 'next/link'
import { useTheme } from '@/lib/theme-context'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { theme, toggleTheme } = useTheme()

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Digital Services</h3>
            <p className="text-gray-400 dark:text-gray-500">
              Professional digital solutions to help your business grow and succeed in the modern world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200">
                  Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200">
                  Digital Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 dark:text-gray-500 text-center sm:text-left">
            &copy; {currentYear} Digital Services. All rights reserved.
          </p>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 dark:bg-gray-900 hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span className="text-sm font-medium">Dark Mode</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="text-sm font-medium">Light Mode</span>
              </>
            )}
          </button>
        </div>
      </div>
    </footer>
  )
}