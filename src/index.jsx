import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createHistory as history } from 'history';

import ArticlesIndex from './containers/articles_index';
import ArticlesShow from './containers/articles_show';
import ArticlesNew from './containers/articles_new';
import '../assets/stylesheets/application.scss';

import ArticlesReducer from './reducers/articles_reducer';
import { reducer as formReducer } from 'redux-form';

const initialState = {
  articles: [],
  author: 'mat'
};

const reducers = combineReducers({
  // key: reducer
  author: (state = null, action) => state,
  articles: articlesReducer,
  form: formReducer
});

const middlewares = applyMiddleware(reduxPromise, logger);

// render an instance of the component in the DOM
ReactDOM.render(
  <Provider store={createStore(reducers, initialState, middlewares)}>
    <Router history={history}>
      <Switch>
        <Route path="/articles" exact component={ArticlesIndex} />
          <Route path="/articles/new" exact component={ArticlesNew} />
          <Route path="/articles/:id" component={ArticlesShow} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
