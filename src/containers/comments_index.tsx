import React, { Component } from 'react';
import { AnyAction, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchComments } from '../actions/index';
import { CommentType } from '../interface';

interface Props {
  id: number;
  fetchComments: (id: number) => AnyAction;
  comments: CommentType[];
}

class CommentsIndex extends Component<Props> {
  componentDidMount() {
    this.props.fetchComments(this.props.id);
  }

  render() {
    return (
      <div style={{marginTop: "24px"}}>
        {this.props.comments.map((comment) => {
          return(
            <div className="post-item" key={comment.id}>
              {comment.content}
            </div>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return ({
    comments: state.comments,
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchComments }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsIndex);
