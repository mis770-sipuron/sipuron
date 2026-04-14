// Cardcom API response types

export interface CardcomTransaction {
  TransactionId: number;
  Amount: number;
  CardOwnerName: string;
  Last4Digits: string;
  TransactionDate: string;
  StatusCode: number;
  StatusDescription: string;
  NumOfPayments: number;
  FirstPaymentAmount: number;
  RestPaymentsAmount: number;
  Currency: string;
  InvoiceNumber: string;
  CustomField: string;
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
