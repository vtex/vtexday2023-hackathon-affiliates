export type CreatePreSubSellerPF = {
  merchant_id: string
  legal_document_number: number
  legal_name: string
  birth_date: Date
  mothers_name: string
  occupation: string
  email: string
  url_callback: string
  payment_plan: number
  accepted_contract: string
  phone: CreatePreSubSellerPhone
  business_address: CreatePreSubSellerBusinessAddress
  bank_accounts: CreatePreSubSellerBankAccounts
  list_commissions: CreatePreSubSellerListCommissions
}

export type CreatePreSubSellerPhone = {
  area_code: number
  phone_number: number
}

export type CreatePreSubSellerBusinessAddress = {
  mailing_address_equals: string
  street: string
  number: number
  district: string
  city: string
  state: string
  postal_code: number
  suite: string
}

export type CreatePreSubSellerBankAccounts = {
  type_accounts: string
  unique_account: CreatePreSubSellerBankAccount
}

export type CreatePreSubSellerBankAccount = {
  account_type: string
  bank: number
  agency: number
  account: number
  account_digit: string
}

export type CreatePreSubSellerListCommissions = {
  brand: string
  product: string
  payment_plan: number
  commission_percentage: number
  commission_value: number
}
