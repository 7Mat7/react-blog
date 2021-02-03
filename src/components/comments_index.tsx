import React from "react";
import { ArticleType } from "../interface";

interface Props {
  article: ArticleType;
}

class CommentsIndex extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <div style={{ marginTop: "24px" }} key="unikey">
        {this.props.article.comments.map((comment) => {
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

export default CommentsIndex;
