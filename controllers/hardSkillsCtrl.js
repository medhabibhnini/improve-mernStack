const HardSkills = require('../models/HardSkills')
const users =require('../models/userModel')
const hardSkills ={
 create : async(req,res)=>
 {
try{
    const {title,description,type,categorie}= req.body 
    if(!title || !description || !type || !categorie)
    return res.status(400).json({msg:"please fill in all field"})
const newHard = new HardSkills({title,description,type,categorie})
await newHard.save()
res.json({msg :"hard skills has been enregistred"})

}catch(err){ return res.status(500).json({msg:err.message})
}

 },
 updateHardSkills : async(req,res) =>
 {
try {
const {title,description,type,categorie}= req.body 
await HardSkills.findByIdAndUpdate({_id: req.params.id},{title,description,type,categorie})
res.json({msg: "Update Success!"})
}
catch(err)
{
return res.status(500).json({msg: err.message})
}
 },
getAllHardSkillz : async (req,res)=>
{try 
    {
const skills = await HardSkills.find();
res.json(skills)
    }
    catch(err)
    {
        return res.status(500).json({msg: err.message})

    }


},
deleteHardskill : async (req,res)=>
{
try {
    await HardSkills.findByIdAndDelete(req.params.id)

    res.json({msg: "Deleted Success!"})
} catch (err) {
    return res.status(500).json({msg: err.message})
}},
getHardSkillsById : async (req,res)=>
{
    try {
        const skill = await HardSkills.findById(req.params.id)

        res.json(skill)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

},
getUsers: async (req,res)=>
{
    try {
        const userss = await users.find({'role':'0'})

        res.json(userss)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

},
getUserById: async (req,res)=>
{
    try {
        const userss = await users.findById(req.params.id);


        res.json(userss)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

},

}
module.exports =hardSkills
