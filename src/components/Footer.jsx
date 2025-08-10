'use client'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  const links = [
    {
      title: "Services",
      items: [
        { text: "Import Services", href: "#" },
        { text: "Export Solutions", href: "#" },
        { text: "Logistics Management", href: "#" },
        { text: "Customs Clearance", href: "#" }
      ]
    },
    {
      title: "Quick Links",
      items: [
        { text: "About Us", href: "#about" },
        { text: "Track Package", href: "#tracking" },
        { text: "Contact", href: "#contact" },
        { text: "Blog", href: "#blog" }
      ]
    }
  ]

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faGlobe} className="text-2xl text-primary mr-3" />
              <span className="font-bold text-xl">Global Trade Solutions</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted partner for international trade excellence. Connecting businesses worldwide since 2003.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>

          {/* Links */}
          {links.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-gray-300">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <a href={item.href} className="hover:text-primary">{item.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <p><FontAwesomeIcon icon={faPhone} className="mr-2" />+1 (555) 123-4567</p>
              <p><FontAwesomeIcon icon={faEnvelope} className="mr-2" />info@globaltradesolutions.com</p>
              <p><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />123 Trade Center Blvd, NY</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Global Trade Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}