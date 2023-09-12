import { OpenProcess } from "./open-process";
import { User } from "./user";

export interface Subscription {
    id: number;
    openProcess: OpenProcess;
    user: User;
}
