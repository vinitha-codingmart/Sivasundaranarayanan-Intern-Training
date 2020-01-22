module.exports = app => {
    const Key = require('../config/key.json')
    const Questions = require('../controllers/quesController')
    const Answers = require('../controllers/ansController')
    const Tags = require('../controllers/tagController')
    const Users = require('../controllers/userController')
    const Upvotes = require('../models').Upvotes;
    const jwt = require('jsonwebtoken')


    const checkToken = async (req, res, next) => {
        let token = req.headers.authorization.split(' ')[1];
        if (token != null)
            try {
                let tokenAuth = jwt.verify(token, Key.tokenKey)
                let { exp } = tokenAuth
                if (exp > Date.now() / 1000) {

                    let UserId = await Users.getId(token)
                    UserId = UserId.dataValues.id
                    req.body.UserId = UserId;
                    next()

                } else {
                    res.send('401')
                }
            } catch (err) {
                res.send('401')
            } else {
            res.send('401')
        }
    }

    //Questions
    app.post('/addQuestion', checkToken, async (req, res) => {
        let { title, description, UserId } = req.body,
            reputations = 0,
            createdAt, updatedAt;
        createdAt = updatedAt = new Date()

        let question = { title, description, reputations, createdAt, updatedAt, UserId }
        var promise = await Questions.addQuestion(question)

        res.send(promise)
    })

    app.get('/getQuestion', async (req, res) => {
        let { Tag } = req.query;
        let promise = await Questions.getQuestion(Tag);
        res.send(promise)
    })

    app.put('/updateQuesRep', checkToken, async (req, res) => {
        let promise = await Questions.updateRep(req.body)
        if (typeof (promise) === 'number')
            res.send({ flag: true })
        res.send(promise);
    })


    //Tags
    app.get('/getTag', async (req, res) => {
        let { id } = req.query
        let promise = await Tags.getTag(id)
        res.send(promise)
    })

    app.get('/getQuesId', async (req, res) => {
        let { tid } = req.query
        let promise = await Tags.getQuesId(tid)
        res.send(promise)
    })

    app.post('/addTag', checkToken, (req, res) => {
        let { QuestionId, tags } = req.body
        let data = Tags.addTag(tags, QuestionId)
        res.send(data)
    })

    //Answers
    app.post('/addAnswer', checkToken, async (req, res) => {
        let { QuestionId, content, UserId } = req.body,
            reputations = 0,
            createdAt = new Date(),
            updatedAt = createdAt
        let answer = { QuestionId, content, UserId, reputations, createdAt, updatedAt }
        let result = await Answers.addAnswer(answer)
        res.send(result);
    })

    app.get('/getAnswer', async (req, res) => {
        let { id } = req.query;

        let promise = await Answers.getAnswer(id)
        res.send(promise);
    })

    app.put('/updateAnsRep', checkToken, async (req, res, next) => {
        let promise = await Answers.updateRep(req.body)
        res.send(promise);
    })


    //User
    app.post('/verifyUser', async (req, res) => {
        let promise = await Users.verifyUser(req.body)
        res.send(promise);
    })

    app.post('/createUser', async (req, res) => {
        let promise = await Users.createUser(req.body)
        res.send(promise);
    })

    app.get('/getUserName', async (req, res) => {
        let promise = await Users.getUserName(req.query.UserId);
        res.send(promise);
    })

    app.get('/reputation', checkToken, async (req, res) => {
        let UserId = req.body.UserId;
        Upvotes.findAll({
            attributes: ['QuestionId'],
            where: {
                UserId
            }
        }).then((resp) => {
            res.send(resp)
        }).catch((err) =>
            console.log('Error', err))

    })

    app.get('/logout', checkToken, (req, res) => {
        let pro = Users.signOut(req.body.UserId)
        res.send(pro)
    })

    app.get('/', checkToken, (req, res) => {
        res.send(req.body.id)
    })

    app.get('/Search', async (req, res) => {
        let { text } = req.query
        let promise = await Questions.search(text)
        res.send(promise)
    })

}