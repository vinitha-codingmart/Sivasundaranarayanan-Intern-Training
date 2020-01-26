const model = require('../models')
const Answer = model.Answers
const Upvotes = model.Upvotes
const Comment = require('./cmntController')


Answers = () => {

}

Answers.addAnswer = (answer) => {
    let { QuestionId, content, reputations, createdAt, UserId, updatedAt } = answer

    var result = Answer.create({ QuestionId, content, reputations, createdAt, UserId, updatedAt })
    return result;
}

Answers.getAnswerCount = (QuestionId) => {
    var result = Answer.findAndCountAll({
        where: {
            QuestionId
        }
    })
    return result;
}

Answers.getAnswer = (QuestionId) => {
    var promise = Answer.findAll({
        where: {
            QuestionId
        }
    })
    return promise;
}

Answers.updateRep = async (data) => {
    let { id, reputations, UserId, flag } = data;
    var promise = await Answer.update({
        reputations
    }, {
        where: {
            id
        }
    })
    if (promise) {
        if (flag) {
            promise = await Upvotes.create({
                QuestionId: 0,
                UserId,
                AnswerId: id
            })
        } else {
            promise = await Upvotes.destroy({
                where: {
                    AnswerId: id,
                    UserId
                }
            })
        }
        return promise
    } else
        return null
}

Answers.deleteAnswerByQuestionId = async (QuestionId) => {
    let answer = await Answer.findOne({ where: { QuestionId } })
    let promise, promises;

    while (answer) {
        promise = await Comment.deleteCommentByAnswerId(answer.id)
        promise = await model.Upvotes.destroy({ where: { AnswerId: answer.id } })
        promises.push(await answer.destroy())
        answer = await findOne({ where: { QuestionId } })
    }

    return promises
}

Answers.deleteAnswer = async (id) => {
    let promise = await Comment.deleteCommentByAnswerId(id)
    promise = await model.Upvotes.destroy({ where: { AnswerId: id } })
    promise = await Answer.destroy({ where: { id } })

    return promise
}

Answers.checkUpvote = async (UserId, AnswerId) => {
    let promise = await Upvotes.findOne({
        attributes: ['id'],
        where: {
            UserId,
            AnswerId
        }
    })
    return promise
}

module.exports = Answers