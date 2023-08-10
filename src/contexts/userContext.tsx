import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"

interface UserContextValue {
    user: User | null
    setUser: (user: User | null) => void

    connected: boolean

    drawer: {
        open: boolean
        setOpen: (open: boolean) => void
    }
}

interface UserProviderProps {
    children: React.ReactNode
}

const UserContext = createContext<UserContextValue>({} as UserContextValue)

export default UserContext

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const io = useIo()

    const [user, setUser] = useState<User | null>(null)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [connected, setConnected] = useState(false)

    const drawer = {
        open: openDrawer,
        setOpen: setOpenDrawer,
    }

    useEffect(() => {
        console.log({ user })

        if (user) {
            io.on("connect", () => {
                console.log("reconnected, syncing user")
                io.emit("client:sync", user)
            })

            io.on("disconnect", () => {
                setConnected(false)
            })

            io.on("client:sync", () => {
                setConnected(true)
            })
        }

        return () => {
            io.off("connect")
            io.off("disconnect")
            io.off("client:sync")
        }
    }, [user])

    return <UserContext.Provider value={{ user, setUser, drawer, connected }}>{children}</UserContext.Provider>
}
