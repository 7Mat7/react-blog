import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import ArticlesIndex from "./containers/articles_index";
import ArticlesShow from "./containers/articles_show";
import ArticlesNew from "./containers/articles_new";
import ArticlesUpdate from "./containers/articles_update";

import AuthorsIndex from "./containers/authors_index";

import Home from "./containers/home";

import "./assets/stylesheets/application.scss";

import { ConnectedRouter } from "connected-react-router";
import { store } from "./store";

export const history = createBrowserHistory();

// render an instance of the component in the DOM
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/articles" exact component={ArticlesIndex} />
        <Route path="/authors" exact component={AuthorsIndex} />
        <Route path="/articles/new" exact component={ArticlesNew} />
        <Route path="/articles/:id/update" exact component={ArticlesUpdate} />
        <Route path="/articles/:id" component={ArticlesShow} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root"),
);
