const Category = require("../models/Category");

class CategoryController {
    async getAll(_, res) {
        try {
            const category = await Category.find();
            res.status(200).json(category);
        } catch (error) {
            console.log(error)
            res.status(400).json('Ошибка на сервере')
        }
    }

    async create(req, res) {
        try {
            const { value } = req.body;

            if (!value) {
                return res.status(400).json({ message: 'Please fill in all fields' })
            }

            const hasBeenCreated = await Category.findOne({ value: value });

            if (hasBeenCreated) {
                return res.status(200).json({ message: 'Категория уже существует' })
            }

            const newCategory = new Category({ value: value })
            newCategory.save()
            res.status(200).json({ message: 'Категория создана' })
        } catch (error) {
            res.status(400).json('Ошибка на сервере')
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.body
            await Category.findByIdAndDelete({ _id: id })
            res.status(200).json('Категория удалена')
        } catch (error) {
            res.status(400).json('Ошибка на сервере')
        }
    }
}

module.exports = new CategoryController()