const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const nodemailer = require("nodemailer");
const { encrypt } = require('./server/middleware/EncryptDecrypt');

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

app.post("/send/:quizId", (req, res) => {
	const quiz_id = req.params.quizId;

    const { email } = req.body;

    const emailHash = encrypt(email);

    let url = `${req.protocol}://${req.hostname}:3000/${emailHash.iv}/userInfo/${emailHash.content}/quiz/${quiz_id}`;

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "quizbanana467@gmail.com",
			pass: "OSUcapston1111",
		},
	});

    const emailText = `You have been invited to take a quiz. Please fill out each question carefully.\nClick the link to begin\n${url}`;

	const mailOptions = {
		from: "quizbanana467@gmail.com",
		to: req.body.email,
		subject: `${req.body.name}`,
		text: emailText,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
			res.json({ msg: error });
		} else {
			res.json({ msg: "success" });
		}
	});
});