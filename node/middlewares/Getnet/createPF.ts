import parse from 'co-body'

import type { CreatePreSubSellerPF } from '../../typings/getnet'

export async function createPF(
  ctx: Context,
  __next: () => Promise<any>
) {
  const { req } = ctx

  const body: CreatePreSubSellerPF = await parse.json(req)

  const create = await ctx.clients.getnet.createPF(
    body
  )

  ctx.status = 200
  ctx.body = create

  if (create?.errors) {
    ctx.status = 400
  }

  return ctx
}

export default createPF
