# prisma-mysql-explain

Execute mysql explain for [Prisma](https://www.prisma.io/)

### WARNING
This library is for development environments.

**Don't use production environment.**

## usage

```ts
// Need query event log

export const createPrismaClientWithExplain = () => {
  const prisma = new PrismaClient({
    log: [{ level: "query", emit: "event" }]
  })
  // append $on event
  prisma.$on("query", async (event) => {
    const result = await explainQuery(prisma, event)
    console.log(result)
  })
  return prisma
}
```