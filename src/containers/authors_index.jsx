import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { fetchAuthors, fetchArticles } from '../actions/index';

class AuthorsIndex extends Component {
  componentWillMount() {
    this.props.fetchAuthors();
    this.props.fetchArticles();
  }

  handleLoad = (author) => {
    const articles = this.props.articles.filter(article => {
      return (article['author']['@id'] === `/api/authors/${author.id}`);
      });
    return (
      articles.map((article) => {
        return (
          <ul>
            <Link to={`/articles/${article.id}`}>{article.title} </Link>
          </ul>
        );
      })
    );
  }

  render() {
    if (this.props.authors.length === 0) {
      return [
          <Link to="/articles">Back</Link>
        ,
        <div className="no-article" key="noarticle">No authors yet</div>
      ];
    }
    return [
        <Link to="/articles" key="sthing">Back</Link>
      ,
      <div className="list-container" key="authors">
        {this.props.authors.map((author) => {
          return (
            <div key={author.id} className="author-smallad" key={author.id}>
              <div className="article-details">
                <span>{author.firstname} - {author.lastname} </span>
                  {this.handleLoad(author)}
              </div>
            </div>
          );})
        }
      </div>
    ];
  }
};

function mapStateToProps(state) {
  return ({
    authors: state.authors,
    articles: state.articles
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchAuthors, fetchArticles }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsIndex);
