  import * as ReadableAPI from '../ReadableAPI'
  import {default as UUID} from 'uuid'
  import {setSortCol,setSortOrder,togglePostSortOrder,sortPosts, sortComments,getSortCol,getSortOrder} from '../utils/helper'
  import store from '../index.js'
  export const FETCH_POSTS = 'FETCH_POSTS'
  export const FETCH_COMMENTS = 'FETCH_COMMENTS'
  export const NEW_COMMENT = 'NEW_COMMENT'
  export const ADD_POST = 'ADD_POST'
  export const EDIT_POST = 'EDIT_POST'
  export const DELETE_POST = 'DELETE_POST'
  export const ADD_COMMENT = 'ADD_COMMENT'
  export const EDIT_COMMENT = 'EDIT_COMMENT'
  export const DELETE_COMMENT = 'DELETE_COMMENT'
  export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
  export const CATEGORIES_HAS_ERRORED = 'CATEGORIES_HAS_ERRORED'
  export const POSTS_HAS_ERRORED = 'POSTS_HAS_ERRORED'
  export const GET_COMMENTS = 'GET_COMMENTS'
  export const ISOPEN_POST = 'ISOPEN_POST'
  export const HEADING_CLICKED = 'HEADING_CLICKED'
  export const TOGGLE_SORT = 'TOGGLE_SORT'
  export const ISOPEN_COMMENT = 'ISOPEN_COMMENT'
  export const UPDATE_CURRENT_COMMENT = 'UPDATE_CURRENT_COMMENT'
  export const UPDATE_CURRENT_POST = 'UPDATE_CURRENT_POST'
  export const UPDATE_POST = 'UPDATE_POST'
  export const UPDATE_COMMENT = 'UPDATE_COMMENT'

  export const fetchCategories = categories =>({
    type:FETCH_CATEGORIES,
    categories
  });

  export const fetchPosts = posts =>({
    type:FETCH_POSTS,
    posts
  });

  export const fetchComments = comments =>({
      type: FETCH_COMMENTS,
      comments
  });

  export const toggleSort = (sortOrderAsc,sortCol) =>({
    type:TOGGLE_SORT,
    sortOrderAsc,
    sortCol,

  });



  export const addPost = (post)=> ({
      type: ADD_POST,
      post

  });


  export const addComment = (comment) => ({
      type: ADD_COMMENT,
      comment
    });


  export const updateCurrentComment = (editComment) => ({
      type:UPDATE_CURRENT_COMMENT,
      editComment
    });
    export const clearCurrentComment = (comment) => ({
        type:NEW_COMMENT,
        comment
      });
  export const updateCurrentPost = (editPost) => ({
    type:UPDATE_CURRENT_POST,
    editPost
  });
  export const updateComment = (comment)=>({
      type: UPDATE_COMMENT,
      modifiedComment:comment
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

  export function openNewComment(isOpen){
    return {
      type:ISOPEN_COMMENT,
      isOpen
    }
  }
  // export function editComment ({ id,parentid,body,author,voteScore }) {
  //   return {
  //     type: ADD_COMMENT,
  //     id,
  //     parentid,
  //     body,
  //     author,
  //     voteScore
  //   }
  // }


    export function categoriesHasErrored(bool) {
      return {
          type: CATEGORIES_HAS_ERRORED,
          hasErrored: bool
      };
  }
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
    ReadableAPI.deletePost(id).then(post => {
      dispatch(itemsFetchPosts())
      //dispatch(updatePost(post))
    })
    .catch((e) =>{
      console.error(e);
    });
  }
  /**
   * @description deletes a comment
   * @param {string} id - commentid.
   *
   */
  export const onDeleteComment = (id) => dispatch =>{
    ReadableAPI.deleteComment(id).then(comment => {
      dispatch(updateComment(comment))
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
    ReadableAPI.addPost(id,timestamp,post.title,post.body,post.author,post.Categories).then(post => {
    dispatch(postsHasErrored(false,id));
    dispatch(addPost(post))
     })
     .catch((e) =>{
       console.error(e);
       dispatch(postsHasErrored(true,id))
     });
   }
   else {
     ReadableAPI.updatePost(post.id,timestamp,post.title,post.body).then(post => {
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
   * @description Adds/updates a comment to the store.If it is a new comment a UUID is generated
   *              for the id
   * @param {string} parentid - postid under which the comment is added.
   * @param {object} comment - comment object that is submitted by the form.
   */
  export const onAddComment = (parentId,comment) => dispatch =>{
    var timestamp = Date.now();
    let id = comment.id;
    if (comment.id === "")
    {
     id = UUID.v4();
    ReadableAPI.addComment(id,timestamp,comment.body,comment.author,parentId).then(comment => {
    dispatch(addComment(comment))
     })
     .catch((e) =>{
       console.error(e);
       //dispatch(postsHasErrored(true,id))
     });
   }
   else {
     ReadableAPI.updateComment(comment.id,timestamp,comment.author,comment.body).then(comment => {
    //dispatch(postsHasErrored(false,id));
     dispatch(updateComment(comment))
   })
   .catch((e) =>{
     console.error(e);
     //dispatch(postsHasErrored(true,id))
   });

  }
  }
  /**
   * @description update the properties of the CurrentComment object. It is used to
   * populate the fields of the  New/Edit Comments form.
   * @param {string} id - commentid
   *
   */
  export const editCurrentComment=(id) => dispatch =>{
    let mystore = store.getState();
    let editComment = mystore.Comments.comments.filter((c)=> c.id === id);
    dispatch(updateCurrentComment(editComment[0]));
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
    ReadableAPI.votingPost(id,option).then(post => {
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
   * @description sort the comments of a post
   * @param {string} sortCol - property on which to sort
   * @param {string} sortOrder - Ascending/Descending
   */
   export const sortPostComments =(sortCol,sortOrder)=> dispatch =>{
     let myCStore = store.getState();
     let mComments = myCStore.Comments.comments;
     setSortCol(sortCol,'comments');
     setSortOrder(sortOrder,'comments');
     mComments.sort(sortComments);
     dispatch(fetchComments(mComments))

   }
   /**
    * @description update the votingScore of the comment
    * @param {string} id - commentid
    * @param {string} option - upVote/downVote
    */
    export const updateVotingComment = (id,option) => dispatch =>{
      ReadableAPI.votingComment(id,option).then(comment => {
      let mystore = store.getState();
      let modifiedComments = mystore.Comments.comments.filter((c)=> c.id !== comment.id);
        modifiedComments.push(comment);
        //setSortCol('voteScore','comments');
        modifiedComments.sort(sortComments);
        dispatch(fetchComments(modifiedComments))
       })
       .catch((e) => console.error(e))
    }
    // export const openPostModal = (isOpen) => dispatch =>{
    //     dispatch(openNewPostModal(isOpen))
    // }
    /**
    * dispatches action to set the flag to false . This flag is used for showing/hiding
    * the form.
    */
    // export function closePostModal(){
    //   return (dispatch) =>{
    //     dispatch(openNewPostModal(false))
    //   }
    // }
    /**
    * dispatches action to clear the currentComment object and sets a flag which is used for showing
    * the modal comment form.The modal comment form is populated wiith properties of
    * the currentComment object.
    */
    export const openNewCommentModal = (postid,isOpen) => dispatch =>{
        dispatch(clearCurrentComment())
        dispatch(openNewComment(isOpen))
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
  * get all the categories from the server
  */

  export const itemsFetchCategory = () =>  dispatch => {
     ReadableAPI.getCategories()
    .then(categories => dispatch(fetchCategories(categories)))
    .catch((e) => console.error(e))

  };
  /**
  * get all the posts from the server
  */
  export const itemsFetchPosts = () =>  dispatch => {
     ReadableAPI.getAllPosts()
    .then(data => {
      //setSortCol('voteScore');
      data.sort(sortPosts);
      dispatch(fetchPosts(data))
    })
    .catch((e) => console.error(e))

  };
  /**
  * get all the comments for a post from the server
  */
  export const itemsFetchComments = (postId) =>  dispatch => {
     ReadableAPI.getAllComments(postId)
    .then(data => {
      //setSortCol('voteScore');
      data.sort(sortComments);
      dispatch(fetchComments(data))
    })
    .catch((e) => console.error(e))

  };
