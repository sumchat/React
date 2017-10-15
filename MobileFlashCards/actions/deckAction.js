

  export const FETCH_DECKS = 'FETCH_DECKS'
  export const ADD_DECK = 'ADD_DECK'

  export function addDeck(deck){
    return{
    type:ADD_DECK,
    deck
  }
  }

  export function fetchDecks(decks){
    return{
    type:FETCH_DECKS,
    decks
  }
  }
