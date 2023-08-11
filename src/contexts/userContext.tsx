import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"

interface UserContextValue {
    user: User | null
    setUser: (user: User | null) => void

    list: User[]
    setList: (users: User[]) => void
    connectedList: User[]

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
    const [list, setList] = useState<User[]>([])
    const [connectedList, setconnectedList] = useState<User[]>([])
    const [openDrawer, setOpenDrawer] = useState(false)
    const [connected, setConnected] = useState(false)

    const drawer = {
        open: openDrawer,
        setOpen: setOpenDrawer,
    }

    useEffect(() => {
        console.log({ connectedList })
        io.on("user:connect", (user) => {
            console.log(`connected: ${user.username}`)
            setconnectedList([...connectedList, user])
        })

        io.on("user:disconnect", (user) => {
            console.log(`disconnected: ${user.username}`)
            setconnectedList(connectedList.filter((item) => item.id != user.id))
        })

        return () => {
            io.off("user:connect")
            io.off("user:disconnect")
        }
    }, [connectedList])

    useEffect(() => {
        console.log({ list })
        io.on("user:new:success", (user) => {
            setList([...list, user])
        })

        io.on("user:new", (user) => {
            setList([...list, user])
        })

        io.on("user:sync", (user) => {
            setList([...list.filter((item) => item.id != user.id), user])
        })

        io.on("user:delete", (user) => {
            setList(list.filter((item) => item.id != user.id))
        })

        return () => {
            io.off("user:sync")
            io.off("user:new")
            io.off("user:new:success")
            io.off("user:delete")
        }
    }, [list])

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

            io.on("client:sync", (users: User[]) => {
                setConnected(true)
                setList(users)
            })
        }

        return () => {
            io.off("connect")
            io.off("disconnect")
            io.off("client:sync")
        }
    }, [user])

    return <UserContext.Provider value={{ user, setUser, drawer, connected, list, connectedList, setList }}>{children}</UserContext.Provider>
}
