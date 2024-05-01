const express = require('express');
const router = express.Router();

const commentController = require('../controller/comments');

router.post('/comments', commentController.getCommentByQid);
router.post('/comments/replyToComment', commentController.updateComment);

exports.routes = router;