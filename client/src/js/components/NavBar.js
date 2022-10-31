import React, {useContext} from "react" 
import {observer} from "mobx-react-lite"
import {useNavigate} from "react-router-dom"
import {Context} from '../main'
import {POSTS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, ADMIN_ROUTE} from "../utils/consts"

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.setItem('token', '')
        navigate(POSTS_ROUTE)
    }

    return (
        <header className="header">
            <div className="wrapper">
                <nav>
                    <button className="item" onClick={() => navigate(POSTS_ROUTE)}>Posts</button>
                    {user.isAuth?
                        <div className="ml-auto">
                            <button className="item" onClick={() => navigate(ADMIN_ROUTE)}>Admin panel</button>
                            <button className="item" onClick={() => logOut()}>Sign out</button>
                        </div>
                        :
                        <div className="ml-auto">
                            <button className="item" onClick={() => navigate(LOGIN_ROUTE)}>Sign in</button>
                            <button className="item" onClick={() => navigate(REGISTRATION_ROUTE)}>Sign up</button>
                        </div>
                    }
                </nav>
            </div>
        </header>
    )
})

export default NavBar