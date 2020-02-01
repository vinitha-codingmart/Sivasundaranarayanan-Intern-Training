module.exports = (app, db) => {
    const MongoDB = require('mongodb')

    app.get('/tasks', (req, res) => {
        if (req.query.ProjectId)
            req.query.ProjectId = MongoDB.ObjectID(req.query.ProjectId)

        if (req.query._id)
            req.query._id = MongoDB.ObjectID(req.query._id)

        if (req.query.TaskId)
            try {
                req.query.TaskId = MongoDB.ObjectID(req.query.TaskId)
            } catch (e) {
                req.query.TaskId = null
            }
        console.log(req.query)

        db.collection('Tasks').find(req.query).toArray((err, docs) => {
            res.send(docs)
        })
    })

    app.post('/tasks', (req, res) => {
        let { dueDate, title, ProjectId, priority, completed, TaskId } = req.body
        if (TaskId != 'null')
            TaskId = MongoDB.ObjectID(TaskId)
        else
            TaskId = null
        db.collection('Tasks').insertMany([
            { dueDate, title, ProjectId, priority, completed, TaskId }
        ], (err, docs) => {
            res.send(docs)
        })
    })

    app.get('/projects', (req, res) => {
        db.collection('Projects').find().toArray((err, docs) => {
            res.send(docs)
        })
    })

    app.post('/projects', (req, res) => {
        let { title, color } = req.body
        db.collection('Projects').insertMany([
            { title, color }
        ], (err, docs) => {
            res.send(docs)
        })
    })

    app.post('/priorities', (req, res) => {
        let { title } = req.body
        db.collection('Priority').insertMany([
            { title }
        ], (err, docs) => {
            res.send(docs)
        })
    })

    app.get('/priorities', (req, res) => {
        db.collection('Priority').find().toArray((err, docs) => {
            res.send(docs)
        })
    })
}