<html>

<head>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/materialize.min.css">
  <style>
    body {
      display: flex;
      min-height: 100vh;
      flex-direction: column;
    }

    main {
      flex: 1 0 auto;
    }

    body {
      background:rgb(0,128,128);
    }

    .input-field input[type=date]:focus + label,
    .input-field input[type=text]:focus + label,
    .input-field input[type=email]:focus + label,
    .input-field input[type=password]:focus + label {
      color: #e91e63;
    }

    .input-field input[type=date]:focus,
    .input-field input[type=text]:focus,
    .input-field input[type=email]:focus,
    .input-field input[type=password]:focus {
      border-bottom: 2px solid #e91e63;
      box-shadow: none;
    }
  </style>
</head>

<body>
  <div class="section"></div>
  <main>
    <center>
      
      <div class="section"></div>

      
    

      <div class="section">
        <div class="card row" style="display: inline-block; padding: 32px 48px 0px 48px; border: 1px solid #EEE;">
        
          <div>
            <img src="materialize/images/logo.jpg" width="180" height="180">
          </div>
          <form action="{{ route('login') }}"  method="POST">
             {{ csrf_field() }}
            
            <div class='row'>
              <div class='input-field col s12'>
                <input class='validate' type='text' name='name' />
                <label for='name'>Usuario</label>
              </div>
            </div>

            <div class='row'>
              <div class='input-field col s12'>
                <input class='validate' type='password' name='password' />
                <label for='password'>Contraseña</label>
              </div>
            </div>

            <center>
              <div class='row'>
               
                <button type='submit' class="waves-effect waves-light btn indigo"><i class="material-icons left"></i> Iniciar Session</button>
                
              </div>
              <div>
                  <div class="section">
                   @if($errors->any())
                      <b-alert show variant="danger">
                        <ul class="mb-0">
                          @foreach($errors->all() as $error)
                          <li class="red-text">{{ $error }}</li>
                          @endforeach

                        </ul>
                      </b-alert>
                      @else
                        <b-alert show >Ingrese sus datos...</b-alert>
                      @endif 
                </div>
              </div>
            </center>
          </form>
        </div>
      </div>

     
    
    </center>

    <div class="section"></div>
    <div class="section"></div>
  </main>

  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.1/jquery.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js"></script>
</body>

</html>