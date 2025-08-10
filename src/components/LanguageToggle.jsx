"use client";

import React from 'react'
import useLanguage from '../hooks/useLanguage'

export default function LanguageToggle() {
  const [currentLang, switchLanguage] = useLanguage()

  return (
    <button 
      onClick={() => switchLanguage(currentLang === 'en' ? 'fr' : 'en')}
      className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      {currentLang.toUpperCase()}
    </button>
  )
}