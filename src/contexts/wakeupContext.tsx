import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"

interface WakeupContextValue {
    list: Wakeup[]
    setList: React.Dispatch<React.SetStateAction<Wakeup[]>>

    socket: {
        connected: number
        events: ElectronWakeupEvent[]
    }
}

interface WakeupProviderProps {
    children: React.ReactNode
}

const WakeupContext = createContext<WakeupContextValue>({} as WakeupContextValue)

export default WakeupContext

export const WakeupProvider: React.FC<WakeupProviderProps> = ({ children }) => {
    const electron = window.electron

    const io = useIo()

    const [list, setList] = useState<Wakeup[]>([])
    const [socketConnected, setSocketConnected] = useState(0)
    const [socketEvents, setSocketEvents] = useState<ElectronWakeupEvent[]>([])

    const socket = {
        connected: socketConnected,
        events: socketEvents,
    }

    const addItem = (item: Wakeup) => {
        setList((list) => [...list.filter((api) => api.id != item.id), item])
    }

    const removeItem = (item: Wakeup) => {
        setList((list) => list.filter((api) => api.id != item.id))
    }

    useEffect(() => {
        if (electron) {
            electron.ipcRenderer.on("socket:connected", (_, id) => {
                setSocketConnected(id)
                setSocketEvents([])
            })

            electron.ipcRenderer.on("socket:disconnected", () => {
                setSocketConnected(0)
            })

            return () => {
                electron.ipcRenderer.removeAllListeners("socket:connected")
                electron.ipcRenderer.removeAllListeners("socket:disconnected")
            }
        }
    }, [])

    useEffect(() => {
        if (electron) {
            electron.ipcRenderer.on("socket:event", (_: any, args: any) => {
                console.log(args)
                setSocketEvents((events) => [...events, { ...args, datetime: new Date(), incoming: true }])
            })

            return () => {
                electron.ipcRenderer.removeAllListeners("socket:event")
            }
        }
    }, [socketEvents])

    useEffect(() => {
        io.on("wakeup:new", (api) => {
            console.log({ newApi: api })
            addItem(api)
        })

        io.on("wakeup:update", (api) => {
            addItem(api)
        })

        io.on("wakeup:delete", (api) => {
            removeItem(api)
        })

        return () => {
            io.off("wakeup:new")
            io.off("wakeup:update")
            io.off("wakeup:delete")
        }
    }, [list])

    useEffect(() => {
        io.on("wakeup:sync", (apis) => {
            console.log({ wakeup: apis })
            setList(apis)
        })

        return () => {
            io.off("wakeup:sync")
        }
    }, [])

    return <WakeupContext.Provider value={{ list, setList, socket }}>{children}</WakeupContext.Provider>
}
