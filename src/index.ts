import { CacheType, createCache } from "./lib/cache"
import { explain } from "./lib/explain"
import { PrismaClientLike, PrismaQueryEventLike } from "./lib/types"

import { ExplainRecord } from "./lib/convertExplainRecord"

type Option = {
  cacheType: CacheType
}

type ExplainHandler = (explain: ExplainRecord[], event: PrismaQueryEventLike) => void

export const creatExplainQuery = (prisma: PrismaClientLike, option: Option = { cacheType: "query" }) => {
  return {
    onExplain: (handler: ExplainHandler) => {
      const cache = createCache(option.cacheType)
      prisma.$on("query", async (event: PrismaQueryEventLike) => {
        const result = await explain(prisma, event, cache)
        if (!result) {
          return
        }
        handler(result, event)
      })
    }
  }
}

export default creatExplainQuery
