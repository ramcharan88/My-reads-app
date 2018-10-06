import React, {Component} from 'react';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';
import {Link} from 'react-router-dom';

class SearchPage extends Component{
//upto
  state = {
    query:'',
    searchedBooks :[]
  }
  updateQuery = (query) => {
    this.setState({
      query: query
    })
    this.updateSearchedBooks(query);
  }
  updateSearchedBooks = (query) => {
    if(query){
      BooksAPI.search(query).then((searchedBooks) =>{
        if(searchedBooks.error){
          this.setState({searchedBooks: [] }); 
        }
        else{
          this.setState({ searchedBooks: searchedBooks})
        }
        
      })
    } else {
      this.setState({searchedBooks: [] });
    }
  }
    render(){
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link 
              to="/"
              className="close-search">Close </Link>
              
              <div className="search-books-input-wrapper">               
                <input 
                type="text" placeholder="Search by title or author"
                value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}
                />              
                </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {
                this.state.searchedBooks.map(searchedBook => {
                  return (
                    <li key={searchedBook.id}>
                    <Book 
                    book ={searchedBook}
                    moveShelf={this.props.moveShelf}
                    />
                    </li>
                  )
                }
                  
                )
              }
              
              </ol>
            </div>
          </div>
        );
    }
}

export default SearchPage;
