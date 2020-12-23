import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';

import { fetchArticle, fetchArticles, deleteArticle } from '../actions';
import CommentsIndex from '../containers/comments_index';
import CommentsNew from '../containers/comments_new';

class ArticlesShow extends Component {
  componentDidMount() {
    if (!this.props.article) {
      this.props.fetchArticle(`/api/articles/${this.props.match.params.id}`);
    }
  }

  handleClick = () => {
    this.props.deleteArticle(this.props.article, () => {
      this.props.history.push('/articles');
    });
  }

  renderIfAuthor = () => {
    if (this.props.article.author["@id"] === `/api/authors/${this.props.author.id}`) {
      return (
        <div>
          <button className="btn btn-primary btn-cta" style={{margin: "12px"}} onClick={this.handleClick}>
            Delete
          </button>
            <Link className="btn btn-primary btn-cta" style={{margin: "12px"}} to={`/articles/${this.props.article.id}/update`} key="sthing else">
              Update
            </Link>
        </div>
      )
    }
  }

  render () {
    const article = this.props.article;
    if (!article) {
      return (
          <Link to="/articles" key="sthing else">Back to list</Link>
        );
    }
    return (
      <div>
        <div className="post-item">
          <h3>{article.title}</h3>
          <p>{article.content}</p>
          <p>by {article.author.firstname} {article.author.lastname}</p>
          {this.renderIfAuthor()}
        </div>
        <Link to="/articles">
          Back
        </Link>
        <div>
          <CommentsNew article={this.props.article} />
          <CommentsIndex id={this.props.article.id}/>
        </div>
      </div>

    );
  }
};

function mapStateToProps(state, ownProps) {
  const idFromUrl = parseInt(ownProps.match.params.id, 10);
  return ({
    article: state.articles.find(c => c.id === idFromUrl),
    author: state.author
    });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchArticle, fetchArticles, deleteArticle }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticlesShow));
