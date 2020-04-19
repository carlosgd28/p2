<?php

namespace App\Http\Controllers;
use App\Horario;
use Illuminate\Http\Request;

class HorarioController extends Controller
{
    public function Nuevo(Request $request)
    {

    	$hoy=date("Y-m-d"); 

    	$h=new Horario();
    	$h->fecha_registro=$hoy;
    	$h->inicio=$request['inicio'];
    	$h->termino=$request['termino'];
    	$h->area_conocimiento_id=$request['idarea'];
    	$h->idusuario7=$request['idusuario'];
    	$h->dia=$request['dia'];
        $h->id_anio_academico=$request['idanio'];
    	$h->save();

    	return 1;
    }
}
