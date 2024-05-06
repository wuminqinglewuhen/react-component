import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './pages/index.jsx';
import 'antd/dist/antd.css';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootElement
);
 
// 如果你使用的是Webpack和react-hot-loader，以下代码用于HMR
if (module.hot) {
  module.hot.accept('./pages/index.jsx', () => {
    const NextApp = require('./pages/index.jsx').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      rootElement
    );
  });
}