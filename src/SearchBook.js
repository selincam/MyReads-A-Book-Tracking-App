import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class SearchBook extends Component {
    constructor(e) {
        super(e);
        this.state = {
            searchResults: []
        }
    }

    componentDidMount() {
        BooksAPI.getAll().then(allBooks => {
            this.setState({
            booksOnDisplay: allBooks.filter(book => book.shelf !== 'none')
        })})
    }

    search = (j) => {
        var query = j.target.value;
        if (!query) {
            this.setState({searchResults: []});
            return;
        }
        BooksAPI.search(query, 20).then(searchResults => {
            if (searchResults.error) {
                searchResults = [];
            }
            searchResults = searchResults.map((book) => {
                var bookInShelf = this.props.books.find(i => i.id === book.id);
                if (bookInShelf) {
                    book.shelf = bookInShelf.shelf;
                }
                return book;
            });
            this.setState({searchResults});
        });
    };

    render() {
        var updateShelf = this.props.updateShelf
        return (
            <div className = "search-books">
                <div className = "search-books-bar">
                    <Link className = "close-search" to = "/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by book title or book author" onChange={this.search}/>
                    </div>
                </div>
                <div className = "search-books-results">
                    <ol className = "books-grid">
                        {this.state.searchResults && this.state.searchResults.map(book => (
                            <li key = {book.id}>
                                <Book book = {book} updateShelf = {updateShelf}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}


export default SearchBook