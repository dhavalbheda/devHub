const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')
const app = express();
app.use(cors())

// Connect Database
connectDB();

// Init Body Parser
app.use(express.json({extended: false}));

// Define All Router
app.get('/check', (req, res) => res.send('Server Running'))
app.use('/api/users', require('./routes/user'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/posts', require('./routes/posts'))
app.use('/api/profile', require('./routes/profile'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`);
})