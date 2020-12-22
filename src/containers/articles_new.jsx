import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { fetchAuthors } from '../actions/index';
import { createArticle } from '../actions/index';

class ArticlesNew extends Component {
  onSubmit = (values) => {
    Object.assign(values, {author: `/api/authors/${this.props.author.id}`});
    this.props.createArticle(values, (article) => {
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
            <Field name="title" type="text" placeholder="Your article title" component="input" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="InputModel">Content</label>
            <Field name="content" type="textarea" placeholder="great content" component="input" className="form-control" />
          </div>
          <button type="submit">Add an article</button>
        </form>
        <Link to="/articles">
            Back
          </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return ({ author: state.author });
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createArticle }, dispatch);
}

export default reduxForm({ form: 'newPostForm' })(connect(mapStateToProps, mapDispatchToProps)(ArticlesNew));
