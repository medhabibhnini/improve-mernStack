const SoftSkills = require('../models/SoftSkills')
const MacroSkills =require('../models/MacroSkills')
const MicroSkills = require('../models/MicroSkills')
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

},

//Macro

createMacro : async(req,res)=>
 {
try{
    const {title,description}= req.body 
    if(!title || !description )
    return res.status(400).json({msg:"please fill in all field"})
const newMacro = new MacroSkills({title,description})
await newMacro.save()
res.json({msg :"Macro skills has been enregistred"})

}catch(err){ return res.status(500).json({msg:err.message})
}

 },


 updateMacroSkills : async(req,res) =>
 {
try {
const {title,description}= req.body 
await MacroSkills.findByIdAndUpdate({_id: req.params.id},{title,description})
res.json({msg: "Update Success!"})
}
catch(err)
{
return res.status(500).json({msg: err.message})
}
 },
 getAllMacroSkillz : async (req,res)=>
 {try 
     {
 const skills = await MacroSkills.find();
 res.json(skills)
     }
     catch(err)
     {
         return res.status(500).json({msg: err.message})
 
     }
 },
 deleteMacroskill : async (req,res)=>
 {
 try {
     await MacroSkills.findByIdAndDelete(req.params.id)
 
     res.json({msg: "Deleted Success!"})
 } catch (err) {
     return res.status(500).json({msg: err.message})
 }},
 getMacroSkillsById : async (req,res)=>
{
    try {
        const skill = await MacroSkills.findById(req.params.id)

        res.json(skill)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

},
//Micro


createMicro : async(req,res)=>
 {
try{
    const {title,description,macroId,image}= req.body 
    if(!title || !description  || ! macroId || ! image) 
    return res.status(400).json({msg:"please fill in all field"})
const newMicro = new MicroSkills({title,description,macroId,image})
await newMicro.save()
res.json({msg :"Micro skills has been enregistred"})

}catch(err){ return res.status(500).json({msg:err.message})
}

 },


 updateMicroSkills : async(req,res) =>
 {
try {
const {title,description,macroId,image}= req.body 
await MicroSkills.findByIdAndUpdate({_id: req.params.id},{title,description,macroId,image})
res.json({msg: "Update Success!"})
}
catch(err)
{
return res.status(500).json({msg: err.message})
}
 },
 getAllMicroSkillz : async (req,res)=>
 {try 
     {
 const skills = await MicroSkills.find();
 res.json(skills)
     }
     catch(err)
     {
         return res.status(500).json({msg: err.message})
 
     }
 },
 deleteMicroskill : async (req,res)=>
 {
 try {
     await MicroSkills.findByIdAndDelete(req.params.id)
 
     res.json({msg: "Deleted Success!"})
 } catch (err) {
     return res.status(500).json({msg: err.message})
 }},
 getMicroSkillsById : async (req,res)=>
{
    try {
        const skill = await MicroSkills.findById(req.params.id).populate({path :'macroId',select:'title '})

        res.json(skill)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

},
getSkillsNoun : async(req,res)=>
{

    try{
        const skills = await MicroSkills.find().populate({path :'macroId',select:'title '}).select('title description ');
        
        res.json(skills);
    } catch(err)
    {
        return res.status(500).json({msg: err.message})
    
    
    }


}






}
module.exports =softSkills
