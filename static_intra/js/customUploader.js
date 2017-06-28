var myDialog;
var divId;

function showDialog(baseUrl, div, c, cid) {
			dojo.require("dijit.form.Button");
			dojo.require("fw.ui.dijit.FloatingDialog");
			
			var elementUrl = baseUrl + "ContentServer?pagename=internet_checkFileExtension"; 
			divId = div;
			myDialog = fw.ui.dijit.FloatingDialog({
				id : "fileUpload",
				title : "Nuovo WccAsset",
				executeScripts : "true",
				noUnderLay : false,
				href: elementUrl,
				onCancel:function(){ 
					document.getElementById("fwiframecover").style.cssText="position: absolute; top: 127px; left: 259px; width: 1021px; height: 439px; z-index: 0;";
					myDialog.destroy();
				}
			});
			
			myDialog.show();
			document.getElementById("fwiframecover").style.cssText="background-color: black; height: 100%; left: 0; opacity: 0.4; position: fixed; top: 0; width: 100%; z-index: 200;";
			$("#fileUpload").attr("c", c);
			$("#fileUpload").attr("cid", cid);
			
		}

function closeDialog(){
	document.getElementById("fwiframecover").style.cssText="position: absolute; top: 127px; left: 259px; width: 1021px; height: 439px; z-index: 0;";
	myDialog.destroy();
}

function getXMLHttpRequest() {
	var xmlHttpReq = false;
  if (window.XMLHttpRequest) {
    xmlHttpReq = new window.XMLHttpRequest();
  } else if (window.ActiveXObject) {
    try {
      xmlHttpReq = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (exp1) {
      try {
        xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (exp2) {
        xmlHttpReq = false;
      }
    }
  }
  return xmlHttpReq;
}

function getReadyStateHandler(xmlHttpRequest) {
	return function() {
		if (xmlHttpRequest.readyState == 4) {
			if (xmlHttpRequest.status == 200) {
				var result = xmlHttpRequest.getResponseHeader("result");
				if(result === "error"){
					$('.input-group').after('<p id="errorMsg">File errato! <br/>E\'possibile inserire solo immagini.</p>');
				} else {
					$("#errorMsg").css("display", "none");
					$("." + divId).load(window.location + " ." + divId);
					$(divId).attr('class',divId.split("-clicked"));
					document.getElementById("fwiframecover").style.cssText="position: absolute; top: 127px; left: 259px; width: 1021px; height: 439px; z-index: 0;";
					myDialog.destroy();
				}
				console.log("Status ok!");
			} else {
				alert("HTTP error " + xmlHttpRequest.status + ": " + xmlHttpRequest.statusText + " " + xmlHttpRequest.responseText);
			}
		}
	};
}

function makeRequest(){
	var xmlHttpRequest = new XMLHttpRequest();
	var file = document.getElementById("file").files[0];
	var http = "http://";
	var protomatch = /^(https?|ftp):\/\//;
	var url = document.getElementById("link").value;
	var alt = document.getElementById("alt").value;
	var link = http + url.replace(protomatch, ''); 
    var formData = new FormData();  
    if(file && alt && (link && link != http) ){
	    formData.append("file", file);
		xmlHttpRequest.onreadystatechange = getReadyStateHandler(xmlHttpRequest);
		xmlHttpRequest.open("POST", "/servlet/CheckFileExtension", true);
		xmlHttpRequest.setRequestHeader("c", $("#fileUpload").attr("c"));
		xmlHttpRequest.setRequestHeader("cid", $("#fileUpload").attr("cid"));
		xmlHttpRequest.setRequestHeader("alt", alt);
		xmlHttpRequest.setRequestHeader("link", link);
	
		var reader = new FileReader();
		  reader.onload = function() {
		  xmlHttpRequest.send(formData);
		  };
		reader.readAsBinaryString(file);
    } else {
		alert("Tutti i campi sono obbligatori!");
    }
    
}

function browseFile(){
	document.getElementById("file").click();
}

function showFileName(){
	document.getElementById("filename").innerHTML=document.getElementById("file").files[0].name;
}
