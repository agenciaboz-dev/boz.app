declare interface Project {
    id: number
    name: string
    github?: string
    description: string
    deadline?: string

    times: ProjectTime
    workers: ProjectWorker[]
}

declare interface ProjectWorker {
    id: number
    admin: boolean
    joined_date: string
    times: ProjectTime[]
    user_id: number
    user: User
    role: string
}

declare interface ProjectTime {
    id: number
    started: string
    ended?: string
    worked?: string
}
