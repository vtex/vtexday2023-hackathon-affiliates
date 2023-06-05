import React, { useMemo } from 'react'
import { useQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
import { Totalizer, IconArrowUp, IconArrowDown, IconShoppingCart } from 'vtex.styleguide'

import GET_AFFILIATE_STORE_NAME_QUERY from './graphql/getAffiliateStoreName.graphql'
import { getSlugStoreFront } from './utils/shared'

type GetAffiliateStoreNameQueryResult = {
  getAffiliateStoreName: string
}

const CSS_HANDLES = [
  'affiliateProfileTitle',
  'affiliateProfileTitleContainer',
] as const

function AffiliateProfileDetails() {
  const slug = useMemo(() => {
    return getSlugStoreFront()
  }, [])

  const { handles } = useCssHandles(CSS_HANDLES)

  const { data, error } = useQuery<GetAffiliateStoreNameQueryResult>(
    GET_AFFILIATE_STORE_NAME_QUERY,
    {
      variables: { slug },
      skip: !slug,
    }
  )

  // TODO

  return (
    <div
      className={`f1 mw9 center mr-auto ml-auto my-3 ba br-0 bl-0 bt-0 b--light-gray ${handles.affiliateProfileTitleContainer} `}
    >
      <h4 className={`t-heading-4 ${handles.affiliateProfileTitle}`}>
        Affiliate Store Name: {error ? '' : data?.getAffiliateStoreName} - TODO
        <Totalizer horizontalLayout
          items={[
            {
              label: 'Orders',
              value: '566',
              inverted: true,
              iconBackgroundColor: '#eafce3',
              icon: <IconArrowUp color="#79B03A" size={14} />,
            },
            {
              label: 'Average Ticket',
              value: 'US$ 55.47',
              inverted: true,
              iconBackgroundColor: '#cce8ff',
              icon: <IconShoppingCart color="#368df7" size={14} />,
            },
            {
              label: 'Gross',
              value: 'US$ 554.70',
              inverted: true,
              iconBackgroundColor: '#fda4a4',
              icon: <IconArrowDown color="#dd1616" size={14} />,
            },
          ]} />
      </h4>
    </div>
  )
}

export default AffiliateProfileDetails
