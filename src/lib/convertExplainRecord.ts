export const convertExplainRecord = (row: Record<string, any>) => {
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
}

export type ExplainRecord = ReturnType<typeof convertExplainRecord>
