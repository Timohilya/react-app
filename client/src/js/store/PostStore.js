import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._categories = []
        this._titleWord = ''
        this._selectedCategory = {}
        this._posts = []
        this._page = 1
        this._totalCount = 0
        this._limit = 6
        makeAutoObservable(this)
    }

    setCategories(categories) {
        this._categories = categories
    }

    setTitleWord(word) {
        this.setPage(1)
        this._titleWord = word
    }

    setSelectedCategory(category) {
        this.setPage(1)
        this._selectedCategory = category
    }

    setPosts(posts) {
        this._posts = posts
    }

    setPage(page) {
        this._page = page
    }

    setTotalCount(count) {
        this._totalCount = count
    }

    setLimit(limit) {
        this._limit = limit
    }
       

    get categories() {
        return this._categories
    }

    get titleWord() {
        return this._titleWord
    }

    get selectedCategory() {
        return this._selectedCategory
    }

    get posts() {
        return this._posts
    }

    get totalCount() {
        return this._totalCount
    }

    get page() {
        return this._page
    }

    get limit() {
        return this._limit
    }
}
