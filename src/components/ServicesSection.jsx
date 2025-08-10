'use client'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faUpload, faTruck, faCheck } from '@fortawesome/free-solid-svg-icons'

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ... rest of your header code ... */}

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Import Services */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
            <FontAwesomeIcon icon={faDownload} className="text-4xl text-primary mb-6" />
            <h3 className="text-xl font-bold mb-4">Import Services</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Streamlined import processes with full customs clearance, documentation, and compliance management.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <FontAwesomeIcon icon={faCheck} className="text-accent mr-2" />
                <span>Customs Clearance</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faCheck} className="text-accent mr-2" />
                <span>Documentation Support</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faCheck} className="text-accent mr-2" />
                <span>Compliance Management</span>
              </li>
            </ul>
          </div>

          {/* Export Services */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
            <FontAwesomeIcon icon={faUpload} className="text-4xl text-primary mb-6" />
            <h3 className="text-xl font-bold mb-4">Export Solutions</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              End-to-end export services helping you reach global markets efficiently and cost-effectively.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <FontAwesomeIcon icon={faCheck} className="text-accent mr-2" />
                <span>Market Analysis</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faCheck} className="text-accent mr-2" />
                <span>Export Documentation</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faCheck} className="text-accent mr-2" />
                <span>Shipping Coordination</span>
              </li>
            </ul>
          </div>

          {/* Logistics */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
            <FontAwesomeIcon icon={faTruck} className="text-4xl text-primary mb-6" />
            <h3 className="text-xl font-bold mb-4">Logistics Management</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Comprehensive logistics solutions including warehousing, transportation, and supply chain optimization.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <FontAwesomeIcon icon={faCheck} className="text-accent mr-2" />
                <span>Warehousing</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faCheck} className="text-accent mr-2" />
                <span>Transportation</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faCheck} className="text-accent mr-2" />
                <span>Supply Chain Optimization</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ... rest of your component ... */}
      </div>
    </section>
  )
}