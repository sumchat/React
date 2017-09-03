
import {initialState } from './initialState'
import {NEW_COMMENT,UPDATE_CURRENT_COMMENT} from '../actions'

export function currentCommentReducer(state=initialState["currentComment"],action){
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
