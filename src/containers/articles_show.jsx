import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';

import { fetchArticle, deleteArticle } from '../actions';
import CommentsIndex from '../containers/comments_index';
import CommentsNew from '../containers/comments_new';

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
          <button style={{margin: "12px"}} onClick={this.handleClick}>
            Delete
          </button>
            <Link to={`/articles/${this.props.article.id}/update`} key="sthing else">
              <button>
              Update
              </button>
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
          {this.renderAuthor()}
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
  return bindActionCreators({ fetchArticle, deleteArticle }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticlesShow));
