import { createContext, useState, useEffect } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"

interface CoffeeContextValue {
    wanting: boolean
    setWanting: (wanting: boolean) => void

    wantingList: User[]
    setWantingList: (list: User[]) => void
}

interface CoffeeProviderProps {
    children: React.ReactNode
}

const CoffeeContext = createContext<CoffeeContextValue>({} as CoffeeContextValue)

export default CoffeeContext

export const CoffeeProvider: React.FC<CoffeeProviderProps> = ({ children }) => {
    const io = useIo()
    const [wanting, setWanting] = useState<boolean>(false)
    const [wantingList, setWantingList] = useState<User[]>([])

    useEffect(() => {
        io.on("coffee:list", (list) => {
            setWantingList(list)
        })

        return () => {
            io.off("coffee:list")
        }
    }, [])

    return <CoffeeContext.Provider value={{ wanting, setWanting, wantingList, setWantingList }}>{children}</CoffeeContext.Provider>
}
