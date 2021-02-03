import React from "react";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import { requestComments } from "../actions/index";
import { CommentType, State } from "../interface";

interface Props {
  id: number;
  requestComments: (id: number) => AnyAction;
  comments: CommentType[] | null;
}

class CommentsIndex extends React.Component<Props> {
  componentDidMount() {
    this.props.requestComments(this.props.id);
  }

  render() {
    if (this.props.comments) {
      return (
        <div style={{ marginTop: "24px" }} key="unikey">
          {this.props.comments.map((comment) => {
            return (
              <div className="post-item" key={comment.id}>
                {comment.content}
              </div>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  }
}

function mapStateToProps(state: State) {
  return {
    comments: state.comments,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({ requestComments }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsIndex);
