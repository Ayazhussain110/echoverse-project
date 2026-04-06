import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';  // <-- use HashRouter instead
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import App from './App';
import './styles/index.css';
import './styles/themes.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
        <Toaster position="top-right" />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);