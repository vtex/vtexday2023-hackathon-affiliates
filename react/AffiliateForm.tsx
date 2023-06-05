
import React, { useMemo } from 'react'

// import { useMutation } from 'react-apollo'
// import { useIntl } from 'react-intl'
// import ADD_AFFILIATE from './graphql/addAffiliate.graphql'
// import AddressInfo from './components/store/form/AddressInfo'
// import GeneralInfo from './components/store/form/GeneralInfo'
// import MarketingInfo from './components/store/form/MarketingInfo'
import { useMutation } from 'react-apollo'
import type { Affiliate } from 'vtex.vtexday2023-hackathon-affiliates'
import { useIntl } from 'react-intl'
import { messages } from './utils/messages'
import ADD_AFFILIATE from './graphql/addAffiliate.graphql'
import { Input } from 'vtex.styleguide'
type AffiliateFormProps = {
  affiliate?: Affiliate
}

function AffiliateForm ({ affiliate } : AffiliateFormProps) {
  //const showToast = useToast()
  const intl = useIntl()
  const [addAffiliate] = useMutation(ADD_AFFILIATE)
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

  console.log("initialValues", initialValues)

  //  const [form, setForm] = useState(initialValues)

    const onSubmit =
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
    }
  


  return (
    <form>
      <h1>{intl.formatMessage(messages.generalInfoLabel)}</h1>
      <div>
        <div>
          <Input
            name="name"
            label={intl.formatMessage(messages.nameLabel)}
          />
        </div>
        <div>
          <Input
            name="storeName"
            label={intl.formatMessage(messages.storeNameLabel)}
          />
        </div>
        <div>
          <Input

            name="email"
            label={intl.formatMessage(messages.emailLabel)}
          />
        </div>
        <div>
          <Input
            name="phone"
            label={intl.formatMessage(messages.phoneLabel)}
          />
        </div>
        <div>
          <Input
            name="slug"
            label={intl.formatMessage(messages.slugLabel)}
          />
        </div>
        <div>
          <Input
            name="refId"
            label={intl.formatMessage(messages.refIdLabel)}
          />
        </div>
        <div>
          <Input
            name="documentType"
            label={intl.formatMessage(messages.documentTypeLabel)}
          />
        </div>
        <div>
          <Input
            name="document"
            label={intl.formatMessage(messages.documentLabel)}
          />
        </div>
        </div>

           {/* <AddressInfo form={f} setForm={setForm}/>
          <MarketingInfo form={f} setForm={setForm}/> */}
            <button
              // loading={loading}
              onClick={onSubmit}
              type="submit"
            >
              {intl.formatMessage(messages.saveLabel)}
            </button>

      </form>

  )
}

export default AffiliateForm
