function initPagina(){	
	BindSovvenzione();
	RegisterComponent();	
	ko.applyBindings();
}

function BindSovvenzione(){
	//inserisci sovvenzione
	$(".ko_form_sovvenzione_impresa_op_ins").dataBind({attr : {disabled : "disableSovvenzioni"},click : "function() {btnNew('IMPRESA')}"});
	$(".ko_form_sovvenzione_persona_op_ins").dataBind({attr : {disabled : "disableSovvenzioni"},click : "function() {btnNew('PERSONA_FISICA')}"});

	//form operazione add e edit
	$(".ko_sovvenzione_form_op_tipoSovvenzione").dataBind({value : "formOperationSovvenzioneTipo"});
	$(".ko_sovvenzione_form_op_idSovvenzione").dataBind({value : "formOperationSovvenzioneId"});

	//form ricerca sovvenzioni
	$(".ko_sovvenzione_search_cognome").dataBind({value: "searchFormCognome"});
	$(".ko_sovvenzione_search_codice_caso").dataBind({value: "searchFormCodiceCaso"});
	$(".ko_sovvenzione_search_codice_fiscale").dataBind({value: "searchFormCodiceFiscale"});
	$(".ko_sovvenzione_search_denominazione_impresa").dataBind({value: "searchFormDenominazioneImpresa"});
	$(".ko_sovvenzione_search_dati_fiscali").dataBind({value: "searchFormDatiFiscali"});
	$(".ko_sovvenzione_search_annulla").dataBind({click : "function() {emptyFormSearch()}"});
	$(".ko_sovvenzione_search_submit").dataBind({attr : {disabled : "disableSovvenzioni"}});
	$(".ko_sovvenzione_search").dataBind({submit : "function() {searchSovvenzione()}"});
	
	//paginazione
	$(".ko_sovvenzione_pagination_current_page").dataBind({value : "currentPage"});
	$(".ko_sovvenzione_pagination_num_elementi").dataBind({value : "numElementi"});
	$(".ko_sovvenzione_pagination_num").dataBind({value : "itemsPerPage",  event:{ change: "function() {loadPage(1)}"}});
	$(".ko_sovvenzione_pagination").dataBind({foreach : "pages()"});
	$(".ko_sovvenzione_pagination_li").dataBind({css : "$data.css"});
	$(".ko_sovvenzione_pagination_a").dataBind({html : "$data.text", click : "function() {$parent.loadPage($data.text)}"});
	
	//Risultato ricerca
	$(".ko_risultato_ricerca_sovvenzione").dataBind({visible : "sovvenzioneList().length"});
	
	//creazione riga tabella sovvenzioni
	$(".ko_sovvenzione_list").dataBind({foreach : "sovvenzioneList()"});
	$(".ko_sovvenzione_beneficiario").dataBind({html : "beneficiario"});
	$(".ko_sovvenzione_datiFiscali").dataBind({html : "datiFiscali"});
	$(".ko_sovvenzione_provvedimento").dataBind({html : "provvedimento"});
	$(".ko_sovvenzione_dataProvvedimento").dataBind({html : "dataProvvedimento"});
//	$(".ko_sovvenzione_dettaglio").dataBind({click : "function() {$parent.btnModifica(tipo)}"});
	$(".ko_sovvenzione_dettaglio").dataBind({click : "function() {$parent.btnModifica(id(),tipo())}", visible : "permessi().isEdit"});
	$(".ko_sovvenzione_elimina").dataBind({click : "function() {$parent.btnElimina(id(),tipo())}", visible : "permessi().isDel"});
	
//	$(".ko_form_impresa").dataBind({submit : "addSovvenzioneImpresa"});
	$(".ko_nuova_impresa_label").dataBind({html: "formImpresaOperazione() == 'MOD' ? labelModificaSovvenzione : labelNuovaSovvenzione"});
	$(".ko_form_impresa_operazione").dataBind({value: "formImpresaOperazione"});
	$(".ko_form_impresa_id").dataBind({value: "formImpresaId"});
	$(".ko_form_impresa_anag_denominazione").dataBind({value: "formImpresaAnagDenominazione"});
	$(".ko_form_impresa_anag_dati_fiscali").dataBind({value: "formImpresaAnagDatiFiscali"});
	$(".ko_form_impresa_anag_curriculum").dataBind({value: "formImpresaAnagCurriculum"});
	
	$(".ko_form_impresa_anag_nome").dataBind({value: "formImpresaAnagNome"});
	$(".ko_form_impresa_anag_cognome").dataBind({value: "formImpresaAnagCognome"});
	$(".ko_form_impresa_anag_codice_fiscale").dataBind({value: "formImpresaAnagCodiceFiscale"});
	$(".ko_form_impresa_anag_codice_caso").dataBind({value: "formImpresaAnagCodiceCaso"});
	
	
	
//	$(".ko_dettaglio_impresa_prov_link").dataBind({attr: { href: "linkProvvedimentoStartHttp()"},html: "sovvenzioneSelected().linkProvvedimento()"});	
//	$(".ko_dettaglio_impresa_prog_link").dataBind({attr: { href: "linkProgettoStartHttp()"},html: "sovvenzioneSelected().linkProgetto()"});	
//	$(".ko_dettaglio_impresa_revo_link").dataBind({attr: { href: "linkRevocaStartHttp()"},html: "sovvenzioneSelected().linkRevoca()"});	

	
	//$(".ko_form_impresa_prov_ufficio").dataBind({value: "formImpresaProvUfficio"});
	$(".ko_form_impresa_prov_ufficio").dataBind({options : "selectUfficioOptions", value:"formImpresaProvUfficio", optionsText: "'name'", optionsValue : "'value'"});	
	$(".ko_form_impresa_prov_codice_unita").dataBind({value: "formImpresaProvCodiceUnita"});
	$(".ko_form_impresa_prov_responsabile_nome").dataBind({value: "formImpresaProvResponsabileNome"});
	$(".ko_form_impresa_prov_responsabile_cognome").dataBind({value: "formImpresaProvResponsabileCognome"});
	//$(".ko_form_impresa_prov_data").dataBind({value: "formImpresaProvData"});
	$(".ko_form_impresa_prov_data").dataBind({value : "formImpresaProvData", click : "function() {showDatepicker()}"});
	$(".ko_form_impresa_prov_modalita").dataBind({value: "formImpresaProvModalita"});
	$(".ko_form_impresa_prov_importo_ammesso").dataBind({value: "formImpresaProvImportoAmmesso"});
	$(".ko_form_impresa_prov_norma_assegnazione").dataBind({value: "formImpresaProvNormaAssegnazione"});
	$(".ko_form_impresa_prov_numero_protocollo").dataBind({value: "formImpresaProvNumeroProtocollo"});
	$(".ko_form_impresa_prov_nome").dataBind({value: "formImpresaProvNome"});
	$(".ko_form_impresa_prov_file").dataBind({value: "formImpresaProvFile"});
	$(".ko_form_impresa_prov_file_url").dataBind({attr: { href: "formImpresaProvFileUrl"},html: "formImpresaProvFileNome"});
	$(".ko_form_impresa_prov_link").dataBind({value: "formImpresaProvLink"});
	$(".ko_form_impresa_prog_cup").dataBind({value: "formImpresaProgCup"});
	$(".ko_form_impresa_prog_importo_erogato").dataBind({value: "formImpresaProgImportoErogato"});
	$(".ko_form_impresa_prog_numero_protocollo").dataBind({value: "formImpresaProgNumeroProtocollo"});
	$(".ko_form_impresa_prog_nome").dataBind({value: "formImpresaProgNome"});
	$(".ko_form_impresa_prog_file").dataBind({value: "formImpresaProgFile"});
	$(".ko_form_impresa_prog_file_url").dataBind({attr: { href: "formImpresaProgFileUrl"},html: "formImpresaProgFileNome"});
	$(".ko_form_impresa_prog_link").dataBind({value: "formImpresaProgLink"});
	$(".ko_form_impresa_revo_atto").dataBind({value: "formImpresaRevoAtto"});
	$(".ko_form_impresa_revo_numero_protocollo").dataBind({value: "formImpresaRevoNumeroProtocollo"});
	$(".ko_form_impresa_revo_nome").dataBind({value: "formImpresaRevoNome"});
	$(".ko_form_impresa_revo_file").dataBind({value: "formImpresaRevoFile"});
	$(".ko_form_impresa_revo_file_url").dataBind({attr: { href: "formImpresaRevoFileUrl"},html: "formImpresaRevoFileNome"});
	$(".ko_form_impresa_revo_link").dataBind({value: "formImpresaRevoLink"});
	
	$(".ko_sovvenzione_form_buttonReset").dataBind({click : "function() {return resetFormSovvenzione()}"});
	$(".ko_sovvenzione_form_buttonIndietro").dataBind({click : "function() {return annullaOperazione()}"});
	//$(".ko_sovvenzione_form").dataBind({submit : "submitSovvenzioneForm"});
	
}


function RegisterComponent(){
	var templateElement = document.getElementById("contenutoprincipale");
	ko.components.register('sovvenzione', {
		viewModel: {
			createViewModel: function(params, componentInfo) {
				sovvenzioneVM = new SovvenzioneViewModel(params);
				return sovvenzioneVM;
			}
		},
		template : {element : templateElement}
	});
}