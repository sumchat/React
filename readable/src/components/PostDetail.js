  import React, { Component } from 'react'
  import { onAddPost  } from '../actions';
  import { connect } from 'react-redux';
  import Grid from 'react-bootstrap/lib/Grid';
  import Jumbotron from 'react-bootstrap/lib/Jumbotron';
  import { itemsFetchCategory,itemsFetchPosts,openNewCommentModal,itemsFetchComments,updateVotingComment,sortPostComments  } from '../actions';

  import { Form, FormControl, FormGroup, ControlLabel,Modal, Col,Row, Button, Tooltip, OverlayTrigger,Panel,ButtonToolbar } from 'react-bootstrap'

  import New_Edit_Comment from './New_Edit_Comment'
  import Post_Comments_Toolbar from './Post_Comments_Toolbar'

    let sortCol = "voteScore";
    let sortOrder = "Desc"

    /**
     * Class representing the Detail Post
     * @extends Component
     */
  class PostDetail extends Component {
    componentDidMount(){
      if (!this.props.post)
      {
      this.props.fetchCategories();
      this.props.fetchPosts();
      }
      this.props.fetchComments(this.props.postid);

    }
    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
      //this.props.fetchPosts();
      this.props.fetchComments(this.props.postid);
      }
    addComment = ({post})=>{
      this.props.openComment(post.id,true);
    }
    closeCommentModal = () => {
     this.props.closeComment();
    }

    getTime = timestamp =>{
      let d = new Date(timestamp);
      return d.toDateString();
    }
    updateVote = (id,option) =>{
      this.props.updateVoting(id,option);
    }



   setSortCol(event){
     sortCol = event.target.value;
   }

   setSortOrder(event){
     sortOrder = event.target.value;
   }
    sortComment = () =>{
    sortCol =   this.refs.sortCol.value;
    sortOrder =   this.refs.sortOrder.value;
      this.props.sortComments(sortCol,sortOrder);
    }
    render(){
     const {comments} = this.props;
     let filteredcomments = null;
       if(comments)
          filteredcomments = comments.filter((comment)=> comment.deleted === false);
      return(
        <div>
        {this.props.post   && (this.props.post.filter((post)=> post.id === this.props.postid && post.deleted === false).map((post)=>{
          return(
            <div key={post.id}>

           <Grid>
             <h2>{post.title}</h2>
             <p>{post.author}</p>

           </Grid>

         <Grid>
           <Row>
             <Col md={12}>

               <p>{post.body} </p>

             </Col>

           </Row>

         </Grid>

          <div className="row-padded">
           <label style={{marginLeft: "0px", marginRight: "10px"}} ><span>Time:{this.getTime(post.timestamp)}</span></label>
           <label style={{marginLeft: "0px", marginRight: "10px"}} ><span>vote:{post.voteScore}</span></label>
           <Post_Comments_Toolbar type='post' id={post.id} from='postDetail'/>
           </div>


         <div className="row-padded1">
         <label style={{marginLeft: "0px", marginRight: "30px"}}><span>COMMMENTS:{this.props.comments && this.props.comments.length}</span></label>
         <label style={{marginLeft: "20px", marginRight: "10px"}}><span>Sort By:</span></label>
         <select defaultValue="voteScore" ref="sortCol" onChange={(event) => this.setSortCol.bind(this)}>
          <option value="voteScore">voteScore</option>
          <option value="timestamp">timestamp</option>
        </select>
        <select  defaultValue ="Desc" ref="sortOrder" onChange={(event) => this.setSortOrder.bind(this)}>
         <option value="Asc">Asc</option>
         <option value="Desc">Desc</option>
       </select>
        <button style={{marginLeft: "10px", marginRight: "30px"}} onClick={()=> this.sortComment()}> Sort </button>
        <button onClick={()=> this.addComment({post})}> Add Comment </button>
         </div>
          <div>
          {
            filteredcomments && filteredcomments.map((comment)=>{
              return (
                <Panel defaultExpanded header={comment.body} collapsible key={comment.id}>
                  <label style={{marginLeft: "0px", marginRight: "10px"}} ><span>Author:{comment.author}</span></label>
                  <label style={{marginLeft: "0px", marginRight: "10px"}} ><span>Time:{this.getTime(comment.timestamp)}</span></label>
                  <label style={{marginLeft: "0px", marginRight: "10px"}} ><span>vote:{comment.voteScore}</span></label>
                  <Post_Comments_Toolbar type='comments' id={post.id} commentId={comment.id}/>

                  </Panel>

              )
            })
          }

         </div>



          <Modal show={this.props.isCommentOpen} onHide={this.props.closeComment}>
            <Modal.Header closeButton>
              <Modal.Title>Add/Edit a Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <New_Edit_Comment postId = {this.props.postid}   onClose={this.closeCommentModal}/>
           <div/>
          </Modal.Body>
          <Modal.Footer>
          <Button bsStyle="danger" className="pull-right" onClick={() => this.props.closeComment()}>Close</Button>
          </Modal.Footer>
          </Modal>

         </div>
        )}
        )
        )}

        </div>
        )
        }
        }



          const mapStateToProps = (state,ownProps) => {
            return {
                postid: ownProps.match.params.id,
                post: state.Post.posts,
                isCommentOpen:state.Settings.isCommentOpen,
                comments:state.Comments.comments,

            };
          }
          const mapDispatchToProps = (dispatch) => {
                return {
                    addPost:(post)=> dispatch(onAddPost(post)),
                    fetchCategories: () => dispatch(itemsFetchCategory()),
                    fetchPosts: () => dispatch(itemsFetchPosts()),
                    openComment:(id,isOpen)=> dispatch(openNewCommentModal(id,isOpen)),
                    closeComment:()=>dispatch(openNewCommentModal(null,false)),
                    fetchComments:(postId)=>  dispatch(itemsFetchComments(postId)),
                    updateVoting:(commentId,option)=> dispatch(updateVotingComment(commentId,option)),
                    sortComments:(sortCol,sortOrder)=> dispatch(sortPostComments(sortCol,sortOrder))


                }
            }



          export default connect(mapStateToProps,mapDispatchToProps)(PostDetail);
