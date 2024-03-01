$.fn.getType = function(){ return this[0].tagName == "INPUT" ? this[0].type.toLowerCase() : this[0].tagName.toLowerCase(); }

var modo = false;
var donde = $('body');
var currFFZoom = 1;
var currIEZoom = 100;

var myVar_set_time_interval = null;

var ctrlDown = false,
        ctrlKey = 17,
        cmdKey = 91,
        fKey = 81;
    var u_key = 38,
        d_key = 40,
        l_key = 39,
        r_key = 37;




let setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

let getCookie = name => {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

function ActivaModoNocturno() {
	setCookie("set_cookie_pantalla_contraste", "1", 30);
	$('body').addClass('oscuro');
	$('div#pantalla_mod span').html('Sin contraste');
	$('div#pantalla_mod').attr('onclick','ActivaModoNormal()');
}

function ActivaModoNormal() {
	setCookie("set_cookie_pantalla_contraste", "0", 30);
	$('body').removeClass('oscuro');
	$('div#pantalla_mod span').html('Alto contraste');
	$('div#pantalla_mod').attr('onclick','ActivaModoNocturno()');
}

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

function AmpliarImagen() {
    $(".img-fluid").hover(
        function() {
            $(this).addClass('transition');
        },
        function() {
            $(this).removeClass('transition');
        }
    );
}

function DisminuirImagen() {
    $('.img-fluid').hover(function() {
        $(this).removeClass('transition');
    });
}

function ActivaModoRestablecer(){
	ActivaModoNormal();
	
	
	
	if (bowser.name == 'Firefox') {
		currFFZoom = 1;
		
		setCookie("set_cookie_pantalla_letra", currFFZoom, 30);
		jQuery('body').css('MozTransform', 'scale(' + currFFZoom + ',' + currFFZoom + ')');
		jQuery('body').css('transform-origin', '0 0');
	} else {
		currFFZoom = 100;
		setCookie("set_cookie_pantalla_letra", currFFZoom, 30);
		$('body').css('zoom', ' ' + currFFZoom + '%');
	}
	
	
}




class _app_visuales {
  
	currFFZoom = 1;
	currIEZoom = 100;
	currZoom = 1;
	
	columna_busqueda = 0;
	columna_busqueda2 = 0;
	ultimo_texto = '';
	
	disabledPlay = false;
	voice = null;
    jarvis = null;
	
	
	constructor () {
		var currZoom = (getCookie("set_cookie_pantalla_letra") == null)? ((bowser.name == 'Firefox')? currFFZoom : currIEZoom) : parseFloat(getCookie("set_cookie_pantalla_letra"));
		this.currZoom = currZoom;
		setCookie("set_cookie_pantalla_letra", currZoom, 30);
		
		setTimeout(function(){
			if(getCookie("set_cookie_pantalla_visuales") == "1"){
				app_visuales.mostrarVisuales();
			}
			
			if(getCookie("set_cookie_pantalla_contraste") == '1'){
				ActivaModoNocturno();
			}
			
			app_visuales.actualizar_tamanio_letra();
			
		},700)
	}
	
	step_letra() {
		return (bowser.name == 'Firefox')? 0.02 : 2;
	}
	actualizar_tamanio_letra () {
		//this.currZoom = getCookie("set_cookie_pantalla_letra");
		if (bowser.name == 'Firefox') {
			if(this.currZoom < 0.7){
				this.currZoom = 0.7;
			}
			
			if(this.currZoom > 1.5){
				this.currZoom = 1.5;
			}
			
			setCookie("set_cookie_pantalla_letra", this.currZoom, 30);
			jQuery('body').css('MozTransform', 'scale(' + this.currZoom + ',' + this.currZoom + ')');
			jQuery('body').css('transform-origin', '0 0');
		} else {
			if(this.currZoom < 70){
				this.currZoom = 70;
			}
			
			if(this.currZoom > 150){
				this.currZoom = 150;
			}
			
			setCookie("set_cookie_pantalla_letra", this.currZoom, 30);
			$('body').css('zoom', ' ' + this.currZoom + '%');
		}
	}
	
	ocultarVisuales() {
		$('.border_resaltar').removeClass('border_resaltar');
		setCookie("set_cookie_pantalla_visuales", "0", 30);
		 setCookie("set_cookie_pantalla_narrador", '0', 30);
		 app_visuales.disabledPlay = false;
		 $('div#estado_narrador span').html('Narrador (Desactivado)');
			  $('div#estado_narrador i').removeClass('fa-play').addClass('fa-pause');
		
		$("#navbar_visuales").hide();
		$("#GobNavbar").css('top', '0px');
		$("#GobNavbar").css('margin-bottom', '0px');
		$("#mostrar_visuales").attr("onclick", null);
		$("#mostrar_visuales").attr('onclick', 'app_visuales.mostrarVisuales()');
		$("#mostrar_visuales").addClass('fa-universal-access');
		$("#mostrar_visuales").removeClass('fa-arrow-circle-up');
	}
	
	mostrarVisuales() {
	
		setCookie("set_cookie_pantalla_visuales", "1", 30);
		
		$("#navbar_visuales").show();
		$("#GobNavbar").css('top', '100px');
		$("#GobNavbar").css('margin-bottom', '100px');
		$("#mostrar_visuales").attr("onclick", null);
		$("#mostrar_visuales").attr('onclick', 'app_visuales.ocultarVisuales()');
		$("#mostrar_visuales").removeClass('fa-universal-access');
		$("#mostrar_visuales").addClass('fa-arrow-circle-up');
		
	}
	
	ubicar_posicion(tipo){
		if( app_visuales.columna_busqueda >= 0 ){
          //var dom = $('h1 , section , p, span, div.category').eq( app_visuales.columna_busqueda);
		  var dom_busqueda = 'div.container h1 ,main div.container section ,main div.container p,main div.container span,  div.sec_tramites a, div.container-destacados a, ul.lyr-deptransparencia a';
		  var dom = $(dom_busqueda).eq( app_visuales.columna_busqueda);
          
          //console.info(app_visuales.columna_busqueda);
          //console.info( dom.length );
          $('.border_resaltar').removeClass('border_resaltar');
          
          //console.log($.trim( dom.text() ));
		  
		  
		  
		  if($.trim(dom.text()).length > 1){
			  
			  dom.addClass('border_resaltar');
			  
			  if(app_visuales.ultimo_texto != ''){
				app_visuales.pauseVoice();
				app_visuales.stopVoice();
			  }
			
				//if(app_visuales.columna_busqueda > 0){
					//console.log(app_visuales.columna_busqueda);
					$('html, body').animate({
						scrollTop: ($(".border_resaltar").offset().top - ((bowser.name == 'Firefox')? 200 : 400))
					}, 100);
				//}
				
				var texto = $.trim(dom.text());
				
				if($(".border_resaltar").getType() == "a"){
					if( $.trim( $(".border_resaltar").attr("href") ).length > 0 && validateUrl( $(".border_resaltar").attr("href") ) ){
						texto = 'Opcion '+texto;
					}
					
				}
				app_visuales.playVoice( texto );
 
		  }else{
			  
			  var parar = false;
			  var linea_origen = app_visuales.columna_busqueda;
			  for (var i = 0; i < 20; i++) {
				  if(parar == false){
					  if(tipo == 'u_key'){
						  linea_origen--;
					  }else{
						  linea_origen++;
					  }
					  var dom = $(dom_busqueda).eq( linea_origen );
					  if($.trim(dom.text()).length > 1){
						  parar = true;
						  app_visuales.columna_busqueda = linea_origen;
						  app_visuales.ubicar_posicion(tipo);
					  }
				  }
			  }
			  
		  }
        }
	}
	
	ubicar_posicion_menu(){
		if( app_visuales.columna_busqueda2 >= 0 ){
          //var dom = $('h1 , section , p, span, div.category').eq( app_visuales.columna_busqueda);
		  var dom = $('nav a').eq( app_visuales.columna_busqueda2);
          
          //console.info(app_visuales.columna_busqueda);
          //console.info( dom.length );
          $('.border_resaltar').removeClass('border_resaltar');
          dom.addClass('border_resaltar');
          //console.log($.trim( dom.text() ));
		  
		  app_visuales.pauseVoice();
			app_visuales.stopVoice();
		  
		  if($.trim(dom.text()).length > 4){
			  
			  $('html, body').animate({
					scrollTop: ($(".border_resaltar").offset().top - ((bowser.name == 'Firefox')? 200 : 400))
				}, 100);
					
			app_visuales.playVoice( $.trim(dom.text()) );
		  }
        }
	}
	
	activar_narrador(){
		if (!'speechSynthesis' in window) {
			//alert('navegador no soportado');
			return false; 
		}else{
			this.voice = new SpeechSynthesisUtterance();
			this.jarvis = window.speechSynthesis;
			
			return true;
		}
	}
	
	
	playVoice(text){
      // Reproduce la voz
	  if(this.ultimo_texto != text){
		  this.ultimo_texto = text;
		  this.voice.text = text;
		  try {
			this.jarvis.speak(this.voice);
		  } catch (error) {
			  //console.log(error);
		  }
		  
	  }
    }
  
    stopVoice(){
      // Cancela la reproducción de la voz
      this.jarvis.cancel()
    }
	
	playingVoice(){
      // Cancela la reproducción de la voz
      return this.jarvis.speaking;
    }
	
	pauseVoice(){
      // Pausa la reproducción de la voz
      this.jarvis.resume();
    }
	
	getVoices() {
      this.voice.lang = this.selectedOptions?.[0]?.dataset.language || 'es-MX';
    };
  
	
}

const app_visuales = new _app_visuales();

$(function(){
	
	
	if ($("#navbar_visuales").length > 0) {
        $("#navbarNavDropdown .navbar-nav").append("<i id='mostrar_visuales' title='Mostrar herramientas de Accesibilidad Web' onclick='app_visuales.mostrarVisuales()' class='fa fa-universal-access fa-2x text-white ml-3 mt-2'></i>");
    }
	
	
	if(getCookie("set_cookie_pantalla_narrador") == "1"){
		app_visuales.mostrarVisuales();
		app_visuales.disabledPlay = true;
		$('div#estado_narrador span').html('Narrador (Cargando)');
		$('div#estado_narrador i').removeClass('fa-pause').removeClass('fa-play').addClass('fa-cog').addClass('fa-spin');
		
		//app_visuales.playVoice('Narrador (Activado)');
		setTimeout(function(){
			
			$('div#estado_narrador i').removeClass('fa-cog').removeClass('fa-spin').addClass('fa-play');
			$('div#estado_narrador span').html('Narrador (Activado)');
			
			app_visuales.ultimo_texto = '';
			app_visuales.ubicar_posicion('d_key');
			console.log('intento 1');
			setTimeout(function(){
				if(app_visuales.playingVoice() == false){
					app_visuales.ultimo_texto = '';
					app_visuales.columna_busqueda = -1;
					$('.border_resaltar').removeClass('border_resaltar');
				}
			},500);
		},2000);
	}
	
	
	
	$(document).keydown(function(e) {
        if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
    }).keyup(function(e) {
        if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = false;
    });
	$(document).keydown(function(e) {
        if (ctrlDown && (e.keyCode == fKey)){
			
			if(getCookie("set_cookie_pantalla_narrador") == "1"){
				//app_visuales.ocultarVisuales()
				
				app_visuales.pauseVoice();
				app_visuales.stopVoice();
				$('.border_resaltar').removeClass('border_resaltar');
			
			  $('div#estado_narrador span').html('Narrador (Desactivado)');
			  $('div#estado_narrador i').removeClass('fa-play').addClass('fa-pause');
			  //console.log('fa-play');
			  app_visuales.disabledPlay = false;
			  app_visuales.playVoice('Narrador (Desactivado)');
			  setCookie("set_cookie_pantalla_narrador", '0', 30);
			  
			}else{
				app_visuales.mostrarVisuales();
				
				$('div#estado_narrador span').html('Narrador (Activado)');
				$('div#estado_narrador i').removeClass('fa-pause').addClass('fa-play');

				app_visuales.disabledPlay = true;
				setCookie("set_cookie_pantalla_narrador", '1', 30);
				app_visuales.pauseVoice();
				app_visuales.stopVoice();
				app_visuales.columna_busqueda = '';
				
				var texto = 'Narrador (Activado) '
				texto += 'Presiona las teclas control y q para activar o desactivar el narrador. '
				texto += 'Presiona las teclas izquierda y derecha para navegar por el menú. '
				texto += 'Presiona las teclas arriba y abajo para navegar por el contenido de la pagina. '
				app_visuales.playVoice(texto);
			}
        }else{
			if(getCookie("set_cookie_pantalla_narrador") == "1"){
				switch (e.keyCode) {
					case d_key:
					  app_visuales.columna_busqueda++;
					  app_visuales.ubicar_posicion('d_key');
					  break;

					case u_key:
					  app_visuales.columna_busqueda--;
					  if(app_visuales.columna_busqueda < 0){
						  app_visuales.columna_busqueda = 0;
					  }
					  app_visuales.ubicar_posicion('u_key');
					  break;
					  
					  
					 case l_key:
					  app_visuales.columna_busqueda2++;
					  app_visuales.ubicar_posicion_menu();
					  break;

					case r_key:
					  app_visuales.columna_busqueda2--;
					  if(app_visuales.columna_busqueda2 < 0){
						  app_visuales.columna_busqueda2 = 0;
					  }
					  app_visuales.ubicar_posicion_menu();
					  break;
					
					case 27:
						app_visuales.pauseVoice();
						app_visuales.stopVoice();
					  break;
					  
					case 13:
						if($(".border_resaltar").getType() == "a"){
							if( $.trim( $(".border_resaltar").attr("href") ).length > 0 && validateUrl( $(".border_resaltar").attr("href") ) ){
								window.location.href = $(".border_resaltar").attr("href");
							}
							
						}
					  break;
				}
				
			}
		}
	});


	$(".aumentarFont").click(function() {
		var step = app_visuales.step_letra();
		app_visuales.currZoom = app_visuales.currZoom + step;
		//console.log(app_visuales.currZoom);
		app_visuales.actualizar_tamanio_letra();
	});
	$(".disminuirFont").click(function() {
		var step = app_visuales.step_letra();
		app_visuales.currZoom = app_visuales.currZoom - step;
		//console.log(app_visuales.currZoom);
		app_visuales.actualizar_tamanio_letra();
	});
	
	
	if(app_visuales.activar_narrador()){
		
		const estado_narrador = document.querySelector('#estado_narrador');
		app_visuales.jarvis.onvoiceschanged = app_visuales.getVoices();
		
		estado_narrador.addEventListener('click', () => {
		  if(app_visuales.disabledPlay == true){
			  
			app_visuales.pauseVoice();
			app_visuales.stopVoice();
			
			  $('div#estado_narrador span').html('Narrador (Desactivado)');
			  $('div#estado_narrador i').removeClass('fa-play').addClass('fa-pause');
			  app_visuales.disabledPlay = false;
			  setCookie("set_cookie_pantalla_narrador", '0', 30);
		  }else{
			$('div#estado_narrador span').html('Narrador (Activado)');
			$('div#estado_narrador i').removeClass('fa-pause').addClass('fa-play');
			//console.log('fa-play 2');

			app_visuales.disabledPlay = true;
			setCookie("set_cookie_pantalla_narrador", '1', 30);
			app_visuales.pauseVoice();
			app_visuales.stopVoice();
			app_visuales.columna_busqueda = -1;
			
			app_visuales.ultimo_texto = '';
			$('.border_resaltar').removeClass('border_resaltar');
			
			var texto = 'Narrador (Activado) '
			texto += 'Presiona las teclas control y q para activar o desactivar el narrador. '
			texto += 'Presiona las teclas izquierda y derecha para navegar por el menú. '
			texto += 'Presiona las teclas arriba y abajo para navegar por el contenido de la pagina. '
			app_visuales.playVoice(texto);
			
			
		  }
		  
		});
	}
	
	
	
	const checkTabPress = function(e) {
        'use strict';
        var ele = document.activeElement;

        if (e.keyCode === 9 && ele.nodeName.toLowerCase() === 'a') {
            app_visuales.pauseVoice();
            app_visuales.stopVoice();
            if($.trim($(ele).text()).length > 0){
				if(app_visuales.disabledPlay == true){
					app_visuales.playVoice( $.trim($(ele).text()) );
				}
            }
        }
    }
    document.addEventListener('keyup', function (e) {
        checkTabPress(e);
    }, false);
	
	
	
	
	
	var detectar_es_visible = function(){
		
		
		var hidden = "hidden";
		// Standards:
		if (hidden in document) document.addEventListener("visibilitychange", onchange);
		else if ((hidden = "mozHidden") in document) document.addEventListener("mozvisibilitychange", onchange);
		else if ((hidden = "webkitHidden") in document) document.addEventListener("webkitvisibilitychange", onchange);
		else if ((hidden = "msHidden") in document) document.addEventListener("msvisibilitychange", onchange);
		// IE 9 and lower:
		else if ("onfocusin" in document) document.onfocusin = document.onfocusout = onchange;
		// All others:
		else window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;

		function onchange (evt) {
			var v = "visible", h = "hidden", evtMap = { focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h };
			evt = evt || window.event;
			if (evt.type in evtMap){
				document.body.className = evtMap[evt.type];
			}else{
				app_visuales.pauseVoice();
				app_visuales.stopVoice();
				document.body.className = this[hidden] ? "hidden" : "visible";
			}
		  }
		  
		myVar_set_time_interval = setTimeout(function(){ detectar_es_visible(); }, 2500);
	};
	
	setTimeout(function(){
			detectar_es_visible();
	},2500);
});