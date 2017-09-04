import {initialState } from './initialState'
import { ADD_COMMENT,FETCH_COMMENTS,UPDATE_COMMENT} from '../actions'




function updatemodifiedComment(p,modifiedComment)
{
  if (p.id === modifiedComment.id)
  {
      p = modifiedComment;
    }
  return p;
}
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
        let modcomments = mcomments.map((comment)=>updatemodifiedComment(comment,modifiedComment))
        return{
          ["comments"]:modcomments
        }

    default:
      return state;
  }
}
