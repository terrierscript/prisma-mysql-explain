import * as Papa from "papaparse"

export const parseParam = (param: string) => {
  const removeBlacket = param.replace(/^\[/, "").replace(/\]$/, "")
  if (removeBlacket === "") {
    return []
  }
  const parsed = Papa.parse(removeBlacket, {
    dynamicTyping: true,
  })

  return parsed.data[0]
}
