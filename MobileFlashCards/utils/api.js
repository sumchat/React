  import { AsyncStorage } from 'react-native'
  import { getMetricMetaInfo, timeToString } from './helpers'

  export const CALENDAR_STORAGE_KEY = 'MobileFlashCards:calendar'

  export const UDACICARDS_STORAGE_KEY = 'MobileFlashCards:decks'

  let UDACICARDS_OBJ =
    {
     React:{
     "key":'React',
     "title": 'React',
      "questions": [
         {
           "question": 'What is React?',
           "answer": 'A library for managing user interfaces'
         },
         {
           "question": 'Where do you make Ajax requests in React?',
           "answer": 'The componentDidMount lifecycle event'
         }
       ]
     },
     JavaScript:{"key":'JavaScript',
       "title": 'JavaScript',
       "questions": [
         {
          "question": 'What is a closure?',
           "answer": 'The combination of a function and the lexical environment within which that function was declared.'
         }
       ]
     }

  }

  //used for sorting the objects in an array
  function compare(a,b) {
    if (a.title < b.title)
      return -1;
    if (a.title > b.title)
      return 1;
    return 0;
  }

// format the results returned from getAllDecks in the form of an array
  export function formatDeckResults(results){
    //console.log("fetching",JSON.parse(results))
    let listOfDecks = []
    if (results == null)
    {
        let listOfDecks = []
         AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(UDACICARDS_OBJ));

         var result = Object.keys(UDACICARDS_OBJ).map(function(key) {
               return UDACICARDS_OBJ[key];
         });
         listOfDecks = result//Array.prototype.slice.call(UDACICARDS_OBJ)
         listOfDecks.sort(compare);
         return listOfDecks;
       }
       else {
         listOfDecks = JSON.parse(results)
         var result = Object.keys(listOfDecks).map(function(key) {
               return listOfDecks[key];
         });
        result.sort(compare)
        return result;
       }
    }

  export  function  getAllDecks(){
    console.log("in deck");
     return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
       .then(formatDeckResults)
  }


//adds a new Deck
  export function addDeck(key,deck){
     AsyncStorage.mergeItem(UDACICARDS_STORAGE_KEY, JSON.stringify({
      [key]: deck
    }))
    return getAllDecks();

  }

//adds a card to a deck
  export  function addCardToDeck(title,card){
  //console.log(title)
   return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
                  .then((response) =>{
                    let decks =  JSON.parse(response)
                    console.log(decks,title)
                    console.log(decks[title])
                    let  filteredDeck = decks[title]
                    console.log("filtered deck",filteredDeck)
                    filteredDeck.questions.push(card)
                    decks[title] = filteredDeck
                    AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(decks))
                    return getAllDecks()
                  })

    }


  export function fetchCalendarResults () {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
      .then(formatCalendarResults)
  }

  function getRandomNumber (max) {
    return Math.floor(Math.random() * max) + 0
  }
  //this is used to populate the Study hours for past few months with some random data the first time.
  //the app is installed so that the user knows how the data is logged.
  function setDummyData () {
    const { Study } = getMetricMetaInfo()

    let dummyData = {}
    const timestamp = Date.now()

    for (let i = -183; i < 0; i++) {
      const time = timestamp + i * 24 * 60 * 60 * 1000
      const strTime = timeToString(time)
      dummyData[strTime] = getRandomNumber(3) % 2 === 0
        ? {
            Study: getRandomNumber(Study.max),
          }
            : null
      }
    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(dummyData))
    return dummyData
  }



  function setMissingDates (dates) {
    const length = Object.keys(dates).length
    const timestamp = Date.now()

    for (let i = -183; i < 0; i++) {
      const time = timestamp + i * 24 * 60 * 60 * 1000
      const strTime = timeToString(time)

      if (typeof dates[strTime] === 'undefined') {
        dates[strTime] = null
      }
    }

    return dates
  }

  export function formatCalendarResults (results) {
    return results === null
      ? setDummyData()
      : setMissingDates(JSON.parse(results))

  }

  //when a quiz is attempted a default value of 1 hour is assigned to Study.
  //It can be later changed in the interface
  export function submitQuiz ({  key }) {
    return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
      [key]:{
        Study:1
      }
    }))
    .then((response)=>
    {
      return fetchCalendarResults()
    }
    )
  }

  export function submitEntry ({ entry, key }) {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
      .then((results) => {
        const data = JSON.parse(results)
        data[key] = entry
        AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
      })
  }

  export function removeEntry (key) {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
      .then((results) => {
        const data = JSON.parse(results)
        data[key] = null//undefined
        //delete data[key]
        AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
      })
  }
