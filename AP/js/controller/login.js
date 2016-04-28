(function(){
    class Login{
        static init(){
            console.log("login");
            addEventListener();
        }
    }
    
    function addEventListener(){
        $("#login-button").on('click',() => {
            var email = $("#email").val();
            var password = $("#password").val();
            verifyLogin(email,password);
        });
    }
    
    function verifyLogin(email,password){
        var postData = {
            email : email,
            password : password
        };
        $.ajax({
           type : "post",
           url : "http://localhost:8999/verifyLogin",
           data : postData,
           success : function(result){
               if(result){
                   goToIndex();
               }else{
                   alert("Email or Password is invalid");
               }
           },
           error(err){
               console.log(err);
           }
        });
    }
    
    function goToIndex(){
        location.href = location.href.replace(/login/,"index");
    }
    
    Login.init();
})();