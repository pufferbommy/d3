"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const droneId = process.env.NEXT_PUBLIC_DRONE_ID;

  const fetchLogs = async (showToast = false) => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/logs/${droneId}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching logs: ${response.status}`);
      }
      
      const data = await response.json();
      setLogs(data);
      if(showToast) {
        toast.success("Logs refreshed successfully");
      }
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="container mx-auto py-6 px-4 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Drone Logs</h1>
        <button 
          onClick={fetchLogs}
          disabled={isLoading}
          className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 text-sm">
                <th className="px-6 py-3 font-medium">Drone ID</th>
                <th className="px-6 py-3 font-medium">Drone Name</th>
                <th className="px-6 py-3 font-medium">Country</th>
                <th className="px-6 py-3 font-medium">Celsius</th>
                <th className="px-6 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading && !logs.length ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    Loading data...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No logs available
                  </td>
                </tr>
              ) : (
                logs.map((log, index) => (
                  <tr 
                    key={`${log.created}-${index}`}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-sm">{log.drone_id}</td>
                    <td className="px-6 py-4">{log.drone_name || '—'}</td>
                    <td className="px-6 py-4">{log.country || '—'}</td>
                    <td className="px-6 py-4">
                      {log.celsius !== undefined ? (
                        <span>
                          {log.celsius}°C
                        </span>
                      ) : '—'}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{log.created}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}