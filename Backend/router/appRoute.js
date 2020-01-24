module.exports = app => {
    const Key = require('../config/key.json')
    const Questions = require('../controllers/quesController')
    const Answers = require('../controllers/ansController')
    const Tags = require('../controllers/tagController')
    const Users = require('../controllers/userController')
    const Comments = require('../controllers/cmntController')
    const jwt = require('jsonwebtoken')


    const checkToken = async (req, res, next) => {
        let token = req.headers.authorization.split(' ')[1];
        if (token != null)
            try {
                let tokenAuth = jwt.verify(token, Key.tokenKey)
                let { exp } = tokenAuth
                if (exp > Date.now() / 1000) {
                    let UserId = (await Users.getId(token)).dataValues.id
                    req.body.UserId = UserId;
                    next()
                } else {
                    res.send('401')
                }
            } catch (err) {
                console.log(err)
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

    app.get('/getAllQuestion', async (req, res) => {
        let { Tag } = req.query;
        let promise = await Questions.getAllQuestion(Tag);
        res.send(promise)
    })

    app.get('/getUserQuestion', checkToken, async (req, res) => {
        let { UserId } = req.body
        let promise = await Questions.getAllUserQuestion(UserId);
        res.send(promise)
    })

    app.get('/getQuestion', async (req, res) => {
        let { id } = req.query;
        let promise = await Questions.getQuestion(id);
        res.send(promise)
    })

    app.put('/updateQuesRep', checkToken, async (req, res) => {
        let promise = await Questions.updateRep(req.body)
        if (typeof (promise) === 'number')
            res.send({ flag: true })
        res.send(promise);
    })

    app.get('/checkUpvote', checkToken, async (req, res) => {
        let UserId = req.body.UserId;
        let resp = await Questions.checkUpvote(UserId, req.query.id)
        res.send(resp)
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

    app.get('/getAnswerCount', async (req, res) => {
        let { id } = req.query;

        let promise = await Answers.getAnswerCount(id)
        res.send(promise);
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

    app.get('/User', checkToken, async (req, res) => {
        let { UserId } = req.body
        let promise = await Users.getUserDetails(UserId)
        res.send(promise)
    })

    app.get('/logout', checkToken, (req, res) => {
        let pro = Users.signOut(req.body.UserId)
        res.send(pro)
    })


    app.get('/', checkToken, (req, res) => {
        res.send({validUser: true})
    })

    app.get('/Search', async (req, res) => {
        let { text } = req.query
        let promise = await Questions.search(text)
        res.send(promise)
    })

    //Comment
    app.post('/addComment', checkToken, async (req, res) => {
        req.body.createdAt = new Date();
        req.body.updatedAt = new Date();

        let result = await Comments.addComment(req.body)
        console.log(result)
        res.send(result)
    })
}