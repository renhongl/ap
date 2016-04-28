var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: '163',
    auth: {
        user: 'liang_renhong@163.com',
        pass: '111621116'
    }
});

var mailOptions = {
    from: 'liang_renhong@163.com',
    to: '1075220132@qq.com',
    subject: 'Hello',
    text: 'Hello world',
    html: '<b>test</b>'
};

var sendMail = function(){
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
      }else{
          console.log('Message sent: ' + info.response);
      }
  });
};

exports.send = function(subject,content){
  mailOptions.subject = subject;
  mailOptions.html = content;
  sendMail();
};
