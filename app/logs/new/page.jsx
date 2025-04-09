'use client'

import { ConfigContext } from "@/app/components/config-context-provider";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function Page() {
  const { config, isLoading } = useContext(ConfigContext)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    setIsSubmitting(true);
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const temperatureNum = parseFloat(data.temperature);
    if(isNaN(temperatureNum)) {
      toast.error('Please enter a valid temperature');
      setIsSubmitting(false)
      return;
    }
    await toast.promise(
      fetch('/api/logs', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ 
          drone_id: config.drone_id,
          drone_name: config.drone_name,
          country: config.country,
          celsius: temperatureNum
        }),
      }),
       {
         loading: 'Submitting...',
         success: <b>Submitted successfully!</b>,
         error: <b>Failed to submit</b>,
       }
     )
    form.reset();
    setIsSubmitting(false)
  }

  return (
    <div >
      <div className="container mx-auto pt-8 px-4 max-w-lg">
        <h1 className="text-3xl font-bold mb-4">Temperature Log Form</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <fieldset className="border border-gray-200 rounded-md p-4">
              <legend className="text-sm font-medium px-2">
                Temperature in Celsius
              </legend>
              <input 
                disabled={isSubmitting || isLoading} 
                type="number" 
                step="any" 
                name="temperature" 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                placeholder="Enter temperature in Celsius" 
              />
            </fieldset>
            
            <button 
              disabled={isSubmitting || isLoading} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : 'Submit'}
            </button>
          </form>
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
          <h2 className="text-sm font-medium mb-2">Current Config</h2>
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              <span className="text-sm text-gray-500">Loading config...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-500">Drone ID:</div>
              <div className="font-mono">{config?.drone_id || '—'}</div>
              <div className="text-gray-500">Drone Name:</div>
              <div>{process.env.NEXT_PUBLIC_CUSTOM_DRONE_NAME || config?.drone_name || '—'}</div>
              <div className="text-gray-500">Country:</div>
              <div>{process.env.NEXT_PUBLIC_CUSTOM_DRONE_COUNTRY || config?.country || '—'}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}