const models = require('../models')
const Tag = models.Tags
const Op = require('sequelize').Op

const Tags = () => {

};

Tags.getTag = (QuestionId) => {
    let promise;
    if (QuestionId)
        promise = Tag.findAll({
            where: {
                QuestionId
            }
        });
    else
        promise = Tag.findAll();

    return promise;
}

Tags.getQuesId = (tag) => {
    let promise = Tag.findAll({
        attributes: ['qid'],
        where: {
            tag
        }
    })
    return promise;

}


Tags.addTag = (tags, QuestionId) => {
    let data = [];
    tags.forEach(tag => {
        data = [...data, Tag.create({
            QuestionId,
            tag
        }).then((resp) => {
            res.send(resp)
        })]
    });
    return data;
}

Tags.deleteTagByQuestionId = async (QuestionId) => {
    let promise = await Tag.findOne({ where: { QuestionId } })
    let tags = [], tag

    while (promise) {
        tag = await promise.destroy()
        tags.push(tag)
        promise = await Tag.findOne({ where: { QuestionId } })
    }

    return tags
}

module.exports = Tags
