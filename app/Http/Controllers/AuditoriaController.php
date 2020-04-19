<?php

namespace App\Http\Controllers;
use App\Auditoria;
use Illuminate\Http\Request;

class AuditoriaController extends Controller
{
    public function Get(){
    	$a=Auditoria::join('users','users.id','auditoria.usuario_operacion')
    		->select('auditoria.id as idauditoria','nombre_tabla','fecha_registro','tipo_operacion','observacion','nombre_pc','name','users.id as idusuario')
    		->orderBy('fecha_registro','desc')
    		->limit(500)
    		->get();

    	return $a;
    }

    public function GetByDate(Request $request){
    	$fecha1=$request['fecha'].' 00:00:00';
    	$fecha2= date("Y-m-d 00:00:00",strtotime($request['fecha']."+ 1 days")); 

    	$a=Auditoria::join('users','users.id','auditoria.usuario_operacion')
    		->select('auditoria.id as idauditoria','nombre_tabla','fecha_registro','tipo_operacion','observacion','nombre_pc','name','users.id as idusuario')
    		->orderBy('fecha_registro','desc')
    		->where('auditoria.fecha_registro','>=',$fecha1)
    		->where('auditoria.fecha_registro','<=',$fecha2)
    		->get();

    	return $a;

    }
}
