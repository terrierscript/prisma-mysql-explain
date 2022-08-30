import { explainQuery } from '../src'

describe('prisma-mysql-explain ', () => {
  it('explainQuery', async () => {
    const mockClientLike = {
      $queryRawUnsafe: async () => {
        return [
          {
            f0: 1n,
            f1: 'SIMPLE',
            f2: 'Post',
            f3: null,
            f4: 'ALL',
            f5: null,
            f6: null,
            f7: null,
            f8: null,
            f9: 1n,
            f10: 100,
            f11: 'Using where',
          },
        ]
      },
    }
    const mockEvent = {
      timestamp: new Date(),
      query: 'SELECT * FROM Post WHERE title = ?',
      params: '["x"]',
      duration: 66,
      target: 'quaint::connector::metrics',
    }
    const result = await explainQuery(mockClientLike, mockEvent)
    expect(result).toEqual([
      {
        id: 1n,
        key: null,
        key_len: null,
        partitions: null,
        possible_keys: null,
        ref: null,
        rows: 1n,
        select_type: 'SIMPLE',
        table: 'Post',
        type: 'ALL',
        filtered: 100,
        extra: 'Using where',
      },
    ])
  })
})
