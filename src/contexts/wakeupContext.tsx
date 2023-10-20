import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"

interface WakeupContextValue {
    list: Wakeup[]
    setList: React.Dispatch<React.SetStateAction<Wakeup[]>>
}

interface WakeupProviderProps {
    children: React.ReactNode
}

const WakeupContext = createContext<WakeupContextValue>({} as WakeupContextValue)

export default WakeupContext

export const WakeupProvider: React.FC<WakeupProviderProps> = ({ children }) => {
    const io = useIo()

    const [list, setList] = useState<Wakeup[]>([])

    useEffect(() => {
        io.on("wakeup:sync", (apis) => {
            console.log({ wakeup: apis })
            setList(apis)
        })

        return () => {
            io.off("wakeup:sync")
        }
    }, [])

    return <WakeupContext.Provider value={{ list, setList }}>{children}</WakeupContext.Provider>
}
