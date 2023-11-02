import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import { fetchApi } from '../components/API/fetchApi';
import { Dispatch } from '../types';

function Wallet() {
  const dispatch: Dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchApi());
  }, [dispatch]);
  return (
    <div>
      <Header />
      <WalletForm />
      <Table />
    </div>
  );
}

export default Wallet;
