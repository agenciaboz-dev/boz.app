import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"

interface ZapContextValue {
    client?: Zap

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
    const [chats, setChats] = useState<Chat[]>([])
    const [info, setInfo] = useState<any>()

    const [connected, setConnected] = useState(false)

    const client: Zap = {
        chats,
        info,
        connected,
    }

    useEffect(() => {
        console.log({ chats })
    }, [chats])

    useEffect(() => {
        console.log({ qrcode })
    }, [qrcode])

    useEffect(() => {
        io.on("zap:qrcode", (code) => {
            console.log(code)
            setQrcode(code)
        })

        io.on("zap:ready", (data) => {
            console.log(data)
            setConnected(true)
            setInfo(data.info)
            setChats(data.chats)
        })

        return () => {
            io.off("zap:qrcode")
            io.off("zap:ready")
        }
    }, [])

    return <ZapContext.Provider value={{ qrcode, client }}>{children}</ZapContext.Provider>
}
