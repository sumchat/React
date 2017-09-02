  import { combineReducers } from 'redux'
  import { reducer as formReducers } from 'redux-form';
  import {setSortCol,setSortOrder,togglePostSortOrder,sortPosts, sortComments,} from '../utils/helper'

  import {
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    ADD_COMMENT,
    EDIT_COMMENT,
    NEW_COMMENT,
    DELETE_COMMENT,
    FETCH_CATEGORIES,
    FETCH_POSTS,
    CATEGORIES_HAS_ERRORED,
    POSTS_HAS_ERRORED,
    FETCH_COMMENTS,
    TOGGLE_SORT,
    ISOPEN_POST,
    ISOPEN_COMMENT,
    UPDATE_CURRENT_POST,
    UPDATE_POST,
    UPDATE_CURRENT_COMMENT,
    UPDATE_COMMENT

  } from '../actions'

  const initialState = {
    'categories':[],
    'posts':[],
    'comments':[],
    'currentPost':{
      "id":"",
      "title":"",
      "body":"",
      "author":"",
      "category":"",
      "voteScore":"",
    },
    'currentComment':{
      "id":"",
      "body":"",
      "author":"",
      "timestamp":"",
      "parentId":"",
      "voteScore":"",
    },

    'Settings':{
      'postCols':['id','timestamp','title','author','voteScore'],
      'sortOrderAsc':false,
      'sortCol':"voteScore",
      'isPostOpen':false,
      'isCommentOpen':false,
      'hasPostErrorred':false,
      'hasCommentErrored':false,
      'editPostId':"",

    }
  }

  function CurrentComment(state=initialState["currentComment"],action){
    switch (action.type){
      case UPDATE_CURRENT_COMMENT:
      return {
      ["id"]:action.editComment.id,
      ["body"]:action.editComment.body,
      ["author"]:action.editComment.author,
      ["timestamp"]:action.editComment.timestamp,
      }
      case NEW_COMMENT:
      return {
      ["id"]:"",
      ["body"]:"",
      ["author"]:"",
      ["timestamp"]:"",
      ["parentId"]:"",
      ["voteScore"]:"",
    }
      default:
      return state;
    }


  }


  function CurrentPost(state=initialState["currentPost"],action){
    switch (action.type){
      case UPDATE_CURRENT_POST:
         return {
           "id":action.editPost.id,
           "title":action.editPost.title,
           "body":action.editPost.body,
           "author":action.editPost.author,
           "category":action.editPost.category,

         }

      default:
      return state;
    }


  }

  function Settings(state=initialState["Settings"],action){
    switch (action.type){
      case TOGGLE_SORT:
      return{
         ...state,
          ["sortOrderAsc"] : action.sortOrderAsc,
          ["sortCol"] : action.sortCol
        }
      case ISOPEN_POST:
      return{
        ...state,
        ["isPostOpen"]:action.isOpen
      }
      case ISOPEN_COMMENT:
      return{
        ...state,
        ["isCommentOpen"]:action.isOpen
      }
      case POSTS_HAS_ERRORED:
      return {
         ...state,
         ["hasPostErrorred"]:action.hasErrored,
         ["editPostId"] : action.id
       }

      default:
      return state;
    }
  }



  function Category (state = initialState["categories"], action) {
    switch (action.type) {
      case FETCH_CATEGORIES:
        return {

          ["categories"]:action.categories.categories,
        }

      default :
        return state;
    }
  }

  function updatemodifiedPost(p,modifiedPost)
  {
    if (p.id === modifiedPost.id)
    {
      //console.log("matched");
        p = modifiedPost;
      }

    return p;
  }

  function Post(state=initialState["posts"], action){
    switch (action.type){
      case ADD_POST:
         let posts = Object.assign([], state.posts)
         const { post } = action
         posts.push(post)
         return {
         posts
       }

       case FETCH_POSTS:
          return {

            ["posts"]:action.posts,
          }
       case TOGGLE_SORT:
        return {
          ["posts"]:action.posts,
        }
       case UPDATE_POST:

         const { modifiedPost } = action
          let mposts = Object.assign([], state.posts)
          let modposts = mposts.map((post)=>updatemodifiedPost(post,modifiedPost))

          return{
            ["posts"]:modposts
          }


       default :
            return state;

    }
  }



  function Comments(state=initialState["comments"], action){
    const { parentid,comment,comments } = action
    switch (action.type){
      case ADD_COMMENT:
         let comments = Object.assign([], state.comments)
         const { comment } = action
         comments.push(comment)
         return {
         comments
       }
       case FETCH_COMMENTS:
          return {
            ["comments"]:action.comments,
          }
      case UPDATE_COMMENT:
          const { modifiedComment } = action
          let mcomments = Object.assign([], state.comments)
           mcomments.map((p)=> {
               if (p.id === modifiedComment.id)
               {
                   p.author = modifiedComment.author;
                   p.body = modifiedComment.body
                 }
             });
         return {

               ["comments"]:mcomments
             }

      default:
        return state;
    }
  }

  const rootReducer = combineReducers({
    Category,
    Post,
    Comments,
    //PostCols,
    Settings,
    CurrentPost,
    CurrentComment,
    form:formReducers,

  })
  export default rootReducer;
