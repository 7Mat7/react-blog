import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createArticle } from '../actions/index';
import { Link } from 'react-router-dom';
import { fetchAuthors } from '../actions/index';
import { bindActionCreators } from 'redux';

import Aside from '../components/aside';

class ArticlesNew extends Component {

  onSubmit = (values) => {
    Object.assign(values, {author: `/api/authors/${this.props.author.id}`});
    console.log(values);
    this.props.createArticle(values, (article) => {
      this.props.history.push('/articles'); // Navigate after submit
      return article;
    });
  }

  render() {
    return [
      <Aside key="aside">
        <Link to="/articles">Back to list</Link>
      </Aside>,
      <div key="add" className="form-container" style={{ backgroundImage: "url('/assets/images/form.jpg')"}}>
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
      </div>
    ];
  }
}

function mapStateToProps(state) {
  return ({ author: state.author });
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createArticle }, dispatch);
}

export default reduxForm({ form: 'newPostForm' })(connect(mapStateToProps, mapDispatchToProps)(ArticlesNew));
