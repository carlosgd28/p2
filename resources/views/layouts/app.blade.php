<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>
      GALEON
    </title>
  <!--  <link href="materialize/images/logo.ico" rel="shortcut icon"/>-->
    <!-- Styles -->
     <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    
</head>
<body>


    <form id="logout-form"  action="{{ route('logout') }}" method="POST" style="display: none;">
        {{ csrf_field() }}
    </form>

<div id="app" >
    <nav style="background: #008080;" >
      <div class="nav-wrapper">
        <a href="/home" style=" margin-left:25px; padding: 0px;font-size: 16px; vertical-align: center;" class="brand-logo"> <img src="#" alt="" class="circle responsive-img" width="40px" height="25px" /> Galeón </a>

        <a href="#" class="sidenav-trigger" data-target="mobile-links">
          <i class="material-icons">menu</i>
        </a>
          @guest
         

          @else
      
           <ul class="right hide-on-med-and-down">
            </li>
            <li><a class="dropdown-trigger"  data-target="dropacademico">Gestion Academico</a>

            </li>

             <li><a class="dropdown-trigger"  data-target="dropdirectorio">Directorio General</a>

<!--
              <li><a class="dropdown-trigger" data-target="dropreportes"><i class="material-icons left">insert_chart</i>Gest. Reportes<i class="material-icons right">arrow_drop_down</i></a>

            </li>

          -->

            <li>
              

              <li><a class="dropdown-trigger" data-target="dropdownusuario">
                <strong>{{ auth()->user()->name }}</strong>

                @if(Auth::user()->rol==1)
                <span class="helper-text" style="font-size: 10px;">Administrador</span>
                @elseif(Auth::user()->rol==2)
                <span class="helper-text" style="font-size: 10px;">Docente</span>
                @elseif(Auth::user()->rol==3)
                <span class="helper-text" style="font-size: 10px;">Secretaria</span>
                @elseif(Auth::user()->rol==4)
                <span class="helper-text" style="font-size: 10px;">Estudiante</span>
                @elseif(Auth::user()->rol==5)
                <span class="helper-text" style="font-size: 10px;">Jefe Departamento</span>
                @endif
              </a></li>
            </li>
            </ul>
           @endguest
      </div>
    </nav>

  

  <!-- Dropdown Structure -->
   <ul id='dropdirectorio' class='dropdown-content'>

    @if(Auth::user()->rol==1)
      <li> <router-link to="/persona">Persona  </router-link></li>
      <li> <router-link to="/modulos">Modulos  </router-link></li>
      <!--
      <li> <router-link to="/docentes"><i class="material-icons">person_pin</i> Docente</router-link></li>
      <li> <router-link to="/estudiantes"><i class="material-icons">people</i> Estudiantes</router-link></li>
    -->
  
      <li> <router-link to="/auditoria">Auditoria  </router-link></li>
    @elseif(Auth::user()->rol==3)
      <li> <router-link to="/clientes">Docente</router-link></li>
    @elseif(Auth::user()->rol==5)
      <li> <router-link to="/modulos">Modulos  </router-link></li>
    @endif
  </ul>

  <ul id='dropacademico' class='dropdown-content'>
      @if(Auth::user()->rol==1)
        <li><router-link to="/promociones">Año Academico</router-link></li>

      @elseif(Auth::user()->rol==2) 
        <li> <router-link to="/asiganturascargo">Asignaturas</router-link></li>  
        <!--<li> <router-link to="/asiganturascargo">Historico</router-link></li>  -->
      @elseif(Auth::user()->rol==3) 
        <li> <router-link to="/clientes">Ciclo Academico</router-link></li>
      @elseif(Auth::user()->rol==4)
       <li> <router-link to="/clientes">Cursos</router-link></li>  
      @elseif(Auth::user()->rol==5)
        <li><router-link to="/promociones">Año Academico</router-link></li>
      @endif
  </ul>

  <ul id="dropdownusuario" class="dropdown-content">
    @guest
      <li><a href="{{ route('login') }}">Ingresar</a></li>
    @else
      
      @if(Auth::user()->rol==1)
       <li> <router-link to="/usuarios"> Usuarios</router-link></li>
    
       <li><a  href="{{ route('logout') }}" onclick="event.preventDefault();document.getElementById('logout-form').submit();" class="red-text">Salir</a></li>

      @else
       <li> <router-link to="/perfil">Perfil</router-link></li>
       <li><a  href="{{ route('logout') }}" onclick="event.preventDefault();document.getElementById('logout-form').submit();" class="red-text">Salir</a></li>
      @endif
    @endguest
  </ul>

    <div style="padding-top: 10px;">
        @yield('content')
    </div>
</div>

 <script src="/js/jquery-3.4.1.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment-with-locales.min.js"></script>
  <script>
  
    moment.locale('es');

    document.addEventListener('DOMContentLoaded', function() {
      var elemsd = document.querySelectorAll('.sidenav');
      var instancesd = M.Sidenav.init(elemsd,{});
    });

    document.addEventListener('DOMContentLoaded', function() {
      var Emodal = document.querySelectorAll('.modal');
      var Edrow = document.querySelectorAll('.dropdown-trigger');
      var Eselect = document.querySelectorAll('select');
      var instances1 = M.Modal.init(Emodal);
      var instances2 = M.Dropdown.init(Edrow,{
          contrainWith:true,
                  hover:false,
                  alignment:"top",
                  stopPropagation:false,
                  bellowOrigin:true
      });
      var instances3 = M.FormSelect.init(Eselect);

    });

    
  </script>   


  @auth
   <script>


  const global = this;
  global.user = @json(auth()->user());
  console.log(global.user);
 
   </script>
     <script src="{{ asset('js/app.js') }}"></script>  
  @endauth



</body>


</html>

