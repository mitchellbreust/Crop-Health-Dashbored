"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface MapSectionProps {
  selectedFarm: string
  onFarmSelect: (farmId: string) => void
  selectedDataLayer: string
  onDataLayerChange: (layer: string) => void
}

const farmRegions = [
  {
    id: "cairns-sugarcane",
    name: "Cairns Sugar Farm",
    position: { top: "20%", left: "85%" },
    health: 78,
    color: "bg-yellow-500",
  },
  {
    id: "atherton-avocado",
    name: "Atherton Avocado",
    position: { top: "55%", left: "70%" },
    health: 88,
    color: "bg-green-500",
  },
]

const dataLayers = ["NDVI", "Soil Moisture", "Rainfall"]

export function MapSection({ selectedFarm, onFarmSelect, selectedDataLayer, onDataLayerChange }: MapSectionProps) {
  const [hoveredFarm, setHoveredFarm] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-900">Northern QLD, Atherton</h2>

        {/* Data Layer Toggle */}
        <div className="flex flex-wrap gap-2">
          {dataLayers.map((layer) => (
            <Button
              key={layer}
              variant={selectedDataLayer === layer ? "default" : "outline"}
              size="sm"
              onClick={() => onDataLayerChange(layer)}
              className="text-xs"
            >
              {layer}
            </Button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden border-2 border-gray-200">
        {/* Queensland Map Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
        <img
            src={
              selectedDataLayer === "Soil Moisture"
                ? "/soil.png"
                : selectedDataLayer === "Rainfall"
                ? "/rainfall.png"
                : "/response.png" // default to NDVI
            }
            alt="Queensland Map"
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        {/* Farm Region Markers */}
        {farmRegions.map((farm) => (
          <div
            key={farm.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ top: farm.position.top, left: farm.position.left }}
            onClick={() => onFarmSelect(farm.id)}
            onMouseEnter={() => setHoveredFarm(farm.id)}
            onMouseLeave={() => setHoveredFarm(null)}
          >
            {/* Farm Marker */}
            <div
              className={`w-4 h-4 rounded-full ${farm.color} border-2 border-white shadow-lg transition-all duration-200 ${
                selectedFarm === farm.id ? "scale-150 ring-4 ring-blue-300" : "hover:scale-125"
              }`}
            />

            {/* Tooltip */}
            {(hoveredFarm === farm.id || selectedFarm === farm.id) && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg border min-w-max z-10">
                <p className="text-sm font-medium text-gray-900">{farm.name}</p>
                <p className="text-xs text-gray-600">Health: {farm.health}%</p>
              </div>
            )}
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Health Status</h3>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-700">Excellent (80-100%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-gray-700">Good (60-79%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-700">Needs Attention (&lt;60%)</span>
            </div>
          </div>
        </div>

        {/* Current Data Layer Indicator */}
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
            Viewing: {selectedDataLayer}
          </Badge>
        </div>
      </div>
    </div>
  )
}
