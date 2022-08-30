import { parseParam } from "../src/lib/parseParam"

describe("parseParam", () => {
  it("default pattern", () => {
    expect(
      parseParam('["xx,x",true,2022-08-30 14:43:33.307 UTC,1,0]')
    ).toEqual(["xx,x", true, "2022-08-30 14:43:33.307 UTC", 1, 0])
  })
  it("empty array", () => {
    expect(parseParam("[]")).toEqual([])
  })
})
