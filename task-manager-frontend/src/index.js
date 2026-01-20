import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/reset.css';
import { ConfigProvider, theme, App as AntdApp } from 'antd';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';

function AppWrapper() {
  return (
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
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
