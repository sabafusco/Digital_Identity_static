var serviceGetEntityRows = "/JSONGet/entities/getEntityRows?callback=?";
var serviceGetEntityList = "/JSONGet/entities/getEntityList?callback=?";
var serviceGetDocumentTitle="/JSONGet/entities/getDocumentTitle?callback=?";
var servicePingDomain = "/JSONGet/utilities/pingDomain?callback=?";
var serviceGetFilter = "/JSONGet/entities/getFilters?callback=?";
var serviceGetLayout = "/JSONGet/entities/getLayout?callback=?";
var serviceGetFile = "/gestioneFile/file";
var serviceGetThingEntity = "/JSONGet/entities/getThingEntity?callback=?";
var serviceGetEntitySingleRow = "/JSONGet/entities/getEntitySingleRow?callback=?";
var serviceGetTotRows = "/JSONGet/entities/getTotRows?callback=?";
function getFileExtension(filename)
{
  var ext = /^.+\.([^.]+)$/.exec(filename);
  return ext == null ? "" : ext[1];
}
$(document).ready(function(){
	setTimeout(color, 200);
//	$("#bloccoEntityTable").hide();
	writeDocumentTitle(restDomain);
	writeEntityList(restDomain);
	
});

(function($){
	helpToggle = function() {
		$("a.toggle").click(function(){
			if($( "a.toggle" ).hasClass( "open" )) {
				$( "a.toggle" ).removeClass( "open" );
			} else {
				$( "a.toggle" ).addClass( "open" );
			}
			$("div.panel-body").toggle("blind");
		});
	};
})(jQuery);



(function($){
	pingRestDomain = function(restDomain) {
		$.ajax({
			type: "GET",
			url: restDomain+servicePingDomain,
			dataType: "json",
			data:'idSession='+document.getElementById("formEntityList:idSession").value,
			beforeSend: function () {
//				$("#divErrore").hide();
			},
			success: function (data) {
				var messaggio = data.messaggio;
			},
			error: function (error) {
				$("#contenutoprincipale").empty();
				$("#contenutoprincipale").append("Servizio momentaneamente non disponibile")
//				$("#divErrore").html("Servizio momentaneamente non disponibile");
//				$("#divErrore").show();
			}   
		});
	};
})(jQuery);

Number.prototype.formatMoney = function(c, d, t){
	var n = this, 
	    c = isNaN(c = Math.abs(c)) ? 2 : c, 
	    d = d == undefined ? "." : d, 
	    t = t == undefined ? "," : t, 
	    s = n < 0 ? "-" : "", 
	    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
	    j = (j = i.length) > 3 ? j % 3 : 0;
	   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	 };


