'use client';

import { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { OUTLETS } from '@/lib/constants';
import { MapPin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const mapContainerStyle = {
  width: '100%',
  height: '600px',
};

const defaultCenter = { lat: 6.7625, lng: 79.895 };

export default function Outlets() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { elementRef, isVisible } = useScrollAnimation();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const selectedOutlet = selectedIndex !== null ? OUTLETS[selectedIndex] : null;

  const mapCenter = selectedOutlet
    ? { lat: selectedOutlet.lat, lng: selectedOutlet.lng }
    : defaultCenter;

  // Open Google Maps navigation
  const handleGetDirections = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
    window.open(url, '_blank');
  };

  return (
    <section
      ref={elementRef as any}
      id="outlets"
      className={`py-12 sm:py-16 md:py-20 bg-[#fbfbfc] transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block mb-4">
          <span className="text-xs sm:text-sm font-semibold text-[#e98d1a] uppercase tracking-wider bg-[#e98d1a]/10 px-4 py-2 rounded-full">
            Our Outlets
          </span>
        </div>
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-4">
            Where to <span className="text-[#e98d1a]">Find Us</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Visit us at any of our convenient locations and experience freshly baked goodness!
          </p>
        </div>

        {/* Grid layout: left cards + right map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {/* LEFT — vertical cards */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {OUTLETS.map((outlet, index) => (
              <div
                key={outlet.name}
                onClick={() => setSelectedIndex(index)}
                className={`cursor-pointer relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:shadow-xl active:-translate-y-1 ${
                  selectedIndex === index
                    ? 'shadow-lg ring-2 ring-[#e98d1a]/20 scale-[1.02]'
                    : 'shadow-md'
                }`}
              >
                <div className="pr-12">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-black">
                      {outlet.name}
                    </h3>
                    <p className="text-green-600 text-xs sm:text-sm font-semibold flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-lg whitespace-nowrap">
                      <span>🕒</span>
                      {outlet.hours}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-700 text-sm sm:text-base flex items-start gap-2">
                      <span className="text-[#e98d1a] mt-0.5">📍</span>
                      <span>{outlet.address}</span>
                    </p>

                    {outlet.phone && (
                      <p className="text-gray-600 text-xs sm:text-sm flex items-center gap-2">
                        <span className="text-[#e98d1a]">📞</span>
                        {outlet.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Get Directions Button */}
                <div className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 group">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGetDirections(outlet.lat, outlet.lng);
                    }}
                    className="bg-[#e98d1a] hover:bg-[#d67c15] active:bg-[#d67c15] text-white p-3 rounded-full shadow-lg hover:shadow-xl active:shadow-xl transition-all duration-300 hover:scale-110 active:scale-110"
                    aria-label="Get Directions"
                  >
                    <MapPin className="w-5 h-5 sm:w-5 sm:h-5" />
                  </button>

                  {/* Tooltip */}
                  <div className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-xs py-2 px-3 rounded-lg transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    Get Directions
                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — Google Map */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden h-[400px] sm:h-[500px] md:h-[600px] sticky top-4">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={mapCenter}
                zoom={12}
                options={{
                  styles: [
                    {
                      featureType: 'poi',
                      elementType: 'labels',
                      stylers: [{ visibility: 'off' }],
                    },
                  ],
                }}
              >
                {OUTLETS.map((outlet, index) => (
                  <Marker
                    key={outlet.name}
                    position={{ lat: outlet.lat, lng: outlet.lng }}
                    onClick={() => {
                      setSelectedIndex(index);
                    }}
                    animation={
                      selectedIndex === index ? window.google.maps.Animation.BOUNCE : undefined
                    }
                  />
                ))}
              </GoogleMap>
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#e98d1a] border-t-transparent mb-4"></div>
                <p className="text-gray-500 text-sm sm:text-base font-medium">Loading map...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e98d1a;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d67c15;
        }
      `}</style>
    </section>
  );
}
