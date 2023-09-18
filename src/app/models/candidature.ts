import { User } from "./user";

export interface Candidature {
    id: number;
    name: string;
    location: string;
    closingDate: Date;
    typeWorkingDate: string;
    applicantsNum: number;
    description: Text | string;
    requirements: Text | string;
    responsabilities: Text | string;
    state: boolean;
    creator: User
}
