import React from "react";
import { Route } from "react-router-dom";
// import * as BooksAPI from './BooksAPI'
import *as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelfList from "./BookShelfList";
import SearchBook from "./SearchBook";

export default class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  books: [],
  loading: true,
  };
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books: books, loading: false})
    })
  };

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(this.setState((state) => ({
      books: state.books.map(e => {
        if (e.title === book.title) {
          e.shelf = shelf;
          return e
        } else {
          return e
        }
      }),
      loading: false
    })))
  };

  render() {
    var state = this.state;
    var currentlyReading = state.books.filter((book) => book.shelf === "currentlyReading")
    var wantToRead = state.books.filter((book) => book.shelf === "wantToRead")
    var read = state.books.filter((book) => book.shelf === "read")
    return (
      <div className = "app">
        <Route exact path = "/" render={() => (
          <div>
            <div className = "list-books-title">
              <h1>MyReads</h1>
            </div>
            {!state.loading ? (
              <BookShelfList
                currentlyReading={currentlyReading}
                wantToRead = {wantToRead}
                read = {read}
                updateShelf = {this.updateShelf}/>) :(
                  <div className = "loader"/>)}
          </div>)}/>
        <Route path = "/search" render = {({history}) => (
          <SearchBook
            updateShelf = {this.updateShelf}
            history = {history}
            books = {currentlyReading.concat(wantToRead, read)}/>)}/>
      </div>)}}
