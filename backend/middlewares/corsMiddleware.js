const cors = require("cors");

const corsMiddleware = (req, res, next) => {
  const options = {
    origin: process.env.FRONTEND_URL, 
    credentials: true,
    optionSuccessStatus: 200,
    exposedHeaders: ["accessToken"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE",
    allowedHeaders: "Content-Type, Authorization, accesstoken, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers",
    maxAge: 7200
  };

  cors(options)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: "CORS error" });
    }
    next();
  });
};

module.exports = corsMiddleware;
