declare interface UpdateProjectForm {
    name: string
    description?: string
    deadline?: string
    customer_id: number

    workers: ProjectWorker[]
    links: LinkForm[]
}
