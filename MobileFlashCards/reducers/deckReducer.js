import { FETCH_DECKS, ADD_DECK } from '../actions'

function deck (state = {}, action) {
  switch (action.type) {
    case FETCH_DECKS :
      return action.decks;
    case ADD_DECK:
        let decks = Object.assign([], state.decks)
        const { deck } = action
        decks.push(deck)
        return {
           decks
          }

    default :
      return state
  }
}

export default deck;
