import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import { requestCreateComment } from "../actions/index";
import { ArticleType } from "../interface";

interface Props {
  requestCreateComment: (values: string, postId: number) => AnyAction;
  article: ArticleType;
}

class CommentsNew extends React.Component<InjectedFormProps<ArticleType, Props> & Props> {
  onSubmit = (values: any) => {
    const postId = this.props.article.id;
    Object.assign(values, { article: `/api/articles/${postId}` });
    this.props.requestCreateComment(values, postId);
  };

  render() {
    return (
      <div key="add" className="form-container" style={{ marginTop: "24px" }}>
        <div className="overlay"></div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="form-group">
            <Field
              name="content"
              type="text"
              placeholder="Your comment"
              component="input"
              className="form-control"
              autoFocus
            />
          </div>
          <button className="btn btn-primary btn-cta" type="submit">
            Add a comment
          </button>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({ requestCreateComment }, dispatch);
}

export default reduxForm<ArticleType, Props>({ form: "newCommentForm" })(
  connect(null, mapDispatchToProps)(CommentsNew),
);
