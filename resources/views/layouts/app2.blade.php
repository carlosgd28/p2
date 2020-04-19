<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>µSoft</title>
  <!--Import Google Icon Font-->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <!-- Compiled and minified CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

</head>

<body>

  <div class="navbar-fixed">
    <nav style="background: #FA4616;">
      <div class="nav-wrapper">
        <a href="#" class="brand-logo"><img src="images/logo.jpg" alt="" class="circle responsive-img" width="14%"/></a>
        <ul class="right hide-on-med-and-down">
          <li><a class="dropdown-trigger" href="#" data-target="dropdown1">Inicio<i class="material-icons right">arrow_drop_down</i></a></li>
          <li><a class="dropdown-trigger" href="#" data-target="dropdown2">Mantenimiento<i class="material-icons right">arrow_drop_down</i></a></li>
          <li><a class="dropdown-trigger" href="#" data-target="dropdown3">Reservacion<i class="material-icons right">arrow_drop_down</i></a></li>
          <li><a class="dropdown-trigger" href="#" data-target="dropdown4">Habitaciones<i class="material-icons right">arrow_drop_down</i></a></li>
          <li><a class="dropdown-trigger" href="#" data-target="dropdown5">Empleados<i class="material-icons right">arrow_drop_down</i></a></li>
          <li><a class="dropdown-trigger" href="#" data-target="dropdown5">Modulo Caja<i class="material-icons right">arrow_drop_down</i></a></li>
          <li><a class="dropdown-trigger" href="#" data-target="dropdown6">Usuario<i class="material-icons right">arrow_drop_down</i></a></li>

        </ul>
      </div>
    </nav>
  </div>

  <!-- Dropdown Structure -->
  <ul id="dropdown1" class="dropdown-content">
    <li><a href="#">Perfil</a></li>
    <li><a href="#">Salir</a></li>
  </ul>

  <ul id="dropdown2" class="dropdown-content">
    <li><a href="#">Perfil</a></li>
    <li><a href="#">Salir</a></li>
  </ul>

  <ul id="dropdown3" class="dropdown-content">
    <li><a href="#">Perfil</a></li>
    <li><a href="#">Salir</a></li>
  </ul>

  <ul id="dropdown4" class="dropdown-content">
    <li><a href="#">Perfil</a></li>
    <li><a href="#">Salir</a></li>
  </ul>


  <div class="nav-wrapper" id="app">
       @yield('content')
  </div>


  <!-- Compiled and minified JavaScript -->
  <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  <script>
    $(".dropdown-trigger").dropdown();
    // Or with jQuery

    $(document).ready(function() {
      $('.collapsible').collapsible();
    });
  </script>
</body>

</html>
