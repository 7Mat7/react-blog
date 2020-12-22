import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { fetchComments } from '../actions/index';

class CommentsIndex extends Component {
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
