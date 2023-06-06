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

    if (get?.errors || !get?.status?.success) {
      throw new Error(get.errors);
    }

    const list_transactions = []
    if (!get.list_transactions.length) {
      ctx.status = 204
      ctx.body = 'No Content'
    }

    for (const transaction of get.list_transactions) {
      const details = []
      for (const detail of transaction.details) {
        details.push({
          payment_date: detail.payment_date,
          subseller_rate_amount: detail.subseller_rate_amount,
          subseller_rate_percentage: detail.subseller_rate_percentage,
          number_installments: detail.number_installments,
          installment: detail.installment,
          installment_date: detail.installment_date,
          installment_amount: detail.installment_amount
        })
      }

      list_transactions.push({
        order_id: transaction.summary.order_id,
        transaction_date: transaction.summary.transaction_date,
        confirmation_date: transaction.summary.confirmation_date,
        transaction_sign: transaction.summary.transaction_sign,
        card_payment_amount: transaction.summary.card_payment_amount,
        details
      })
    }

    ctx.status = 200
    ctx.body = list_transactions

    return ctx
  } catch (error) {
    console.error(error)

    ctx.status = 400
    ctx.body = error?.message || 'Bad Request'

    return ctx
  }
}

export default getTransactions
