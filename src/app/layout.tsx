'use client'

import '../styles/globals.css'
import { TranslationProvider } from '@/context/TranslationContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <TranslationProvider>
          {children}
        </TranslationProvider>
      </body>
    </html>
  )
}
