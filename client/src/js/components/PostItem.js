import React from "react" 
import {useNavigate} from "react-router-dom"
import {POST_ROUTE} from "../utils/consts"

const PostItem = ({post}) => {
    const navigate = useNavigate()
    return (
        <div className="posts-item" onClick={() => navigate(POST_ROUTE + '/' + post.id)}>
            <div className="img">
                <img src={!post.img.indexOf('http') ? post.img : process.env.REACT_APP_API_URL + post.img} alt={post.title}/>
            </div>
            <p className="title">{post.title}</p>
            <div className="description" dangerouslySetInnerHTML={{ __html: post.description }}></div>
            <p className="creator">{post.creator}</p>
        </div>
    )
}

export default PostItem