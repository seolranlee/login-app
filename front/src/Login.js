import React from 'react';

const Login = ({isSignUp, email, password, confirm_password, error, onToggleSignUp, onChange, onLogin, onSignUp}) => {
    return (
        <div>
            {isSignUp ? "Sign up" : 'Login'}<br /><br />
            <div>
                Email<br />
                <input type="text" name="email" value={email} onChange={(e) => onChange(e)}/>
            </div>
            <div style={{marginTop: 10}}>
                Password<br />
                <input type="password" name="password" value={password} onChange={(e) => onChange(e)}/>
            </div>
            {
                isSignUp &&
                <div style={{marginTop: 10}}>
                    Confirm Password<br />
                    <input type="password" name="confirm_password" value={confirm_password} onChange={(e) => onChange(e)}/>
                    <div><small style={{color:'red'}}>{error}</small></div>
                </div>
            }
            {error&&!isSignUp && <div><small style={{color:'red'}}>{error}</small></div>}<br/>
            {!isSignUp && <input type="button" value='Login' onClick={()=>{onLogin()}}/>}<br/>
            {isSignUp && <input type="button" value="submit" onClick={()=>{onSignUp()}}/>}<br/>
            <input type="button" value={!isSignUp? 'Sign up':'Login'} onClick={()=>{onToggleSignUp()}}/><br />
        </div>
    );
};

export default Login;