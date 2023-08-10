import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"

interface ZapContextValue {
    client?: {}

    qrcode: string
}

interface ZapProviderProps {
    children: React.ReactNode
}

const ZapContext = createContext<ZapContextValue>({} as ZapContextValue)

export default ZapContext

export const ZapProvider: React.FC<ZapProviderProps> = ({ children }) => {
    const io = useIo()
    const [qrcode, setQrcode] = useState("")

    useEffect(() => {
        console.log({ qrcode })
    }, [qrcode])

    useEffect(() => {
        io.on("zap:qrcode", (code) => {
            console.log(code)
            setQrcode(code)
        })

        return () => {
            io.off("zap:qrcode")
        }
    }, [])

    return <ZapContext.Provider value={{ qrcode }}>{children}</ZapContext.Provider>
}
