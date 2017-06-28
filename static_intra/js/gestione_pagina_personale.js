var arrayParametri = decodeURIComponent(window.location.search.substring(1)).split("&");
filtroVuoto = true;

$(function(){paginaPronta()});

function paginaPronta() {
	$('.linkCambiaPagina').each(function(){
		settaNuovoParametroUrl("" + (parseInt($(this).attr("href")) - 1), "", "actualPage");
		$(this).attr("href", createNewUrl());
	});
	var risultatiPerPagina = parseInt($("#num4page option:selected").first().val());
	
	$("#num4page").change(function () {
		var nuoviRisutatiPerPagina = parseInt($("#num4page option:selected").first().val());
		var paginaAttuale = parseInt($("#indicatore_pagina_attuale").text());
		
		var numeroRisultati= (paginaAttuale - 1) * risultatiPerPagina + $(".boxSingoloDipendete").length;
		var nuovoIndiceDiPagina = Math.floor(numeroRisultati / nuoviRisutatiPerPagina);
		if(numeroRisultati % nuoviRisutatiPerPagina == 0) {
			nuovoIndiceDiPagina--;
		} 
		settaNuovoParametroUrl("" + nuovoIndiceDiPagina, "", "actualPage");
		settaNuovoParametroUrl("" + nuoviRisutatiPerPagina, "", "resForPage");
		window.location.href = createNewUrl();
	});
}

function annullaFormRicerca() {
	$("#cognome").val($("#label_cognome").text());
	$("#matricola").val($("#label_matricola").text());
	$("#rpv-tel").val($("#label_rpv-tel").text());
	$("#codice_unita").val($("#label_codice_unita").text());
}

function filtraPersonale() {
	filtroVuoto=true;
	if($.trim($("#codice_unita").val()).length > 0 && $.trim($("#codice_unita").val()) != $("#label_codice_unita").text())
		settaNuovoParametroUrl($.trim($("#codice_unita").val()), $("#label_codice_unita").text(), "codunita");
	
	settaNuovoParametroUrl($.trim($("#matricola").val()), $("#label_matricola").text(), "matricola");
	settaNuovoParametroUrl($.trim($("#cognome").val()), $("#label_cognome").text(), "cognome");
	
	if(filtroVuoto) {
		alert("Inserisci almeno un parametro di ricerca");
	} else {
		settaNuovoParametroUrl("", "", "actualPage");
		var urlToCall = createNewUrl();
		window.location.href = urlToCall;
	}
}

function settaNuovoParametroUrl(valoreInputFiltro, valoreLabelFiltro, chiaveParametro) {
	
	if(valoreInputFiltro == valoreLabelFiltro) {
			valoreInputFiltro="";
	}
	updateArrayParametri(chiaveParametro, valoreInputFiltro);
}
	
function updateArrayParametri(chiave, valore) {
	arrayParametri = $.grep(arrayParametri, function(elemento) {
		return elemento.indexOf(chiave) != 0;
	});
	if(valore.length > 0) {
		arrayParametri.push(chiave + "=" + valore);
		filtroVuoto = false;
	}
}

function createNewUrl() {
	var newUrl = "http://" + window.location.host + window.location.pathname;
	$.each(arrayParametri, function(index, urlParameter) {
		var chiaveValoreUrlParameter= urlParameter.split("=");
		urlParameter = encodeURIComponent(chiaveValoreUrlParameter[0]) + "=" + encodeURIComponent(chiaveValoreUrlParameter[1]);
		if(index == 0) {
			newUrl += "?" + urlParameter;
		} else {
			newUrl += "&" + urlParameter;
		}
	});
	return newUrl;
}
