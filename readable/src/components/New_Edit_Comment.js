import React, { Component } from 'react'
import { onAddPost  } from '../actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, FormControl, FormGroup, ControlLabel, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { onAddComment} from '../actions';

const form = reduxForm({
  form: 'New_Edit_Comment',
//  validate
});

// const validate = (values) => {
//   const errors = {};
//   console.log("values at validation: ", values);
//   if (!values.body) {
//     errors.body = 'Enter your comment';
//   }
//   console.log("The current set of errors is", errors);
//   return errors;
// }

const renderField = ({input,type,placeholder,componentClass,meta: { touched, error }}) => {
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

/**
 * Class representing the form to create/edit a comment
 * @extends Component
 */
class New_Edit_Comment extends Component {

  componentDidMount() {
      this.handleInitialize();
    }

      handleFormSubmit(formProps) {
          //alert("Name passed to onSubmit: '"+ formProps.body +"'");
          //console.log("Form props passed by handleSubmit: ", formProps);
          this.props.addComment(this.props.postId,formProps);
          this.props.onClose();
          }

      handleInitialize() {
       const initData = {
        "id":this.props.currentComment.id,
       "body": this.props.currentComment.body,
       "author":this.props.currentComment.author
    };

    this.props.initialize(initData);
  }

render(){
    const { handleSubmit,onClose } = this.props;
    // const validationState = ()=> {
    // // return "error";
    // };

    return(
    <div>
    <Form horizontal onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
    <FormGroup controlId="posttitle">
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
    <FormGroup controlId="postbody">
      <Col componentClass={ControlLabel} md={4}>Enter Comment:</Col>
      <Col md={8}>
      <Field
       type="textarea"
        name="body"
        component={renderField}
        label="body"
        componentClass="textarea"
        />
      </Col>
      </FormGroup>
      <FormGroup>
      <Button  type="button" bsStyle="warning" className="pull-right" onClick={onClose}>Cancel</Button>
      <Button  type="submit" bsStyle="success" className="pull-right">Submit</Button>
      </FormGroup>
      </Form>

      </div>
      )
      }
}

const mapStateToProps = (state,ownProps) => {
  return {
      currentComment:state.CurrentComment,
      isCommentOpen:state.Settings.isCommentOpen

  };
}
const mapDispatchToProps = (dispatch) => {
      return {
          addComment:(parentid,comment)=> dispatch(onAddComment(parentid,comment)),
      }
  }


export default connect(mapStateToProps,mapDispatchToProps)(form(New_Edit_Comment));
