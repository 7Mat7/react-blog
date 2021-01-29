import { Component } from 'react';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { fetchComments } from '../actions/index';
import { CommentType, State } from '../interface';

interface Props {
  id: number;
  fetchComments: (id: number) => AnyAction;
  comments: CommentType[];
}

class CommentsIndex extends Component<Props> {
  componentDidMount() {
    const test = this.props.fetchComments(this.props.id);
    console.log(test);
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

function mapStateToProps(state: State) {
  return ({
    comments: state.comments,
  });
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({ fetchComments }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsIndex);
