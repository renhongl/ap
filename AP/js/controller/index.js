(function(){
    'use strict';
    var electron = require('electron');
    var ipc = electron.ipcRenderer;
    
    class Index{
        static init(){
            addEventListener();
        }
    }
    
    function addEventListener(){
        $("#chatRoomLink").on('click',function(){
            var url = URL.chatClient;
            ipc.send('openChatRoom');
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
    
    
    Index.init();
})();