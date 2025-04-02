'use client'

import { useEffect, createContext, useState } from "react";

export const ConfigContext = createContext()

export default function ConfigContextProvider(props) {
  const [config, setConfigs] = useState({
    drone_id: null,
    drone_name: "",
    light: "",
    country: "",
    weight: 0,
  })
  const [isLoading, setIsLoading] = useState(false)

  const getConfig = async (signal) => {
    setIsLoading(true)

    try {
      const response = await fetch(`/api/configs/${process.env.NEXT_PUBLIC_DRONE_ID}`, {
        signal,
      })
      const data = await response.json()
      setConfigs(data)
    } catch(error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()

    getConfig(abortController.signal)

    return () => {
      abortController.abort("cleanup")
    }
  }, [])
  
  return (
    <ConfigContext.Provider value={{ config, isLoading }}>
      {props.children}
    </ConfigContext.Provider>
  )
}