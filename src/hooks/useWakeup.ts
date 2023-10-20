import { useContext } from "react"
import WakeupContext from "../contexts/wakeupContext"
import axios from "axios"

export const useWakeup = () => {
    const wakeupContext = useContext(WakeupContext)
    const { list } = wakeupContext

    const get = async (api: Wakeup, request: WakeupRequest) => {
        const url = `${api.baseUrl}:${api.port}${request.url}`
        console.log(`sending get to ${url}`)
        const response = await axios.get(url)

        return response
    }

    return { list, get }
}
