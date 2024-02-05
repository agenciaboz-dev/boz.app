import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"
import { useUser } from "../hooks/useUser"
import { getYouWorking } from "../pages/Tools/project/getYouWorking"

interface ProjectContextValue {
    list: Project[]
    setList: React.Dispatch<React.SetStateAction<Project[]>>
    updateProject: (project: Project) => void
    deleteProject: (project: Project) => void

    working?: Working
    setWorking: React.Dispatch<React.SetStateAction<Working | undefined>>
}

interface ProjectProviderProps {
    children: React.ReactNode
}

const ProjectContext = createContext<ProjectContextValue>({} as ProjectContextValue)

export default ProjectContext

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
    const io = useIo()

    const { user } = useUser()

    const [list, setList] = useState<Project[]>([])

    const updateProject = (project: Project) => setList((list) => [...list.filter((item) => item.id != project.id), project])
    const deleteProject = (project: Project) => setList((list) => list.filter((item) => item.id != project.id))

    const [working, setWorking] = useState<Working>()

    useEffect(() => {
        console.log({ projects: list })

        io.on("project:new", (project) => updateProject(project))
        io.on("project:update", (project) => updateProject(project))
        io.on("project:delete", (project) => deleteProject(project))

        return () => {
            io.off("project:new")
            io.off("project:update")
            io.off("project:delete")
        }
    }, [list])

    useEffect(() => {
        io.on("project:list", (list) => setList(list))

        return () => {
            io.off("project:list")
        }
    }, [])

    return <ProjectContext.Provider value={{ list, setList, updateProject, deleteProject, working, setWorking }}>{children}</ProjectContext.Provider>
}
