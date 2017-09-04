import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Category from './Category';
import { connect } from 'react-redux';
import { itemsFetchCategory,itemsFetchPosts,onSortPosts  } from '../actions';
import { Modal,Button } from 'react-bootstrap'
import sortAsc from '../icons/sortAsc.png'
import sortDesc from '../icons/sortDesc.png'
import NotFound from './NotFound'


/**
 * Class representing a Category with its posts
 * @extends Component
 */
class CategoryPosts extends Component {


  componentWillMount(){
    this.props.Category_o === null?this.props.itemsFetchCategory():null;
  }
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
      const {categoryName,postcols,Category_o} = this.props;
      let  filteredcategories = Category_o && Category_o.filter((category)=> category.name === categoryName);
      const numberofcat = filteredcategories && filteredcategories.length;
      return(

        <div>
          {numberofcat === 0 ?<NotFound/>:
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

          }
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
        Category_o: state.Category.categories,

    }
}

export default connect(mapStateToProps,{itemsFetchPosts,onSortPosts,itemsFetchCategory})(CategoryPosts);
