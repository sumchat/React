import {headers,api} from './APIHeaders';


export const deletePost = (postId) =>
fetch(`${api}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
      }).then(res => res.text())
      .then(data => data)


export const getAllPosts = () =>
  fetch(`${api}/posts`, {headers})
    .then(res => res.json())


export const getPost = (postId) =>
    fetch(`${api}/posts/${postId}`, { headers })
        .then(res => res.json())

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
