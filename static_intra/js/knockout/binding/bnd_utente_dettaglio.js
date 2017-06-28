var model;

function initPagina(){	
	BindUtenteConsultazioneDettaglio();
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

function BindUtenteConsultazioneDettaglio(){
	
	
}	

function RegisterComponent(){
	var templateElement = document.getElementById("contenutoprincipale");
	ko.components.register('utenteConsultazioneDettaglio', {
		viewModel: {
			createViewModel: function(params, componentInfo) {
				model = new UtenteConsultazioneProfiloViewModel(params);
				return model;
			}
		},
		template : {element : templateElement}
	});
}
