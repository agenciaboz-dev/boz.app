declare interface NewWakupForm {
    name: string
    userId: number
    socket: boolean
    baseUrl: string
    port: string
}

declare interface Wakeup {
    id: number
    name: string
    baseUrl: string
    socket: boolean
    port: string

    creator: User
    requests: WakeupRequest[]
    events: WakeupEvent[]
}

declare interface WakeupRequest {
    id: number
    name: string
    url: string
    method: string
    payload: string
    response: string
}

declare interface WakeupEvent {
    id: number
    name: string
    event: string
    payload: string
}
