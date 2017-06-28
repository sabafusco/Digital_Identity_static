// MODEL DATA Community
function Community(jsonData) {
	var self = this;
	self.name = ko.observable("");
	self.id = ko.observable("");
	self.handle = ko.observable("");
	self.system = ko.observable("");
	self.subcommunities = ko.observableArray([new SubCommunity()]);
	self.subcollection = ko.observableArray([new Collection()]);
	self.introductoryText = ko.observable("");
	self.listExpand = ko.observableArray([]);
	self.href= ko.observable("");

	self.create = function(jsonData) {
		self.name(jsonData.name);
		self.id(jsonData.id);
		console.log('Community create url listaSottoComunita'+listaSottoComunita);
		self.href(listaSottoComunita+"&id="+self.id());
		self.handle(jsonData.handle);
		self.system(jsonData.system);
		self.subcommunities(jsonData.subcommunities);
		self.subcollection(jsonData.subcollection);
		self.introductoryText(jsonData.introductoryText);
		self.listExpand(jsonData.listExpand);
	}

	if (jsonData) {
		self.create(jsonData);
	}
}

// MODEL DATA SubCommunity
function SubCommunity(jsonData) {
	var self = this;
	self.name = ko.observable("");
	self.id = ko.observable("");
	self.handle = ko.observable("");
	self.system = ko.observable("");
	self.subcollection = ko.observable(new Collection());
	self.introductoryText = ko.observable("");
	self.listExpand = ko.observableArray([]);

	self.create = function(jsonData) {

		self.name(jsonData.name);
		self.id(jsonData.id);
		self.handle(jsonData.handle);
		self.system(jsonData.system);
		self.subcommunities(jsonData.subcommunities);
		self.subcollection(jsonData.subcollection);
		self.introductoryText(jsonData.introductoryText);
		self.listExpand(jsonData.listExpand);
	}

	if (jsonData) {
		self.create(jsonData);
	}
}

// MODEL DATA Collection
function Collection(jsonData) {
	var self = this;
	
	self.name = ko.observable("");
	self.id = ko.observable("");
	self.system = ko.observable("");
	self.shortDescription = ko.observable("");
	self.sidebarText = ko.observable("");
	self.introductoryText = ko.observable("");
	self.copyrightText = ko.observable("");
	self.numberItems = ko.observable("");
	
	self.create = function(jsonData) {

		self.name(jsonData.name);
		self.id(jsonData.id);
		self.system(jsonData.system);
		self.shortDescription(jsonData.shortDescription);
		self.sidebarText(jsonData.sidebarText);
		self.introductoryText(jsonData.introductoryText);
		self.copyrightText(jsonData.copyrightText);
		self.numberItems(jsonData.numberItems);
	}

	if (jsonData) {
		self.create(jsonData);
	}
}

// MODEL DATA DocHomePage
function DocHomePage(jsonData) {
	var self = this;
	
	self.system				= ko.observable("");
	self.resourceId 		= ko.observable("");
	
	self.create = function(jsonData) {
		self.system	(jsonData.system);
		self.resourceId (jsonData.resourceId);
	
	}
	if (jsonData){
		self.create(jsonData);
	}	
}


