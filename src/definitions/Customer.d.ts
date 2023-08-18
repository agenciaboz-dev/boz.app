declare interface Customer {
    id: number
    name: string
    recomendations: string
    active: boolean
    services: Service[]
    qrcodes: QrCode[]
}

declare interface CustomerForm {
    name: string
    recomendations: string
}
