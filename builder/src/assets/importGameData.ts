import { Job } from "@domain/Job";
import { Skill, ActiveSkill, PassiveSkill, CounterSkill } from "@domain/Skill";
import jobsGameData from "./gameData/jobs.gdata";
import skillsGameData from "./gameData/skills.gdata";

export const importJobsAndSkills = (): Job[] => {
  const skillsByHash = skillsGameData.reduce((acc, skill) => {
    const { hash } = skill;
    return {
      ...acc,
      [hash]: skill,
    };
  }, {} as Record<Skill["hash"], Skill>);

  const jobs: Job[] = jobsGameData.map((job) => {
    const { actives, passives, counters } = job.skills.reduce(
      (acc, hash) => {
        const skill = skillsByHash[hash];
        const skillTypeLabel = `${skill.type}s` as `${Skill["type"]}s`;
        return {
          ...acc,
          [skillTypeLabel]: [...acc[skillTypeLabel], skill],
        };
      },
      { actives: [], passives: [], counters: [] } as {
        actives: ActiveSkill[];
        passives: PassiveSkill[];
        counters: CounterSkill[];
      }
    );

    return {
      ...job,
      actives,
      passives,
      counters,
    };
  });

  return jobs;
};
