var Answer = require('../model/ansModel');

exports.add_ans = (req, res) => {
    var answer = new Answer(req.body);

    Answer.addAnswer(answer, (err, data) => {
        if (err)
            throw err;
        res.json(data);
    })
}

exports.get_ans = (req, res) => {
    var id = req.query.id;

    Answer.getAnswer(id, (err, data) => {
        if (err)
            throw err;
        res.send(data);
    })
}
