import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ArticleType } from '../interface';

interface Props {
  article: ArticleType,
}

class Article extends Component<Props> {
  render() {
  return(
    <div className="article-smallad" key={this.props.article.id}>
      <Link to={`/articles/${this.props.article.id}`}>
        <div className="post-item">
          <h3>{this.props.article.title}</h3>
          <p>{this.props.article.content.substring(0, 100)}...</p>
        </div>
      </Link>
    </div>
    );
  }
}

export default Article;
