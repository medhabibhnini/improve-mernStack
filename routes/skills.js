const router =require('express').Router()
const softSkill = require('../controllers/skillsCtrl')
router.post('/ajoutSoft',softSkill.create)
router.put('/updateSoft/:id',softSkill.updateSoftSkills)
router.get('/softskills',softSkill.getAllSoftSkillz)
router.delete('/deleteskills/:id',softSkill.deleteSoftskill)
router.get('/getsoft/:id',softSkill.getSoftSkillsById)


module.exports=router