'use client'

import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react'

export default function InteractiveMap({ routePoints, currentSpeed = 1 }) {
  const mapRef = useRef(null)
  const routeLineRef = useRef(null)
  const packageMarkerRef = useRef(null)
  const markersRef = useRef([])
  const animationRef = useRef(null)
  const currentPositionRef = useRef(0)
  const progressRef = useRef(0)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    // Only initialize if running in browser and Leaflet is available
    if (typeof window !== 'undefined') {
      const initializeMap = async () => {
        // Dynamic import of Leaflet to avoid SSR issues
        const L = await import('leaflet')
        await import('leaflet/dist/leaflet.css')

        // Initialize the map
        if (!mapInstanceRef.current) {
          mapInstanceRef.current = L.map('interactiveMap').setView([35, -100], 3)

          // Add tile layer
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
          }).addTo(mapInstanceRef.current)
        }

        // Create custom icons
        const createCustomIcon = (status) => {
          let color = '#5D5CDE'
          let icon = '📦'
          
          switch(status) {
            case 'Shipped': color = '#28a745'; icon = '✅'; break
            case 'Arrived at Port': color = '#FF6B6B'; icon = '🚢'; break
            case 'In Transit': color = '#ffc107'; icon = '⏳'; break
            case 'Destination': color = '#17a2b8'; icon = '🏠'; break
          }
          
          return L.divIcon({
            html: `<div style="background: ${color}; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">${icon}</div>`,
            className: 'custom-icon',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          })
        }

        // Clear previous markers if any
        markersRef.current.forEach(marker => mapInstanceRef.current.removeLayer(marker))
        markersRef.current = []

        // Add markers
        routePoints.forEach((point, index) => {
          const marker = L.marker([point.lat, point.lng], {
            icon: createCustomIcon(point.status)
          }).addTo(mapInstanceRef.current)
          
          marker.bindPopup(`
            <div style="text-align: center; padding: 10px;">
              <strong>${point.name}</strong><br>
              <span style="color: #666;">${point.status}</span><br>
              <small>${point.date}</small>
            </div>
          `)
          
          markersRef.current.push(marker)
        })

        // Create route line
        if (routeLineRef.current) {
          mapInstanceRef.current.removeLayer(routeLineRef.current)
        }
        routeLineRef.current = L.polyline(routePoints.map(p => [p.lat, p.lng]), {
          color: '#5D5CDE',
          weight: 4,
          opacity: 0.7,
          dashArray: '10, 10'
        }).addTo(mapInstanceRef.current)

        // Package animation
        if (packageMarkerRef.current) {
          mapInstanceRef.current.removeLayer(packageMarkerRef.current)
        }
        
        const packageIcon = L.divIcon({
          html: '<div style="background: #FF6B6B; color: white; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4); animation: pulse 2s infinite;">📦</div>',
          className: 'package-marker',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        })

        packageMarkerRef.current = L.marker([routePoints[0].lat, routePoints[0].lng], {
          icon: packageIcon
        }).addTo(mapInstanceRef.current)

        // Reset animation state
        currentPositionRef.current = 0
        progressRef.current = 0

        // Start animation
        animatePackage(L)

        // Fit bounds
        mapInstanceRef.current.fitBounds(routeLineRef.current.getBounds(), { padding: [20, 20] })
      }

      initializeMap().catch(console.error)

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove()
          mapInstanceRef.current = null
        }
      }
    }
  }, [routePoints])

  const animatePackage = (L) => {
    if (currentPositionRef.current >= markersRef.current.length - 1) return
    if (!packageMarkerRef.current || !markersRef.current.length) return

    const currentPoint = markersRef.current[currentPositionRef.current].getLatLng()
    const nextPoint = markersRef.current[currentPositionRef.current + 1].getLatLng()
    
    // Linear interpolation between points
    const lat = currentPoint.lat + (nextPoint.lat - currentPoint.lat) * progressRef.current
    const lng = currentPoint.lng + (nextPoint.lng - currentPoint.lng) * progressRef.current
    
    packageMarkerRef.current.setLatLng([lat, lng])
    
    // Progress
    progressRef.current += currentSpeed / 1000
    
    if (progressRef.current >= 1) {
      progressRef.current = 0
      currentPositionRef.current++
      
      if (currentPositionRef.current < markersRef.current.length - 1) {
        setTimeout(() => {
          animationRef.current = requestAnimationFrame(() => animatePackage(L))
        }, 2000)
      }
    } else {
      animationRef.current = requestAnimationFrame(() => animatePackage(L))
    }
  }

  return (
    <div className="relative">
      <div id="interactiveMap" className="h-[500px] w-full rounded-lg"></div>
      <style jsx global>{`
        .leaflet-container {
          border-radius: 0.5rem;
        }
        .custom-icon {
          background: transparent !important;
          border: none !important;
        }
        .package-marker {
          background: transparent !important;
          border: none !important;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}

InteractiveMap.propTypes = {
  routePoints: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      status: PropTypes.string,
      name: PropTypes.string,
      date: PropTypes.string,
    })
  ).isRequired,
  currentSpeed: PropTypes.number,
};