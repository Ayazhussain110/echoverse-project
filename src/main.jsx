import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import App from './App';
import './styles/main.css';
import './styles/variables.css'
import themeService from './services/themeService';

// Initialize theme from localStorage or default
const savedUniversity = localStorage.getItem('universityTheme');
if (savedUniversity) {
  themeService.applyTheme(savedUniversity);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster position="top-right" />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);