const SoftSkills = require('../models/SoftSkills')

const softSkills ={
 create : async(req,res)=>
 {
try{
    const {title,description,type}= req.body 
    if(!title || !description || !type)
    return res.status(400).json({msg:"please fill in all field"})
const newSoft = new SoftSkills({title,description,type})
await newSoft.save()
res.json({msg :"soft skills has been enregistred"})

}catch(err){ return res.status(500).json({msg:err.message})
}

 },
 updateSoftSkills : async(req,res) =>
 {
try {
const {title,description,type}= req.body 
await SoftSkills.findByIdAndUpdate({_id: req.params.id},{title,description,type})
res.json({msg: "Update Success!"})
}
catch(err)
{
return res.status(500).json({msg: err.message})
}
 },
getAllSoftSkillz : async (req,res)=>
{try 
    {
const skills = await SoftSkills.find();
res.json(skills)
    }
    catch(err)
    {
        return res.status(500).json({msg: err.message})

    }


},
deleteSoftskill : async (req,res)=>
{
try {
    await SoftSkills.findByIdAndDelete(req.params.id)

    res.json({msg: "Deleted Success!"})
} catch (err) {
    return res.status(500).json({msg: err.message})
}},
getSoftSkillsById : async (req,res)=>
{
    try {
        const skill = await SoftSkills.findById(req.params.id)

        res.json(skill)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

}
}
module.exports =softSkills
