/* external */
require('dotenv').config();
// process.loadEnvFile()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express();
/* controller */
const mongoose = require('mongoose')
const paymentRouter = require('./routes/payment')
const communityRouter = require('./routes/communityForum')
const blogRouter = require('./routes/blog');
const commentRouter = require('./routes/comments')
const userRouter = require('./routes/user');
const dashboardRouter = require('./routes/dashboard')
/* middleware */
const corsMiddleware = require('./middlewares/corsMiddleware');
const meetRouter = require('./routes/meeting');
const contactRouter = require('./routes/contact');

const dbURL = process.env.DB_URL

mongoose.connect(dbURL).then(() => { 
  console.log('connected to db');
}).catch((e) => {
  console.log('Error', e);
})

app.use(corsMiddleware);
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());

app.use('/api', paymentRouter.routes)
app.use('/community', communityRouter.routes)
app.use('/api/blog', blogRouter);
app.use('/user',userRouter);
app.use('/', commentRouter.routes)
app.use('/dashboard', dashboardRouter.routes);
app.use('/meeting', meetRouter);
app.use('/contact', contactRouter);

const port = process.env.PORT || 6002;
app.listen(port, () => {
  console.log('server started')
})
