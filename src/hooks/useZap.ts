import { useContext } from "react"
import ZapContext from "../contexts/zapContext"

export const useZap = () => {
    const zapContext = useContext(ZapContext)
    const { qrcode, client } = zapContext

    return { qrcode, client }
}
