import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { fetchArticles } from '../actions/index';

class ArticlesIndex extends Component {
  componentWillMount() {
    this.props.fetchArticles();
  }

  renderPosts() {
    return (
    this.props.articles.map((article) => {
          return (
            <div key={article.id} className="article-smallad" key={article.id}>
              <Link to={`/articles/${article.id}`}>
                <div className="post-item">
                  <h3>{article.title}</h3>
                  <p>{article.content}</p>
                </div>
              </Link>
            </div>
          );
        })
    );
  }

  render() {
    return (
      <div>
        <div className="first-row">
          <h3>Blog</h3>
          <Link className="btn btn-primary btn-cta" to="/articles/new">
            Let's write a post!
          </Link>
        </div>
        {this.renderPosts().reverse()}
      </div>
    );
  }
};

function mapStateToProps(state) {
  return ({
    articles: state.articles,
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchArticles }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesIndex);
