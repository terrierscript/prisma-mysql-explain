import { CacheType, createCache } from "./lib/cache"
import { executeExplain } from "./lib/explain"
import { PrismaClientLike, PrismaQueryEventLike } from "./lib/types"

type Option = {
  cacheType: CacheType
}

export const creatExplainQuery = (
  prisma: PrismaClientLike,
  option: Option = { cacheType: "query" }
) => {
  const cache = createCache(option.cacheType)
  return {
    explain: async (event: PrismaQueryEventLike) => {
      const explainResult = await executeExplain(prisma, event, cache)
      return explainResult
    }
  }
}

export default creatExplainQuery
