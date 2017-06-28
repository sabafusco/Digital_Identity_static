var model;

function initPagina(){	
	BindUtente();
	RegisterComponent();
	ko.applyBindings();
}

function BindUtente(){
	//form ricerca tasti inserisci dipendente
	$(".ko_form_dipendente_op_ins").dataBind({attr : {disabled : "disableBtnAddUtente"}, click : "function() {btnNew()}"});

	//form ricerca strutture
	$(".ko_form_ricerca_dipendente").dataBind({submit : "function() {search()}"});
	$(".ko_form_ricerca_dipendente_annulla").dataBind({click : "function() {emptyFormRicerca()}"});
	$(".ko_form_ricerca_dipendente_cognome").dataBind({value : "formRicercaDipendenteCognome"});
	$(".ko_form_ricerca_dipendente_matricola").dataBind({value : "formRicercaDipendenteMatricola"});
	$(".ko_form_ricerca_dipendente_unita").dataBind({value : "formRicercaDipendenteUnita"});

	//form operazione add e  edit
	$(".ko_form_dipendente_op_matricola").dataBind({value : "formOperationDipendenteMatricola"});

	//paginazione
	$(".ko_dipendente_pagination_current_page").dataBind({value : "currentPage"});
	$(".ko_dipendente_pagination_num").dataBind({value : "itemsPerPage",  event:{ change: "function() {loadPage(1)}"}});
	$(".ko_dipendente_pagination").dataBind({foreach : "pages()"});
	$(".ko_dipendente_pagination_li").dataBind({css : "$data.css"});
	$(".ko_dipendente_pagination_a").dataBind({html : "$data.text", click : "function() {$parent.loadPage($data.text)}"});

	//Risultato ricerca
	$(".ko_risultato_ricerca_dipendenti").dataBind({visible : "dipendenteList().length"});

	//creazione riga tabella dipendente
	$(".ko_table_tbody_dipendente").dataBind({foreach : "dipendenteList()"});
	$(".ko_table_tr_dipendente").dataBind({attr : {class : "$index()%2==0 ? 'tr_odd' : 'tr_even'"}});
	$(".ko_table_dipendente_nominativo").dataBind({html: "$data.cognome() + ' ' + $data.nome()"});
	$(".ko_table_dipendente_nominativo_all").dataBind({html: "$parent.cognome() + ' ' + $parent.nome()"});
	$(".ko_table_dipendente_nominativo_span").dataBind({text: "'Utente con '+($data.allocazioneDipendenteList().length + 1)+' risultati'"});
	$(".ko_table_dipendente_span_a").dataBind({text: "'1 di '+($data.allocazioneDipendenteList().length + 1)"});
	$(".ko_table_dipendente_username").dataBind({html : "matricola"});
	$(".ko_table_dipendente_email").dataBind({html : "email"});
	$(".ko_table_first_allocazione_rpv_tel").dataBind({html : "firstAllocazioneDipendente().telefono"});
	$(".ko_table_first_allocazione_unita").dataBind({html : "firstAllocazioneDipendente().unita"});
	//$(".ko_table_dipendente_func").dataBind({attr: { rowspan: "$data.allocazioneDipendenteList().length + 1" }});	
	$(".ko_table_dipendente_func_edit").dataBind({click : "function() {$parent.btnModifica($data.matricola())}", visible : "permessi().isEdit"});
	$(".ko_table_dipendente_func_del").dataBind({click : "function() {$parent.btnElimina($index())}", visible : "permessi().isDel"});
	
	//form anagrafica
	$(".ko_dipendente_form").dataBind({submit : "submitDipendenteForm"});
	$(".ko_dipendente_form_buttonSumit").dataBind({attr : {disabled : "formDipendenteDisabled"}});
	$(".ko_dipendente_form_buttonReset").dataBind({click : "function() {resetDipendenteForm()}", attr : {disabled : "formDipendenteDisabled"}});
	$(".ko_dipendente_form_buttonIndietro").dataBind({click : "function() {return annullaOperazione()}"});
	
	$(".ko_dipendente_form_cognome").dataBind({value : "formDipendenteCognome", attr : {disabled : "formDipendenteDisabled"}});
	$(".ko_dipendente_form_nome").dataBind({value : "formDipendenteNome", attr : {disabled : "formDipendenteDisabled"}});
	$(".ko_dipendente_form_sesso").dataBind({value : "formDipendenteSesso", attr : {disabled : "formDipendenteDisabled"}});
	$(".ko_dipendente_form_data_nascita").dataBind({value : "formDipendenteDataNascita", attr : {disabled : "formDipendenteDisabled"}, click : "function() {showDatepicker()}"});
	$(".ko_dipendente_form_provincia").dataBind({value : "formDipendenteProvincia", attr : {disabled : "formDipendenteDisabled"}});
	$(".ko_dipendente_form_comuneNascitaDescr").dataBind({value : "formDipendenteComuneNascitDes", attr : {disabled : "formDipendenteDisabled"}});
	$(".ko_dipendente_form_comuneNascitaIstat").dataBind({value : "formDipendenteComuneNascitIstat", attr : {disabled : "formDipendenteDisabled"}});
	$(".ko_dipendente_form_codicefiscale").dataBind({value : "formDipendenteCodiceFiscale", attr : {disabled : "formDipendenteDisabled"}});
	$(".ko_dipendente_form_username").dataBind({value : "formDipendenteUserName", attr : {disabled : "formDipendenteDisabled"}});
	$(".ko_dipendente_form_email").dataBind({value : "formDipendenteEmail", attr : {disabled : "formDipendenteDisabled"}});	
	$(".ko_dipendente_form_utenteHR").dataBind({value : "formDipendenteUtenteHR", attr : {disabled : "formDipendenteDisabled"}});
	
	
	//form allocazione
	$(".ko_allocazione_form").dataBind({submit : "submitAllocazioneForm"});	
	$(".ko_allocazione_form_unita").dataBind({value : "formAllocazioneUnita"});
	$(".ko_allocazione_form_unitaDescr").dataBind({value : "formAllocazioneUnitaDes"});
	$(".ko_allocazione_form_ufficio").dataBind({value : "formAllocazioneUfficio"});
	$(".ko_allocazione_form_incarico").dataBind({value : "formAllocazioneIncarico"});
	$(".ko_allocazione_form_interno").dataBind({value : "formAllocazioneInterno"});
	$(".ko_allocazione_form_telefono").dataBind({value : "formAllocazioneTelefono"});
	$(".ko_allocazione_form_fax").dataBind({value : "formAllocazioneFax"});
	$(".ko_allocazione_form_piano").dataBind({value : "formAllocazionePiano"});
	$(".ko_allocazione_form_stanza").dataBind({value : "formAllocazioneStanza"});
	$(".ko_allocazione_form_cellulare").dataBind({value : "formAllocazioneCellulare"});
	$(".ko_allocazione_form_num_breve").dataBind({value : "formAllocazioneNumBreve"});
	$(".ko_allocazione_form_close").dataBind({click : "function() {closeAllocazioneForm()}"});

	//creazione riga tabella allocazioni
	$(".ko_allocazione").dataBind({foreach : "allocazioneList()"});
	$(".ko_allocazione_unita").dataBind({html : "unita"});
	$(".ko_allocazione_ufficio").dataBind({html : "ufficio"});
	$(".ko_allocazione_incarico").dataBind({html : "incarico"});
	//$(".ko_allocazione_rpv_tel").dataBind({html : "telefono"});
	$(".ko_allocazione_rpv_tel").dataBind({html : "rpvtel"});
	$(".ko_allocazione_piano").dataBind({html : "piano"});
	$(".ko_allocazione_stanza").dataBind({html : "stanza"});
	$(".ko_allocazione_func_edit").dataBind({click : "function() {$parent.viewAllocazioneForm($data,'EDIT')}", visible : "permessi().isEdit"});
	$(".ko_allocazione_func_del").dataBind({click : "function() {$parent.viewAllocazioneForm($data,'DEL')}", visible : "permessi().isDel"});
//	$(".ko_allocazione_func_add").dataBind({click : "function() {$parent.viewAllocazioneForm($data,'ADD')}", visible : "permessi().isAdd"});
	$(".ko_allocazione_func_add").dataBind({click : "function() {$parent.viewAllocazioneForm($data,'ADD')}", visible : "!formDipendenteUtenteHR&&permessi().isAdd"});
}	

function RegisterComponent(){
	var templateElement = document.getElementById("contenutoprincipale");
	ko.components.register('utente', {
		viewModel: {
			createViewModel: function(params, componentInfo) {
				model = new UtenteViewModel(params);
				return model;
			}
		},
		template : {element : templateElement}
	});
}
