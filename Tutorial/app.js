

var express = require('express');
var nodemailer = require('nodemailer');

var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/images')));
console.log(__dirname); 

app.get('/', function(req, res){
    //Response send to client side    
res.render('index', {title:'Welcome'});
});

app.get('/about', function(req, res){
    //Response send to client side    
 res.render('about')
});

 app.get('/contact', function(req, res){
     //Response send to client side    
 res.render('contact')
 });

app.post('/contact/send', function(req, res){
    
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {         
               user: '',
               pass:''
        }
    });

     var mailOptions = {
    from: 'Maitreyi Jadhav <maitreyijadhav95@gmail.com>',

    //Preferred email goes here
    to: 'maitreyijadhav95@gmail.com',
    subject:'Color-Me',
    html: '<p style="font-weight:bold;">You have a new message from </p>' + '---' + req.body.name  + '<p style="font-weight:bold;">Contact Information</p>' + '---' + req.body.email +
     '<p style="font-weight:bold;">Message says..</p>' + '---' + req.body.message,
};

transporter.sendMail(mailOptions, function(error, info){

    if(error){
        console.log('Sorry, your email was not sent');
        res.redirect('/');
    } else{

        console.log('Message successfully send' + info.response);
        res.redirect('/');
    }
});
});

app.listen(3000);
//response on server side 

console.log('Server is running on 3000');




