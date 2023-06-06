export async function getTransactions(
  ctx: Context,
  __next: () => Promise<any>
) {
  const urlParams = new URLSearchParams(ctx.req?.url?.split('?')[1]);

  const sellerId = urlParams.get('seller_id');
  const subsellerId = urlParams.get('subseller_id');
  const transactionDateInit = urlParams.get('transaction_date_init');
  const transactionDateEnd = urlParams.get('transaction_date_end') || new Date();

  try {
    if (sellerId === null || subsellerId === null || transactionDateInit === null) {
      throw new Error('Required parameters are missing.');
    }

    const get = await ctx.clients.getnet.getTransactions({
      seller_id: sellerId,
      subseller_id: Number(subsellerId),
      transaction_date_init: new Date(transactionDateInit).toJSON(),
      transaction_date_end: new Date(transactionDateEnd).toJSON(),
    });

    if (get?.errors) {
      throw new Error(get.errors);
    }

    ctx.status = 200
    ctx.body = get

    return ctx
  } catch (error) {
    console.error(error)

    ctx.status = 400
    ctx.body = error?.message || 'Bad Request'

    return ctx
  }
}

export default getTransactions
