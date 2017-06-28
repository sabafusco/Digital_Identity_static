var wcpRootUrl = "http://social.escl.inail.it/rest/api/";
var matricolaUtente = '<%=anag.getUsername()%>';
var wcpResourcesSite = wcpRootUrl + "resourceIndex";

function loadNotifications() {
	var timestamp = new Date().getTime();
	$.getJSON(wcpResourcesSite + "?_=" + timestamp + "&callback=?", function(
			data, status, xhr) {
		if (xhr.getResponseHeader('X-Oracle-RF-Token')) {
			var utoken = xhr.getResponseHeader('X-Oracle-RF-Token');
			if (utoken) {
				var urlUltimaDataLettura = wcpRootUrl
						+ "notifications/count?utoken=" + utoken
						+ '?callback=?';
				$.getJSON(urlUltimaDataLettura, function(count) {
					if (count > 0) {
						$("#notifica-social").html(count);
						$("#notifica-social").show();
					}
				});
			}
		}
	});

}

//TODO
//$(document).ready(function() {
//	// get Numero Notifiche
//	loadNotifications();
//});
