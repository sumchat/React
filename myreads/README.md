## Project Title

It is a bookshelf web application that allows to search, select and categorize books that you have Read, Currently Reading or Want to Read. It is built using React components and access the backend server with a BooksAPI pointed to "https://reactnd-books-api.udacity.com". It has 2 pages. The main page has 3 shelves - Currently Reading, Want to Read and Read. Each book has a control that shows the selected shelf for that book. When you select a different shelf, the book moves there. The other is a Search page containing a text input. As the text in the input changes the books that match the query are displayed in the page. The invoking of the search function is delayed until after 1000 milliseconds have elapsed since the user stopped typing. The results returned are cached raw data based on predefined Search terms in Search_Terms.md file. Once the raw data is retrieved the shelf information of the books are synched with the data for the bookshelves in the main page and then presented to the user. The books in the Search page also has a control that lets the user to add the book to a particular bookshelf or remove from the bookshelf.

![Home Page](images/HomePage.PNG)
![Search Page](images/SearchPage.PNG)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

* Node/NPM Versions: I'm running node v6.11.0 and npm v5.0.4

## Install instructions

* Download or clone the  repository
* cd to the project folder
* Install the requirements from the included package.json file using: npm install
* npm start will launch the application at http://localhost:3000/

## External Libraries used
* The application uses the debounce method  of Lodash package to control how many times a given function may be executed over time.
* The application also uses the navigational components of ReactRouter

## Backend Server

 The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods needed to perform necessary operations on the backend:

### `getAll()`
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update(book, shelf)`
* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search(query, maxResults)`
* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
