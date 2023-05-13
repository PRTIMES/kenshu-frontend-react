import { App } from './App';
import { createRoot } from 'react-dom/client';
import '@/styles/reset.css';

const root = document.getElementById('root');
if (root === null) throw new Error('Root element not found');

createRoot(root).render(<App />);
