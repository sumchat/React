import React, { Component } from 'react'
import Book from './Book'

/**
 * Class representing Bookshelf
 * @extends Component
 */
class Bookshelf extends Component {


  render() {
    const bshelf = this.props.bshelf;
    const onChange = this.props.onHandleChange;
      return(
        <div key={bshelf.id}>
        {bshelf.id !== 'none' && (
          <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{bshelf.displayname}</h2>
          </div>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {
                bshelf.booklist.map((book) => (
                <li key={book.id}>
                  <Book item={book} onHandleChange={onChange}></Book>
                </li>
               ))
              }
            </ol>
          </div>
          </div>
        )}
        </div>
      )
  }
}

export default Bookshelf
