var Question = require('../model/quesModel');

exports.create_ques = (req, res) => {
    var question = new Question(req.body);

    Question.createQuestion(question, (err, question) => {
        if (err)
            console.log(err);
        res.json(question);
    });
}

exports.get_ques = (req, res) => {

    Question.getQuestion((err, result) => {
        if (err)
            console.log(err);
        res.json(result);
    });
}

exports.update_rep = (req, res) => {
    var { reputation, id } = req.body;
    Question.updateReputation(reputation, id, (err, result) => {
        if (err)
            console.log(err);
        res.json(result);
    });
}