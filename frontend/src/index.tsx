import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { client } from 'src/apollo/client';
import App from 'src/App';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
); 