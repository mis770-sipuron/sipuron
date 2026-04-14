import type {
  CardcomTransaction,
  CardcomFailedTransaction,
  CardcomResponse,
  CardcomRefundResponse,
} from "./types";

const BASE_URL = "https://secure.cardcom.solutions/api/v11/";

function getCredentials() {
  const terminalNumber = process.env.CARDCOM_TERMINAL;
  const apiName = process.env.CARDCOM_API_NAME;
  const apiPassword = process.env.CARDCOM_API_PASSWORD;

  if (!terminalNumber || !apiName || !apiPassword) {
    throw new Error(
      "Missing Cardcom credentials. Set CARDCOM_TERMINAL, CARDCOM_API_NAME, and CARDCOM_API_PASSWORD env vars."
    );
  }

  return { TerminalNumber: terminalNumber, ApiName: apiName, ApiPassword: apiPassword };
}

async function cardcomPost<T>(endpoint: string, body: Record<string, unknown>): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  console.log(`[Cardcom] POST ${url}`);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error(`[Cardcom] HTTP ${response.status}: ${text}`);
    throw new Error(`Cardcom API error: HTTP ${response.status}`);
  }

  const data = (await response.json()) as T;
  return data;
}

/**
 * Fetch credit card transactions for a date range.
 * @param fromDate - DDMMYYYY format (e.g. "01042026")
 * @param toDate - DDMMYYYY format (e.g. "30042026")
 */
export async function getTransactions(
  fromDate: string,
  toDate: string
): Promise<CardcomResponse<CardcomTransaction>> {
  const credentials = getCredentials();

  return cardcomPost<CardcomResponse<CardcomTransaction>>(
    "Financial/CreditCardTransactions",
    {
      ...credentials,
      FromDate: fromDate,
      ToDate: toDate,
    }
  );
}

/**
 * Fetch failed / special transactions for a date range.
 * @param fromDate - DDMMYYYY format
 * @param toDate - DDMMYYYY format
 */
export async function getFailedTransactions(
  fromDate: string,
  toDate: string
): Promise<CardcomResponse<CardcomFailedTransaction>> {
  const credentials = getCredentials();

  return cardcomPost<CardcomResponse<CardcomFailedTransaction>>(
    "Transactions/SpecialTransactions",
    {
      ...credentials,
      FromDate: fromDate,
      ToDate: toDate,
    }
  );
}

/**
 * Refund a transaction by its ID.
 * @param transactionId - The Cardcom transaction ID to refund
 * @param amount - Optional partial refund amount. Omit for full refund.
 */
export async function refundTransaction(
  transactionId: string,
  amount?: number
): Promise<CardcomRefundResponse> {
  const credentials = getCredentials();

  const body: Record<string, unknown> = {
    ...credentials,
    TransactionId: transactionId,
  };

  if (amount !== undefined) {
    body.RefundAmount = amount;
  }

  return cardcomPost<CardcomRefundResponse>(
    "Transactions/RefundByTransactionId",
    body
  );
}
