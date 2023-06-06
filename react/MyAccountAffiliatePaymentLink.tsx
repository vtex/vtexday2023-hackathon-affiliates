import PropTypes from 'prop-types'

const MyAccountAffiliatePaymentLink = ({
  render,

}: {
  render: ([{ name, path }]: Array<{ name: string; path: string }>) => any
  label: string
}) => {
  return render([
    {
      name: 'Pagamento de Afiliado',
      path: '/affiliates-payment',
    },
  ])
}

MyAccountAffiliatePaymentLink.propTypes = {
  render: PropTypes.func.isRequired,
  label: PropTypes.string,
}

export default MyAccountAffiliatePaymentLink