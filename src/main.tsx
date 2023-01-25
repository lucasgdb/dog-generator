import 'react-toastify/dist/ReactToastify.min.css';
import './styles/global.css';

import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import App from './App';

const root = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(root).render(
  <>
    <App />
    <ToastContainer theme="dark" />
  </>
);
