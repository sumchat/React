import {headers,api} from './APIHeaders';



export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
              method: 'DELETE',
              headers: {
                ...headers,
                'Content-Type': 'application/json'
              },
            }).then(res => res.json())


export const getAllComments = (postId) =>
      fetch(`${api}/posts/${postId}/comments`, {headers})
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
