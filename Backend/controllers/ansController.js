const model = require('../models')
const Answer = model.Answers

Answers = () => {

}

Answers.addAnswer = (answer) => {
    let { QuestionId, content, reputations, createdAt, UserId, updatedAt } = answer

    var result = Answer.create({ QuestionId, content, reputations, createdAt, UserId, updatedAt })
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

Answers.updateRep = (data) => {
    let { id, reputations } = data;
    let promise = Answer.update({
        reputations
    }, {
        where: {
            id
        }
    })
    console.log(promise)
    return promise
}

module.exports = Answers