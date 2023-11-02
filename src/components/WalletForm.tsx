/* eslint-disable react/jsx-curly-spacing */
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, updateExpense } from '../redux/actions';
import { Dispatch, ReduxState, ExpenseType } from '../types';
import Input from './Input';
import { fetchFullApi } from './API/fetchApi';
import '../style/walletForm.css';

function WalletForm() {
  const INITIAL_INPUT_STATE = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  const walletState = useSelector((state: ReduxState) => state.wallet);
  const [initialForm, setInitialForm] = useState<ExpenseType>(INITIAL_INPUT_STATE);
  const editState = useSelector(() => walletState.editor);
  const idState = useSelector(() => walletState.idToEdit);
  const expenses = useSelector(() => walletState.expenses);
  const { currencies } = walletState;
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    if (editState) {
      const attExpense = {
        id: idState,
        value: expenses[idState].value,
        description: expenses[idState].description,
        currency: expenses[idState].currency,
        method: expenses[idState].method,
        tag: expenses[idState].tag,
        exchangeRates: expenses[idState].exchangeRates,
      };
      setInitialForm(attExpense);
    }
  }, [editState, expenses, idState]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, type, value } = event.target;
    setInitialForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? (event.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();

    const newExchangeRates = data;

    const expense: ExpenseType = {
      id: walletState.expenses.length,
      value: initialForm.value,
      description: initialForm.description,
      currency: initialForm.currency,
      method: initialForm.method,
      tag: initialForm.tag,
      exchangeRates: newExchangeRates,
    };
    dispatch(addExpense(expense));
    setInitialForm({ ...initialForm, value: '', description: '' });
  }
  function validatorFormInput(): boolean {
    return initialForm.description.length > 0 && Number(initialForm.value) > 0;
  }

  const handleClickUpdate = async () => {
    const currentExchangeRates = await fetchFullApi();
    console.log(currentExchangeRates);
    const updatedExpense = {
      id: idState,
      value: initialForm.value,
      currency: initialForm.currency,
      method: initialForm.method,
      tag: initialForm.tag,
      description: initialForm.description,
      exchangeRates: currentExchangeRates,
    };
    dispatch(updateExpense(updatedExpense));
    setInitialForm(INITIAL_INPUT_STATE);
  };

  return (
    <div>
      <div className="wallet-form-h1">
        <h1>Wallet</h1>
      </div>
      <div className="wallet-form-container">
        <form className="form-container">
          <Input
            type="text"
            data-testid="value-input"
            onChange={(event) => handleChange(event)}
            value={initialForm.value}
            name="value"
            placeholder="Valor"
            className="input-field"
          />

          <Input
            type="text"
            data-testid="description-input"
            onChange={(event) => handleChange(event)}
            value={initialForm.description}
            name="description"
            placeholder="Descrição"
            className="input-field"
          />

          <select
            data-testid="currency-input"
            onChange={(event) => handleChange(event)}
            defaultValue="USD"
            name="currency"
            className="select-field"
          >
            {currencies.map((currency) => (
              <option
                key={currency}
                value={currency}
              >
                {currency}
              </option>))}
          </select>

          <select
            data-testid="method-input"
            onChange={(event) => handleChange(event)}
            value={initialForm.method}
            name="method"
            className="select-field"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <select
            data-testid="tag-input"
            onChange={(event) => handleChange(event)}
            value={initialForm.tag}
            name="tag"
            className="select-field"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          {!editState ? (
            <button
              type="submit"
              disabled={!validatorFormInput()}
              onClick={handleSubmit}
              className="submit-button"
            >
              Adicionar despesa
            </button>

          ) : (
            <button
              type="button"
              className="update-button"
              onClick={handleClickUpdate}
            >
              Editar Despesa
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default WalletForm;
