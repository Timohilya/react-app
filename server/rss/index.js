var cron = require('node-cron');
const Parser = require("rss-parser");
const {Post, Category} = require('../models/models')

cron.schedule('*/10 * * * *', () => {
    console.log('Check https://lifehacker.com/rss on new posts');
    (async function main() {

        const parser = new Parser()
        const feed = await parser.parseURL("https://lifehacker.com/rss")
        let items = feed.items

        try {
            await pasrceCategories(items)
        } catch (e) {
            console.log('ERROR: Parse categories on exist in db. ', e)
        }

        try {
            await pasrcePosts(items)
        } catch (e) {
            console.log('ERROR: Parse posts on exist in db. ', e)
        }

    })();
});

async function pasrceCategories(items) {
    await items.forEach(async item => {
        await item.categories.forEach(async category => {
            const nameExist = await Category.findOne({where: {name: category}})
            if ( nameExist ) return
            await Category.create({name: category})
        })
    })
}

async function pasrcePosts(items) {
    await items.forEach(async item => {
        try {
            const titleExist = await Post.findOne({where: {title: item.title}})
            if ( titleExist ) return
        } catch (e) {
            console.log('ERROR: pasrcePosts ', e)
        }

        try {
            await createPost(item)
        } catch (e) {
            console.log('ERROR: Post create ', e)
        }
    })
}

async function createPost(item) {
    const data = {
        title: item.title, 
        description: item.content.slice(item.content.indexOf('>')+1,item.content.length),
        creator: item['dc:creator'], 
        img: item.content.slice(item.content.indexOf('src="')+5,item.content.indexOf('>')-3)
    }
    const post = await Post.create(data)

    const categoryRow = await Category.findAll({where: {name: item.categories}});
    await post.addCategory(categoryRow, { through: 'post_category'});  
}