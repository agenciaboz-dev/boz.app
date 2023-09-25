import { createContext, useState, useEffect } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"
import { url } from "../api/backend"

interface CoffeeContextValue {
    wanting: boolean
    setWanting: (wanting: boolean) => void

    wantingList: User[]
    setWantingList: (list: User[]) => void

    openModal: boolean
    setOpenModal: (value: boolean) => void
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
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        io.on("coffee:list", (list) => {
            setWantingList(list)
        })

        io.on("coffee:warning", () => {
            const iconUrl = `http${url}/static/favicon.ico`
            setOpenModal(true)
            const notification = new Notification("Café", {
                body: "Hora da roleta do café",
                icon: iconUrl,
            })

            notification.onclick = (ev) => {
                window.focus()
                if (window.parent) {
                    window.parent.focus()
                }
            }
        })

        return () => {
            io.off("coffee:list")
            io.off("coffee:warning")
        }
    }, [])

    return (
        <CoffeeContext.Provider value={{ wanting, setWanting, wantingList, setWantingList, openModal, setOpenModal }}>
            {children}
        </CoffeeContext.Provider>
    )
}
