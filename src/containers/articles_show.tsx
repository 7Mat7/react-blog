import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { Link, Redirect, match } from "react-router-dom";
import { history } from "../index";

import { requestArticle, requestArticles, articleDeleteRequest, requestCreateComment } from "../actions/index";
import CommentsIndex from "./comments_index";
import CommentsNew from "./comments_new";
import { ArticleType, AuthorType, State } from "../interface";

interface Props extends ownProps {
  article: ArticleType | undefined;
  requestArticle: (url: string) => AnyAction;
  articleDeleteRequest: (article: ArticleType, callback: () => void) => AnyAction;
  author: AuthorType | null;
}

interface ownProps {
  match: match<{ id: string }>;
}

class ArticlesShow extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.article) {
      this.props.requestArticle(`/api/articles/${this.props.match.params.id}`);
    }
  }

  handleClick = () => {
    if (this.props.article) {
      this.props.articleDeleteRequest(this.props.article, () => {
        history.push("/articles");
      });
    }
  };

  renderIfAuthor = () => {
    if (
      this.props.article
      && this.props.author
      && this.props.article.author["@id"] === `/api/authors/${this.props.author.id}`
    ) {
      return (
        <div>
          <button className="btn btn-primary btn-cta" style={{ margin: "12px" }} onClick={this.handleClick}>
            Delete
          </button>
          <Link
            className="btn btn-primary btn-cta"
            style={{ margin: "12px" }}
            to={`/articles/${this.props.article.id}/update`}
            key="sthing else"
          >
            Update
          </Link>
        </div>
      );
    }
  };

  render() {
    if (this.props.author === null) {
      return <Redirect to="/" />;
    }
    const article = this.props.article;
    if (!article || !this.props.article) {
      return (
        <Link to="/articles" key="sthing else">
          Back to list
        </Link>
      );
    }
    return (
      <div>
        <div className="post-item">
          <h3>{article.title}</h3>
          <p>{article.content}</p>
          <p>
            by {article.author.firstname} {article.author.lastname}
          </p>
          {this.renderIfAuthor()}
        </div>
        <Link to="/articles">Back</Link>
        <div>
          <CommentsNew article={this.props.article} requestCreateComment={requestCreateComment} />
          <CommentsIndex article={this.props.article} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: State, ownProps: ownProps) {
  const idFromUrl = parseInt(ownProps.match.params.id, 10);
  return {
    article: state.articles.find((c) => c.id === idFromUrl),
    author: state.author,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({ requestArticle, requestArticles, articleDeleteRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesShow);
