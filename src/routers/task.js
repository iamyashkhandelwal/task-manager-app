const express = require('express');
const router = new express.Router();
// require('mongoose');
const Task = require('../models/task');
const auth = require('../middleware/auth');

router.post('/tasks', auth, async (req,res) => {
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,         //using spread operator
        owner: req.user._id
    })

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }

})

//GET /tasks?completed=true
// limit & skip  for pagination
//GET /tasks?limit=10&skip=0
// sorting data
//GET /tasks?sortBy=createdAt:asc/desc
router.get('/tasks', auth, async (req,res) => {
    const match = {};
    const sort = {};

    if(req.query.completed){
        match.completed = req.query.completed === 'true';
    }
    
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':');
        // console.log(parts);
        sort[parts[0]] = parts[1] === 'asc' ? 1:-1
    }

    try {
        // if(req.query.completed){
        //     const completed = req.query.completed === 'true';
        //     const tasks = await Task.find(
        //         {
        //             owner: req.user._id,
        //             completed                    
        //         }
        //     );
        //     res.send(tasks);
        // }
        // else{
        //     const tasks = await Task.find(
        //         {
        //             owner: req.user._id,                    
        //         }
        //     );
        //     res.send(tasks);
        // }
        
        
        //*** Alternative ***/
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        });
        res.send(req.user.tasks)
        
    } catch (error) {
        res.status(500).send(error);
    }

})

router.get('/tasks/:id', auth, async (req,res) => {
    const _id = req.params.id;

    try {
        //const task = await Task.findById(_id);
        const task = await Task.findOne({_id, owner: req.user._id});
        
        if(!task)
            return res.status(404).send();
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }

})

router.patch('/tasks/:id', auth, async (req,res) => {
    const _id = req.params.id;
    const allowedUpdates = ['desc', 'completed'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    })

    if(!isValidOperation)
        return res.status(400).send({"error": "Invalid Update"});

    try {
        // const task = await Task.findById(req.params.id);
        const task = await Task.findOne({_id, owner: req.user._id})

        if(!task)
            return res.status(404).send();

        updates.forEach((update) => {
            task[update] = req.body[update];
        });
        await task.save();

        // const task = await Task.findByIdAndUpdate(_id, req.body, {new:true, runValidators: true})
        
        res.send(task);
    } catch (error) {
        return res.status(500).send(error);
    }
})

router.delete('/tasks/:id', auth, async (req,res) => {
    const _id = req.params.id;

    try {
        // const deletedTask = await Task.findByIdAndDelete(req.params.id);
        const deletedTask = await Task.findOneAndDelete({_id, owner: req.user._id});

        if(!deletedTask)
            return res.status(404).send();
        res.send(deletedTask);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;