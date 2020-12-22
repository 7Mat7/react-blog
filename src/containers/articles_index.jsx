import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { fetchArticles } from '../actions/index';
import Aside from '../components/aside';

class ArticlesIndex extends Component {
  componentWillMount() {
    this.props.fetchArticles();
    // this.props.fetchAuthors();

  }

  render() {
    if (this.props.articles.length === 0) {
      return [
        // <Aside key="aside">
          <Link to="/articles/new">Write an article</Link>
        // </Aside>
        ,
        <div className="no-article" key="noarticle">No article yet</div>
      ];
    }
    return [
      // <Aside key="aside">
        <Link to="/articles/new" key="sthing">Add an article</Link>
      // </Aside>
      ,
      <div className="list-container" key="articles">
        {this.props.articles.map((article) => {
          return (
            <div key={article.id} className="article-smallad" key={article.id}>
              <Link to={`/articles/${article.id}`}  > Read </Link>
              <div className="article-details">
                <span>{article.title} - {article.content} </span>
                <strong>Author: </strong> {article.author['lastname']}
              </div>
            </div>
          );
        })}
      </div>
    ];
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
