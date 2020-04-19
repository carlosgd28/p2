<?php

namespace App\Http\Controllers;
use App\Contenido;
use Illuminate\Http\Request;

class ContenidoController extends Controller
{
    public function Nuevo(Request $request){
    	$c=new Contenido();
    	$c->nombre=$request['nombre'];
    	$c->estado='A';
    	$c->area_conocimiento_id=$request['idarea'];
    	$c->save();
    }

    public function Modificar(Request $request){
    	Contenido::where('id',$request['id'])->update([
            'nombre'=>$request['nombre'],
        ]);

        return 1;
    }

    Public function GetByArea(Request $request){
    	$a=Contenido::where('area_conocimiento_id',$request['idarea'])->get();

    	return $a;
    }

    public function Activar(Request $request){
    	Contenido::where('id',$request['idcontenido'])->update([
            'estado'=>'A',
        ]);

        return 1;
    }

    public function Inactivar(Request $request){
    	Contenido::where('id',$request['idcontenido'])->update([
            'estado'=>'I',
        ]);

        return 1;
    }
}
