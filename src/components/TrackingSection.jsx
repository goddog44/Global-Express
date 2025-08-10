'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faDownload, 
  faExclamationTriangle,
  faClock,
  faPrint,
  faBarcode
} from '@fortawesome/free-solid-svg-icons'
import InteractiveMap from './InteractiveMap'

export default function TrackingSection({ heroTrackingData }) {
  const searchParams = useSearchParams()
  const urlTrackingCode = searchParams.get('code')
  const [trackingCode, setTrackingCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [trackingData, setTrackingData] = useState(null)
  const [currentSpeed, setCurrentSpeed] = useState(1)

  // Mock route points for the map (you can replace this with real data from your API)
  const mockRoutePoints = [
    { lat: 51.5074, lng: -0.1278, name: "London, UK", status: "Shipped", date: "2025-08-05 17:00" },
    { lat: 48.8566, lng: 2.3522, name: "Paris, France", status: "In Transit", date: "2025-08-06 09:00" },
    { lat: 28.7041, lng: 77.1025, name: "New Delhi, India", status: "Arrived at Port", date: "2025-08-08 12:30" },
    { lat: 19.0760, lng: 72.8777, name: "Mumbai, India", status: "Destination", date: "2025-08-10 15:00" }
  ]

  // Handle data from Hero component
  useEffect(() => {
    if (heroTrackingData) {
      console.log('TrackingSection received hero data:', heroTrackingData);
      setTrackingCode(heroTrackingData.trackingCode);
      setTrackingData(heroTrackingData.trackingData);
      setError(null);
    }
  }, [heroTrackingData]);

  // Handle URL tracking code
  useEffect(() => {
    if (urlTrackingCode && !heroTrackingData) {
      setTrackingCode(urlTrackingCode)
      fetchTrackingData(urlTrackingCode)
    }
  }, [urlTrackingCode, heroTrackingData])

  const fetchTrackingData = async (code) => {
    setIsLoading(true)
    setError(null)

    const apiUrl = process.env.NEXT_PUBLIC_DJNANGO_API_URL
    const url = `${apiUrl}${code}/`

    console.log('TrackingSection: Fetching URL:', url)

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      console.log('TrackingSection Response status:', response.status)

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Code de suivi non trouvé. Veuillez vérifier votre numéro.')
        }
        throw new Error(`Échec de récupération des données (Status: ${response.status})`)
      }

      const data = await response.json()
      console.log('TrackingSection Received tracking data:', data)
      setTrackingData(data)
    } catch (err) {
      console.error('TrackingSection Fetch error:', err)
      setError(err.message)
      setTrackingData(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => {
    if (e) e.preventDefault()
    if (!trackingCode.trim()) {
      setError('Veuillez saisir un code de suivi')
      return
    }
    fetchTrackingData(trackingCode.trim())
  }

  const downloadTicket = () => {
    // Create a more detailed ticket
    const ticketData = {
  trackingNumber: trackingData?.tracking_number || trackingCode,
  date: new Date().toLocaleDateString('fr-FR'),
  sender: {
    name: trackingData?.sender_name || '',
    address: trackingData?.sender_address || '',
    phone: trackingData?.sender_phone || '',
    email: trackingData?.sender_email || ''
  },
  recipient: {
    name: trackingData?.receiver_name || '',
    address: trackingData?.receiver_address || '',
    phone: trackingData?.receiver_phone || '',
    email: trackingData?.receiver_email || ''
  },
  shipment: {
    status: trackingData?.status || 'En route',
    weight: trackingData?.weight || '',
    type: trackingData?.shipment_type || '',
    shippingMode: trackingData?.shipping_mode || '',
    expectedDeliveryDate: trackingData?.expected_delivery_date || '',
    packages: trackingData?.packages || [],
    history: trackingData?.history || [],
    carrier: trackingData?.carrier || '',
    paymentMode: trackingData?.payment_mode || '',
    totalFreight: trackingData?.total_freight || ''
  }
};

    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ticketData, null, 2))
    const downloadElement = document.createElement("a")
    downloadElement.setAttribute("href", dataStr)
    downloadElement.setAttribute("download", `ticket-${trackingCode}.json`)
    document.body.appendChild(downloadElement)
    downloadElement.click()
    document.body.removeChild(downloadElement)
  }

  const printTicket = () => {
    window.print()
  }

  return (
    <section id="tracking" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="text-center mb-14">
    <h2 className="text-3xl md:text-5xl font-extrabold mb-3 text-gray-900 dark:text-white tracking-tight">
      Suivi Avancé de Colis
    </h2>
    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
      Suivez vos expéditions en temps réel avec notre carte interactive
    </p>
  </div>

  {/* Tracking Form */}
  <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-xl shadow-lg mb-10">
    <form className="flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        value={trackingCode}
        onChange={(e) => setTrackingCode(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
        placeholder="Entrez votre code de suivi..."
        className="flex-1 px-5 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg 
                   focus:outline-none focus:ring-4 focus:ring-primary/40 dark:bg-gray-800 dark:text-white"
        disabled={isLoading}
        aria-label="Code de suivi"
      />
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={isLoading}
        className="bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed 
                   text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center min-w-[160px]"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
            Suivi en cours...
          </>
        ) : (
          'Suivre le Colis'
        )}
      </button>
    </form>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 italic">Essayez : GT2024001234</p>
  </div>

  {/* Error Message */}
  {error && (
    <div className="mb-8 max-w-3xl mx-auto">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg p-5">
        <div className="flex items-center space-x-3">
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600 dark:text-red-400" />
          <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
        </div>
      </div>
    </div>
  )}
</div>

        {/* Tracking Results */}
        {trackingData && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {/* Header with Barcode and Actions */}
            <div className="bg-gray-100 dark:bg-gray-700 px-8 py-4 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <FontAwesomeIcon icon={faBarcode} className="text-2xl text-gray-600" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Colis N° {trackingCode}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ETAT DE L&apos;EXPEDITION HONGROUTE
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={printTicket}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
                  >
                    <FontAwesomeIcon icon={faPrint} className="mr-2" />
                    <span>Imprimer</span>
                  </button>
                  <button 
                    onClick={downloadTicket}
                    className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
                  >
                    <FontAwesomeIcon icon={faDownload} className="mr-2" />
                    <span>Télécharger</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-8">
                {/* Sender and Recipient Information */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white border-b pb-2">
                      Renseignements sur l&apos;expéditeur
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>{trackingData?.sender_name || 'N/A'}</strong></p>
                      <p>{trackingData?.sender_address || 'N/A'}</p>
                      <p>{trackingData?.sender_phone || 'N/A'}</p>
                      <p className="text-blue-600">{trackingData?.sender_email || 'N/A'}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white border-b pb-2">
                      Informations sur le récepteur
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>{trackingData?.receiver_name || 'N/A'}</strong></p>
                      <p>{trackingData?.receiver_address || 'N/A'}</p>
                      <p>{trackingData?.receiver_phone || 'N/A'}</p>
                      <p className="text-blue-600">{trackingData?.receiver_email || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expedition Information */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white border-b pb-2">
                  Informations sur l&apos;expédition
                </h4>
                <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Origine :</p>
                    <p className="font-semibold">{trackingData.origin || 'United Kingdom'}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Destination :</p>
                    <p className="font-semibold">{trackingData.destination || 'India'}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Poids :</p>
                    <p className="font-semibold">{trackingData.weight || '1kg'}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Produit :</p>
                    <p className="font-semibold">{trackingData.product || 'Enveloppe'}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total du fret :</p>
                    <p className="font-semibold">{trackingData.freight_cost || '49€'}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Date de réception :</p>
                    <p className="font-semibold">{trackingData.received_date || '2025-08-05'}</p>
                  </div>
                </div>
              </div>

              {/* Package Details */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white border-b pb-2">
                  Détails du colis
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Package :</p>
                      <p className="font-semibold text-gray-900 dark:text-white">1</p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        {trackingData.status || 'En route'}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Transporteur :</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {trackingData.carrier || 'FedEx'}
                    </p>
                    <p className="text-sm text-blue-600">Type d&apos;expédition: {trackingData.shipping_type || 'Truckload'}</p>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mode d&apos;expédition :</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {trackingData.shipping_mode || 'Land Shipping'}
                    </p>
                    <p className="text-sm text-yellow-600">Référence: {trackingData.reference || '00001234'}</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mode de paiement :</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {trackingData.payment_mode || 'BACS'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timing Information */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Qté :</p>
                  <p className="font-semibold">{trackingData.quantity || '1'}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Date de livraison prévue :</p>
                  <p className="font-semibold">{trackingData.estimated_delivery || '2025-08-09'}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Heure de départ :</p>
                  <p className="font-semibold">{trackingData.departure_time || '17:00 pm'}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Heure de Récupération :</p>
                  <p className="font-semibold">{trackingData.pickup_time || '16:30 pm'}</p>
                </div>
              </div>

              {/* Package Specifications Table */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Spécifications du colis
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="border border-gray-300 px-4 py-2 text-left">Qté</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Type de pièce</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Longueur (cm)</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Largeur(cm)</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Hauteur(cm)</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Poids(kg)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white dark:bg-gray-800">
                        <td className="border border-gray-300 px-4 py-2">1</td>
                        <td className="border border-gray-300 px-4 py-2">Others</td>
                        <td className="border border-gray-300 px-4 py-2">Enveloppe</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 grid md:grid-cols-3 gap-4 text-sm">
                  <p><strong>Poids volumétrique total :</strong> {trackingData.volumetric_weight || '0.006kg'}</p>
                  <p><strong>Volume total :</strong> {trackingData.total_volume || '0.006cu.m'}</p>
                  <p><strong>Poids total réel :</strong> {trackingData.actual_weight || '0.006kg'}</p>
                </div>
              </div>

              {/* Interactive Map Section */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Itinéraire du Colis</h4>
                
                <div className="flex gap-2 mb-4">
                  <button 
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${currentSpeed === 0.5 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                    onClick={() => setCurrentSpeed(0.5)}
                  >
                    Lent
                  </button>
                  <button 
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${currentSpeed === 1 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                    onClick={() => setCurrentSpeed(1)}
                  >
                    Normal
                  </button>
                  <button 
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${currentSpeed === 2 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                    onClick={() => setCurrentSpeed(2)}
                  >
                    Rapide
                  </button>
                </div>
                
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <InteractiveMap routePoints={mockRoutePoints} currentSpeed={currentSpeed} />
                </div>
                
                <div className="mt-4 flex items-center text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faClock} className="mr-2" />
                  <strong>Temps de Transit Estimé :</strong> 
                  <span className="ml-2">{trackingData.transit_time || '7-10 business days'}</span>
                </div>
              </div>

              {/* Tracking History */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Historique des expéditions</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Heure</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Emplacement</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Statut</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Mis à jour par</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Remarques</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-blue-50 dark:bg-blue-900/20">
                        <td className="border border-gray-300 px-4 py-2 font-medium">2025-08-05</td>
                        <td className="border border-gray-300 px-4 py-2">17:00 pm</td>
                        <td className="border border-gray-300 px-4 py-2">France</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            En route
                          </span>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">shipcolis</td>
                        <td className="border border-gray-300 px-4 py-2">Votre colis a bien été pris en compte</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 className="font-semibold mb-2 text-gray-900 dark:text-white">Commentaires :</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  {trackingData.comments || "Votre satisfaction est notre priorité"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Parfait.</p>
              </div>
            </div>
        )}
      </div>
    </section>
  )
}