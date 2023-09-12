import { Candidature } from "./candidature";
import { Skill } from "./skill";

export interface SkillCandidature {
    id: number,
    skill: Skill,
    candidature: Candidature
}
