import React, {useContext, useState} from "react" 
import {observer} from "mobx-react-lite"
import {Context} from "../../main"
import {MultiSelect} from "react-multi-select-component"
import {ToastContainer, toast} from 'react-toastify';
import {createPost} from "../../http/postAPI";

const CreateCategory = observer(() => {
    const {modal} = useContext(Context)
    const {post} = useContext(Context)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [creator, setCreator] = useState('')
    const [image, setImage] = useState(null)
    const fileInput = React.createRef()
    const [selected, setSelected] = useState([]);

    const options = post.categories.map((category) => {
        return {
            label: category.name,
            value: category.id
        }
    })

    const closeHandler = e => {
        if ( e.target.classList.contains('modal__content') ) closeModal()
    }
    const closeModal = () => {
        modal.setActiveModal('')
        setTitle('')
        setDescription('')
        setCreator('')
        fileInput.current.value = ''
        setImage(null)
        setSelected([])
    }

    const selectFile = e => {
        setImage(e.target.files[0])
    }

    const submitHandler = async e => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('description', description)
            formData.append('creator', creator)
            formData.append('img', image)

            let categories = {ids:[]}
            selected.forEach(category => { categories.ids.push(category.value) })
            formData.append('categories', JSON.stringify(categories))

            let responce = await createPost(formData)
            post.setPosts([responce.data, ...post.posts])
            toast(responce.message, {
                type: 'success'
            });
        } catch (e) {
            toast(e.response.data.message, {
                type: 'error'
            });
        }
    }

    return (
        <section className={`modal ${modal.activeModal == 'CreatePost' ? 'show' : ''}`}>
            <div className="modal__content" onClick={(e) => closeHandler(e)}>
                <div className="modal__container">
                    <div className="modal__close" onClick={() => {closeModal()}}></div>
                        
                    <p className="title">Create post</p>
                    <form>
                        <input type="text" className="field" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/>
                        <textarea className="field" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                        <input type="text" className="field" placeholder="Creator" value={creator} onChange={e => setCreator(e.target.value)}/>
                        <input type="file" className="field" placeholder="Image" ref={fileInput} onChange={selectFile}/>
                        <MultiSelect
                            options={options}
                            value={selected}
                            onChange={setSelected}
                            labelledBy="Select"
                        />
                        <input type="submit" className='btn' onClick={e => submitHandler(e)}/>
                    </form>
                    
                </div>
                <ToastContainer/>
            </div>
        </section>
    )
})

export default CreateCategory