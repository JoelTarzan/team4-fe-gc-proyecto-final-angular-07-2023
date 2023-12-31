import { Role } from "./role";

export interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
    description: string;
    rating: number;
    title: string;
    phone: string;
    web: string;
    linkedin: string;
    git: string;
    avatar: number[] | string | null;
    role: Role;
    //no se borra por si da error en el json server
    // rrhh: boolean;
}