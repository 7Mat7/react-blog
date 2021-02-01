import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, InjectedFormProps, FormSubmitHandler } from "redux-form";
import { history } from "../index";
import { fetchAuthors, setAuthor, createAuthor } from "../actions/index";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { AuthorType, State } from "../interface";

interface Props {
  fetchAuthors: () => AnyAction;
  authors: AuthorType[] | undefined;
  setAuthor: (arg: AuthorType) => AnyAction;
  createAuthor: typeof createAuthor;
}

class Home extends React.Component<InjectedFormProps<AuthorType, Props> & Props> {
  componentDidMount() {
    this.props.fetchAuthors();
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
      console.log("Set the author");
      console.log(author);
      return author;
    } else {
      const { payload } = this.props.createAuthor(values, (author) => {
        this.props.setAuthor(author);
        history.push("/articles"); // Navigate after submit
        return author;
      });
      console.log("I'm the author");
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
            <p>Get some really intersting content :)</p>
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
  return bindActionCreators({ fetchAuthors, setAuthor, createAuthor }, dispatch);
}

export default reduxForm<AuthorType, Props>({ form: "homeForm" })(connect(mapStateToProps, mapDispatchToProps)(Home));
