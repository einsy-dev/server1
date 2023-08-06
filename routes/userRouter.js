const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.get('/auth', userController.auth)
router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/wishlist', authMiddleware(), userController.wishlist);
router.get('/wishlist', authMiddleware(), userController.getWishList);
router.post('/basket', authMiddleware(), userController.basket);
router.get('/basket', authMiddleware(), userController.getBasket);
router.post('/order', authMiddleware(), userController.order);
router.get('/orders', checkRoleMiddleware('ADMIN'), userController.getOrders);
router.patch('/orders', checkRoleMiddleware('ADMIN'), userController.updateOrder);

module.exports = router;