

 //let sortCol = "voteScore"
 let sortCols = {
   "post":'voteScore',
   "comments":'voteScore'
 }
 let sortOrder ={
   "post":"desc",
   "comments":"desc"
 }

 export function getSortCol(){
   return sortCols["post"];
 }
 export function getSortOrder(){
   return sortOrder["post"];
 }
export function setSortCol(colName,type){
  sortCols[type] = colName;
}
export function setSortOrder(order,type){
  sortOrder[type] = order;
}
export function togglePostSortOrder(col){
  const sortCol = sortCols["post"];
  if (sortCol === col)
  {
  const order = sortOrder["post"]
  if(order.toUpperCase() == "ASC")
   sortOrder["post"] = "desc"
   else {
     sortOrder["post"] = "asc"
   }
 }
 else {
   sortCols["post"] = col;
 }

}

 export function sortPosts(a,b){
  const order = sortOrder["post"];
   if(order.toUpperCase() == "ASC")
    return sortPostsAsc(a,b);
    else {
    return sortPostsDesc(a,b);
    }

 }

 export function sortComments(a,b){
  const order = sortOrder["comments"];
   if(order.toUpperCase() == "ASC")
    return sortCommentsAsc(a,b);
    else {
    return sortCommentsDesc(a,b);
    }

 }

function sortAscending(a,b,sortCol){
  if (a[sortCol] < b[sortCol])
    return -1;
  if (a[sortCol] > b[sortCol])
    return 1;
  return 0;
}

function sortDescending(a,b,sortCol){
  if (a[sortCol] < b[sortCol])
  return 1;
  if (a[sortCol] > b[sortCol])
  return -1;
  return 0;
}

 function sortPostsAsc(a,b) {
  const sortCol = sortCols["post"];
  return sortAscending(a,b,sortCol)
// if (a[sortCol] < b[sortCol])
//   return -1;
// if (a[sortCol] > b[sortCol])
//   return 1;
// return 0;
}

 function sortPostsDesc(a,b) {
  const sortCol = sortCols["post"];
    return sortDescending(a,b,sortCol)
// if (a[sortCol] < b[sortCol])
// return 1;
// if (a[sortCol] > b[sortCol])
// return -1;
// return 0;
}
 function sortCommentsAsc(a,b) {
  const sortCol = sortCols["comments"];
  return sortAscending(a,b,sortCol)
// if (a[sortCol] < b[sortCol])
//   return -1;
// if (a[sortCol] > b[sortCol])
//   return 1;
// return 0;
}

function sortCommentsDesc(a,b) {
  const sortCol = sortCols["comments"];
  return sortDescending(a,b,sortCol)
}
// if (a[sortCol] < b[sortCol])
// return 1;
// if (a[sortCol] > b[sortCol])
// return -1;
