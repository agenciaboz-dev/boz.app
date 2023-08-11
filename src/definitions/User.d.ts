declare interface User {
    id: number
    username: string
    email: string
    password: string
    name: string
    cpf: string
    birth: string

    department: Department
    roles: Role[]
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
    birth: string
    department: number
    role: number
}