// MODEL DATA Item
function Item(jsonData) {
	var self = this;
	
	self.system=ko.observable("");
	self.id = ko.observable("");
	self.name = ko.observable("");
	self.parentCollectionsOfItemArr = ko.observableArray([new CollectionOfItem()]);
	self.metadataItemArr= ko.observableArray([new MetaData()]);
	self.allegatiItemArr= ko.observableArray([new BitStream()]);
	
	self.spanStyledDataIssued = "<span class=\"text-label\">Data: </span>";
	self.dataIssuedItem = ko.observable("");
	
	self.spanStyledAutors = "<span class=\"text-label\">Autore: </span>";
	self.authorsItem = ko.observable("");
	
	self.abstractItem = ko.observable("");
	
	self.spanStyledUri = "<span class=\"text-label\">URI: </span>";
	self.uriItem = ko.observable("");
	
	self.thumbnailItem = ko.observable(new BitStream());
	self.thumbnailImg = ko.observable("");
	self.filteredDocs = ko.observableArray([new BitStream()]);
	self.tmpBitStream = ko.observable(new BitStream());
	self.attachmentsArr = ko.observableArray([new Attachment("","","")]);
	
	self.spanStyledCollectionItem = "<span class=\"text-label\">Collezioni: </span>";
	self.collectionItem = ko.observable("");
	
	self.metaDataLinkValue = "Mostra tutti" ;
	self.metaDataHrefValue = ko.observable("");
	
	self.prefixImgPath="img_content/";
	self.shouldShowAllegatiBox = ko.observable(true) ;
	
	self.detailItemHref 	= ko.observable("");
	
	self.parentCollectionsOfItemArr.removeAll();
	self.metadataItemArr.removeAll();
	self.allegatiItemArr.removeAll();
	
	self.create = function(jsonData) {
		
		self.system(jsonData.system);
		self.id (jsonData.id);
		self.name( jsonData.name);
		self.uriItem ( jsonData.link );
		
		self.attachmentsArr.removeAll();
		
		// parentCollectionList
		self.parentCollectionsOfItemArr.removeAll();
		$.each(jsonData.parentCollectionList, function(i, item) {
			self.parentCollectionsOfItemArr.push(new CollectionOfItem(item));
		});
		
		// metadati
		self.metadataItemArr.removeAll();
		$.each(jsonData.metadata, function(i, metadato) {
			self.metadataItemArr.push(new MetaData(metadato));
		});
		
		// allegati
		self.allegatiItemArr.removeAll();
		$.each(jsonData.bitstreams, function(i, allegato) {
			self.tmpBitStream (new BitStream(allegato,self.system())) ;
			self.allegatiItemArr.push(self.tmpBitStream());
		});
		
		// data
		self.dataIssuedItem (self.spanStyledDataIssued + extractSingleMetadataByKey(self.metadataItemArr(),'dc.date.issued') ); 
		
		// autori
		var arrMetaAuthors = extractMetadataMultiIstanceByKey(self.metadataItemArr(),'dc.contributor.author');
		
		if ( arrMetaAuthors.length == 0) // autori non trovati...
			self.authorsItem (self.spanStyledAutors + ' sconosciuto');
		else
		{
			var tmpConcatAuthors = "";
			$.each(arrMetaAuthors, function(i, author) {
				tmpConcatAuthors+=author+' ';
			});
			self.authorsItem (self.spanStyledAutors + tmpConcatAuthors);
		}
		// autori

		// descrizione(abstract)
		self.abstractItem (extractSingleMetadataByKey(self.metadataItemArr(),'dc.description.abstract') );
		if(self.abstractItem=="")
			self.abstractItem = "";
	
		// uri
		//var uriContentValue = extractSingleMetadataByKey(self.metadataItemArr(),'dc.identifier.uri') ;
		//self.uriItem = self.spanStyledUri + '<a href=\"'+uriContentValue+'\" title=\"...\">'+ ' ' + uriContentValue+'</a>';
	
		// Collezioni dell'item
		
		var tmpConcatCollection = "" ;
		
		$.each(self.parentCollectionsOfItemArr(), function(i, parentCollection) {
			tmpConcatCollection+= '<a href=\"'+collection+'&id='+parentCollection.id()+'\" title=\"...\">'+ ' ' + parentCollection.name()+'</a>' +' ';
		});
		
		self.collectionItem (self.spanStyledCollectionItem + tmpConcatCollection) ;
		
		// Collezioni dell'item
		
		// link metadati 'Mostra tutti'
		console.log('Item create url metadata'+metadata);
		self.metaDataHrefValue ( metadata+"&id="+self.id());
	
		// thumbnail 
		// load item json da lista allegati json
		self.thumbnailItem ( extractThumbnailFromItemBitstreams(self.allegatiItemArr()) );
		
		
		if (self.thumbnailItem()==null)
			self.thumbnailImg ("img_content/allegato_biblionweb.jpg")	;
		else	
			self.thumbnailImg ("/rest-biblion-fe-rs-web/rest/api/biblionweb/downloadBitstreamOfItem/"+self.thumbnailItem().system()+"/"+self.thumbnailItem().id());
		
		// allegati
		self.filteredDocs ( extractAllegatiPdfFromItemBitStreams(self.allegatiItemArr()));
		
		
		if (self.filteredDocs()==null){
			self.shouldShowAllegatiBox (false);
		}
		else {
				self.attachmentsArr.removeAll();
				$.each(self.filteredDocs(), function(i, bitStreamPdfDoc) {
					self.attachmentsArr.push(new Attachment(bitStreamPdfDoc.system(),bitStreamPdfDoc.name(),bitStreamPdfDoc.id()));
			});
		}
		console.log('Item create url detailItem'+detailItem);
		self.detailItemHref	(detailItem+"&system="+self.system()+"&id="+self.id());
	}

	if (jsonData) {
		self.create(jsonData);
	}
}

// MODEL DATA CollectionOfItem
function CollectionOfItem(jsonData) {
	var self = this;
	
	self.name = ko.observable("");
	self.id = ko.observable("");
		
	self.create = function(jsonData) {
		self.name (jsonData.name) ;
		self.id (jsonData.id );
	}

	if (jsonData) {
		self.create(jsonData);
	}
}

