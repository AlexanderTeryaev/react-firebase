import React from 'react';
import ReactDOM from 'react-dom';
import store from './services/store';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

ReactDOM.render(
  <Provider store = {store}>
    <App />
    <ReduxToastr position="top-right" />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
