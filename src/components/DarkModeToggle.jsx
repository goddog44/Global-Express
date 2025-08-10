'use client'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import useDarkMode from '../hooks/useDarkMode'

export default function DarkModeToggle() {
  const [darkMode, toggleDarkMode] = useDarkMode()

  return (
    <button 
      onClick={toggleDarkMode}
      className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      {darkMode ? (
        <FontAwesomeIcon icon={faSun} />
      ) : (
        <FontAwesomeIcon icon={faMoon} />
      )}
    </button>
  )
}