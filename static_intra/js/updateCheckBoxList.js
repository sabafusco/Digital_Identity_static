$(function() {
      if (window.location.href.indexOf("pageCurrent")== -1) {
           sessionStorage.setItem("checkSelezionati", "")
      } 
	  console.log(sessionStorage.getItem('checkSelezionati'));
	  var arrayCheck = [];
	  if(sessionStorage.getItem('checkSelezionati') != "") {
		  arrayCheck = sessionStorage.getItem('checkSelezionati').split(',');
	  }
	 
      if(arrayCheck.length > 0 ){
		  disableButton(false);
		  
	  }else{
		  disableButton(true);
	  }
	  console.log("arrayCheck ", arrayCheck);
      $(".chkSel").each(function(){
		  console.log($(this).val());
        if($.inArray($(this).val(), arrayCheck) != -1) {
           $(this).prop('checked', true);
        }
      });
	  
	  $('#chkAll').prop('checked', ($("input.chkSel:checked").length)==($("input.chkSel").length));
      $('#chkAll').click(function(event) {
		  var checkAll = $(this);
		  $('.chkSel').each(function() {
			$(this).prop('checked', checkAll.is(':checked'));
		  });
		  $('.chkSel').each(objChange);
      });
      $(".chkSel").change(objChange);
	  
 });

 function objChange() {
		  var arraySelezionati = [];
			if(sessionStorage.getItem('checkSelezionati') != "") {
				arraySelezionati = sessionStorage.getItem("checkSelezionati").split(',');
			}
		   if($(this).is(':checked')) {
                if($.inArray($(this).val(), arraySelezionati) == -1) {
                     arraySelezionati.push($(this).val());
                     disableButton(false);
                }
           } else {
                  var indexElement = $.inArray($(this).val(), arraySelezionati);
                  console.log("indexElement " + indexElement );
				  if(indexElement != - 1) {
                     arraySelezionati.splice(indexElement,1);
                     if(arraySelezionati.length == 0) {
                          disableButton(true);
                     }
                  }
           }
		   if(arraySelezionati.length > 0) {
				sessionStorage.setItem("checkSelezionati", "" + arraySelezionati);
			} else {
				sessionStorage.setItem("checkSelezionati", "");
			}
			$('[name="trackingListT"]').val(arraySelezionati.toString());
			$('#chkAll').prop('checked', ($("input.chkSel:checked").length)==($("input.chkSel").length));
      }

 function disableButton(status){
      if(status) {
           $("#bottoneEsporta").attr("disabled", true);
      } else {
           $("#bottoneEsporta").removeAttr("disabled");
      }
 }
 
 function updateCheckBoxList(){}
