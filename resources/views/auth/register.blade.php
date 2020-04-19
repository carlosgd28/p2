@extends('layouts.app')
  
@section('content')
 <b-container>
    <b-row align-h="center">
      <b-col cols="8">
         <b-card header="Registro de Usuario"
                header-tag="header" class="my-5">
             @if($errors->any())
            <b-alert show variant="danger">
              <ul class="mb-0">
                @foreach($errors->all() as $error)
                <li>{{ $error }}</li>
                @endforeach

              </ul>
            </b-alert>
            @else
              <b-alert show variant="warning">Por favor, Ingrese sus datos...</b-alert>
            @endif 

              <b-form method="POST" action="{{ route('register') }}" >
        
                <input type="hidden" name="_token" value="{{ csrf_token() }}">

                <b-form-group label="Nombre:" label-for="name">

                  <b-form-input id="name" name="name" type="text" required  value="{{ old('email') }}" autofocus placeholder="">
                  </b-form-input>

                </b-form-group>

                <b-form-group label="Correo Electronico:" label-for="email" description="No compartimos tu correo, confia en Nosotros.">

                  <b-form-input id="email" name="email" type="email" required placeholder="" value="{{ old('email') }}" >
                  </b-form-input>

                </b-form-group>

                <b-form-group  label="Contraseña:" label-for="password" description="Mantenemos tu Contraseña encryptado!">

                  <b-form-input id="password" name="password" type="password" required  placeholder=" ">
                  </b-form-input>

                </b-form-group>

                <b-form-group  label="Confirmar contraseña:" label-for="password_confirmation" description="Mantenemos tu Contraseña encryptado!">

                  <b-form-input id="password_confirmation" name="password_confirmation" type="password" required  placeholder="">
                  </b-form-input>

                </b-form-group>
               
                  <b-button type="submit"
                      variant="success">Registrar
                  </b-button>

                  <b-button href="#"
                      variant="link">¿Ya te has registrado?
                  </b-button>
              
             </b-form>
          
            
        </b-card>
      </b-col>
    </b-row>
  </b-container>
@endsection
