import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'

/**
 * Class representing List of Books
 * @extends Component
 */
class ListBooks extends Component {

  render() {
    const bookShelves = this.props.bookShelves;
    const handleChange = this.props.onHandleChange;
      return(
        <div>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {
                  bookShelves.map((bookshelf) =>{
                    return(
                      <Bookshelf key={bookshelf.id} bshelf={bookshelf}
                        onHandleChange={handleChange}></Bookshelf>
                    )
                  })
                }
              </div>
            </div>
            <div className="open-search">
              <Link  to='/search'>Add a Book</Link>
            </div>
          </div>
        </div>
      )
  }
}

export default ListBooks
