declare interface User {
    id: number
    username: string
    email: string
    password: string
    name: string
    cpf: string
    birth: string
    phone: string

    department: Department
    roles: Role[]

    connected?: boolean
}

interface LoginForm {
    login: string
    password: string
}

interface UserForm {
    username: string
    email: string
    name: string

    cpf: string
    phone: string
    birth: string
    departmentId: number
}