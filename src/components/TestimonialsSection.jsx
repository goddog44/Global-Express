'use client'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function TestimonialsSection() {
  const testimonials = [
    {
      initials: "JD",
      name: "John Davis",
      position: "CEO, TechCorp",
      quote: "Global Trade Solutions transformed our supply chain. Their expertise and reliability have been invaluable to our international expansion."
    },
    {
      initials: "ML",
      name: "Maria Lopez",
      position: "Director, Fashion Forward",
      quote: "Outstanding service! They handled our complex textile imports seamlessly, saving us time and money while ensuring compliance."
    },
    {
      initials: "RC",
      name: "Robert Chen",
      position: "Manager, Global Electronics",
      quote: "Their tracking system is fantastic! Real-time updates and excellent customer support make them our preferred logistics partner."
    }
  ]

  const caseStudies = [
    {
      title: "Case Study: European Expansion",
      description: "Helped TechCorp expand to 15 European markets, reducing logistics costs by 30% while improving delivery times.",
      stats: "30% Cost Reduction • 15 New Markets"
    },
    {
      title: "Case Study: Supply Chain Optimization",
      description: "Streamlined Fashion Forward's global supply chain, resulting in 40% faster delivery and improved inventory management.",
      stats: "40% Faster Delivery • Improved Efficiency"
    }
  ]

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            What our clients say about our services
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.position}</p>
                </div>
              </div>
              <div className="text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300">&quot;{testimonial.quote}&quot;</p>
            </div>
          ))}
        </div>

        {/* Case Studies */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8">Success Stories</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg text-left">
                <h4 className="font-semibold mb-3">{study.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{study.description}</p>
                <div className="text-sm text-primary font-semibold">{study.stats}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}