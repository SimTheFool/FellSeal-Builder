import { Character } from "@domain/character/Character.js";
import { Job, JobType, newJob } from "@domain/Job.js";
import {
  ActiveSkill,
  CounterSkill,
  newActiveSkill,
  newCounterSkill,
  newPassiveSkill,
  PassiveSkill,
} from "@domain/Skill.js";
import { characters, characters as fakeCharacters } from "@fixtures/characters";
import { testDb } from "@utils/infra/testDb.js";
import { newAppResult } from "@utils/result/Result.js";
import { XMLParser } from "fast-xml-parser";
import { keyBy } from "lodash";
import { WriteService } from "../writeService.js";

import xmlJobs from "../../assets/jobs.xml";
import xmlSkills from "../../assets/skills.xml";
import txtSkillsTranslation from "../../assets/fr/skills.txt";
import fs from "fs";

export const newWriteService = (): WriteService => {
  migrate();

  return {
    persistCharacters: (newCharacters: Character[]) => {
      testDb.characters = [...newCharacters, ...characters];
      return newAppResult(undefined);
    },
  };
};

const migrate = () => {
  testDb.characters = fakeCharacters.map((c) => ({
    ...c,
  }));

  testDb.jobs = importJobAndSkills(xmlJobs, xmlSkills);

  testDb.translations = {
    fr: importTranslations(txtSkillsTranslation),
    en: {},
  };
};

const importTranslations = (
  txtTranslations: string
): Record<string, string> => {
  const translationString = Buffer.from(txtTranslations, "base64").toString();
  const translationJsonString = [
    "{",
    translationString
      .replace(/"/g, '\\"')
      .replace(/(.*)=((?!").+)/g, '"$1": "$2",')
      .replace(/\t/g, "")
      .slice(0, -1),
    "}",
  ].join("");

  console.log(translationJsonString);
  //fs.writeFileSync("./test.txt", test);
  //console.log(JSON.parse(translationJsonString));
  const translation = JSON.parse(translationJsonString);
  return translation;
};

const importJobAndSkills = (xmlJobs: string, xmlSkills: string): Job[] => {
  const xmlParser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    attributesGroupName: "",
    ignoreDeclaration: true,
    parseTagValue: true,
    parseAttributeValue: true,
  });

  const parseXml = (xmlBase64: string) =>
    xmlParser.parse(Buffer.from(xmlBase64, "base64").toString());

  const parsedSkills = Object.values(parseXml(xmlSkills).XMLAbilities).flatMap(
    ({ Ability }: any) => Ability
  );
  const parsedSkillsByHashname = keyBy(parsedSkills, "HashName");

  const jobs: Job[] = parseXml(xmlJobs).XMLJobs.jobs.Job.map((xmlJob: any) => {
    const skillIds: string[] = xmlJob?.learnables
      ? xmlJob?.learnables.Tier.flatMap((t: any) => t.SkillTile).flatMap(
          (t: any) => t.AbilityHash
        )
      : [];

    const { actives, passives, counters } = skillIds.reduce(
      ({ actives, passives, counters }, id) => {
        const { HashName, Name, SpellType } = parsedSkillsByHashname[id];
        const match = id.match(/^.*([A | P | C])\d+$/);
        const skillType = match?.[1] || "N/A";

        if (!["A", "P", "C"].includes(skillType))
          throw new Error(`unable to parse skill ${id}`);

        return {
          actives: [
            ...actives,
            ...(skillType === "A"
              ? [newActiveSkill(HashName, Name, SpellType)]
              : []),
          ],
          passives: [
            ...passives,
            ...(skillType === "P" ? [newPassiveSkill(HashName, Name)] : []),
          ],
          counters: [
            ...counters,
            ...(skillType === "C" ? [newCounterSkill(HashName, Name)] : []),
          ],
        };
      },
      { actives: [], passives: [], counters: [] } as {
        actives: ActiveSkill[];
        passives: PassiveSkill[];
        counters: CounterSkill[];
      }
    );

    const jobType: JobType =
      xmlJob.PlayerJob === false
        ? "monster"
        : xmlJob.ClassName.match(/^.*-99$/)
        ? "bzil"
        : xmlJob.noVicariousGiven === true && xmlJob.OnlyForNonStory === true
        ? "badge"
        : xmlJob.noVicariousGiven === true
        ? "story"
        : "character";
    return newJob(xmlJob.ClassName, actives, passives, counters, jobType);
  });

  return jobs;
};
