const User = require('../models/User');
const Item = require('../models/Item');
const Order = require('../models/Order');
const { SECRET_KEY } = require('./../utils/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateJwt = (id, email, role) => jwt.sign({ id, email, role }, SECRET_KEY, { expiresIn: '12h' });

class UserController {
    async auth(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, SECRET_KEY);
            const data = await User.findById(decoded.id).select('-password')

            res.status(200).json(data)

        } catch (e) {
            res.status(401).json('Ошибка при авторизации')
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json('Please fill in all fields');
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json('User not found');
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json('Invalid password');
            }

            const token = generateJwt(user._id, user.email, user.role);
            return res.json({ token });

        } catch (e) {
            res.status(400).json('Ошибка при входе в систему')
        }
    }



    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json('Please fill in all fields');
            }

            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json('User with this email already exists');
            }

            const hashPassword = await bcrypt.hash(password, 5);
            const newUser = new User({ name: name, email: email, password: hashPassword });
            newUser.save()

            const token = generateJwt(newUser._id, newUser.email, newUser.role);
            return res.status(200).json({ token });
        } catch (e) {
            res.status(400).json('Ошибка при регистрации')
        }
    }

    async wishlist(req, res) {
        try {
            const { arr } = req.body
            const { id } = req.user

            await User.findById(id).updateOne({ wishList: arr });

            res.sendStatus(200);
        } catch (e) {
            res.status(400).json('Ошибка при обновлении списка желаемого')
        }
    }

    async getWishList(req, res) {
        try {
            const { id } = req.user
            const { wishList } = await User.findById(id).select('wishList');

            if (!wishList) {
                return res.status(400).json('Ваша корзина пуста')
            }

            const data = await Item.find({ _id: wishList })
            res.status(200).json({ data })
        } catch (e) {
            res.status(400).json('Ошибка при поиске списка желаемого')
        }
    }

    async basket(req, res) {
        try {
            const { arr } = req.body
            const { id } = req.user

            await User.findById(id).updateOne({ basket: arr });

            res.sendStatus(200);
        } catch (e) {
            res.status(400).json('Ошибка при обновлении корзины')
        }
    }

    async getBasket(req, res) {
        try {
            const { id } = req.user
            const { basket } = await User.findById(id).select('basket');

            if (!Object.keys(basket).length) {
                return res.status(400).json('Ваша корзина пуста')
            }

            let data = await Item.find({ _id: Object.keys(basket) })
            res.status(200).json({ data })
        } catch (e) {
            res.status(404).json('Ошибка при поиске корзины')
        }
    }

    async order(req, res) {
        try {
            const { phone, name, info } = req.body.info
            const { id } = req.user

            const { basket } = await User.findById(id).select('basket');

            const newOrder = new Order({ userId: id, phone: phone, name: name, info: info, items: basket, status: 3 });
            newOrder.save();

            res.status(200).json('Заказ создан')
        } catch (e) {
            res.status(400).json('Ошибка при создании заказа')
        }
    }

    async getOrders(_, res) {
        try {
            const data = await Order.find();
            res.status(200).json({ data });
        } catch (e) {
            res.status(400).json('Ошибка при поиске заказов');
        }
    }

    async updateOrder(req, res) {
        try {
            const { id, status } = req.body

            await Order.findOne({ _id: id }).updateOne({ status: status });

            res.status(200).json('Заказ обновлен');
        } catch (e) {
            res.status(400).json('Ошибка при поиске заказов');
        }
    }
}

module.exports = new UserController();