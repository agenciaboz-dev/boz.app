declare interface Warning {
    id: number
    title: string
    text: string
    date: string

    creator: User
    confirmed: User[]
}

declare interface NewWarning {
    title: string
    text: string
    customer?: Customer
    customerId?: number
    departments: Department[]
}
