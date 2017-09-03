import * as ReadableAPI from '../ReadableAPI'
import {CATEGORIES_HAS_ERRORED,FETCH_CATEGORIES} from './types'

export const fetchCategories = categories =>({
  type:FETCH_CATEGORIES,
  categories
});

export function categoriesHasErrored(bool) {
  return {
      type: CATEGORIES_HAS_ERRORED,
      hasErrored: bool
  };
}

/**
* get all the categories from the server
*/

export const itemsFetchCategory = () =>  dispatch => {
   ReadableAPI.getCategories()
  .then(categories => dispatch(fetchCategories(categories)))
  .catch((e) => console.error(e))

};
