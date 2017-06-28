function initPagina(){	
	bindProfilo();
	RegisterComponent();	
	ko.applyBindings();
}

function bindProfilo(){
	$(".ko_profile_container").dataBind({ css:{ "'hidden'" : "loaded() == false"}});
	$(".ko_profile_username").dataBind({html : "profileUsername"});
	$(".ko_profile_nome_utente").dataBind({html : "profileNomeUtente"});
	//$(".ko_profile_email").dataBind({html : "profileEmail"});
	$(".ko_profile_email").dataBind({"attr": "{href: 'mailto:' + profileEmail()}", "html": "profileEmail"});

	
	
	$(".ko_profile_numero_breve").dataBind({html : "profileNumeroBreve"});
	$(".ko_profile_struttura_unita").dataBind({html : "profileStrutturaUnita"});
	$(".ko_profile_struttura_ufficio").dataBind({html : "profileStrutturaUfficio"});
	$(".ko_profile_struttura_incarico").dataBind({html : "profileStrutturaIncarico"});
	$(".ko_profile_struttura_processo").dataBind({html : "profileStrutturaProcesso"});
	$(".ko_profile_struttura_subprocesso").dataBind({html : "profileStrutturaSubprocesso"});
	$(".ko_profile_struttura_rpv_tel").dataBind({html : "profileStrutturaRpvTel"});
	$(".ko_profile_struttura_tel").dataBind({html : "profileStrutturaTel"});
	$(".ko_profile_struttura_tel2").dataBind({html : "profileStrutturaTel2"});
	$(".ko_profile_struttura_cellulare_servizio").dataBind({html : "profileStrutturaCellulareServizio"});
	$(".ko_profile_struttura_fax").dataBind({html : "profileStrutturaFax"});
	$(".ko_profile_struttura_piano").dataBind({html : "profileStrutturaPiano"});
	$(".ko_profile_struttura_stanza").dataBind({html : "profileStrutturaStanza"});
	$(".ko_profile_struttura_select").dataBind({options : "selectAllocazioniOptions", value:"profileStrutturaIdSelected", optionsText: "'name'", optionsValue : "'value'"});	
	$(".ko_profile_struttura_carica").dataBind({click : "function(){ loadAllocazione()}"});


	$(".ko_profile_input_flag_consenso_foto").dataBind({checked : "profileFlagConsensoFoto"});
	$(".ko_profile_input_img").dataBind({attr: { src: "profileImgBase64" }});
	$(".ko_profile_input_username").dataBind({value : "profileUsername"});
	$(".ko_profile_input_nome").dataBind({value : "profileNome"});
	$(".ko_profile_input_cognome").dataBind({value : "profileCognome"});
	$(".ko_profile_input_email").dataBind({value : "profileEmail"});
	$(".ko_profile_input_pec").dataBind({value : "profilePec"});
	$(".ko_profile_input_celullare").dataBind({value : "profileCellulare"});
	$(".ko_profile_input_celullare_privato").dataBind({value : "profileCellularePrivato"});
	$(".ko_profile_input_celullare_visibile").dataBind({checked : "profileCellulareVisibile"});
	$(".ko_profile_input_netFax").dataBind({value : "profileNetFax"});
	$(".ko_profile_input_numero_breve").dataBind({value : "profileNumeroBreve"});
	$(".ko_profile_input_struttura_codice_unita").dataBind({value : "profileStrutturaCodiceUnita"});
	$(".ko_profile_input_struttura_codice_ufficio").dataBind({value : "profileStrutturaCodiceUfficio"});
	$(".ko_profile_input_struttura_codice_processo").dataBind({value : "profileStrutturaCodiceProcesso"});
	$(".ko_profile_input_struttura_codice_subprocesso").dataBind({value : "profileStrutturaCodiceSubProcesso"});
	$(".ko_profile_input_struttura_unita").dataBind({value : "profileStrutturaUnita"});
	$(".ko_profile_input_struttura_ufficio").dataBind({value : "profileStrutturaUfficio"});
	$(".ko_profile_input_struttura_incarico").dataBind({value : "profileStrutturaIncarico"});
	$(".ko_profile_input_struttura_processo").dataBind({value : "profileStrutturaProcesso"});
	$(".ko_profile_input_struttura_subprocesso").dataBind({value : "profileStrutturaSubprocesso"});
	//$(".ko_profile_input_struttura_numero_breve").dataBind({value : "profileStrutturaNumeroBreve"});
	$(".ko_profile_input_struttura_tel").dataBind({value : "profileStrutturaTel"});
	$(".ko_profile_input_struttura_tel2").dataBind({value : "profileStrutturaTel2"});
	$(".ko_profile_input_struttura_fax").dataBind({value : "profileStrutturaFax"});
	$(".ko_profile_input_struttura_piano").dataBind({value : "profileStrutturaPiano"});
	$(".ko_profile_input_struttura_stanza").dataBind({value : "profileStrutturaStanza"});
//	$(".ko_profile_input_struttura_rpv_tel").dataBind({value : "profileStrutturaRpvTel"});

	
	$(".ko_profile_input_struttura_select").dataBind({options : "selectAllocazioniOptions", value:"profileStrutturaIdSelected", optionsText: "'name'", optionsValue : "'value'", event :{change : "function(){ loadAllocazione($element.value)}"}});	

}

function RegisterComponent(){
	var templateElement = document.getElementById("contenutoprincipale");
	ko.components.register('profile', {
		viewModel: {
			createViewModel: function(params, componentInfo) {
				profileVM = new ProfileViewModel(params);
				return profileVM;
			}
		},
		template : {element : templateElement}
	});
}
