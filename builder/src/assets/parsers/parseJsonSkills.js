import _l from "lodash";

export default (jsonSkills) => {
  const rawSkills = Object.values(jsonSkills.XMLAbilities).flatMap(
    ({ Ability }) => Ability
  );

  const skills = rawSkills.map(
    ({
      HashName,
      CopyFrom,
      Power,
      Power2,
      AddsNonRemovableEffects2,
      AddsNonRemovableEffects1,
    }) => {
      const hash = HashName.toLowerCase();
      const skillTypeLetter = HashName.match(/^.*([A | P | C])\d+$/i);
      if (!skillTypeLetter) return;

      const skillAdditional1 = AddsNonRemovableEffects1
        ? skillAdditionalsByEffect[AddsNonRemovableEffects1]
        : {};

      const skillAdditional2 = AddsNonRemovableEffects2
        ? skillAdditionalsByEffect[AddsNonRemovableEffects2]
        : {};

      return _l.merge(skillAdditional2, skillAdditional1, {
        hash: hash,
        name: hash,
        description: `${hash}-desc`,
        type: skillTypes[skillTypeLetter[1]],
        likeHash: CopyFrom?.toLowerCase(),
        power: Power,
        power2: Power2,
      });
    }
  );
  return skills.filter((s) => s);
};

const skillTypes = {
  A: "active",
  P: "passive",
  C: "counter",
};

const skillAdditionalsByEffect = {
  kfHPUp: {
    power: "25",
  },
  kfDefUp: {
    power: "32",
    power2: "1.5",
  },
};
