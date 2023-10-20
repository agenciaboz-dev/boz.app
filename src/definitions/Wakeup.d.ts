declare interface Wakeup {
    id: number
    name: string
    baseUrl: string
    socket: boolean

    creator: User
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
