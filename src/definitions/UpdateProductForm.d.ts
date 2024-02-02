declare interface UpdateProjectForm {
    name: string
    description?: string
    deadline?: string
    github?: string

    workers: ProjectWorker[]
}
