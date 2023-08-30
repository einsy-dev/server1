const Item = require('../models/Item');
const path = require('path');
const uuid = require('uuid');
const fs = require('fs')

class StoreController {
    async getAll(req, res) {
        try {
            const { category, page } = req.query;

            let data, limitPage;

            if (category === 'All') {
                data = await Item.find().limit(8).skip((page - 1) * 8)
                limitPage = Math.ceil(await Item.countDocuments() / 8);
            }
            else {
                data = await Item.find({ category: category }).limit(8).skip((page - 1) * 8)
                limitPage = Math.ceil(await Item.countDocuments({ category: category }) / 8);
            }

            res.status(200).json({ data, limitPage });
        } catch (error) {
            console.log(error)
            res.status(400).json('Ошибка на сервере')
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;

            if (!id) return res.status(400).json('Ошибка на сервере')

            const data = await Item.findOne({ _id: id });
            return res.status(200).send(data);
        } catch (error) {
            console.log(error)
            res.status(400).json('Ошибка на сервере')
        }
    }

    async create(req, res) {
        try {
            const { title, price, description, specs, category } = req.body;

            const file = req.files['file[]'];
            const images = [];

            if (!title, !price, !description, !specs, !category) {
                return res.status(400).json('Заполните все поля')
            }

            file.map(el => {
                const fileName = uuid.v4() + ".jpg"
                images.push(fileName)
                el.mv(path.resolve(__dirname, '..', 'static/images', fileName))
            })

            const newStoreItem = new Item({ title: title, price: price, description: description, specs: specs, category: category, images: images });
            newStoreItem.save()

            res.status(200).json('Item created')

        } catch (error) {
            console.log(error)
            res.status(400).json('Ошибка на сервере')
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.body;
            const element = Item.findOne({ _id: id })
            element.images?.map(el => fs.unlink(el))
            element.deleteOne()
            res.status(200).json('Item deleted')
        } catch (error) {
            console.log(error)
            res.status(400).json('Ошибка на сервере')
        }
    }

    async update(req, res) {
        try {

        } catch (error) {

        }
    }
}
module.exports = new StoreController()