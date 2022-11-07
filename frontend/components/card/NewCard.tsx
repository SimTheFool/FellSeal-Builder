import { BaseCard } from "./BaseCard";
import { BaseCardAside } from "./BaseCardAside";
import { BaseCardFooter } from "./BaseCardFooter";
import { BaseCardPortrait } from "./BaseCardPortrait";
import { BaseCardSubtitle } from "./BaseCardSubtitle";
import { BaseCardTitle } from "./BaseCardTitle";

type NewCardProps = {
  onClick: () => void;
};

export const NewCard = ({ onClick }: NewCardProps) => {
  return (
    <BaseCard
      onClick={onClick}
      background={<BaseCardPortrait />}
      title={<BaseCardTitle name="Nouveau" />}
      subtitle={<BaseCardSubtitle />}
      footer={<BaseCardFooter display={true} />}
      aside={<BaseCardAside />}
    />
  );
};
