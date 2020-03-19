import React from 'react';

const Login = ({isSignUp, email, password, confirm_password, error, onToggleSignUp, onChange, onLogin, onSignUp}) => {
    return (
        <div className="login-form">
            <h2>{isSignUp ? "Sign up" : 'Login to your account'}</h2>
            <div className="form-row">
                <label htmlFor="form_email">Email</label>
                <input id="form_email" type="text" name="email" value={email} onChange={(e) => onChange(e)}/>
            </div>
            <div className="form-row">
                <label htmlFor="form_password">Password</label>
                <input id="form_password" type="password" name="password" value={password} onChange={(e) => onChange(e)}/>
                {error&&!isSignUp && <div><small className="error-message">{error}</small></div>}
            </div>
            {
                isSignUp &&
                <div className="form-row">
                    <label htmlFor="form_confirm_password">Confirm Password</label>
                    <input id="form_confirm_password" type="password" name="confirm_password" value={confirm_password} onChange={(e) => onChange(e)}/>
                    <small className="error-message">{error}</small>
                    
                </div>
            }
            <div className="btn-grop">
                {!isSignUp && <input type="button" id="form_login" value='Login' onClick={()=>{onLogin()}}/>}
                {isSignUp && <input type="button" id="btn_submit" value="Submit" onClick={()=>{onSignUp()}}/>}
                <input type="button" value={!isSignUp? 'Sign up':'Login'} onClick={()=>{onToggleSignUp()}}/>
            </div>
            
        </div>
    );
};

export default Login;