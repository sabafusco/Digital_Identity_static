var connections = [];

//PARAM INIT

var innovazioneSpaceGuid = "sd92f371f_aede_4977_b457_f9d3fb4e36fe";
var groupSpaceGuids = "s222d062d_8a97_4fea_aded_c164756be827";
var serviceIds = "oracle.webcenter.collab.calendar.community,oracle.webcenter.doclib,oracle.webcenter.collab.forum,oracle.webcenter.peopleconnections.wall,oracle.webcenter.collab.calendar.community,it.inail.esc.idea";
var spaceGuids = groupSpaceGuids+"," + innovazioneSpaceGuid;
var isUserStream = false;
var generateSpaceIndependentUrls = true;
var userGuid = "";
var userName = "";
//PARAM END

var utoken;
var ideaUrlFormat = "";
var iconUser = "";
var spaceName = "";
var ruolo = "";
var amm = "Amministratore";
var mod = "Moderator";
var vis = "Viewer";
var part = "Participant";
var personGuid  = "";

function ActivityStream(params, self) { 	
	self.activities=ko.observableArray([]);
	
	//********************** PUBLISH ACTIVITY **********************

	//--------------- SICUREZZA VISIBLE FORM POST ---------------
	
	self.isVisiblePost = function ()
	{
		if(ruolo != vis)
			return true;
		else
			return false;
	}
	
	//--------------- FINE - SICUREZZA VISIBLE FORM POST ---------------
	
	self.publishIconUser = ko.observable(iconUser);
	self.activityPublishInput = ko.observable("");
	
	self.activityPublishImageMessage = ko.observable("");
	self.activityPublishLinkMessage = ko.observable("");
	self.newActivityStreamCreateTagText = ko.observable("");
	self.newActivityStreamUploadDocumentGetFileName = ko.observable("");
	self.isSelectDocument = ko.observable(false);
	self.setHeightActivityPublishInput = ko.computed(function()
	{
		if(self.activityPublishInput().length === 0)	
			$(".ko_activity_publish_input").height("28");
//		if(self.activityPublishInput().length != 0 || self.activityPublishImageMessage().length != 0)
//			setHeightTextAreaPostMessage(self.activityPublishInput(),self.activityPublishImageMessage());
	});
	
	self.imageFileName = ko.observable("");
	self.documentFileName = ko.observable("");
	self.newActivityImageView = ko.observable(false);
	self.newActivityDocumentView = ko.observable(false);
	self.newActivityImageLoading = ko.observable(false);
	self.newActivityDocumentLoading = ko.observable(false);
	self.memberArray = ko.observableArray([]);
	self.taggedMembers = ko.observableArray([]);
	//----------- COLLAPSE -----------
	
	self.isInserimentoDocumentoOpen = ko.observable(false);
	self.isInserimentoImageOpen = ko.observable(false);
	self.isInserimentoLinkOpen = ko.observable(false);
	
	self.comunita = ko.observable(spaceName);
	
	self.isUserStream = ko.observable(false);
	self.userGuid = ko.observable(personGuid);
	self.userName = ko.observable();
	
	///////////////////////////////////
	self.serviceIds = ko.observable();
	self.spaceGuids = ko.observable();
	///////////////////////////////////
	
	self.generateSpaceIndependentUrls= ko.observable(false);
	
	self.resetLinkForm = function(){
		//------------ RESET FORM ------------			
		
		self.activityPublishLinkMessage("");
		self.activityPublishInput("");
		
		//------------ FINE - RESET FORM ------------
		self.isInserimentoLinkOpen(false);
		$('#collapseAllegatoLink').collapse('toggle');
	}
	
	self.resetImageForm = function(){
		//------------ RESET FORM ------------
		
		self.newActivityStreamImageUploadView("");			
		self.newActivityImageView(false);
		self.activityPublishImageMessage("");
		self.activityPublishInput("");
		
		//------------ FINE - RESET FORM ------------
		self.isInserimentoImageOpen(false);
		
		$('#collapseAllegatoImmagine').collapse('toggle');
	}
	
	self.resetDocumentForm = function(){
		//------------ RESET FORM ------------
		self.isSelectDocument(false);
		var lastClass = $("#ko_new_activity_document_ico").attr("class").replace(/.* /, "");
		$("#ko_new_activity_document_ico").removeClass(lastClass);
		self.activityPublishInput("");
		$(".ko_activity_publish_input").height("28");		
		self.newActivityDocumentView(false);
		$(".ko_new_activity_document_upload").val("");
		
		self.documentFileName("");
		self.newActivityStreamUploadDocumentGetFileName("");
		self.newActivityTags.removeAll();		
		//------------ FINE - RESET FORM ------------		
		self.isInserimentoDocumentoOpen(false);

		$('#collapseAllegatoDocumento').collapse('toggle');
	}
	
	self.toggleInserimentoDocumenti = function()
	{
		if(self.isInserimentoImageOpen()){
			self.resetImageForm();
		}
		else if(self.isInserimentoLinkOpen()){
			self.resetLinkForm();
		}
		else{
			self.activityPublishInput("");
		}

		var lastClass = $("#ko_new_activity_document_ico").attr("class").replace(/.* /, "");
		$("#ko_new_activity_document_ico").removeClass(lastClass);
		
		self.newActivityDocumentView(false);
		$(".ko_new_activity_document_upload").val("");
		
		self.documentFileName("");
		self.newActivityTags.removeAll();
		
		$('#ko_activity_publish_submit')[0].reset();
		
		$('#collapseAllegatoDocumento').collapse('toggle');
		self.isInserimentoDocumentoOpen(!self.isInserimentoDocumentoOpen());
		
	}
	
	self.toggleInserimentoLink = function(){
		if(self.isInserimentoImageOpen()){
			self.resetImageForm();
		}
		else if(self.isInserimentoDocumentoOpen()){
			self.resetDocumentForm();
		}
		else{
			self.activityPublishInput("");
		}
		//------------ RESET FORM ------------
		
		self.activityPublishLinkMessage("");
		$('#ko_activity_publish_submit')[0].reset();	
		
		//------------ FINE - RESET FORM ------------
		
		$('#collapseAllegatoLink').collapse('toggle');
		self.isInserimentoLinkOpen(!self.isInserimentoLinkOpen());
	}
	
	self.toggleInserimentoImage = function()
	{
		if(self.isInserimentoLinkOpen())
		{
			self.resetLinkForm();
		}
		else if(self.isInserimentoDocumentoOpen())
		{
			self.resetDocumentForm();
		}	
		else
		{
			self.activityPublishInput("");
			//$(".ko_activity_publish_input").height("28");
		}

		//------------ RESET FORM ------------
		
		self.newActivityStreamImageUploadView("");	
		self.activityPublishImageMessage("");
		self.newActivityImageView(false);		
		$('#ko_activity_publish_submit')[0].reset();
		
		//------------ FINE - RESET FORM ------------
		
		$('#collapseAllegatoImmagine').collapse('toggle');
		self.isInserimentoImageOpen(!self.isInserimentoImageOpen());
	}
	
	//----------- FINE - COLLAPSE -----------
	
	//Tags upload document
	//Array contenitore tags
	self.newActivityTags = ko.observableArray([]);
	
	//Nuovi tag
	self.newActivityStreamCreateTag = function()
	{
		if(self.newActivityStreamCreateTagText().length > 0)
		{
			var tag;
			var tagsSplit = [];
			if(self.newActivityStreamCreateTagText().indexOf(" ") > 0){
				tagsSplit = htmlEscape(self.newActivityStreamCreateTagText().split(" "));
			}
			else{
				tagsSplit[0] = htmlEscape(self.newActivityStreamCreateTagText());
			}
			var duplicateTag;
			var countLastTags = self.newActivityTags().length;
			var isTagDuplicate = false;
			
			$.each(tagsSplit, function(key, item)
			{
				if(duplicateTag != item)
				{
					if(!isDuplicateTag(item,self.newActivityTags()))
					{
						tag = ko.observable(new NewActivityTag(item));
						self.newActivityTags.push(tag);
					}
					else
						isTagDuplicate = true;
				}
				duplicateTag = item;
			});
			
			if(countLastTags === self.newActivityTags().length)
				showMessage("fail","Si stanno inserendo dei tag già esistenti.\n Si prega di verificare");
			else if(isTagDuplicate)
				showMessage("fail","Sono stati inseriti solamente i tag non esistenti.\n Si prega di verificare");
		}
		else
			showMessage("fail","Controllare che il nome del tag sia stato inserito correttamente e riprovare");
	}
	
	//Cancellazione del tag inserito
	self.newActivityStreamDeleteTag = function(tag)
	{
		self.newActivityTags.remove(function(item) 
		{
			return item().newActivityTagName === tag.newActivityTagName;
		});
	}
	
	//Ritorna la stringa corretta per l'invio dei tags al servizio di upload
	self.newActivityStreamPublishTags = ko.computed(function()
	{
		var output = "";
		if(self.newActivityTags().length > 0)
		{
			ko.utils.arrayForEach(self.newActivityTags(), function(tag)
			{
				if(output === "")
					output += tag().newActivityTagName; 
				else
					output += " " + tag().newActivityTagName; 
			});
		}
		return output;
	});

	//----------- SUBMIT - NEW ACTIVITY -----------
	$(document).ready(function() 
	{ 		
		
		// callback del submit asincrono
		var options = 
		{ 
			success: function() 
			{ 
				//aggiorno la lista degli elementi
				self.itemsPerPage(self.itemsPerPage() - self.numActivityForPage);
				
				//ricarico le attivita'
				self.listActivities();
				
				//svuoto i componenti del form
				self.activityPublishInput("");
				self.newActivityTags.removeAll();
				if(self.isInserimentoDocumentoOpen()){
					self.toggleInserimentoDocumenti();
				}		
				else if(self.isInserimentoImageOpen()){
					self.toggleInserimentoImage();
				}
				self.isSelectDocument(false);
				$('#ko_activity_publish_submit')[0].reset();
			},
			error: function()
			{
				showMessage("fail","Errore durante il caricamento del documento");	
				$(".ko_new_activity_image_upload").val("");
				$(".ko_new_activity_document_upload").val("");
			},
			complete:function()
			{
				self.newActivityImageLoading(false);
				self.newActivityDocumentLoading(false);
			} 
		}; 
		
		//catturo l'evento click del bottone submit del form
		$(".ko_activity_publish_button").click(function (ev) 
		{
			
			self.activityPublishInput(self.activityPublishInput().replace(/\n/g," "));
			
			//ritorna text con il link agli hashtag e tag utenti se ci sono
			var textData = getTextHashTag(self.activityPublishInput(), self.memberArray());
			
			//verifico se e' aperto il collapse del link
			if(self.isInserimentoLinkOpen())
			{
				//Prevengo il suo comportamento di default del form
				ev.preventDefault();
					
				self.createActivityLink(textData.text ,self.activityPublishLinkMessage(), textData.taggedMembers, function(isLink){
					if(isLink)
					{
						self.activityPublishLinkMessage("");
						self.activityPublishInput("");
						self.memberArray.removeAll();
						self.isInserimentoLinkOpen(false);
						$('#collapseAllegatoLink').collapse('toggle');
						self.itemsPerPage(self.itemsPerPage() - self.numActivityForPage);
						self.listActivities();

					}
					else
						showMessage("fail","La url che si sta inserendo non è valida. \n Si prega di controllare");
				});
				
				return false;
			}			
			//verifico se i collapse di upload document sono inattivi
			else if(!self.isInserimentoDocumentoOpen() && !self.isInserimentoImageOpen())	
			{
				//Prevengo il suo comportamento di default del form
				ev.preventDefault();
				
				//Pubblicazione di una nuova attivita' con solo text
				self.insertPublishMessage(textData.text, textData.taggedMembers, function(data){
					self.activityPublishInput("");
					self.memberArray.removeAll();
					self.taggedMembers.removeAll();
					self.itemsPerPage(self.itemsPerPage() - self.numActivityForPage);
					self.listActivities();
				});

				return false;
			}
			
			//Verifica che l'utente abbia caricato il file
			else
			{
				if(!self.isSelectDocument())
				{
					ev.preventDefault();
					showMessage("fail",'Non è stato caricato nessun file si prega di controllare');
					return false;
				}
				else
					if(self.isInserimentoImageOpen())
						self.newActivityImageLoading(true);
					else if(self.isInserimentoDocumentoOpen())
						self.newActivityDocumentLoading(true);
			}
				
		});
		
		//---------------- TAG UTENTE POST-MESSAGE/POST-COMMENT ----------------
//		$(".ko_activity_publish_input").textcomplete(
//		[
//			{ // html
//				match: /\B@(\'|\w{2,}$)/,
//				search: function (term, callback) {	
//					callback($.map(connections, function (mention) {
//						return mention.displayName.toLowerCase().indexOf(term.toLowerCase()) > -1 ? mention : null;
//					}));
//				},
//				
//				index: 1,
//				replace: function (member) {
//					self.memberArray.push(member);
//					return "@" + member.displayName;
//				},
//				
//				template: function (value) {
//					return value.displayName;
//				}
//			}
//		]);
		
		//---------------- FINE - TAG UTENTE POST-MESSAGE/POST-COMMENT ----------------
		
		//Setto la action del form
		$('#ko_activity_publish_submit').attr("action","/rest/api/activityUploadFile?utoken=" + utoken);
		//Submit asincrono
		$('#ko_activity_publish_submit').ajaxForm(options);
		
	});
	
	self.loadConnections= function(){
		var connectionUrl = wcpRootUrl + "people/@me/lists/%40connections?utoken=" + utoken + "&startIndex=0&itemsPerPage=9999";
		$.getJSON( connectionUrl, function( data ) {
			$.each( data.items, function( key, item ){		
				connections.push(item);
			});
		});
	}
	
	self.activityMessage = ko.computed(function()
	{
		if(self.activityPublishInput().length > 0)
			return self.activityPublishInput();
		else if(self.activityPublishImageMessage().length > 0)
			return self.activityPublishImageMessage();
		else
			return "";
	});
	
	//----------- NEW ACTIVITY - DOCUMENT -----------
	
	newActivityStreamDocumentUpload = function(file)
	{
		if(file)
		{
			if(file.type.indexOf("image") === 0)
				showMessage("fail","Il file che si sta caricando è un'immagine. Si prega di controllare");
			else
			{
				
				self.documentFileName(file.name);
				self.newActivityStreamUploadDocumentGetFileName(file.name);
				var path = file.name.replace(/.*\./g,".");
				$("#ko_new_activity_document_ico").addClass(getImageStaticUrl(path));
				$("#ko_new_activity_document_ico").addClass("documento");
				self.newActivityDocumentView(true);
				self.isSelectDocument(true);
			}
		}
	}
	
	//----------- NEW ACTIVITY - IMAGE -----------
	
	self.newActivityStreamImageUploadView = ko.observable("");
	
	//Mostra l'anteprima dell'immagine che si vuole pubblicare
	self.newActivityStreamImageUpload = function(file)
	
	{	
		if(file)
		{
			if(file.type.indexOf("image") === 0)
			{
			//	self.newActivityStreamUploadImageGetFileName(file.name);
				self.imageFileName(file.name);
				var blobURL = window.URL.createObjectURL(file);
				self.newActivityStreamImageUploadView(blobURL);
				self.activityPublishImageMessage(self.activityPublishInput());
				self.activityPublishInput("");
				self.newActivityImageView(true);
				self.isSelectDocument(true);
				
				
			}
			else
				showMessage("fail","Il file che si sta caricando non è un'immagine. Si prega di controllare");
		}
    }
	
	
	//********************** INSERIMENTO NUOVA ACTIVITY **********************
	self.insertPublishMessage = function(message, taggedMembers, callback){
		
		var boardType;
		var guid;
		
		if(self.isUserStream()){
			boardType = "user";
			guid = self.userName();
		}
		else{
			boardType = "space";
			guid = groupSpaceGuids;
		}
		
		var publishMessageUrl = wcpRootUrl + "escmessageBoards/"+ boardType +"/" + guid + "?utoken=" + utoken;
		
		var boardMessage = { body: message, taggedUsers: taggedMembers};
		
		$.ajax({
			type: 'POST',
			url: publishMessageUrl,
			success: function(data) {
				callback(data);
			},
			contentType: "application/json",
			dataType: 'json',
			data: JSON.stringify(boardMessage)
		});
		
	}
	
	//Crea una nuova activity link
	self.createActivityLink= function(message,link, taggedMembers,callback)
	{
		
		if(link.indexOf("http") != 0)
			link = "http://" + link;
		
		if(isUrlValid(link))
		{
			
			var boardType;
			var guid;
			
			if(self.isUserStream()){
				boardType = "person";
				guid = self.userName();
			}
			else{
				boardType = "space";
				guid = groupSpaceGuids;
			}
			
			if(message == ""){
				message = " ";
			}
			
			var activityCreateLinkService = wcpRootUrl + "escmessageBoards/"+boardType+"/" + guid + "?utoken=" + utoken;
			
			var boardMessage = { body: message, taggedUsers: taggedMembers, link : link};
			
			$.ajax({
				type: 'POST',
				url: activityCreateLinkService,
				success: function(data) {
					callback(true);		
				},
				contentType: "application/json",
				dataType: 'json',
				data: JSON.stringify(boardMessage)
			});	
		}
		else
			callback(false);
	}
	
	self.newActivityImageClear = function ()
	{
		self.newActivityImageView(false);
		self.imageFileName("");
		self.newActivityStreamImageUploadView("");
		$(".ko_new_activity_image_upload").val("");
		self.activityPublishInput(self.activityPublishImageMessage());
		self.activityPublishImageMessage("");
		self.isSelectDocument(false);
	}
	
	self.newActivityDocumentClear = function ()
	{
		var lastClass = $("#ko_new_activity_document_ico").attr("class").replace(/.* /, "");
		$("#ko_new_activity_document_ico").removeClass(lastClass);
		
		self.newActivityDocumentView(false);
		$(".ko_new_activity_document_upload").val("");
		
		self.documentFileName("");
		self.isSelectDocument(false);
	}

	/******************** FINE - NUOVA ATTIVITA ********************/
	
	/** LISTA ACTIVITY - PAGINAZIONE
			numActivityForPage = Numero di attivita' che si vuol far tornare dal servizio
			itemsPerPage = Elementi per pagina
			isLoaded = Verifica del completo caricamento delle activity per la visibilita' (false === hidden) 
	*/
	
	self.numActivityForPage = 5;
	self.itemsPerPage = ko.observable(5);
	self.isLoaded=ko.observable(false);
	
	self.listActivities = function(){
		self.itemsPerPage(self.itemsPerPage() + self.numActivityForPage);
		self.loadActivityStream(true);
	}
	
	//----------- LOAD ACTIVITY -----------	
	
    self.loadActivityStream=function(isViewPost){
		if(isViewPost != true)
			showLoadingAnimation();	
		else
			$("#ko_loading_post_activity").removeClass("hidden");
		
		var wcpResourcesSite =wcpRootUrl+"activities?utoken=" + utoken+ "&data=data,commentsSummary,likesSummary&itemsPerPage=" + self.itemsPerPage() + "&startIndex=0" + "&serviceIds=" + self.serviceIds();
		
		if(self.isUserStream()){
			wcpResourcesSite +="&data=data&personGuid="+self.userGuid()+"&personal=true";
		}
		else{
			wcpResourcesSite += "&groupSpaceGuids=" + self.spaceGuids() +"&personGuid=@me";
		}
		$.getJSON( wcpResourcesSite, function( data ) 
		{	
			self.activities.removeAll();
			$.each( data.items, function( key, item ){
				var activity = ko.observable(new Activity(item, self.generateSpaceIndependentUrls()));
				self.activities.push(activity);
			});


		}).always(function(){
			if(isViewPost != true){
				hideLoadingAnimation();
				self.isLoaded(true);
			}
			else
				$("#ko_loading_post_activity").addClass("hidden");
		});
     		
	}
	
	//----------- FINE - LOAD ACTIVITY -----------	
	
	//Delete activity stream only message
	self.deleteActivityStream = function(activity)
	{	
		deleteActivityStream(activity.idMessage(), function()
		{
			self.activities.remove(function(item) 
			{
				return item().idMessage() === activity.idMessage();
			});
		});
	}

	//Inizializzazione
	self.create = function(){
		self.isUserStream(isUserStream);
		self.userGuid(userGuid);
		self.userName(userName);
		self.serviceIds(serviceIds);
		self.generateSpaceIndependentUrls(generateSpaceIndependentUrls);
		self.spaceGuids(spaceGuids);
		//self.spaceGuids(groupSpaceGuids);
		
		//GESTIONE TOKEN
		var wcpResourcesSite =wcpRootUrl+ "resourceIndex";
		$.getJSON( wcpResourcesSite, function( data ) {
		  $.each( data.links, function( key, link ){
			if(link.href) {
			   var startIndex = link.href.indexOf("utoken=");			
			   utoken = link.href.substring(startIndex +7, link.href.length);
		    }
		  });
		  self.loadActivityStream(false);
	   });
		
		
//		self.loadConnections();
//		self.loadActivityStream();	
	}
	
	//self.create();
}


