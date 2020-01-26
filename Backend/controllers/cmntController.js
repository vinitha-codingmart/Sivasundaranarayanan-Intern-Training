let Comment = require('../models').Comments
Comments = () => {

}

Comments.addComment = (data) => {
    let { content, UserId, AnswerId, createdAt, updatedAt } = data

    let promise = Comment.create({ content, UserId, AnswerId, createdAt, updatedAt })

    console.log(promise)
    return promise
}

Comments.deleteCommentByAnswerId = async (AnswerId) => {
    let Ids = [], cmt
    let comment = await Comment.findOne({ where: { AnswerId } })

    while (comment) {
        cmt = await comment.destroy();
        Ids.push(cmt)
        comment = await Comment.findOne({ where: { AnswerId } })
    }

    return Ids
}

module.exports = Comments
