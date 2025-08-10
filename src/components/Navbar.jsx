'use client'

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faBars } from '@fortawesome/free-solid-svg-icons'
import DarkModeToggle from './DarkModeToggle'
import LanguageToggle from './LanguageToggle'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faGlobe} className="text-2xl text-primary mr-3" />
            <span className="font-bold text-xl">Global Trade Solutions</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#tracking" className="nav-link">Tracking</a>
            <a href="#testimonials" className="nav-link">Testimonials</a>
            <a href="#contact" className="nav-link">Contact</a>
            <a href="#blog" className="nav-link">Blog</a>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <DarkModeToggle />
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-all duration-300 ${mobileMenuOpen ? 'block' : 'hidden'}`}
      >
        <div className="px-4 py-2 space-y-2">
          <a href="#home" className="block py-2 nav-link">Home</a>
          <a href="#about" className="block py-2 nav-link">About</a>
          <a href="#services" className="block py-2 nav-link">Services</a>
          <a href="#tracking" className="block py-2 nav-link">Tracking</a>
          <a href="#testimonials" className="block py-2 nav-link">Testimonials</a>
          <a href="#contact" className="block py-2 nav-link">Contact</a>
          <a href="#blog" className="block py-2 nav-link">Blog</a>
        </div>
      </div>
    </nav>
  )
}