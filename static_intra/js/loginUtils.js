function submitFormLogin(){
    if (returnObjById("USER").value!="" &&
		returnObjById("PASSWORD").value!="") { 
		return true;
    }
	return false;
}


function returnObjById(id){
	var returnVar;
	if (document.getElementById)
		returnVar = document.getElementById(id);
	else if (document.all)
		returnVar = document.all[id];
	else if (document.layers)
		returnVar = document.layers[id];
	return returnVar;
} 
function enableSubmit(enable) {
	if (enable === undefined) enable=true;
	if (enable){
		document.body.style.cursor = "auto";
		returnObjById("btnSubmit").disabled = false;
		returnObjById("btnSubmit").className= 'input-sparql';
		returnObjById('btnSubmit').value="Esegui query";
	}else{
		document.body.style.cursor = "wait";
		returnObjById("btnSubmit").disabled = true;
		returnObjById("btnSubmit").className= 'button-disable-style';
		returnObjById('btnSubmit').value="Esegui query";
	}
}
