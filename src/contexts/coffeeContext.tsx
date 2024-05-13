import { createContext, useState, useEffect } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"
import { url } from "../api/backend"
import { useUser } from "../hooks/useUser"
import { useConfirmDialog } from "burgos-confirm"

interface CoffeeContextValue {
    wanting: boolean
    setWanting: (wanting: boolean) => void

    making: boolean
    setMaking: (making: boolean) => void

    lottery: boolean
    setLottery: (lottery: boolean) => void

    wantingList: User[]
    setWantingList: (list: User[]) => void

    openModal: boolean
    setOpenModal: (value: boolean) => void

    maker?: User
    setMaker: (value?: User) => void

    timer: number
    setTimer: (number: number) => void
}

interface CoffeeProviderProps {
    children: React.ReactNode
}

const CoffeeContext = createContext<CoffeeContextValue>({} as CoffeeContextValue)

export default CoffeeContext

export const CoffeeProvider: React.FC<CoffeeProviderProps> = ({ children }) => {
    const iconUrl = `http${url}/static/favicon.ico`

    const io = useIo()
    const { user, updateStatus } = useUser()
    const { confirm } = useConfirmDialog()

    const [wanting, setWanting] = useState<boolean>(false)
    const [making, setMaking] = useState<boolean>(false)
    const [lottery, setLottery] = useState(false)
    const [wantingList, setWantingList] = useState<User[]>([])
    const [openModal, setOpenModal] = useState(false)
    const [maker, setMaker] = useState<User>()
    const [timer, setTimer] = useState(15)

    useEffect(() => {
        io.on("coffee:list", (list) => {
            setWantingList(list)
        })

        io.on("coffee:warning", () => {
            setLottery(true)
            setMaker(undefined)

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

        io.on("coffee:timer", (timer) => {
            setTimer(timer)
        })

        io.on("coffee:ready", () => {
            setWanting(false)
            setWantingList([])
            setMaking(false)
            setMaker(undefined)

            const notification = new Notification("Café saiu", {
                body: "Tá pronto",
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
            io.off("coffee:timer")
            io.off("coffee:ready")
        }
    }, [])

    useEffect(() => {
        io.on("coffee:maker", (user) => {
            setMaker(user)
            const audio = new Audio("/coffee_lovers.mp4")
            audio.play()
        })

        io.on("coffee:making", () => {
            setLottery(false)
            setMaking(true)

            if (maker?.id == user?.id) {
                const notification = new Notification("Escolhido!", {
                    body: "Você foi o escolhido pra fazer o nosso café",
                    icon: iconUrl,
                })

                notification.onclick = (ev) => {
                    window.focus()
                    if (window.parent) {
                        window.parent.focus()
                    }
                }

                confirm({
                    title: "Parabéns!",
                    content: "Você foi escolhido pra fazer o cafezinho, vamo colocar pausinha e fazer lá?",
                    hideCancel: true,
                    onConfirm: () => {
                        updateStatus(3)
                    },
                })
            }
        })

        return () => {
            io.off("coffee:making")
            io.off("coffee:maker")
        }
    }, [user, maker])

    return (
        <CoffeeContext.Provider
            value={{
                wanting,
                setWanting,
                wantingList,
                setWantingList,
                openModal,
                setOpenModal,
                maker,
                setMaker,
                timer,
                setTimer,
                making,
                setMaking,
                lottery,
                setLottery,
            }}
        >
            {children}
        </CoffeeContext.Provider>
    )
}
