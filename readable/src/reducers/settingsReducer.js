

import { POSTS_HAS_ERRORED, TOGGLE_SORT,ISOPEN_POST,ISOPEN_COMMENT} from '../actions'
import {initialState } from './initialState'

export function settingsReducer(state=initialState["Settings"],action){
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
