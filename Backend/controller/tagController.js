var Tag = require('../model/tagModel.js');

exports.add_tag = (req, res) => {
    var newTag = new Tag(req.body);

    Tag.addTag(newTag, (err, resp) => {
        if (err)
            console.log("hai", err);
        res.send(resp);
    })
}

exports.get_tag = (req, res) => {
    var id = req.query.id;
    Tag.getTag(id, (err, resp) => {
        if (err)
            console.log(err)
        res.json(resp);
    })
}