const api = "http://localhost:5001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Authorization': token
}
export const deletePost = (postId) =>
fetch(`${api}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
      }).then(res => res.text())
      .then(data => data)


export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
              method: 'DELETE',
              headers: {
                ...headers,
                'Content-Type': 'application/json'
              },
            }).then(res => res.json())

export const getCategories = () =>
fetch(`${api}/categories`,{headers})
 .then(res => res.json())


export const postsInCategory = (category) =>
fetch(`${api}/${category}/posts`,{headers})
  .then(res => res.json())

export const getAllPosts = () =>
  fetch(`${api}/posts`, {headers})
    .then(res => res.json())


export const getAllComments = (postId) =>
      fetch(`${api}/posts/${postId}/comments`, {headers})
        .then(res => res.json())

export const getPost = (postId) =>
    fetch(`${api}/posts/${postId}`, { headers })
        .then(res => res.json())

export const updateComment = (key,timestamp,title,body) =>
    fetch(`${api}/comments/${key}`, {
            method: 'PUT',
            headers: {
              ...headers,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ key,timestamp,title,body})
          }).then(res => res.json())

export const updatePost = (key,timestamp,title,body) =>
  fetch(`${api}/posts/${key}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key,timestamp,title,body})
  }).then(res => res.json())

export const votingPost = (key,option) =>
  fetch(`${api}/posts/${key}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())
    .then(data => data)

  export const addPost = (id,timestamp,title,body,author,category) =>
    fetch(`${api}/posts`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id,timestamp,title,body,author,category })
    }).then(res => res.json())


    export const votingComment = (key,option) =>
      fetch(`${api}/comments/${key}`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option })
      }).then(res => res.json())

    export const addComment = (id,timestamp,body,author,parentId) =>
      fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id,timestamp,body,author,parentId })
      }).then(res => res.json())
