import {makeAutoObservable} from "mobx"

export default class ModalState {
    constructor() {
        this._activeModal = ''
        makeAutoObservable(this)
    }

    setActiveModal(modal) {
        this._activeModal = modal
    }

    get activeModal() {
        return this._activeModal
    }
}