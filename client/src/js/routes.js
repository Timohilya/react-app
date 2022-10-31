import Admin from './pages/Admin'
import Auth from './pages/Auth'
import Posts from './pages/Posts'
import PostPage from './pages/PostPage'
import {ADMIN_ROUTE, REGISTRATION_ROUTE, LOGIN_ROUTE, POSTS_ROUTE, POST_ROUTE} from './utils/consts'

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }
]

export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: POSTS_ROUTE,
        Component: Posts
    },
    {
        path: POST_ROUTE + '/:id',
        Component: PostPage
    }
]