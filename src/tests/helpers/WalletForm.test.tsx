import { screen, waitFor, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import * as actions from '../../redux/actions';
import Wallet from '../../pages/Wallet';
import { ExpenseType, ExchangeRateType, ExchangeRatesType } from '../../types';
import mockData from './mockData';

import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';
import WalletForm from '../../components/WalletForm';

const valor = 'value-input';
const descricao = 'description-input';
const moeda = 'currency-input';
const metodo = 'method-input';
const string = 'Alimentação';

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => mockData,
  } as Response);
});
afterEach(() => {
  vi.restoreAllMocks();
});
describe('Actions', () => {
  test('Teste para a action de iniciar a edição de uma despesa', () => {
    const id = 1;
    const expectedAction = {
      type: actions.EDIT_EXPENSE,
      payload: id,
    };
    expect(actions.editExpense(id)).toEqual(expectedAction);
  });
  test('Teste para a action de deletar uma despesa', () => {
    const id = 1;
    const expectedAction = {
      type: actions.DELETE_EXPENSE,
      payload: id,
    };
    expect(actions.deleteExpense(id)).toEqual(expectedAction);
  });
  test('Teste para a action de sucesso ao obter moedas', () => {
    const currencies = ['USD', 'EUR', 'GBP'];
    const expectedAction = {
      type: actions.CURRENCIES_SUCCESS,
      payload: currencies,
    };
    expect(actions.currenciesSuccess(currencies)).toEqual(expectedAction);
  });
});

describe('Testando a pagina login', () => {
  it('testa os elementos na página de login', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const email = screen.getByTestId('email-input');
    expect(email).toBeInTheDocument();

    const password = screen.getByTestId('password-input');
    expect(password).toBeInTheDocument();

    const loginBtn = screen.getByRole('button');
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toBeDisabled();

    await userEvent.type(email, 'trybe@testes.com');
    await userEvent.type(password, 'trybe123');
    expect(loginBtn).not.toBeDisabled();
    await userEvent.click(loginBtn);
  });
});
describe('Table', () => {
  test('Verifica botão Editar despesa', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const expenseIpt = screen.getByTestId(valor);
    const descriptionIpt = screen.getByTestId(descricao);
    const selectCurrency = screen.getByTestId(moeda);
    const selectMethod = screen.getByTestId(metodo);
    const selectTag = screen.getByTestId('tag-input');
    const expenseBtn = screen.getByRole('button', { name: /adicionar despesa/i });

    await userEvent.type(expenseIpt, '400');
    await userEvent.type(descriptionIpt, 'hospital');
    await userEvent.selectOptions(selectTag, 'Saúde');
    await userEvent.selectOptions(selectCurrency, 'USD');
    await userEvent.selectOptions(selectMethod, 'Dinheiro');
    await userEvent.click(expenseBtn);
  });
});

describe('Testando a página Wallet', () => {
  it('testa as funcionalidades da Carteira', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const btnAdd = screen.getByRole('button', {
      name: /Adicionar Despesa/i,
    });

    await userEvent.type(value, '5');
    await userEvent.type(description, 'carne');
    await userEvent.click(btnAdd);
    await waitFor(() => {
      const totalValue = screen.getByTestId('total-field');
      expect(totalValue).toBeInTheDocument();
    });

    await waitFor(() => {
      const currency = screen.getByTestId('currency-input');
      expect(currency).toBeInTheDocument();
    });

    const method = screen.getByTestId('method-input');
    expect(method).toBeInTheDocument();

    const tag = screen.getByTestId('tag-input');
    expect(tag).toBeInTheDocument();

    const brl = screen.getByTestId('header-currency-field');
    expect(brl).toBeInTheDocument();

    const emailField = screen.getByTestId('email-field');
    expect(emailField).toBeInTheDocument();

    const btnDel = screen.getByText('Excluir');
    const btnEdit = screen.getByText('Editar');

    await waitFor(() => {
      expect(btnEdit).toBeInTheDocument();
      expect(btnDel).toBeInTheDocument();
    });

    const item = screen.getByText('carne');
    expect(item).toBeInTheDocument();

    await userEvent.click(btnEdit);
    const updateBtn = screen.getByText('Editar Despesa');
    await waitFor(() => {
      expect(updateBtn).toBeInTheDocument();
    });

    await userEvent.type(description, 'arroz');
    await userEvent.type(value, '10');
    await userEvent.click(updateBtn);
    await waitFor(() => {
      expect(screen.getByText(/arroz/)).toBeInTheDocument();
    });

    await userEvent.click(btnDel);
    await waitFor(() => {
      expect(btnDel).not.toBeInTheDocument();
      expect(btnEdit).not.toBeInTheDocument();
    });
  });
});

// describe('Test action', () => {
//   test('Exchange', () => {
//     const currencies = ['USD', 'EUR', 'GBP'];
//     const testAction = {
//       type: actions.CURRENCIES_SUCCESS,
//       payload: currencies,
//     };
//     expect(actions.currenciesSuccess(currencies)).toEqual(testAction);
//   });
//   test('Exchange', () => {
//     const currencies = ['USD', 'EUR', 'GBP'];
//     const testAction = {
//       type: actions.EXCHANGE_RATES,
//       payload: currencies,
//     };
//     expect(actions.currenciesSuccess(currencies)).toEqual(testAction);
//   });
// });
