import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import userRouter from './routes/auth.js';
import reportRouter from './routes/report.js'
import bcrypt from 'bcrypt'
dotenv.config();

const app = express();

// Array of allowed origins
const allowedOrigins = ['https://she-shield-r5c8.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions)); // Handle preflight requests


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET, {
  httpOnly: true,
  sameSite: 'strict',
  secure: true
}));





app.use('/', routes);
app.use('/auth',userRouter);
app.use('/report',reportRouter);
app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: 404
  });
});
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

export default app;
