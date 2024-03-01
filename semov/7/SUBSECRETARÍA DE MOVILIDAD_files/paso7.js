// JavaScript Document
$(document).ready(function(i){    
    $('#modelo').keypress(function (e){if( e.which!=8 && e.which!=0 && (e.which<48 || e.which>57)){return false;}});
    $('#serie').keypress(function (e){if( e.which!=8 && e.which!=0 && (e.which<48 || e.which>57) && (e.which<65 || e.which>90) && (e.which<97 || e.which>122)){return false;}});
    $('.Numerico').keypress(function (e){if( e.which!=8 && e.which!=0 && (e.which<48 || e.which>57)){return false;}});        
    $('#telefono').keypress(function (e){if( e.which!=8 && e.which!=0 && (e.which<48 || e.which>57)){return false;}});
    $('#search').show();
    $('#procesing').hide();
    $.Captcha('lib/captcha/','div_captcha');    
    $("#formPaso7").validationEngine({promptPosition : "topRight", scroll: false}); 
    //$('#modelo').focus();
    Tooltips();
	ClaseAuto();
});
function ClaseAuto(){
    $("#formPaso7").validationEngine('hideAll');
    $('#DivClase').html('<input type="text" maxlength="5" id="serie" class="validate[required,minSize[5]] Numerico" style="width:120px;"/>');
    var clase=$('#clase').val();    
    switch(clase){
        case '1': 
            $('#serie').keypress(function (e){if( e.which!=8 && e.which!=0 && (e.which<48 || e.which>57) && (e.which<65 || e.which>90) && (e.which<97 || e.which>122)){return false;}});    
            $('#serie').addClass('validate[required,minSize[5]]');
            $('#modelo').addClass('validate[required,minSize[4]]');            
            break;
        case '2':
            $('#serie').keypress(function (e){if( e.which!=8 && e.which!=0 && (e.which<48 || e.which>57) && (e.which<65 || e.which>90)  && (e.which<97 || e.which>122)){return false;}});
            $('#serie').addClass('validate[required,minSize[5]]');
            $('#modelo').addClass('validate[required,minSize[4]]'); 
            break;
        case '3':
            $('#serie').removeClass('validate[required,minSize[5]]');
            $('#modelo').removeClass('validate[required,minSize[4]]');
            break;
        case '4':
            $('#serie').keypress(function (e){if( e.which!=8 && e.which!=0 && (e.which<48 || e.which>57) /*|| (e.which<65 || e.which>90) || (e.which<97 || e.which>122)*/){return false;}});    
            $('#serie').addClass('validate[required,minSize[5]]');
            $('#modelo').addClass('validate[required,minSize[4]]');                        
            break;
    }       
}
/////////////////////// Modificacion de Fernando Vazquez
function ConsultaCURP(){
    var longitud=$('#curp').val().length;    
    if(longitud<18){   
		return;             		        
    }
	var tip=$('#validate_tip');                
	var parametros='Opcion=ConsultaCURP';
	parametros+='&CURP='+$('#curp').val(); 
	$.ajax({
		type: "POST",
		url:"consultacurp/ajax_curp.php",
		data: parametros,
		cache: false,
		async: true,
		dataType:'json',
		beforeSend: function(){
			$('#search').css('display','none');
			$('#procesing').css('display','');
		},
		success:function(data){		
			console.log("Termino");
			$('#search').css('display','');
			$('#procesing').css('display','none');				
			$('#nombre').val(data.nombre);
			$('#ap1').val(data.ap1);
			$('#ap2').val(data.ap2);   			   
			if($('#nombre').val()=="" || $('#ap1').val()=="" ){
				Error('Al parecer no se encuentra registrada su CURP, por favor revise los datos e inténtelo nuevamente. Gracias.',500);			   
			}
		}			
	});
}
function BuscaCURP(){
	$.ajax({
		type:"POST",
		url:"consultacurp/vbuscacurp.php",
		cache: false,                
		async: true,
		dataType: 'html',
		beforeSend:function(){
		},
		success:function(view){			
			$('body').append('<div id="vBuscaCURP"></div>');
			$('#vBuscaCURP').html(view);
			$("#vBuscaCURP").dialog({
				autoOpen: true,
				width: 450,                        
				modal: true,
				title:'Búsqueda de CURP',
				resizable: false,
				closeOnEscape:false,
				draggable: false,
				position: 'center',
				buttons: {
					'Buscar':function(){
						$("#formBuscaCURP").validationEngine({promptPosition : "topRight", scroll: false});
						var validacion=$('#formBuscaCURP').validationEngine('validate');
						if(validacion){
							var parametros=$("#formBuscaCURP").serialize();
							parametros+="&Opcion=BuscaCURP";
							$.ajax({
								type:"POST",
								url:"consultacurp/ajax_curp.php",
								data: parametros,
								cache: false,                
								async: true,
								dataType: 'json',
								beforeSend:function(){
								},
								success:function(data){									
									if(data.Exito==1){
										$("#curp").val(data.CURP);									
										$("#nombre").val(data.Nombre);
										$("#ap1").val(data.Ape1);
										$("#ap2").val(data.Ape2);
										$('#vBuscaCURP').dialog('destroy');
										$('#vBuscaCURP').remove();                                                
									}else{
										Error("CURP no encontrada",300,function(){});
									}
								}
							});
						}                                
					},
					'Cancelar':function(){                                
						$("#formBuscaCURP").validationEngine('hideAll');
						$('#vBuscaCURP').dialog('destroy');
						$('#vBuscaCURP').remove();
					}
				}
			});                    
		}
	});
}
////////////////////////////////////////////////////////
function Guarda_Cita(){    
    var modelo=$('#modelo'),clase=$('#clase'),serie=$('#serie'),curp=$('#curp'),nombre=$('#nombre'),ap1=$('#ap1'),ap2=$('#ap2'),telefono=$('#telefono'),email=$('#email');

	if(telefono.val().length != 10){
		var mensaje='Por favor ingrese un teléfono <strong>válido</strong> a 10 (diez) dígitos.';
		var html=Html('Informacion', mensaje);
		$('body').append('<div id="emergente"></div>');    
		$("#emergente").html(html);
		$("#emergente").dialog({
			autoOpen: true,
			width: 590,
			modal: true,
			title:'IMPORTANTE',
			resizable:false,
			closeOnEscape:false,
			draggable: true,
			position: 'center',
			buttons: {
			   'Aceptar':function(){
					$('#telefono').select();

					$(this).html('');
					$(this).dialog('destroy');
			   }
			}
		});
		
		return;
	}
	var t = telefono.val();
	if(t=="0000000000" || t=="1111111111" || t=="2222222222" || t=="3333333333" || t=="4444444444" || t=="5555555555" || 
	t=="6666666666" || t=="7777777777" || t=="8888888888" || t=="9999999999" || t=="1234567890" || t=="0987654321" || t=="1122334455" ){
		var mensaje='Es necesario un número telefónico <strong>válido</strong> ya que es el medio de comunicación con usted en caso de ser necesario.';
		var html=Html('Informacion', mensaje);
		$('body').append('<div id="emergente"></div>');    
		$("#emergente").html(html);
		$("#emergente").dialog({
			autoOpen: true,
			width: 590,
			modal: true,
			title:'IMPORTANTE',
			resizable:false,
			closeOnEscape:false,
			draggable: true,
			position: 'center',
			buttons: {
			   'Aceptar':function(){
				   $('#telefono').select();
					$(this).html('');
					$(this).dialog('destroy');
			   }
			}
		});
		
		return;
	}
	
    var captcha=$.Captcha.Validate();
    if(captcha){
        var validacion=$("#formPaso7").validationEngine('validate');
        if(validacion){
           
            var parametros='opcion=guarda_cita';        
            parametros+='&curp='+curp.val().toUpperCase();
            parametros+='&nombre='+nombre.val().toUpperCase();
            parametros+='&ap1='+ap1.val().toUpperCase();
            parametros+='&ap2='+ap2.val().toUpperCase();
            parametros+='&telefono='+telefono.val();
            parametros+='&email='+email.val();
            parametros+='&modelo='+modelo.val();
            parametros+='&clase='+clase.val();
            parametros+='&serie='+serie.val().toUpperCase();
            parametros+='&empresa='+$('#NEmpresa').val().toUpperCase();
            var datos=$.ajax({type: "POST",url:"ajax.php",data: parametros,cache: false,async: false,dataType:'text'}).responseText;
            Cierra_Loading();
            datos=jQuery.parseJSON(datos);        
            if(datos.Exito=='1'){            
                $('#Btn_Guardar').css('display','none');
                $('#Btn_Imprimir').css('display','');
				//var mensaje='Deberá presentar el REPORTE DE CITA impreso en la ventanilla correspondiente, para realizar su movimiento vehicular.<br><br> Verifique que su impresora esté preparada, tenga tinta y papel.';        
				var mensaje='Recomendamos imprimir el REPORTE DE CITA, en el encontrará todos los requisitos que debe cumplir para realizar con éxito su trámite vehicular. <br><br> Verifique que su impresora esté preparada, tenga tinta y papel.'; 
				var html=Html('Informacion', mensaje);
				$('body').append('<div id="emergente"></div>');    
				$("#emergente").html(html);
				$("#emergente").dialog({
					autoOpen: true,
					width: 590,
					modal: true,
					title:'IMPORTANTE',
					resizable:false,
					closeOnEscape:false,
					draggable: true,
					position: 'center',
					buttons: {
					   'Aceptar':function(){
							$( "#dialogCuestionario" ).dialog('open');
							
						$('#folio').val(datos.Folio);
                		var ventana=window.open('reportes/comprobanteqr.php?folio='+datos.Folio,'_blank','');	
						 $(this).html('');
                		 $(this).dialog('destroy');
					   }
					}
				}); 
				

			}else{
                switch(datos.Error){
                    case '0':
						Error('Lo sentimos pero el horario de '+ datos.hora+' de la '+datos.ventanilla +' para el día ' +datos.fecha +' se encuentra ocupado. Favor de dar click en el botón "Regresar" para seleccionar, según sea el caso: otra ventanilla, otro horario u otra fecha para su cita',500);
						break;
                    case '1':
                        Error('Usted no asistió a su ultima cita, por tal motivo podrá solicitar citas a después de '+datos.FLiberacion,500);
                        break;
                    case '2':
						
                        //Informacion('Usted ya cuenta con una cita registrada en:<br>'+datos.OficinaDeCita+'<br>Fecha: '+datos.FechaDeCita+' '+datos.HorarioDeCita+'hrs.<br>'+datos.VentanillaDeCita, 300);
						
						var mensaje='No es posible agendar debido a que usted ya cuenta con una cita activa registrada.<br><br>DATOS<br>Lugar: <u>'+datos.OficinaDeCita+'</u><br>Fecha y hora: <u>'+datos.FechaDeCita+' '+datos.HorarioDeCita+' hrs.</u><br>Atención en: <u>'+datos.VentanillaDeCita+'</u>';
						var html=Html('Error', mensaje);
						$('body').append('<div id="emergente"></div>');    
						$("#emergente").html(html);
						$("#emergente").dialog({
							autoOpen: true,
							width: 590,
							modal: true,
							title:'AVISO',
							resizable:false,
							closeOnEscape:false,
							draggable: false,
							position: 'center',
							buttons: {
							   'Aceptar':function(){
								 $(this).html('');
								 $(this).dialog('destroy');
							   }
							}
						});
				
						
						
						
                        break; 
                    case '3':
                        Error('Lo sentimos pero el horario de '+ datos.hora+' de la '+datos.ventanilla +' para el día ' +datos.fecha +' se encuentra ocupado. Favor de dar click en el botón "Regresar" para seleccionar, según sea el caso: otra ventanilla, otro horario u otra fecha para su cita',500);
                        break;
					case '4':
						Error('De momento no es posible sacar una nueva cita, intentelo más tarde.',500);
						break;	
                }
            }
        }
        
    }    
}
function Imprime_Comprobante(){
    var folio=$('#folio').val();
    var ventana=window.open('reportes/comprobanteqr.php?folio='+folio,'_blank','');
}
function MuestraMensaje(){
    /*$('#serie').validationEngine('showPrompt','Colocar los últimos 5 dígitos','load');
    $('#serie').validationEngine('promptPosition',"topRight");*/
}

//var mensaje='Verifique que su impresora esté preparada, tenga tinta y papel.\nEsto es importante porque el documento sólo se imprime\n una vez.'; 
