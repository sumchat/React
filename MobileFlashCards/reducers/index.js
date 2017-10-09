import { combineReducers } from 'redux'

import  deck from './deckReducer'
import entries from './addEntryReducer'




const rootReducer = combineReducers({
  deck,
  entries,
})
export default rootReducer;
