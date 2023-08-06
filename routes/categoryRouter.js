const Router = require('express');
const router = new Router();
const categoryController = require('../controllers/categoryController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.get('/', categoryController.getAll)
router.post('/create', checkRoleMiddleware('ADMIN'), categoryController.create);


module.exports = router;