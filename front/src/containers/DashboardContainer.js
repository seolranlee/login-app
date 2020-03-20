import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from '../Dashboard';
import { resetValue } from '../store/modules/login';

import { getUser, removeUserSession } from '../Utils/Common'

class DashboardContainer extends Component {

    handleLogout = () => {
        this.handleReset();
        removeUserSession();
        this.props.history.push('/');
    }

    handleReset = () => {
        const {resetValue} = this.props;
        resetValue();
    }
    

    render() {
        const email = getUser();
        return (
            <Dashboard
                email={email}
                onLogout={this.handleLogout}
            />
        );
    }
}
const mapStateToProps = state => ({
    isSignUp: state.login.isSignUp,
    error: state.login.error,
    email: state.login.email,
    password: state.login.password,
    confirm_password: state.login.confirm_password,
});
// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({
    resetValue: () => dispatch(resetValue()),
  });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardContainer);
