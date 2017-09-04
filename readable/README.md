## Project Title:   READABLE

It is a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments. This application is anonymous, with no authentication or authorization. There are no user objects, and comments and posts accept any username/name for creation and editing.


## Specification
The server is built in Node. The code will talk to the server using documented API endpoints. You can use the server's endpoints to manage storing, reading, updating, and deleting data for your application.
The front end is a React/Redux application using React Bootstrap. All of the state for the application is controlled by the reducers. Out of the box, the Redux store can only support the synchronous flow of data. Thunk middleware is  used to support the  asynchronicity in the application.

## Data
There are three types of objects stored on the server:
Categories
Posts
Comments

## Categories
The server supports a small, fixed number of categories that users can put posts into. Categories are simple objects containing a name and a URL path (usually the same string). The server does not have methods for creating/modifying/deleting these categories.
## Posts
It is the building block of the application.
## Comments
Comments are attached to parent posts


## Readable API Server
The server is written in node JS. It uses an Authorization header to work with the data.

## Installation

Install packages: `npm install`
Launch server: `node server`
Unless modified in `config.js` server will use port 5001
Launch application: `npm start`.
