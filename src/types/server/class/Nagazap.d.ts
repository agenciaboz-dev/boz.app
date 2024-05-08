import { Prisma } from "@prisma/client";
export type NagaMessagePrisma = Prisma.NagazapMessageGetPayload<{}>;
export type NagazapPrisma = Prisma.NagazapGetPayload<{}>;
export declare class NagaMessage {
    id: number;
    from: string;
    timestamp: string;
    text: string;
    constructor(data: NagaMessagePrisma);
}
export declare class Nagazap {
    id: number;
    token: string;
    static get(): Promise<Nagazap>;
    constructor(data: NagazapPrisma);
    getMessages(): Promise<NagaMessage[]>;
}
