'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Digital Services
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Services
            </Link>
            <Link
              href="/case-studies"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Case Studies
            </Link>
            <Link
              href="/team"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Team
            </Link>
            <Link
              href="/testimonials"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Testimonials
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/case-studies"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Case Studies
              </Link>
              <Link
                href="/team"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Team
              </Link>
              <Link
                href="/testimonials"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}