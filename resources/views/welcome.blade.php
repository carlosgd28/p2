<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>GALEON</title>
         
        <meta name="csrf-token" content="{{ csrf_token() }}">
        

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <style>
            html, body {
               background: #008080;
              
                font-family: 'Raleway', sans-serif;
                font-weight: 100;
                height: 100vh;
                margin: 0;
                 overflow-y:hidden;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

          

            .title {
                font-size: 84px;
            }

            .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .m-b-md {
                margin-bottom: 30px;
            }

            footer{
              color:black;
              min-height: 30px;
              filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#191919', endColorStr='#000000');
              border-top: 1px solid rgba(50, 50, 50, 0.3);
              width: 100%;
              position: fixed;
              bottom: 0;
              font-family: sans-serif;
              font-size: 13px;              
            }

              #lblcite{
                color: #494949;
                font-size: 35px;
                font-family:monospace;
            }
            #lblpequero{
                color:#62AAE1;
                font-size: 35px;
                font-family:monospace;
            }

             #lblamazonico{
                color: #1B1B1B;
                font-size: 35px;
                font-family:monospace;
            }

             #lblpucallpa{
                font-family:monospace;
                color:#4C4E51;
                font-size: 28px;
            }

            #lbldesc{
                color: #1B1B1B;
                font-family:monospace;
            }

            .content{
                font-size: 40px;
                color: white;
                font-family: arial;
            }

        </style>

    </head>
    <body>
        <div class="flex-center position-ref full-height" style="color:white;">
            @if (Route::has('login'))
                <div class="top-right links">
                    @auth
                        <a href="{{ url('/sistema') }}" style="color: white;" >INICIO</a>
                    @else
                        <a href="{{ route('login') }}" style="color: white;">INGRESAR</a>

                       <!-- <a href="{{ route('register') }}">Registrarse</a>-->
                    @endauth
                </div>
            @endif

            <div style="text-align: center;">
                <img src="materialize/images/logo.jpg" alt="" style="border-radius:210px;" class="circle responsive-img" width="25%"/>
                <br>
               <span class="content" > Galeón V 1.0</span> 
               

            </div>
        </div> 
    </body>
  
</html>
