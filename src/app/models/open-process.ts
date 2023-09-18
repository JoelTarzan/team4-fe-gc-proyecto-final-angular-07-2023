import { Candidature } from "./candidature";
import { User } from "./user";

export interface OpenProcess {
    id?: number;
    candidature: Candidature;
    name: string;
    date: string;
    user: User;
    open: boolean;
}