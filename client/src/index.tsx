import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'antd/dist/antd.min.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
