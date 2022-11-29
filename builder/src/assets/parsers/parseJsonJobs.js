export default (jsonJobs) => {
  const rawJobs = jsonJobs.XMLJobs.jobs.Job;
  const jobs = rawJobs.map((j) => {
    const hash = j.ClassName.toLowerCase();

    const jobType =
      j.PlayerJob === false
        ? "monster"
        : j.ClassName.match(/^.*-99$/)
        ? "bzil"
        : j.noVicariousGiven === true && j.OnlyForNonStory === true
        ? "badge"
        : j.noVicariousGiven === true
        ? "story"
        : "character";

    const skillHashes = j?.learnables
      ? j?.learnables.Tier.flatMap((t) => t.SkillTile).flatMap(
          (t) => t.AbilityHash
        )
      : [];

    return {
      hash,
      title: `${hash}-title`,
      description: `${hash}-desc`,
      type: jobType,
      skills: skillHashes.map((s) => s.toLowerCase()),
    };
  });
  return jobs;
};
