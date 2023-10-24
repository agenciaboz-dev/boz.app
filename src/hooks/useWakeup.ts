import { useContext } from "react"
import WakeupContext from "../contexts/wakeupContext"
import { useLocalStorage } from "./useLocalStorage"

export const useWakeup = () => {
    const wakeupContext = useContext(WakeupContext)
    const { list } = wakeupContext
    const electron = window.electron
    const storage = useLocalStorage()

    const request = async (api: Wakeup, request: WakeupRequest) => {
        if (electron) {
            const localhost = storage.get(`bozapp:wakeup:${api.id}:localhost`)
            const url = `${localhost ? "http://localhost" : api.baseUrl}:${api.port}${request.url}`
            const payload = request.payload ? JSON.parse(request.payload) : {}
            console.log(`sending request to ${url}`)
            const response = await electron.ipcRenderer.invoke("wakeup:request", url, request.method, payload)
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
