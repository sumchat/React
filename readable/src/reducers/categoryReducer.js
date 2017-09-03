import {initialState } from './initialState'
import {FETCH_CATEGORIES} from '../actions'


export function categoryReducer (state = initialState["categories"], action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {

        ["categories"]:action.categories.categories,
      }

    default :
      return state;
  }
}
