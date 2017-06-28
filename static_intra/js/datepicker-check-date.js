$('.date input').datepicker({                      
		    	format: "dd/mm/yyyy",
				weekStart: 1,
				todayBtn: "linked",
				language: "it",
				todayHighlight: true,
				autoclose: true
});
var startDate = "";
var endDate = "";
$('#dataStart').datepicker()
	.on('changeDate', function(ev){
	if ((ev.date.valueOf() > endDate.valueOf()) && (endDate.valueOf() != "")){
		$('#alert-data').show().find('strong').text('Seleziona una data di inizio antecedente alla data di fine.');
	} else {
		$('#alert-data').hide();
		startDate = new Date(ev.date);
	}
});
$('#dataEnd').datepicker()
	.on('changeDate', function(ev){
	if (ev.date.valueOf() < startDate.valueOf()){
		$('#alert-data').show().find('strong').text('Seleziona una data di inizio antecedente alla data di fine.');
	} else {
		$('#alert-data').hide();
		endDate = new Date(ev.date);
	}
});