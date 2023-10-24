declare type HTTPMethods = "GET" | "POST"
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
    description: string
    localhost?: boolean

    creator: User
    requests: WakeupRequest[]
    events: WakeupEvent[]
}

declare interface NewWakeupEvent {
    name: string
    event: string
    userId: number
    apiId: number
    payload: string
}

declare interface NewWakeupRequest {
    name: string
    url: string
    method: HTTPMethods
    userId: number
    apiId: number
}

declare interface WakeupRequest {
    id: number
    name: string
    url: string
    method: HTTPMethods
    payload: string
    response: string
}

declare interface WakeupEvent {
    id: number
    name: string
    event: string
    payload: string
}

declare interface ElectronWakeupEvent {
    event: string
    data: any
    datetime: Date
    incoming?: boolean
}