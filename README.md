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

  const explain = createExplain(prisma)

  prisma.$on("query", async (event) => {
    const result = await explain(event)
    if(!reuslt){
      return
    }
    console.log({ result })
  })
  return prisma
}


```

## API

### `createExplain(prisma: PrismaClient, option: Option?) : ExplainEvent`

**Option**

* cacheType
  * query(default) - Cache with query
  * param - Cache with query and params
  * none - Disable cahce

**Return**

* `ExplainEvent(event: Prisma.QueryEvent) => ExplainResult[]`


