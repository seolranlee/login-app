// start

import React, { useState, Component } from 'react';
import axios from 'axios'
import {setUserSession} from './Utils/Common'

class Login extends Component {

    state = {
        isSignUp: false,
        error: null,
        loading: false,
        email: '',
        password: '',
        confirm_password: '',
        users: [
            {
                email: "leesugar90@naver.com",
                password: "1234",
            },
            {
                email: "leesugar90@google.com",
                password: "1234",
            }
        ],

    }
    
    handleLogin = () => {
        axios.post('http://110.10.189.209:6899/users/signin', { email: this.state.email, password: this.state.password} ).then(response=>{
            this.setState({
                loading: false,
            })
            setUserSession(response.data.token, response.data.user);
            this.props.history.push('/dashboard');
        }).catch(error=>{
            this.setState({
                loading: false,
            })
            if(error.response.status === 401 || error.response.status === 400) this.setState({ error: error.response.data.message});
            else this.setState({ error: '알수 없는 에러'})
        });
        // props.history.push('/dashboard')
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    toggleSignUp = () => {
        this.setState({
            isSignUp: !this.state.isSignUp,
            email: '',
            password: '',
            error: null,
        })
    }

    handleSignUp = () => {
        const {email, password, confirm_password} = this.state;
        console.log(email, password, confirm_password)
        if(password!==confirm_password){
            this.setState({ error: '확인된 비밀번호가 틀립니다.'})
        }else{
            axios.post('http://110.10.189.209:6899/users/signup', { email: this.state.email, password: this.state.password} ).then(response=>{
                this.setState({
                    loading: false,
                })
                setUserSession(response.data.token, response.data.user);
                this.props.history.push('/dashboard');
            }).catch(error=>{
                this.setState({
                    loading: false,
                })
                if(error.response.status === 401 || error.response.status === 400) this.setState({ error: error.response.data.message});
                else this.setState({ error: '알수 없는 에러'})
            });
        }
        
    }


    render() {

        return (
            <div>
                Login<br /><br />
                <div>
                    Email<br />
                    <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                </div>
                <div style={{marginTop: 10}}>
                    Password<br />
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                </div>
                {
                    this.state.isSignUp &&
                    <div style={{marginTop: 10}}>
                        Confirm Password<br />
                        <input type="password" name="confirm_password" value={this.state.confirm_password} onChange={this.handleChange}/>
                        <div><small style={{color:'red'}}>{this.state.error}</small></div>
                    </div>
                }
                {/* <div><small style={{color:'red'}}>{this.state.error}</small></div><br /> */}
                {this.state.error&&!this.state.isSignUp && <div><small style={{color:'red'}}>{this.state.error}</small></div>}<br/>
                {!this.state.isSignUp && <input type="button" value={this.state.loading ? 'Loading...' : 'Login'} onClick={this.handleLogin}/>}<br/>
                {this.state.isSignUp && <input type="button" value="submit" onClick={this.handleSignUp}/>}<br/>
                <input type="button" value={!this.state.isSignUp? 'Sign up':'Login'} onClick={this.toggleSignUp}/><br />
            </div>
        );
    }
}

export default Login;