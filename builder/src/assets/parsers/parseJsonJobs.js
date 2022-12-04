export default (jsonJobs) => {
  const rawJobs = jsonJobs.XMLJobs.jobs.Job;
  const jobs = rawJobs.map((j) => {
    const hash = j.ClassName.toLowerCase();

    const jobType =
      j.trueMonsterClass === true
        ? "monster"
        : j.variantClass === true
        ? "monsterVariant"
        : j.ClassName.match(/^.*-99$/)
        ? "bzil"
        : j.PlayerJob !== false &&
          j.noVicariousGiven === true &&
          j.OnlyForNonStory === true
        ? "badge"
        : j.PlayerJob !== false && j.noVicariousGiven === true
        ? "story"
        : j.PlayerJob !== false
        ? "character"
        : "n/a";

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
  return jobs.filter((j) => j.type !== "n/a");
};
