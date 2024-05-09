import { Prisma } from "@prisma/client";
import { OvenForm, WhatsappForm } from "../types/shared/Meta/WhatsappBusiness/WhatsappForm";
import { UploadedFile } from "express-fileupload";
export type NagaMessagePrisma = Prisma.NagazapMessageGetPayload<{}>;
export type NagaMessageForm = Omit<Prisma.NagazapMessageGetPayload<{}>, "id">;
export type NagazapPrisma = Prisma.NagazapGetPayload<{}>;
interface BuildHeadersOptions {
    upload?: boolean;
}
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
    blacklist: string[];
    frequency: string;
    batchSize: number;
    lastMessageTime: string;
    static get(): Promise<Nagazap>;
    static shouldBake(): Promise<void>;
    constructor(data: NagazapPrisma);
    getMessages(): Promise<NagaMessage[]>;
    updateToken(token: string): Promise<void>;
    buildHeaders(options?: BuildHeadersOptions): {
        Authorization: string;
        "Content-Type": string;
    };
    getInfo(): Promise<any>;
    saveMessage(data: NagaMessageForm): Promise<NagaMessage>;
    addToBlacklist(number: string): Promise<void>;
    queueMessage(data: WhatsappForm): Promise<WhatsappForm[]>;
    getTemplates(): Promise<any>;
    uploadMedia(file: UploadedFile, filepath: string): Promise<string>;
    sendMessage(message: WhatsappForm): Promise<void>;
    prepareBatch(data: OvenForm, image_id?: string): Promise<void>;
    updateOvenSettings(data: {
        batchSize?: number;
        frequency?: string;
    }): Promise<void>;
    saveStack(): Promise<void>;
    bake(): Promise<void>;
}
export {};
