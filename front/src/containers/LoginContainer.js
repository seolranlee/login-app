import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "../Login";
import {
  changeIsSignup,
  chagneError,
  changeInput,
  resetValue
} from "../store/modules/login";

import axios from "axios";
import { setUserSession } from "../Utils/Common";

class LoginContainer extends Component {
  handleReset = () => {
    const { resetValue } = this.props;
    resetValue();
  };

  handleChange = e => {
    const { changeInput, email, password } = this.props;
    changeInput(e);
    console.log("email: ", email, "password: ", password);
  };

  toggleSignUp = () => {
    const { changeIsSignup, resetValue } = this.props;
    resetValue();
    changeIsSignup();
  };

  handleLogin = () => {
    const { email, password, chagneError } = this.props;
    axios
      .post("https://baelee.com:10099/login", {
        email: email,
        password: password
      })
      .then(response => {
        if (response.data.result === 1) {
          setUserSession(response.data.token, response.data.email);
          this.props.history.push("/dashboard");
        } else if (response.data.result === 0) {
          console.log("error", response.data);
          chagneError(response.data.message);
        } else {
          chagneError("알수 없는 에러");
        }
      });
  };

  handleSignUp = () => {
    const { email, password, confirm_password, chagneError } = this.props;
    console.log(email, password, confirm_password);
    if (email.length === 0 || password.length === 0) {
      chagneError("모든 칸을 채워주세요");
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      chagneError("이메일 형식이 아닙니다.");
    } else if (password !== confirm_password) {
      chagneError("확인된 비밀번호가 틀립니다.");
    } else {
      axios
        .post("https://baelee.com:10099/join", {
          email: email,
          password: password
        })
        .then(response => {
          if (response.data.result === 1) {
            setUserSession(response.data.token, response.data.email);
            this.props.history.push("/dashboard");
          } else if (response.data.result === 0) {
            console.log("error", response.data);
            chagneError(response.data.message);
          } else {
            chagneError("알수 없는 에러");
          }
        });
    }
  };

  render() {
    const { isSignUp, email, password, confirm_password, error } = this.props;
    return (
      <Login
        isSignUp={isSignUp}
        email={email}
        password={password}
        error={error}
        confirm_password={confirm_password}
        onToggleSignUp={this.toggleSignUp}
        onChange={this.handleChange}
        onLogin={this.handleLogin}
        onSignUp={this.handleSignUp}
        onReset={this.handleReset}
      />
    );
  }
}

// props 로 넣어줄 스토어 상태값
const mapStateToProps = state => ({
  isSignUp: state.login.isSignUp,
  error: state.login.error,
  email: state.login.email,
  password: state.login.password,
  confirm_password: state.login.confirm_password
});

// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({
  changeIsSignup: () => dispatch(changeIsSignup()),
  chagneError: message => dispatch(chagneError(message)),
  changeInput: e => dispatch(changeInput(e)),
  resetValue: () => dispatch(resetValue())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
