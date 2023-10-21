import { useContext } from "react"
import WakeupContext from "../contexts/wakeupContext"
import axios from "axios"

export const useWakeup = () => {
    const wakeupContext = useContext(WakeupContext)
    const { list } = wakeupContext

    const request = async (api: Wakeup, request: WakeupRequest) => {
        const url = `${api.baseUrl}:${api.port}${request.url}`
        console.log(`sending request to ${url}`)
        if (request.method == "GET") {
            const response = await axios.get(url)

            return response
        }

        if (request.method == "POST") {
            const response = await axios.post(url, request.payload)

            return response
        }
    }

    const statusCodeColor = (code: number | string) => {
        if (code.toString()[0] == "1") return "info"
        if (code.toString()[0] == "2") return "success"
        if (code.toString()[0] == "3") return "info"
        if (code.toString()[0] == "4") return "error"
        if (code.toString()[0] == "5") return "error"
    }

    return { list, request, statusCodeColor }
}
