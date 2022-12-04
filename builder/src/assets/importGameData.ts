import { Job } from "@domain/Job";
import { Skill, ActiveSkill, PassiveSkill, CounterSkill } from "@domain/Skill";
import jobsGameData from "./gameData/jobs.gdata";
import dlcJobsGameData from "./gameData/dlc-jobs.gdata";
import skillsGameData from "./gameData/skills.gdata";
import dlcSkillsGameData from "./gameData/dlc-skills.gdata";

export const importJobs = (): Job[] => {
  const skillsByHash = [...skillsGameData, ...dlcSkillsGameData].reduce(
    (acc, skill) => {
      const { hash } = skill;
      return {
        ...acc,
        [hash]: skill,
      };
    },
    {} as Record<Skill["hash"], Skill>
  );

  const jobs: Job[] = [...jobsGameData, ...dlcJobsGameData].map((job) => {
    const { actives, passives, counters } = job.skills.reduce(
      (acc, hash) => {
        const skill = skillsByHash[hash];
        if (!skill) {
          console.error(`Skill ${hash} has not been imported`);
          return acc;
        }
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

export const importSkills = () => skillsGameData;
