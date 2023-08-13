import { useContext } from "react"
import ZapContext from "../contexts/zapContext"

export const useZap = () => {
    const zapContext = useContext(ZapContext)
    const { qrcode, client, loading, currentChat, setCurrentChat } = zapContext

    const drawer = {
        open: zapContext.drawer.open,
        toogle: () => zapContext.drawer.setOpen(!zapContext.drawer.open),
        close: () => zapContext.drawer.setOpen(false),
    }

    return { qrcode, client, loading, drawer, currentChat, setCurrentChat }
}
