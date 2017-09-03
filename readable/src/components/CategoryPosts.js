import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Category from './Category';
import { connect } from 'react-redux';
import { itemsFetchCategory,itemsFetchPosts,onSortPosts  } from '../actions';
import { Modal,Button } from 'react-bootstrap'
import sortAsc from '../icons/sortAsc.png'
import sortDesc from '../icons/sortDesc.png'



/**
 * Class representing a Category with its posts
 * @extends Component
 */
class CategoryPosts extends Component {

  componentWillReceiveProps(nextProps) {
      //console.log(nextProps);
      this.props.itemsFetchPosts();
    }


   sortCol =({col})=>{
   this.props.onSortPosts(col,this.props.posts);

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

    return {
        categoryName:ownProps.match.params.category,
        postcols:state.Settings.postCols,
        posts: state.Post.posts,
        sortOrderAsc:state.Settings.sortOrderAsc,
        sortCol:state.Settings.sortCol,

    }
}

export default connect(mapStateToProps,{itemsFetchPosts,onSortPosts})(CategoryPosts);
