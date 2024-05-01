// Rahul Goswami
const express = require('express');
const router = express.Router();

const dashboardController = require('../controller/dashboard');

router.get('/trending-courses', dashboardController.getTrendingCourses);
router.post('/trending-courses/enroll', dashboardController.enrollNow);

exports.routes = router;