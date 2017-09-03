import {initialState } from './initialState'
import { ADD_COMMENT,FETCH_COMMENTS,UPDATE_COMMENT} from '../actions'

export function commentReducer(state=initialState["comments"], action){
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
