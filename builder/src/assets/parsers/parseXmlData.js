import { XMLParser } from "fast-xml-parser";

export default async (xmlString) => {
  const xmlParser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    attributesGroupName: "",
    ignoreDeclaration: true,
    parseTagValue: true,
    parseAttributeValue: true,
  });

  return xmlParser.parse(xmlString);
};
