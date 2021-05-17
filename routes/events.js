const router =require('express').Router()
const event = require('../controllers/eventsCtrl')
router.post('/ajoutEvent',event.create)
router.put('/updateEvent/:id',event.updateEvents)
router.get('/events',event.getAllEvents)
router.delete('/deleteevents/:id',event.deleteEvent)
router.get('/getevent/:id',event.getEventsById)
router.get('/calendar',event.getAllEvents)


module.exports=router