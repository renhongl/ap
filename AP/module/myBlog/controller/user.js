(function (root) {
    var USER = {
        register: function(){
            var options = {
                url: URL.request.registerUser,
                postData: this
            };
            
            var callback = function (result) {
                console.log(result);
            };
            
            AJAX.post.call(options,callback);
        },
        login: function(){
            var options = {
                url: URL.request.login,
                postData: this
            };
            
            var callback = function (result) {
              console.log(result);  
            };
            
            AJAX.post.call(options,callback);
        },
        logout: function(){
            
        },
        changeInfo: function(){
            
        }
    };

    root.USER = USER;

})(this);