
import {initialState } from './initialState'
import {UPDATE_CURRENT_POST} from '../actions'


export function currentPostReducer(state=initialState["currentPost"],action){
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
