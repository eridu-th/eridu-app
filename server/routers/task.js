const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

// POST request to create a new task 
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id,
    })

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET request to get all task data 
// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};

    if (req.query.completed) {
        match.completed = req.query.completed === 'true';
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1; //createdAt: -1 // -1 is descending and 1 is ascending 
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort,
            },
        }).execPopulate();
        res.send(req.user.tasks);
    } catch (error) {
        res.status(500).send();
    }
});

// GET request to get a specific task 
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    if (_id.length !== 24) return res.status(400).send('User ID must be 24 characters long!');

    try {
        // const task = await Task.findById(_id);
        const task = await Task.findOne({ _id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
})

// PATCH request to modify data of a specific task 
router.patch('/tasks/:id', auth, async (req, res) => {
    const id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isDataAllValid = updates.every(update => allowedUpdates.includes(update))
    if (!isDataAllValid) {
        return res.status(400).send({ error: 'The input data is invalid!' });
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id, });

        if (!task) {
            return res.status(404).send();
        }

        updates.forEach(update => task[update] = req.body[update]);
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send();
    }
});

// Delete request to remove a specific task
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id);
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;