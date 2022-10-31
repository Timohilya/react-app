import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Sidebar from '../components/SideBar'
import PostList from '../components/PostList'
import { Context } from '../main'
import { fetchCategories, fetchPosts } from '../http/postAPI'

const Posts = observer(() => {
    const {post} = useContext(Context)
    
    useEffect(() => {
        fetchCategories().then(data => {
            post.setCategories(data)
        })
        post.setLimit(6)
        fetchPosts(null, null, post.page, post.limit).then(data => {
            post.setPosts(data.rows)
            post.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchPosts(post.titleWord, post.selectedCategory.id, post.page, post.limit).then(data => {
            post.setPosts(data.rows)
            post.setTotalCount(data.count)
        })
    }, [post.titleWord, post.selectedCategory, post.page])

    return (
        <section className="posts">
            <div className="wrapper">
                <Sidebar/>
                <PostList/>
            </div>
        </section>
    )
})

export default Posts