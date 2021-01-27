import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { AnyAction, bindActionCreators } from 'redux';

import { fetchArticles } from '../actions/index';
import Article from '../components/article';
import { ArticleType, AuthorType } from '../interface';

interface Props {
  articles: ArticleType[];
  fetchArticles: () => AnyAction;
  author: AuthorType;
}

class ArticlesIndex extends Component<Props> {
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
    if(this.props.author === null) {
      return <Redirect to='/'/>
    }
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
    author: state.author
  });
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({ fetchArticles }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesIndex);
