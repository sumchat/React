import React, { Component } from 'react';
import { onAddPost  } from '../actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, FormControl, FormGroup, ControlLabel, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { itemsFetchCategory,itemsFetchPosts  } from '../actions';
import { Link,withRouter } from 'react-router-dom';

//the redux form was designed with help from
//https://www.davidmeents.com/blog/create-redux-form-validation-initialized-values/
const form = reduxForm({
  form: 'CreateEditPost',
  //validate
});


let formsubmitted = false;
const renderField = ({input,type,placeholder,style1,componentClass,meta: { touched, error }}) => {
    return (
      <div>
        <FormControl
            type={type}
            placeholder={placeholder}
            required
            componentClass={componentClass}
            value={input.value}
            onChange={input.onChange}

             />

          </div>
    )
}
const renderTextAreaField = ({input,type,placeholder,componentClass,options,meta: { touched, error }}) => {
    return (
      <div>
        <FormControl
            type={type}
            placeholder={placeholder}
            required
            componentClass={componentClass}
            value={input.value}
            onChange={input.onChange}
            style={{ height: 200 }}

             />

          </div>
    )
}
const renderSelect = ({input,componentClass,options,meta: { touched, error }}) => (
  <div>
    <FormControl
        componentClass={componentClass}
        value={input.value}
        onChange={input.onChange}
         >
         {options && options.map((category,i)=>{
           return(<option key={i} value={category.name}>
             {category.name}
             </option>
           );}

           )
         }

         </FormControl>
      </div>
);

const category ="";

/**
 * Class representing a new Post or a post for editing
 * @extends Component
 */

class CreateEditPost extends Component {


  componentDidMount(){
    if (!this.props.Categories)
    {
    this.props.fetchCategories();
    this.props.fetchPosts();
    }
    formsubmitted = false;
    this.handleInitialize();
  }
      handleFormSubmit(formProps) {
          console.log(formProps);
          formsubmitted = true;
          if (formProps.Categories == "")
            formProps.Categories = "react";
          this.category = formProps.Categories;
          this.props.addPost(formProps);
          }

      handleInitialize() {
       const initData = {
         "id":this.props.CurrentPost.id,
         "title": this.props.CurrentPost.title,
         "body":this.props.CurrentPost.body,
         "author":this.props.CurrentPost.author,
         "Categories":this.props.CurrentPost.category,

    };

    this.props.initialize(initData);
  };




render(){
    const { handleSubmit } = this.props;
    // const validationState = ()=> {
    // // return "error";
    // };

    return(
    <div style={{marginTop: 20}}>
    <div><h2>{this.props.ptitle}</h2></div>
    <hr/>
    <Form horizontal onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
      <FormGroup controlId="posttitle">

        <Col componentClass={ControlLabel} md={4}>Title:</Col>
        <Col md={4}>
          <Field
            name="title"
            type="text"
            component={renderField}
            label="Title"
            />
        </Col>
      </FormGroup>
      {this.props.CurrentPost.id === "" &&
      <FormGroup controlId="postauthor">

        <Col componentClass={ControlLabel} md={4}>Author:</Col>
        <Col md={4}>
          <Field
            name="author"
            type="text"
            component={renderField}
            label="Author"

            />
        </Col>
      </FormGroup>
    }
      <FormGroup controlId="postbody">
            <Col componentClass={ControlLabel} md={4}>Body:</Col>
            <Col md={4}>
              <Field
              type="textarea"
                name="body"
                component={renderTextAreaField}
                label="Body"
                componentClass="textarea"
                />
            </Col>

      </FormGroup>
      {this.props.CurrentPost.id === "" &&
      <FormGroup controlId="postcategory">
            <Col componentClass={ControlLabel} md={4}>Category:</Col>
            <Col md={2}>
            <Field name="Categories" label="Categories" component={renderSelect} componentClass="select" options={this.props.Categories}/>
            </Col>
      </FormGroup>
    }
      <Button type="submit" style={{marginTop: 20}}>Submit</Button>

    </Form>
    <div>{formsubmitted === true && this.props.errors === true && <h4>Encountered errors</h4>}</div>
    <div>{formsubmitted === true && this.props.errors === false &&
         <h4>Post updated/added successfully. Click <Link to={{pathname:`/${this.category}/${this.props.editPostId}`}}> here </Link> to see the Post</h4>
        }
      </div>
      </div>
      )
      }
}

const mapStateToProps = (state) => {
    return {
      CurrentPost:state.CurrentPost,
      Categories: state.Category.categories,
      ptitle:state.CurrentPost && state.CurrentPost.id !== ""?"Edit Post":"New Post",
      errors:state.Settings.hasPostErrorred,
      editPostId:state.Settings.editPostId,
     }
}
const mapDispatchToProps = (dispatch) => {
      return {
          addPost:(post)=> dispatch(onAddPost(post)),
          fetchCategories: () => dispatch(itemsFetchCategory()),
          fetchPosts: () => dispatch(itemsFetchPosts()),

      }
  }




export default withRouter(connect(mapStateToProps,mapDispatchToProps)(form(CreateEditPost)));
