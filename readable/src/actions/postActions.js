import * as PostsAPI from '../api/PostsAPI'
import {FETCH_POSTS,ADD_POST,UPDATE_CURRENT_POST,UPDATE_POST,ISOPEN_POST,TOGGLE_SORT,POSTS_HAS_ERRORED} from './types'
import {default as UUID} from 'uuid'
import {setSortCol,setSortOrder,togglePostSortOrder,sortPosts,getSortCol,getSortOrder} from '../utils/helper'
import store from '../index.js'

export const fetchPosts = posts =>({
  type:FETCH_POSTS,
  posts
});

export const addPost = (post)=> ({
    type: ADD_POST,
    post

});

export const updateCurrentPost = (editPost) => ({
  type:UPDATE_CURRENT_POST,
  editPost
});

export const updatePost = (post)=>({
    type: UPDATE_POST,
    modifiedPost:post
});
export function openNewPostModal(isOpen){
  return {
    type:ISOPEN_POST,
    isOpen
  }
}
export const toggleSort = (sortOrderAsc,sortCol) =>({
  type:TOGGLE_SORT,
  sortOrderAsc,
  sortCol,

});

export function postsHasErrored(bool,id) {
  return {
      type: POSTS_HAS_ERRORED,
      hasErrored: bool,
      id
  };
}
/**
 * @description deletes a post
 * @param {string} id - postid.
 *
 */
export const onDeletePost = (id) => dispatch =>{
  PostsAPI.deletePost(id).then(post => {
    dispatch(itemsFetchPosts())
  })
  .catch((e) =>{
    console.error(e);
  });
}

/**
 * @description Adds/updates a comment to the store.If it is a new comment a UUID is generated
 *              for the id.
 * @param {object} post - post object that is submitted by the form.
 */
export const onAddPost = (post) => dispatch =>{
  var timestamp = Date.now();
  let id = post.id;
  if (post.id === "")
  {
   id = UUID.v4();
  PostsAPI.addPost(id,timestamp,post.title,post.body,post.author,post.Categories).then(post => {
  dispatch(postsHasErrored(false,id));
  dispatch(addPost(post))
   })
   .catch((e) =>{
     console.error(e);
     dispatch(postsHasErrored(true,id))
   });
 }
 else {
   PostsAPI.updatePost(post.id,timestamp,post.title,post.body).then(post => {
  dispatch(postsHasErrored(false,id));
   dispatch(updatePost(post))
 })
 .catch((e) =>{
   console.error(e);
   dispatch(postsHasErrored(true,id))
 });

}
}

/**
 * @description update the properties of the CurrentPost object. It is used to
 * populate the fields of the  New/Edit Post form.
 * @param {string} id - postid
 *
 */
export const editCurrentPost=(id) => dispatch =>{
  let mystore = store.getState();
  let editPost = mystore.Post.posts.filter((p)=> p.id === id);
  dispatch(updateCurrentPost(editPost[0]));
}
/**
 * @description update the votingScore of the post
 * @param {string} id - postid
 * @param {string} option - upVote/downVote
 */
export const updateVotingPost = (id,option) => dispatch =>{
  PostsAPI.votingPost(id,option).then(post => {
  let mystore = store.getState();
  let modifiedPosts = mystore.Post.posts.filter((p)=> p.id !== post.id);
    modifiedPosts.push(post);    ;
    modifiedPosts.sort(sortPosts);
    dispatch(fetchPosts(modifiedPosts))
   })
   .catch((e) => console.error(e));
    //.catch(() => dispatch(updatePostHasErrored(true)));
}

/**
* sorts the posts based on the property selected
* for the post.After the sorting dispatch an action to update the store.
*/

export const onSortPosts = (Col,posts) =>  dispatch => {
togglePostSortOrder(Col);
posts.sort(sortPosts);
dispatch(fetchPosts(posts));
const sortCol = getSortCol();
const sortOrder = getSortOrder();
let isAsc = true;
if (sortOrder === "asc")
   isAsc = true;
   else {
     isAsc = false;
   }
dispatch(toggleSort(isAsc,sortCol));
};

/**
* get all the posts from the server
*/
export const itemsFetchPosts = () =>  dispatch => {
   PostsAPI.getAllPosts()
  .then(data => {
    data.sort(sortPosts);
    dispatch(fetchPosts(data))
  })
  .catch((e) => console.error(e))

};
