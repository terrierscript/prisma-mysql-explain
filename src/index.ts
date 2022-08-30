import * as SqlString from "sqlstring"
import * as Papa from "papaparse"

const parseParam = (param: string) => {
  const removeBlacket = param.replace(/^\[/, "").replace(/\]$/, "")
  const parsed = Papa.parse(removeBlacket, {
    dynamicTyping: true,
  })
  return parsed.data[0]
}

type PrismaQueryEventLike = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

type PrismaClientLike = {
  $queryRawUnsafe(query: string, ...values: any[]): Promise<any>
}

export const explainQuery = async (
  prisma: PrismaClientLike,
  event: PrismaQueryEventLike
) => {
  if (!event.query.startsWith("SELECT ")) {
    return
  }

  const params = parseParam(event.params)

  if (!Array.isArray(params)) {
    return
  }
  const rawQuery = SqlString.format(event.query, params)

  const explain = `EXPLAIN ${rawQuery}`
  const explainResults = await prisma.$queryRawUnsafe(explain)
  if (!Array.isArray(explainResults)) {
    return []
  }
  return explainResults.map(row => {
    return {
      id: row["f0"],
      select_type: row["f1"],
      table: row["f2"],
      partitions: row["f3"],
      type: row["f4"],
      possible_keys: row["f5"],
      key: row["f6"],
      key_len: row["f7"],
      ref: row["f8"],
      rows: row["f9"],
      filtered: row["f10"],
      extra: row["f11"],
    }
  })
}

export default explainQuery
