const express = require('express')
const { AppDataSource } = require('../utils/db.js')
const router = express.Router()
const appRepo = AppDataSource.getRepository('Task')
require('reflect-metadata')

//Get All tasks
router.get('/',async (req,res) => {
    try {
        const tasks = await appRepo.find()
        if(!tasks) throw new Error('No task found')
        
        res.status(200).json({
            tasks,
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})
//Create a new task
router.post('/task-post',async (req,res) => {
    try {
        const task = appRepo.create(req.body)
        const result = await appRepo.save(task)
        res.status(200).json({
            message:'Task created',
            task:result
        })
    } catch (error) {
        res.status(500).json({
            message:'Failed to add task',
            error,
        })
    }
})

//Update a task
router.put('/edit/:id',async (req,res) => {
    try {
        const {id} = req.params
        const {title,description,status,DueDate} = req.body
        const task = await appRepo.findOneBy({id})
        if(title){
            task.title = title
        }
        if(description){
            task.description = description
        }
        if(status){
            task.status = status
        }
        if(DueDate){
            task.DueDate = DueDate
        }
        const updatedTask = await appRepo.save(task)
        
        res.status(200).json({
            message:'Updated Existing task',
            updatedTask,
        })
    } catch (error) {
        res.status(500).json({
            message:'not found an existing task!',
            error,
        })
    }
})

//Delete an existing task
router.delete('/:id',async (req,res) => {
    try {
        const {id} = req.params
        const task = await appRepo.findOneBy({id})
        if(!task)throw new Error('Task not found!')
        await appRepo.remove(task)
        res.status(200).json({
            message:'Task successfully Deleted'
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})
module.exports = router