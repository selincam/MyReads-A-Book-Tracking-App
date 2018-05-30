import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf.js";

class BookShelfList extends Component {
    state = {
        allBooks: []
    };

    render() {
        return (
            <div className = "list-books">
                <div className = "list-books-content">
                    <div>
                        <BookShelf shelfTitle = "Currently Reading" bookList = {this.props.currentlyReading}
                                   updateShelf = {this.props.updateShelf}/>
                        <BookShelf shelfTitle = "Want to Read" bookList = {this.props.wantToRead}
                                   updateShelf = {this.props.updateShelf}/>
                        <BookShelf shelfTitle = "Read" bookList = {this.props.read}
                                   updateShelf = {this.props.updateShelf}/>
                    </div>
                </div>
                <div className = "open-search">
                    <Link to="/search">Search book to add:</Link>
                </div>
            </div>);
        }};

export default BookShelfList