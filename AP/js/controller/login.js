(function(){
    'use strict';
    var electron = require('electron');
    var ipc = electron.ipcRenderer;
    
    class Login{
        static init(){
            console.log("login");
            addEventListener();
        }
    }
    
    function addEventListener(){
        $("#login-button").on('click',function(event){
            event.preventDefault();
            var email = $("#email").val();
            var password = $("#password").val();
            $('form').fadeOut(500);
            $('.wrapper').addClass('form-success');
            verifyLogin(email,password);
        });
        
        $("#closeButton").on('click',function(event){
            event.preventDefault();
            ipc.send('closeMainWindow');
        });
        
        $("#minButton").on('click',function(event){
            event.preventDefault();
           ipc.send('minMainWindow');
        });
    }
    
    function verifyLogin(email,password){
        var postData = {
            email : email,
            password : password
        };
        $.ajax({
           type : "post",
           url : URL.verifyLogin,
           data : postData,
           success : function(result){
               if(result.code === 1){
                   goToIndex(result.name,result.url);
               }else{
                   alert("Email or Password is invalid");
                   location.reload();
               }
           },
           error(err){
               console.log(err);
           }
        });
    }
    
    function goToIndex(name,url){
        sessionStorage.userName = name;
        sessionStorage.url = url;
        location.href = location.href.replace(/login/,"index");
    }
    
    Login.init();
})();