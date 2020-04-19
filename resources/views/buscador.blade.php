<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Consulta Reniec</title>

    <!-- Styles -->
    <link href="/css/bootstrap.css" rel="stylesheet">
    <script src="/vendors/jquery/dist/jquery.min.js"></script>
   
</head>
<body>
    <div id="app"></div>
    <div>
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
   

                <div class="collapse navbar-collapse" id="app-navbar-collapse">
                    <!-- Left Side Of Navbar -->
                    <ul class="nav navbar-nav">
                        &nbsp;
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="nav navbar-nav navbar-right">
                        <!-- Authentication Links -->
                        @if (Auth::guest())
                        <!--
                            <li><a href="{{ route('login') }}">Login</a></li>
                            <li><a href="{{ route('register') }}">Register</a></li>
                        -->
                        @else
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    {{ Auth::user()->name }} 
                                </a>
                            </li>
                        @endif
                    </ul>
                </div>
            </div>
        </nav>

        <div class="">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading  " style="background-color: #0E4174 !important;color: #FBF8F8;">
                <b>CITE Pesquero Amazonico Pucallpa</b>
                <b>CONSULTA RENIEC</b>
                </div>

                <div class="panel-body">
                    <form class="form-horizontal">
                        {{ csrf_field() }}

                        <div class="form-group">
                          

                            <div class="col-md-1" >
                                <img src="img/reniec.jpg" width="100" height="45">
                                
                            </div>
                                <label for="email" class="col-md-2 control-label">NUMERO DNI:</label>
                             <div class="col-md-4" >
                               
                                <input class="form-control" type="text" id="dni"  name="dni" value="" placeholder="Escribe DNI"> 
                                </input>
                                
                            </div>
                            <div class="col-md-3">
                                <button type="button" class="btn btn-primary" id="btnbuscar">
                                <i class="fa fa-search"></i> Buscar
                                </button>
                            </div>
                        </div>
                        <div class="alert alert-info" id="cargando">Cargando...</div>
                        <div class="form-group">
                            <div class="col-md-3"></div>
                            <div class="col-md-5">
                                <small id="mensaje" style="color: red;display: none;font-size: 13pt;" > 
                                    <i class="fa fa-remove"></i> El numero de DNI no es valido. 
                                </small>
                            </div>                            
                        </div>


                        <hr>
<div class="row">
    <!--
    <div class="col-md-12">
         <button type="button" class="btn btn-success btn-xs" onclick="descargarExcel()"><i class="fa fa-file"></i> Download Excel</button>
         <br/>
    </div>
-->
        <div class="col-md-12">
            
            <table id="tableperson" class="table table-bordered table-responsive">
                <thead>
                  
                   <th>DNI</th>
                    <th>NOMBRES Y APELLIDOS</th>
                    <th>DEPARTAMENTO</th>
                    <th>PROVINCIA</th>
                    <th>DISTRITO</th>
                </thead>
                <tbody>
                  
                </tbody>
            </table>

                <div>
                    Los datos Obtenidos por este medio son accesos libres que nos brinda la Reniec de las ultimas elecciones realizadas en Nuestro Pais. Por lo que es posible no encontrar a algunas personas.
                </div>
        </div>
        
    </div>

                    </form>
                    <br>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $(document).ready(function(){
                        $("#cargando").hide();

        $('#btnbuscar').click(function(){
            var numdni=$('#dni').val();
            if (numdni!='') {
                $("#cargando").show();
                $.ajax({
                    url:"{{ route('consultar.reniec') }}",
                    method:'GET',
                    data:{dni:numdni},
                    dataType:'json',
                    success:function(data){
                        console.log(data);
                   
                        var reg="";
                       
                            reg="<tr><td>"+data.dni+"</td><td>"+data.nombres+','+data.apellidos+"</td><td>"+data.departamento+"</td><td>"+data.provincia+"</td><td>"+data.distrito+"</td><tr/>";

                        //    reg="<tr><td>"+data.apellidos+" "+data.nombres+"</td><td>"+data.dni+"</td></tr>";
                        
                        console.log(data);
                        $('#tableperson tbody').append(reg);
                        $("#cargando").hide();

                        /*
                        if (resultados==true) {
                            $('#txtdni').val(data.dni);
                            $('#txtnombres').val(data.nombres);
                            $('#txtapellidos').val(data.apellidos);
                            $('#txtgrupo').val(data.grupovota);
                            $('#txtdistrito').val(data.distrito);
                            $('#txtprovincia').val(data.provincia);
                            $('#txtdepartamento').val(data.departamento);
                        }else{
                            $('#txtdni').val('');
                            $('#txtnombres').val('');
                            $('#txtapellidos').val('');
                            $('#txtgrupo').val('');
                            $('#txtdistrito').val('');
                            $('#txtprovincia').val('');
                            $('#txtdepartamento').val('');                            
                            $('#mensaje').show();
                            $('#mensaje').delay(2000).hide(2500);
                        }*/
                    },
                    catch:function(data){
                        console.log(data.response.data);
                    }
                });
            }else{
                alert('Escriba el DNI.!');
                $('#dni').focus();
            }
            
        });

    });
    


function descargarExcel(){
        //Creamos un Elemento Temporal en forma de enlace
        var tmpElemento = document.createElement('a');
      

        // obtenemos la información desde el div que lo contiene en el html
        // Obtenemos la información de la tabla
        var data_type = 'data:application/vnd.ms-excel';
        var tabla_div = document.getElementById('tableperson');
       

        var tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');

        tmpElemento.href = data_type + ', ' +  tabla_html;

        //Asignamos el nombre a nuestro EXCEL

        tmpElemento.download = 'ReporteExcel.xlsx';
    
        // Simulamos el click al elemento creado para descargarlo
        tmpElemento.click();
}


</script>
    </div>

    <!-- Scripts -->
 
       
</body>
  
</html>

