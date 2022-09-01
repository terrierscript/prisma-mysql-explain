export type PrismaQueryEventLike = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}
export type PrismaClientLike = {
  $queryRawUnsafe(query: string, ...values: any[]): Promise<any>
  $on(eventType: "query", callback: (event: PrismaQueryEventLike) => void): void
}
