import parse from 'co-body'

import type { UpdatePreSubSellerPF } from '../../typings/getnet'

export async function updatePF(
  ctx: Context,
  __next: () => Promise<any>
) {
  const { req } = ctx

  const body: UpdatePreSubSellerPF = await parse.json(req)

  const update = await ctx.clients.getnet.updatePF(
    body
  )

  ctx.status = 200
  ctx.body = update

  if (update?.errors?.length) {
    ctx.status = 400
  }

  return ctx
}

export default updatePF
