'use client'

import Layout from '@/components/Layout'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import TrackingSection from '@/components/TrackingSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import ContactSection from '@/components/ContactSection'
import BlogSection from '@/components/BlogSection'
import { SetStateAction, useState } from 'react'
import { Suspense } from 'react';

export default function Page() {
  const [heroTrackingData, setHeroTrackingData] = useState(null)

  const handleTrackingFromHero = (data: SetStateAction<null>) => {
    console.log('Page received tracking data from Hero:', data)
    setHeroTrackingData(data)
  }
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
       <HeroSection onTrackingSuccess={handleTrackingFromHero} />
      <AboutSection />
      <ServicesSection />
      <TrackingSection heroTrackingData={heroTrackingData} />
      <TestimonialsSection />
      <ContactSection />
      <BlogSection />
       </Suspense>
    </Layout>
  )
}