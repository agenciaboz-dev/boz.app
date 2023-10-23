import { useContext } from "react"
import WakeupContext from "../contexts/wakeupContext"

export const useWakeup = () => {
    const wakeupContext = useContext(WakeupContext)
    const { list } = wakeupContext
    const electron = window.electron

    const request = async (api: Wakeup, request: WakeupRequest) => {
        if (electron) {
            const url = `${api.baseUrl}:${api.port}${request.url}`
            console.log(`sending request to ${url}`)
            const response = await electron.ipcRenderer.invoke("wakeup:request", url, request.method, request.payload)
            return JSON.parse(response)
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
