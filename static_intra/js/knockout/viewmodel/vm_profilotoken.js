function initProfiloToken(self, functionBack, _errorEvent) {
	// gestione profilo e token
	self.profiloToken = ko.observable("");
	self.token = ko.observable("");

	// set del token
	self.setToken = function() {
		var url = urlRest + "profile";
		var _successEvent = function(data) {
			self.profiloToken(new ProfiloToken(data));
			self.token(self.profiloToken().token());
			functionBack();
		};
		getAjaxWithJSONResponse(_successEvent, url, _errorEvent);
	}

	self.setToken();
}

function ProfiloToken(dataJSON) {
	var self = this;

	self.matricola = ko.observable("");
	self.token = ko.observable("");
	self.ruoli = ko.observableArray([]);
	self.codiciUnita = new Array();
	self.isAdmin = ko.observable(false);
	self.isGestioneSede = ko.observable(false);
	self.isGestioneOrgani = ko.observable(false);
	self.isGestioneComitati = ko.observable(false);

	self.create = function(dataJSON) {
		self.matricola(dataJSON.matricola);
		self.token(dataJSON.token);
		self.isAdmin(dataJSON.isAdmin);

		if (!self.isAdmin()) {
			for (var i = 0; i < dataJSON.codiciUnita.length; i++) {
				self.codiciUnita[dataJSON.codiciUnita[i]] = '1';
			}
		}
		self.isGestioneSede(dataJSON.isGestioneSede);
		self.isGestioneOrgani(dataJSON.isGestioneOrgani);
		self.isGestioneComitati(dataJSON.isGestioneComitati);
	}

	if (dataJSON) {
		self.create(dataJSON);
	}
}

function initToken(self, url, functionBack, _errorEvent) {
	// gestione token
	self.token = ko.observable("");
	// set del token
	self.setToken = function() {
		var _successEvent = function(data) {
			self.token(data.token);
			functionBack();
		};
		getAjaxWithJSONResponse(_successEvent, url, _errorEvent);
	}
	self.setToken();
}
