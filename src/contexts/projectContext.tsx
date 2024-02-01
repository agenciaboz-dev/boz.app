import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"

interface ProjectContextValue {
    list: Project[]
    setList: React.Dispatch<React.SetStateAction<Project[]>>
    updateProject: (project: Project) => void
    deleteProject: (project: Project) => void
}

interface ProjectProviderProps {
    children: React.ReactNode
}

const ProjectContext = createContext<ProjectContextValue>({} as ProjectContextValue)

export default ProjectContext

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
    const io = useIo()
    const [list, setList] = useState<Project[]>([])

    const updateProject = (project: Project) => setList((list) => [...list.filter((item) => item.id != project.id), project])
    const deleteProject = (project: Project) => setList((list) => list.filter((item) => item.id != project.id))

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

    return <ProjectContext.Provider value={{ list, setList, updateProject, deleteProject }}>{children}</ProjectContext.Provider>
}
