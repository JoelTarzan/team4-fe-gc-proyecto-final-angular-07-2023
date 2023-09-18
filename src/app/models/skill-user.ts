import { Skill } from "./skill";
import { User } from "./user";

export interface SkillUser {
    id: number,
    validated: boolean,
    skill: Skill,
    user: User
}
