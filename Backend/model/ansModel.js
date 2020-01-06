
var conn = require('./db')

var Answer = function (answer) {
    this.qid = answer.qid;
    this.content = answer.content;
    this.reputations = 0
}

Answer.addAnswer = function (answer, func) {
    conn.query('INSERT INTO Answers SET ?', answer, (err, resp) => {
        if (err)
            func(err, null);
        else
            func(null, resp);
    })
}

Answer.getAnswer = (id, func) => {
    conn.query('SELECT * FROM Answers WHERE qid = ?', id, (err, resp) => {
        if (err)
            func(err, null);
        else
            func(null, resp);
    })
}

Answer.updateReputation = (rep, id, func) => {
    
    conn.query('UPDATE Answers SET reputations = ? WHERE aid = ?', [rep, id], (err, resp) => {
        if (err)
            func(err, null);
        else
            func(null, resp);
    })
}

Answer.getReputation = (id, func) => {
    conn.query('SELECT reputations FROM Answers WHERE aid = ?', id, (err, resp) => {
        if (err)
            func(err, null);
        else 
            func(null, resp);
    })
}

module.exports = Answer