import { Prisma } from "@prisma/client";
import { OvenForm, WhatsappForm } from "../types/shared/Meta/WhatsappBusiness/WhatsappForm";
export type NagaMessagePrisma = Prisma.NagazapMessageGetPayload<{}>;
export type NagaMessageForm = Omit<Prisma.NagazapMessageGetPayload<{}>, "id">;
export type NagazapPrisma = Prisma.NagazapGetPayload<{}>;
export declare class NagaMessage {
    id: number;
    from: string;
    timestamp: string;
    text: string;
    name: string;
    constructor(data: NagaMessagePrisma);
}
export declare class Nagazap {
    id: number;
    token: string;
    appId: string;
    phoneId: string;
    bussinessId: string;
    lastUpdated: string;
    stack: WhatsappForm[];
    static get(): Promise<Nagazap>;
    constructor(data: NagazapPrisma);
    getMessages(): Promise<NagaMessage[]>;
    updateToken(token: string): Promise<void>;
    buildHeaders(): {
        Authorization: string;
        "Content-Type": string;
    };
    getInfo(): Promise<any>;
    saveMessage(data: NagaMessageForm): Promise<NagaMessage>;
    queueMessage(data: WhatsappForm): Promise<WhatsappForm[]>;
    getTemplates(): Promise<any>;
    newOven(data: OvenForm): Promise<void>;
}
