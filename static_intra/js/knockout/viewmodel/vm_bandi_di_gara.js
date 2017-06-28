	var model;
	var token;

	var urltoken = baseUrlBandiRest+"token";
	var domain = baseUrlBandiRest+"bandi";
	var domainInvio = baseUrlBandiRest+"bandi";


	$.ajaxSetup({
	    cache: false,
	    timeout: 900000,
	    /* error: function(richiesta, stato, errori) {
	        if (richiesta.status == 403)
	            showAdviceMessage("Utente non abilitato");
	        else
	        	showAdviceMessage("Servizio momentaneamente non disponibile");        
	            
	        $(".box-loading").hide();
	    }, */
	    beforeSend: function(jqXHR, settings) {

	    },
	    /* complete: function() {
	        $(".box-loading").hide();
	    } */
	});
	$(document).ready(function() {
	    $(".box-loading").show();
	});

	function BandiDiGaraViewModel() {
	    var self = this;
	    
	    self.bandi = ko.observableArray([]);
	    self.bandiPaginato = ko.observableArray([]);
	    self.visualizzaBandi = ko.observable(true);
	    self.visualizzaPartecipantiBando = ko.observable(false);
	    self.elencoPartecipantiBandoResponse = ko.observable();
	    self.numeroDestinatari;
	    self.identificativoBandoSelezionato;
	    self.oggettoEmail = ko.observable();
	    self.testoEmail = ko.observable();
	    self.mostraFormEmail = ko.observable(false);
	    
	    self.getBandi = function(identificativo) {

	        self.mostraFormEmail(false);
	        
	        var urlString = domain;
	      
	        if (identificativo) {
	            urlString += "/" + identificativo + "/downloads";
	            self.identificativoBandoSelezionato = identificativo;
	            self.visualizzaBandi(false);
	            $(".box-loading").show();
	            showAdviceMessage("Caricamento lista utenti in corso...");
	        }
	        $.ajax({
	            type: 'GET',
	            url: urlString,
	            dataType: 'jsonp',
	            jsonp: "callback",
	            error: function(richiesta, stato, errori) {
	                if (richiesta.status == 403)
	                	showMessageUnauthorized("Bandi di gara");
	                //showAdviceMessage("Utente non abilitato");
	                else
	                	showAdviceMessage("Servizio momentaneamente non disponibile");        
	                    
	                $(".box-loading").hide();
	            },
	            success: function(response) {
	            	
	                if (identificativo) {
	                	
	                	/* Pagina con lista utenti e form per invio mail */	
			                    if (response.utenti && response.utenti.utenti) {
			                    	
			                      if (!response.utenti.utenti.length) {
			                            var arrayUtenti = [];
			                          	arrayUtenti.push(response.utenti.utenti);
			                            response.utenti.utenti = arrayUtenti;
			                            
			                        } 
									
			                        /*lista utenti */
			                        $(".tipoComunicazione").html("Bando " + identificativo + " - Lista Utenti Destinatari");
			                        self.numeroDestinatari = response.utentiConMail;
			                        self.elencoPartecipantiBandoResponse(response);
			                        self.visualizzaPartecipantiBando(true);
			                        
			                        
			                        /* form invio mail */
			                        self.inizializzaEmailPage();
			                        self.setMailText(identificativo);
			                        
			                        showAdvice(false);
			                        
			                    } else {
			                        showAdviceMessage("Nessun utente associato al bando", "Torna alla lista dei bandi", function() {
			                            self.tornaListaBandi()
			                        });
			                    }
	                } else  {  
	                /* Pagina principale con lista bandi attivi */
	                    self.bandi.removeAll();
	                    if (response.bandi.bandi.length) {
	                        $.each(response.bandi.bandi, function(index, element) {
	                            element = self.gestisciDatiScadenza(element);
	                            self.bandi.push(element);
	                        });
	                    } else {
	                        var el = self.gestisciDatiScadenza(response.bandi.bandi);
	                        self.bandi.push(el);
	                    }

	                    self.loadPage(1);
	                    showAdvice(false);
	                }
	                $(".box-loading").hide();
	            }
	        });
	    }

	    self.getBandiPaginato = function(){
	    	//self.itemsPerPage(1);

	    	var init = parseInt(self.itemsPerPage()) * parseInt(( self.currentPage()-1));
	    	var end = parseInt(init) + parseInt(self.itemsPerPage());
	    	
	    	self.bandiPaginato.removeAll();
	    	self.bandiPaginato(self.bandi.slice(init,end));

	    	//paginazione
			if(self.currentPage() == 1){
				self.numElementi(self.bandi().length);
				self.numPagineMax(Math.ceil(self.numElementi() / self.itemsPerPage()));
			}
			self.paginazioneNumber();			
			//paginazione end
			
	    }
	    
	    self.gestisciDatiScadenza = function(element) {
	        var datiScadenza = element.dataScadenza.split("-");
	        datiScadenza[2] = datiScadenza[2].substring(0, 2);
	        element.dataScadenza = datiScadenza[2] + "/" + datiScadenza[1] + "/" + datiScadenza[0];
	        return element;
	    }

	    self.vaiSchermataInvioMail = function() {
	        location.href += "/email";

	    }

	    self.tornaListaBandi = function() {
	        self.elencoPartecipantiBandoResponse(null);
	        location.hash = '';
	    }

	    self.getToken = function() {

	        $.ajax({
	            type: 'GET',
	            url: urltoken,
	            dataType: 'jsonp',
	            jsonp: "callback",
	            error: function(richiesta, stato, errori) {
	                if (richiesta.status == 403)
	                	showMessageUnauthorized("Bandi di gara");
	                //showAdviceMessage("Utente non abilitato");
	                else
	                	showAdviceMessage("Servizio momentaneamente non disponibile");        
	                    
	                $(".box-loading").hide();
	            },
	            success: function(response) {
	                token = response.token;
	                $(".box-loading").hide();
	            }
	        });
	    }
	    
	    self.setMailText = function(identificativo){
	    	 $.ajax({
	             type: 'GET',
	             url: domain,
	             dataType: 'jsonp',
	             jsonp: "callback",
	             error: function(richiesta, stato, errori) {
	                 if (richiesta.status == 403)
	                	 showMessageUnauthorized("Bandi di gara");
	                 //showAdviceMessage("Utente non abilitato");
	                 else
	                 	showAdviceMessage("Servizio momentaneamente non disponibile");        
	                     
	                 $(".box-loading").hide();
	             },
	             success: function(response) {
	            	
	            	 self.getToken(true);
	            	 
	            	  $.each(response.bandi, function(index, element) {
	            		 if(element.identificativo == identificativo){
	            			 var bando =  response.bandi[index];
	                         $("#oggettoEmail").val("Notifica variazione Bando di gara");
	                         var message = "Per Informazioni: " + bando.perInformazioni + " ";
	                         message = message + "Titolo: " + bando.titolo + " ";
	                         message = message + "Oggetto:" + bando.oggetto + " ";
	                         message = message + "Per consultare i Bandi di Gara accedere a http://www.inail.it";
	                         $("#testoEmail").val(message);
	                         showAdvice(false);
	                         self.mostraFormEmail(true);
	                         $(".box-loading").hide();
	                         return;
	            		 }
	            	 });
	            	 
	            	 $(".box-loading").hide();
	             }
	         });
	    }

	    self.inviaLaMail = function() {
	        $(".box-loading").show();
	        var oggettoDellaEmail = $("#oggettoEmail").val();
	        var testoDellaEmail = $("#testoEmail").val();
	        if (oggettoDellaEmail.length == 0) {
	            showAdviceMessage("Inserire un titolo alla e-mail");
	            return;
	        } else if (testoDellaEmail.length == 0) {
	            showAdviceMessage("Inserire il testo della e-mail");
	            return;
	        }
	        

 	         $.ajax({
	            type: 'POST',
	            beforeSend: function(xhr) {
	                xhr.setRequestHeader('ANTIFORGERYTOKEN', token);
	            }, 
	            url: domainInvio + "/" + self.identificativoBandoSelezionato + "/notifiche",
	            data: JSON.stringify({
	                "oggettoEmail": oggettoDellaEmail,
	                "testoEmail": testoDellaEmail
	            }),
	            contentType: 'application/json',
	            dataType: 'json',
	            error: function(richiesta, stato, errori) {

	            	if (richiesta.status == 403)
	            		showMessageUnauthorized("Bandi di gara");
	            	//showAdviceMessage("Utente non abilitato");
	                else
	                	showAdviceMessage("Servizio momentaneamente non disponibile");        
	                
	                self.visualizzaPartecipantiBando(false);    
	                $(".box-loading").hide();
	            },
	            success: function(response) {
	                showAdviceMessage("E-mail inviata con successo", "Torna alla lista dei bandi", function() {
	                    self.tornaListaBandi()
	                });
	                self.visualizzaPartecipantiBando(false);
	                $(".box-loading").hide();
	            }
	        });
	    }
	    self.inizializzaGetPartecipantiBando = function(identificativo) {
	        self.visualizzaBandi(false);
	        window.scrollTo(0, 0);        
	        showAdvice(false);
	        self.getBandi(identificativo);
	    }

	    self.tornaAllaListaDeiPartecipanti = function() {
	        var indexSlash = location.hash.indexOf("/");
	        if (indexSlash != -1) {
	            location.hash = location.hash.substring(0, indexSlash);
	        }
	    }

	    self.inizializzaEmailPage = function() {
	        //self.visualizzaPartecipantiBando(false);
	        $(".tipoComunicazione").html("Bando " + self.identificativoBandoSelezionato + " - Inserimento Dati Email");
	        self.mostraFormEmail(true);
	        $("#oggettoEmail").val("Notifica variazione Bando di gara");

	        $("#elementNumeroDestinatari").html("" + self.numeroDestinatari + " email");
	        showAdvice(false);
	    }
	    	 
	    initPagination(self,self.getBandiPaginato)
	   
	}






	function injectKO() {
	    $("#elencoBandiView").dataBind({
	        "visible": "$root.visualizzaBandi"
	    });
	    $(".linkBando").dataBind({
	        "html": "identificativo",
	        attr: "{href: '" + window.location.href + "#' + identificativo}"
	    });
	    $(".descrizioneBando").dataBind({
	        "html": "oggetto"
	    });

	    $(".scadenzaBando").dataBind({
	        "html": "dataScadenza"
	    });
	    $("#elencoPartecipantiBandoView").dataBind({
	        "visible": "$root.visualizzaPartecipantiBando"
	    });
	    $(".codicePartecipante").dataBind({
	        "html": "codiceUtente"
	    });
	    $(".emailPartecipante").dataBind({
	        "html": "email"
	    });
	    $(".dataPartecipante").dataBind({
	        "html": "dataDownload"
	    });
	   
	    $(".formTornaAllaListaBandi").dataBind({
	        "submit": "$root.tornaListaBandi"
	    });
	    
	    
	/*     $("#formVaiSchermataInviaEmails").dataBind({
	        "submit": "$root.vaiSchermataInvioMail"
	    }); */
	    
	    
	/*     $("#CP_search").dataBind({
	        "visible": "$root.mostraFormEmail"
	    }); */
	    
	    
	    $("#formInviaEmails").dataBind({
	        "submit": "$root.inviaLaMail"
	    });
	    $("#oggettoEmail").dataBind({
	        "value": "$root.oggettoEmail"
	    });
	    $("#testoEmail").dataBind({
	        "value": "$root.testoEmail"
	    });
	    
	    $("#tornaPartecipantiButton").dataBind({
	        "click": "$root.tornaAllaListaDeiPartecipanti"
	    });
	    
	    
	    //paginazione
		$(".ko_dipendente_pagination_num").dataBind({value : "itemsPerPage",  event:{ change: "function() {loadPage(1)}"}});
		$(".ko_dipendente_pagination").dataBind({foreach : "pages()"});
		$(".ko_dipendente_pagination_li").dataBind({css : "$data.css"});
		$(".ko_dipendente_pagination_a").dataBind({html : "$data.text", click : "function() {$parent.loadPage($data.text)}"});
	    
	    model = new BandiDiGaraViewModel();

	    $(window).bind('hashchange', function() {
	        visualizzaPaginaDaHash();
	    });
	    
	    //$("#contenitoreFlusso").show();
	    
	    visualizzaPaginaDaHash();
	    
	    ko.applyBindings(model);
	}



	$(function() {
	    injectKO();
	});

	function visualizzaPaginaDaHash() {
		var arrayElement = getParametersHashUrl();
	    switch (arrayElement.length) {
	        case 0:
	            window.scrollTo(0, 0);
	            model.visualizzaBandi(true);
	            model.visualizzaPartecipantiBando(false);
	            model.elencoPartecipantiBandoResponse(null);
	            model.oggettoEmail(null);
	            model.testoEmail(null);
	            model.mostraFormEmail(false);
	            showAdvice(false);
	            //					if(!model.bandiResponse()) {
	            model.getBandi();
	            //					}
	            break;
	        case 1:
	            if (model.elencoPartecipantiBandoResponse()) {
	                model.visualizzaPartecipantiBando(true);
	                $(".tipoComunicazione").html("Bando " + model.identificativoBandoSelezionato + " - Lista Utenti Destinatari");
	                //model.mostraFormEmail(false);
	                
	                /* form email */
	                model.inizializzaEmailPage();
	                model.getBandi(model.identificativoBandoSelezionato);
	                
	                showAdvice(false);
	            } else {
	                model.inizializzaGetPartecipantiBando(arrayElement[0]);
	            }
	            break;
	       	/*  case 2:
	            if (arrayElement[1] == "email") {
	                if (model.elencoPartecipantiBandoResponse()) {
	                    model.inizializzaEmailPage();
	                    model.getBandi(model.identificativoBandoSelezionato);
	                } else {
	                    model.inizializzaGetPartecipantiBando(arrayElement[0]);
	                }
	            } else {
	                showAdviceMessage("Pagina non trovata");
	            }
	            break; */
	    } 
	}


	function showAdviceMessage(message, textButton, clickButton) {
	    $("#messageError").html(message);
	    showAdvice(true);
	    if (textButton) {
	        var bottoneErrore = $("#bottoneAzioneErrore");
	        bottoneErrore.val(textButton);
	        $("#layoutBottoneAzioneErrore").show();
	        bottoneErrore.click(clickButton);
	    } else {
	        $("#layoutBottoneAzioneErrore").hide();
	    }
	}

	function showAdvice(isVisible) {
	    if (isVisible) {
	        $(".error-container").show();
	        window.scrollTo(0, 0);
	    } else {
	        $(".error-container").hide();
	    }
	}

	function getParametersHashUrl() {
	    var arrayRitorno = [];
	    var url = location.href;
	    var prendiHash = url.split("#");
	    if (prendiHash.length > 1 && $.trim(prendiHash[1]).length > 0) {
	        var hash = prendiHash[1];
	        arrayRitorno = hash.split("/");
	    }
	    return arrayRitorno;
	}