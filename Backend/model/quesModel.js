const sql = require('./db');

var Question = function (question) {
    this.title = question.title;
    this.description = question.desc;
    this.reputation = 0;
    this.created_at = new Date();
};

Question.createQuestion = function (newQuestion, result) {
    sql.query("INSERT INTO Questions SET ? ", newQuestion, (err, res) => {
        if (err) {
            result(err, null);
        }
        else
            result(null, res);

    });
}

Question.getQuestion = (result) => {
    sql.query("SELECT * FROM Questions", (err, res) => {
        if (err)
            result(err, null);
        else
            result(null, res);

    });
}

Question.updateReputation = (rep, id, result) => {
    sql.query("UPDATE Questions SET reputation = ? WHERE qid = ? ", [rep, id], (err, res) => {
        if (err)
            result(err, null);
        else
            result(null, res);
    });
}

module.exports = Question;