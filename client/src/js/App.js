import React, {useContext, useEffect, useState} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {observer} from "mobx-react-lite"
import {Context} from './main'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { check } from './http/userAPI'

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [])

    if ( loading ) {
        return (
            <div className="loader">
                <div className="lds-dual-ring"></div>
            </div>
        )
    }

    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    )
})

export default App