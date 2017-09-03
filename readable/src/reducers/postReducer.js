import {ADD_POST, FETCH_POSTS,TOGGLE_SORT,UPDATE_POST} from '../actions'

import {initialState } from './initialState'


function updatemodifiedPost(p,modifiedPost)
{
  if (p.id === modifiedPost.id)
  {
      p = modifiedPost;
    }
  return p;
}

export function postReducer(state=initialState["posts"], action){
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
