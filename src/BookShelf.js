import React, { Component } from "react";
import Book from "./Book.js";

class BookShelf extends Component {
    state = {}
    render() {
        var title = this.props.shelfTitle
        var updateShelf = this.props.updateShelf
        return (
            <div className = "bookshelf">
                <h2 className = "bookshelf-title">{title}</h2>
                <div className = "bookshelf-books">
                    <ol className = "books-grid">
                        {this.props.bookList.map((book) => {
                            return <li key = {book.id}>
                                <Book book = {book} updateShelf = {updateShelf}/>
                                </li>
                            })}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf