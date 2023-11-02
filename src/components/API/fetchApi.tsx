import { Dispatch } from 'redux';
import { currenciesSuccess } from '../../redux/actions';

const url = 'https://economia.awesomeapi.com.br/json/all';

export const fetchApi = () => async (dispatch: Dispatch) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    delete data.USDT;
    const currencies = Object.keys(data);
    dispatch(currenciesSuccess(currencies));
  } catch (e) {
    console.log(e);
  }
};

export const fetchFullApi = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await response.json();
  delete result.USDT;
  return result;
};
