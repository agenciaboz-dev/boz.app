import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"

interface GoogleContextValue {
    accessToken: string
    setAccessToken: (value: string) => void
}

interface GoogleProviderProps {
    children: React.ReactNode
}

const GoogleContext = createContext<GoogleContextValue>({} as GoogleContextValue)

export default GoogleContext

export const GoogleProvider: React.FC<GoogleProviderProps> = ({ children }) => {
    const io = useIo()
    const [accessToken, setAccessToken] = useState("")
    const [people, setPeople] = useState()

    useEffect(() => {
        io.on("google:people", (data) => {
            console.log(data)
        })

        return () => {
            io.off("google:people")
        }
    }, [people])

    return <GoogleContext.Provider value={{ accessToken, setAccessToken }}>{children}</GoogleContext.Provider>
}
