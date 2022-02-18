const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.static('client/build'));

app.get('*', (req, res) => 
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
);

app.post('/send', (req, res)=>{
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: "quizbanana467@gmail.com",
            pass: "OSUcapston1111"
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