(function($){
	writeEntityList = function(restDomain){
		var idSession = document.getElementById("formEntityList:idSessionList").value;
		var siteLevel = document.location;
		$("#divVoceMenu").empty();
		$.ajax({
			type: "GET",
			url: restDomain+serviceGetEntityList,
			dataType: "json",
			data:'siteLevel='+siteLevel+'&idSession='+idSession,
			success: function (data) {
				if(data==null){
					$("#contenutoprincipale").empty();
					$("#contenutoprincipale").append("Questa sezione non contiene dati");
				}
				else{
					var entities = data.entityBean;
					if( Object.prototype.toString.call( entities ) !== '[object Array]' ) {
						entities = [].concat( entities );
					}
					if(entities.length >0){
						$(".entityList").empty();
						$(".entityList").append('');
						scriviEntityList(entities,idSession,restDomain);
					}else{
						$("#contenutoprincipale").empty();
						$("#contenutoprincipale").append("Questa sezione non contiene dati");
					}
				}
			},
			error: function (error) {
				$("#contenutoprincipale").empty();
				$("#contenutoprincipale").append("Servizio momentaneamente non disponibile");
			},
			complete: function () {
				$("#onLoadingList").hide();
			},timeout:5000
		});
	};
})(jQuery);
var contenutoprincipale;
function scriviEntityList(listaEntity,idSession,restDomain) {
	var content = $('#contenutoprincipale div').html();
	$('.content').remove();
	contenutoprincipale = $('#contenutoprincipale').html();
	$('#contenutoprincipale').empty();
	$('#contenutoprincipale').append('<h2>'+titolo+'</h2><div class="content"> </div>');
	$('.content').html(content);
	trDaAppendere ='';
	$.each(listaEntity, function(index,entityItem){
		trDaAppendere+='<li>';
		var descrCod=encodeURI(entityItem.descr).replace(/'/g,"%27");
		trDaAppendere+='<a href="#" title="\''+entityItem.label+'\'" onClick=" loadTable(\''+restDomain+'\',\''+idSession+'\',\''+
		entityItem.idEntity+'\',\''+entityItem.label+'\',\''+descrCod+'\',\''+
		entityItem.dataAggiornamento+'\',\''+entityItem.pathOwlEntity+'\');">'+entityItem.label+'</a>';
		trDaAppendere+='</li>';
	});
	$('.entityList').append(trDaAppendere);
};


var titolo;
(function($){
	writeDocumentTitle = function(restDomain) {
		var idSession = document.getElementById("formEntityList:idSessionList").value;
		var siteLevel = document.location;
		$.ajax({
			type: "GET",
			url: restDomain+serviceGetDocumentTitle,
			dataType: "json",
			data:'siteLevel='+siteLevel+'&idSession='+idSession,
			success: function (data) {
				titolo=data.codice;				
			},
			error: function (error) {
			},timeout:5000  
		});
	};
})(jQuery);

function loadTable(restDomain,idSession,idEntity,nomeEntity,descrEntity,dataAggiornamento,pathOwlEntity){
	setTimeout(colorTable, 500);
	$("#contenutoprincipale").empty();
	$("#contenutoprincipale").append(contenutoprincipale);
//	$("#bloccoEntityList").hide();
	//caricamento iniziale della tabella (non vengono piu ricaricate)
	$("#contenutoprincipale h2").append(nomeEntity);
	var descrDecod=decodeURI(descrEntity).replace("%27",/'/g);
//	$("#divDescrizione").html(descrDecod=='undefined'?'':descrDecod);
//	$("#divDataAggiornamento").html(dataAggiornamento=='undefined'?'':'Ultimo aggiornamento: '+dataAggiornamento);
	$(".lastupdate").html(dataAggiornamento=='undefined'?'':'Ultimo aggiornamento: '+dataAggiornamento);
	var numPaginaS = 1;
	var elemInPaginaS = 5;
	writePaginazione(restDomain,idSession,idEntity,pathOwlEntity,'',numPaginaS,elemInPaginaS);
	writeFilters(restDomain,idSession,idEntity,pathOwlEntity);
}

(function($){
	writeFilters = function(restDomain,idSession,idEntity,pathOwlEntity){
		$("#contenutoprincipale h3").append("Filtra per")
		$.ajax({
			type: "GET",
			url: restDomain+serviceGetFilter,
			dataType: "json",
			data:'idEntity='+idEntity+'&idSession='+idSession,
			success: function (data) {
				if(data==null){
//					$("#tabellaFiltri").hide();
				}
				else{
					var listaFiltri = data.filterBean;
					if( Object.prototype.toString.call( listaFiltri ) !== '[object Array]' ) {
						listaFiltri = [].concat( listaFiltri );
					}
					if(listaFiltri.length!=0){
						$('.activebg').append('<div class="row"> </div>');
						scriviTabellaFiltri(listaFiltri,idEntity,idSession,restDomain,pathOwlEntity,'');
					}
				}
				
			},
			error: function (error) {
				$("#contenutoprincipale").empty();
				$("#contenutoprincipale").append("Servizio momentaneamente non disponibile");
			}  
		});
	};
})(jQuery);

function scriviTabellaFiltri(listaFiltri,idEntity,idSession,restDomain,pathOwlEntity,filtri) {
	var trDaAppendere='';
	var stringaFiltri='';//costruisco la stringa con i nomi dei filtri da passare a filtra entity
	//controllo i filtri selezionati precedentemente
	var arrayFiltriSel;
	if(filtri!==''){
		arrayFiltriSel=filtri.split("-");
	}
	$.each(listaFiltri, function(index, filtro){
		//inizio each esterno
		stringaFiltri+=filtro.idColonna+"-";
		trDaAppendere+='<p class="col-xs-12 col-md-6"><label for="'+filtro.idColonna+'">'+filtro.name+':</label><select name="'+filtro.idColonna+'" id="'+filtro.idColonna+'">';
		trDaAppendere+='<option>'+filtro.name+'</option>';
		trDaAppendere+='<option value="0">Tutti</option>';
		var valoriPossibili = filtro.itemsFilter;
		$.each(valoriPossibili, function(index2, item){
			//inizio each interno
			if(arrayFiltriSel!=null){
				if(contains(arrayFiltriSel,item.value)){
					trDaAppendere+='<option value="'+item.value+'" selected>'+item.label+'</option>';
				}else{
					trDaAppendere+='<option value="'+item.value+'">'+item.label+'</option>';
				}
			}else{
				trDaAppendere+='<option value="'+item.value+'">'+item.label+'</option>';
			}
			//fine each interno
		});
		trDaAppendere+='</select></p>';
		
		//fine each esterno
	});
	btDaAppendere='<p class="bottoni"><input type="button" value="cerca" title="cerca" onClick="filtraEntity(\''+stringaFiltri+'\',\''+idEntity+'\',\''+idSession+'\',\''+restDomain+'\',\''+pathOwlEntity+'\');"></p>';
	$('.activebg > div:last').append(trDaAppendere);
	$('.activebg').append(btDaAppendere);
	$('#formEntityList').remove();
	$('.content').remove();
};

function filtraEntity(stringaFiltri,idEntity,idSession,restDomain,pathOwlEntity){
	setTimeout(colorTable, 300);
	var arrayIdFiltri=stringaFiltri.split("-");
	var stringaValoriFiltri='';
	$.each(arrayIdFiltri, function(index,idFiltro){
		if(idFiltro!==''){
			try{
				stringaValoriFiltri+=$("#"+idFiltro).val()+'-';// document.getElementById("formEntityTable:"+filtro.name).value; 
			}catch(err){

			}
		}
	});

	var numPaginaS = 1;
	var elemInPaginaS = 5;
	writePaginazione(restDomain,idSession,idEntity,pathOwlEntity,stringaValoriFiltri,numPaginaS,elemInPaginaS);

};

function writePaginazione(restDomain,idSession,idEntity,pathOwlEntity,filtri,numPaginaS,elemInPaginaS){
	var numTotaleRecord = 0;
	var numTotalePagine = 0;
	setTimeout(colorTable, 200);
	$.ajax({
		type: "GET",
		url: restDomain+serviceGetTotRows,
		dataType: "json",
		data:'idEntity='+idEntity+'&idSession='+idSession+'&filtri='+filtri,
		success: function (data) {
			numTotaleRecord = data;
			numTotalePagine = Math.ceil(numTotaleRecord/elemInPaginaS);
			renderBloccoPaginazione(restDomain,idSession,idEntity,pathOwlEntity,filtri,numPaginaS,elemInPaginaS,numTotaleRecord,numTotalePagine);
			
			if(filtri!==''){
				newEntityTable(restDomain,idSession,idEntity,pathOwlEntity,filtri,numPaginaS,elemInPaginaS);
			}
			else{
				writeEntityTable(restDomain,idSession,idEntity,pathOwlEntity,numPaginaS,elemInPaginaS);
			}
		},
		error: function (error) {
			$("#contenutoprincipale").empty();
			$("#contenutoprincipale").append("Servizio momentaneamente non disponibile")
		}   
	});
};

(function($){
	writeEntityTable = function(restDomain,idSession,idEntity,pathOwlEntity, numPaginaS, elemInPaginaS) {
	$("#divTabEntity").hide();
	//aggiunte da paola
	$('#form table').empty();
	$('#form table').append('<thead> </thead> <tbody> </tbody>');
		$.ajax({
			type: "GET",
			url: restDomain+serviceGetEntityRows,
			dataType: "json",
			data:'idEntity='+idEntity+'&idSession='+idSession+'&filtri=&numPagina='+numPaginaS+'&elemInPagina='+elemInPaginaS,
			success: function (data) {
//				$("#divTitolo").html(nomeEntity);
//				var descrDecod=decodeURI(descrEntity).replace("%27",/'/g);
//				$("#divDescrizione").html(descrDecod=='undefined'?'':descrDecod);
//				$("#divDataAggiornamento").html(dataAggiornamento=='undefined'?'':'Ultimo aggiornamento: '+dataAggiornamento);
				if(data==null){
					$("#contenutoprincipale").empty();
					$("#contenutoprincipale").append("Questa tabella non contiene dati");
					$(".pagination").empty();
				}
				else{
					var righe = data.rigaBean;
					if( Object.prototype.toString.call( righe ) !== '[object Array]' ) {
						righe = [].concat( righe );
					}
					if(righe.length >1){
						$("#divTabEntity").show();
						scriviTabellaEntity(righe,idSession,restDomain,idEntity,'','',pathOwlEntity,'');
					}else{
						$("#contenutoprincipale").empty();
						$(".pagination").empty();
						$("#contenutoprincipale").append("Questa tabella non contiene dati");
					}
				}
				
			},
			error: function (error) {
				$("#contenutoprincipale").empty();
				$("#contenutoprincipale").append("Servizio momentaneamente non disponibile")
//				$("#divErrore").html("Servizio momentaneamente non disponibile");
//				$("#divErrore").show();
			},
			complete: function () {
//				$("#onLoadingTable").hide();
			}   
		});
	};
})(jQuery);


//viene invocato quando si seleziona un filtro
function newEntityTable(restDomain,idSession,idEntity,pathOwlEntity,filtri,numPaginaS,elemInPaginaS){
	$("#divTabEntity").hide();
	$('#tabellaEntity').empty();
	$('#form table').empty();
	$('#tabellaEntity').append('<thead> </thead> <tbody> </tbody>');
	$('#form table').append('<thead> </thead> <tbody> </tbody>');
	$.ajax({
		type: "GET",
		url: restDomain+serviceGetEntityRows,
		dataType: "json",
		data:'idEntity='+idEntity+'&idSession='+idSession+'&filtri='+filtri+'&numPagina='+numPaginaS+'&elemInPagina='+elemInPaginaS,
		success: function (data) {
//			$("#divTitolo").html(nomeEntity);
			if(data==null){
      $('.error').remove();
				$(".pagination").empty();
				$(".num4page").empty();
				$('input[value="esporta pdf"]').remove();
				$('input[value="esporta csv"]').remove();
				$("#form").append('<div class="error" style="text-align: center;">La ricerca non ha prodotto risultati</div>');
			} else {
				var righe = data.rigaBean;
				if( Object.prototype.toString.call( righe ) !== '[object Array]' ) {
					righe = [].concat( righe );
				}
				if(righe.length>1){
					$("#divTabEntity").show();
					$('.error').remove();
					scriviTabellaEntity(righe,idSession,restDomain,idEntity,'','',pathOwlEntity,filtri);
					newFilterTable(idEntity,idSession,restDomain,pathOwlEntity,filtri);
				}else{
					$("#contenutoprincipale").empty();
					$("#contenutoprincipale").append("Questa tabella non contiene dati");
				}
			}
		},
		error: function (error) {
			$("#contenutoprincipale").empty();
			$("#contenutoprincipale").append("Servizio momentaneamente non disponibile")
//			$("#divErrore").html("Servizio momentaneamente non disponibile");
//			$("#divErrore").show();
		}   
	});
};

function newFilterTable(idEntity,idSession,restDomain,pathOwlEntity,filtri){
//	$("#divErrore").hide();
	$.ajax({
		type: "GET",
		url: restDomain+serviceGetFilter,
		dataType: "json",
		data:'idEntity='+idEntity+'&idSession='+idSession,
		success: function (data) {
			var listaFiltri = data.filterBean;
			if( Object.prototype.toString.call( listaFiltri ) !== '[object Array]' ) {
				listaFiltri = [].concat( listaFiltri );			
			}
			if(listaFiltri.length!=0){
//				$("#tabellaFiltri").empty();
				$('.activebg').append('<div class="row"> </div>');
//				$("#tabellaFiltri").show();
				scriviTabellaFiltri(listaFiltri,idEntity,idSession,restDomain,pathOwlEntity, filtri);
			}
		},
		error: function (error) {
			$("#contenutoprincipale").empty();
			$("#contenutoprincipale").append("Servizio momentaneamente non disponibile")
//			$("#divErrore").html("Servizio momentaneamente non disponibile");
//			$("#divErrore").show();
		}  
	});
};

function renderBloccoPaginazione(restDomain,idSession,idEntity,pathOwlEntity,filtri,numPaginaS,elemInPaginaS,numTotaleRecord,numTotalePagine){
	//svuoto i div prima di riempirli altrimenti accoda
	var primaPagina = 1;
	var ultimaPagina = numTotalePagine;
	
	$('.indietro').empty();
	$('.pagination li').empty();
	$('.avanti').empty();
	$('.num4page').empty();
	
	pagVerifica (numPaginaS, numTotalePagine, ultimaPagina, idSession, idEntity, pathOwlEntity, filtri, elemInPaginaS );
	
	if (numPaginaS != 1 ){
		var paginaPrecedente = +numPaginaS-1;
		var previousS = '<a href="#" title="indietro" class="indietro" onClick="writePaginazione(\''+restDomain+'\',\''+idSession+'\',\''+idEntity+'\',\''+pathOwlEntity+'\',\''+filtri+'\',\''+paginaPrecedente+'\',\''+elemInPaginaS+'\');">indietro</a>';
		$('.indietro').append(previousS);
	}
	
	
//	$('#bloccoPag').append(previousS);
	
	if (numPaginaS != numTotalePagine){
		var paginaSuccessiva = +numPaginaS+1;
		var nextS = '<a href="#" title="avanti" class="avanti" onClick="writePaginazione(\''+restDomain+'\',\''+idSession+'\',\''+idEntity+'\',\''+pathOwlEntity+'\',\''+filtri+'\',\''+paginaSuccessiva+'\',\''+elemInPaginaS+'\');">avanti</a>';
		$('.avanti').append(nextS);
	}


	//deve ripartire sempre dalla prima pagina
	var elemXpagS='<label for="num4page">Elementi per pagina</label> ';
	elemXpagS+='<select id="num4page" onChange="writePaginazione(\''+restDomain+'\',\''+idSession+'\',\''+idEntity+'\',\''+pathOwlEntity+'\',\''+filtri+'\',\''+primaPagina+'\',this.options[this.selectedIndex].value)">';

	var elemXPaginaValues = { "3": "3", "5": "5", "10": "10" , "20": "20", "50": "50", "100": "100"};
	$.each(elemXPaginaValues, function(key, value) {   
		if (key == elemInPaginaS){
			elemXpagS+='<option value="' + key + '" selected>' + value + '</option>';
		}
		else{
			elemXpagS+='<option value="' + key + '">' + value + '</option>';
		}
	});
	elemXpagS+='</select>';
	$('.num4page').append(elemXpagS);
	$("a[title='"+numPaginaS+"']").parent().addClass("active");
	
//	var $pagination = $('.less-width').clone();
//	$('.pagNew').html($pagination);
	
}

function pagVerifica (numPaginaS, numTotalePagine, ultimaPagina, idSession, idEntity, pathOwlEntity, filtri, elemInPaginaS ){
	 
	$('.pagination li').remove();
	$('.pagination').append('<li class="indietro"></li>');
	$('.pagination').append('<li class="avanti"></li>');
	
	if((numPaginaS == ultimaPagina) && ((numPaginaS-4)>0)){
		var back4 = +numPaginaS-4;
		var thisA = '<li><a href="#" title="'+back4+'" class="" onClick="writePaginazione(\''+restDomain+'\',\''+idSession+'\',\''+idEntity+'\',\''+pathOwlEntity+'\',\''+filtri+'\',\''+back4+'\',\''+elemInPaginaS+'\');">'+back4+'</a></li>';
		$( ".pagination li:last-child" ).before(thisA);
	}
	
	if((numPaginaS > 3) && (numPaginaS >= (+ultimaPagina-2))){
		var back3 = +numPaginaS-3;	
		var thisA = '<li><a href="#" title="'+back3+'" class="" onClick="writePaginazione(\''+restDomain+'\',\''+idSession+'\',\''+idEntity+'\',\''+pathOwlEntity+'\',\''+filtri+'\',\''+back3+'\',\''+elemInPaginaS+'\');">'+back3+'</a></li>';
		$( ".pagination li:last-child" ).before(thisA);
	}
	
	if(numPaginaS > 2 ){
		var back2 = +numPaginaS-2;	
		var thisA = '<li><a href="#" title="'+back2+'" class="" onClick="writePaginazione(\''+restDomain+'\',\''+idSession+'\',\''+idEntity+'\',\''+pathOwlEntity+'\',\''+filtri+'\',\''+back2+'\',\''+elemInPaginaS+'\');">'+back2+'</a></li>';
		$( ".pagination li:last-child" ).before(thisA);
	}
	
	if(numPaginaS != 1 ){
		var back = +numPaginaS-1;
		var thisA = '<li><a href="#" title="'+back+'" class="" onClick="writePaginazione(\''+restDomain+'\',\''+idSession+'\',\''+idEntity+'\',\''+pathOwlEntity+'\',\''+filtri+'\',\''+back+'\',\''+elemInPaginaS+'\');">'+back+'</a></li>';
		$( ".pagination li:last-child" ).before(thisA);
	}
	var thisS = '<li><a href="#" title="'+numPaginaS+'" class="" onClick="writePaginazione(\''+restDomain+'\',\''+idSession+'\',\''+idEntity+'\',\''+pathOwlEntity+'\',\''+filtri+'\',\''+numPaginaS+'\',\''+elemInPaginaS+'\');">'+numPaginaS+'</a></li>';
	$( ".pagination li:last-child" ).before(thisS);
	
	if (numPaginaS != numTotalePagine){
		var next = +numPaginaS+1;	
		var thisA = '<li><a href="#" title="'+next+'" class="" onClick="writePaginazione(\''+restDomain+'\',\''+idSession+'\',\''+idEntity+'\',\''+pathOwlEntity+'\',\''+filtri+'\',\''+next+'\',\''+elemInPaginaS+'\');">'+next+'</a></li>';
		$( ".pagination li:last-child" ).before(thisA);
	}
	if ((+numPaginaS+3) <= (+ultimaPagina)){
		var next2 = +numPaginaS+2;
		var thisA = '<li><a href="#" title="'+next2+'" class="" onClick="writePaginazione(\''+restDomain+'\',\''+idSession+'\',\''+idEntity+'\',\''+pathOwlEntity+'\',\''+filtri+'\',\''+next2+'\',\''+elemInPaginaS+'\');">'+next2+'</a></li>';
		$( ".pagination li:last-child" ).before(thisA);
	}
	
	if(numPaginaS == 1 || numPaginaS == 2){
		var next3 = +numPaginaS+3;
		if(next3 <= numTotalePagine){
			var thisA = '<li><a href="#" title="'+next3+'" class="" onClick="writePaginazione(\''+restDomain+'\',\''+idSession+'\',\''+idEntity+'\',\''+pathOwlEntity+'\',\''+filtri+'\',\''+next3+'\',\''+elemInPaginaS+'\');">'+next3+'</a></li>';
			$( ".pagination li:last-child" ).before(thisA);	
		}
	}

	if(((+numPaginaS-2) > (+ultimaPagina-5)) && ((+numPaginaS+3) < (+ultimaPagina-2))){
		var next3 = +numPaginaS+3;	
		var thisA = '<li><a href="#" title="'+next3+'"  class="" onClick="writePaginazione(\''+restDomain+'\',\''+idSession+'\',\''+idEntity+'\',\''+pathOwlEntity+'\',\''+filtri+'\',\''+next3+'\',\''+elemInPaginaS+'\');">'+next3+'</a></li>';
		$( ".pagination li:last-child" ).before(thisA);
	}
	
	if(numPaginaS == 1 ){
	var next4 = +numPaginaS+4;
		if(next4 <= numTotalePagine){
			var thisA = '<li><a href="#" title="'+next4+'" class="" onClick="writePaginazione(\''+restDomain+'\',\''+idSession+'\',\''+idEntity+'\',\''+pathOwlEntity+'\',\''+filtri+'\',\''+next4+'\',\''+elemInPaginaS+'\');">'+next4+'</a></li>';
			$( ".pagination li:last-child" ).before(thisA);	
		}
	}
	
}



//chiamata da scriviTabellaEntity se l'attribute e di tipo ENTITY
function getEntityTableFromPath(pathOwlEntity,rowId, rowType, idSession, restDomain, idEntity, pathOwlEntity, filtri, elemInPaginaS ){
//	$("#divDescrizione").html('');
	$(".lastupdate").html('');
//	$("#divTitolo").empty();
	$('#form table').empty();
	$('#form table').append('<thead> </thead> <tbody> </tbody>');
	$.ajax({
		type: "GET",
		url: restDomain+serviceGetThingEntity,
		dataType: "json",
		data:'pathOwlEntity='+pathOwlEntity+'&idSession='+idSession,
		success: function(thingData){
			if(thingData!=null){
				$.ajax({
					type: "GET",
					url: restDomain+serviceGetEntitySingleRow,
					dataType: "json",
					data:'idEntity='+thingData.idEntity+'&rowId='+rowId+'&rowType='+rowType+'&idSession='+idSession,
					success: function (data) {
//						$("#divTitolo").html(thingData.label);
//						$("#divDescrizione").html(thingData.descr==undefined?'':thingData.descr);
						$(".lastupdate").html(thingData.dataAggiornamento==undefined?'':'Ultimo aggiornamento: '+thingData.dataAggiornamento);
						var righe = data.rigaBean;
						if( Object.prototype.toString.call( righe ) !== '[object Array]' ) {
							righe = [].concat( righe );
						}
						if(righe.length>1){
							$('.error').remove();
							scriviTabellaEntity(righe,idSession,restDomain,thingData.idEntity,rowId,rowType,pathOwlEntity,'');
							newFilterTable(thingData.idEntity,thingData.label,idSession,restDomain,pathOwlEntity,'');
						}else{
							$("#contenutoprincipale").empty();
							$(".pagination").empty();
							$(".num4page").empty();
							$("#contenutoprincipale").append("Questa tabella non contiene dati");
						}
					},
					error: function (error) {
						$("#contenutoprincipale").empty();
						$("#contenutoprincipale").append("Servizio momentaneamente non disponibile")
//						$("#divErrore").html("Servizio momentaneamente non disponibile");
//						$("#divErrore").show();
					}   
				});
			}else{
				$("#contenutoprincipale").empty();
				$("#contenutoprincipale").append("Questa tabella non contiene dati");
			}
		},
		error: function (error) {
			$("#contenutoprincipale").empty();
			$("#contenutoprincipale").append("Servizio momentaneamente non disponibile")
//			$("#divErrore").html("Servizio momentaneamente non disponibile");
//			$("#divErrore").show();
		}   
	});
};


function scriviTabellaEntity(righe,idSession,restDomain,idEntity,rowId,rowType,pathOwlEntity,filtri) {
	var layout="HorizontalTable";
	$.ajax({
		type: "GET",
		url: restDomain+serviceGetLayout,
		dataType: "json",
		data:'idEntity='+idEntity+'&idSession='+idSession,
		success: function (data) {
			if(data!=null){
				layout=data.codice;
//				if(layout == "VerticalTable"){
//					var nomiColonne=righe[0].colonne;
//					$.each(righe, function(index, riga){
//						//inizio each esterno
//						if(index!=0){ //non considero la prima riga perch? sono le intestazioni
//							var trDaAppendere='<tr><td>';
//							var listaCol = riga.colonne;
//							$.each(listaCol, function(index2, col){
//								trDaAppendere+='<p><div class="intestazioneTrasposta"><b>'+nomiColonne[index2].valore+':</b></div><div class="contenutoTrasposta">';
//								//inizio each interno
//								if(col.tipo == 'URL'){
//									trDaAppendere+='<a href="'+col.infoAggiuntive+'" target="_blank">'+col.valore+'</a>';  
//								}else if(col.tipo == 'ENTITY'){
//									trDaAppendere+='<input class="imgDettaglio" type="button" value="'+col.valore+'" onClick="getEntityTableFromPath(\''+col.pathOwlEntity+'\',\''+col.valore+'\',\''+col.infoAggiuntive+'\',\''+idSession+'\',\''+restDomain+'\');">';       
//								}else if(col.tipo == 'FILE'){
//									trDaAppendere+='<a class="imgFile" title="download" href="'+restDomain+serviceGetFile+'?idSession='+idSession+'&idFile='+col.valore+'&callback=?"></a>'; 
//								}else if(col.tipo == 'LIST'){
//									//se ? una lista itero sulle colonne interne
//									var listaColInt = col.listaColonne;
//									$.each(listaColInt, function(index3, colInt){
//										//inizio each interno
//										if(colInt.tipo == 'URL'){
//											trDaAppendere+='<a href="'+colInt.infoAggiuntive+'" target="_blank">'+colInt.valore+'</a></br>';  
//										}else{
//											trDaAppendere+=(colInt.valore==undefined?'':colInt.valore)+'</br>';   
//										}
//										//fine each interno
//									});
//									trDaAppendere+='</div></p>';
//								}else{
//									trDaAppendere+=col.valore==undefined?'':col.valore;   
//								}
//								//fine each interno
//								trDaAppendere+='</div></p>';
//							});
//							trDaAppendere+='</td></tr>';
//							if(index==0){
//								$('#tabellaEntity > thead:last').append(trDaAppendere);
//							}else{
//								$('#tabellaEntity > tbody:last').append(trDaAppendere);
//							}
//						}
//						//fine each esterno
//					});
//				}else{
					if((layout="HorizontalTable") || (layout == "VerticalTable")){
					$.each(righe, function(index, riga){
						//inizio each esterno
						var trDaAppendere='<tr>';
						var listaCol = riga.colonne;
						$.each(listaCol, function(index2, col){
							//inizio each interno
							if(index==0){
								trDaAppendere+='<th>'+col.valore+'</th>';    
							}else{
								if(col.tipo == 'URL'){
                
                var filename = col.infoAggiuntive.substring(col.infoAggiuntive.lastIndexOf('/')+1);
                var estensione=getFileExtension(col.valore);
                var urlfinale=ucmLinkAlFile+"/"+filename+"."+estensione;
             
									trDaAppendere+='<td> <a href="'+urlfinale+'" target="_blank">'+col.valore+'</a> </td>';  
								}else if(col.tipo == 'ENTITY'){
									trDaAppendere+='<td>'+
									'<input class="imgDettaglio" type="button" value="'+col.valore+'" onClick="getEntityTableFromPath(\''+col.pathOwlEntity+'\',\''+col.valore+'\',\''+col.infoAggiuntive+'\',\''+idSession+'\',\''+restDomain+'\');">'+
									'</td>';    
								}else if(col.tipo == 'FILE'){
									trDaAppendere+='<td>'+
									'<a class="imgFile" title="download" href="'+restDomain+serviceGetFile+'?idSession='+idSession+'&idFile='+col.valore+'&callback=?"></a>'+
									'</td>';
								}else if(col.tipo == 'euro' || col.tipo == 'EURO'){				
									trDaAppendere+='<td>'+(col.valore==undefined?'':(parseInt(col.valore)).formatMoney(2, ',', '.'))+' &euro; </td> '
								}else if(col.tipo == 'LIST'){
									//se ? una lista itero sulle colonne interne
									var listaColInt = col.listaColonne;
									trDaAppendere+='<td>';
									$.each(listaColInt, function(index3, colInt){
										//inizio each interno
										if(colInt.tipo == 'URL'){
                    var filename = colInt.infoAggiuntive.substring(colInt.infoAggiuntive.lastIndexOf('/')+1);
                    var estensione=getFileExtension(colInt.valore);
                    var urlfinale=ucmLinkAlFile+"/"+filename+"."+estensione;
											trDaAppendere+='<a href="'+urlfinale+'" target="_blank">'+colInt.valore+'</a></br>';  
										}else{
											trDaAppendere+=(colInt.valore==undefined?'':colInt.valore)+'</br>';   
										}
										//fine each interno
									});
									trDaAppendere+='</td>';
									trDaAppendere+='</div></p>';
								}else{
									trDaAppendere+='<td>'+(col.valore==undefined?'':col.valore)+'</td>';   
									
								}
							}
							//fine each interno
						});
						trDaAppendere+='</tr>';
						if(index==0){
							$('#form table > thead:last').append(trDaAppendere);
						}else{
							$('#form table > tbody:last').append(trDaAppendere);
						}
						//fine each esterno
					});
				};
			}
		},complete: function(){
			for(i = 0; i < 3; i++){
				if(i==0){
					$('#contenutoprincipale > p:first').empty();
				}
				if(i==1){
					if(layout == "VerticalTable"){
						$('#contenutoprincipale > p:first').append('<input type="submit" value="esporta pdf" onClick="window.open(\''+ucmLinkAlFile+'/'+idEntity+'_PDF_VERTICALTABLE.pdf\');"> ');
					}
					else{
						$('#contenutoprincipale > p:first').append('<input type="submit" value="esporta pdf" onClick="window.open(\''+ucmLinkAlFile+'/'+idEntity+'_PDF_VERTICALTABLE.pdf\');"> ');
					}
				}
				if(i==2){
					$('#contenutoprincipale > p:first').append('<input type="submit" value="esporta csv" onClick="window.open(\''+ucmLinkAlFile+'/'+idEntity+'_CSVTABLE.csv\');"> ');	
				}
			}
		} 
	});
};

function color() {
	version = browserVer();
	if (parseInt(version) === 7 ||  parseInt(version) === 8) {
		 $("#tabellaEntityList tr:even").css("background-color", "#FF9");
	}
}

function colorTable() {
	version = browserVer();
	if (parseInt(version) === 7 ||  parseInt(version) === 8) {
		 $("#form table tr:even").css("background-color", "#DAE5F4");
	}
}


function browserVer() {
	if(!jQuery.browser){
		jQuery.browser = {};
		jQuery.browser.mozilla = false;
		jQuery.browser.webkit = false;
		jQuery.browser.opera = false;
		jQuery.browser.safari = false;
		jQuery.browser.chrome = false;
		jQuery.browser.msie = false;
		jQuery.browser.android = false;
		jQuery.browser.blackberry = false;
		jQuery.browser.ios = false;
		jQuery.browser.operaMobile = false;
		jQuery.browser.windowsMobile = false;
		jQuery.browser.mobile = false;

		var nAgt = navigator.userAgent;
		jQuery.browser.ua = nAgt;

		jQuery.browser.name  = navigator.appName;
		jQuery.browser.fullVersion  = ''+parseFloat(navigator.appVersion);
		jQuery.browser.majorVersion = parseInt(navigator.appVersion,10);
		var nameOffset,verOffset,ix;

	// In Opera, the true version is after "Opera" or after "Version"
		if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
			jQuery.browser.opera = true;
			jQuery.browser.name = "Opera";
			jQuery.browser.fullVersion = nAgt.substring(verOffset+6);
			if ((verOffset=nAgt.indexOf("Version"))!=-1)
				jQuery.browser.fullVersion = nAgt.substring(verOffset+8);
		}

	// In MSIE < 11, the true version is after "MSIE" in userAgent
		else if ( (verOffset=nAgt.indexOf("MSIE"))!=-1) {
			jQuery.browser.msie = true;
			jQuery.browser.name = "Microsoft Internet Explorer";
			jQuery.browser.fullVersion = nAgt.substring(verOffset+5);
		}

	// In TRIDENT (IE11) => 11, the true version is after "rv:" in userAgent
		else if (nAgt.indexOf("Trident")!=-1 ) {
			jQuery.browser.msie = true;
			jQuery.browser.name = "Microsoft Internet Explorer";
			var start = nAgt.indexOf("rv:")+3;
			var end = start+4;
			jQuery.browser.fullVersion = nAgt.substring(start,end);
		}

	// In Chrome, the true version is after "Chrome"
		else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
			jQuery.browser.webkit = true;
			jQuery.browser.chrome = true;
			jQuery.browser.name = "Chrome";
			jQuery.browser.fullVersion = nAgt.substring(verOffset+7);
		}
	// In Safari, the true version is after "Safari" or after "Version"
		else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
			jQuery.browser.webkit = true;
			jQuery.browser.safari = true;
			jQuery.browser.name = "Safari";
			jQuery.browser.fullVersion = nAgt.substring(verOffset+7);
			if ((verOffset=nAgt.indexOf("Version"))!=-1)
				jQuery.browser.fullVersion = nAgt.substring(verOffset+8);
		}
	// In Safari, the true version is after "Safari" or after "Version"
		else if ((verOffset=nAgt.indexOf("AppleWebkit"))!=-1) {
			jQuery.browser.webkit = true;
			jQuery.browser.name = "Safari";
			jQuery.browser.fullVersion = nAgt.substring(verOffset+7);
			if ((verOffset=nAgt.indexOf("Version"))!=-1)
				jQuery.browser.fullVersion = nAgt.substring(verOffset+8);
		}
	// In Firefox, the true version is after "Firefox"
		else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
			jQuery.browser.mozilla = true;
			jQuery.browser.name = "Firefox";
			jQuery.browser.fullVersion = nAgt.substring(verOffset+8);
		}
	// In most other browsers, "name/version" is at the end of userAgent
		else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ){
			jQuery.browser.name = nAgt.substring(nameOffset,verOffset);
			jQuery.browser.fullVersion = nAgt.substring(verOffset+1);
			if (jQuery.browser.name.toLowerCase()==jQuery.browser.name.toUpperCase()) {
				jQuery.browser.name = navigator.appName;
			}
		}

		/*Check all mobile environments*/
		jQuery.browser.android = (/Android/i).test(nAgt);
		jQuery.browser.blackberry = (/BlackBerry/i).test(nAgt);
		jQuery.browser.ios = (/iPhone|iPad|iPod/i).test(nAgt);
		jQuery.browser.operaMobile = (/Opera Mini/i).test(nAgt);
		jQuery.browser.windowsMobile = (/IEMobile/i).test(nAgt);
		jQuery.browser.mobile = jQuery.browser.android || jQuery.browser.blackberry || jQuery.browser.ios || jQuery.browser.windowsMobile || jQuery.browser.operaMobile;


	// trim the fullVersion string at semicolon/space if present
		if ((ix=jQuery.browser.fullVersion.indexOf(";"))!=-1)
			jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix);
		if ((ix=jQuery.browser.fullVersion.indexOf(" "))!=-1)
			jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix);

		jQuery.browser.majorVersion = parseInt(''+jQuery.browser.fullVersion,10);
		if (isNaN(jQuery.browser.majorVersion)) {
			jQuery.browser.fullVersion  = ''+parseFloat(navigator.appVersion);
			jQuery.browser.majorVersion = parseInt(navigator.appVersion,10);
		}
		jQuery.browser.version = jQuery.browser.majorVersion;
	}

