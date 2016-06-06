(function(root){
    var AJAX = {
        get: function(callback){
            $.ajax({
                "type": "GET",
                "url": this.url,
                "success": function(result){
                    callback(result);
                },
                "error": function(err){
                    console.log(err);
                }
            });
        },
        post: function(callback){
            $.ajax({
                "type": "POST",
                "url": this.url,
                "data": this.postData,
                "success": function(result){
                    callback(result);
                },
                "error": function(err){
                    console.log(err);
                }
            });
        }
    };
    
    root.AJAX = AJAX;
})(this);