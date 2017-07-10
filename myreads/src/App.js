import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'
/**
 * Here we compose 2 custom components ListBooks and SearchBooks
 * which in turn are composed of subComponents.
*/
class BooksApp extends React.Component {

  state = {
    // bookshelves variable stores the different bookshelf objects like read,
    // wanttoread etc.Each bookshelf has a booklist which contains books in that
    // bookshelf.
    bookShelves:[]
  }

  /**
   * @description update the shelf of the book
   * @param {string} bookold - the book whose shelf needs to be updated
   * @param {string} shelf - the new shelf of the book
   */
  updateShelf(bookold,shelf) {
    BooksAPI.update(bookold,shelf).then(book => {
    const oldShelf = bookold.shelf;
    bookold.shelf = shelf;
    this.updateClientShelf(oldShelf,bookold);
     })
  }

/**
 * @description get the book from the booklist of the old bookShelf and push it
 * in the booklist of the target bookshelf
 * @param {string} book - the book with updated shelf
 * @param {string} oldShelf - the old shelf of the book
 */
 updateClientShelf(oldShelf,book){
   let newbookshelves = this.state.bookShelves;
   const bookshelf1 = newbookshelves.filter((b) => b.id === oldShelf);
   if(bookshelf1[0]){
     const bks1 = bookshelf1[0].booklist.filter((bk) => bk.id !== book.id);
     bookshelf1[0].booklist = bks1
   }
   const bookshelf2 = newbookshelves.filter((b) => b.id === book.shelf);
   if (bookshelf2[0]){
     bookshelf2[0].booklist.push(book);
   }
   this.setState({ bookShelves:newbookshelves });
  }

/**
 * @description update the shelf of the book in the bookshelf onChange
 */
 handleChange = (event) => {
   const shelf = event.target.title;
   const bkid = event.target.id;
   let bookshelf = this.state.bookShelves.filter((b) => b.id === shelf);
   if(bookshelf[0])
     {
       const bk = bookshelf[0].booklist.filter((book) => book.id === bkid);
       this.updateShelf(bk[0],event.target.value);
     }
  }


 createEmptyBookshelf(shelf,displayName){
    let newBookShelf = {
       id:shelf,
       booklist:[],
       displayname:displayName
     };
     return newBookShelf;
   }

 addEmptyBookShelves(){
    let bkShelves = [];
    bkShelves.push(this.createEmptyBookshelf('currentlyReading','Currently Reading'))
    bkShelves.push(this.createEmptyBookshelf('wantToRead','Want To Read'))
    bkShelves.push(this.createEmptyBookshelf('read','Read'))
    return bkShelves;
    }
 /**
  * @description  arrange the books in bookshelves.
  * @param {array} books - list of all books
  */
  arrangeShelf(books){
    let bkShelves = this.addEmptyBookShelves();//this.state.bookShelves;
    for(const book of books)
      {
        let bookshelf =  bkShelves.filter((bshelf) => bshelf.id === book.shelf);
        if(bookshelf.length > 0)
          {
            bookshelf[0].booklist.push(book);
          }
      }
          this.setState({bookShelves:bkShelves});
    }


  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        this.arrangeShelf(books);
      })
  }

  render() {
    return (
      <div>
         <Route exact path='/' render={() => (
           <ListBooks bookShelves={this.state.bookShelves}
             onHandleChange={this.handleChange}/>
         )}/>
         <Route path='/search' render={() => (
           <SearchBooks bookShelves={this.state.bookShelves}
             onHandleChange={(oldShelf,book) => this.updateClientShelf(oldShelf,book) }/>
          )}/>
      </div>
        )}

    }


export default BooksApp
