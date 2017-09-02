    import React, { Component } from 'react';
    import { connect } from 'react-redux';
    import {  Button, ButtonToolbar } from 'react-bootstrap'
    import { updateVotingComment,updateVotingPost,editCurrentPost,openNewCommentModal,editCurrentComment,onDeletePost,onDeleteComment  } from '../actions';
    import { Link,withRouter } from 'react-router-dom';


    /**
     * Class representing the toolbar with Edit,Delete,UpVote and DownVote buttons
     * @extends Component
     */
    class Post_Comments_Toolbar extends Component {


      updateVote = (id,option,group,commentId) =>{
        if(group == "comments")
          this.props.updateCommentVoting(commentId,option);
        else
          this.props.updatePostVoting(id,option);

      }

      editPost=(id,group,commentId) =>{
      if(group == "post"){
        this.props.populateCurrentPost(id);
        this.props.history.push('/posts/createEditPost')
      }
      if(group == "comments"){
        this.props.openComment(id,true);
        this.props.populateCurrentComment(commentId);

      }

      }

      delete =(id,group,commentId) =>{
        if(group === "post"){
          this.props.deletePost(id);

        }
        if(group === "comments"){
          this.props.deleteComment(commentId);

        }
      }

    render() {
      return(
        <div>
        <ButtonToolbar style={{ marginTop: 10,marginRight: 5}}>
        <Button style={{marginTop: 5}} bsSize="small" onClick={() => this.editPost(this.props.id,this.props.type,this.props.commentId)}>Edit</Button>
        <Button style={{marginTop: 5}}  bsSize="small" onClick={() => this.delete(this.props.id,this.props.type,this.props.commentId)}>Delete</Button>
        <Button style={{marginTop: 5}}  bsSize="small" onClick={() => this.updateVote(this.props.id,'upVote',this.props.type,this.props.commentId)}>upVote</Button>
        <Button style={{marginTop: 5}}  bsSize="small" onClick={() => this.updateVote(this.props.id,'downVote',this.props.type,this.props.commentId)}>downVote</Button>
        </ButtonToolbar>
        </div>
      );
    }
    }


    const mapDispatchToProps = (dispatch) => {
          return {
              updateCommentVoting:(commentId,option)=> dispatch(updateVotingComment(commentId,option)),
              updatePostVoting:(postId,option)=> dispatch(updateVotingPost(postId,option)),
              populateCurrentPost:(postId) => dispatch(editCurrentPost(postId)),
              openComment:(id,isOpen)=> dispatch(openNewCommentModal(id,isOpen)),
              populateCurrentComment:(commentId) => dispatch(editCurrentComment(commentId)),
              deletePost:(id) => dispatch(onDeletePost(id)),
              deleteComment:(id) => dispatch(onDeleteComment(id))
          }
      }

    export default withRouter(connect(null,mapDispatchToProps)(Post_Comments_Toolbar));
