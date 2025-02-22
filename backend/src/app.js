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
const allowedOrigins = ['http://localhost:3000','http://localhost:5000'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization','x-auth-token'],
  credentials: true,
};

// Use CORS middleware with options
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET, {
  httpOnly: true,
  sameSite: 'strict',
  secure: true
}));

app.post("/test-password", async (req, res) => {
  try {
      const { password } = req.body;

      // Stored hash from your database
      const storedHash = "$2b$10$hkn9A01Ai6Oihaa6BKKutezstQthdmQ0s//GR836u/8w/4wSShtKC";

      console.log("Entered Password:", password);
      console.log("Stored Hash:", storedHash);

      // Hash the entered password to see if it matches
      const newHash = await bcrypt.hash(password, 10);
      console.log("New Hash (for debugging):", newHash);

      const isMatch = await bcrypt.compare(password, storedHash);
      console.log("Password Match Result:", isMatch);

      return res.json({
          success: isMatch,
          message: isMatch ? "Password matched!" : "Invalid credentials",
          debug: {
              enteredPassword: password,
              storedHash,
              newHash, // For debugging
              passwordMatch: isMatch,
          }
      });

  } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
  }
});


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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

export default app;
