import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { History } from 'history';
import { fetchAuthors, setAuthor, createAuthor } from '../actions/index';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { AuthorType, State } from '../interface';
import { withCookies } from 'react-cookie';

interface Props {
  fetchAuthors: () => AnyAction;
  authors: AuthorType[];
  setAuthor: (AuthorType) => AnyAction;
  createAuthor: (values: string, callback: any) => AnyAction;
  history: History;
  handleSubmit: any;
}

class Home extends Component<Props> {
  componentWillMount() {
    this.props.fetchAuthors();
  }

  onSubmit = (values) => {
    const author = this.props.authors.find((author) => {
        return (author.firstname === values.firstname
          && author.lastname === values.lastname);
      })

    if (author) {
      this.props.setAuthor(author);
      this.props.history.push('/articles'); // Navigate after submit

      return author;
    } else {
      this.props.createAuthor(values, (author) => {
        this.props.history.push('/articles'); // Navigate after submit
        this.props.setAuthor(author)
        return author;
      })
    }
  }

  render() {
    return (
      <div>
        <div className="first-row">
          <div className="container">
          <h1>Discover <strong>Mateo's </strong>blog for <strong>Elinoï !</strong></h1>
          <p>Get some really intersting content :)</p>
        </div>
      </div>


      <div className="container">
        <div key="add" className="form-container" >
          <div className="overlay">
          <h2>Log in to discover</h2>
          </div>

          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <div className="form-group">
              <label htmlFor="InputFirstName">first name</label>
              <Field name="firstname" type="text" placeholder="Your first name" component="input" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="InputLastName">last name</label>
              <Field name="lastname" type="text" placeholder="last name" component="input" className="form-control" />
            </div>
            <button className="btn btn-primary btn-cta" type="submit">Browse our blog !</button>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state: State) {
  return ({
    authors: state.authors,
    author: state.author
  });
}


function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({ fetchAuthors, setAuthor, createAuthor }, dispatch);
}

export default reduxForm({ form: 'homeForm' })(connect(mapStateToProps, mapDispatchToProps)(Home));
