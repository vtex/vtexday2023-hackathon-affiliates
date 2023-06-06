import React, { FC } from 'react'
import { Route } from 'vtex.my-account-commons/Router'
import { ContentWrapper } from 'vtex.my-account-commons'

type MyAccountAffiliatePaymentPageProps = {
  children: FC
  title?: string
  namespace?: string
}
const MyAccountAffiliatePaymentPage = ({
  children,
  title,
  namespace = 'affiliates-payment',
}: MyAccountAffiliatePaymentPageProps) => {
  return (
    <Route
      exact
      path="/affiliates-payment"
      render={() => {
        if (!title || title.trim().length === 0) {
          return children
        }
        return (
          <ContentWrapper title={title} namespace={namespace}>
            {() => children}
          </ContentWrapper>
        )
      }}
    />
  )
}

export default MyAccountAffiliatePaymentPage