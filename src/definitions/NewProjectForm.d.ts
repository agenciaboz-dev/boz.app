declare interface NewProjectForm {
    name: string
    description?: string
    deadline?: string

    customer_id: number

    workers: NewWorkerForm[]
    links: LinkForm[]
}

declare interface NewWorkerForm {
    user_id: number
    admin?: boolean
}

declare interface LinkForm {
    name?: string
    url: string
}

declare interface PlayProjectForm {
    worker_id: number
    role: string
}
