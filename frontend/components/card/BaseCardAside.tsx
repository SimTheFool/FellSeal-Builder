import { CharacterTag } from "builder";
import { TagList } from "../tags/TagList";

type BaseCardAsideProps = { tags?: CharacterTag[] };

export const BaseCardAside = ({ tags }: BaseCardAsideProps) => {
  return <TagList tags={tags} p="md" />;
};
