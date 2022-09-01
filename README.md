# prisma-mysql-explain

Execute mysql explain for [Prisma](https://www.prisma.io/)

### WARNING
This library is for development environments.

**Don't use production environment.**

## usage

```ts
import { createExplain } from "prisma-mysql-explain"

const createPrisma = () => {
  // Need query event log
  const prisma = new PrismaClient({
    log: [{ level: "query", emit: "event" }]
  })

  const prismaExplain = creatExplainQuery(prisma, {cacheType: "params"})

  prismaExplain.onExplain((explainResult, event: Prisma.QueryEvent) => {
    console.log({ explainResult, event })
  })
  
  return prisma
}
```


## API

### `createExplain(prisma: PrismaClient, option: Option?) `

**Option**

* cacheType
  * query(default) - Cache with query
  * param - Cache with query and params
  * none - Disable cahce

**Return**

* `onExplain: (explain: ExplainRecord[], event: Prisma.QueryEvent) => ExplainResult[]`


