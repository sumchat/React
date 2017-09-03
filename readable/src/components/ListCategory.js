import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Category from './Category';
import { connect } from 'react-redux';
import { itemsFetchCategory,openPostModal,itemsFetchPosts,onSortPosts  } from '../actions';
import { Modal,Button } from 'react-bootstrap'
import {setSortCol,setSortOrder,togglePostSortOrder,sortPosts, sortComments,} from '../utils/helper'
import sortAsc from '../icons/sortAsc.png'
import sortDesc from '../icons/sortDesc.png'

/**
 * Class representing List of Categories and posts
 * @extends Component
 */
class ListCategories extends Component {

  componentWillReceiveProps(nextProps) {
      this.props.itemsFetchPosts();
  	}

   sortCol =({col})=>{

   this.props.onSortPosts(col,this.props.posts);
  }


  render() {
      const {Category_o,postcols} = this.props;
      return(

        <div>
              <div>
              <table className="moduleSection"><thead className="headerSection"><tr><th>Category</th>{
              postcols && postcols.map((col,i) => {
                 return (
                   <th key={i} onClick={()=>this.sortCol({col})}><button>{col}</button>
                   {this.props.sortedCol === col && this.props.sortOrderAsc === true &&  <img src={sortAsc} width={25} height={25} mode='fit'/>}
                   {this.props.sortedCol === col && this.props.sortOrderAsc === false && <img src={sortDesc} width={25} height={25} mode='fit'/>}
                   </th>
                 );
               })
             }
               </tr>
               </thead>

                {
                  Category_o &&  Category_o.map((categ) =>{
                     return (
                       <Category key={categ.name} categoryObj={categ.name} type = "multiple"
                                              ></Category>

                            );
                        })
                }

                </table>

              </div>




            </div>
          )}

}
const mapStateToProps = (state) => {
    return {
        Category_o: state.Category.categories,
        postcols:state.Settings.postCols,
        posts: state.Post.posts,
        sortOrderAsc:state.Settings.sortOrderAsc,
        sortedCol:state.Settings.sortCol,
    }
}


export default connect(mapStateToProps,{itemsFetchPosts,onSortPosts})(ListCategories);
