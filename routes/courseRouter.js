const router = require('express').Router()
const courseCtrl = require('../controllers/courseCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/courses')
    .get(courseCtrl.getCourses)
    .post(courseCtrl.createCourse)


router.route('/courses/:id')
    .delete(courseCtrl.deleteCourse)
    .put(auth, authAdmin, courseCtrl.updateCourse)



module.exports = router