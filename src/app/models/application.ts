import { User } from "./user";
import { Candidature } from "./candidature";

export interface Application {
id: number;
user: User;
candidature: Candidature;
phase: number;
}
