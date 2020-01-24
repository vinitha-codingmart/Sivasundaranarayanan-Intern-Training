let Comment = require('../models').Comments
Comments = () => {

}

Comments.addComment = (data) => {
    let {content, UserId, AnswerId, createdAt, updatedAt} = data

    let promise = Comment.create({content, UserId, AnswerId, createdAt, updatedAt})

    console.log(promise)
    return promise
}

module.exports = Comments
