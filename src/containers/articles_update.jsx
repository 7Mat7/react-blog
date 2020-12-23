import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createArticle } from '../actions/index';
import { Link } from 'react-router-dom';
import { fetchAuthors, fetchArticle, updateArticle } from '../actions/index';
import { bindActionCreators } from 'redux';

class ArticlesUpdate extends Component {
  componentDidMount() {
    if (!this.props.article.id) {
      this.props.fetchArticle(`/api/articles/${this.props.match.params.id}`);
    }
  }

  onSubmit = (values) => {
    const id = this.props.article.id;
    Object.assign(values, {author: `/api/authors/${this.props.author.id}`});
    this.props.updateArticle(values, id, (article) => {
      this.props.history.push('/articles'); // Navigate after submit
      return article;
    });
  }

  render() {
    return (
      <div key="add" className="form-container">
        <div className="overlay"></div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="form-group">
            <label htmlFor="InputBrand">Title</label>
            <Field name="title" type="text" placeholder={this.props.article.title} component="input" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="InputModel">Content</label>
            <Field name="content" type="textarea" placeholder={this.props.article.content} component="textarea" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary btn-cta">edit your article</button>
        </form>
        <Link to="/articles">
            Back
          </Link>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const idFromUrl = parseInt(ownProps.match.params.id, 10);
  return ({
    article: state.articles.find(c => c.id === idFromUrl),
    author: state.author
    });
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchArticle, updateArticle }, dispatch);
}

export default reduxForm({ form: 'updatePostForm' })(connect(mapStateToProps, mapDispatchToProps)(ArticlesUpdate));