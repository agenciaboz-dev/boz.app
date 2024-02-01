import { useContext } from "react"
import ProjectContext from "../contexts/projectContext"

export const useProject = () => {
    const projectContext = useContext(ProjectContext)

    return { ...projectContext }
}
