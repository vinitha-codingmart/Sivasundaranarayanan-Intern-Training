var sql = require('./db');

var Tag = function (tag) {
    this.aid = tag.id;
    this.tags = tag.tag;
}

Tag.addTag = function (newTag, result) {
    let error, response;
    newTag.tags.map((tag) => {
        sql.query('INSERT INTO Tag (qid, tag) values (?, ?)', [newTag.aid, tag], (err, res) => {
            if (err) {
                error = err;
                response = null;
            } else {
                error = null;
                response = res;
            }
        })
    })
    result(error, response);
}

Tag.getTag = function (id, result) {
    let query = `SELECT * FROM Tag ${ (id) ? 'WHERE qid = ?' : ''}`
    sql.query(query, id, (err, res) => {
        if (err)
            result(err, null);
        else{
            result(null, res);
        }
    })
}

module.exports = Tag;