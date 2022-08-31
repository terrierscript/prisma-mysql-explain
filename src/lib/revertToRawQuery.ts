import { parseParam } from "./parseParam"
import { PrismaQueryEventLike } from "./types"
import * as SqlString from "sqlstring"

export const revertToRawQuery = (event: PrismaQueryEventLike) => {

  const params = parseParam(event.params)

  if (!Array.isArray(params)) {
    return
  }
  return SqlString.format(event.query, params)
}