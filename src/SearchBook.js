import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class SearchBook extends Component {
  constructor(e) {
    super(e);
    this.state = {
      searchResults: [],
    }
  }

  search = (j) => {
    var query = j.target.value;
    let searchResults = [];
    if (query) {
      BooksAPI.search(query, 20)
        .then(results => {
          if(results && results.constructor === Array) {
            searchResults = results.map((book) => {
              let bookInShelf = this.props.books.find(i => i.id === book.id);
              if (bookInShelf) {
                book.shelf = bookInShelf.shelf;
              }
              return book;
            });
          }
          this.setState({searchResults});
        })
        .catch(error => {
          this.setState({searchResults: []});
        });
    } else {
      setTimeout(() => this.setState({searchResults: []}), 200);
      
    }
  };

  render() {
    const { updateShelf } = this.props;
    return (
      <div className = "search-books">
        <div className = "search-books-bar">
          <Link className = "close-search" to = "/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by book title or book author" onChange={this.search} />
          </div>
        </div>
        <div className = "search-books-results">
          <ol className = "books-grid">
            {this.state.searchResults && this.state.searchResults.map(book => (
              <li key={book.id}>
                <Book book={book} updateShelf={updateShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  };
}

export default SearchBook