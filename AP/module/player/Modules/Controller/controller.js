/**
 *
 */
(function(ControllerModule){
  ControllerModule.Controller = function(){
    init();
  };

  function init(){
    $("#container").load("Modules/Controller/controller.html");
    $.getScript("Modules/Player/player.js",function(){
      setTimeout(function(){
        $("#container").empty();
        new PlayerModule.Player();
      },10);
    });
  }

  ControllerModule.Controller.prototype.constructor = ControllerModule.Controller;
  return ControllerModule;
})(window.ControllerModule = window.ControllerModule || {});
