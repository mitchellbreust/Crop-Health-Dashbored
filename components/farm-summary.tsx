"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Thermometer, Droplets, Sun, AlertTriangle, CheckCircle, Clock } from "lucide-react"

interface FarmSummaryProps {
  farmId: string
}

const mockFarmData = {
  "cairns-sugarcane": {
    name: "Cairns Sugar Farm",
    health: 78,
    crop: "Sugarcane",
    risk: "Medium",
    lastUpdate: "2024-06-15",
    weather: {
      temp: 28,
      humidity: 75,
      rainfall: 15,
      icon: "sunny",
    },
    metrics: {
      ndvi: 0.72,
      soilMoisture: 68,
      growthRate: 85,
    },
    recommendations: ["Monitor soil moisture levels", "Consider irrigation in dry areas", "Optimal growing conditions"],
  },
  "atherton-avocado": {
    name: "Atherton Avocado Farm",
    health: 92,
    crop: "Avocados",
    risk: "Low",
    lastUpdate: "2024-06-18",
    weather: {
      temp: 24,
      humidity: 82,
      rainfall: 22,
      icon: "cloudy",
    },
    metrics: {
      ndvi: 0.85,
      soilMoisture: 78,
      growthRate: 92,
    },
    recommendations: ["Excellent growing conditions", "Continue current practices", "Monitor for pests"],
  },
  "bundaberg-tomato": {
    name: "Bundaberg Tomato Farm",
    health: 65,
    crop: "Tomatoes",
    risk: "High",
    lastUpdate: "2024-06-17",
    weather: {
      temp: 32,
      humidity: 45,
      rainfall: 5,
      icon: "hot",
    },
    metrics: {
      ndvi: 0.58,
      soilMoisture: 42,
      growthRate: 65,
    },
    recommendations: [
      "Increase irrigation immediately",
      "Apply shade cloth during peak hours",
      "Monitor plant stress indicators",
    ],
  },
  "lockyer-lettuce": {
    name: "Lockyer Valley Lettuce",
    health: 88,
    crop: "Lettuce",
    risk: "Low",
    lastUpdate: "2024-06-16",
    weather: {
      temp: 26,
      humidity: 70,
      rainfall: 18,
      icon: "partly-cloudy",
    },
    metrics: {
      ndvi: 0.81,
      soilMoisture: 72,
      growthRate: 88,
    },
    recommendations: [
      "Optimal conditions maintained",
      "Ready for harvest in 2 weeks",
      "Continue current irrigation schedule",
    ],
  },
}

function HealthGauge({ value }: { value: number }) {
  const getHealthColor = (health: number) => {
    if (health >= 80) return "text-green-600"
    if (health >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getHealthStatus = (health: number) => {
    if (health >= 80) return "Excellent"
    if (health >= 60) return "Good"
    return "Needs Attention"
  }

  return (
    <div className="text-center space-y-2">
      <div className={`text-4xl font-bold ${getHealthColor(value)}`}>{value}%</div>
      <div className="text-sm text-gray-600">{getHealthStatus(value)}</div>
      <Progress value={value} className="h-2" />
    </div>
  )
}

export function FarmSummary({ farmId }: FarmSummaryProps) {
  const farm = mockFarmData[farmId as keyof typeof mockFarmData]

  if (!farm) return null

  const getRiskBadgeColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {/* Farm Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{farm.name}</CardTitle>
              <p className="text-sm text-gray-600">{farm.crop}</p>
            </div>
            <Badge className={getRiskBadgeColor(farm.risk)}>{farm.risk} Risk</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <HealthGauge value={farm.health} />
          <div className="flex items-center justify-center gap-1 mt-2 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            Updated {farm.lastUpdate}
          </div>
        </CardContent>
      </Card>

      {/* Weather Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Sun className="w-4 h-4" />
            Current Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <Thermometer className="w-5 h-5 mx-auto text-orange-500 mb-1" />
              <div className="text-lg font-semibold">{farm.weather.temp}°C</div>
              <div className="text-xs text-gray-600">Temperature</div>
            </div>
            <div>
              <Droplets className="w-5 h-5 mx-auto text-blue-500 mb-1" />
              <div className="text-lg font-semibold">{farm.weather.humidity}%</div>
              <div className="text-xs text-gray-600">Humidity</div>
            </div>
            <div>
              <Droplets className="w-5 h-5 mx-auto text-cyan-500 mb-1" />
              <div className="text-lg font-semibold">{farm.weather.rainfall}mm</div>
              <div className="text-xs text-gray-600">Rainfall</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Key Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>NDVI Index</span>
              <span className="font-medium">{farm.metrics.ndvi}</span>
            </div>
            <Progress value={farm.metrics.ndvi * 100} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Soil Moisture</span>
              <span className="font-medium">{farm.metrics.soilMoisture}%</span>
            </div>
            <Progress value={farm.metrics.soilMoisture} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Growth Rate</span>
              <span className="font-medium">{farm.metrics.growthRate}%</span>
            </div>
            <Progress value={farm.metrics.growthRate} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            {farm.health >= 80 ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
            )}
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {farm.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                {rec}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
