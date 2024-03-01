// JavaScript Document
function Html(tipo,mensaje){
    var html='<table width="100%" border="0" cellpadding="0" cellspacing="0">';
    html+='<tr><td width="22px;" align="center" valign="middle" style="min-height:inherit;min-width:inherit"><div class="'+tipo+'" style="width:57px; height:55px;">&nbsp;</div></td>';
    html+='<td width="5px;" align="left" style="min-height:inherit;min-width:inherit">&nbsp;</td><td width="*" align="left" valign="middle" class="Mensajes">'+mensaje+'</td></tr></table>';
    return html;
}

//  SE COMENTA PORQUE DA UN ERROR UNDEFINED QUE NO SE NECESITA 03/01/2023 10:26
function Mensajes(tipo,mensaje,ancho){ 
    switch(tipo){
        case 'Error':
                var titulo='Error';
                break;
        case 'Informacion':
                var titulo='Información';
                break;
        case 'Alerta':
                var titulo='Alerta';
                break;					
    }    
    $('body').append('<div id="dialog"></div>');    
    var html=Html(tipo, mensaje);
    $("#dialog").html(html);
    $("#dialog").dialog({
        autoOpen: true,
        width:ancho,
        modal: true,
        title: titulo,
        resizable: false,
        closeOnEscape:true,
        draggable: true,
        position: 'center',
        beforeClose: function(event, ui) {$(this).empty();$(this).dialog('destroy');$(this).remove();},
        buttons: {		
            'Aceptar':function() {
                $(this).empty();
                $(this).dialog('destroy');
                $(this).remove();
        }
    }});
}
function Error(mensaje,ancho){Mensajes('Error',mensaje,ancho);}
function Informacion(mensaje,ancho){Mensajes('Informacion',mensaje,ancho);}	
function Alerta(mensaje,ancho){Mensajes('Alerta',mensaje,ancho);}