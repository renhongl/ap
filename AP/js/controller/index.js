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
            ipc.send('openChatRoom',url);
        });
        
        $("#musicPlayerLink").on('click',function(){
            ipc.send('openMusicPlayer');
        });
        
        $("#loveFishLink").on('click',function(){
            ipc.send('openFishWindow');
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