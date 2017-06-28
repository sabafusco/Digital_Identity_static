var model;

function initPagina(){	
	BindStrutturaConsultazione();
	RegisterComponent();
	ko.applyBindings();
}
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
function BindStrutturaConsultazione(){
	$(".ko_error").dataBind({visible : "errore() != null && errore()!='' "});
	$(".ko_no_error").dataBind({visible : "errore() == null || errore()=='' "});
	$(".ko_error_message").dataBind({html : "errore()"});
	$("#annulla").dataBind({click : "function() {clearFieldsAndResults()}"});
	$(".ko_vai_alla_struttura").dataBind({attr:{action:"dettaglioStrutturaCorrellataCodice()"}});
	$(".ko_dettaglio_nome").dataBind({html : "strutturaDettaglio().nome()"});
	$(".ko_dettaglio_tipologia").dataBind({html : "strutturaDettaglio().tipologia()"});
	$(".ko_dettaglio_codice_unita").dataBind({html : "strutturaDettaglio().codice_unita()"});
	$(".ko_dettaglio_responsabile").dataBind({html : "strutturaDettaglio().responsabile()",attr:{href:"strutturaDettaglio().linkDettaglioResponsabile()"}});
	$(".ko_dettaglio_centralino").dataBind({html : "'<span class=\"text-label\">'+'Centralino:'+'</span> ' +(strutturaDettaglio().centralino())"});
	$(".ko_dettaglio_segreteria").dataBind({html : "'<span class=\"text-label\">'+'Segreteria:'+'</span> '+ strutturaDettaglio().segreteria()"});
	$(".ko_dettaglio_email").dataBind({html : "strutturaDettaglio().email()",attr:{href:"'mailto:' +strutturaDettaglio().email()",title:"'Scrivi a '+strutturaDettaglio().email()"}});
	$(".ko_dettaglio_indirizzo").dataBind({html : "'<span class=\"text-label\">'+'Indirizzo:'+'</span> '+strutturaDettaglio().indirizzo()"});
	$(".ko_dettaglio_fax").dataBind({html : "'<span class=\"text-label\">'+'Fax:'+'</span> '+strutturaDettaglio().fax()"});
	$(".ko_dettaglio_rpv").dataBind({html : "'<span class=\"text-label\">'+'RPV:'+'</span> '+strutturaDettaglio().rpv()"});
	$(".ko_dettaglio_pec").dataBind({html : "'<span class=\"text-label\">'+'PEC:'+'</span> '+strutturaDettaglio().pec()"});
	$(".ko_dettaglio_netfax").dataBind({html : "'<span class=\"text-label\">'+'Netfax:'+'</span> '+strutturaDettaglio().netfax()"});
	$(".ko_dettaglio_patrono").dataBind({html : "'<span class=\"text-label\">'+'Santo Patrono:'+'</span> '+strutturaDettaglio().patrono()"});
	$(".ko_dettaglio_barriere").dataBind({html : "'<span class=\"text-label\">'+'Barriere architettoniche:'+'</span> '+strutturaDettaglio().barriere()"});
	$(".ko_dettaglio_note").dataBind({html : "strutturaDettaglio().note()"});
	$(".ko_unita_madre_visible").dataBind({visible : "strutturaDettaglio().unitaMadreIsVisible() == true"});
	$(".ko_dettaglio_unita_madre").dataBind({html : "strutturaDettaglio().descrizioneUnitaMadre()",attr:{href:"strutturaDettaglio().linkDettaglioStrutturaMadre()"}});
	
	$(".ko_ulteriori_dettagli_struttura_visible").dataBind({visible : "strutturaDettaglio().unitaMadreIsVisible() == false"});
	$(".ko_dettaglio_figli_desc_unita").dataBind({attr : {label: "strutturaDettaglio().descrizione_unita()"},foreach : "strutturaDettaglio().figli()"});
	$(".ko_dettaglio_option_figli").dataBind({html: "$data.descrizioneUnita",attr:{value : "$data.codiceUnita"}});
	$(".ko_correlati_visible").dataBind({visible : "strutturaDettaglio().figli() != null && strutturaDettaglio().figli().length > 0"});
	

	
	$(".ko_dettaglio_cerca_personale").dataBind({attr:{href:"strutturaDettaglio().linkRicercaPersonale()"}});

	$(".ko_dettaglio_orari_visible").dataBind({visible : "strutturaDettaglio().orari().length > 0"});
	$(".ko_dettaglio_numero_orari").dataBind({html : "strutturaDettaglio().orari().length"});
	$(".ko_dettaglio_orari").dataBind({foreach : "strutturaDettaglio().orari()"});
	$(".ko_orari_id").dataBind({attr : {class:"$index()%2==0 ? 'tr_odd' : 'tr_even'",id : "$index()== ($data.numElementi()-1) ? 'fineTabellaOrariSportelli' : null"}});
	$(".ko_dettaglio_item_tipo_orari").dataBind({html : "$data.descrizioneArea() + '<span class=\"sr-only\">'+ ($data.indice()+1) +' di '+ $data.numElementi() +'</span>'"});
	$(".ko_dettaglio_item_orari").dataBind({html : "$data.stringaOrari()"});
	$(".ko_dettaglio_note_orari").dataBind({html : "$data.note"});
	$(".ko_fine_orari_visible").dataBind({if : "$index()== ($data.numElementi()-1)"});


	$(".ko_numeri_servizio_visible").dataBind({visible : "strutturaDettaglio().numeri_servizio().length > 0"});
	$(".ko_dettaglio_numero_numeri_servizio").dataBind({html : "strutturaDettaglio().numeri_servizio().length"});	
	$(".ko_numeri_servizio_loop").dataBind({foreach : "strutturaDettaglio().numeri_servizio()"});
	$(".ko_numeri_id").dataBind({attr : {class:"$index()%2==0 ? 'tr_odd' : 'tr_even'",id : "$index()== ($data.numElementi()-1) ? 'fineTabellaNumeriServizio' : null"}});
	$(".ko_dettaglio_tipo_numero_servizio").dataBind({html : "$data.descrizioneTipoTelefono() + '<span class=\"sr-only\">'+ ($data.indice()+1) +' di '+ $data.numElementi() +'</span>'"});	
	$(".ko_dettaglio_numero_servizio").dataBind({html : "$data.numeroTelefono"});
	$(".ko_dettaglio_descrizione_numero").dataBind({html : "$data.descrizioneAggiuntiva"});
	$(".ko_dettaglio_piano_numero").dataBind({html : "$data.piano"});
	$(".ko_dettaglio_stanza_numero").dataBind({html : "$data.stanza"});
	$(".ko_fine_numeri_visible").dataBind({if : "$index()== ($data.numElementi()-1)"});
	
	$(".ko_emails_visible").dataBind({visible : "strutturaDettaglio().emails().length > 0"});
	$(".ko_dettaglio_numero_email").dataBind({html : "strutturaDettaglio().emails().length"});
	$(".ko_dettaglio_emails_loop").dataBind({foreach : "strutturaDettaglio().emails()"});
	$(".ko_emails_id").dataBind({attr : {class:"$index()%2==0 ? 'tr_odd' : 'tr_even'",id : "$index()== ($data.numElementi()-1) ? 'fineTabellaMail' : null"}});
	$(".ko_dettaglio_descrizione_email").dataBind({html : "$data.descrizioneTipoEMail()+ '<span class=\"sr-only\">'+ ($data.indice()+1) +' di '+ $data.numElementi() +'</span>'"});
	$(".ko_dettaglio_email_sede").dataBind({html : "$data.eMail()",attr:{href:"'mailto:'+$data.eMail()",title:"'Scrivi a '+$data.eMail()"}});
	$(".ko_fine_email_visible").dataBind({if : "$index()== ($data.numElementi()-1)"});
	
	
	$(".boxRisultatiRicerca").dataBind({visible : "struttureList().length > 0  && !isError()"});
	$(".ko_numero_strutture").dataBind({text : "struttureList().length"});
	$(".erroreRisultatoRicerca").dataBind({html : "erroreRisultatoRicerca()"});
	$(".errorBox").dataBind({visible : "isError()"});
	
	
	$(".ko_button_nuova_ricerca").dataBind({click : "function() {cleanSearchFields()}"});
	//form ricerca dipendente
	$(".ko_form_cerca_struttura").dataBind({submit : "function() {search()}"});
	$(".ko_risultato_strutture").dataBind({if : "struttureList().length > 0 && !isError()"});
	
	//FOREACH
	$(".ko_tabella_struttrue").dataBind({foreach : "struttureList() "});	
	$(".ko_row_class").dataBind({attr : {class:"$index()%2==0 ? 'tr_odd' : 'tr_even'",id:"$index()== ($data.numElementi()-1)? 'fineTabellaStrutture' : null"}});
	$(".ko_nome_elenco").dataBind({text : "descrizioneUnita()",attr:{href:"linkDettaglio()"}});
	$(".ko_centralino_elenco").dataBind({text : "centralino()"});
	$(".ko_rpvsegreteria_elenco").dataBind({text : "rpv()+'/'+segreteria()"});
	$(".ko_indirizzo_elenco").dataBind({text : "indirizzo()"});
	$(".ko_email_elenco").dataBind({text : "email()"});
	$(".ko_pec_elenco").dataBind({text : "pec()"});
	$(".ko_fine_tabella_strutture_visible").dataBind({if : "$index()== ($data.numElementi()-1)"});
	
	 
}	

function RegisterComponent(){
	var templateElement = document.getElementById("contenutoprincipale");
	ko.components.register('strutturaConsultazione', {
		viewModel: {
			createViewModel: function(params, componentInfo) {
				model = new StrutturaConsultazioneViewModel(params);
				return model;
			}
		},
		template : {element : templateElement}
	});
}
