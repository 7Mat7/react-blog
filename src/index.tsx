import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, Reducer } from 'redux';
import reduxPromise from 'redux-promise';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createHistory as history } from 'history';
import { CookiesProvider } from 'react-cookie'

import ArticlesIndex from './containers/articles_index';
import ArticlesShow from './containers/articles_show';
import ArticlesNew from './containers/articles_new';
import ArticlesUpdate from './containers/articles_update';

import AuthorsIndex from './containers/authors_index';

import Home from './containers/home';

import '../assets/stylesheets/application.scss';

import articlesReducer from './reducers/articles_reducer';
import authorsReducer from './reducers/authors_reducer';
import authorReducer from './reducers/author_reducer';
import commentsReducer from './reducers/comments_reducer';

import { reducer as formReducer } from 'redux-form';
import { State } from './interface';

const initialState = {
  articles: [],
  authors: [],
  author: null,
  comments: []
};

const reducers: Reducer<State> = combineReducers({
  articles: articlesReducer,
  authors: authorsReducer,
  author: authorReducer,
  comments: commentsReducer,
  form: formReducer
});

const middlewares = applyMiddleware(reduxPromise, logger);

// render an instance of the component in the DOM
ReactDOM.render(
  <CookiesProvider>
    <Provider store={createStore(reducers, initialState, middlewares)}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/articles" exact component={ArticlesIndex} />
          <Route path="/authors" exact component={AuthorsIndex} />
          <Route path="/articles/new" exact component={ArticlesNew} />
          <Route path="/articles/:id/update" exact component={ArticlesUpdate} />
          <Route path="/articles/:id" component={ArticlesShow} />
        </Switch>
      </Router>
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
);
