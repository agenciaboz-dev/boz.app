import { useContext } from "react"
import ZapContext from "../contexts/zapContext"

export const useZap = () => {
    const zapContext = useContext(ZapContext)
    const { qrcode, client, loading } = zapContext

    return { qrcode, client, loading }
}
