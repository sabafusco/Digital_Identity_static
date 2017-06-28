var playerModule = (function () {
 
  var id = "";
  var img = "";
  var url = "";
 
  function setData( playerId, playerImg, playerUrl ) {
      id = playerId;
      img = playerImg;
      url = playerUrl;
    }
  
  return {
	setPlayerData: setData,
	
    getPlayer: function (playerId) {
    	var container = $(".video_resp");
    	var pWidth = document.getElementById(playerId).style.width=container.innerWidth();
    	var pHeight = document.getElementById(playerId).style.height=container.innerHeight();
    	var options = {
				techOrder: ["azureHtml5JS", "html5", "flashSS", "silverlightSS"],
				"nativeControlsForTouch": false,
				autoplay: false,
				controls: true,
				width: pWidth,
				height: pHeight,
				poster: img
			};
    	
    	amp(id, options).src([{ 
		    src: url, 
		    type: "application/vnd.ms-sstr+xml"
		}]);
    },
    
    resizePlayer : function (playerId) {
    	var container = $(".video_resp");
        window.addEventListener('resize',function(event){
        	document.getElementById(playerId).style.width=container.innerWidth() +"px";
        	document.getElementById(playerId).style.height=container.innerHeight() +"px";
        });
    }
  };
})();