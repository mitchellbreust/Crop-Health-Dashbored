"use client"

import { useState } from "react"
import { MapSection } from "@/components/map-section"
import { FarmSummary } from "@/components/farm-summary"
import { TrendsSection } from "@/components/trends-section"
import { Card } from "@/components/ui/card"

export default function CropHealthDashboard() {
  const [selectedFarm, setSelectedFarm] = useState("cairns-sugarcane")
  const [selectedDataLayer, setSelectedDataLayer] = useState("NDVI")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🌾</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Crop Health Pulse</h1>
                <p className="text-sm text-gray-600">Queensland Agricultural Monitoring</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="text-sm font-medium">June 18, 2024</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <MapSection
                selectedFarm={selectedFarm}
                onFarmSelect={setSelectedFarm}
                selectedDataLayer={selectedDataLayer}
                onDataLayerChange={setSelectedDataLayer}
              />
            </Card>
          </div>

          {/* Farm Summary - Takes up 1 column */}
          <div className="lg:col-span-1">
            <FarmSummary farmId={selectedFarm} />
          </div>
        </div>

        {/* Trends Section - Full width */}
        <div className="mt-6">
          <Card className="p-6">
            <TrendsSection selectedFarm={selectedFarm} />
          </Card>
        </div>
      </main>
    </div>
  )
}
