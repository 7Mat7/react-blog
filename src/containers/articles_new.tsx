import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';
import { AnyAction, bindActionCreators } from 'redux';
import { History } from 'history';

import { createArticle } from '../actions/index';
import { ArticleType, AuthorType } from '../interface';

interface Props {
  author: AuthorType;
  history: History;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  createArticle: (body: string, callback: any) => AnyAction;
}

class ArticlesNew extends Component<InjectedFormProps<ArticleType, Props>& Props> {
  onSubmit = (values) => {
    Object.assign(values, {author: `/api/authors/${this.props.author.id}`});
    this.props.createArticle(values, (article) => {
      this.props.history.push('/articles'); // Navigate after submit
      return article;
    });
  }

  render() {
    if(this.props.author === null) {
      return <Redirect to='/'/>
    }
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
            <Field name="content" type="textarea" placeholder="great content" component="textarea" className="form-control" />
          </div>
          <button className="btn btn-primary btn-cta" type="submit">Add an article</button>
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


function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({ createArticle }, dispatch);
}

export default reduxForm({ form: 'newPostForm' })(connect(mapStateToProps, mapDispatchToProps)(ArticlesNew));
