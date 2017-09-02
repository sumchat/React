import React, { Component } from 'react';
 import { BrowserRouter as Router, Route } from 'react-router-dom';
 import ListCategories from './ListCategory';
 import Category from './Category';
 import CategoryPosts from './CategoryPosts';
 import PostDetail from './PostDetail';
 import CreateEditPost from './CreateEditPost';
 import { connect } from 'react-redux';
 import { itemsFetchCategory,itemsFetchPosts  } from '../actions';
 import {Navbar,Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap'

 import '../App.css';

 class App extends Component {
   componentDidMount(){
     this.props.fetchCategories();
     this.props.fetchPosts();
   }
   render() {
     return (
       <div className="App">
       <Navbar>
     <Navbar.Header>
       <Navbar.Brand>
         READABLE
       </Navbar.Brand>
     </Navbar.Header>
     <Nav>
       <NavItem eventKey={1} href="/"><span className="navlink">Home</span></NavItem>
       <NavItem eventKey={2} href="/posts/createEditPost"><span className="navlink">Add Post</span></NavItem>

       <NavDropdown eventKey={3} title="Categories" id="basic-nav-dropdown">
         <MenuItem eventKey={3.1} href="/react">React</MenuItem>
         <MenuItem eventKey={3.2} href="/redux">Redux</MenuItem>
         <MenuItem eventKey={3.3} href="/udacity">Udacity</MenuItem>
       </NavDropdown>

     </Nav>
   </Navbar>

        <Router>
        <div>
        <Route exact path='/'  component={ListCategories}/>
        <Route exact path='/:category'  component={CategoryPosts} />
        <Route path='/:category/:id' component={PostDetail}/>
        <Route exact path='/posts/createEditPost'  component={CreateEditPost} />
        </div>
        </Router>
        </div>

     );
   }

   }
   const mapDispatchToProps = (dispatch) => {
       return {
           fetchCategories: () => dispatch(itemsFetchCategory()),
           fetchPosts: () => dispatch(itemsFetchPosts())
         }
       }

 export default connect(null,mapDispatchToProps)(App);
