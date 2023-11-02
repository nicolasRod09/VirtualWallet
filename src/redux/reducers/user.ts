// import user from './user';
// import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

type UserProps = {
  type: string;
  payload: {
    email: string;
    password?: string;
  };
};

const INITIAL_STATE = {
  email: '',
  password: '',
};

const user = (state = INITIAL_STATE, action: UserProps) => {
  switch (action.type) {
    case 'STORE_USER':
      return {
        ...state,
        email: action.payload.email,
      };
    default:
      return state;
  }
};

export default user;
