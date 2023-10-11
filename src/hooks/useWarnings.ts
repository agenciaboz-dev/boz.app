import { useContext } from "react"
import WarningsContext from "../contexts/warningsContext"

export const useWarnings = () => {
    const warningsContext = useContext(WarningsContext)
    const { list } = warningsContext

    return { list }
}
