import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import client from "../apollo.js"
import { ApolloProvider } from '@apollo/client/react'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
)
