import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { bindActionCreators } from 'redux';

import { createComment } from '../actions/index';

class CommentsNew extends Component {
  onSubmit = (values) => {
    const postId = this.props.article.id;
    Object.assign(values, {article: `/api/articles/${postId}`});
    this.props.createComment(values, postId);
  }

  render() {
    return (
      <div key="add" className="form-container" style={{marginTop: "24px"}}>
        <div className="overlay"></div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="form-group">
            <Field name="content" type="text" placeholder="Your comment" component="input" className="form-control" autoFocus />
          </div>
          <button type="submit">Add a comment</button>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createComment }, dispatch);
}

export default reduxForm({ form: 'newCommentForm' })(connect(null, mapDispatchToProps)(CommentsNew));
