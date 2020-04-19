<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CicloAcademico;
use App\Referencia;
use App\MateriaCicloAcademico;


class CicloAcademicoController extends Controller
{
    public function Nuevo(Request $request){

        $count_ciclo=CicloAcademico::where('nro_promocion',$request['promo'])->count();

        if($count_ciclo==0){
            $ca=new CicloAcademico();
            $ca->nro_promocion=$request['promo'];
            $ca->division='MIKE';
            $ca->grado='GR/ESP';
            $ca->estado_ac='A';
            $ca->save();
        }else{
            return "existe";
        }

    	return 1;
        
    }

    public function Get(Request $request){
    	

    	$ciclo=CicloAcademico::orderBy('id','desc')->paginate(6);

         return [
            'pagination'  =>[
                'total'=>$ciclo->total(),
                'current_page'=>$ciclo->currentPage(),
                'per_page'=>$ciclo->perPage(),
                'last_page'=>$ciclo->lastPage(),
                'from'=>$ciclo->firstItem(),
                'to'=>$ciclo->lastPage()
            ],
            'ciclos'=>$ciclo
        ];
    }


    public function GetDatos(Request $request){
        $ciclo=CicloAcademico::with('AnioAcademico')
                ->with('Periodo')
                ->with('TipoEstudiante')
                ->with('Promocion')
                ->with('Division')
                ->with('Especialidad')
                ->where('id',$request['idciclo'])
                ->get();

        return $ciclo;
    }

    public function GetById(Request $request){
        $ciclo=CicloAcademico::where('id',$request['idanio'])->get();
        return $ciclo;
    }
}
