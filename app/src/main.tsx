import ReactDOM from 'react-dom/client';
import { App } from './App';
import { StrictMode } from 'react';
import './styles/reset.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
