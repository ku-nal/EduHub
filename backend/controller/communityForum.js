const mongoose = require('mongoose');
/* models */
const { Comment } = require('../models/comments');
const { questionBank } = require('../models/questionBank');

exports.getAllQuestions = async (_, resp) => {
  const allQuestions = await questionBank.find().sort({ timeStamp: -1 });
  resp.send(allQuestions || []);
};

exports.getQuestionById = async (req, resp) => {
  const { qId } = req.body;
  const answer = await questionBank.findById(qId);
  resp.status(200).json(answer);
  resp.end();
};

exports.postQuestion = async (req, resp) => {
  const question = new questionBank(req.body);
  await question.save()
  .then((document) => {
    createCmtStrByQuesn({ qId: document?._id });
    resp.status(200).json(document);
  })
  .catch((err) => {
    resp.status(400).json(err);
  });
};

const createCmtStrByQuesn = async ({ qId = '0' }) => {
  const payload = {
    // _id: mongoose.Types.ObjectId,
    text: '',
    parentId: '0',
    replies: [],
    qId,
  };

  const comment = new Comment(payload);
  await comment.save()
  .then(console.log)
  .catch(console.error);
};
