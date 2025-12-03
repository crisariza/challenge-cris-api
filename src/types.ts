export interface EnvConfig {
  PORT: string;
  VALID_API_KEYS: string;
}

export interface ApiResponse<T = any> {
  status: string;
  timestamp: string;
  service?: string;
  data?: T;
  error?: string;
  message?: string;
  details?: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  details?: string;
}

export interface Card {
  id: number;
  issuer: string;
  name: string;
  expDate: string;
  lastDigits: number;
  balance: string;
  currency: string;
}

export interface Transaction {
  id: number;
  title: string;
  amount: string;
  transactionType: "SUS" | "CASH_IN" | "CASH_OUT";
  date: string;
}
