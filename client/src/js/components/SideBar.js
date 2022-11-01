import React, {useContext, useState, useEffect} from "react" 
import {observer} from "mobx-react-lite"
import {Context} from '../main'

const NavBar = observer(() => {
    const {post} = useContext(Context)

    useEffect(() => {
        document.querySelector('.sidebar__category.active').scrollIntoView()
        document.querySelector('html').scrollTop = 0
    }, [])

    const searchHandler = e => {
        post.setTitleWord(e.target.value)
    }

    return (
        <div className="sidebar">
            <div className="sidebar-search">
                <form>
                    <input type="text" className="field" placeholder="Search..." value={post.titleWord} onChange={e => searchHandler(e)}/>
                    <input type="button" className='btn' value="Send"/>
                </form>
            </div>
            <div className="sidebar-categories">
                <p>Select category</p>
                <div className="list">
                    <input type="button" className={`sidebar__category ${!post.selectedCategory.id ? 'active' : ''}`} value="All" onClick={() => {post.setSelectedCategory({})}}/>
                    {post.categories.map((category) =>
                        <input key={category.id} type="button" className={`sidebar__category ${category.id === post.selectedCategory.id ? 'active' : ''}`} value={category.name} onClick={() => {post.setSelectedCategory(category)}}/>
                    )}
                </div>
            </div>
        </div>
    )
})

export default NavBar