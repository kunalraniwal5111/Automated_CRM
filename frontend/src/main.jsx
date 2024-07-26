import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { ApolloProvider, client } from './ApolloClient.js';
import AppRoutes from './Routes.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <AppRoutes/>
  </ApolloProvider>
)
