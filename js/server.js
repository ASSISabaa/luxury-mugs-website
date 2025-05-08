// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dashboard'));

mongoose.connect('mongodb://localhost:27017/luxuryMugs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const User = mongoose.model('User', {
  email: String,
  password: String,
  resetToken: String,
  resetTokenExpires: Date
});

// Route: Forgot Password
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(200).send(); // Don't reveal if email not found

  const token = uuidv4();
  user.resetToken = token;
  user.resetTokenExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const resetLink = `http://localhost:5000/reset-password.html?token=${token}`;
  await sendEmail(email, 'Reset your password', `Click the link to reset: ${resetLink}`);

  res.status(200).send();
});

// Nodemailer setup
async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sabaa.assi2911@gmail.com',
      pass: '12345678'
    }
  });

  await transporter.sendMail({
    from: 'MUGORA <your-email@gmail.com>',
    to,
    subject,
    text
  });
}

app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));