// MODEL DATA MetaData
function MetaData(jsonData) {
	var self = this;
	
	self.key = ko.observable("");
	self.value = ko.observable("");
	self.lang = ko.observable("");
	
	self.create = function(jsonData) {

		self.key(jsonData.key);
		self.value(jsonData.value);
		self.lang(jsonData.lang);
	}

	if (jsonData) {
		self.create(jsonData);
	}
}

// MODEL DATA BitStream
function BitStream(jsonData,system) {
	var self = this;
	
	self.system			= ko.observable("");
	self.id 			= ko.observable("");
	self.name 			= ko.observable("");
	self.type			= ko.observable("");
	self.bundleName		= ko.observable("");	
	self.format			= ko.observable("");
	self.mimeType		= ko.observable("");
	self.retrieveLink	= ko.observable("");
	
	self.create = function(jsonData) {

		self.system(system);
		self.id(jsonData.id);
		self.name(jsonData.name);
		self.type(jsonData.type);
		self.bundleName(jsonData.bundleName);
		self.format(jsonData.format);
		self.mimeType(jsonData.mimeType);
		self.retrieveLink(jsonData.retrieveLink);
		
	}
	
	if (jsonData) {
		self.create(jsonData);
	}
}

// MODEL DATA BitStream
function Attachment(system,name,id) {
	var self = this;
	
	self.system			= ko.observable("");
	self.id 			= ko.observable("");
	self.name 			= ko.observable("");
	self.downloadLink 	= ko.observable("");
	
	self.create = function(system,name,id) {

		self.system(system);
		self.id(id);
		self.name(name);
		self.downloadLink("/rest-biblion-fe-rs-web/rest/api/biblionweb/downloadBitstreamOfItem/"+self.system()+"/"+self.id());
	
	}
	self.create(system,name,id);
	
}

// usato per estrapolare data , abstract ,uri  dai metadata dell'item
function extractSingleMetadataByKey(metadataItemArr,key)
{	
	var metadataValue = '';
	$.each(metadataItemArr, function(i, metadato) {
		if ( metadato.key() == key ){
			metadataValue = metadato.value();
		}
	});
	return metadataValue;
}

// usato per estrapolare n metadata con stessa key ( autori )
function extractMetadataMultiIstanceByKey(metadataItemArr,key)
{	
	var arrMeta = new Array();
	$.each(metadataItemArr, function(i, metadato) {
		if ( metadato.key() == key ){
			arrMeta.push(metadato.value());
		}
	});
	return arrMeta;
}

function extractThumbnailFromItemBitstreams ( allegatiItemArr )
{
	var thumbnail= null;
	
	$.each(allegatiItemArr, function(i, allegato) {
		if ( allegato.bundleName() == 'THUMBNAIL' )
			thumbnail =  allegato;
	});
	
	return thumbnail;
}

function extractAllegatiPdfFromItemBitStreams ( allegatiItemArr )
{
	var allegati = new Array();
	
	$.each(allegatiItemArr, function(i, allegato) {
			if ( allegato.bundleName() == 'ORIGINAL' )
				allegati.push(allegato);
		});
	
	if (allegati.length <1) allegati = null;
		
	return allegati;
}

// MODEL DATA DocRicerca
function DocRicerca(jsonData) {
	var self = this;
	
	self.system				= ko.observable("");
	self.resourceId 		= ko.observable("");
	self.title 				= ko.observable("");
	self.dataInserimento    = ko.observable("");
	self.sommario 			= ko.observable("");
	self.anno 				= ko.observable("");
	self.authors 			= ko.observable("");
	self.detailItemHref 	= ko.observable("");
	
	self.spanStyledDataIssued = "<span class=\"text-label\">Data: </span>";
	self.spanStyledAutors = "<span class=\"text-label\">Autore: </span>";
	self.spanStyledAbstract = "<span class=\"text-label\">Abstract: </span>";
	
	self.create = function(jsonData) {

		self.system				( jsonData.system );
		self.resourceId 		( jsonData.resourceId);
		self.title 				( jsonData.title);
		self.dataInserimento    ( self.spanStyledDataIssued+ jsonData.dataInserimento.day + "/" + jsonData.dataInserimento.month + "/" + jsonData.dataInserimento.year );
		
		self.sommario 			( jsonData._abstract );
		
		if ( self.sommario()==null )
			self.sommario (" ") ;
	
		self.anno 				( jsonData.anno ) ;
		self.authors 			( self.spanStyledAutors + jsonData.author);
		
		console.log('DocRicerca create url detailItem'+detailItem);
		self.detailItemHref		(detailItem+"&system="+self.system()+"&id="+self.resourceId());
	}
	
	if (jsonData){
		self.create(jsonData);
	}	
}