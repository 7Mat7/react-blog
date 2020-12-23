import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { fetchAuthors, fetchArticles } from '../actions/index';
import Article from '../components/article';

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
          <Article article={article} key={article.id} />
        );
      })
    );
  }

  render() {
    if (this.props.authors.length === 0) {
      return [
      <div key="firstrow" className="first-row">
          <h3>Blog</h3>
          <Link to="/articles">Back</Link>
          </div>
        ,
        <div className="no-article" key="noauthor">No authors yet</div>
      ];
    }
    return [
    <div key="top">
    <div className="first-row">
          <h3>Blog</h3>
        <Link to="/articles" key="sthing">Back</Link>
    </div>
      ,
      <div className="list-container" key="authors">
        {this.props.authors.map((author) => {
          return (
            <div key={author.id} className="author-smallad" key={author.id}>
              <div className="post-item">
                <h2><strong>{author.firstname} {author.lastname} </strong></h2>
                  {this.handleLoad(author)}
              </div>
            </div>
          );})
        }
      </div>
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
