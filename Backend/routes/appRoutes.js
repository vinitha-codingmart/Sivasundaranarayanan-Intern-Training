module.exports = (app) => {
    const quesList = require('../controller/quesController');
    const ansList = require('../controller/ansController')


    //Question routes
    app.route('/getQuestion').get(quesList.get_ques);

    app.route('/addQuestion').post(quesList.create_ques);

    app.route('/updateRep').put(quesList.update_rep);
    

    //Answer routes
    app.route('/getAnswer').get(ansList.get_ans);

    app.route('/addAnswer').post(ansList.add_ans);
}