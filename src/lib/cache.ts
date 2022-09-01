import { ExplainRecord } from "./convertExplainRecord"
import { PrismaQueryEventLike } from "./types"

export type CacheType = "param" | "query" | "none"

export const createCache = (type: CacheType) => {
  const cache = new Map<string, ExplainRecord[]>()

  const generateCacheKey = (event: PrismaQueryEventLike) => {
    switch (type) {
      case "param":
        return `${event.query}_${event.params}`
      case "query":
        return `${event.query}`
      default:
        return null
    }
  }

  return {
    get: (event: PrismaQueryEventLike) => {
      const key = generateCacheKey(event)
      if (!key) {
        return
      }
      return cache.get(key)
    },
    set: (event: PrismaQueryEventLike, result: ExplainRecord[]) => {
      const key = generateCacheKey(event)
      if (!key) {
        return
      }
      cache.set(key, result)
    }
  }

}

export type ExplainResultCache = ReturnType<typeof createCache>