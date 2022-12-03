export default (jsonSkills) => {
  //const skills = jsonSkills.XMLAbilities;
  const rawSkills = Object.values(jsonSkills.XMLAbilities).flatMap(
    ({ Ability }) => Ability
  );

  const skills = rawSkills.map(({ HashName, CopyFrom }) => {
    const hash = HashName.toLowerCase();
    const skillTypeLetter = HashName.match(/^.*([A | P | C])\d+$/i);
    if (!skillTypeLetter) return;
    return {
      hash: hash,
      name: hash,
      description: `${hash}-desc`,
      type: skillTypes[skillTypeLetter[1]],
      likeHash: CopyFrom?.toLowerCase(),
    };
  });
  return skills.filter((s) => s);
};

const skillTypes = {
  A: "active",
  P: "passive",
  C: "counter",
};
