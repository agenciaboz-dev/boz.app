declare interface Calendar {
    summary: string
    description: string
    etag: string
    accessRole: string
    items: Event[]
}

declare interface CalendarDate {
    date?: string
    dateTime?: string
    timeZone?: string
}

declare interface Event {
    id: string
    summary: string
    description: string
    etag: string
    created: string
    end: CalendarDate
    start: CalendarDate
    status: string
    updated: string
    htmlLink: string

    attendees: {
        email: string
        responseStatus: string

        displayName?: string
        self?: boolean
        organizer?: boolean
    }[]

    creator: {
        email: string
        self?: boolean
        displayName?: string
    }

    colorId?: string
    hangoutLink?: string
    recurringEventId?: string
}
