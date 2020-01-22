const model = require('../models')
const Question = model.Questions
const Upvotes = model.Upvotes
const Op = require('sequelize').Op

Questions = () => {

}

Questions.addQuestion = (questions) => {
    let { title, description, reputations, createdAt, updatedAt, UserId } = questions

    var resp = Question.create({ title, description, reputations, createdAt, updatedAt, UserId })
    return resp;
}

Questions.getQuestion = (tag) => {
    var promise;
    if (!tag)
        promise = Question.findAll()
    else
        promise = Question.findAll({
            include: [{
                model: model.Tags,
                attributes: ['tag'],
                where: {
                    tag: tag
                }
            }]
        })
    console.log(promise)
    return promise;
}

Questions.updateRep = (data) => {
    let { id, reputations, UserId, flag } = data;
    var promise = Question.update({
        reputations
    }, {
        where: {
            id
        }
    })
    if (promise) {
        if (flag)
            promise = Upvotes.create({
                QuestionId: id,
                UserId,
                AnswerId: 0
            })
        else
            promise = Upvotes.destroy({
                where: {
                    QuestionId: id,
                    UserId
                }
            })
        return promise;
    } else
        return null
}

Questions.search = (text) => {
    let promise = Question.findAll({
        attributes: ['title', 'reputations', 'id'],
        limit: 10,
        include: [{
            model: model.Tags,
            attributes: ['tag','QuestionId']
        }],
        where:
        {
            [Op.or]:
                [
                    { title: { [Op.like]: `%${text}` } },
                    { title: { [Op.like]: `%${text}%` } },
                    { title: { [Op.like]: `${text}%` } }
                ]
        }

    })

    return promise
}


module.exports = Questions