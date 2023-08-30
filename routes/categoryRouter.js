const Router = require('express');
const router = new Router();
const categoryController = require('../controllers/categoryController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.get('/', categoryController.getAll)
router.post('/create', checkRoleMiddleware('ADMIN'), categoryController.create);
router.delete('/delete', checkRoleMiddleware('ADMIN'), categoryController.delete)

module.exports = router;