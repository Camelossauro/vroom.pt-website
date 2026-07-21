// Defensive cleanup for common localStorage corruption in some environments
if (typeof window !== 'undefined' && window.localStorage) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && localStorage.getItem(key) === 'undefined') {
      localStorage.removeItem(key);
    }
  }
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
