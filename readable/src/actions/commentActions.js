import * as CommentsAPI from '../api/CommentsAPI'
import {FETCH_COMMENTS,ADD_COMMENT,UPDATE_CURRENT_COMMENT,NEW_COMMENT,UPDATE_COMMENT,ISOPEN_COMMENT,} from './types'
import {default as UUID} from 'uuid'
import {setSortCol,setSortOrder,getSortCol,sortComments,getSortOrder} from '../utils/helper'
import store from '../index.js'

export const fetchComments = comments =>({
    type: FETCH_COMMENTS,
    comments
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

export const updateComment = (comment)=>({
    type: UPDATE_COMMENT,
    modifiedComment:comment
});


export function openNewComment(isOpen){
  return {
    type:ISOPEN_COMMENT,
    isOpen
  }
}
/**
 * @description deletes a comment
 * @param {string} id - commentid.
 *
 */
export const onDeleteComment = (id) => dispatch =>{
  CommentsAPI.deleteComment(id).then(comment => {
    dispatch(updateComment(comment))
  })
  .catch((e) =>{
    console.error(e);
  });
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
  CommentsAPI.addComment(id,timestamp,comment.body,comment.author,parentId).then(comment => {
  dispatch(addComment(comment))
   })
   .catch((e) =>{
     console.error(e);
     //dispatch(postsHasErrored(true,id))
   });
 }
 else {
   CommentsAPI.updateComment(comment.id,timestamp,comment.author,comment.body).then(comment => {
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
    CommentsAPI.votingComment(id,option).then(comment => {
    let mystore = store.getState();
    let modifiedComments = mystore.Comments.comments.filter((c)=> c.id !== comment.id);
      modifiedComments.push(comment);
      //setSortCol('voteScore','comments');
      modifiedComments.sort(sortComments);
      dispatch(fetchComments(modifiedComments))
     })
     .catch((e) => console.error(e))
  }

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
* get all the comments for a post from the server
*/
export const itemsFetchComments = (postId) =>  dispatch => {
   CommentsAPI.getAllComments(postId)
  .then(data => {
    data.sort(sortComments);
    dispatch(fetchComments(data))
  })
  .catch((e) => console.error(e))

};
