const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

//init middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect to DB
connectDB();

//routes
app.use('/api/auth', require('./server/routes/auth.routes'));
app.use('/api/employer', require('./server/routes/employer.routes'));
app.use('/api/quiz', require('./server/routes/quiz.routes'));

//init server connection
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});