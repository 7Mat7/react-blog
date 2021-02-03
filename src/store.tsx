import { createStore, combineReducers, applyMiddleware } from "redux";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/saga";
import { composeWithDevTools } from "redux-devtools-extension";

import "./assets/stylesheets/application.scss";

import articlesReducer from "./reducers/articles_reducer";
import authorsReducer from "./reducers/authors_reducer";
import authorReducer from "./reducers/author_reducer";
import commentsReducer from "./reducers/comments_reducer";

import { reducer as formReducer } from "redux-form";
import { connectRouter, routerMiddleware } from "connected-react-router";
import logger from "redux-logger";

export const history = createBrowserHistory();

export const rootReducer = combineReducers({
  articles: articlesReducer,
  authors: authorsReducer,
  author: authorReducer,
  comments: commentsReducer,
  form: formReducer,
  router: connectRouter(history),
});

const sagaMiddleware = createSagaMiddleware();
const middlewares = composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware, logger));

export const store = createStore(rootReducer, middlewares);
sagaMiddleware.run(rootSaga);
