export type PrismaQueryEventLike = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}
export type PrismaClientLike = {
  $queryRawUnsafe(query: string, ...values: any[]): Promise<any>
}
