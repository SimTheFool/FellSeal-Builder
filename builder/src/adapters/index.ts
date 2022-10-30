import { newCacheService } from "@adapters/cacheService";
import { newReadService } from "@adapters/readService";
import { newWriteService } from "@adapters/writeService";

export const newServiceContainer = () => {
  return {
    readService: newReadService(),
    writeService: newWriteService(),
    cacheService: newCacheService(),
  };
};

export type ServiceContainer = ReturnType<typeof newServiceContainer>;
