import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"

interface WarningsContextValue {
    list: Warning[]
    setList: (value: Warning[]) => void
}

interface WarningsProviderProps {
    children: React.ReactNode
}

const WarningsContext = createContext<WarningsContextValue>({} as WarningsContextValue)

export default WarningsContext

export const WarningsProvider: React.FC<WarningsProviderProps> = ({ children }) => {
    const io = useIo()

    const [list, setList] = useState<Warning[]>([])

    useEffect(() => {
        io.on("warning:new", (warning) => {
            setList((list) => [...list, warning])
        })

        return () => {
            io.off("warning:new")
        }
    }, [list])

    useEffect(() => {
        io.on("warning:list", (warnings) => setList(warnings))

        return () => {
            io.off("warning:list")
        }
    }, [])

    return <WarningsContext.Provider value={{ list, setList }}>{children}</WarningsContext.Provider>
}
