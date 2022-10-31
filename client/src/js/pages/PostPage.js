import React, {useEffect, useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import {Context} from '../main'
import { fetchPost } from '../http/postAPI'
import { POSTS_ROUTE } from '../utils/consts'

const Posts = () => {
    const {post} = useContext(Context)
    const navigate = useNavigate()
    const [postData, setPostData] = useState({categories: []})
    const {id} = useParams()
    useEffect(() => {
        fetchPost(id).then(data => {
            if ( !!data ) {
                setPostData(data)
            }
        })
    }, [])

    const categoryHandler = category => {
        post.setSelectedCategory(category)
        navigate(POSTS_ROUTE)
    }
    
    return (
        <section className="post-page">
            <div className="wrapper">
                <div className="back">
                    <p onClick={() => navigate(-1)}>{'< Go back'}</p>
                </div>
                {!!postData.title ?
                    <div>
                        <img src={!postData.img.indexOf('http') ? postData.img : process.env.REACT_APP_API_URL + postData.img} alt={postData.title}/>
                        <div className='categories'>
                            {postData.categories.map(category => 
                                <p key={category.id} onClick={() => categoryHandler(category)}>{category.name}</p>
                            )}
                        </div>
                        <p className="title">{postData.title}</p>
                        <div className="description" dangerouslySetInnerHTML={{ __html: postData.description }}></div>
                        <p className="creator">{postData.creator}</p>
                    </div>
                    :
                    <div></div>
                }
            </div>
        </section>
    )
}

export default Posts