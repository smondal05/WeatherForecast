import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { loginUserAction } from "../actions/authenticationActions";
import { setCookie } from "../utils/cookies";

class LoginPage extends Component {
  onHandleLogin = (event) => {
    event.preventDefault();

    let email = event.target.email.value;
    let password = event.target.password.value;

    const data = { email, password };

    this.props.dispatch(loginUserAction(data));
  };

  componentDidMount() {
    document.title = "Login";
  }

  render() {
    let isSucces, message;

    if (this.props.response.login.hasOwnProperty("response")) {
      isSucces = this.props.response.login.response.success;
      message = this.props.response.login.response.message;

      if (isSucces) {
        setCookie("token", this.props.response.login.response.token, 1);
      }
    }

    return (
      <div className="login">
        <h2>Login Page</h2>
        {!isSucces ? <div>{message}</div> : <Redirect to="dashboard" />}
        <form className="login__form" onSubmit={this.onHandleLogin}>
          <div>
            <input type="email" placeHolder="Name" name="email" id="email" />
          </div>
          <div>
            <input
              type="password"
              placeHolder="Password"
              name="password"
              id="password"
            />
          </div>
          <div>
            <button className="submit__button">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (response) => ({ response });

export default connect(mapStateToProps)(LoginPage);
