const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const res = require('express/lib/response');

const { getMaxListeners } = require('process');

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
app.use('/api/respondent', require('./server/routes/respondent.routes'));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
}



//init server connection
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});