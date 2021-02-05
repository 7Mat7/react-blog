import React from "react";
import { ArticleType, CommentType, State } from "../interface";
import { requestComments } from "../actions/index";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

interface Props {
  article: ArticleType;
  requestComments: (data: any) => AnyAction;
  comments: CommentType[] | null;
}

class CommentsIndex extends React.Component<Props> {
  componentDidMount() {
    this.props.requestComments(this.props.article.id.toString());
  }

  render(): JSX.Element | undefined {
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
