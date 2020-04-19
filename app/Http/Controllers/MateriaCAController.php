<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\MateriaCicloAcademico;
use App\Horario;
use App\CicloAcademico;
use App\Matricula;
use App\ClasificaPersona;
use App\Notas;


use Illuminate\Support\Facades\DB; 
use Fpdf;

class MateriaCAController extends Controller
{
    public function Nuevo(Request $request){
    	$hoy= date("Y-m-d"); 

    	$mca=new MateriaCicloAcademico();
    	$mca->materia_id=$request['id'];
    	$mca->fecha_registro=$hoy;
    	$mca->estado='A';
    	$mca->ciclo_academico_id=$request['idca'];
    	$mca->idusuario6=$request['idusuario'];
    	$mca->iddocente=$request['iddocente'];
    	$mca->save();

    	return 1;
    }


  

    public function GenerarActaPdf($idmateria,$idciclo){
        $pdf = new Fpdf('P', 'mm');
      
        $pdf::AddPage();
        $pdf::SetMargins(3,4,3); 

       
        $pdf::Ln(5);
        $pdf::SetFont('Arial','B',15); 
        $pdf::cell(0,3,"ACTA DE CALIFICACIONES",0,1,"C");

        $ciclo=CicloAcademico::with('Promocion')
                ->with('AnioAcademico')
                ->with('Division')
                ->with('Especialidad')
                ->with('TipoEstudiante')
                ->where('id',$idciclo)->get();

        $materia_ciclo=MateriaCicloAcademico::with('Asignatura')->get();

        $docente=ClasificaPersona::where('clasifica_persona.id',$materia_ciclo[0]['iddocente'])
                ->join('persona','persona.id','clasifica_persona.persona_id')
                ->get();

        

  
        $pdf::SetXY(15,26);
        $pdf::SetFont('Arial','B',9); 
        $pdf::cell(35,3,utf8_decode("PROMOCIÓN:"),0,0,"");
        $pdf::SetFont('Arial','',9); 
        $pdf::cell(145,3,utf8_decode(":".$ciclo[0]['promocion']['nombre']),0,0,"");


        $pdf::SetXY(15,30);
        $pdf::SetFont('Arial','B',9); 
        $pdf::cell(35,3,utf8_decode("AÑO ACADÉMICO:"),0,0,"");
        $pdf::SetFont('Arial','',9); 
        $pdf::cell(145,3,utf8_decode(":".$ciclo[0]['anioacademico']['nombre']),0,0,"");


        $pdf::SetXY(15,34);
        $pdf::SetFont('Arial','B',9); 
        $pdf::cell(35,3,utf8_decode("DIVISION:"),0,0,"");
        $pdf::SetFont('Arial','',9); 
        $pdf::cell(145,3,utf8_decode(":".$ciclo[0]['especialidad']['nombre'].' '.$ciclo[0]['division']['nombre']),0,0,"");


        $pdf::SetXY(15,38);
        $pdf::SetFont('Arial','B',9); 
        $pdf::cell(35,3,utf8_decode("ASIGNATURA:"),0,0,"");
        $pdf::SetFont('Arial','',9); 
        $pdf::cell(145,3,utf8_decode(":".$materia_ciclo[0]['asignatura']['nombre']),0,0,"");

        $pdf::SetXY(15,42);
        $pdf::SetFont('Arial','B',9); 
        $pdf::cell(35,3,utf8_decode("DOCENTE:"),0,0,"");
        $pdf::SetFont('Arial','',9); 
        $pdf::cell(145,3,utf8_decode(":".$docente[0]['nombres'].' ,'.$docente[0]['appaterno'].' '.$docente[0]['apmaterno']),0,0,"");


        $materia=MateriaCicloAcademico::with('Nota')->where('id',$idmateria)->get();

        $pdf::SetXY(15,48);
        $pdf::SetFont('Arial','B',7); 
        $pdf::cell(6,4,utf8_decode("N°"),1,0,"C");
        $pdf::cell(13,4,utf8_decode("GRADO"),1,0,"C");
        $pdf::cell(85,4,utf8_decode("APELLIDOS Y NOMBRES"),1,0,"");
        $pdf::cell(17,4,utf8_decode(""),0,0,"C");
        $pdf::cell(17,4,utf8_decode(""),0,0,"C");
        $pdf::cell(17,4,utf8_decode(""),0,0,"C");
        $pdf::cell(17,4,utf8_decode(""),0,0,"C");
        $pdf::cell(20,4,utf8_decode(""),0,0,"C");


        $matriculados=Matricula::join('clasifica_persona','clasifica_persona.id','matricula.clasifica_persona_id')
                ->join('persona','persona.id','clasifica_persona.persona_id')
                ->select('matricula.id as idmatricula','nombres','appaterno','apmaterno')
                ->where('matricula.ciclo_academico_id',$idciclo)
                ->get();

        
        $pdf::SetFont('Arial','',7); 
        for ($i=0; $i <count($matriculados) ; $i++) { 
            $pdf::SetXY(15,52+($i*4));
            $pdf::cell(6,4,utf8_decode(($i+1)),1,0,"C");
            $pdf::cell(13,4,$ciclo[0]['tipoestudiante']['siglas'].$ciclo[0]['anioacademico']['siglas'].'/'.$ciclo[0]['especialidad']['siglas'],1,0,"C");
            $pdf::cell(85,4,$matriculados[$i]['nombres'].' ,'.$matriculados[$i]['appaterno'].' '.$matriculados[$i]['apmaterno'],1,0,"");

            $notas=Notas::with('TipoNota')
                ->where('materia_ciclo_academico_id',$idciclo)
                ->where('matricula_id',$matriculados[$i]['idmatricula'])
                ->orderBy('notas.tiponota_id_ref','asc')
                ->get();

            for ($j=0; $j <count($notas) ; $j++) { 
                $pdf::SetXY(119+($j*8),52-4);
                $pdf::cell(8,4,$notas[$j]['tiponota']['siglas'].($j+1),1,0,"C");
            }

            for ($j=0; $j <count($notas) ; $j++) { 
                $pdf::SetXY(119+($j*8),52+($i*4));
                $pdf::cell(8,4,$notas[$j]['nota'],1,0,"");

            }



        }

        $pdf::Output();
        exit;
    }
}
