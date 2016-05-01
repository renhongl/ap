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
            ipc.send('openChatRoom');
        });
        
        $("#musicPlayerLink").on('click',function(){
            ipc.send('openMusicPlayer');
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