import React, {useContext, useState} from "react" 
import {observer} from "mobx-react-lite"
import {Context} from '../../main'
import {createCategory} from "../../http/postAPI";
import {ToastContainer, toast} from 'react-toastify';

const CreateCategory = observer(() => {
    const {modal} = useContext(Context)
    const {post} = useContext(Context)
    const [name, setName] = useState('')

    const closeHandler = e => {
        if ( e.target.classList.contains('modal__content') ) closeModal()
    }
    const closeModal = () => { 
        modal.setActiveModal('')
        setName('')
     }

    const submitHandler = async e => {
        e.preventDefault()
        try {
            let responce = await createCategory({name:name})
            post.setCategories([responce.data, ...post.categories])
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
        <section className={`modal ${modal.activeModal == 'CreateCategory' ? 'show' : ''}`}>
            <div className="modal__content" onClick={(e) => closeHandler(e)}>
                <div className="modal__container">
                    <div className="modal__close" onClick={() => {closeModal()}}></div>
                        
                    <p className="title">Create category</p>
                    <form>
                        <input type="text" className="field" placeholder="Name" value={name} onChange={e => setName(e.target.value)}/>
                        <input type="submit" className='btn' value="Send" onClick={e => submitHandler(e)}/>
                    </form>
                    
                </div>
                <ToastContainer/>
            </div>
        </section>
    )
})

export default CreateCategory