/**
 *
 */
(function(PlayerModule){
  var electron = require('electron');
  var ipc = electron.ipcRenderer;
  
  var conf = {
    playingId : 0,
    playingName : "",
    playingThread : null,
    logoShowThread : null,
    logoColor : ['red','blue','green','white','purple','teal','amber'],
    currentVolume : 0.3,
    isListLoop : true,
    currentTime : 0,
    totalTime : 0,
    musicLength : 0,
    currentPage : 1,
    showNumber : 16,
    data : "",
    totalPage : 0,
    getDataPath : "",
    themeNumber : 0
  };

  PlayerModule.Player = function(){
    init();
  };

  function init(){
    $("#container").load("Modules/Player/player.html",function(){
      configPlay();
      addEventListener();
      initSlider();
      loadMusic();
    });
  }

  function addEventListener(){
    $("button").focus(function(){this.blur();});
    $("#close").on('click',closeWindow);
    $("#minimize").on('click',minimizeWindow);
    $("#turnUp").on('click',showVolumeControl);
    $("#pause").on('click',pauseMusic);
    $("#next").on('click',playNext);
    $("#last").on('click',playLast);
    $("#order").on('click',orderList);
    $("#submit").on('click',submitConf);
    $("#config").on('click',function(){
      $("#configWindow").fadeIn();
    });
    $("#closeConfig").on('click',function(){
      $("#configWindow").fadeOut();
    });
  }

  function submitConf(){
    $("#configWindow").fadeOut();
    conf.getDataPath = $("#musicPath").val();
    loadMusic();
    conf.themeNumber = $("#themeNumber").val();
    if(conf.themeNumber === "1"){
      $("#container").addClass("theme1");
      $("#configWindow").addClass("theme1");
      $("#configWindow").removeClass("confTheme");//#E0E0E0
      $("#nabar").css("border-bottom","2px solid white");
      $("#header").css("border-bottom","2px solid white");
      $("#showImage").css("border-bottom","2px solid white");
      $("#showList").css("border-bottom","2px solid white");
      $(".sub1").css("border-bottom","2px solid white");
      $("#showList").css("border-right","2px solid white");
      $("#showTime").css("color","white");
      
      $("#volumeControl").css("background","white");
    }else if(conf.themeNumber === "0"){
      $("#container").removeClass("theme1");
      $("#configWindow").removeClass("theme1");
      $("#configWindow").addClass("confTheme");
      $("#nabar").css("border-bottom","2px solid white");
      $("#header").css("border-bottom","2px solid white");
      $("#showImage").css("border-bottom","2px solid white");
      $("#showList").css("border-bottom","2px solid white");
      $(".sub1").css("border-bottom","2px solid white");
      $("#showList").css("border-right","2px solid white");
      $("#showTime").css("color","white");
      
      $("#volumeControl").css("background","white");
    }
  }

  function configPlay(){
    $("#body").append('<div hidden="hidden" id="configWindow" class="confTheme"></div>');
    $("#configWindow").append('<div style="height:25px;border-bottom:1px solid white;line-height:17px;padding:3px;">' +
    '设置<span id="closeConfig" class="glyphicon glyphicon-remove" aria-hidden="true"></span></div>');
    $("#configWindow").append('<div style="padding:10px;">' +
    '<input id="musicPath" type="text" class="form-control" placeholder="音乐目录" style="width:66%;float:left;"><input id="selectFloder" type="button" class="form-control" value="文件夹" style="width:30%;float:left;margin-left:10px;"/>'+
    '<select class="form-control" id="themeNumber" style="margin-top:5px;float:left;clear:both;">'+
    '<option>主题</option>'+
    '<option>0</option>'+
    '<option>1</option>'+
    '</select>'+
    '<button id="submit" style="width:280px;margin-top:30px;" type="button" class="btn btn-default">确认</button></div>');
    
    $("#selectFloder").on('click',function(){
      ipc.send('openMusicFolder');
    });
    ipc.on('loadedFolder',function(e,args){
      $("#musicPath").val(args[0]);
    });
  }
  
  function nextPage(){
    if(conf.currentPage < conf.totalPage){
      conf.currentPage = conf.currentPage + 1;
      showList();
    }
  }

  function lastPage(){
    if(conf.currentPage > 1){
      conf.currentPage = conf.currentPage - 1;
      showList();
    }
  }

  function orderList(){
    if($(this).hasClass("glyphicon-random")){
      $(this).removeClass("glyphicon-random");
      $(this).addClass("glyphicon-repeat");
      conf.isListLoop = true;
    }else{
      $(this).addClass("glyphicon-random");
      $(this).removeClass("glyphicon-repeat");
      conf.isListLoop = false;
    }
  }

  function playLast(){
    if(parseInt(conf.playingId.substring(1)) > (conf.currentPage - 1) * conf.showNumber){
      var lastId = "d" + (parseInt(conf.playingId.substring(1)) - 1);
      $("#" + conf.playingId).removeClass("playing");
      $("#" + lastId).addClass("playing");
      conf.playingId = lastId;
      conf.playingName = $("#" + lastId).text();
      initMusic();
    }else{
      if(conf.currentPage > 1){
        lastPage();
        playLast();
      }
    }
  }

  function playNext(){
    if(conf.playingId.substring(1) >= conf.musicLength - 1){
      return;
    }
    if(parseInt(conf.playingId.substring(1)) < conf.currentPage * conf.showNumber - 1){
      var nextId = "d" + (parseInt(conf.playingId.substring(1)) + 1);
      $("#" + conf.playingId).removeClass("playing");
      $("#" + nextId).addClass("playing");
      conf.playingId = nextId;
      conf.playingName = $("#" + nextId).text();
      initMusic();
    }else{
      if(conf.currentPage < conf.totalPage){
        nextPage();
        playNext();
      }
    }
  }

  function playRadom(){
    var randomMusic = parseInt(Math.random() * conf.musicLength);
    var nextId = "d" + randomMusic;
    conf.currentPage = Math.ceil(randomMusic / conf.showNumber);
    showList();
    $("#list .music").removeClass("playing");
    $("#" + nextId).addClass("playing");
    conf.playingId = nextId;
    conf.playingName = $("#" + nextId).text();
    initMusic();
  }

  function pauseMusic(){
    var myAudio = document.getElementById("myAudio");
    if($(this).hasClass("glyphicon-play")){
      $(this).removeClass("glyphicon-play");
      $(this).addClass("glyphicon-pause");
      myAudio.play();
      conf.logoShowThread = setInterval(function(){
        var temp = parseInt(Math.random() * 6);
        $("#logo").css('color',conf.logoColor[temp]);
      },300);
    }else{
      $(this).addClass("glyphicon-play");
      $(this).removeClass("glyphicon-pause");
      myAudio.pause();
      clearInterval(conf.logoShowThread);
    }
  }

  function loadMusic(){
    var fs = require('fs');
    fs.readdir(conf.getDataPath,function(err,fiels){
      if(err){
        return console.log(err);
      }else{
        conf.data = fiels;
        showList();
      }
    });
    
    // conf.data = conf.getDataPath;
    // showList();
  }

  function showList(){
    $("#list").empty();
    if(conf.data.length === 0){
      $("#list").append('<div style="color:white;">没有音乐</div>');
      return;
    }
    var data = conf.data;
    var fromNumber = (conf.currentPage - 1) * conf.showNumber;
    var endNumber = conf.currentPage * conf.showNumber;
    conf.musicLength = data.length;
    conf.totalPage = Math.ceil(data.length / conf.showNumber);
    $.each(data,function(i,fullName){
      if( i >= fromNumber && i < endNumber){
        var showName = fullName.split(".mp3")[0];
        if(showName === conf.playingName){
          $("#list").append('<div id="d'+ i +'" class="music playing">' + showName + '</div>');
        }else{
          $("#list").append('<div id="d'+ i +'" class="music">' + showName + '</div>');
        }
      }
    });
    $("#list").append('<span id="lastPage" class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>' +
    '<span id="nextPage" class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>');
    $("#list .music").on('click',changeMusic);
    $("#nextPage").on('click',nextPage);
    $("#lastPage").on('click',lastPage);
  }

  function changeMusic(){
    $("#list .music").removeClass("playing");
    $(this).addClass("playing");
    conf.playingId = $(this).attr("id");
    conf.playingName = $(this).text();
    initMusic();
    conf.logoShowThread = setInterval(function(){
      var temp = parseInt(Math.random() * 6);
      $("#logo").css('color',conf.logoColor[temp]);
    },500);
    conf.playingThread = setInterval(function(){
      refreshControl();
      isEnded();
      $("#musicName").text(conf.playingName);
    },200);
  }

  function isEnded(){
    var myAudio = document.getElementById("myAudio");
    if(myAudio.ended){
      if(conf.isListLoop){
        playNext();
      }else{
        playRadom();
      }
    }
  }

  function initMusic(){
    var myAudio = document.getElementById("myAudio");
    var path = conf.getDataPath + "/" + conf.playingName + ".mp3";
    $(myAudio).attr("src",path);
    $("#pause").removeClass("glyphicon-play");
    $("#pause").addClass("glyphicon-pause");
    myAudio.play();
  }

  function refreshControl(){
    var myAudio = document.getElementById("myAudio");
    conf.currentTime = myAudio.currentTime || 0;
    conf.totalTime = myAudio.duration || 0;
    myAudio.volume = conf.currentVolume;
    var percent = conf.currentTime / conf.totalTime * 100;
    $("#control2").jqxSlider({ value : percent });
    $("#showTime").text(formatTime(conf.currentTime) + "/" + formatTime(conf.totalTime));
    $("#changeVolume").jqxSlider({ value : conf.currentVolume * 100});
  }

  function formatTime(time){
    time = Math.ceil(time);
    var mm = parseInt(time / 60);
    var ss = parseInt(time % 60);
    return unifyTime(mm) + ":" + unifyTime(ss);
  }

  function unifyTime(time){
    if(time < 10){
      time = "0" + time;
    }
    return time;
  }

  function showVolumeControl(){
    $("#volumeControl").toggle();
  }

  function changeList(){
    $("#nabar span").removeClass("clickedList");
    $(this).addClass("clickedList");
    $("#list").empty();
  }

  function initSlider(){
    $("#control2").jqxSlider({
      min: 0,
      max: 100,
      showButtons: false,
      showTickLabels: false,
      showMinorTicks: false,
      showTicks: false,
      value: 0,
      width: 335,
      height: 30
    });

    $("#changeVolume").jqxSlider({
      min: 0,
      max: 100,
      orientation: 'vertical',
      showButtons: false,
      showTickLabels: false,
      showMinorTicks: false,
      showTicks: false,
      value: 0,
      width: 2,
      height: 100
    });

    $('#changeVolume').on('slide',function(event){
      var myAudio = document.getElementById("myAudio");
      var nowValue = event.args.value;
      myAudio.volume = nowValue / 100;
      conf.currentVolume = nowValue / 100;
    });

    $('#control2').on('click',function(event){
      var offsetX = event.offsetX;
      var myAudio = document.getElementById("myAudio");
      myAudio.currentTime = offsetX / 335 * conf.totalTime;
      var nowValue = 100 * offsetX / 335;
      $("#control2").jqxSlider({ value : nowValue});
    });
  }

  function closeWindow(){
    ipc.send('closePlayerWindow');
  }

  function minimizeWindow(){
    ipc.send('minPlayerWindow');
  }

  PlayerModule.Player.prototype.contructor = PlayerModule.Player;
  return PlayerModule;
})(window.PlayerModule = window.PlayerModule || {});
