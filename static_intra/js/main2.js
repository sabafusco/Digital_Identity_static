/**
 * Created by m.niciarelli on 09/06/2015.
 */

var vblOrfeo='òlè';
var MSG_USER_UNAUTHORIZED = "Utente non autorizzato ad accedere a questo servizio."; // orfeo

jQuery(document).ready(function () {
    /*jQuery(".fc-event").click(function(){
     jQuery(".box-dettaglio-evento").collapse('toggle');
     jQuery(".box-calendario-eventi").collapse('toggle');
     });*/

	/* GESTISCO IL VALORE NULLO DELLE NOTIFICHE - corregge un bug sull'allineamento delle icone */
	jQuery('.notifica-social.hidden').text("0");

    /* GESTISCO LA VISIBILITA' DEL MENU SLIDER */
    jQuery("#trigger-slider-menu,#close-slider-menu").click(function () {

        // Set the effect type
        var effect = 'slide';

        // Set the options for the effect type chosen
        var options = 'direction: left';

        // Set the duration (default: 400 milliseconds)
        var duration = 500;
        /*jQuery('#trigger-slider-menu').toggle();*/
        jQuery('.slider-menu').toggle(effect, options, duration);
    });

    /* INIZIALIZIO IL CALENDARIO EVENTI */
   
    jQuery('.date input').datepicker({
        format: "dd/mm/yyyy",
        weekStart: 1,
        todayBtn: "linked",
        language: "it",
        todayHighlight: true
    });
    
    $('.date input').on('change', function(){
        $('.datepicker').hide();
    });



/*GESTISCO IL CONTEGGIO DELLE APPLICAZIONI SELEZIONATE NEI BOX DELLA HOMEPAGE */

	$('.checkbox-counter').text('Applicazioni selezionate: 0');

	$(".box-angolo-dipendente-edit input:checkbox").on("change", function() {
		fnUpdateCount();
	});

});

function fnUpdateCount() {
	var generallen = $(".box-angolo-dipendente-edit input:checked").length;
	console.log("counter: " + generallen);
	if ((generallen > 0) && (generallen <= 5)) {
		$(".checkbox-counter").text('Applicazioni selezionate: ' + generallen );
		$(".checkbox-counter").removeClass('error');
	} else if (generallen > 5) {
		$(".checkbox-counter").text('Non � possibile selezionare pi� di 5 applicazioni');
		$(".checkbox-counter").addClass('error');
	} else {
		$(".checkbox-counter").text('Applicazioni selezionate: 0');
		$(".checkbox-counter").removeClass('error');
	}
};


