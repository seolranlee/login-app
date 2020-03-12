import React, { useState } from 'react';
import axios from 'axios'
import {setUserSession} from './Utils/Common'


const Login = (props) => {
    const email = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    // handle button click of login form
    const handleLogin = () => {
        setError(null);
        setLoading(true);
        axios.post('http://110.10.189.209:6899/users/signin', { email: email.value, password: password.value}).then(response=>{
            setLoading(false);
            setUserSession(response.data.token, response.data.user);
            props.history.push('/dashboard');
        }).catch(error=>{
            setLoading(false);
            if(error.response.status === 401 || error.response.status === 400) setError(error.response.data.message);
            else setError('알수없는 문제로 인한 에러')
        });
        // props.history.push('/dashboard')
    }

    return (
        <div>
            Login<br /><br />
            <div>
                Email<br />
                <input type="text" {...email} />
            </div>
            <div style={{marginTop: 10}}>
                Password<br />
                <input type="password" {...password} />
            </div>
            {error && <div><samll style={{color:'red'}}>{error}</samll></div>}<br/>
            <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disable={loading} /><br />
        </div>
    );
};

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e =>{
        setValue(e.target.value);
    }
    return {
        value, 
        onChange: handleChange
    }
}
export default Login;