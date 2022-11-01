export type Job = PlayerJob | MonsterJob;

type BaseJob = {
  name: string;
  skillIds: string[];
};

type PlayerJob = BaseJob & {
  isPlayerJob: true;
};

type MonsterJob = BaseJob & {
  isPLayerJob: false;
};

export const isJob = (object: Object): object is Job => {
  return false;
};

export const newJob = (
  name: string,
  isPlayerJob: boolean,
  skillIds: string[]
) => {
  return {
    name,
    isPlayerJob,
    skillIds,
  };
};
