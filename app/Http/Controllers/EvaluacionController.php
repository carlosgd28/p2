<?php

namespace App\Http\Controllers;
use App\Evaluacion;
use App\Notas;
use App\Matricula;
use App\MateriaCicloAcademico;

use Illuminate\Http\Request;

class EvaluacionController extends Controller
{
	public function Nuevo(Request $request){
		$hoy=date('Y-m-d H:i:s');

		$e=new Evaluacion();
		$e->idmateriaciclo=$request['idmateria_ciclo'];
		$e->idtiponota_ref=$request['id_tipo_nota'];
		$e->idusuario10=$request['idusuario'];
		$e->estado='A';
		$e->fecha_registro=$hoy;
		$e->save();

		$matriculados=Matricula::where('ciclo_academico_id',$request['idciclo'])->get();
		$materia=MateriaCicloAcademico::where('id',$request['idmateria_ciclo'])->get();


		for ($i=0; $i<count($matriculados); $i++) { 
			$nota=new Notas();
			$nota->fecha_registro=$hoy;
			$nota->tiponota_id_ref=$request['id_tipo_nota'];
			$nota->estado='A';
			$nota->iddocente=$materia[0]['iddocente'];
			$e->idusuario4=$request['idusuario'];
			$nota->materia_ciclo_academico_id=$request['idmateria_ciclo'];
			$nota->matricula_id=$matriculados[$i]['id'];
			$nota->idevaluacion=$e->id;
			$nota->save();
		}

		return 1;
	}

    public function Get(Request $request){
    	$evaluacion=Evaluacion::with('TipoNota')
    		->where('idmateriaciclo',$request['idmateria_ciclo'])
    		->get();

    	return $evaluacion;
    }

    public function Activar(Request $request){

    }


    public function Desactivar(Request $request){

    }
}
