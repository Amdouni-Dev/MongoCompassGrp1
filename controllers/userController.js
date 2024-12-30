const mongoDB=require('mongodb')
const {connectToDatabase}=require('../config/database')

// Creer un utilisateur
 const adduser=async(req,res)=>{
try{
  const {firstName,lastName}=req.body;
  const db=await connectToDatabase();
  const result =await db.collection('students').insertOne({firstName,lastName})
  res.status(200).json({message:"user added successfully !", result }  )
}catch{
res.status(500).json({message:"error creating user"})
}
} 

// get All students
const getAllStudents=async(req,res)=>{
try{
  const db=await connectToDatabase();
  const result=await db.collection('students').find().toArray()
  console.log(result)
  res.status(201).json(result)
}
catch(error){
res.status(500).json({message:error.message})
}
}
const updateStudent=async(req,res)=>{
try {
  const {userId}=req.params 
  const {firstName,lastName }=req.body
  
  const db=await connectToDatabase();
const result=await db.collection('students').updateOne(
  { _id:new mongoDB.ObjectId(userId) },
  {$set:{firstName,lastName}} )
  res.status(200).json({message:"User updated successfully",result})
} catch (error) {
  res.status(500).json({err:error.message})
}
}

const deleteUser=async(req,res)=>{
try {
  const {userId}=req.params
  const db= await connectToDatabase()
  const student=await db.collection('students').findOne({_id:new mongoDB.ObjectId(userId)} )
  if(!student){
    res.status(404).json({message:"User not found!"})
  }
  const result=await db.collection('students').deleteOne(
{_id: new mongoDB.ObjectId(userId)}  ) 
res.status(200).json({message:"User deleted Successfully",result})

} catch (error) {
  res.status(500).json({message:error.message})
}

}

const getUsersWithAggregation=async(req,res)=>{
  try {
    const db=await connectToDatabase()
    const pipeline=[
      {$group:{ _id:'$age' ,
    totalUsers:{$sum:1}
    }},
    {$sort:{_id:1}}
     ]
     const users=await db.collection('students').aggregate(pipeline).toArray()
     res.status(200).json({users})
  } catch (error) {
    res.status(500).json({err:error.message})
  }
}

// TO DO
/**
 // ajout /find
 // update:Mise a jour / delete , exemple d'aggregation ,insertMany

 */

module.exports ={adduser,getAllStudents,updateStudent,deleteUser,getUsersWithAggregation}























/*const { connectToDatabase } = require('../config/database');

// CREATE - Add a new user
const createUser = async (req, res) => {
  try {
    const { name, age } = req.body;
    const db = await connectToDatabase();
    const result = await db.collection('users').insertOne({ name, age });
    res.status(201).json({ message: 'User created successfully', userId: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

// READ - Get all users
const getUsers = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const users = await db.collection('students').find().toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// READ - Get a specific user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectToDatabase();
    const user = await db.collection('students').findOne({ _id: new require('mongodb').ObjectId(id) });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

// UPDATE - Update user by ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age } = req.body;
    const db = await connectToDatabase();
    const result = await db.collection('students').updateOne(
      { _id: new require('mongodb').ObjectId(id) },
      { $set: { name, age } }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'User not found or no changes made' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

// DELETE - Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectToDatabase();
    const result = await db.collection('students').deleteOne({ _id: new require('mongodb').ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};

// READ - Get all users with aggregation (grouped by age)
const getUsersWithAggregation = async (req, res) => {
    try {
      const db = await connectToDatabase();
      
      // Aggregation pipeline
      const pipeline = [
        {
          $group: {
            _id: "$age",   // Group by age
            totalUsers: { $sum: 1 }  // Count users in each age group
          }
        },
        {
          $sort: { _id: 1 }  // Sort by age
        }
      ];
      
      const users = await db.collection('students').aggregate(pipeline).toArray();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
    }
  };
  

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUsersWithAggregation
};
*/