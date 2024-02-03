declare interface Role {
    id: number
    name: string
    tag: string
    project_roles?: string
    users: User[]
}

declare interface RoleForm {
    name: string
    tag: string
    project_roles?: string
}