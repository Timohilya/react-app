import React, {useContext} from "react" 
import {observer} from "mobx-react-lite"
import {Context} from '../main'
import PostItem from "./PostItem"
import Pagination from "./Pagination"

const PostList = observer(() => {
    const {post} = useContext(Context)
    return (
        <div className="posts-list">
            <div className="list">
                {!!post.posts.length && post.posts.map(post =>
                    <PostItem key={post.id} post={post}/>
                )}
            </div>
            <Pagination/>
        </div>
    )
})

export default PostList