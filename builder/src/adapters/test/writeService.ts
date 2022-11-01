import { Character } from "@domain/character/Character.js";
import { testDb } from "@utils/infra/testDb.js";
import { newAppResult } from "@utils/result/Result.js";
import { WriteService } from "../writeService.js";
import { characters, characters as fakeCharacters } from "@fixtures/characters";
import { XMLParser } from "fast-xml-parser";
import jobsXmlBase64 from "../../assets/jobs.xml";
import { newJob } from "@domain/job/Job.js";

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  attributesGroupName: "",
  ignoreDeclaration: true,
  parseTagValue: true,
  parseAttributeValue: true,
});

export const newWriteService = (): WriteService => {
  migrate();

  return {
    persistCharacters: (newCharacters: Character[]) => {
      testDb.characters = [...newCharacters, ...characters];
      return newAppResult(undefined);
    },
  };
};

const migrate = async () => {
  testDb.characters = fakeCharacters.map((c) => ({
    ...c,
  }));

  const jobsXmlString = Buffer.from(jobsXmlBase64, "base64").toString();
  const jobsXml = xmlParser.parse(jobsXmlString);
  const jobs = jobsXml.XMLJobs.jobs.Job.map((jxml: any) => {
    const skillIds = jxml?.learnables
      ? jxml?.learnables.Tier.flatMap((t: any) => t.SkillTile).map(
          (t: any) => t.AbilityHash
        )
      : [];

    return newJob(jxml.ClassName, jxml.PlayerJob ?? true, skillIds);
  });

  testDb.jobs = jobs;
};
