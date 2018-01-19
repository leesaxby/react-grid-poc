import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import store from './store';
import { App } from './App';

import './theme.css';

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider locale={navigator.language}>
            <App />
        </IntlProvider>
    </Provider>,
    document.getElementById('root')
);

