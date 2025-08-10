'use client'
import React, { createContext, useContext, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import en from '../locales/en.json'
import fr from '../locales/fr.json'
import useLanguage from '@/hooks/useLanguage' // your existing hook

const translations = { en, fr }

const TranslationContext = createContext({
  locale: 'en',
  t: (k) => k,
  setLocale: () => {},
})

export function TranslationProvider({ children }) {
  const [locale, setLocale] = useLanguage() // returns [currentLang, switchLanguage]

  // keep <html lang="..."> in sync
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
  }, [locale])

  // translator function: supports nested keys "hero.title"
  const t = useMemo(() => {
    return (key) => {
      const parts = key.split('.')
      let obj = translations[locale] || translations.en
      for (const p of parts) {
        obj = obj?.[p]
        if (obj == null) {
          // fallback to english if missing
          let enObj = translations.en
          for (const q of parts) {
            enObj = enObj?.[q]
            if (enObj == null) return key
          }
          return enObj
        }
      }
      return obj
    }
  }, [locale])

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

TranslationProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useTranslation = () => useContext(TranslationContext)
