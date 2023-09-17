import { User } from "./user";
import { Candidature } from "./candidature";
import { OpenProcess } from "./open-process";

export interface Application {
    id: number;
    user: User;
    candidature: Candidature;
    phase: OpenProcess;
}