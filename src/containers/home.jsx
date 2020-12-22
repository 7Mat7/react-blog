import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createArticle } from '../actions/index';
import { Link } from 'react-router-dom';
import { fetchAuthors, setAuthor, createAuthor } from '../actions/index';
import { bindActionCreators } from 'redux';

import Aside from '../components/aside';

class Home extends Component {
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
      <div key="add" className="form-container" style={{ backgroundImage: "url('/assets/images/form.jpg')"}}>
        <div className="overlay"></div>

        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="form-group">
            <label htmlFor="InputFirstName">first name</label>
            <Field name="firstname" type="text" placeholder="Your first name" component="input" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="InputLastName">last name</label>
            <Field name="lastname" type="text" placeholder="great content" component="input" className="form-control" />
          </div>
          <button type="submit">Browse our blog !</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return ({
    authors: state.authors,
    author: state.author
  });
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchAuthors, setAuthor, createAuthor }, dispatch);
}

export default reduxForm({ form: 'homeForm' })(connect(mapStateToProps, mapDispatchToProps)(Home));
