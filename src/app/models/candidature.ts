import { User } from "./user";

export interface Candidature {
    id: number;
    name: string;
    location: string;
    closingDate: Date;
    typeWorkingDate: string;
    applicantsNum: number;
    description: Text;
    requirements: Text;
    responsabilities: Text;
    state: boolean;
    creator: User
}