//restituisce un valore dalla querystring
//var me = getUrlVars()["me"];
function getUrlVars(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function showDatepicker(obj){
    $('.date input').datepicker({
        format: "dd/mm/yyyy",
        weekStart: 1,
        todayBtn: "linked",
        language: "it",
        todayHighlight: true
    });

    $('.date input').on('change', function(){
        $('.datepicker').hide();
    });

    var classDate = '.date input' + (obj ? '#' + obj : '');
	$(classDate).datepicker('show');
}

function postAjaxWithJSONResponse(_successEvent, _urlService, jsonObj){
	$.ajax({
		type: 'POST',
		url: _urlService,
		data: JSON.stringify (jsonObj),
		success: function(data) {
			 _successEvent(data);
			 //showMessage();
			 hideLoadingAnimation();
		 },
		error: function(xhr, textStatus, errorThrown){
			if(xhr.responseText && xhr.responseText!=""){
				try{
					var json_obj = JSON.parse(xhr.responseText);
					showMessage("fail",json_obj.message);
				} catch(e) {
					showMessage("fail");
				}
			}else{
				showMessage("fail");
			}
			hideLoadingAnimation();			 
		},
		contentType: "application/json",
		dataType: 'json'
	});	
}

function postAjaxWithJSONResponseToken(_successEvent, _urlService, jsonObj, cscpToken){
	$.ajax({
		type: 'POST',
		url: _urlService,
		data: JSON.stringify (jsonObj),
		beforeSend: function(xhr){
			xhr.setRequestHeader('CSCPTOKEN',cscpToken);
		},
		success: function(data) {
			 _successEvent(data);
			 //showMessage();
			 hideLoadingAnimation();
		},
		error: function(xhr, textStatus, errorThrown){
			try{
				var json_obj = JSON.parse(xhr.responseText);
				showMessage("fail",json_obj.message);
			} catch(e) {
				showMessage("fail");
			}
			hideLoadingAnimation();			 
		},
		contentType: "application/json",
		dataType: 'json'
	});	
}

function getAjaxWithJSONResponse(_successEvent, _urlService, _errorEvent){
	$.ajax({
		type: 'GET',
		url: _urlService,
		dataType: 'json',
		success: function(data) {
			 _successEvent(data);
		 },
		error: function(xhr, textStatus, errorThrown){
			if(_errorEvent){
				_errorEvent(xhr, textStatus);
			}else{
				if(xhr.status && (xhr.status=="401" || xhr.status=="403")){
					showMessage("fail" ,MSG_USER_UNAUTHORIZED);
				}else if(xhr.responseText && xhr.responseText!=""){
					try{
						var json_obj = JSON.parse(xhr.responseText);
						showMessage("fail",json_obj.message);
					} catch(e) {
						showMessage("fail");
					}
				}else{
					showMessage("fail");
				}	
				hideLoadingAnimation();
			}
		}
	});	
}

function getAjaxWithJSONResponseToken(_successEvent, _urlService, _errorEvent, _tokenHeader){
	var tokenName = _tokenHeader.tokenName;
	var tokenValue = _tokenHeader.tokenValue;

	$.ajax({
		type: 'GET',
		url: _urlService,
		dataType: 'json',
		beforeSend: function(xhr){
			xhr.setRequestHeader(tokenName,tokenValue);
		},
		success: function(data) {
			 _successEvent(data);
		},
		error: function(xhr, textStatus, errorThrown){
			if(_errorEvent){
				_errorEvent(xhr, textStatus);
			}else{
				if(xhr.status && (xhr.status=="401" || xhr.status=="403")){
					showMessage("fail" ,MSG_USER_UNAUTHORIZED);
				}else if(xhr.responseText && xhr.responseText!=""){
					try{
						var json_obj = JSON.parse(xhr.responseText);
						showMessage("fail",json_obj.message);
					} catch(e) {
						showMessage("fail");
					}
				}else{
					showMessage("fail");
				}	
				hideLoadingAnimation();
			}
		}
	});	
}



function getAjaxWithJSONPResponse(_successEvent, _urlService, _errorEvent){
	$.ajax({
		type: 'GET',
		url: _urlService,
		dataType: 'jsonp',
		jsonp: "callback",
		success: function(data) {
			 _successEvent(data);
		 },
		 /*statusCode: {
			404:showMessageAndHidingLoadAnimation("fail")
		 },*/
		error: function(xhr, textStatus, errorThrown){
			if(_errorEvent){
				_errorEvent(xhr, textStatus);
			}else{
				if(xhr.status && (xhr.status=="401" || xhr.status=="403")){
					showMessage("fail" ,MSG_USER_UNAUTHORIZED);
				}else if(xhr.responseText && xhr.responseText!=""){
					try{
						var json_obj = JSON.parse(xhr.responseText);
						showMessage("fail",json_obj.message);
					} catch(e) {
						showMessage("fail");
					}
				}else{
					showMessage("fail");
				}	
				hideLoadingAnimation();
			}
		}
	});	
}


function hideLoadingAnimation(element){
	if(element){
		$(element).fadeOut("slow");
	}else{
		$(".box-loading").fadeOut("slow");		
	}
}

function showLoadingAnimation(element){
	if(element){
		$(element).fadeIn(0);
	}else{
		$(".box-loading").fadeIn(0);
	}
}

function showMessage(type, message){
	 $("html, body").animate({scrollTop: 0}, 500);
	 
	 if(!message){
		message = "L&rsquo;operazione � stata eseguita correttamente";
		if(type && type === "fail"){
			message = "L&rsquo;operazione non � stata eseguita";
		}
	 }
		 
	 var label = "success";
	 var clas = "feedback-header";
	 if(type && type === "fail"){
		 clas = "feedback-header-error";
	 }
	 
	 var messaggioOk = "<div class='" + clas + " col-xs-12 col-sm-8 col-lg-9'><span><span class='fa fa-check white-check'></span>" + message + "</span></div>";
	 
	 //$('main').prepend(messaggioOk);
	 $('main').before(messaggioOk);
	 
	 var dotClas = "." + clas;
	 $(dotClas).delay(3000).fadeOut("slow", function() {
		$(dotClas).remove();
	  });
}

function showMessageAndHidingLoadAnimation(type, message){
	 $("html, body").animate({scrollTop: 0}, 500);
	 
	 if(!message){
		message = "L&rsquo;operazione � stata eseguita correttamente";
		if(type && type === "fail"){
			message = "L&rsquo;operazione non � stata eseguita";
		}
	 }
		 
	 var label = "success";
	 var clas = "feedback-header";
	 if(type && type === "fail"){
		 clas = "feedback-header-error";
	 }
	 
	 var messaggioOk = "<div class='" + clas + " col-xs-12 col-sm-8 col-lg-9'><span><span class='fa fa-check white-check'></span>" + message + "</span></div>";
	 
	 //$('main').prepend(messaggioOk);
	 $('main').before(messaggioOk);
	 
	 var dotClas = "." + clas;
	 $(dotClas).delay(3000).fadeOut("slow", function() {
		$(dotClas).remove();
	  });
	  
	  hideLoadingAnimation();
}

function showMessageUnauthorized(title){
	var messaggioKo = "<h2>"  + title + "</h2>";
	messaggioKo += "<div class='feedback-header-error col-xs-12 col-sm-12 col-lg-12'><span><span class='fa fa-2x fa-exclamation-circle'></span>"+MSG_USER_UNAUTHORIZED+"</span></div>";	 
	 $('main').html(messaggioKo);
}

//----------------------- Sezione Home intranet ------------------------

function postAjaxWithToken(_successEvent, _errorEvent , urlService, jsonObj, token){
	$.ajax({ 
		type: 'POST',
		url: urlService,
		data: jsonObj,
		beforeSend: function(xhr){
			xhr.setRequestHeader('ANTIFORGERYTOKEN',token);
		},
		complete: function(xhr,status) {
			if(xhr.status > 199 && xhr.status < 300){
				 _successEvent();
			}else{
				_errorEvent();
			}
		},
//		success: function() {
//			 _successEvent();
//		},
//		error: function(){
//			_errorEvent();
//		},
		contentType: "application/json",
		dataType: 'json'
	});	
}

function postAjaxWithGetToken(_successEvent, _errorEvent , urlService, jsonObj, tokenParam){
	console.log("-- postAjaxWithGetToken --");
	$.ajax({
		type: 'GET',
		url: tokenParam.tokenUrl,
		dataType: 'json',
		//jsonp: "callback",
		success: function(data) {
			//tokenParam.tokenValue=data.token;
			//Da sostituire con chiamata a metodo unico
			 switch (tokenParam.tokenName){
	               case 'ANTIFORGERYTOKEN': postAjaxWithToken(_successEvent, _errorEvent, urlService, jsonObj, data.token);
	               break;
	               case 'CSCPTOKEN': postAjaxWithJSONResponseToken(_successEvent, urlService, jsonObj, data.token);
	               break;
	          }
			
		 },
		error: function(xhr, textStatus, errorThrown){
			console.log("token error -->"+errorThrown);
			if(_errorEvent){
				_errorEvent(xhr, textStatus);
			}else{
				if(xhr.status && (xhr.status=="401" || xhr.status=="403")){
					showMessage("fail" ,MSG_USER_UNAUTHORIZED);
				}else if(xhr.responseText && xhr.responseText!=""){
					try{
						var json_obj = JSON.parse(xhr.responseText);
						showMessage("fail",json_obj.message);
					} catch(e) {
						showMessage("fail");
					}
				}else{
					showMessage("fail");
				}	
				hideLoadingAnimation();
			}
		}
	});	
}


function showMessageInElement(element, type, message){
	 $("html, body").animate({scrollTop: 0}, 500);
	 
	 if(!message){
		message = "L&rsquo;operazione � stata eseguita correttamente";
		if(type && type === "fail"){
			message = "L&rsquo;operazione non � stata eseguita";
		}
	 }
		 
	 var label = "success";
	 var clas = "feedback-header";
	 if(type && type === "fail"){
		 clas = "feedback-header-error";
		 
	 }
	 
	 var messaggioOk = "<div class='" + clas + " col-xs-12 col-sm-8 col-lg-12'><span><span class='fa fa-check white-check'></span>" + message + "</span></div>";
	 
	 $(element).prepend(messaggioOk);
	 
	 var dotClas = "." + clas;
	 $(dotClas).delay(3000).fadeOut("slow", function() {
		$(dotClas).remove();
	  });
}


function getMenuServiziOnLine(url){
	var _successEvent=function(data) {
		if( $.isArray(data) &&  data.length ) {
			var items = [];
			$.each(data, function (id, menu) {
				items.push('<li title=\"' + menu.description + '\"><a href=\"' + menu.url + '\"><span class=\"fa ' + menu.icon + '\"></span>' + menu.description + '</a></li>');
			});  
			$(".ul_menu").empty();
			$(".ul_menu").html(items.join(''));
		}
	};
	getAjaxWithJSONResponse(_successEvent, url);	
}
//----------------------------------------------------------------------

function TokenHeader(_tokenName,_tokenValue,_tokenUrl){
	this.tokenName = _tokenName;
	this.tokenValue = _tokenValue;
	this.tokenUrl = _tokenUrl;
}

//--------------------------------------------------------------------

// a.orfeo add funzione globale per recuperare valore di un parametro dalla url location
function getQueryStringParamValue(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx control chars
    var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}
// a.orfeo add funzione globale per recuperare valore di un parametro dalla url location
