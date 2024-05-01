const express = require('express')
const communityController = require('../controller/communityForum')

const router = express.Router();

router.get('/getAllQuestions', communityController.getAllQuestions);
router.post('/getQuestionById', communityController.getQuestionById);
router.post('/postQuestion', communityController.postQuestion);

exports.routes = router;
