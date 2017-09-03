import {headers,api} from './APIHeaders';


export const getCategories = () =>
fetch(`${api}/categories`,{headers})
 .then(res => res.json())


export const postsInCategory = (category) =>
fetch(`${api}/${category}/posts`,{headers})
  .then(res => res.json())
