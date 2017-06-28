var jsonArray = new Array();
var count = 0;
var banditoken;
var urltoken = "/rest-adminbandi-fe-rs-web/rest/token";
function getToken()  {
    $.ajax({
			type: 'GET',
			url:urltoken,
      dataType: 'jsonp',
      jsonp: "callback",		
			success: function(response) {
     
			banditoken=response.token;
			}
		});
  }
$(document).ready(function() 
{
  getToken();

	var jsonObj;
	var idBando = $("#idBando").val();
	
	if($("#listUploadFile").val().length > 0)
	{
		var array = $.parseJSON("[" + $("#listUploadFile").val() + "]");
		//count = array.length;
		if (array.length>0) $("#replaceDiv").append("<p style='font-weight:bold;'>Elenco file allegati:</p>");
		for(var i=0; i<array.length; i++)
		{
			jsonArray.push(JSON.stringify(array[i]));
			count++;

			$("#replaceDiv").append("<div id='row_allegati_" + i + "' style='padding-top: 5px; margin-bottom: 30px;'><div style='position:absolute; width:45%; border-bottom:1px solid #555; padding-right:20px;'>" + array[i].inputUpload + "</div>  <a class='button' onclick='removeElement(" + i +")' style='top:0; position:inherit; margin-left:0;' ><span style='margin-left: 42%; position: absolute;'>Elimina</span></a></div>");
		}
	}
	
	// callback del submit asincrono
	var options = 
	{ 
  
     beforeSend: function(xhr){xhr.setRequestHeader('ANTIFORGERYTOKEN',banditoken);},
  
		success: function(result) 
		{ 
			if(result.message.indexOf("http") === 0)
			{
				var inputUpload = $("#inputUpload").val();
				var urlFile = result.message;
				var filesize = result.filesize;
				var estensione = result.estensione;
				
				//Costruisco l'oggetto JSON
				jsonObj = 
				{ 
						inputUpload : inputUpload, 
						urlFile : urlFile,
						filesize : filesize,
						estensione : estensione
				};
				
				//aggiorno l'array aggiungendo l'ultimo elemento
				jsonArray.push(JSON.stringify (jsonObj));
				
				//aggiorno la lista degli elementi
				$("#listUploadFile").val(jsonArray);
				
				count++;
				
				if(count < 1) $("#replaceDiv").append("<p style='font-weight:bold;'>Elenco file allegati:</p>");
				
				$("#replaceDiv").append("<div id='row_allegati_" + count + "' style='padding-top: 5px; margin-bottom: 30px;'><div style='position:absolute; width:45%; border-bottom:1px solid #555; padding-right:20px;'>" + inputUpload + "</div><a class='button' onclick='removeElement("+ count +")' style='top:0; position:inherit; margin-left:0;' ><span style='margin-left: 42%; position: absolute;' onclick='remove(" + count + ")'>Elimina</span></a></div>");

				$("#inputUpload").val("");
				$("#streamFile").val("");
				$("#fileName_tm").val("");
				$("#titolo_tm").val("");
				
				$('#serviceUpload').attr("action","/cs/ContentServer");
				
				$("#message").empty();
			    $("#message").append("<p class='success'>File caricato con successo</p>");
			}
			else {
				$("#message").empty();
			    $("#message").append("<p class='error'>Attenzione: caricamento file non riuscito</p>");
				}
				//alert("Errore nel caricamento del file");
				
			removeImageLoading();
			$('#serviceUpload').attr("action","/cs/ContentServer");
		},
		error: function(xhr)
		{
			$("#inputUpload").val("");
			$("#streamFile").val("");
			$("#fileName_tm").val("");
			$("#titolo_tm").val("");

			$('#serviceUpload').attr("action","/cs/ContentServer");
			removeImageLoading();
			
			$("#message").empty();
			$("#message").append("<p class='error'>Attenzione: caricamento file non riuscito.</p>");
			if (xhr.status==400) $("#message").append("<p class='error'>Errore: "+$.parseJSON(xhr.responseText).message+"</p>");
			if (xhr.status==413) $("#message").append("<p class='error'>Errore: File troppo grande. Dimensione non consentita.</p>");
			//alert("Errore nel caricamento del file");
		}
	};
	
	$("#streamFile").change(function () 
	{
		$("#fileName_tm").val($("#streamFile").val().replace(/.*\\/g,""));
		
		//SET ACTION 
		$('#serviceUpload').attr("action", serviceUpload + idBando);
	});
	
	//SUBMIT - ASYNC 
	$('#serviceUpload').ajaxForm(options);
});

	function removeElement(id) 
	{
			var idTag = "#row_allegati_" + id; 
			$(idTag).remove();
			count--;
			if (count==0) $("#replaceDiv").empty();
			//alert(count);
			jsonArray.splice(id,1);
			$("#listUploadFile").val(jsonArray);
	}

	function verificaNomeFile() {
		$("#message").empty();
		var pattern = new RegExp("^([a-zA-Z0-9 \.\_\-])+$");
 		if(document.getElementById("inputUpload").value == "" ) {
 			//alert("Attenzione: nome file obbligatorio");
			$("#message").empty();
			$("#message").append("<p class='error'>Attenzione: titolo obbligatorio. Inserire un titolo</p>");
 			return false;
 		}else if(!pattern.test(document.getElementById("inputUpload").value)) {
			$("#message").empty();
			$("#message").append("<p class='error'>Attenzione: il titolo deve contenere solo lettere, numeri e caratteri ._-</p>");
 			return false;		
		}
		if(document.getElementById("streamFile").value == "" ) {
 			//alert("Caricare il file");
			$("#message").empty();
			$("#message").append("<p class='error'>Attenzione: file obbligatorio. Allegare un file</p>");
 			return false;
 		}
		
		loadImageLoading();
		$("#titolo_tm").val($("#inputUpload").val());

 		return true;
 	}
	
	function loadImageLoading() {
		$("#replaceDivImageLoading").append("<div id='jquery-loader' class='blue-with-image-2' style='z-index: 30001; width: 400px; height: 60px; top: 892.5px; left: 574.5px;'><p><br />Caricamento in corso...</p></div>");
 	}
	function removeImageLoading(){
		$("#replaceDivImageLoading").empty();
	}

	function pulisciMsg() {
		$("#message").empty();
	}