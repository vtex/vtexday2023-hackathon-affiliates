export async function consultPF(
  ctx: Context,
  __next: () => Promise<any>
) {
  const urlParams = new URLSearchParams(ctx.req?.url?.split('?')[1]);

  if (!urlParams || urlParams.get('merchant_id') === null || urlParams.get('cpf') === null) {
    ctx.status = 400
    return ctx
  }

  const get = await ctx.clients.getnet.consultPF(
    urlParams.get('merchant_id') as string,
    parseInt(urlParams.get('cpf') as string),
  )

  if (get?.errors) {
    ctx.status = 400
  }

  ctx.status = 200
  ctx.body = get

  return ctx
}

export default consultPF
