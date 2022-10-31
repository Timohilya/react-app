import {$authHost, $host} from "./index"

export const fetchCategories = async () => {
    const {data} = await $host.get('api/category/getAll')
    return data
}

export const createCategory = async (name) => {
    const {data} = await $authHost.post('api/category/create', name)
    return data
}

export const deleteCategory = async (id) => {
    const {data} = await $authHost.post('api/category/delete', id)
    return data
}

export const fetchPosts = async (titleWord, categoryId, page, limit) => {
    const {data} = await $host.get('api/post/getAll', {params: {
        titleWord, categoryId, page, limit
    }})
    return data
}

export const fetchPost = async (id) => {
    const {data} = await $host.get('api/post/' + id)
    return data
}

export const createPost = async (formData) => {
    const {data} = await $authHost.post('api/post/create', formData)
    return data
}

export const deletePost = async (id) => {
    const {data} = await $authHost.post('api/post/delete', id)
    return data
}