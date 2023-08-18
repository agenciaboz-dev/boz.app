declare interface QrCode {
    id: number
    name: string
    code: string
    user: User
    customer: Customer
}

declare interface QrCodeForm {
    name: string
    code: string
    customerId?: number
}
