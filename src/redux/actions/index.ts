import { ExpenseType, ExchangeRateType, Expense } from '../../types';

export const STORE_USER = 'STORE_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const CURRENCIES_SUCCESS = 'CURRENCIES_SUCCESS';
export const EXCHANGE_RATES = 'EXCHANGE_RATES';

export const updateEmail = (user: object) => ({
  type: 'STORE_USER',
  payload: user,
});

export const addExpense = (expenses: ExpenseType) => ({
  type: 'ADD_EXPENSE',
  payload: expenses,
});

export const deleteExpense = (id: number) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const editExpense = (id: number) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

export const updateExpense = (updateExpenses: Expense) => ({
  type: UPDATE_EXPENSE,
  payload: updateExpenses,
});

export const currenciesSuccess = (currencies: string[]) => ({
  type: CURRENCIES_SUCCESS,
  payload: currencies,
});

export const exchangeRates = (exchangeRate: ExchangeRateType) => {
  return {
    type: EXCHANGE_RATES,
    payload: {
      exchangeRates: exchangeRate,
    },
  };
};
