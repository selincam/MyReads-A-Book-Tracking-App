import React, { Component } from "react";
import { Route } from "react-router-dom";
// import * as BooksAPI from './BooksAPI'
import *as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelfList from "./BookShelfList";
import SearchBook from "./SearchBook";

export default class BooksApp extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      loading: true,
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books, loading: false })
    })
  };

  addOrEditTheShelfOfTheBook(book, shelf) {
    let currentBooks = this.state.books;
    currentBooks = currentBooks.filter(aBook => aBook.id !== book.id);
    book.shelf = shelf;
    currentBooks.push(book);

    this.setState({books: currentBooks, loading:false})
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(result => {
        this.addOrEditTheShelfOfTheBook(book, shelf);
      })
  };

  render() {
    const { books, loading } = this.state;
    const currentlyReading = books.filter(book => book.shelf === "currentlyReading");
    const wantToRead = books.filter(book => book.shelf === "wantToRead");
    const read = books.filter(book => book.shelf === "read");
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            {!loading ? (
              <BookShelfList
                currentlyReading={currentlyReading}
                wantToRead={wantToRead}
                read={read}
                updateShelf={this.updateShelf} />) : (
                <div className="loader" />)}
          </div>)} />
        <Route path="/search" render={({ history }) => (
          <SearchBook
            updateShelf={this.updateShelf}
            history={history}
            books={currentlyReading.concat(wantToRead, read)} />)} />
      </div>)
  }
}
