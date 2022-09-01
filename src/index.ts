import { CacheType, createCache } from "./lib/cache"
import { explain } from "./lib/explain"
import { PrismaClientLike, PrismaQueryEventLike } from "./lib/types"

type Option = {
  cacheType: CacheType
}

export const createExplain = (
  prisma: PrismaClientLike,
  option: Option = { cacheType: "query" }
) => {
  const cache = createCache(option.cacheType)

  const explainEvent = (event: PrismaQueryEventLike) =>
    explain(prisma, event, cache)

  return explainEvent
}

export default createExplain
