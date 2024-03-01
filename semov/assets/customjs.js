/*Jquery personalizados*/

var utils = function () {
    var get_ajax = function (url = '',contentType, callback) {

        $.ajax({
            type: "GET",
            url: site_url + url,
            dataType: contentType,
            success: function (response) {
                if (typeof callback == 'function') {
                    callback(response);
                }

            }
        });
    }

    return { get_ajax }

 }

var utils = new utils();

var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    },
    decode: function(e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9+/=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = Base64._utf8_decode(t);
        return t
    },
    _utf8_encode: function(e) {
        e = e.replace(/rn/g, "n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    },
    _utf8_decode: function(e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }
}

$( window ).resize(function() {
    buttonAtencionC_fix();
});

jQuery(document).ready(function($) {

    $('#blogCarousel').carousel({
            interval: 5000
    });

    $('#ModalAvisos').modal('show');

    $(".btn-success").removeClass("btn-success").addClass("btn-default custom-buttom-noticias");
    $(".btn-default").removeClass("btn-default").addClass("btn-default custom-buttom-noticias");
    
    
    // Agrega a todos los link de transparencia el boton pu
    $(".box_transparencia  a").removeClass().addClass("btn btn-lg btn-default custom-buttom-noticias");

    





    buttonAtencionC_fix();
    $("#ScrollTop").draggable({ containment: "window" });

    var path = window.location.pathname.split('/');
    // if (path.length >= 4 ) {
    // 	var baseurl = window.location.origin+"/"+path[1];
    // }else{
    // 	var baseurl = window.location.origin;
    // }

    if (path.length >= 5) {
        var baseurl = window.location.origin + "/" + path[1] + "/" + path[2] + "/" + path[3];
    } else {
        var baseurl = window.location.origin + "/" + path[1] + "/" + path[2];
    }

    var portalunico  = "http://www.col.gob.mx/";

    //inicializa el carousel
    $(".carousel-inner > div:first-child").addClass("active");
    $(".carousel-item img").removeAttr("style");
    //Inicializa tabs
    $("#result_contendios").hide();
    $("#result_tramites").show();
    $("#result_tramites_linea").hide();

    $("ul#tabs-busqueda a").on('click', function(event) {
        event.preventDefault();
        var id = $(this).attr("href");
        if (id == "#result_contendios") {
            $("#result_tramites").hide();
            $("#result_tramites_linea").hide();
            $("#" + $(this).attr('id')).addClass('active');
            $("#tramites").removeClass('active');
            $("#tramite_linea").removeClass('active');
            $(id).show();

        } else if (id == "#result_tramites") {
            $("#result_contendios").hide();
            $("#result_tramites_linea").hide();
            $("#" + $(this).attr('id')).addClass('active');
            $("#Contenidos").removeClass('active');
            $("#tramite_linea").removeClass('active');
            $(id).show();
        } else {

            $("#result_contendios").hide();
            $("#result_tramites").hide();
            $("#" + $(this).attr('id')).addClass('active');
            $("#Contenidos").removeClass('active');
            $("#tramites").removeClass('active');
            $(id).show();
        }
    });

    $('#menu-home a').click(function(event) {
        event.preventDefault();
        var strAncla = $(this).attr('href'); //id del ancla
        $('html, body').stop().animate({
            scrollTop: $(strAncla).offset().top
        }, 1000);
    });




    $('.btn_destacados_portal_idx').on("click", function(e) {
        e.preventDefault();
        var id = $(this).data('id'); //id
        $(".container-destacados a").find('i').addClass('fa-external-link').removeClass('hover-pinkish-red');
        $(this).find('i').removeClass('fa-external-link').addClass('fa-chevron-right hover-pinkish-red');
        $(".container-destacados a").removeAttr('style');
        $(this).css('color', '#9b9b9b', 'important');

        $.ajax({
            url: site_url + "/Portal/ajax_destacados",
            data: {
                id_reg: id
            },
            dataType: "json",
            async: false,
            type: "post",
            beforeSend: function() {
                $(".lyr_detallep").html("");
                $(".lyr_detallep").append('<i class="fa fa-spinner fa-4x"> </i>');
            },
            success: function(datos) {

                var dominio = document.domain;
                var ruta = (datos.cuerpo_cont[0].descripcion);
                $(".lyr_destacados_idx").html("");
                var ruta_img = "";
                var my_html = '<div class="col-12 separador-padding-bottom-20">'
                $.each(datos.archivos.registros, function(key, value) {
                    if (value.nom_archivo.substr(-3) == 'jpg') {
                        ruta_img = value.id_archivo;
                    }

                });

                console.log(ruta);

                if (ruta != false) {

                    if ((ruta.indexOf(dominio) > -1) == false && (ruta).substr(0, 1) != '#') {

                        console.log(ruta);



                        my_html += '<a class="cursor" onclick="SaliendoPortal(' + "'" + datos.cuerpo_cont[0].descripcion + "'" + ')">\n\
                       <img class="img-fluid"  src="'+portalunico+'imagenv2.php?x=' + Base64.encode(ruta_img) + '&amp;y=23&amp;z=1" border="0" alt="" />\n\
                       </div>';
                    } else {
                        my_html += '<a class="cursor" target="_self" href="' + datos.cuerpo_cont[0].descripcion + '">\n\
                       <img class="img-fluid" src="'+portalunico+'imagenv2.php?x=' + Base64.encode(ruta_img) + '&amp;y=23&amp;z=1" border="0" alt="" />\n\
                       </a>';
                    }
                } else {
                    my_html += '<img class="img-fluid"  src="'+portalunico+'imagenv2.php?x=' + Base64.encode(ruta_img) + '&amp;y=23&amp;z=1" border="0" alt="" />'
                }
                my_html += '<div class="col-12 text-center ">\n\
			<h3>' + datos.cuerpo_cont[0].titulo + '</h3>\n\
			</div></a>';
                $(".lyr_destacados_idx").append(my_html);
                /*$(".lyr_destacados_idx").html("");
                var my_html = '<div class="col-12 separador-padding-bottom-20">' +datos.cuerpo_cont[0].cuerpo_cont +'</div><div class="col-12 text-center "><h3>'+datos.cuerpo_cont[0].titulo +'</h4></div>';
                $(".lyr_destacados_idx").append(my_html);*/
            }
        });

    });


    $("#DetalleTramite a").click(function(event) {
        var Icon = $(this).children()[1];
        if ($(Icon).hasClass('fa-chevron-down')) {
            $(Icon).removeClass('fa-chevron-down');
            $(Icon).addClass('fa-chevron-down');
        } else {
            $(Icon).removeClass('fa-chevron-down');
            $(Icon).addClass('fa-chevron-down');
        }
    });

    //Check to see if the window is top if not then display button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    //Click event to scroll to top
    $('.scrollToTop').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    setTimeout(function() {
        $('.gsc-option-menu div:first div').text('Relevancia');
        $('.gsc-option-menu div:eq(2) div').text('Fecha');
        $('.gsc-selected-option-container .gsc-selected-option').text('Selecciona');
    }, 600);
    $("#table-tramites").hide("");

    $("#btn-busqueda-retys").on('click', function() {
        $("#frmBusquedaRetys").validate({
            submitHandler: function() {
                if ($("#inputBusquedaRetys").val() != "" && $("#inputBusquedaRetys").val().length >= 3) {
                    $.ajax({
                        url: site_url + '/Portal/busquedaTramitesRetys_table',
                        data: $("#frmBusquedaRetys").serialize(),
                        async: false,
                        dataType: "json",
                        type: "post",
                        beforeSend: function() {
                            $("#ContentTramiteEnLinea").hide();
                            $("#ContentTramitePresencial").hide();
                            //$("#cutomDivmsg").append('<i class="fa fa-spinner fa-4x"> </i>');
                            $("#table-tramites").show("");
                            $("#msjbusquelinea2").hide();
                            $("#msjbusquelinea2").html("");
                        },
                        success: function(response) {
                            var Hash = response.CSRF_Hash;
                            $("#frmBusquedaRetys #" + response.CSRF_Name).val(Hash);

                            if (response.status != "Error") {
                                $("#resultadoBusqueda").show();
                                $("#inputBusquedaRetys").val(response.textbuscador);
                                $("#table-tramites tbody").html(response.html);
                                $("#resultadoBusqueda .msg-busqueda-tramite").removeClass("alert-danger").text("");

                            } else {
                                $("#resultadoBusqueda").show();
                                $("#inputBusquedaRetys").val(response.textbuscador);
                                showMessage_busqueda(response.msg);

                            }
                        },
                        complete: function() {}
                    });
                } else {
                    //esconderTablaTramite();
                    $("#inputBusquedaRetys").val('');
                    $("#msjbusquelinea2").show();
                    $("#msjbusquelinea2").html("Favor de digitar al menos 3 caracteres");
                }
            }
        });
    });

    $("#btn-busqueda-linea").on('click', function() {

        $("#frmBusquedaLinea").validate({
            submitHandler: function() {
                if ($("#inputBusquedalinea").val() != "" && $("#inputBusquedalinea").val().length >= 3) {
                    $.ajax({
                        url: site_url + '/Portal/busquedaTramiteLinea',
                        type: 'POST',
                        async: false,
                        dataType: "json",
                        data: $("#frmBusquedaLinea").serialize(),
                        beforeSend: function() {
                            esconderTablaTramite();
                            $("#msjbusquelinea").hide();
                            $("#msjbusquelinea").html("");

                        },
                        success: function(response) {
                            var Hash = response.CSRF_Hash;
                            $("#frmBusquedaLinea #" + response.CSRF_Name).val(Hash);

                            if (response.status != "Error") {
                                $("#resultadoBusqueda").show();
                                $("#inputBusquedaRetys").val("");
                                $("#inputBusquedalinea").val(response.textbuscador);
                                $("#table-tramites tbody").html(response.html);
                                $("#resultadoBusqueda .msg-busqueda-tramite").removeClass("alert-danger").text("");
                            } else {
                                $("#inputBusquedalinea").val(response.textbuscador);
                                $("#resultadoBusqueda").show();
                                showMessage_busqueda(response.msg);
                            }
                        }
                    });
                } else {
                    $("#msjbusquelinea").show();
                    // $("#msjbusquelinea").html("Campo requerido");
                    $("#msjbusquelinea").html("Favor de digitar al menos 3 caracteres");

                }
            }
        });

        var li = $(".nav-pills>li:not(.disabled)");
        $(li).click(function() {
            $(li).each(function() {
                $(this)[0].className = ""; // Deactivate all <li>
                $(".well").hide();
            });
            $(this)[0].className = "active";
            $(".well[data-id=" + $(this).data("target-id") + "]").show('slow');
        });
        //steps

    });


    function esconderTablaTramite() {
        $("#ContentTramiteEnLinea").hide();
        $("#ContentTramitePresencial").hide();
        $("#cutomDivmsg").append('<i class="fa fa-spinner fa-4x"> </i>');
        $("#table-tramites").show("");
    }

    function showMessage_busqueda(msg) {
        $("#resultadoBusqueda .msg-busqueda-tramite").addClass("alert-danger").text(msg);
        $("#table-tramites tbody").html("");
    }


    $("#BGP1").removeClass("Fill-1");
    $("#BGP2").removeClass("Fill-2");
    $("#BGP1").addClass("Fill-3");
    $("#BGP2").addClass("Fill-4");
    $("#BGL1").removeClass("Fill-3");
    $("#BGL2").removeClass("Fill-4");
    $("#BGL1").addClass("Fill-1");
    $("#BGL2").addClass("Fill-2");


    $(".btn-opds").on('click', function(e) {
        e.preventDefault();
        var id_cont = $(this).data("cont");

        var boton = $(this);
        $(".circulo").css("color", "#272829");
        $(".titulo-sec-gobierno").css("color", "#272829");
        $(".subtitulo-circulo-pu").css("color", "#272829");
        $(".circulo").css("border-color", "#272829");

        $(".circulo").removeClass("color-red");
        $(".subtitulo-circulo-pu").removeClass("color-red");
        $(".btn-opds").removeClass("color-red");



        $.ajax({
            url: site_url + '/Portal/contenido_ajax',
            type: 'POST',
            async: false,
            dataType: "json",
            data: {
                id_reg: id_cont
            },
            beforeSend: function() {
                $("#lyr_gobierno").html('');
                var code_html = '<i class="fa fa-spinner fa-4x"></i>';
                $("#lyr_gobierno").html(code_html);

            },
            success: function(response) {
                if (response.status == 1) {

                    //setTimeout(function(){
                    //console.log(response.code_html);
                    boton.find('span').css("color", "#ed1c24");
                    boton.css("border-color", "#ed1c24");
                    boton.parent().parent().eq(0).css("border-color", "#ed1c24");
                    boton.parent().parent().eq(0).find('div').css("color", "#ed1c24");
                    //}, 100);
                    $("#lyr_gobierno").html('');
                    $("#lyr_gobierno").html(response.code_html);

                } else {
                    $("#lyr_gobierno").html('');
                    $("#lyr_gobierno").html(response.status);
                }
            },
            complete: function() {
                $('.cursor.seldep').css('color', '#4A4A4A');
            }
        });

        //$("#lyr_gobierno").html('');

    });

    $(".btn-legislativo").on('click', function(e) {
        e.preventDefault();
        var id_cont = $(this).data("cont");

        var boton = $(this);
        $(".circulo").css("color", "#272829");
        $(".titulo-sec-gobierno").css("color", "#272829");
        $(".subtitulo-circulo-pu").css("color", "#272829");
        $(".circulo").css("border-color", "#272829");

        $.ajax({
            url: site_url + '/Portal/contenido_ajax',
            type: 'POST',
            async: false,
            dataType: "json",
            data: {
                id_reg: id_cont
            },
            beforeSend: function() {
                $("#lyr_legislativo").html('');
                var code_html = '<i class="fa fa-spinner fa-4x"></i>';
                $("#lyr_legislativo").html(code_html);

            },
            success: function(response) {
                if (response.status == 1) {

                    //setTimeout(function(){
                    //console.log(response.code_html);
                    boton.find('span').css("color", "#ed1c24");
                    boton.css("border-color", "#ed1c24");
                    boton.parent().parent().eq(0).css("border-color", "#ed1c24");
                    boton.parent().parent().eq(0).find('div').css("color", "#ed1c24");
                    //}, 100);
                    $("#lyr_legislativo").html('');
                    $("#lyr_legislativo").html(response.code_html);

                } else {
                    $("#lyr_legislativo").html('');
                    $("#lyr_legislativo").html(response.status);
                }
            },
            complete: function() {
                $('.cursor.seldep').css('color', '#4A4A4A');
            }
        });

    });

    $(".btn-judicial").on('click', function(e) {
        e.preventDefault();
        var id_cont = $(this).data("cont");

        var boton = $(this);
        $(".circulo").css("color", "#272829");
        $(".titulo-sec-gobierno").css("color", "#272829");
        $(".subtitulo-circulo-pu").css("color", "#272829");
        $(".circulo").css("border-color", "#272829");

        $.ajax({
            url: site_url + '/Portal/contenido_ajax',
            type: 'POST',
            async: false,
            dataType: "json",
            data: {
                id_reg: id_cont
            },
            beforeSend: function() {
                $("#lyr_judicial").html('');
                var code_html = '<i class="fa fa-spinner fa-4x"></i>';
                $("#lyr_judicial").html(code_html);

            },
            success: function(response) {
                if (response.status == 1) {

                    //setTimeout(function(){
                    //console.log(response.code_html);
                    boton.find('span').css("color", "#ed1c24");
                    boton.css("border-color", "#ed1c24");
                    boton.parent().parent().eq(0).css("border-color", "#ed1c24");
                    boton.parent().parent().eq(0).find('div').css("color", "#ed1c24");
                    //}, 100);
                    $("#lyr_judicial").html('');
                    $("#lyr_judicial").html(response.code_html);

                } else {
                    $("#lyr_judicial").html('');
                    $("#lyr_judicial").html(response.status);
                }
            },
            complete: function() {
                $('.cursor.seldep').css('color', '#4A4A4A');
            }
        });

    });

    // $("#btn-enviar").hide();
    // $("#btn-imprimir").hide();
    $(".btn-float").on('click', function() {

        if (!$(".btn-float").hasClass("active")) {
            $("#btn-enviar").show();
            $("#btn-imprimir").show();
            $(this).addClass('active');
        } else {
            $("#btn-enviar").hide();
            $("#btn-imprimir").hide();
            $(this).removeClass('active');
        }


        // if( $("div.btn-float.active").hasClass("active")){
        // 	$("#btn-enviar").hide();
        // 	$("#btn-imprimir").hide();
        // }

    });

    $(".btn-gobmx").on('click', function(e) {
        e.preventDefault();
        var id_cont = $(this).data("cont");

        var boton = $(this);
        $(".circulo").css("color", "#272829");
        $(".titulo-sec-gobierno").css("color", "#272829");
        $(".subtitulo-circulo-pu").css("color", "#272829");
        $(".circulo").css("border-color", "#272829");

        $.ajax({
            url: site_url + '/Portal/contenido_ajax',
            type: 'POST',
            async: false,
            dataType: "json",
            data: {
                id_reg: id_cont
            },
            beforeSend: function() {
                $("#lyr_federal").html('');
                var code_html = '<i class="fa fa-spinner fa-4x"></i>';
                $("#lyr_federal").html(code_html);

            },
            success: function(response) {
                if (response.status == 1) {

                    //setTimeout(function(){
                    //console.log(response.code_html);
                    boton.find('span').css("color", "#ed1c24");
                    boton.css("border-color", "#ed1c24");
                    boton.parent().parent().eq(0).css("border-color", "#ed1c24");
                    boton.parent().parent().eq(0).find('div').css("color", "#ed1c24");
                    //}, 100);
                    $("#lyr_federal").html('');
                    $("#lyr_federal").html(response.code_html);

                } else {
                    $("#lyr_federal").html('');
                    $("#lyr_federal").html(response.status);
                }
            },
            complete: function() {
                $('.cursor.seldep').css('color', '#4A4A4A');
            }
        });

    });


});

function SaliendoPortal(liga) {
    // redireccionPortal(liga);
    window.open(liga,'_blank');
}

$('#inputbusquedageneral').keypress(function(e) {
    var key = e.which;
    if (key == 13) {
        busquedageneral();
        return false;
    } else {
        return true;
    }
});

var elemento = $("#tabscontainer > .tabs-consulta");
$("#Itemscontainer > div").hide();
$("#Itemscontainer > div:first-child").show();
$("#tabscontainer > div:first-child").addClass('active-tab');

$(elemento).on('click', function(event) {
    var id = $(this).attr('id');
    var elem = $("#Itemscontainer > ."+id);
    $("#tabscontainer > div").removeClass('active-tab');
    $(this).addClass('active-tab');

    if (elem.hasClass(id)) {
        $("#Itemscontainer > div").hide();
        $("."+id).show();
    }
});

function busquedageneral() {
    $('#result-busqueda-general').fadeOut('fast', function() {
        $("img#loadingbusqueda").fadeIn('fast', function() {

            if ($("#inputbusquedageneral").val() != "" && $("#inputbusquedageneral").val().length >= 3) {
                $.ajax({
                    url: site_url + '/Portal/busquedaGeneral',
                    type: 'POST',
                    async: false,
                    dataType: "json",
                    data: $("#frmBusquedaGeneral").serialize(),
                    beforeSend: function() {
                        $("#customDivmsg").removeClass("alert-danger");
                        $("#customDivmsg").html("");
                        $("#result-busqueda-general").html("");

                    },
                    success: function(response) {
                        var Hash = response.CSRF_Hash;
                        $("#" + response.CSRF_Name).val(Hash);

                        if (response.status != "Error") {
                            var contenido = Base64.decode(response.html);
                            //var textbuscador = response.textbuscador;

                            //var res = contenido.replace('/licencia/gi', function myFunction(x){return x.addStyle("color",red); });
                            $("#result-busqueda-general").html((contenido));
                            num = $("table tr.mostrada").length;
                            var total = num + 10;
                            $("table tr").each(function(index) {
                                if (index > total) {
                                    // $("table tr").eq(index).hide();
                                    $("table#busquedaTramite tr").eq(index).hide();
                                    $("table#tablabusquedaGeneral tr").eq(index).hide();
                                    $("table#busquedaTramiteLinea tr").eq(index).hide();
                                    $("table#busquedaMicrositio tr").eq(index).hide();
                                } else {
                                    // $("table tr").eq(index).show();
                                    //$("table tr").eq(index).addClass("mostrada");
                                    $("table#busquedaTramite tr").eq(index).show().addClass('mostrada');
                                    $("table#tablabusquedaGeneral tr").eq(index).show().addClass('mostrada');
                                    $("table#busquedaTramiteLinea tr").eq(index).show().addClass('mostrada');
                                    $("table#busquedaMicrositio tr").eq(index).show().addClass('mostrada');

                                    var countmostrar = $("table tr.mostrada").length;
                                    if (countmostrar < total) {
                                        $(".btnBusque").hide();
                                    } else {
                                        $(".btnBusque").show();
                                    }
                                }
                            });
                        } else {
                            $("#customDivmsg").addClass("alert-danger");
                            $("#customDivmsg").html(response.msg);
                        }
                    },
                    complete: function(response) {
                        $("img#loadingbusqueda").fadeOut('fast', function() {
                            $('#result-busqueda-general').fadeIn('slow');
                        });

                    },
                    error: function(e) {
                        console.log(e);
                    }
                });
            } else {
                $("img#loadingbusqueda").fadeOut("slow");
                $("#msjbusquelinea").show();
                $("#customDivmsg").addClass("alert-danger");
                $("#customDivmsg").html("Favor de digitar al menos 3 caracteres");


            }
        });

    });
}

function fixedEncodeURIComponent(str) {
    return decodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
}

function ImprimeReporte(Tramite) {
    $("#IdTramite").val(Tramite);
    $("#formReporte").submit();
}

function EnviaMensaje(Tramite) {
    var Parameters = {
        'Tramite': Tramite
    }
    $.ajax({
            type: "POST",
            url: site_url + '/Portal/vContacto',
            dataType: "html",
            data: Parameters,
            beforeSend: function() {}
        })
        .done(function(html) {
            $("#Modal").html(html);
            $("#Modal").modal({
                keyboard: false,
                backdrop: 'static'
            });
        });
}

function llamar(arg) {
    window.open('tel:' + arg);
}

(function($) {
    $.get = function(key) {
        key = key.replace(/[\[]/, '\\[');
        key = key.replace(/[\]]/, '\\]');
        var pattern = "[\\?&]" + key + "=([^&#]*)";
        var regex = new RegExp(pattern);
        var url = unescape(decodeURIComponent(window.location.href + '').replace(/\+/g, '%20'));
        var results = regex.exec(url);
        if (results === null) {
            return null;
        } else {
            return results[1];
        }
    }
})(jQuery);


function buttonAtencionC_fix(){
    if($(window).width() < 977 && $(window).width() > 552 ){
        $("#btn_respFix").removeClass().addClass("col-md-8")
    }else{
        $("#btn_respFix").removeClass().addClass("col-md-4")
    }
}

function ajaxCrearContenido(idCont)
{

    $("div#loading-img").removeClass('hide');
    $("#lyr_hospitales").html("");
    var url = "/salud/getHospitalesAjax/" + idCont;
    utils.get_ajax(url,'html',function (response) {
        setTimeout(function () {
            $("div#loading-img").addClass('hide');
            $("#lyr_hospitales").html("");
            $("#lyr_hospitales").html(response);

        });
    });
 }
