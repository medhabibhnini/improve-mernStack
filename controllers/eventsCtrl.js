const Events = require('../models/eventModel')

const events ={
 create : async(req,res)=>
 {
try{
    const {title,description,type,avatar} = req.body 
    if(!title || !description || !type || !avatar)
    return res.status(400).json({msg:"please fill in all field"})
const newEvent = new Events({title,description,type,avatar})
await newEvent.save()
res.json({msg :"events has been enregistred"})

}catch(err){ return res.status(500).json({msg:err.message})
}

 },
 updateEvents : async(req,res) =>
 {
try {
const {title,description,type,avatar}= req.body 
await Events.findByIdAndUpdate({_id: req.params.id},{title,description,type,avatar})
res.json({msg: "Update Success!"})
}
catch(err)
{
return res.status(500).json({msg: err.message})
}
 },
getAllEvents : async (req,res)=>
{try 
    {
const events = await Events.find();
res.json(events)
    }
    catch(err)
    {
        return res.status(500).json({msg: err.message})

    }


},
deleteEvent : async (req,res)=>
{
try {
    await Events.findByIdAndDelete(req.params.id)

    res.json({msg: "Deleted Success!"})
} catch (err) {
    return res.status(500).json({msg: err.message})
}},
getEventsById : async (req,res)=>
{
    try {
        const event = await Events.findById(req.params.id)

        res.json(event)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

}
}
module.exports =events
