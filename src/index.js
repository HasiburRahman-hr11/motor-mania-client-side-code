import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthContextProvider from './Context/AuthContext/AuthContext';
import ProductContextProvider from './Context/ProductContext/ProductContext';
import OrderContextProvider from './Context/OrderContext/OrderContext';
import ReviewContextProvider from './Context/ReviewContext/ReviewContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductContextProvider>
        <OrderContextProvider>
          <ReviewContextProvider>
            <App />
          </ReviewContextProvider>
        </OrderContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
