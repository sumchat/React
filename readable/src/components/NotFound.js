
import React, { Component } from 'react'
import { connect } from 'react-redux';
/**
 * Class representing a Page Not Found
 * @extends Component
 */
class NotFound extends Component {


  render() {

      return(
        <div>
          <div className="Jumbotron">
            <h1 className="error">We're sorry but the page you're looking for could not be found</h1>
          </div>
        </div>
      )
  }
}

export default connect(null)(NotFound);
