module.exports = (app) => {
    const quesList = require('../controller/quesController');
    const ansList = require('../controller/ansController');
    const tagList = require('../controller/tagController')


    //Question routes
    app.route('/getQuestion').get(quesList.get_ques);

    app.route('/addQuestion').post(quesList.create_ques);

    app.route('/updateQuesRep').put(quesList.update_rep);
    

    //Answer routes
    app.route('/getAnswer').get(ansList.get_ans);

    app.route('/addAnswer').post(ansList.add_ans);

    app.route('/updateAnsRep').post(ansList.update_rep);

    app.route('/getRep').get(ansList.get_rep);

    //Tag routes
    app.route('/addTag').post(tagList.add_tag);

    app.route('/getTag').get(tagList.get_tag);
    
}