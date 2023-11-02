/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { useSelector } from 'react-redux';
import '../style/header.css';

function Header() {
  const email = useSelector((state: any) => state.user.email);
  const expenses = useSelector((state: any) => state.wallet.expenses);

  function totalExpenses() {
    const initialTotal = 0;
    const total = expenses.reduce((accumulator: number, element: any) => {
      const { currency } = element;
      const value = element.value * element.exchangeRates[currency].ask;
      return accumulator + value;
    }, initialTotal);
    return total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  }

  return (
    <div className="header-container">
      <header>
        <div className="header-flex-container">
          <div className="email-container">
            <span data-testid="email-field">{email}</span>
          </div>
          <div className="expenses-container">
            <h3>
              Despesa total:
              <span data-testid="total-field">{` ${totalExpenses()}`}</span>
            </h3>
          </div>
          <div className="currency-container">
            <h3>
              Moeda:
              <span data-testid="header-currency-field"> BRL</span>
            </h3>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
