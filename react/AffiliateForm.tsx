
import React, { useCallback, useMemo } from 'react'
import {Button, Flex, FlexSpacer} from '@vtex/admin-ui'
import { Form, useFormState, yupResolver } from '@vtex/admin-ui-form'
// import { useMutation } from 'react-apollo'
// import { useIntl } from 'react-intl'
// import ADD_AFFILIATE from './graphql/addAffiliate.graphql'
import AddressInfo from './components/store/form/AddressInfo'
import GeneralInfo from './components/store/form/GeneralInfo'
import MarketingInfo from './components/store/form/MarketingInfo'
import { useMutation } from 'react-apollo'
import type { Affiliate } from 'vtex.vtexday2023-hackathon-affiliates'
import { useIntl } from 'react-intl'
import { VALIDATION_SCHEMAS } from './utils/validationSchemas'
import { messages } from './utils/messages'
import ADD_AFFILIATE from './graphql/addAffiliate.graphql'

type AffiliateFormProps = {
  affiliate?: Affiliate
}

function AffiliateForm ({ affiliate } : AffiliateFormProps) {
  //const showToast = useToast()
  const intl = useIntl()
  const [addAffiliate, { loading }] = useMutation(ADD_AFFILIATE)
  // const errors = error?.graphQLErrors[0]?.extensions?.exception?.graphQLErrors

  // TODO
  
   const initialValues = useMemo(() => {
    return {
      name: affiliate?.name ?? '',
      email: affiliate?.email ?? '',
      phone: affiliate?.phone ?? '',
      storeName: affiliate?.storeName ?? '',
      slug: affiliate?.slug ?? '',
      refId: affiliate?.refId ?? '',
      document: affiliate?.document ?? '',
      documentType: affiliate?.documentType ?? '',
      address: {
        street: affiliate?.address?.street ?? '',
        number: affiliate?.address?.number ?? '',
        neighborhood: affiliate?.address?.neighborhood ?? '',
        city: affiliate?.address?.city ?? '',
        state: affiliate?.address?.state ?? '',
        postalCode: affiliate?.address?.postalCode ?? '',
        country: affiliate?.address?.country ?? '',
        reference: affiliate?.address?.reference ?? '',
      },
      marketing: {
        instagram: affiliate?.marketing?.instagram ?? '',
        facebook: affiliate?.marketing?.facebook ?? '',
        whatsapp: affiliate?.marketing?.whatsapp ?? '',
        gtmId: affiliate?.marketing?.gtmId ?? '',
      },
    }
  }, [affiliate])

    const onSubmit = useCallback(
    (values: Affiliate) => {
      const result = addAffiliate({
        variables: {
          newAffiliate: {
            ...values,
            phone: values.phone?.toString(),
            isApproved: false,
          },
        },
      })

      console.log("result", result)
    },
    [affiliate, addAffiliate]
  )

  const form = useFormState({
    resolver: yupResolver(VALIDATION_SCHEMAS(intl).affiliateForm),
    defaultValues: initialValues,
  })

  return (
        <Form state={form} onSubmit={onSubmit}>
          <GeneralInfo form={form} />
          <AddressInfo form={form} />
          <MarketingInfo form={form} />
          <Flex>
            <FlexSpacer />
            <Button
              loading={loading}
              type="submit"
            >
              {intl.formatMessage(messages.saveLabel)}
            </Button>
        </Flex>
      </Form>

  )
}

export default AffiliateForm
