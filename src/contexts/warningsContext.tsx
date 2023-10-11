import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"
import { url } from "../api/backend"
import { useConfirmDialog } from "burgos-confirm"
import { useNavigate } from "react-router-dom"
import { useUser } from "../hooks/useUser"

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
    const iconUrl = `http${url}/static/favicon.ico`
    const io = useIo()
    const navigate = useNavigate()
    
    const { user } = useUser()

    const { confirm } = useConfirmDialog()

    const [list, setList] = useState<Warning[]>([])

    useEffect(() => {
        io.on("warning:new", (warning: Warning) => {
            setList((list) => [...list, warning])

            if (warning.creator.id != user?.id) {
                const notification = new Notification("Aviso!", {
                    body: "Existe um novo aviso, vai lá ver",
                    icon: iconUrl,
                })

                notification.onclick = (ev) => {
                    window.focus()
                    if (window.parent) {
                        window.parent.focus()
                    }
                }
            }
        })

        io.on("warning:update", (warning) => {
            setList((list) => [...list.filter((item) => item.id != warning.id), warning])
        })

        if (list.filter((warning) => !warning.confirmed.some((item) => item.id == user?.id)).length > 0 && user) {
            confirm({
                title: "Novo aviso",
                content: "Existe um novo aviso, vai lá ver",
                hideCancel: true,
                button: "Claro",
                onConfirm: () => {
                    navigate("/warnings")
                },
            })
        }

        return () => {
            io.off("warning:new")
            io.off("warning:update")
        }
    }, [list, user])

    useEffect(() => {
        io.on("warning:list", (warnings) => setList(warnings))

        return () => {
            io.off("warning:list")
        }
    }, [])

    return <WarningsContext.Provider value={{ list, setList }}>{children}</WarningsContext.Provider>
}
