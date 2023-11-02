/* eslint-disable react/jsx-curly-spacing */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateEmail } from '../redux/actions/index';
import '../style/login.css';

const INITIAL_STATE = {
  email: '',
  password: '',
};

function Login() {
  const [inputValue, setInputValue] = useState(INITIAL_STATE);
  const { email, password } = inputValue;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate('/carteira');
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  }

  function isValid(): boolean {
    return (/^[\d\w]{1,20}@[\w]{1,10}.com$/i.test(email) && password.length > 5);
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-label">
          <img src="https://uploaddeimagens.com.br/images/004/654/341/full/bit-coin.jpg?1698937071" alt="bit-coins" className="login-img" />
          <form onSubmit={handleSubmit} className="login-form">
            <h1 className="login-h1">Inicie a Sessão</h1>
            <input
              type="email"
              data-testid="email-input"
              onChange={(event) => handleChange(event)}
              className="login-input"
              name="email"
              placeholder="Email"
            />
            <input
              type="password"
              data-testid="password-input"
              onChange={(event) => handleChange(event)}
              className="login-input"
              name="password"
              placeholder="Senha"
            />
            <button
              onClick={() => dispatch(updateEmail(inputValue))}
              data-testid="login-submit-btn"
              className={`login-button ${isValid() ? 'active' : 'disabled'}`}
              disabled={!isValid()}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
