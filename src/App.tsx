import React from 'react';

import { useAppDispatch } from './store/hooks';
import { fetchProductInfo } from './store/productsSlice';
import './App.css';
import { useEffect } from 'react';
import SalesTable from './components/table/Table';
import SalesGraph from './components/graph/SalesGraph';
import Header from './components/header/Header';
import ProductDisplay from './components/product-display/ProductDisplay';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductInfo());
  }, []);

  return (
    <>
      <Header />
      <div className="content-container">
        <ProductDisplay />
        <div className="right-container">
          <SalesGraph />
          <SalesTable />
        </div>
      </div>
    </>
  );
}

export default App;
