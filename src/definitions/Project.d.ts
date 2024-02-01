declare interface Project {
    id: number
    name: string
    github?: string
    description: string
    deadline?: string

    times: ProjectTime
    workers: Worker[]
}

declare interface Worker {
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
    ended?: string
    worked?: string
}
