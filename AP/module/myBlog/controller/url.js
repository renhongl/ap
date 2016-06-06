(function(root){
    var URL = {
        server: "http://localhost:8999/"
    };
    
    URL.request = {
        "registerUser": URL.server + "myBlog/registerUser",
        "login": URL.server + "myBlog/login"
    };
    
    root.URL = URL;
    
})(this);