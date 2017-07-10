import React, { Component } from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import debounce from 'lodash/debounce'
import { Link } from 'react-router-dom'
import Book from './Book'

/**
* Class representing Book Search
* @extends Component
*/
class SearchBooks extends Component {
  /**
  * @description  debounce is used to prevent the onChange method to fire
  * the API call everytime a  character is typed.With debounce the API call will
  * be fired when no characters are typed in for 1000 milliseconds.It is
  * initialized in the constructor so that there will be only one instance of
  * the method per component instance.
  */
  constructor(props){
    super(props);
    this.handleSearch = debounce(this.handleSearch,1000);
    //mounted variable keeps track of the component mounted state. we update the
    //state variable 'books' only if the component is mounted, otherwise ignored
    let mounted = false;
    let returnedResults = false;
  }

  state = {
    //it keeps track of the search results
    books:[]
  }
  /**
  * @description Search function for a book by title or authors
  * @param {string} query - the string user searches for.
  */
  handleSearch(query){
    this.setState({books:[]});
    if(query){
      BooksAPI.search(query,10).then((boks) => {
      if(!boks.error){
        this.returnedResults = true;
        this.updateShelfSearchList(boks);
      }
      else {
       this.returnedResults = false;
      }
      });
    }
  }

/**
 * @description The raw results from the search query does not have the correct
 * shelf info. So they are updated with correct shelf from the bookshelves
 * passed from App.js
 * @param {array} booklist - book list returned as results from search query.
 */
updateShelfSearchList(booklist){
  const bookShelves = this.props.bookShelves;
  // bk variable will store the books that are present in the bookshelves.
  let bk=[];
  //newbklist will store the books that are not present in any bookselves.
  let newbklist;
  bookShelves.map((bookshelf) =>{
    bookshelf.booklist.map((book,index) => {
    newbklist = booklist.filter((b) => b.id !== book.id);
      if (newbklist.length < booklist.length)
      {
        bk.push(book);
        booklist = newbklist;
      }
    })
  })
  if(this.mounted)
     this.setState({ books:bk.concat(booklist) });
}

 /**
 * @description:Updates the shelf of the book on shelf change
 */
  handleChange = (event) => {
    const  bklist = this.state.books;
    const bookid = event.target.id;
    const oldshelf = event.target.title;
    const newshelf = event.target.value;
    const  bk = bklist.filter((b) => b.id === bookid);
    BooksAPI.update(bk[0],newshelf).then(book => {
      book = bklist.filter((b) => b.id === bookid)[0];
      book.shelf = newshelf;
      this.props.onHandleChange(oldshelf,book);
      if(this.mounted)
       {
         this.setState({books:bklist});
       }
      }
    )
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount(){
    this.mounted = false;
  }


  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link  to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
                 onChange={(event) => this.handleSearch(event.target.value)}>
            </input>
          </div>
        </div>
        <div className="search-books-results">
          {this.state.books.length > 0 && (
          <ol  className="books-grid">
          { this.state.books.map((book) => (
            <li key={book.id}>
                 <Book item={book} onHandleChange={this.handleChange}></Book>
            </li>
          ))
          }
          </ol>
        )}
        {this.returnedResults === false && (
          <div className="no-records-title">No results returned from query</div>
         )}
        </div>
      </div>
    )
  }
}

export default SearchBooks
