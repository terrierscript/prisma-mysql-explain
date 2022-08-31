import { convertExplainRecord } from "./lib/convertExplainRecord"
import { revertToRawQuery } from "./lib/revertToRawQuery"
import { PrismaClientLike, PrismaQueryEventLike } from "./lib/types"

export const explainQuery = async (
  prisma: PrismaClientLike,
  event: PrismaQueryEventLike
) => {
  if (!event.query.toUpperCase().startsWith("SELECT ")) {
    return
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
  return explainResults.map(row => {
    return convertExplainRecord(row)
  })
}

export default explainQuery
