import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { fetchArticles } from '../actions/index';
import Article from '../components/article'

class ArticlesIndex extends Component {
  componentWillMount() {
    this.props.fetchArticles();
  }

  renderPosts() {
    return (
    this.props.articles.map((article) => {
          return (
            <Article article={article} key={article.id}/>
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
        <Link to="/authors" >Browse by Author</Link>
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
