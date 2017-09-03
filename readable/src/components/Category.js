import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemsFetchPosts } from '../actions';
import { Link,withRouter } from 'react-router-dom';
import {  Button, ButtonToolbar } from 'react-bootstrap'
import Post_Comments_Toolbar from './Post_Comments_Toolbar'


/**
 * Class representing a category with its posts
 * @extends Component
 */
class Category extends Component {

convertToUpper(name){
  return name.toUpperCase();
}
componentDidMount(){
  this.props.posts === null?this.props.itemsFetchPosts():null;
}

getTime = timestamp =>{
  let d = new Date(timestamp);
  return d.toDateString();
}
  render() {
    const category = this.props.categoryObj;
    const {posts,postcols, type} = this.props;
   let filteredposts = null;
     if(posts)
        filteredposts = posts.filter((post)=> post.deleted === false);

return(
  <tbody>
        { type === "multiple" &&  <tr><td><div>  <Link to={{pathname:`/${category}`}}><h4>{this.convertToUpper(category)}</h4></Link></div></td></tr>}
          {
          filteredposts && filteredposts.map((post) =>{
            if (post.category === category){
            return(
              <tr key={post.id}><td>
              <Post_Comments_Toolbar type='post' id={post.id} from='category'/>

              </td>{
               postcols && postcols.map((col,i) => {
                  if (col === "id"){
                    return(
                    <td key={i}>
                    <Link to={{pathname:`/${category}/${post[col]}`}}>  {String(post[col])} </Link>
                      </td>
                    )
                  }
                  else if (col === "timestamp"){
                    return (<td key={i}>
                      {this.getTime(post[col])}
                      </td>)
                  }
                  else{
                    return (
                  <td key={i}>
                    {String(post[col])}
                    </td>

                  )
                  }

                })
              }
              </tr>

            )}
          })

          }
          </tbody>
        )

        }

    }


  const mapStateToProps = (state) => {    
      return {
          posts: state.Post.posts,
          postcols:state.Settings.postCols,
      };
  };

export default withRouter(connect(mapStateToProps,{itemsFetchPosts})(Category));
