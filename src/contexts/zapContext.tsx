import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"

interface ZapContextValue {
    client?: Zap

    qrcode: string
    loading: boolean

    drawer: {
        open: boolean
        setOpen: (open: boolean) => void
    }

    currentChat: Chat | undefined
    setCurrentChat: (value: Chat) => void
}

interface ZapProviderProps {
    children: React.ReactNode
}

const ZapContext = createContext<ZapContextValue>({} as ZapContextValue)

export default ZapContext

export const ZapProvider: React.FC<ZapProviderProps> = ({ children }) => {
    const io = useIo()
    const [loading, setLoading] = useState(true)
    const [qrcode, setQrcode] = useState("")
    const [chats, setChats] = useState<Chat[]>([])
    const [info, setInfo] = useState<any>()
    const [openDrawer, setOpenDrawer] = useState(false)
    const [currentChat, setCurrentChat] = useState<Chat>()

    const [connected, setConnected] = useState(false)

    const drawer = {
        open: openDrawer,
        setOpen: setOpenDrawer,
    }

    const client: Zap = {
        chats,
        info,
        connected,
    }

    useEffect(() => {
        console.log({ zapDrawer: openDrawer })
    }, [openDrawer])

    useEffect(() => {
        console.log({ info })
    }, [info])

    useEffect(() => {
        io.on("chat:sync", (chat: Chat) => {
            setChats((prevChats) => {
                if (currentChat?.id._serialized == chat.id._serialized) {
                    setCurrentChat(chat)
                }

                return [...prevChats.filter((item) => item.id.user !== chat.id.user), chat]
            })
        })

        io.on("message:new", (data: { chat: Chat; message: Message }) => {
            if (data.message) {
                console.log(data.message)
                setChats((prevChats) => {
                    const prevChat = prevChats.find((item) => item.id._serialized == data.chat.id._serialized) as Chat
                    const updatedChat: Chat = {
                        ...prevChat,
                        messages: [...(prevChat?.messages || []), data.message],
                        lastMessage: data.message,
                        unreadCount: data.message.fromMe ? 0 : prevChat.unreadCount + 1,
                    }

                    if (currentChat?.id._serialized == prevChat.id._serialized) {
                        setCurrentChat(updatedChat)
                    }

                    return [...prevChats.filter((item) => item.id._serialized !== data.chat.id._serialized), updatedChat]
                })
            }
        })

        return () => {
            io.off("chat:sync")
            io.off("message:new")
        }
    }, [chats, currentChat])

    useEffect(() => {
        console.log({ qrcode })
    }, [qrcode])

    useEffect(() => {
        io.on("zap:qrcode", (code) => {
            console.log(code)
            setQrcode(code)
        })

        io.on("zap:ready", (data) => {
            const chats = data.chats as Chat[]
            setConnected(true)
            setInfo(data.info)
            setChats(data.chats)
            setLoading(false)

            chats.map((chat) => {
                io.emit("chat:sync", chat)
            })
        })

        io.on("zap:loading", (info: Info) => {
            setInfo(info)
            setConnected(true)
            setLoading(true)
        })

        io.on("zap:disconnected", () => {
            setConnected(false)
            setQrcode("")
        })

        return () => {
            io.off("zap:qrcode")
            io.off("zap:ready")
            io.off("zap:loading")
            io.off("zap:disconnected")
        }
    }, [])

    return <ZapContext.Provider value={{ qrcode, client, loading, drawer, currentChat, setCurrentChat }}>{children}</ZapContext.Provider>
}
