import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, InjectedFormProps, FormSubmitHandler } from "redux-form";
import { history } from "../index";
import { requestAuthors, setAuthor, authorCreateRequest } from "../actions/index";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { AuthorType, State } from "../interface";

interface Props {
  requestAuthors: () => AnyAction;
  authors: AuthorType[] | undefined;
  setAuthor: (arg: AuthorType) => AnyAction;
  authorCreateRequest: typeof authorCreateRequest;
}

class Home extends React.Component<InjectedFormProps<AuthorType, Props> & Props> {
  componentDidMount() {
    this.props.requestAuthors();
  }

  onSubmit = (values: Partial<AuthorType>): AuthorType => {
    let author = null;
    if (this.props.authors) {
      author = this.props.authors.find((author) => {
        return author.firstname === values.firstname && author.lastname === values.lastname;
      });
    }
    if (author) {
      this.props.setAuthor(author);
      history.push("/articles"); // Navigate after submit
      return author;
    } else {
      const { payload } = this.props.authorCreateRequest(values, (author) => {
        this.props.setAuthor(author);
        return author;
      });
      return payload;
    }
  };

  render() {
    return (
      <div>
        <div className="first-row">
          <div className="container">
            <h1>
              Discover <strong>{"Mateo's"} </strong>blog for <strong>Elinoï !</strong>
            </h1>
            <p>Get some really interesting content :)</p>
          </div>
        </div>

        <div className="container">
          <div key="add" className="form-container">
            <div className="overlay">
              <h2>Log in to discover</h2>
            </div>

            <form
              onSubmit={this.props.handleSubmit(
                (this.onSubmit as unknown) as FormSubmitHandler<AuthorType, Props, string>,
              )}
            >
              <div className="form-group">
                <label htmlFor="InputFirstName">first name</label>
                <Field
                  name="firstname"
                  type="text"
                  placeholder="Your first name"
                  component="input"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="InputLastName">last name</label>
                <Field name="lastname" type="text" placeholder="last name" component="input" className="form-control" />
              </div>
              <button className="btn btn-primary btn-cta" type="submit">
                Browse our blog !
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: State) {
  return {
    authors: state.authors,
    author: state.author,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({ requestAuthors, setAuthor, authorCreateRequest }, dispatch);
}

export default reduxForm<AuthorType, Props>({ form: "homeForm" })(connect(mapStateToProps, mapDispatchToProps)(Home));
