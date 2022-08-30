# prisma-mysql-explain

### WARNING
This library is for development environments.

**Don't use production environment.**

## usage

```ts
// Need query event log

const prisma = new PrismaClient({
  log: [{ level: "query", emit: "event" }]
})

if(process.env.NODE_ENV === "development"){
  // append $on event
  prisma.$on("query", async (event) => {
    const result = await explainQuery(prisma, event)
    console.log(result)
  })
}
```