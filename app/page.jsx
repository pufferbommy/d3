'use client'

import { useContext } from "react"
import { ConfigContext } from "./components/config-context-provider"
import { Binary, IdCard, Loader2, Sun, TreePalm } from "lucide-react"

export default function Page() {
  const { config, isLoading } = useContext(ConfigContext)

  return (
    <div className="container mx-auto py-8 px-4 max-w-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">View Config</h1>
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading config...</span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ul className="divide-y divide-gray-100">
          <li className="flex items-center p-4 hover:bg-gray-50 transition-colors">
            <div className="bg-blue-50 p-2 rounded-lg mr-4">
              <Binary className="text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Drone ID</div>
              <div className="text-xs uppercase font-semibold text-gray-500 mt-1">
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="w-3 h-3 animate-spin mr-2" />
                    Loading...
                  </div>
                ) : (
                  <span className="font-mono">{config.drone_id}</span>
                )}
              </div>
            </div>
          </li>

          <li className="flex items-center p-4 hover:bg-gray-50 transition-colors">
            <div className="bg-green-50 p-2 rounded-lg mr-4">
              <IdCard className="text-green-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Drone Name</div>
              <div className="text-xs uppercase font-semibold text-gray-500 mt-1">
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="w-3 h-3 animate-spin mr-2" />
                    Loading...
                  </div>
                ) : config.drone_name}
              </div>
            </div>
          </li>

          <li className="flex items-center p-4 hover:bg-gray-50 transition-colors">
            <div className="bg-yellow-50 p-2 rounded-lg mr-4">
              <Sun className="text-yellow-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Light</div>
              <div className="text-xs uppercase font-semibold text-gray-500 mt-1">
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="w-3 h-3 animate-spin mr-2" />
                    Loading...
                  </div>
                ) : config.light}
              </div>
            </div>
          </li>

          <li className="flex items-center p-4 hover:bg-gray-50 transition-colors">
            <div className="bg-purple-50 p-2 rounded-lg mr-4">
              <TreePalm className="text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Country</div>
              <div className="text-xs uppercase font-semibold text-gray-500 mt-1">
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="w-3 h-3 animate-spin mr-2" />
                    Loading...
                  </div>
                ) : config.country}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}