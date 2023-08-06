const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const storeRouter = require('./storeRouter');
const categoryRouter = require('./categoryRouter');


router.use('/store', storeRouter)
router.use('/user', userRouter);
router.use('/category', categoryRouter);

module.exports = router;