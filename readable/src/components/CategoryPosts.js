import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Category from './Category';
//import NewPost from './NewPost';
import { connect } from 'react-redux';
import { itemsFetchCategory,itemsFetchPosts,onSortPosts  } from '../actions';
//import Modal from 'react-modal';
import { Modal,Button } from 'react-bootstrap'
import sortAsc from '../icons/sortAsc.png'
import sortDesc from '../icons/sortDesc.png'
//import { withRouter } from 'react-router-dom';


/**
 * Class representing List of Books
 * @extends Component
 */
class CategoryPosts extends Component {

  componentWillReceiveProps(nextProps) {
      //console.log(nextProps);
      this.props.fetchPosts();
    }
  // componentDidMount(){
  //   this.props.fetchCategories();
  //   this.props.fetchPosts();
  // }

   sortCol =({col})=>{
    //console.log("clicked"+ col);
    //sortCol = col;
   //this.props.sortPosts(this.props.sortcol,col,this.props.sortOrderAsc,this.props.posts);
   this.props.sortPosts(col,this.props.posts);


  }
  convertToUpper(name){
    return name.toUpperCase();
  }

  render() {
      const {categoryName,postcols} = this.props;
      return(

        <div>
              <div><h3>{this.convertToUpper(categoryName)}</h3></div>
              <div>
              <table className="moduleSection"><thead className="headerSection"><tr><th/>{
              postcols.map((col,i) => {
                 return (
                   <th key={i} onClick={()=>this.sortCol({col})}><button>{col}</button>
                   {this.props.sortCol === col && this.props.sortOrderAsc === true &&  <img src={sortAsc} width={25} height={25} mode='fit'/>}
                   {this.props.sortCol === col && this.props.sortOrderAsc === false && <img src={sortDesc} width={25} height={25} mode='fit'/>}
                   </th>
                 );
               })
             }
               </tr>
               </thead>
               <Category  categoryObj={categoryName} ></Category>


                </table>

              </div>




            </div>
          )}


}
const mapStateToProps = (state,ownProps) => {
  //console.log(state.Category.categories);
    return {
        categoryName:ownProps.match.params.category,
        postcols:state.Settings.postCols,
        posts: state.Post.posts,
        sortOrderAsc:state.Settings.sortOrderAsc,
        sortCol:state.Settings.sortCol,

    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        fetchCategories: () => dispatch(itemsFetchCategory()),
        //closePost:() => dispatch(openPostModal(false)),
        fetchPosts: () => dispatch(itemsFetchPosts()),
        // headingClick:(col) => dispatch(onHeadingClick(col)),
        sortPosts:(fld,posts) => dispatch(onSortPosts(fld,posts))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CategoryPosts);
