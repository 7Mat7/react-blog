import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Article extends Component {
  render() {
  return(
    <div className="article-smallad" key={this.props.article.id}>
      <Link to={`/articles/${this.props.article.id}`}>
        <div className="post-item">
          <h3>{this.props.article.title}</h3>
          <p>{this.props.article.content}</p>
        </div>
      </Link>
    </div>
    );
  }
}

export default Article;
