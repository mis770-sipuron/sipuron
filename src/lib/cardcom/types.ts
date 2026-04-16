// Cardcom API response types

export interface CardcomTransaction {
  Id: number;
  Amount: number;
  Last4DigitsStr: string;
  Last4Digits: number;
  CreateDate: string;
  TransacDate: string;
  NoPayments: number;
  ActionCode: number;
  CouponNumber: string;
  AuthorizeNo: string;
  Brand: number;
  Currency: number;
  // Keep old field names as optional aliases
  TransactionId?: number;
  CardOwnerName?: string;
  TransactionDate?: string;
  StatusCode?: number;
  StatusDescription?: string;
  NumOfPayments?: number;
  FirstPaymentAmount?: number;
  RestPaymentsAmount?: number;
  InvoiceNumber?: string;
  CustomField?: string;
}

export interface CardcomFailedTransaction {
  TransactionId: number;
  Amount: number;
  CardOwnerName: string;
  Last4Digits: string;
  TransactionDate: string;
  StatusCode: number;
  StatusDescription: string;
  FailureReason: string;
  NumOfPayments: number;
  Currency: string;
}

export interface CardcomRefundResult {
  TransactionId: number;
  RefundTransactionId: number;
  Amount: number;
  StatusCode: number;
  StatusDescription: string;
}

export interface CardcomTransactionsResponse {
  ResponseCode: number;
  Description: string;
  Page: number;
  Page_size: number;
  CreditCardTransactions: CardcomTransaction[];
}

export interface CardcomResponse<T> {
  ResponseCode: number;
  Description: string;
  Results: T[];
}

export interface CardcomRefundResponse {
  ResponseCode: number;
  Description: string;
  RefundTransactionId: number;
}
