
const ListSoft =require('../models/UserSoftSkills')
const listsoft ={
create : async (req,res)=>
{
try{ 
    const{score,UserId}=req.body;
    SkillId=req.params.id
    console.log(req.params)
    if(!score || !UserId || ! SkillId)
    return res.status(400).json({msg:"please fill in all field"})
const newSkill = new ListSoft({score,UserId,SkillId})

await newSkill.save();
res.json({msg :"Soft skills has been enregistred to user List"})


}catch(err)
{
    return res.status(500).json({msg:err.message})
}

},
updateListSoft : async(req,res)=>
{
    try{
        const{score,userId,skillId}=req.body;

        await ListSoft.findByIdAndUpdate({_id: req.params.id},{score,userId,skillId})

        res.json({msg: "Update Success!"})

    }
    catch(err){
        return res.status(500).json({msg: err.message})

    }
},
getListSoft: async(req,res)=>
{
    try{
        const skills = await ListSoft.find();
        res.json(skills)
    }catch(err)
    {
        return res.status(500).json({msg: err.message})

    }
},
findByUser : async(req,res)=>
{
try{
    const skills = await ListSoft.find({UserId: req.params.id});
    
    res.json(skills);
} catch(err)
{
    return res.status(500).json({msg: err.message})


}

},
getNomSkills : async(req,res)=>
{

    try{
        const skills = await ListSoft.find({UserId: req.params.id}).populate({path :'SkillId',select:'title  -_id'}).select('title  -_id');
        
        res.json(skills);
    } catch(err)
    {
        return res.status(500).json({msg: err.message})
    
    
    }


},findUsersScore : async(req,res)=>{

    try{ 
        const skills = await ListSoft.find({UserId: req.params.id}).select('score  -_id');
        
        res.json(skills);
    } catch(err)
    {
        return res.status(500).json({msg: err.message})
    
    
    }

},
findBySkill :
async(req,res)=>{

    try{ 
        const{UserId}=req.body;

        const skills = await ListSoft.find({SkillId: req.params.id,UserId:UserId}).select('SkillId -_id');
        
        res.json(skills);
    } catch(err)
    {
        return res.status(500).json({msg: err.message})
    
    
    }

},
delete : async(req,res)=>
{
    try {
        await ListSoft.deleteMany({SkillId:req.params.id})
    
        res.json({msg: "Deleted Success!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

}
module.exports =listsoft