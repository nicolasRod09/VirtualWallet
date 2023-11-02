import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

type UserType = {
  email: string,
};

export type ExchangeRatesType = {
  code: string,
  codein: string,
  name: string,
  high: string,
  low: string,
  varBid: string,
  pctChange: string,
  bid: string,
  ask: string,
  timestamp: string,
  create_date: string,
};

export type DataType = {
  id: number,
  value: string,
  currency: string,
  method: string,
  tag: string,
  description: string,
  exchangeRates: {
    [currency: string]: CurrencyType
  },
};

export type CurrencyType = {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string | number | any;
  ask: string | number | any;
  timestamp: string;
  create_date: string;
};

export type ExchangeRateType = {
  USD: ExchangeRatesType,
  CAD: ExchangeRatesType,
  EUR: ExchangeRatesType,
  GBP: ExchangeRatesType,
  ARS: ExchangeRatesType,
  BTC: ExchangeRatesType,
  LTS: ExchangeRatesType,
  JPY: ExchangeRatesType,
  CHF: ExchangeRatesType,
  AUD: ExchangeRatesType,
  CNY: ExchangeRatesType,
  ILS: ExchangeRatesType,
  ETH: ExchangeRatesType,
  XRP: ExchangeRatesType,
};

export type ExpenseType = {
  id: number,
  value: string,
  currency: string,
  method: string,
  tag: string,
  description: string,
  exchangeRates: object,
};

export type FormTypes = {
  id: number,
  value: string,
  currency: string,
  method: string,
  tag: string,
  description: string,
};

type WalletType = {
  currencies: string[];
  expenses: ExpenseType[];
  editor: false,
  idToEdit: number,
  isFetch: boolean,
  exchangeRates: {
    USD: ExchangeRatesType,
    CAD: ExchangeRatesType,
    EUR: ExchangeRatesType,
    GBP: ExchangeRatesType,
    ARS: ExchangeRatesType,
    BTC: ExchangeRatesType,
    LTS: ExchangeRatesType,
    JPY: ExchangeRatesType,
    CHF: ExchangeRatesType,
    AUD: ExchangeRatesType,
    CNY: ExchangeRatesType,
    ILS: ExchangeRatesType,
    ETH: ExchangeRatesType,
    XRP: ExchangeRatesType,
  },
};

export type ReduxState = {
  user: UserType,
  wallet: WalletType,
};

type Currencies = {
  [key: string]: ExchangeRatesType;
};

export type Expense = {
  id: number;
  description: string;
  tag: any;
  category?: string;
  value: string;
  currency: string;
  method: string;
  exchangeRates: any;
};

export type GlobalState = {
  user: {
    email: string;
  };
  wallet: {
    currencies: string[];
    expenses: Expense[];
    editor: boolean;
    idToEdit: number;
    exchangeRates: Currencies ;
  };
};

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;
