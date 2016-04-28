(function(){
    class Index{
        static init(){
            addEventListener();
        }
    }
    
    function addEventListener(){
        $("#chatRoomLink").on('click',function(){
            location.href = "http://localhost:8999/module/chatClient";
        });
    }
    
    
    Index.init();
})();