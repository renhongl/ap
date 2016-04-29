(function(){
    var server = "http://localhost:8999";
    
    var URL = {
        verifyLogin : server + "/verifyLogin",
        chatClient : server + "/module/chatClient"
    };
    
    window.URL = URL;
})();