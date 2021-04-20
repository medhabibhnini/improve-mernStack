const router = require('express').Router()
const commentCtrl = require('../controllers/commentCtrl')

router.get('/comments/:id', commentCtrl.getComments)
//router.post('/comment', commentCtrl.addComment)
module.exports = router