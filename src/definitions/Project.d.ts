declare interface Project {
    id: number
    name: string
    description: string
    deadline?: string
    customer_id: number

    times: ProjectTime
    workers: ProjectWorker[]
    links: Link[]
}

declare interface ProjectWorker {
    id: number
    admin: boolean
    joined_date: string
    times: ProjectTime[]
    user_id: number
    user: User
}

declare interface ProjectTime {
    id: number
    started: string
    role?: string
    ended?: string
    worked?: string
}

declare interface Link {
    id: number
    name?: string
    url: string
}

interface Working {
    project: Project
    customer: Customer
    worker: ProjectWorker
    role: string
}