function ActivityObject(templateParam, generateSpaceIndependentUrls){
	
	var self = this;
	self.eventiContext = "Eventi";
	self.wikiContext = "Wiki";
	self.forumContext = "Forum";
	self.type;
	self.id;
	self.displayName;
	self.displayHtml;
	self.create = function(templateParam){	
		self.type = templateParam.type;
		self.id = templateParam.id;
		self.displayName = templateParam.displayName;
		var link;
		var name = templateParam.displayName;
		if(templateParam.type === "event"){
			var eventId = templateParam.id.replace(/.*;;/,"");
			
			if(generateSpaceIndependentUrls)
				link = wcpUrl +"/webcenter/escspaceresource?resourceType=" +templateParam.type +"&resourceid=" +eventId;
			else
				link = self.eventiContext + "?eventId=" + eventId;
				
			self.displayHtml=  "<a href='" + link + "'>" + name + "</a>";
		}
		else if(templateParam.type === "wiki"){
			var wikiId = templateParam.id.replace(/.*:/,"");
			
			if(generateSpaceIndependentUrls)
				link = wcpUrl +"/webcenter/escspaceresource?resourceType=" +templateParam.type +"&resourceid=" +wikiId;
			else
				link = self.wikiContext + "?wikiName=" + wikiId;
			
			self.displayHtml= "<a href='" + link + "'>" + name + "</a>";
		}
		else if(templateParam.type === "topic"){
			var topicId = templateParam.id.split("/")[1];
			
			if(generateSpaceIndependentUrls)
				link = wcpUrl +"/webcenter/escspaceresource?resourceType=" +templateParam.type +"&resourceid=" +templateParam.id;
			else
				link = self.forumContext + "?topicId=" + topicId;
			
			self.displayHtml= "<a href='" + link + "'>" + name + "</a>";
		}		
		else if(templateParam.type === "Idea"){
			var ideaId = templateParam.id;
			var linkIdea = ideaUrlFormat.replace("{ideaId}", ideaId);
			self.displayHtml= "<a href='"+linkIdea+"'>" + name + "</a>";
		}
		else{
			self.displayHtml = self.displayName;
		}
	}
	self.create(templateParam);
}