//	var txt = '' + 'navigator.appName = ' + navigator.appName + '<br>' + 'navigator.userAgent = ' + navigator.userAgent + '<br><br><br>' + 'jQuery.browser.name  = ' + jQuery.browser.name + '<br>' + 'jQuery.browser.fullVersion  = ' + jQuery.browser.fullVersion + '<br>' + 'jQuery.browser.version = ' + jQuery.browser.version + '<br>' + 'jQuery.browser.majorVersion = ' + jQuery.browser.majorVersion + '<br><br><br>' + 'jQuery.browser.msie = ' + jQuery.browser.msie + '<br>' + 'jQuery.browser.mozilla = ' + jQuery.browser.mozilla + '<br>' + 'jQuery.browser.opera = ' + jQuery.browser.opera + '<br>' + 'jQuery.browser.chrome = ' + jQuery.browser.chrome + '<br>'+ 'jQuery.browser.webkit = ' + jQuery.browser.webkit + '<br>' + '<br>' + 'jQuery.browser.android = ' + jQuery.browser.android + '<br>' + 'jQuery.browser.blackberry = ' + jQuery.browser.blackberry + '<br>' + 'jQuery.browser.ios = ' + jQuery.browser.ios + '<br>' +  'jQuery.browser.operaMobile = ' + jQuery.browser.operaMobile + '<br>' + 'jQuery.browser.windowsMobile = ' + jQuery.browser.windowsMobile + '<br>' + 'jQuery.browser.mobile = ' + jQuery.browser.mobile;
	return jQuery.browser.version;

	}