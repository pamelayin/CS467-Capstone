const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const res = require('express/lib/response');

const nodemailer = require('nodemailer');

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

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
}

app.post('/send', (req, res)=>{
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: "quizbanana467@gmail.com",
            pass: "Capston467"
        }
    })

    const mailOptions = {
        from: "quizbanana467@gmail.com",
        to: req.body.email,
        subject: `${req.body.name}`,
        text: req.body.message

    }

    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log(error);
            res.json({msg: 'fail'});
        }else{
            console.log("good")
            res.json({msg: 'success'});

        }
    })
})

//init server connection
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});