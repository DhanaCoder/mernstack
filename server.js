// IMPORT THE NEEDED LIBRARIES
const express = require('express');
const mongoose = require('mongoose');
// CREATING A SCHEMA IN ANOTHER  FILE AND REQUIRING IT HERE.
const TaskSchema = require('./model');
const cors = require('cors');
// ASSIGN APP TO EXPRESS JS
const app = express();
// LINKING THE MANGO DB URL
mongoose.connect('mongodb+srv://dhana:dhana%23123%40@atlascluster.bjy9qje.mongodb.net/?retryWrites=true&w=majority').then(
    ()=> console.log('DB connected')
)
// USEIG THE JSON FORMATE
app.use(express.json());
app.use(cors({
    origin:'*'
}));
// CREACTE A POST TASK ROUTE
app.post('/addtask',async(req, res) => {
    const {todo} = req.body;
    try{
        const newDate = new TaskSchema({
            todo : todo
        });
        await newDate.save();
        return res.json(await TaskSchema.find()); 

    }
    catch(err){
        console.log(err);
    }
})
// CREATETING A GET TASK ROUTE
app.get('/gettask',async(req,res) => {
    try{
        return await res.json(await TaskSchema.find())
    }
    catch(err){
        console.log(err);
    }
})
// CREATEING A DELETE TASK ROUTE
app.delete('/delete/:id', async(req, res) => {
    try{
        await  TaskSchema.findByIdAndDelete(req.params.id);
        return res.json(await TaskSchema.find());
    }
    catch(err){
        console.log(err);
    }
})


// ADD APP TO THE SERVER OR LOCAL HOST
app.listen(5000,() => console.log('Server is running...'));