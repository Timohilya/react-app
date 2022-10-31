import React, {useContext, useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import {Context} from '../main'
import {ToastContainer, toast} from 'react-toastify';
import CreateCategory from '../components/modals/CreateCategory'
import CreatePost from '../components/modals/CreatePost'
import { fetchCategories, deleteCategory, fetchPosts, deletePost } from '../http/postAPI'
import Pagination from "../components/Pagination"

const Admin = observer(() => {
    const {modal} = useContext(Context)
    const {post} = useContext(Context)

    useEffect(() => {
        fetchCategories().then(data => {
            post.setCategories(data)
        })
        post.setLimit(6)
        fetchPosts(null, post.page, post.limit).then(data => {
            post.setPosts(data.rows)
            post.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchPosts(null, null, post.page, post.limit).then(data => {
            post.setPosts(data.rows)
            post.setTotalCount(data.count)
        })
    }, [post.page])

    const deleteCategoryHandler = async id => {
        try {
            let responce = await deleteCategory({id:id})
            post.setCategories(post.categories.filter(category => category.id != id))
            toast(responce.message, {
                type: 'success'
            });
        } catch (e) {
            console.log(e)
            toast(e.response.message, {
                type: 'error'
            });
        }
    }

    const deletePostHandler = async id => {
        try {
            let responce = await deletePost({id:id})
            post.setPosts(post.posts.filter(post => post.id != id))
            toast(responce.message, {
                type: 'success'
            });
        } catch (e) {
            console.log(e)
            toast(e.response.message, {
                type: 'error'
            });
        }
    }

    return (
        <div>
            <section className="admin">
                <div className="wrapper">
                    <div className="admin-panel">
                        <input type="button" className='btn' value="Create category" onClick={() => {modal.setActiveModal('CreateCategory')}}/>
                        <input type="button" className='btn' value="Create post" onClick={() => {modal.setActiveModal('CreatePost')}}/>
                    </div>
                    
                    <div className="row">
                        <div className="col admin-categories">
                            <p className="title">Categories</p>
                            <table>
                                <thead>
                                    <tr>
                                        <td>ID</td>
                                        <td>Name</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                {!!post.categories.length ?
                                        <tbody>
                                            {post.categories.map(category =>
                                                <tr key={category.id}>
                                                    <td>{category.id}</td>
                                                    <td>{category.name}</td>
                                                    <td>
                                                        <button className="edit"></button>
                                                        <button className="delete" onClick={() => deleteCategoryHandler(category.id)}></button>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    :
                                    <tbody></tbody>
                                }
                            </table>
                        </div>
                        <div className="col admin-posts">
                            <p className="title">Posts</p>
                            <table>
                                <thead>
                                    <tr>
                                        <td>ID</td>
                                        <td>Title</td>
                                        <td>Creator</td>
                                        <td>Categories</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                {!!post.posts.length ?
                                        <tbody>
                                            {post.posts.map(post =>
                                                <tr key={post.id}>
                                                    <td>{post.id}</td>
                                                    <td>{post.title}</td>
                                                    <td>{post.creator}</td>
                                                    <td>
                                                        {post.categories.map(category =>
                                                            <p key={category.id}>{category.name}</p>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <button className="edit"></button>
                                                        <button className="delete" onClick={() => deletePostHandler(post.id)}></button>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    :
                                        <tbody></tbody>
                                }
                            </table>
                            <Pagination/>
                        </div>
                    </div>
                    
                </div>
            </section>
            <CreateCategory/>
            <CreatePost/>
            <ToastContainer/>
        </div>
    )
})

export default Admin