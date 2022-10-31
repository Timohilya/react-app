import React, {useContext} from 'react'
import { observer } from 'mobx-react-lite'
import {Routes, Route, Navigate} from 'react-router-dom'
import {Context} from '../main'
import {authRoutes, publicRoutes} from '../routes'
import {POSTS_ROUTE} from '../utils/consts'

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (
        <Routes>

            {publicRoutes.map(route =>
                <Route key={route.path} path={route.path} element={<route.Component/>} exact/>
            )}
            {user.isAuth && authRoutes.map(route =>
                <Route key={route.path} path={route.path} element={<route.Component/>} exact/>
            )}
            <Route path="*" element={<Navigate to={POSTS_ROUTE} replace />}/>

        </Routes>
    )
})

export default AppRouter