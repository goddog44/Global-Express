"use client";

import { useState, useEffect } from 'react'

export default function useLanguage() {
  const [currentLang, setCurrentLang] = useState('en')

  useEffect(() => {
    // Check for saved language preference
    const savedLang = localStorage.getItem('language')
    if (savedLang) {
      setCurrentLang(savedLang)
    }
  }, [])

  const switchLanguage = (lang) => {
    setCurrentLang(lang)
    localStorage.setItem('language', lang)
  }

  return [currentLang, switchLanguage]
}