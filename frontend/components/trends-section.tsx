"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { TrendingUp, Calendar, BarChart3 } from "lucide-react"

interface TrendsSectionProps {
  selectedFarm: string
}

const mockTrendsData = {
  "cairns-sugarcane": [
    { month: "Jan", health: 65, ndvi: 0.68, rainfall: 180 },
    { month: "Feb", health: 70, ndvi: 0.71, rainfall: 165 },
    { month: "Mar", health: 75, ndvi: 0.74, rainfall: 145 },
    { month: "Apr", health: 82, ndvi: 0.78, rainfall: 95 },
    { month: "May", health: 78, ndvi: 0.72, rainfall: 45 },
    { month: "Jun", health: 85, ndvi: 0.75, rainfall: 25 },
  ],
  "atherton-avocado": [
    { month: "Jan", health: 88, ndvi: 0.82, rainfall: 220 },
    { month: "Feb", health: 90, ndvi: 0.84, rainfall: 195 },
    { month: "Mar", health: 85, ndvi: 0.81, rainfall: 175 },
    { month: "Apr", health: 92, ndvi: 0.86, rainfall: 125 },
    { month: "May", health: 89, ndvi: 0.83, rainfall: 85 },
    { month: "Jun", health: 92, ndvi: 0.85, rainfall: 65 },
  ],
  "bundaberg-tomato": [
    { month: "Jan", health: 75, ndvi: 0.72, rainfall: 95 },
    { month: "Feb", health: 72, ndvi: 0.69, rainfall: 85 },
    { month: "Mar", health: 68, ndvi: 0.65, rainfall: 75 },
    { month: "Apr", health: 70, ndvi: 0.67, rainfall: 45 },
    { month: "May", health: 65, ndvi: 0.62, rainfall: 25 },
    { month: "Jun", health: 65, ndvi: 0.58, rainfall: 15 },
  ],
  "lockyer-lettuce": [
    { month: "Jan", health: 82, ndvi: 0.78, rainfall: 125 },
    { month: "Feb", health: 85, ndvi: 0.81, rainfall: 115 },
    { month: "Mar", health: 88, ndvi: 0.83, rainfall: 105 },
    { month: "Apr", health: 90, ndvi: 0.85, rainfall: 75 },
    { month: "May", health: 87, ndvi: 0.82, rainfall: 55 },
    { month: "Jun", health: 88, ndvi: 0.81, rainfall: 45 },
  ],
}


export default function SimpleLineChart({
  data,
  metric,
}: {
  data: any[]
  metric: string
}) {
  return (
    <div className="flex h-20 items-end gap-1">
      {data.map((point: any, idx: number) => {
        const value =
          metric === "health"
            ? point.health
            : metric === "rainfall"
            ? point.rainfall
            : point.ndvi

        // Normalize height to fit in the 80px chart
        const maxHeight = 80
        const barHeight =
          metric === "health"
            ? (value / 100) * maxHeight
            : metric === "rainfall"
            ? Math.min((value / 200) * maxHeight, maxHeight) // assuming 200mm as rough max
            : value * maxHeight // NDVI usually between 0 and 1

        const bgColor =
          metric === "health"
            ? "bg-green-500"
            : metric === "rainfall"
            ? "bg-cyan-400"
            : "bg-blue-500"

        return (
          <div
            key={idx}
            className={`w-full rounded-md ${bgColor}`}
            style={{ height: `${barHeight}px` }}
            title={`${point.month}: ${value.toFixed(2)}`}
          ></div>
        )
      })}
    </div>
  )
}

export function TrendsSection({ selectedFarm }: TrendsSectionProps) {
  const [selectedMonth, setSelectedMonth] = useState(6)
  const [selectedMetric, setSelectedMetric] = useState("health")

  const trendsData = mockTrendsData[selectedFarm as keyof typeof mockTrendsData] || mockTrendsData["cairns-sugarcane"]
  const currentData = trendsData[selectedMonth - 1]

  const metrics = [
    { key: "health", label: "Health Score", unit: "%", color: "text-green-600" },
    { key: "ndvi", label: "NDVI Index", unit: "", color: "text-blue-600" },
    { key: "rainfall", label: "Soil Moisture", unit: "mm", color: "text-cyan-600" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Historical Trends</h2>
        </div>

        {/* Metric Selection */}
        <div className="flex gap-2">
          {metrics.map((metric) => (
            <Button
              key={metric.key}
              variant={selectedMetric === metric.key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMetric(metric.key)}
              className="text-xs"
            >
              {metric.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Time Slider */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Time Period: {trendsData[selectedMonth - 1]?.month} 2024
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={[selectedMonth]}
              onValueChange={(value) => setSelectedMonth(value[0])}
              max={6}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            {metrics.find((m) => m.key === selectedMetric)?.label} Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SimpleLineChart data={trendsData} metric={selectedMetric} />
        </CardContent>
      </Card>

      {/* Comparison View */}
<div className="grid grid-cols-1 md:grid-cols-8">
  <div className="md:col-start-2 md:col-span-6"> {/* This div spans columns 2-3 */}
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Click on point on graph to display image</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gradient-to-br from-yellow-100 to-green-200 rounded-lg flex items-center justify-center">
          <img
            src="/placeholder.svg?height=200&width=300"
            alt="January Satellite View"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Health: {trendsData[0].health}% | NDVI: {trendsData[0].ndvi}
        </div>
      </CardContent>
    </Card>
  </div>

      </div>

      {/* Current Month Summary */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{currentData?.health}%</div>
              <div className="text-sm text-gray-600">Current Health</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{currentData?.ndvi}</div>
              <div className="text-sm text-gray-600">NDVI Index</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-600">{currentData?.rainfall}mm</div>
              <div className="text-sm text-gray-600">Monthly Rainfall</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
