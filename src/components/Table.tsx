/* eslint-disable max-len */
/* eslint-disable react/jsx-curly-spacing */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxState, Dispatch, Expense } from '../types';
import { deleteExpense, editExpense } from '../redux/actions';
import '../style/table.css';

function Table() {
  const walletState = useSelector((state: ReduxState) => state.wallet);
  const { expenses } = walletState;
  const dispatch: Dispatch = useDispatch();

  const handleDelet = (id: number) => {
    dispatch(deleteExpense(id));
  };

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.target as HTMLButtonElement;
    dispatch(editExpense(Number(id)));
  };
  return (
    expenses.length > 0 ? (
      <div className="expense-table-container">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(({ id, value, tag, currency, method, description, exchangeRates }: Expense) => {
              if (exchangeRates !== undefined) {
                return (
                  <tr key={id} className="expense-row">
                    <td>
                      {description}
                    </td>
                    <td>
                      {tag}
                    </td>
                    <td>
                      {method}
                    </td>
                    <td>
                      {Number(value).toLocaleString('pt-BR', {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td>
                      {exchangeRates[currency].name}
                    </td>
                    <td>
                      {Number(exchangeRates[currency].ask).toFixed(2)}
                    </td>
                    <td>
                      {(Number(value) * Number(exchangeRates[currency].ask)).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td>Real</td>
                    <td>
                      <button
                        data-testid="edit-btn"
                        onClick={(event) => handleEdit(event)}
                        className="edit-button"
                      >
                        Editar
                      </button>
                      <button
                        data-testid="delete-btn"
                        onClick={() => handleDelet(Number(id))}
                        className="delete-button"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
    ) : (
      null
    )
  );
}

export default Table;
