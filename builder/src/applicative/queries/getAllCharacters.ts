import { Character } from "@domain/character/Character";
import { AppErrors } from "@utils/Error";
import { CacheService } from "adapters/cacheService";
import { ReadService } from "adapters/readService";

export const getAllCharacters =
  (cacheService: CacheService) => (readService: ReadService) => {
    const on = (
      listenOk: (val: Character[]) => void,
      listenErr: (err: AppErrors<string>) => void
    ) => {
      const onChangeCallback = () =>
        readService.getAllCharacters().map(listenOk, listenErr);

      return cacheService.cache(["characters"], onChangeCallback);
    };

    return { on };
  };
