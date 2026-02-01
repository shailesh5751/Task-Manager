import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from './graphql/client';
import 'antd/dist/reset.css';
import { ConfigProvider, theme, App as AntdApp } from 'antd';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';

function AppWrapper() {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ darkMode }) => (
            <ConfigProvider
              theme={{
                algorithm: darkMode
                  ? theme.darkAlgorithm
                  : theme.defaultAlgorithm,
              }}
            >
              <AntdApp>
                <App />
              </AntdApp>
            </ConfigProvider>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    </ApolloProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <AppWrapper />
    </ApolloProvider>
  </React.StrictMode>
);
