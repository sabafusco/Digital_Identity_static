var model;

function initPagina(){
	ko.bindingHandlers.initValue = {
	    init: function(element, valueAccessor) {
	        var value = valueAccessor();
	        value(element.value);
//		        ko.applyBindings();
	    }
	};

	ko.bindingHandlers.valueWithInit = {
	    init: function(element, valueAccessor, allBindings, data, context) {
	        ko.applyBindingsToNode(element, { initValue: valueAccessor() }, context);
	        ko.applyBindingsToNode(element, { value: valueAccessor() }, context);
	    }
	};

	BindStruttura();
	RegisterComponent();
	ko.applyBindings();
}


function BindStruttura(){
	//form ricerca tasti inserisci struttura
	$(".ko_form_struttura_op_ins").dataBind({attr : {disabled : "disableBtnAddStruttura"} , click : "function() {btnNew()}"});

	//form ricerca strutture
	$(".ko_form_ricerca_struttura").dataBind({submit : "function() {search()}"});
	$(".ko_form_ricerca_struttura_annulla").dataBind({click : "function() {emptyFormRicerca()}"});
	$(".ko_form_ricerca_struttura_nome").dataBind({value : "formRicercaStrutturaNome"});
	$(".ko_form_ricerca_struttura_tipo").dataBind({value : "formRicercaStrutturaTipo"});
	$(".ko_form_ricerca_struttura_codice_unita").dataBind({value : "formRicercaStrutturaUnita"});
	$(".ko_form_ricerca_struttura_cap").dataBind({value : "formRicercaStrutturaCap"});
	
	//form operazione add e  edit
	$(".ko_form_struttura_op_codice_unita").dataBind({value : "formOperationStrutturaCodiceUnita"});

	//paginazione
	$(".ko_struttura_pagination_current_page").dataBind({value : "currentPage"});
	$(".ko_struttura_pagination_num").dataBind({value : "itemsPerPage",  event:{ change: "function() {loadPage(1)}"}});
	$(".ko_struttura_pagination").dataBind({foreach : "pages()"});
	$(".ko_struttura_pagination_li").dataBind({css : "$data.css"});
	$(".ko_struttura_pagination_a").dataBind({html : "$data.text", click : "function() {$parent.loadPage($data.text)}"});
	
	//Risultato ricerca
	$(".ko_risultato_ricerca_struttura").dataBind({visible : "struttureList().length"});

	//creazione riga tabella strutture
	$(".ko_table_tbody_struttura").dataBind({foreach : "struttureList()"});
	$(".ko_table_struttura_descrizione").dataBind({html : "descrizioneUnita"});
	$(".ko_table_struttura_tipo").dataBind({html : "descrizioneTipoUnita"});
	$(".ko_table_struttura_centralino").dataBind({html : "centralino"});
	$(".ko_table_struttura_segreteria").dataBind({html : "segreteria"});
	$(".ko_table_struttura_email").dataBind({html : "email"});
	$(".ko_table_struttura_func_edit").dataBind({click : "function() {$parent.btnModifica($data.codiceUnita())}", visible : "permessi().isEdit"});
	$(".ko_table_struttura_func_del").dataBind({click : "function() {$parent.btnElimina($data.codiceUnita())}", visible : "permessi().isDel"});
	
	
	$(".ko_form_struttura").dataBind({submit : "submitStrutturaForm"});	
	$(".ko_form_struttura_operation").dataBind({value : "formStrutturaOperazione"});
	$(".ko_form_struttura_unita").dataBind({value : "formStrutturaCodiceTipoUnita"});
	$(".ko_form_struttura_descrizione").dataBind({value : "formStrutturaDescrizioneUnita"});
	$(".ko_form_struttura_unita_madre").dataBind({value : "formStrutturaCodiceUnitaMadre"});
	$(".ko_form_struttura_sigla").dataBind({value : "formStrutturaSiglaUnita"});
	$(".ko_form_struttura_citta").dataBind({value : "formStrutturaCitta"});
	$(".ko_form_struttura_indirizzo").dataBind({value : "formStrutturaIndirizzo"});
	$(".ko_form_struttura_provincia").dataBind({value : "formStrutturaProvincia"});
	$(".ko_form_struttura_barriere_archittettoniche").dataBind({checked : "formStrutturaBarriereArchitettoniche"});

	
	$(".ko_form_struttura_cap").dataBind({value : "formStrutturaCap"});
	$(".ko_form_struttura_rpv").dataBind({value : "formStrutturaRpv"});
	$(".ko_form_struttura_santoGG").dataBind({value : "formStrutturaSantoGG"});
	$(".ko_form_struttura_santoMM").dataBind({value : "formStrutturaSantoMM"});
	$(".ko_form_struttura_note").dataBind({value : "formStrutturaNote"});
	$(".ko_form_struttura_unita_hr").dataBind({value : "formStrutturaUnitaHR"});
//	$(".ko_form_struttura_abilita_modifica").dataBind({checked : "formStrutturaAbilitaModifica",click : "function() {return abilitaModifiche()}"});
	$(".ko_form_struttura_abilita_modifica").dataBind({checked : "formStrutturaAbilitaModifica", event: {change: "function() { abilitaModifiche()}"}});
	$(".ko_form_struttura_btn_annulla").dataBind({click : "function() {return setFormStruttura()}"});
	$(".ko_form_struttura_btn_indietro").dataBind({click : "function() {return annullaOperazione()}"});
	
	$(".ko_form_email").dataBind({submit : "submitEmailForm"});	
	$(".ko_form_email_operation").dataBind({value : "formEmailOperazione"});	
	$(".ko_form_email_new_old").dataBind({value : "formEmailOldEmail"});	
	$(".ko_form_email_new").dataBind({value : "formEmailNewEmail"});	
	$(".ko_form_email_new_desc").dataBind({value : "formEmailNewIdDesc"});	
	$(".ko_form_email_close").dataBind({click : "function() {closeEmailForm()}"});
	
	$(".ko_form_tel").dataBind({submit : "submitTelForm"});	
	$(".ko_form_tel_operation").dataBind({value : "formTelOperazione"});	
	$(".ko_form_tel_new_old").dataBind({value : "formTelOldTel"});	
	$(".ko_form_tel_new").dataBind({value : "formTelNewTel"});	
	$(".ko_form_tel_new_desc").dataBind({value : "formTelNewIdDesc"});	
	$(".ko_form_tel_new_desc_agg").dataBind({value : "formTelNewDescAgg"});	
	$(".ko_form_tel_new_piano").dataBind({value : "formTelNewPiano"});	
	$(".ko_form_tel_new_stanza").dataBind({value : "formTelNewStanza"});	
	$(".ko_form_tel_close").dataBind({click : "function() {closeTelForm()}"});

	$(".ko_struttura_email_list").dataBind({foreach : "emailList()"});
	$(".ko_struttura_email").dataBind({html : "eMail"});	
	$(".ko_struttura_email_desc").dataBind({html : "descrizioneTipoEMail",attr: {id: "tipoEMail"}});
	$(".ko_struttura_email_edit").dataBind({click : "function() {$parent.viewEmailForm($data,'EDIT')}", visible : "permessi().isEdit"});
	$(".ko_struttura_email_del").dataBind({click : "function() {$parent.viewEmailForm($data,'DEL')}", visible : "permessi().isDel"});
	$(".ko_struttura_email_add").dataBind({click : "function() {$parent.viewEmailForm($data,'ADD')}", visible : "permessi().isAdd"});
	
	$(".ko_struttura_tel_list").dataBind({foreach : "telList()"});
	$(".ko_struttura_tel_desc").dataBind({html : "descrizioneTipoTelefono",attr: {id: "tipoTelefono"}});
	$(".ko_struttura_tel").dataBind({html : "numeroTelefono"});
	$(".ko_struttura_tel_desc_agg").dataBind({html : "descrizioneAggiuntiva"});
	$(".ko_struttura_tel_piano").dataBind({html : "piano"});
	$(".ko_struttura_tel_stanza").dataBind({html : "stanza"});	
	$(".ko_struttura_tel_edit").dataBind({click : "function() {$parent.viewTelForm($data,'EDIT')}", visible : "permessi().isEdit"});
	$(".ko_struttura_tel_del").dataBind({click : "function() {$parent.viewTelForm($data,'DEL')}", visible : "permessi().isDel"});
	$(".ko_struttura_tel_add").dataBind({click : "function() {$parent.viewTelForm($data,'ADD')}", visible : "permessi().isAdd"});	

	$(".ko_struttura_orario_list").dataBind({foreach : "orarioList()"});
	$(".ko_struttura_orario_sportello").dataBind({html : "descrizioneArea", attr: { rowspan: "$data.altriGiorni().length + 1" }});
	$(".ko_struttura_first_orario_giorno").dataBind({html : "primoGiorno().giorno"});
	$(".ko_struttura_first_orario_inizio_0").dataBind({html : "primoGiorno().inizio0"});
	$(".ko_struttura_first_orario_fine_0").dataBind({html : "primoGiorno().fine0"});
	$(".ko_struttura_first_orario_inizio_1").dataBind({html : "primoGiorno().inizio1"});
	$(".ko_struttura_first_orario_fine_1").dataBind({html : "primoGiorno().fine1"});
	$(".ko_struttura_first_orario_inizio_2").dataBind({html : "primoGiorno().inizio2"});
	$(".ko_struttura_first_orario_fine_2").dataBind({html : "primoGiorno().fine2"});
	$(".ko_struttura_first_orario_inizio_3").dataBind({html : "primoGiorno().inizio3"});
	$(".ko_struttura_first_orario_fine_3").dataBind({html : "primoGiorno().fine3"});
	$(".ko_struttura_first_orario_avviso").dataBind({html : "primoGiorno().note", attr: { rowspan: "$data.altriGiorni().length + 1" }});
	$(".ko_struttura_orario_sportello_func").dataBind({attr: { rowspan: "$data.altriGiorni().length + 1" }});
	$(".ko_struttura_orario_edit").dataBind({click : "function() {$parent.viewOrarioForm($data,'EDIT')}", visible : "permessi().isEdit"});
	$(".ko_struttura_orario_del").dataBind({click : "function() {$parent.viewOrarioForm($data,'DEL')}", visible : "permessi().isDel"});
	
	$(".ko_form_orario").dataBind({submit : "submitOrarioForm"});	
	$(".ko_orario_form_note").dataBind({value:"formOrarioNote"});
	$(".ko_orario_form_lun_inizio_0").dataBind({options : "orarioOptions", value:"formOrarioLunInizio0", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_lun_fine_0").dataBind({options : "orarioOptions", value:"formOrarioLunFine0", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_lun_inizio_1").dataBind({options : "orarioOptions", value:"formOrarioLunInizio1", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_lun_fine_1").dataBind({options : "orarioOptions", value:"formOrarioLunFine1", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_lun_inizio_2").dataBind({options : "orarioOptions", value:"formOrarioLunInizio2", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_lun_fine_2").dataBind({options : "orarioOptions", value:"formOrarioLunFine2", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_lun_inizio_3").dataBind({options : "orarioOptions", value:"formOrarioLunInizio3", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_lun_fine_3").dataBind({options : "orarioOptions", value:"formOrarioLunFine3", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_mar_inizio_0").dataBind({options : "orarioOptions", value:"formOrarioMarInizio0", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_mar_fine_0").dataBind({options : "orarioOptions", value:"formOrarioMarFine0", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_mar_inizio_1").dataBind({options : "orarioOptions", value:"formOrarioMarInizio1", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_mar_fine_1").dataBind({options : "orarioOptions", value:"formOrarioMarFine1", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_mar_inizio_2").dataBind({options : "orarioOptions", value:"formOrarioMarInizio2", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_mar_fine_2").dataBind({options : "orarioOptions", value:"formOrarioMarFine2", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_mar_inizio_3").dataBind({options : "orarioOptions", value:"formOrarioMarInizio3", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_mar_fine_3").dataBind({options : "orarioOptions", value:"formOrarioMarFine3", optionsText: "'name'", optionsValue : "'value'"});	
	$(".ko_orario_form_mer_inizio_0").dataBind({options : "orarioOptions", value:"formOrarioMerInizio0", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_mer_fine_0").dataBind({options : "orarioOptions", value:"formOrarioMerFine0", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_mer_inizio_1").dataBind({options : "orarioOptions", value:"formOrarioMerInizio1", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_mer_fine_1").dataBind({options : "orarioOptions", value:"formOrarioMerFine1", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_mer_inizio_2").dataBind({options : "orarioOptions", value:"formOrarioMerInizio2", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_mer_fine_2").dataBind({options : "orarioOptions", value:"formOrarioMerFine2", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_mer_inizio_3").dataBind({options : "orarioOptions", value:"formOrarioMerInizio3", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_mer_fine_3").dataBind({options : "orarioOptions", value:"formOrarioMerFine3", optionsText: "'name'", optionsValue : "'value'"});	
	$(".ko_orario_form_gio_inizio_0").dataBind({options : "orarioOptions", value:"formOrarioGioInizio0", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_gio_fine_0").dataBind({options : "orarioOptions", value:"formOrarioGioFine0", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_gio_inizio_1").dataBind({options : "orarioOptions", value:"formOrarioGioInizio1", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_gio_fine_1").dataBind({options : "orarioOptions", value:"formOrarioGioFine1", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_gio_inizio_2").dataBind({options : "orarioOptions", value:"formOrarioGioInizio2", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_gio_fine_2").dataBind({options : "orarioOptions", value:"formOrarioGioFine2", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_gio_inizio_3").dataBind({options : "orarioOptions", value:"formOrarioGioInizio3", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_gio_fine_3").dataBind({options : "orarioOptions", value:"formOrarioGioFine3", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_ven_inizio_0").dataBind({options : "orarioOptions", value:"formOrarioVenInizio0", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_ven_fine_0").dataBind({options : "orarioOptions", value:"formOrarioVenFine0", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_ven_inizio_1").dataBind({options : "orarioOptions", value:"formOrarioVenInizio1", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_ven_fine_1").dataBind({options : "orarioOptions", value:"formOrarioVenFine1", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_ven_inizio_2").dataBind({options : "orarioOptions", value:"formOrarioVenInizio2", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_ven_fine_2").dataBind({options : "orarioOptions", value:"formOrarioVenFine2", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_ven_inizio_3").dataBind({options : "orarioOptions", value:"formOrarioVenInizio3", optionsText: "'name'", optionsValue : "'value'"});
	$(".ko_orario_form_ven_fine_3").dataBind({options : "orarioOptions", value:"formOrarioVenFine3", optionsText: "'name'", optionsValue : "'value'"});
}	

function RegisterComponent(){
	var templateElement = document.getElementById("contenutoprincipale");
	ko.components.register('struttura', {
		viewModel: {
			createViewModel: function(params, componentInfo) {
				model = new StrutturaViewModel(params);
				return model;
			}
		},
		template : {
			element : templateElement
		}
	});
}
