const Store = require('../models/Store');
const LightStore = require('../models/LightStore');
const path = require('path');
const uuid = require('uuid');

class StoreController {
    async getAll(req, res) {
        try {
            const { category, page } = req.query;

            if (category === 'All') {

                const data = await LightStore.find().limit(8).skip((page - 1) * 8)
                const limitPage = Math.ceil(await LightStore.countDocuments() / 8);

                return res.status(200).json({ data, limitPage });
            }

            res.status(200).json('KJWGWEJEGW');
        } catch (error) {
            console.log(error)
            res.status(400).json('Ошибка на сервере')
        }

    }

    async getOne(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json('Заполните все поля')
        }

        const data = await Store.findOne({ id: id })
        return res.status(200).send(data);
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
                let fileName = uuid.v4() + ".jpg"
                images.push(fileName)
                el.mv(path.resolve(__dirname, '..', 'static/images', fileName))
            })


            const id = uuid.v4();
            const shortDescription = description.substring(0, 80);

            const newStoreItem = new Store({ id: id, title: title, price: price, description: description, specs: specs, category: category, images: images });
            const newLightStoreItem = new LightStore({ id: id, title: title, price: price, description: shortDescription, images: images[0] });
            newStoreItem.save()
            newLightStoreItem.save()

            res.status(200).json('All right')

        } catch (error) {
            console.log(error)
            return res.status(400).json('Ошибка на сервере')
        }
    }
}
module.exports = new StoreController()