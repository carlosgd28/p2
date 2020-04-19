<?php

namespace App\Http\Controllers;
use App\Modulo;
use Illuminate\Http\Request;

class ModuloController extends Controller
{
    
    public function Nuevo(Request $request){
    	$m=new Modulo();
    	$m->nombre=$request['nombre'];
    	$m->competencia=$request['competencia'];
    	$m->objetivo=$request['objetivo'];
    	$m->estado='A';
    	$m->save();

    	return 1;
    }

    public function Modificar(Request $request){
    	Modulo::where('id',$request['id'])->update([
            'nombre'=>$request['nombre'],
            'competencia'=>$request['competencia'],
            'objetivo'=>$request['objetivo']
        ]);

        return 1;
    }

    public function GetAll(){
    	$m=Modulo::get();
    	return $m;
    }

    

    public function Activar(Request $request){
    	Modulo::where('id',$request['idmodulo'])->update([
            'estado'=>'A',
        ]);

        return 1;
    }

    public function Inactivar(Request $request){
    	Modulo::where('id',$request['idmodulo'])->update([
            'estado'=>'I',
        ]);

        return 1;
    }
}
