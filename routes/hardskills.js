const router =require('express').Router()
const hardskill = require('../controllers/hardSkillsCtrl')
router.post('/ajoutHard',hardskill.create)
router.put('/updateHard/:id',hardskill.updateHardSkills)
router.get('/hardskills',hardskill.getAllHardSkillz)
router.delete('/deleteskills/:id',hardskill.deleteHardskill)
router.get('/gethard/:id',hardskill.getHardSkillsById)


module.exports=router