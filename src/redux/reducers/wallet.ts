import { ExchangeRatesType, ExpenseType, Expense, DataType } from '../../types';
import { CURRENCIES_SUCCESS, EXCHANGE_RATES, ADD_EXPENSE, UPDATE_EXPENSE,
  DELETE_EXPENSE, EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isFetch: false,
};

type ActionType = {
  type: string,
  payload: {
    currencies: ExpenseType, error: string, exchangeRates: ExchangeRatesType, id: number
  }
  isFetch: boolean,
};

const wallet = (state = INITIAL_STATE, action: ActionType) => {
  switch (action.type) {
    case CURRENCIES_SUCCESS:
      console.log(action.payload.currencies);
      return {
        ...state,
        currencies: action.payload,
        isFetch: false,
      };
    case ADD_EXPENSE: {
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    }
    case DELETE_EXPENSE: {
      return {
        ...state,
        expenses: [...state.expenses].filter(({ id }) => id !== action.payload) };
    }
    case EDIT_EXPENSE:
      return { ...state, editor: true, idToEdit: action.payload };
    case UPDATE_EXPENSE: {
      const { payload } = action;
      return {
        ...state,
        expenses: state.expenses.map((item: DataType) => {
          if (item.id === state.idToEdit) {
            return { ...item, ...payload };
          }
          return item;
        }),
        editor: false,
        idToEdit: 0,
      };
    }
    case EXCHANGE_RATES:
      return {
        ...state,
        exchangeRates: action.payload.exchangeRates,
      };
    default:
      return state;
  }
};
export default wallet;
