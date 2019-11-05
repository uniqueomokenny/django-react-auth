import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from "../../../redux/actions/authActions";
import {connect} from "react-redux";
import FormField from "../../common/form/formField";

import { Form, Button } from 'antd';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    }
  }


  onSubmitForm = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      const user = {
        email: values.email,
        password: values.password
      }
      if (!err) {
        this.props.loginUser(user);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    const { errors } = this.state;
    let errorMessage = null;
    if(errors) {
      errorMessage = <p className="text-danger text-center">{errors[0]}</p>
    }

    return (
      <div className="container-fluid">
          <div className="row d-flex justify-content-center">
            <div className="p-5 ">
            <h3 className="text-muted mb-3">Login</h3>
            {errorMessage}
            <Form onSubmit={this.onSubmitForm} className="login-form">
              <FormField
                  element={"email"}
                  name={"email"}
                  placeholder={"email"}
                  initialValue={null}
                  errorRequired={'Please input your E-mail!'}
                  getFieldDecorator={getFieldDecorator}
                  hasFeedback
              />

              <FormField
                  element={"password"}
                  name={"password"}
                  placeholder={"password"}
                  initialValue={null}
                  errorRequired={'Please input your password!'}
                  getFieldDecorator={getFieldDecorator}
              />

              <Form.Item>
                
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button> Or <Link to="/">register now!</Link>
              </Form.Item>
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

const WrappedLoginForm = Form.create({ name: "login"})(Login)

export default connect(mapStateToProps, { loginUser })(WrappedLoginForm);