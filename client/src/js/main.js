import React, {createContext} from 'react';  
import {createRoot} from 'react-dom/client';  
import App from './App.js';  
import UserStore from './store/UserStore.js';
import PostStore from './store/PostStore.js';
import ModalState from './components/modals/ModalState'

export const Context = createContext(null)

createRoot(document.getElementById("app")).render(
    <Context.Provider value={{
        user: new UserStore(),
        post: new PostStore(),
        modal: new ModalState()
    }}>
        <App/>
    </Context.Provider> 
);



window.addEventListener('DOMContentLoaded', () => {
    vhCreate()
})
window.addEventListener('resize', () => {
    vhCreate()
})

function vhCreate() {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
}