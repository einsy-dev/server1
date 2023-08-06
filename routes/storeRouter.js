const Router = require('express');
const router = new Router();
const storeController = require('../controllers/storeController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.get('/', storeController.getAll);
router.get('/:id', storeController.getOne);
router.post('/create', checkRoleMiddleware('ADMIN'), storeController.create);

module.exports = router;