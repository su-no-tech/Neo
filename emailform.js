const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');

const path = require('path');

const app = express();

// View engine setup

app.engine('handlebars', exphbs());

app.set('view engine', 'handlebars');

// Body Parser Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));




app.get('/', (req, res) => {
    res.render('contact');
});


app.post('/send', (req, res)=>{
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
        <li>First Name: ${req.body.firstName}</li>
        <li>Last Name: ${req.body.lastName}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone Number: ${req.body.telNumber}</li>
    
    </ul>
    <h3>Message</h3>
    <p>${req.body.contents}</p>

    `;
        
    let transporter = nodemailer.createTransport({
        host: "mail.website.com", // SMTP SERVER
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'user@website.com', // default Email Address
          pass: 'password' // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
      });
    
      // send mail with defined transport object
      let mailOptions = {
        from: '"Your Name" <test@default.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "CONTACT REQUEST", // Subject line
        text: "Hello from customers", // plain text body
        html: output // html body
      };
    
      transporter.sendMail(mailOptions, (error, info) =>{
          if(error){
              return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

          res.render('contact', {msg: 'Email has been sent'});
      });
      




});

app.listen(3000, ()=> console.log('Server Started...'));

