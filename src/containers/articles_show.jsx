import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';

import { fetchArticle, deleteArticle } from '../actions';
import Aside from '../components/aside';

class ArticlesShow extends Component {
  componentDidMount() {
    if (!this.props.article.id) {
      this.props.fetchArticle(`/api/articles/${this.props.match.params.id}`);
    }
  }

  handleClick = () => {
    this.props.deleteArticle(this.props.article, () => {
      this.props.history.push('/articles');
    });
  }

  renderAuthor = () => {
    if (this.props.article.author["@id"] === `/api/authors/${this.props.author.id}`) {
      return (
        <div>
          <button className="delete" onClick={this.handleClick}>
            <i className="fa fa-trash-o" aria-hidden="true"></i>
            Delete
          </button>
            <Link to={`/articles/${this.props.article.id}/update`} key="sthing else"> Update </Link>
        </div>
      )
    }
  }

  render () {
    const article = this.props.article;
    if (!article) {
      return (
        // <Aside key="aside" >
          <Link to="/articles" key="sthing else">Back to list</Link>
        // </Aside>
        );
    }
    return [
      // <Aside key="aside" >
        <Link to="/articles" key="hey">Back to list</Link>
      // </Aside>
      ,
      <div className="article-container" key="article">
        <div className="article-article">
          <div className="article-details">
            <span>{article.title} - {article.content}</span>
          </div>

          {this.renderAuthor()}

        </div>
      </div>
    ];
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
  return bindActionCreators({ fetchArticle, deleteArticle }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticlesShow));
