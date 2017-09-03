export const initialState = {
  'categories':[],
  'posts':[],
  'comments':[],
  'currentPost':{
    "id":"",
    "title":"",
    "body":"",
    "author":"",
    "category":"",
    "voteScore":"",
  },
  'currentComment':{
    "id":"",
    "body":"",
    "author":"",
    "timestamp":"",
    "parentId":"",
    "voteScore":"",
  },

  'Settings':{
    'postCols':['id','timestamp','title','author','voteScore'],
    'sortOrderAsc':false,
    'sortCol':"voteScore",
    'isPostOpen':false,
    'isCommentOpen':false,
    'hasPostErrorred':false,
    'hasCommentErrored':false,
    'editPostId':"",

  }
}
