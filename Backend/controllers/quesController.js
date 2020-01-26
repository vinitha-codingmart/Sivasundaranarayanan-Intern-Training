const model = require('../models')
const Answers = require('./ansController')
const Question = model.Questions
const Upvotes = model.Upvotes
const Op = require('sequelize').Op
const Tags = require('./tagController')

Questions = () => {

}

Questions.addQuestion = (questions) => {
    let { title, description, reputations, createdAt, updatedAt, UserId } = questions

    var resp = Question.create({ title, description, reputations, createdAt, updatedAt, UserId })
    return resp;
}

Questions.getAllQuestion = (tag) => {
    var promise
    if (!tag)
        promise = Question.findAll({
            attributes: ['title', 'id', 'reputations']
        })
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

    return promise

}

Questions.getQuestion = (id) => {
    var promise = Question.findAll({
        where: {
            id
        },
        include: [{
            model: model.Answers,
            include: [{
                model: model.Comments
            }]
        }]
    })
    return promise;
}

Questions.getAllUserQuestion = (UserId) => {
    var promise = Question.findAll({
        where: {
            UserId
        }
    })

    return promise
}

Questions.updateRep = async (data) => {
    let { id, reputations, UserId, flag } = data;
    var promise = Question.update({
        reputations
    }, {
        where: {
            id
        }
    })
    if (promise) {
        if (flag) {
            promise = await Upvotes.create({
                QuestionId: id,
                UserId,
                AnswerId: 0
            })
        }
        else {
            promise = await Upvotes.destroy({
                where: {
                    QuestionId: id,
                    UserId
                }

            })
        }
    } else
        return null
}

Questions.search = (text) => {
    let promise = Question.findAll({
        attributes: ['title', 'reputations', 'id'],
        limit: 10,
        include: [{
            model: model.Tags,
            attributes: ['tag', 'QuestionId']
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

Questions.checkUpvote = async (UserId, QuestionId) => {
    let promise = await Upvotes.findOne({
        attributes: ['id'],
        where: {
            UserId,
            QuestionId
        }
    })
    return promise
}

Questions.deleteQuestion = async (id) => {
    let promise = await Answers.deleteAnswerByQuestionId(id)
    promise = await Tags.deleteTagByQuestionId(id)
    promise = await Upvotes.destroy({ where: { QuestionId: id } })
    promise = await Question.destroy({ where: { id } })
    return [promise];
}

module.exports = Questions