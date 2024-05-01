const { Comment } = require('../models/comments');
const { questionBank } = require('../models/questionBank');


exports.getCommentByQid = async (req, res) => {
  try {
    const { qId: questionId = '' } = req.body;
    const comment = await Comment.findOne({ qId: { $eq: questionId }});
    return res.status(200).json(comment);
  } catch (err) {
    return res.status(404).json({ error: 'Parent comment not found' });
  }
} 

exports.updateComment = async (req, res) => {
  const { parentId, questionId, parentLvlCmt, ...rest } = req.body;
  try {
    const document = await Comment.findOne({ qId: { $eq: questionId }});
    
    const { parentComment } = findParentComment(document, parentId);

    if (!parentComment) {
      return res.status(404).json({ error: 'Parent comment not found' });
    }

    const newComment = {
      _id: String(new Date().valueOf()),
      parentId,
      replies: [],
      ...rest,
    };

    console.log({ newComment })

    parentComment.replies.push(newComment);

    await Comment.findOneAndUpdate({ qId: { $eq: questionId }}, document, { new: true });
    await updateTotalAnswerByQid({ parentLvlCmt, questionId });

    return res.status(201).json({ message: 'Reply added successfully' });
  } catch (error) {
    console.error('Error inserting reply:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const findParentComment = (comment, commentId) => {
  let foundComment;
  const recurFindComment = (currComment, targetId) => {
    console.log({ currId: currComment._id, targetId });

    if ((currComment._id.valueOf() || '') === targetId.toString()) {
      foundComment = currComment;
      return;
    }

    for (const reply of currComment.replies) {
      recurFindComment(reply, commentId);
    }
  };

  recurFindComment(comment, commentId);
  return {
    parentComment: foundComment,
  };
};

const updateTotalAnswerByQid = async ({
  parentLvlCmt,
  questionId,
}) => {
  if(parentLvlCmt) {
    await questionBank.findByIdAndUpdate(
      questionId, 
      { $inc: { totalAnswers: 1 } }, 
      { new: true },
    );
  }
}