import React, {useContext, useState} from 'react'
import {observer} from "mobx-react-lite";
import {Context} from "../main"
import {ToastContainer, toast} from 'react-toastify';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {login, registration} from '../http/userAPI';
import {LOGIN_ROUTE, REGISTRATION_ROUTE, ADMIN_ROUTE} from '../utils/consts';

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const clickHandler = async () => {
        try {
            let data
            if ( isLogin ) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            navigate(ADMIN_ROUTE)
        } catch (e) {
            toast(e.response.data.message, {
                type: 'error'
            });
        }
    }

    return (
        <section className="login">
            <div className="wrapper">
                <form>
                    <p className="title">{isLogin ? 'Login' : 'Registration'}</p>
                    <input type="text" className="field" placeholder="login" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="password" className="field" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <input type="button" className='btn' value="Send" onClick={clickHandler}/>
                    {isLogin ?
                        <p className="text">No account? <Link to={REGISTRATION_ROUTE} className="item">Sign up!</Link></p>
                        :
                        <p className="text">Has account? <Link to={LOGIN_ROUTE} className="item">Sign in!</Link></p>
                    }
                </form>
                <ToastContainer/>
            </div>
        </section>
    )
})

export default Auth