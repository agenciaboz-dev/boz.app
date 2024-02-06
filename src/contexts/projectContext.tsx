import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"
import { useUser } from "../hooks/useUser"
import { getYouWorking } from "../pages/Tools/project/getYouWorking"
import { useConfirmDialog } from "burgos-confirm"

interface ProjectContextValue {
    list: Project[]
    setList: React.Dispatch<React.SetStateAction<Project[]>>
    updateProject: (project: Project) => void
    deleteProject: (project: Project) => void

    working?: Working
    // setWorking: React.Dispatch<React.SetStateAction<Working | undefined>>

    play: (
        working_data: {
            project: Project
            customer: Customer
            role: string
            worker: ProjectWorker
        },
        startLoading: () => void
    ) => void
    stop: (worker: ProjectWorker) => void
}

interface ProjectProviderProps {
    children: React.ReactNode
}

const ProjectContext = createContext<ProjectContextValue>({} as ProjectContextValue)

export default ProjectContext

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
    const io = useIo()

    const { user } = useUser()
    const { confirm } = useConfirmDialog()

    const [list, setList] = useState<Project[]>([])
    const [working, setWorking] = useState<Working>()

    const updateProject = (project: Project) => setList((list) => [...list.filter((item) => item.id != project.id), project])
    const deleteProject = (project: Project) => setList((list) => list.filter((item) => item.id != project.id))

    const play = (working_data: { project: Project; customer: Customer; role: string; worker: ProjectWorker }, startLoading: () => void) => {
        if (!user) return
        console.log(working_data)

        const already_working = user.working_projects.find((item) => !!item.times.length && !item.times[item.times.length - 1].ended)
        if (already_working) {
            console.log(already_working)
            confirm({
                title: `você já está trabalhando`,
                content: `deseja parar de trabalhar em ${already_working.project.name} e começar ${working_data.project.name}?`,
                onConfirm: () => {
                    startLoading()
                    io.emit("project:stop", already_working.times[already_working.times.length - 1], already_working)
                    const data: PlayProjectForm = {
                        worker: working_data.worker,
                        role: working_data.role,
                        customer: working_data.customer,
                        project: working_data.project,
                    }
                    io.emit("project:play", data)
                },
            })
        } else {
            const data: PlayProjectForm = {
                worker: working_data.worker,
                role: working_data.role,
                customer: working_data.customer,
                project: working_data.project,
            }
            startLoading()
            io.emit("project:play", data)
        }
    }

    const stop = (worker: ProjectWorker) => {
        io.emit("project:stop", worker.times[worker.times.length - 1], worker)
    }

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
        io.on("project:play:success", (data: PlayProjectForm) => {
            updateProject(data.project)
            setWorking({
                project: data.project,
                customer: data.customer,
                role: data.role,
                worker: data.worker,
            })
        })

        io.on("project:play:error", (error) => {
            console.log(error)
        })

        io.on("project:stop:success", (project: Project) => {
            console.log("successfully stoped")
            console.log(project)
            updateProject(project)
            setWorking(undefined)
        })

        io.on("project:stop:error", (error) => {
            console.log(error)
        })

        return () => {
            io.off("project:play:success")
            io.off("project:play:error")
            io.off("project:stop:success")
            io.off("project:stop:error")
        }
    }, [])

    useEffect(() => {
        io.on("project:list", (list) => setList(list))

        return () => {
            io.off("project:list")
        }
    }, [])

    return <ProjectContext.Provider value={{ list, setList, updateProject, deleteProject, working, play, stop }}>{children}</ProjectContext.Provider>
}
