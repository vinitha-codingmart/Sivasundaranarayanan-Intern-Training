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

module.exports = Tags
