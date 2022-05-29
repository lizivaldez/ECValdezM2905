//1.abre la capa del formulario//
var modal = document.getElementById("myModal");
var AddButton = document.getElementById("AddButton");
var span = document.getElementsByClassName("close")[0];
//3.Funcionalidad al botòn//
var InsertButton = document.getElementById("InsertButton");
var UpdateButton = document.getElementById("UpdateButton");
  //13.sacar ìndice/
var table = document.getElementById("PersonTable");
//19.Botòn actualizar//
var selectedRowIndex = 0;

//2.Mostrar el modal//
AddButton.onclick = function(){
    modal.style.display = "block";
//11.Agregamos la funciòn para limpiar el formulario//
   ClearForm();
}
span.onclick = function(){
    modal.style.display = "none";
}
//5. Para el sexo//
function GetCheckedRadioValue(RadiosName){
    var radios = document.getElementsByName(RadiosName);
    for(var i=0, length = radios.length; i<length; i++){
        if(radios[i].checked){
            selectedOption = radios[i].value;
            break;
        }  
    }  
    return selectedOption;
} 
 //6. Para los pasatiempos//
 function GetCheckedBoxesValue(ChkboxName){
    var checkboxes = document.getElementsByName(ChkboxName);
    var checkboxesChecked = "";
    for(var i=0; i<checkboxes.length; i++){
        if(checkboxes[i].checked){
            checkboxesChecked = checkboxesChecked.concat(checkboxes[i].value).concat(", ");
        }  
    }  
    checkboxesChecked = checkboxesChecked.trim().substring(0, checkboxesChecked.trim().length -1);
    return checkboxesChecked.length>0?checkboxesChecked:"";
} 

//3.Insertar registros en la Tabla//
function InsertarRegistro(){
   var cedula = document.getElementById("IDTextBox").value;
    
 // if(ValidarCedula(cedula)){   
//4.Preparar la Tabla//
    var a = document.getElementById("PersonTable").insertRow(1);
        var b = a.insertCell(0);
        var c = a.insertCell(1);
        var d = a.insertCell(2);
        var e = a.insertCell(3);
        var f = a.insertCell(4);
        var g = a.insertCell(5);
        var h = a.insertCell(6);
        var i = a.insertCell(7);
//columna para el ìndice//   
        c.innerHTML = document.getElementById("IDTextBox").value;
     //   d.innerHTML = document.getElementById("CantidadTextBox").value;
        e.innerHTML = document.getElementById("PrecioTextBox").value;

        var genero = GetCheckedRadioValue("Producto");
        d.innerHTML = genero;
//dinámico el ìcono del genero//
      //  if(genero == "Masculino"){
      //      table.rows[selectedRowIndex].cells[5].ClassName = "male";         
      //  } 
      //  else{
      //      table.rows[selectedRowIndex].cells[5].ClassName = "female";     
      //  } 


      //    g.innerHTML = ObtenerZonaPorCedula(cedula);

        var pasatiempos = GetCheckedBoxesValue("Pasatiempos");
        h.innerHTML = pasatiempos;
        
    
 //7. Para los botones//
        var buttons = 	"<button name='EditButton' onclick='ShowModalForEdit(this)'>Editar</button>";
        buttons = buttons.concat("&nbsp;").concat("<button name='DeleteButton' onclick='deleteRow(this)'>Eliminar</button>");
        i.innerHTML = buttons;

        var modal = document.getElementById("myModal");
        modal.style.display = "none";    	 
    }
//}
//8. Para el Delete de la fila//
function deleteRow(sender){
    var i= sender.parentNode.parentNode.rowIndex;
    document.getElementById("PersonTable").deleteRow(i);
}
//9Botòn actualizar//
function ShowModalForEdit(sender){
    modal.style.display = "block";
    //12.Agregamos la funciòn para limpiar el formulario//
    ClearForm();
    //13.sacar ìndice/
    selectedRowIndex = sender.parentNode.parentNode.rowIndex;
    
    document.getElementById("IDTextBox").value = table.rows[selectedRowIndex].cells[1].innerHTML.toString();
    document.getElementById("FirstNameTextBox").value = table.rows[selectedRowIndex].cells[2].innerHTML.toString();
    document.getElementById("LastNameTextBox").value = table.rows[selectedRowIndex].cells[3].innerHTML.toString();
    var  genero = table.rows[selectedRowIndex].cells[4].innerHTML.toString();
    SelectRadioByValue("Sexo",genero);
    var PasatiemposString = table.rows[selectedRowIndex].cells[6].innerHTML.toString();
    var PasatiemposArray = PasatiemposString.split(",");
    for (var x=0; x<PasatiemposArray.length;x++){
        SelectCheckBoxByValue("Pasatiempos",PasatiemposArray[x].trim());
    } 
  //Ocultar el botòn Insertar//  
    InsertButton.style.visibility = 'hidden';
      //Mostrar el botòn actualizar//  
    UpdateButton.style.visibility = 'visible';

}
//10.Para actualizar es necesario limpiar el formulario//
function ClearForm() {
    document.getElementById("IDTextBox").value = '';
    document.getElementById("FirstNameTextBox").value = '';
    document.getElementById("LastNameTextBox").value = '';
    CheckBoxesToFalse("Pasatiempos");
    RadiosToFalse("Sexo")
} 

function CheckBoxesToFalse(ChkboxName){
    var checkboxes = document.getElementsByName(ChkboxName);
    for (var i = 0;i<checkboxes.length; i++){
        checkboxes[i].checked = false;
    } 
    return;
} 

function RadiosToFalse(RadiosName){
    var radios = document.getElementsByName(RadiosName);
    for (var i = 0;i<radios.length; i++){
        radios[i].checked = false;
    } 
    return;
} 
    //14. En el boton editar debe aparecer los datos que se habìa seleccionado anteriormente/
    function SelectRadioByValue(RadiosName,Value){
        var radios = document.getElementsByName(RadiosName);
        for (var i = 0;i<radios.length; i++){
            radios[i].checked = true;
            break;
        } 
        return;
    } 
        //17. Todo y solo para que aparezca en cadena el string de los pastiempos/
        function SelectCheckBoxByValue(ChkboxName,Value){
            var checkboxes = document.getElementsByName(ChkboxName);
            for (var i = 0;i<checkboxes.length; i++){
                if(checkboxes[i].value == Value){
                    checkboxes[i].checked = true;
                }   
                
            } 
            return;
    } 

//18.Botòn actualizar//

function ActualizarRegistro() {
    var cedula = document.getElementById("IDTextBox").value;
if (ValidarCedula(cedula)){
    table.rows[selectedRowIndex].cells[1].innerHTML= document.getElementById("IDTextBox").value;
    table.rows[selectedRowIndex].cells[2].innerHTML = document.getElementById("FirstNameTextBox").value;
    table.rows[selectedRowIndex].cells[3].innerHTML = document.getElementById("LastNameTextBox").value; 
   
    var genero = GetCheckedRadioValue("Sexo");
    table.rows[selectedRowIndex].cells[4].innerHTML = genero;
  //actualizar càlculo de edad al digitar la cèdula//  
    table.rows[selectedRowIndex].cells[5].innerHTML = ObtenerZonaPorCedula(cedula);

   // var  pasatiempos = GetCheckedBoxesValue("Pasatiempos");
   // table.rows[selectedRowIndex].cells[6].innerHTML = pasatiempos;
//19. Una vez que se clickea en el botón actualizar el formulario se debe ocultar y no quedar allì//  
} 
modal.style.display = "none";  
} 

