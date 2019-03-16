import React, { Component } from "react";
import axios from "axios";

import { connect } from "react-redux";
import * as actionCreators from "../src/store/actions/index";

// Components
import BookTable from "./BookTable";
import Loading from "./Loading";

class AuthorDetail extends Component {
  componentDidMount() {
    this.props.getAuthorDetail(this.props.match.params.authorID);
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.match.params.authorID !== this.props.match.params.authorID) {
  //     this.getAuthorDetail(this.props.match.params.authorID);
  //   }
  // }

  render() {
    if (this.props.loading) {
      return <Loading />;
    } else {
      const author = this.props.author;
      const authorName = `${author.first_name} ${author.last_name}`;
      return (
        <div className="author">
          <div>
            <h3>{authorName}</h3>
            <img
              src={author.imageUrl}
              className="img-thumbnail img-fluid"
              alt={authorName}
            />
          </div>
          <BookTable books={author.books} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    author: state.rootAuthor.author,
    loading: state.rootAuthor.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAuthorDetail: authorId =>
      dispatch(actionCreators.fetchAuthorDetail(authorId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorDetail);
