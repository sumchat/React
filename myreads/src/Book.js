import React, { Component } from 'react'

/**
 * Class representing a Book
 * @extends Component
 */
class Book extends Component {


  render() {
    const bok = this.props.item;
    const onHandleChange = this.props.onHandleChange;
      return(
        <div className="book">
          <div className="book-top">
            {bok.imageLinks !== undefined && (
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bok.imageLinks.thumbnail})` }}></div>
            )}
            {bok.imageLinks === undefined && (
              <div className="book-cover" style={{ width: 128, height: 193, backgroundColor:"#81b71a" }}></div>
             )}
            <div className="book-shelf-changer">
              <select value={bok.shelf} title={bok.shelf} id={bok.id} onChange={onHandleChange}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{bok.title}</div>
          <div className="book-authors">{bok.authors}</div>
        </div>
      )
  }
}

export default Book
