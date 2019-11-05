import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button } from "antd";

import { registerUser } from "../../../redux/actions/authActions";
import FormField from "../../common/form/formField";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      confirmDirty: false,
    }
  }

  onSubmitForm = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      const newUserData = {
        email: values.email,
        username: values.username,
        password: values.password,
        confirm_password: values.confirm_password,
      }

      this.props.registerUser(newUserData, this.props.history)
      .then(res => {
        console.log(res.data)
        this.props.history.push('/login')
      })
      // .catch(err => dispatch({
      //     type: GET_ERRORS,
      //     payload: err.response.data
      // }));

    });


  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm_password'], { force: true });
    }
    callback();
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {

    const { getFieldDecorator } = this.props.form;

    const { errors } = this.state;
    console.log(errors)

    return (
      <div className="container-fluid">
       <div className="row d-flex justify-content-center">
          <div className="tutor-form p-5">
            <h3 className="text-muted mb-5">Sign up</h3>
            <Form onSubmit={this.onSubmitForm}>

              <FormField
                  element={"email"}
                  name={"email"}
                  placeholder={"email address"}
                  initialValue={null}
                  errorRequired={"Please enter an email address!"}
                  getFieldDecorator={getFieldDecorator}
                  hasFeedback
              />

              <FormField
                  element={"text"}
                  name={"username"}
                  placeholder={"username"}
                  initialValue={null}
                  errorRequired={"Username is required!"}
                  getFieldDecorator={getFieldDecorator}
                  hasFeedback
              />

              <FormField
                  element={"password"}
                  validateToNextPassword={this.validateToNextPassword}
                  name={"password"}
                  placeholder={"password"}
                  initialValue={null}
                  errorRequired={"Please input your password!"}
                  getFieldDecorator={getFieldDecorator}
                  hasFeedback
              />

              <FormField
                  element={"password"}
                  compareToFirstPassword={this.compareToFirstPassword}
                  name={"confirm_password"}
                  placeholder={"confirm password"}
                  initialValue={null}
                  errorRequired={"Please confirm your password!"}
                  getFieldDecorator={getFieldDecorator}
                  hasFeedback
                  onBlur={this.handleConfirmBlur}
              />

              <Button type="primary" htmlType="submit" className="register-form-button">
                Sign up
              </Button> Or <Link to="/login">login now!</Link>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

const WrappedRegistrationForm = Form.create({ name: 'register' })(Register);

export default connect(mapStateToProps, { registerUser })(withRouter(WrappedRegistrationForm));