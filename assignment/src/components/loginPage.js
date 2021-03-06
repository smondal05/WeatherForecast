import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { loginUserAction } from "../actions/authenticationActions";
import { setCookie } from "../utils/cookies";

import "./loginPage.css";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { logInValid: false, loginButtonClicked: false };
  }
  onHandleLogin = (event) => {
    event.preventDefault();
    this.setState({ loginButtonClicked: true });
    let email = event.target.email.value;
    let password = event.target.password.value;

    if (email !== "" && password !== "") {
      const data = { email, password };
      this.props.dispatch(loginUserAction(data));
      this.setState({ logInValid: true });
    } else {
      this.setState({ logInValid: false });
    }
  };

  componentDidMount() {
    document.title = "Login";
  }

  render() {
    let isSucces, message;

    // [START] Faking API call to get the token
    /* OR else comment this block of code and uncomment the LOGIN_API_ENDPOINT in authenticationService.js
    and run `node server.js` in terminal outside of this assignment folder */
    if (
      this.props.location.state.logoutButtonClicked &&
      this.state.logInValid
    ) {
      if (this.props.response.login) {
        this.props.response.login.response = {
          success: true,
          token: "test123",
          message: "Login Successful.",
        };
      }
    } else {
      this.props.response.login = [];
    }
    // [END] Faking API call to get the token

    if (this.props.response.login.hasOwnProperty("response")) {
      isSucces = this.props.response.login.response.success;
      message = this.props.response.login.response.message;

      if (isSucces) {
        setCookie("token", this.props.response.login.response.token, 1);
      }
    }
    const { logInValid, loginButtonClicked } = this.state;

    return (
      <div className="login">
        <h2 className="login__header">Login Page</h2>
        {!isSucces ? <div>{message}</div> : <Redirect to="dashboard" />}
        <form className="login__form" onSubmit={this.onHandleLogin}>
          <div className="general">
            {!logInValid && loginButtonClicked ? (
              <div className="login__valid">
                ** Please enter Email and Password.
              </div>
            ) : (
              <></>
            )}
            <div className="general">
              <input
                className="login__input"
                type="email"
                placeholder="Email"
                name="email"
                id="email"
              />
            </div>
            <div>
              <input
                className="login__input"
                type="password"
                placeholder="Password"
                name="password"
                id="password"
              />
            </div>
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
