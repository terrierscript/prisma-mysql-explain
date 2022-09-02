import { ExplainResultCache } from "./cache"
import { convertExplainRecord } from "./convertExplainRecord"
import { revertToRawQuery } from "./revertToRawQuery"
import { PrismaClientLike, PrismaQueryEventLike } from "./types"

export const executeExplain = async (
  prisma: PrismaClientLike,
  event: PrismaQueryEventLike,
  cache?: ExplainResultCache
) => {
  if (!event.query.toUpperCase().startsWith("SELECT ")) {
    return
  }
  const cacheResult = cache?.get(event)

  if (cacheResult) {
    return cacheResult
  }

  const rawQuery = revertToRawQuery(event)

  if (!rawQuery) {
    return
  }

  const explain = `EXPLAIN ${rawQuery}`
  const explainResults = await prisma.$queryRawUnsafe(explain)

  if (!Array.isArray(explainResults)) {
    return []
  }
  const result = explainResults.map(row => {
    return convertExplainRecord(row)
  })

  cache?.set(event, result)
  return result
}
