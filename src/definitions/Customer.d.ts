declare interface Customer {
    id: number
    name: string
    recomendations: string
    active: boolean
    image: string
    services: Service[]
    qrcodes: QrCode[]
}

declare interface CustomerForm {
    name: string
    recomendations: string
    instagram?: string
    website?: string
}
