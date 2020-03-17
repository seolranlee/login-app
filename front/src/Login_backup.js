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
        axios.post('https://baelee.com:10099/login', { email: this.state.email, password: this.state.password} ).then(response=>{
            this.setState({
                loading: false,
            })
            setUserSession(response.data.token, response.data.email);

            if(response.data.result === 1){
                this.props.history.push('/dashboard');
            }else if(response.data.result === 0) {
                console.log('error',response.data)
                this.setState({ error: response.data.message});
            }else{
                this.setState({ error: '알수 없는 에러'})
            }
            
        });
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
            error: null
        })
    }

    handleSignUp = () => {
        const {email, password, confirm_password} = this.state;
        console.log(email, password, confirm_password)
        if(password!==confirm_password){
            this.setState({ error: '확인된 비밀번호가 틀립니다.'})
        }else{
            axios.post('https://baelee.com:10099/join', { email: this.state.email, password: this.state.password} ).then(response=>{
                this.setState({
                    loading: false,
                })
                setUserSession(response.data.token, response.data.email);

                if(response.data.result === 1){
                    this.props.history.push('/dashboard');
                }else if(response.data.result === 0) {
                    console.log('error',response.data)
                    this.setState({ error: response.data.message});
                }else{
                    this.setState({ error: '알수 없는 에러'})
                }
            });
        }
        
    }


    render() {

        return (
            <div>
                {this.state.isSignUp ? "Sign up" : 'Login'}<br /><br />
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
                {this.state.error&&!this.state.isSignUp && <div><small style={{color:'red'}}>{this.state.error}</small></div>}<br/>
                {!this.state.isSignUp && <input type="button" value={this.state.loading ? 'Loading...' : 'Login'} onClick={this.handleLogin}/>}<br/>
                {this.state.isSignUp && <input type="button" value="submit" onClick={this.handleSignUp}/>}<br/>
                <input type="button" value={!this.state.isSignUp? 'Sign up':'Login'} onClick={this.toggleSignUp}/><br />
            </div>
        );
    }
}

export default Login;