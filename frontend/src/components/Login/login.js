import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';
import './login.css'

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userLogin = useSelector( state => state.userLogin);
    const { loading, userInfo, error} = userLogin;
    const dispatch = useDispatch();


    useEffect(() => {
        if(userInfo){
          props.history.push("/")
        }
    },[userInfo, props.history])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));    
    }

    return (
        <div className="login">
            <div className="login-box">
                { loading && <div>Loading...</div> }
                { error && <div>{error}</div> }
                <form onSubmit={submitHandler}>
                    <div className="email">
                        <p>EMAIL</p>
                        <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="password">
                        <p>PASSWORD</p>
                        <input type="text" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="login-btn">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;