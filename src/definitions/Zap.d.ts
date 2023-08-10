declare interface Zap {
    connected: boolean
    info: Info
    chats: Chat[]
}

declare interface Info {
    me: ContactId
    pushname: string
}
