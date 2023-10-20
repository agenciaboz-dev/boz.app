import { useContext } from "react"
import WakeupContext from "../contexts/wakeupContext"

export const useWakeup = () => {
    const wakeupContext = useContext(WakeupContext)
    const { list } = wakeupContext

    return { list }
}