function Actor(templateParam){
	var self = this;
	self.actorGuid;
	self.actor;
	self.linkActorProfile;
	self.actorIcon;
	self.displayHtml;
	self.create = function(templateParam){	
		//id
		self.actorGuid = templateParam.guid;
		//nome
		self.actor = templateParam.displayName;
		//link a profilo
		self.linkActorProfile= formatUserProfileLink(templateParam.id);
		$.each( templateParam.links, function( key, link ){
			//icona
			if(link.type && link.type === "image/png")
				self.actorIcon = link.href;
		});
		
		self.displayHtml = "<a href='" + self.linkActorProfile+"'>" + self.actor + "</a>";
	}
	
	self.create(templateParam);
}

//********************** OGGETTO ACTIVITY **********************
function Activity(dataJSON, generateSpaceIndependentUrls)
{
	var self=this;
	
	//********************** VARIABILI **********************
	
	//--------- VARIABILI ACTIVITY STANDARD ---------
	
	self.userIcon = iconUser;
	
	self.actor = ko.observable("");
	self.actorGuid = ko.observable("");
	self.actorIcon = ko.observable("");
	self.linkActorProfile = ko.observable("");
	self.id = ko.observable("");
	self.idMessage = ko.observable("");
	
	self.paginationComments = 5;
	self.activitySId = "";
	self.activityType = "";
	self.objectType = "";
	self.objectId = "";
	self.eventiContext = "Eventi";
	self.wikiContext = "Wiki";
	
	self.isMessageOnly = ko.observable(false);
	self.isActivityDeleted = ko.observable(false);
	
	//--------- VARIABILI DOCUMENTI ---------
	
	self.documentIsImage = ko.observable(false);
	self.documentIsDocument = ko.observable(false);
	self.activityDocumentContainer = ko.observable("");
	self.documentLink = ko.observable("");
	self.documentIconSrc = ko.observable("");
	self.documentIconAlt = ko.observable("");
	
	
	//--------- VARIABILI COMMENTI ---------
	
	self.activityComments = ko.observableArray([]);
	self.commentsIndex = ko.observable(0);
	self.commentsPage = ko.observable(0);
	self.commentsCount = ko.observable(0);
	self.commentsCountLast = ko.observable(0);
	self.commentsVisibility = ko.observable(false);	
	self.inputComment = ko.observable("");	
	self.memberCommentArray = ko.observableArray([]);
	
	//self.generateSpaceIndependentUrls(false);

	
	self.inputCommentKeyUp = ko.computed(function()
	{
		
		if(self.inputComment().length === 1)
		{
			//--------- TAG UTENTI COMMENTI ---------
			
			$("#inserisci-commento").textcomplete(
			[
				{ // html
					match: /\B@(\'|\w{2,}$)/,
					search: function (term, callback) {	
						callback($.map(connections, function (mention) {
							return mention.toLowerCase().indexOf(term.toLowerCase()) > -1 ? mention : null;
						}));
					},
					index: 1,
					replace: function (member, asd, asd1) {
						self.memberCommentArray.push("@" + member);
						//return "<a title='tagUtente' href='javascript:void(0)'>@" + member + "</a> ";
						return "@" + member;
					}
				}
			]);
			
			//--------- FINE - TAG UTENTI COMMENTI ---------
		}
		
	//	setHeightTextAreaPostCommment(self.inputComment());
	});
	
	self.isBoxCommentView = ko.observable(false);
	self.activityStreamCommentIsFocus = ko.observable(false);

	//--------- VARIABILI LIKE ---------
	
	self.displayMessage = ko.observable("");
	self.createdDate = ko.observable("");
	self.likeId = ko.observable("");
	self.likesCount = ko.observable(0);
	self.liked  = ko.observable(false);
	
	//Testo link like
	self.textLike  = ko.computed(function() {
        return self.liked() ? "Non mi piace pi&ugrave;" : "Mi piace";
    });
	
	//Testo numero like
	self.likesText = ko.computed(function() {
		
		if(self.likesCount() === 0 )
			return "A nessuno";
		else if(self.likesCount() === 1 && self.liked())
			return "A te";
		else if(self.likesCount() === 1 && !self.liked())
			return "A un utente";
		else if(self.likesCount() > 1 && !self.liked())
			return "A " + self.likesCount() + " utenti"; 
		else if(self.likesCount() === 2 && self.liked())
			return "A te e un altro utente";
		else if(self.likesCount() > 2 && self.liked())
			return "A te e altri " + (self.likesCount()-1) + " utenti";
    });
	
	self.likesCountPersone = ko.computed(function() {
		
		if(self.likesCount() === 0 )
			return "0 persone";
		else if(self.likesCount() === 1)
			return "una persona";
		else if(self.likesCount() > 1)
			return self.likesCount() + " persone"; 
    });
	
	//--------- VARIABILI TAG ---------
	self.tagsActivity = ko.observableArray([]);
	
	//********************** FINE - VARIABILI **********************
	
	//********************** CREAZIONE VIEW ACTIVITY **********************
	
	
	
	self.actors = [];
	self.objects = [];
	
	self.create = function(dataJSON, generateSpaceIndependentUrls){
		self.id(dataJSON.id);
		self.activityType = dataJSON.activityType;
		self.activitySId = dataJSON.serviceId;
		self.createdDate(getFormatDate(dataJSON.createdDate));
		
		$.each( dataJSON.templateParams.items, function( key, templateParam ){
		
			if(templateParam.key.indexOf("{object[") > -1){
				self.objects[templateParam.key] =  new ActivityObject(templateParam, generateSpaceIndependentUrls);
			}		
			if(templateParam.type === "user"){
				self.actors[templateParam.key] =new Actor(templateParam);
			}
			else if(templateParam.type === "message"){
				self.isMessageOnly(true);
				self.idMessage(templateParam.id);
			}
			else if(templateParam.type === "activity"){
				//------------------ LIKE ------------------			
				self.likesCount(templateParam.likesCount);
				if(templateParam.likesSummary.like && templateParam.likesSummary.like.author){
					self.liked(true);
					self.likeId(templateParam.likesSummary.like.id);
				}
				
				//------------------ COMMENTI ------------------
				self.commentsCount(templateParam.commentsSummary.count);
				if(self.commentsCount() >= 1){
					var count = templateParam.commentsSummary.comments.itemsPerPage - 1;
					var comments = ko.observable(new Comment(templateParam.commentsSummary.comments.items[count]));
					self.activityComments.push(comments);
					self.commentsIndex(self.commentsCount());
					self.commentsCountLast(self.commentsCount());
				}	
			}
		});
		var mainActor = self.actors["{actor[0]}"];
		if(mainActor){
			self.actorGuid(mainActor.actorGuid);
			self.actor(mainActor.actor);
			self.actorIcon(mainActor.actorIcon);
			self.linkActorProfile(mainActor.linkActorProfile);
		}
		if(self.activityType === "create-document"){		
			//Verifico se esiste la url del documento se non esiste setto undefined
			if(dataJSON.detailURL){				
				self.documentLink(wcpRootUrl.replace("/rest/api/","") + "/webcenter" + dataJSON.detailURL);
			}
			else{
				var url = self.objects["{object[0]}"].id.replace(":","%3a");
				self.documentLink(wcpRootUrl.replace("/rest/api/","") + "/webcenter/content/conn/" + url.replace("#","/uuid/"));
			}
			
			//Ritorna l'estensione del file
			var path = self.objects["{object[0]}"].displayName.replace(/.*\./g,".");
			
			//Verifica del tipo di file
			//Se e' un immagine ritorna la url del documento altrimenti la costruisco l'html con le classi che mi occorrono
			if(getIsImage(path)){
				self.documentIsImage(true);
				self.documentIconSrc(self.documentLink());
				self.documentIconAlt("Foto caricata");
			}
			else{
				self.documentIsDocument(true);
				var html = "<a class='ko_activity_doc_link documento " + getImageStaticUrl(path) + "' href='" + self.documentLink() + "' title='Vai al documento'>" + self.objects["{object[0]}"].displayName +"</a>";

				//Lettura tags se esistono
				var idDocument = self.objects["{object[0]}"].id.replace("#","%23");				
				readTags(idDocument, function(data){
					if(data != ""){
						$.each(data.tags, function( key, item ){
							html += "<a class='label tag-social' href='javascript:void(0)' title='Vai all&rsquo;argomento'>" + item.name + "</a>";
							var tag = ko.observable(new Tag(item,idDocument))
							self.tagsActivity.push(tag());
						});
						self.activityDocumentContainer(html);
					}	
				});
				
				if(self.activityDocumentContainer().length === 0)
					self.activityDocumentContainer(html);
			}	
			self.displayMessage(dataJSON.detail);
		}
		else if(self.activityType === "postscope" || self.activityType === "post"  || self.activityType === "postself"){
			//TODO:
			self.isMessageOnly(true);
			self.displayMessage(dataJSON.detail);
			
			if(self.activityType === "post" && Object.keys(self.actors).length > 1 && selectedUserGuid ){
				if(selectedUserGuid == currentUserGuid && self.actorGuid() == currentUserGuid){
					//self.displayMessage(dataJSON.displayMessage);
					self.formatDisplayMessage(dataJSON.message);
				}		
			}				
			
			if(self.actorGuid() === personGuid|| ruolo === amm || ruolo === mod){
				self.isActivityDeleted(true);
			}
		}
		else
		{
			self.isMessageOnly(true);
			self.formatDisplayMessage(dataJSON.message);
		}
	}
	
	self.formatDisplayMessage = function(message){
		self.displayMessage(message);
		
		//Sostituzione Actors
		$.each( Object.keys(self.actors), function( k, key){
			self.displayMessage(self.displayMessage().replace(key,  self.actors[key].displayHtml));
		});
		
		//Sostituzione Objects
		$.each(Object.keys(self.objects), function( k, key ){
			self.displayMessage(self.displayMessage().replace(key,  self.objects[key].displayHtml));
		});
	}
	
	//********************** AGGIUNTA / ELIMINAZIONE LIKE **********************
	self.like = function(){
		
		//Se self.liked() e' true significa che lo sto cancellando quindi che l'utente corrente ha gia' cliccato su mi piace
		if(self.liked()){
			var likeResourceUrl = wcpRootUrl+"activities/"+ self.id() +"/likes/" + self.likeId() + "?utoken="+ utoken;
			$.ajax({
				type: 'DELETE',
				url: likeResourceUrl,
				success: function(data) { 
					self.liked(false);
					self.likesCount(self.likesCount()-1);
				},
				contentType: "application/json",
				dataType: 'json'
			});
		}
		
		//Se self.likeId() e' false significa che l'utente corrente sta inserendo il suo like
		else{
			var likeResourceUrl = wcpRootUrl+"activities/"+ self.id() +"/likes?utoken="+ utoken;
			$.ajax({
				type: 'POST',
				url: likeResourceUrl,
				success: function(data) { 
					self.liked(true);
					self.likeId(data.id);
					self.likesCount(self.likesCount()+1);
				},
				contentType: "application/json",
				dataType: 'json',
				data: '{}'
			});
		}
	}
	
	//********************** COMMENTI PAGINAZIONE **********************
	
	//Commenti per pagina o 1 o tutti
	self.commentsPageSize = ko.observable(1);
	
	self.commentsLoad = function(){
		self.commentsCountLast(0);
		self.commentsPageSize(self.commentsPageSize() + self.commentsCount());
		self.listComments();
	}
	
	self.listComments = function(){
		readComments(self.id(),function(commentsCount){
			var startIndex = commentsCount - self.commentsPageSize();
			self.commentsCount(commentsCount);
			if(startIndex < 0){
				startIndex = 0;
			}
			
			var commentsResourceUrl = wcpRootUrl + "activities/" + self.id() + "/comments?utoken="+ utoken 	+ "&startIndex="+startIndex +"&itemsPerPage=" + self.commentsPageSize();
			$.getJSON( commentsResourceUrl, function( data ) {
				self.commentsPageSize(data.itemsPerPage);
				self.activityComments.removeAll();
				$.each(data.items, function( key, item ){
					if(item.author){
						var comments = ko.observable(new Comment(item));
						self.activityComments.push(comments);
					}
				});
			});
		});
	}
	
	//********************** DELETE - COMMENTO **********************
	
	self.deleteComment = function(comment){
		
		var commentsResourceUrl = wcpRootUrl + "activities/" + self.id() + "/comments/" + comment.commentID() + "?utoken="+ utoken;
		$.ajax({
			type: 'DELETE',
			url: commentsResourceUrl,
			success: function(data) { 
				self.activityComments.remove(function(item) {
					return item().commentID() === comment.commentID();
				});
				self.commentsCount(self.commentsCount()-1);
				self.commentsPageSize(self.activityComments().length);
				
				if(self.activityComments().length === 0 && self.commentsCount() > self.activityComments().length)
				{
					var startIndex = self.commentsCount() -1;
					var commentsResourceUrl = wcpRootUrl + "activities/" + self.id() + "/comments?utoken="+ utoken 	+ "&startIndex=" + startIndex +"&itemsPerPage=1";
					$.getJSON( commentsResourceUrl, function( data ) {
						self.commentsPageSize(data.itemsPerPage);
						$.each(data.items, function( key, item ){
							if(item.author){
								var comments = ko.observable(new Comment(item));
								self.activityComments.push(comments);
							}
						});
					});
				}					
			},
			contentType: "application/json",
			dataType: 'json'
		});
		
	}
	
	//********************** SUBMIT - NUOVO COMMENTO **********************
	self.commentSubmit = function()
	{
		insertComment(self.id(),self.inputComment(), self.memberCommentArray(),function ()
		{
			self.commentsPageSize(self.commentsPageSize() +1);
			self.listComments();
			self.inputComment("");
			$(".ko_activity_comments_insert").height("0");
		});		
	}
	
	self.create(dataJSON, generateSpaceIndependentUrls);
}

//********************** OGGETTO COMMENTO **********************

function Comment(item)
{
	var self = this;
	
	self.commentID = ko.observable("");
	self.actorComment = ko.observable("");
	self.actorProfileUrl = ko.observable("");
	self.actorCommentIcon = ko.observable("");
	self.actorCommentGuid = ko.observable("");
	self.commentsText = ko.observable("");
	self.commentsDate = ko.observable("");
	self.isDeleteComment = ko.observable(false);
	
	self.commentID(item.id);
	self.actorComment(item.author.displayName);
	self.actorCommentGuid(item.author.guid);
	self.commentsText(htmlEscape(item.text));
	
	//EMOTICON
	//$(".ko_activity_comments_text").emoticonize({ animate: false });
	self.actorProfileUrl(formatUserProfileLink(item.author.id));
	self.commentsDate(getFormatDate(item.created));
	$.each(item.author.links, function( key, link ){						
		if(link.type === "image/png"){
			self.actorCommentIcon(link.href);
		}   
	});
	
	//--------------- SICUREZZA DELETE COMMENTO ---------------
	
	if(self.actorCommentGuid() === personGuid|| ruolo === amm || ruolo === mod)
		self.isDeleteComment(true);
	else
		self.isDeleteComment(false);
	
	//--------------- FINE - SICUREZZA DELETE COMMENTO ---------------
}

//********************** POST (NUOVO) - COMMENTO **********************
function insertComment(id,text,memberArray,isInsert){
	
	text = text.replace(/\n/g," ");
	
	//ritorna text con il link agli hashtag e tag utenti se ci sono
	text = getTextHashTag(text, memberArray).text;
	
	var commentsResourceUrl = wcpRootUrl + "activities/" + id + "/comments?utoken=" + utoken;
	$.ajax({
		type: 'POST',
		url: commentsResourceUrl,
		contentType: "application/json",
		success: function(data) {
			isInsert(true);
		},
		dataType: 'json',
		data: '{"text":"'+ text +'"}'
	});
}

//********************** LETTURA COMMENTI (CALLBACK RITORNA IL NUMERO DI COMMENTI)**********************
function readComments(id,count){
	
	var commentsResourceUrl = wcpRootUrl + "activities/" + id + "/commentsSummary?utoken=" + utoken;
	$.ajax({
		type: 'GET',
		url: commentsResourceUrl,
		success: function(data) {
			count(data.count);	
		},
		contentType: "application/json",
		dataType: 'json'
	});
}

//********************** GET TAGGEDITEMS **********************
function readTags(idDoc,detailsTag){
	
	var tagService = wcpRootUrl + "taggeditems/services/oracle.webcenter.doclib/resources/(" + 
	idDoc + ")?personGuid=" + personGuid + "&utoken=" + utoken;
	
	$.ajax({
		type: 'GET',
		url: tagService,
		success: function(data) {
			detailsTag(data);		
		},
		statusCode: {
			//Significa che non esistono tags per quel documento
			404: function() {
				detailsTag("")
			}			
		},
		contentType: "application/json",
		dataType: 'json'
	});	
}


//********************** OGGETTO TAG **********************
function Tag(item,resourceId){
	
	var self = this;
	self.tagName = ko.observable(item.name);
	
}

function NewActivityTag(item){
	
	var self = this;
	var html = 	" <span class='fa fa-close'>" +
					"<span class='hidden'>Elimina il tag</span>" +
				"</span>";
	self.newActivityTagName = item;
	self.newActivityTagNameLink = item + html;
		
}

//Eliminazione attivita'
function deleteActivityStream(id,isDelete){
	
	var activityRemoveService = wcpRootUrl + "messageBoards/space/" + groupSpaceGuids + "/messages/" + id + "?utoken=" + utoken;
	
	$.ajax({
		type: 'DELETE',
		url: activityRemoveService,
		success: function(data) {
			isDelete(true);		
		},
		contentType: "application/json",
		dataType: 'json'
	});	
}

//Restituisce la data nel formato esatto
function getFormatDate(date)
{
	date = (moment(date).format("DD MMMM [alle] HH:mm"));
	return date;
}

//------------- CONTROLLO ESTENSIONE FILE -------------
function getIsImage(path)
{
	var exstensions = ".ase|.art|.bmp|.blp|.cd5|.cit|.cpt|.cr2|.cut|.dds|.dib|.djvu|.egt|.exif|.gif|.gpl|.grf|.icns|.ico|.iff|.ilbm|.lbm|.jng|.jpeg|.jfif|.jpg|.jp2|.jps|.lbm|.max|.miff|.mng|.msp|.nitf|.ota|.pbm|.pc1|.pc2|.pc3|.pcf|.pcx|.pdn|.pgm|.pi1|.pi2|.pi3|.pict|.pct|.png|.pnm|.pns|.ppm|.psb|.psd|.pdd|.psp|.px|.pxm|.pxr|.qfx|.raw|.rle|.ct|.sgi|.rgb|.int|.bw|.tga|.targa|.icb|.vda|.vst|.pix|.tiff|.tif|.vtf|.xbm|.xcf|.xpm";
	
	if(path.toLowerCase().search(exstensions) > -1)
		return true;
	else
		return false
}

function getImageStaticUrl(path)
{
	
	var pdf_ext = ".pdf|.ppdf|.pdfx|.drmz|.pfl|.pdf_|.rrpa|.hpd|.pdfa|.epdf|.pdfua|.pdfxml|.lpdf|.npdf|.updf|.spdf|.hpt|.pdfe|.drm|.drmx|.pdf_tsid";
	var txt_ext = ".txt|.ctxt|.txtrpt";
	var doc_ext = ".docx|.doc|.asd|.dotx|.wbk|.dot|.docm|.svs|.ez|.dotm|.dox|.mcw|.dfv|.msw|.jw|.dochtml|.docmhtml|.mswd|.w6bn|.dothtml|.s8bn|.w8tn|.pwt";
	var ppt_ext = ".ppt|.pptx|.pptm|.ppta|.ppt3|.pptmhtml|.pptv|.pptxml|.ppthtml";
	
	if(path.toLowerCase().search(pdf_ext) > -1)
		return "pdf";
	else if(path.toLowerCase().search(txt_ext) > -1)
		return "txt";
	else if(path.toLowerCase().search(doc_ext) > -1)
		return "docx";
	else if(path.toLowerCase().search(ppt_ext) > -1)
		return "ppt";
	else
		return "no_ico";
	
}

//------------- FINE - CONTROLLO ESTENSIONE FILE -------------

//------------- VALIDATE URL -------------
function isUrlValid(url) 
{
	var urlregex = new RegExp(/^(http|https|ftp):\/\/(\S+([\.\-\/\\]{1}))((\S|\s)+)*.$/i);
	return urlregex.test(url); 
}

//------------- CONTROLLO SE ESISTONO TAG DUPLICATI -------------

function isDuplicateTag(tag,arrayTags)
{
	var isEquals = false;
	
	if(arrayTags.length > 0)
	{
		for (var i = 0; i < arrayTags.length; i++)
		{
			if(arrayTags[i]().newActivityTagName.toLowerCase() === tag.toLowerCase())
			{
				isEquals = true;
				break;
			}
		}
	}	
	return isEquals;
}

//------------- HASHTAG & TAG UTENTI POST (HTML) -------------

function getTextHashTag(text, arrayMember)
{
	var textRegex = text;
	var taggedMembers = [];
	var doubleHashRegex = new RegExp(/#{2,}\S+[a-zA-Z0-9]+\S+/g);
	var startEndHashRegex = new RegExp(/#{1}\S+[a-zA-Z0-9]+\S+\#/g);
	var hashRegex = new RegExp(/\#{1}[a-zA-Z0-9\_\-]+/g);
	
	if(doubleHashRegex.test(textRegex))
	{
		var arrayMatch = textRegex.match(doubleHashRegex);
		
		$.each(arrayMatch, function( key, item )
		{						
			textRegex = textRegex.replace(item,"");
		});
	}
	if(startEndHashRegex.test(textRegex))
	{
		var arrayMatch = textRegex.match(startEndHashRegex);
		
		$.each(arrayMatch, function( key, item )
		{						
			textRegex = textRegex.replace(item,"");
		});
	}
	if(hashRegex.test(textRegex))
	{
		var arrayMatch = textRegex.match(hashRegex);
		
		$.each(arrayMatch, function( key, item )
		{						
			text = text.replace(item,"<a title='hashtag' href='javascript:void(0)'>" + item + "</a>");
		});
	}
	
	if(arrayMember.length > 0)
	{
		$.each(arrayMember, function(key, member)
		{
			if(text.indexOf("@"+member.displayName) > -1)
			{
				text = text.replace("@"+ member.displayName,"<a title='tag utente' href='"+formatUserProfileLink(member.id)+"'>@" + member.displayName + "</a>");
				taggedMembers.push(member.guid);
			}
		});
	}
	
	var textData = { text: text, taggedMembers :taggedMembers};
	return textData;
}

function getUserByDisplayName(userDName){
	var user;
	$.each(connections, function(key, member){
		if(member.profileInformations.displayName.toLowerCase() === userDName.toLowerCase())
			user = member;
	});
	
	return user;
}

function formatUserProfileLink(userName){
	return wcpUrl + "/webcenter/social/user/"+userName+"/Conversazioni";
}

//Restituisce la data nel formato esatto
function getFormatDate(date)
{
	moment.locale('it');
	date = (moment(date).format("DD MMMM [alle] HH:mm"));
	return date;
}