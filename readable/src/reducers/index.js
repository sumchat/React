import { combineReducers } from 'redux'
import { reducer as formReducers } from 'redux-form';
import {postReducer as Post} from './postReducer'
import {settingsReducer as Settings} from './settingsReducer'
import {commentReducer as Comments} from './commentReducer'
import {categoryReducer as Category} from './categoryReducer'
import {currentCommentReducer as CurrentComment} from './currentCommentReducer'
import {currentPostReducer as CurrentPost} from './currentPostReducer'



const rootReducer = combineReducers({
  Category,
  Post,
  Comments,
  Settings,
  CurrentPost,
  CurrentComment,
  form:formReducers,

})
export default rootReducer;
