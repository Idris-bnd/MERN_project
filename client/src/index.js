import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import { Provider } from 'react-redux';

import store from './store/store';
import { getUsers } from './actions/users.actions';
import { getPosts } from './actions/post.actions';

store.dispatch(getUsers());
store.dispatch(getPosts());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
