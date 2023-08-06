const Category = require("../models/Category");

class CategoryController {
    async getAll(req, res) {
        try {
            const category = await Category.find();
            const result = [];
            category.forEach(item => {
                result.push(item.value);
            })
            res.status(200).json(result);
        } catch (error) {
            console.log(error)
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

    }
}

module.exports = new CategoryController()