<?php
namespace App\Http\Controllers;
use App\AreaConocimiento;
use App\Persona;
use App\DocenteArea;
use App\Horario;
use App\Contenido;
use App\ContenidoAsignado;
use App\Matricula;
use App\MateriaCursando;
use App\ContenidoCursando;
use App\Evaluacion;
use App\EvaluacionEspecialista;
use App\CicloAcademico;
use App\Modulo;
use App\ModuloCursando;
use Illuminate\Http\Request;
use Fpdf;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
class AreaConocimientoController extends Controller
{
    public function Nuevo(Request $request){
    	$ac=new AreaConocimiento();
    	$ac->nombre=$request['nombre'];
    	$ac->estado='A';
    	$ac->modulo_id=$request['idmodulo'];
    	$ac->save();
    }

    public function Modificar(Request $request){
    	AreaConocimiento::where('id',$request['id'])->update([
            'nombre'=>$request['nombre'],
        ]);

        return 1;
    }

    Public function GetByModulo(Request $request){
    	$a=AreaConocimiento::where('modulo_id',$request['idmodulo'])->get();

    	return $a;
    }

    Public function GetByModuloArea(Request $request){
        $area=AreaConocimiento::where('modulo_id',$request['idmodulo'])->get();

        $Lista=Array();

        for ($i=0; $i <count($area) ; $i++) { 

                $horario=Horario::where('area_conocimiento_id',$area[$i]['id'])
                            ->where('id_anio_academico',$request['idanio'])
                            ->get();

            $docente=DocenteArea::join('clasifica_persona','clasifica_persona.id','docentearea.id_clasifica_persona')
                ->join('persona','persona.id','clasifica_persona.persona_id')
                ->select('docentearea.id as idda','persona.nombres as nombres','persona.appaterno as apellido1','persona.apmaterno as apellido2')
                ->where('docentearea.area_conocimiento_id',$area[$i]['id'])
                ->where('docentearea.anio_academico_id',$request['idanio'])
                ->get();
            
             $Lista[]=Array(
                'area'=>$area[$i],
                'horario'=>$horario,
                'docente'=>$docente
            );
        }
        return $Lista;
    }



    public function Activar(Request $request){
    	AreaConocimiento::where('id',$request['idarea'])->update([
            'estado'=>'A',
        ]);

        return 1;
    }

    public function Inactivar(Request $request){
    	AreaConocimiento::where('id',$request['idarea'])->update([
            'estado'=>'I',
        ]);

        return 1;
    }

    public function GetDocentes(Request $request){
        $docente=Persona::join('clasifica_persona','persona.id','clasifica_persona.persona_id')
            ->select('persona.id as idpersona','clasifica_persona.id as idcp','persona.nombres as nombre','persona.appaterno as apellidop','persona.apmaterno as apellidom')
            ->where('tipo_persona','DOCENTE')
            ->where('clasifica_persona.estado','A')
            ->get();

        $asignado=DocenteArea::where('anio_academico_id',$request['idanio'])
            ->where('area_conocimiento_id',$request['idarea'])
            ->get();

        $Lista=Array();

        for ($i=0; $i <count($docente) ; $i++) { 
            $e=0;
            for ($j=0; $j <count($asignado) ; $j++) { 
                if($docente[$i]['idcp']==$asignado[$j]['id_clasifica_persona']){
                    $e=1;
                    break;
                }
            }

            $Lista[]=Array(
                'idpersona'=>$docente[$i]['idpersona'],
                'idcp'=>$docente[$i]['idcp'],
                'nombre'=>$docente[$i]['nombre'],
                'apellidop'=>$docente[$i]['apellidop'],
                'apellidom'=>$docente[$i]['apellidom'],
                'e'=>$e
            );
        }

        return $Lista;
    }

    public function AsignarDocenteArea(Request $request){
        $da=new DocenteArea();
        $da->id_clasifica_persona=$request['idcp'];
        $da->anio_academico_id=$request['idanio'];
        $da->area_conocimiento_id=$request['idarea'];
        $da->save();

        return 1;
    }

    public function DescartarDocente(Request $request){
        DocenteArea::where('id',$request['idda'])->delete();
        return 1;
    }

    public function DescartarHorario(Request $request){
        Horario::where('id',$request['idhorario'])->delete();
        return 1;
    }

    public function GetAsignaturaDocente(Request $request){
        $asignaturas=DocenteArea::with('Promocion')
                ->with(['Area'=>function($query){
                    $query->with('Modulo');
                }])
                ->where('id_clasifica_persona',$request['id'])
                ->where('estado_da','A')
                ->get();

        return $asignaturas;
    }

    public function GetContenidoByArea(Request $request){

        $Lista=Array();

        $contenido=Contenido::where('area_conocimiento_id',$request['idarea'])
            ->where('estado','A')
            ->get();

        for ($i=0; $i <count($contenido); $i++){ 
            
            $asignado=ContenidoAsignado::with('Evaluacion')->where('contenido_id',$contenido[$i]['id'])
                ->where('docentearea_id',$request['iddocente'])->get();

            if($asignado->isNotEmpty()){
                $Lista[]=Array(
                    'contenido'=>$contenido[$i],
                    'asignado'=>$asignado
                );
            }else{
                $Lista[]=Array(
                    'contenido'=>$contenido[$i],
                    'asignado'=>[]
                );
            }

          
        }



        return $Lista;
    }

    public function HabilitarContenido(Request $request){
        $ca=new ContenidoAsignado();
        $ca->contenido_id=$request['idcontenido'];
        $ca->docentearea_id=$request['iddocentearea'];
        $ca->estado_ca='A';
        $ca->save();

        $docentearea=DocenteArea::where('id',$request['iddocentearea'])->get();

        $contenido=Contenido::select('area_conocimiento_id','nombre')->where('id',$request['idcontenido'])->get();

        $matriculas=Matricula::select('id')->where('anio_academico_id',$docentearea[0]['anio_academico_id'])->get();

        for ($i=0; $i <count($matriculas) ; $i++) { 
            $materia_cursando=MateriaCursando::select('id')->where('idmatricula_mat',$matriculas[$i]['id'])
                ->where('area_conocimiento_id',$contenido[0]['area_conocimiento_id'])->get();

            for ($j=0; $j <count($materia_cursando); $j++) { 
                $cc=new ContenidoCursando();
                $cc->materia_cursando_id=$materia_cursando[$j]['id'];
                $cc->contenido_asignado_id=$ca->id;
                $cc->nombre_contenido=$contenido[0]['nombre'];
                $cc->idmatricula_cont=$matriculas[$i]['id'];
                $cc->save();
            }
        }

        return 1;
    }

    public function HabilitarEvaluacion(Request $request){
        $eval=new Evaluacion();
        $eval->tipo=$request['tipo'];
        $eval->contenido_asignado_id=$request['idcontenidoasignado'];
        $eval->estado_eval='A';
        $eval->save();


        $cursando=ContenidoCursando::select('id','idmatricula_cont')->where('contenido_asignado_id',$request['idcontenidoasignado'])->get();


        for ($i=0; $i <count($cursando) ; $i++) { 
            $evalesp=new EvaluacionEspecialista();
            $evalesp->nota=0;
            $evalesp->contenido_cursando_id=$cursando[$i]['id'];
            $evalesp->evaluacion_id=$eval->id;
            $evalesp->tipo_nota=$request['tipo'];
            $evalesp->idmatricula_eval=$cursando[$i]['idmatricula_cont'];
            $evalesp->save();
        }

        return 1;
    }

    public function GetContenidoEvaluacion(Request $request){

        $evaluacion=EvaluacionEspecialista::join('evaluacion','evaluacion.id','evaluacion_especialista.evaluacion_id')
        ->select('evaluacion.id as id','tipo_nota','nota','evaluacion_especialista.id as idee')
        ->where('contenido_cursando_id',$request['idcc'])
        ->get();

        return $evaluacion;
    }

    public function RegistrarEvaluacion(Request $request){
        $evaluaciones=$request['evaluacion'];
        for ($i=0; $i <count($evaluaciones) ; $i++) { 
            EvaluacionEspecialista::where('id',$evaluaciones[$i]['idee'])->update([
            'nota'=>$evaluaciones[$i]['nota']
            ]);
        }

        return 1;

        
    }

    public function SearchMatriculadosDocente(Request $request){
         $docente_area=DocenteArea::where('id',$request['iddocentearea'])->get();


        $matriculados= Matricula::join('clasifica_persona','clasifica_persona.id','matricula.clasifica_persona_id')
            ->join('persona','persona.id','clasifica_persona.persona_id')
            ->select('cedula','nombres','appaterno','apmaterno','matricula.id as idmatricula')
            ->where('anio_academico_id',$docente_area[0]['anio_academico_id'])
            ->where('cedula','like','%'.$request['valor'].'%')
            ->orWhere('nombres','like','%'.$request['valor'].'%')
            ->orWhere('appaterno','like','%'.$request['valor'].'%')
            ->orWhere('apmaterno','like','%'.$request['valor'].'%')
            ->get();

        $Lista=Array();
        
 

        for ($i=0; $i <count($matriculados); $i++) { 

             $nota_aca=MateriaCursando::select('id','nota_aca','examen_final')
                        ->where('idmatricula_mat',$matriculados[$i]['idmatricula'])
                        ->where('area_conocimiento_id',$request['idarea'])
                        ->get();

            $contenido=ContenidoAsignado::join('contenido_cursando','contenido_asignado.id','contenido_cursando.contenido_asignado_id')
                ->select('contenido_cursando.id as idcc','nombre_contenido','estado_ca')
                ->where('docentearea_id',$request['iddocentearea'])
                ->where('contenido_cursando.idmatricula_cont',$matriculados[$i]['idmatricula'])
                ->get();

            
            $list=Array();
            for ($j=0; $j <count($contenido) ; $j++) { 
                $evaluacion=EvaluacionEspecialista::where('contenido_cursando_id',$contenido[$j]['idcc'])
                    ->get();

                $list[]=Array(
                    'contenido'=>$contenido[$j],
                    'evaluaciones'=>$evaluacion
                );
            }

            $Lista[]=Array(
                'cedula'=>$matriculados[$i]['cedula'],
                'nombres'=>$matriculados[$i]['nombres'],
                'appaterno'=>$matriculados[$i]['appaterno'],
                'apmaterno'=>$matriculados[$i]['apmaterno'],
                'idmatricula'=>$matriculados[$i]['idmatricula'],
                'aca'=>$nota_aca,
                'contenido'=>$list
            );
        }


        return $Lista;
    }

    public function RegistrarExamenFinal(Request $request){
        MateriaCursando::where('id',$request['id'])->update([
            'examen_final'=>$request['nota']
            ]);

        return 1;
    }

    public function RegistrarNotaAca(Request $request){
        MateriaCursando::where('id',$request['id'])->update([
            'nota_aca'=>$request['nota_aca']
            ]);

        return 1;
    }

    public function GetHorario(Request $request){
        $ca=DocenteArea::where('id',$request['idasignatura'])->get();
        $h=Horario::select('inicio','termino','dia')
            ->where('id_anio_academico',$ca[0]['anio_academico_id'])
            ->where('area_conocimiento_id',$ca[0]['area_conocimiento_id'])
            ->orderBy('dia','asc')
            ->get();

        return $h;
    }

    public function DescartarContenido(Request $request){
        $cc=ContenidoCursando::where('contenido_asignado_id',$request['idcontenido'])->get();

        for ($i=0; $i <count($cc); $i++) { 
             EvaluacionEspecialista::where('contenido_cursando_id',$cc[$i]['id'])->delete();
        }
        Evaluacion::where('contenido_asignado_id',$request['idcontenido'])->delete();
        ContenidoCursando::where('contenido_asignado_id',$request['idcontenido'])->delete();
        ContenidoAsignado::where('id',$request['idcontenido'])->delete();
        return 1;
    }

    public function DescartarEvaluacion(Request $request){
        EvaluacionEspecialista::where('evaluacion_id',$request['idevaluacion'])->delete();
        Evaluacion::where('id',$request['idevaluacion'])->delete();
        return 1;
    }

    public function ArchivarContenidoAsignado(Request $request){
        ContenidoAsignado::where('id',$request['idcontenido'])->update([
            'estado_ca'=>'I'
            ]);
        return 1;
    }

    public function ActivarContenidoAsignado(Request $request){
        ContenidoAsignado::where('id',$request['idcontenido'])->update([
            'estado_ca'=>'A'
        ]);

        return 1;
    }

    public function ActaNotaPdf($iddocentearea){
        $pdf = new Fpdf();
        $pdf::SetMargins(10,10,10); 
        $pdf::AddPage('L');
        $pdf::AliasNbPages();
        $pdf::SetFont('Arial','B',13); 
        $pdf::cell(0,4,utf8_decode("SEGUIMIENTO AL ALUMNO"),0,0,"C");
        $pdf::SetFont('Arial','',10); 
        $pdf::Ln();
        $pdf::cell(0,4,utf8_decode("ESPECIALISTAS"),0,0,"C");

        $pdf::Ln();
        $pdf::Ln();

        $cabecera=DocenteArea::join('anio_academico','anio_academico.id','docentearea.anio_academico_id')
            ->join('clasifica_persona','clasifica_persona.id','docentearea.id_clasifica_persona')
            ->join('persona','persona.id','clasifica_persona.persona_id')
            ->join('area_conocimiento','area_conocimiento.id','docentearea.area_conocimiento_id')
            ->join('modulo','modulo.id','area_conocimiento.modulo_id')
            ->select('nro_promocion','division','grado','docentearea.id as idda','anio_academico.id as id_ac','area_conocimiento.id as id_acon','nombres','appaterno','apmaterno','area_conocimiento.nombre as nombre_ac','modulo.nombre as nombre_modulo')
            ->where('docentearea.id',$iddocentearea)
            ->get();

        $especialistas=Matricula::join('clasifica_persona','clasifica_persona.id','matricula.clasifica_persona_id')
            ->join('persona','persona.id','clasifica_persona.persona_id')
            ->join('materia_cursando','matricula.id','materia_cursando.idmatricula_mat')
            ->select('cedula','nombres','appaterno','apmaterno','matricula.id as idmatricula','nota_aca','examen_final')
            ->where('matricula.anio_academico_id',$cabecera[0]['id_ac'])
            ->where('materia_cursando.area_conocimiento_id',$cabecera[0]['id_acon'])
            ->get();

        $evaluacion_formadora=ContenidoAsignado::join('evaluacion','evaluacion.contenido_asignado_id','contenido_asignado.id')
                ->where('tipo',"FORMADORA")
                ->where('estado_eval','A')
                ->where('docentearea_id',$iddocentearea)
                ->count();

        $evaluacion_integradora=ContenidoAsignado::join('evaluacion','evaluacion.contenido_asignado_id','contenido_asignado.id')
                ->where('tipo',"INTEGRADORA")
                ->where('estado_eval','A')
                ->where('docentearea_id',$iddocentearea)
                ->count();

        $pdf::SetFont('Arial','B',10); 
        $pdf::cell(48,4,utf8_decode("PROMOCIÓN:"),0,0,"");
        $pdf::SetFont('Arial','',10); 
        $pdf::cell(90,4,utf8_decode($cabecera[0]['nro_promocion']),0,0,"");
        $pdf::SetFont('Arial','B',10); 
        $pdf::cell(25,4,utf8_decode("DOCENTE:"),0,0,"");
        $pdf::SetFont('Arial','',10); 
        $pdf::cell(113,4,utf8_decode($cabecera[0]['appaterno'].' '.$cabecera[0]['apmaterno'].' , '.$cabecera[0]['nombres']),0,0,"");

        $pdf::Ln();
        $pdf::SetFont('Arial','B',10); 
        $pdf::cell(48,4,utf8_decode("DIVISIÓN:"),0,0,"");
        $pdf::SetFont('Arial','',10); 
        $pdf::cell(90,4,utf8_decode($cabecera[0]['division']),0,0,"");
        $pdf::SetFont('Arial','B',10); 
        $pdf::cell(25,4,utf8_decode("MODULO:"),0,0,"");
        $pdf::SetFont('Arial','',10); 
        $pdf::cell(113,4,utf8_decode($cabecera[0]['nombre_modulo']),0,0,"");

        $pdf::Ln();
        $pdf::SetFont('Arial','B',10); 
        $pdf::cell(48,4,utf8_decode("AREA DE CONOCIMIENTO:"),0,0,"");
        $pdf::SetFont('Arial','',10); 
        $pdf::cell(90,4,utf8_decode($cabecera[0]['nombre_ac']),0,0,"");

        $pdf::Ln();
        $pdf::Ln();

            $pdf::SetFont('Arial','B',7); 
            $pdf::cell(10,8,utf8_decode("ORD."),1,0,"C");
            $pdf::cell(20,8,utf8_decode("CEDULA"),1,0,"C");
            $pdf::cell(15,8,utf8_decode("GRADO"),1,0,"C");
            $pdf::cell(60,8,utf8_decode("APELLIDOS Y NOMBRES"),1,0,"C");
            //$pdf::cell(175,4,utf8_decode("APELLIDOS Y NOMBRES"),1,0,"C");

            if($evaluacion_formadora>0) $pdf::cell(60,4,"TAREA FORMADORA",1,0,"C");
            if($evaluacion_integradora>0)$pdf::cell(60,4,"TAREA INTEGRADORA",1,0,"C");
            $pdf::cell(15,8,"EXM.FINAL",1,0,"C");
            $pdf::cell(12,8,"ACA",1,0,"C");
            $pdf::cell(30,8,"FIRMA",1,0,"C");



      
             if($evaluacion_formadora>0){
                $pdf::setXY(115,42);
                $rest=0;
             } 
           
            $l=floor((60/($evaluacion_formadora+1)));
            $rest=$l*($evaluacion_formadora+1);
            for ($m=0; $m <$evaluacion_formadora; $m++) { 
                if($m==($evaluacion_formadora-1)){
                    $pdf::cell($l,4,$m+1,1,0,"C");
                    $pdf::cell($l+(60-$rest),4,"PROM",1,0,"C");

                }else $pdf::cell($l,4,$m+1,1,0,"C");

            }

            $l=floor(60/($evaluacion_integradora+1));
            $rest=$l*($evaluacion_integradora+1);
            for ($m=0; $m <$evaluacion_integradora; $m++) { 
                if($m==($evaluacion_integradora-1)){
                    $pdf::cell($l,4,$m+1,1,0,"C");
                    $pdf::cell($l+(60-$rest),4,"PROM",1,0,"C");

                }else $pdf::cell($l,4,$m+1,1,0,"C");

            }
        
        $pdf::Ln();



        $pdf::SetFont('Arial','',7); 
        for ($i=0; $i <count($especialistas) ; $i++) { 

            $pdf::cell(10,6,utf8_decode($i+1),1,0,"C");
            $pdf::cell(20,6,utf8_decode($especialistas[$i]['cedula']),1,0,"C");
            $pdf::cell(15,6,utf8_decode($cabecera[0]['grado']),1,0,"C");
            $pdf::cell(60,6,utf8_decode($especialistas[$i]['appaterno'].' '.$especialistas[$i]['apmaterno'].' , '.$especialistas[$i]['nombres']),1,"C");

            $nota_formadora=ContenidoAsignado::join('evaluacion','evaluacion.contenido_asignado_id','contenido_asignado.id')
                ->join('evaluacion_especialista','evaluacion_especialista.evaluacion_id','evaluacion.id')
                ->select('nota')
                ->where('tipo',"FORMADORA")
                ->where('docentearea_id',$iddocentearea)
                ->where('idmatricula_eval',$especialistas[$i]['idmatricula'])
                ->where('estado_eval','A')
                ->get();

            $nota_integradora=ContenidoAsignado::join('evaluacion','evaluacion.contenido_asignado_id','contenido_asignado.id')
                ->join('evaluacion_especialista','evaluacion_especialista.evaluacion_id','evaluacion.id')
                ->select('nota')
                ->where('tipo',"INTEGRADORA")
                ->where('docentearea_id',$iddocentearea)
                ->where('idmatricula_eval',$especialistas[$i]['idmatricula'])
                ->where('estado_eval','A')
                ->get();

            $rest=0;
            $S1=0;
            if(count($nota_formadora)>0) $l=floor(60/(count($nota_formadora)+1));
            
            $rest=$l*(count($nota_formadora)+1);
            for ($m=0; $m <count($nota_formadora); $m++) { 
                
                if($m==(count($nota_formadora)-1)){
                    $pdf::cell($l,6,$nota_formadora[$m]['nota'],1,0,"C");
                    $S1=$S1+$nota_formadora[$m]['nota'];
                    $v1=Round($S1/count($nota_formadora),2);
                    
                    $pdf::cell($l+(60-$rest),6,number_format($v1,2,'.',''),1,0,"C");

                }else{
                    $pdf::cell($l,6,$nota_formadora[$m]['nota'],1,0,"C");
                    $S1=$S1+$nota_formadora[$m]['nota'];
                } 
            }
            

            $rest=0;
            $S2=0;
            if(count($nota_integradora)>0) $l=floor(60/(count($nota_integradora)+1));
            $rest=$l*(count($nota_integradora)+1);
            for ($m=0; $m <count($nota_integradora); $m++) { 

                if($m==(count($nota_integradora)-1)){

                    $pdf::cell($l,6,$nota_integradora[$m]['nota'],1,0,"C");
                    $S2=$S2+$nota_integradora[$m]['nota'];
                    $v2 =Round($S2/count($nota_integradora),2);
                    $pdf::cell($l+(60-$rest),6,number_format($v2,2,'.',''),1,0,"C");

                }else{
                    $pdf::cell($l,6,$nota_integradora[$m]['nota'],1,0,"C");
                    $S2=$S2+$nota_integradora[$m]['nota'];
                } 
            }

            $pdf::cell(15,6,$especialistas[$i]['examen_final'],1,0,"C");
            $pdf::cell(12,6,$especialistas[$i]['nota_aca'],1,0,"C");

            $pdf::cell(30,6,"",1,0,"C");


        $pdf::Ln();
        }

        $pdf::Ln(15);
         $pdf::SetFont('Arial','B',7); 
        $pdf::cell(140,5,"FIRMA DE DOCENTE",0,0,"C");
        $pdf::cell(140,5,"FIRMA DE COORDINADOR DE MODULO",0,0,"C");


        $pdf::Output();
        exit;
    }

    public function ActaExamenFinalPdf($idpromocion, $idmodulo){

        $pdf = new Fpdf();
        $pdf::SetMargins(10,10,10); 
        $pdf::AddPage('L','A4');
        $pdf::AliasNbPages();
        $pdf::SetFont('Arial','B',13); 
        $pdf::cell(0,4,utf8_decode("SEGUIMIENTO AL MODULO"),0,0,"C");
        $pdf::SetFont('Arial','',10); 
        $pdf::Ln();
        $pdf::cell(0,4,utf8_decode("ESPECIALISTAS"),0,0,"C");

        $cabecera=CicloAcademico::where('id',$idpromocion)
            ->get();

        $modulo=Modulo::where('id',$idmodulo)->get();

        $especialistas=Matricula::join('clasifica_persona','clasifica_persona.id','matricula.clasifica_persona_id')
            ->join('persona','persona.id','clasifica_persona.persona_id')
            ->select('cedula','nombres','appaterno','apmaterno','matricula.id as idmatricula')
            ->where('matricula.anio_academico_id',$idpromocion)
            ->get();

        
        $pdf::Ln();
        $pdf::SetFont('Arial','B',10); 
        $pdf::cell(25,3,utf8_decode("PROMOCIÓN:"),0,0,"");
        $pdf::SetFont('Arial','',10); 
        $pdf::cell(90,3,utf8_decode($cabecera[0]['nro_promocion']),0,0,"");
        $pdf::SetFont('Arial','B',10); 
        $pdf::Ln();

        $pdf::cell(25,3,utf8_decode("DIVISIÓN:"),0,0,"");
        $pdf::SetFont('Arial','',10); 
        $pdf::cell(113,3,utf8_decode($cabecera[0]['division']),0,0,"");

        $pdf::Ln();
        $pdf::SetFont('Arial','B',10); 
        $pdf::cell(25,3,utf8_decode("MODULO:"),0,0,"");
        $pdf::SetFont('Arial','',10); 
        $pdf::cell(113,3,utf8_decode($modulo[0]['nombre']),0,0,"");

        $pdf::Ln(5);
        $pdf::SetFont('Arial','B',7); 
        $pdf::cell(7,16,utf8_decode("ORD"),1,0,"C");
        $pdf::cell(17,16,utf8_decode("CEDULA"),1,0,"C");
        $pdf::cell(12,16,utf8_decode("GRADO"),1,0,"C");
        $pdf::cell(60,16,utf8_decode("APELLIDOS Y NOMBRES"),1,0,"C");
     
        $pdf::cell(154,8,"NOTA FINAL INDIVIDUAL",1,0,"C");

        $pdf::SetFillColor(197, 216, 237); 
     
         $pdf::setXY(260,29);
        $pdf::MultiCell(10,16,"PROM",1,"C",0);

        $pdf::setXY(270,29);

        $pdf::MultiCell(25,16,"FIRMA",1,"C",1);

       
        $pdf::SetFont('Arial','',7); 



        for ($i=0; $i <count($especialistas) ; $i++){ 
          
            $sum_ef=0;

            $pdf::cell(7,4,utf8_decode($i+1),1,0,"C");
            $pdf::cell(17,4,utf8_decode($especialistas[$i]['cedula']),1,0,"C");
            $pdf::cell(12,4,utf8_decode($cabecera[0]['grado']),1,0,"C");
            $pdf::cell(60,4,utf8_decode($especialistas[$i]['appaterno'].' '.$especialistas[$i]['apmaterno'].' , '.$especialistas[$i]['nombres']),1,0);
           

            $modulo_cursando=ModuloCursando::where('matricula_id',$especialistas[$i]['idmatricula'])
                    ->where('modulo_id',$idmodulo)
                    ->get();

            if($modulo_cursando->isNotEmpty()){
                
                $materia_cursando=MateriaCursando::where('modulo_cursando_id',$modulo_cursando[0]['id'])
                    ->where('idmatricula_mat',$especialistas[$i]['idmatricula'])
                    ->get();

                if($materia_cursando->isNotEmpty()){
                    if($i==0){  
                        $materia_titulo=MateriaCursando::join('area_conocimiento','area_conocimiento.id','materia_cursando.area_conocimiento_id')->where('modulo_cursando_id',$modulo_cursando[0]['id'])
                            ->orderBy('materia_cursando.id','asc')
                            ->get();

                        $rest=0;
                        if(count($materia_titulo)>0){
                            $l=floor(154/count($materia_titulo));
                        } 

                        

                        for ($m=0; $m <count($materia_titulo); $m++) { 
                            
                            $rest=$rest+$l;

                            if($m==(count($materia_titulo)-1)){
                                $pdf::setXY(106+$l*$m,37);
                                //$pdf::setXY(106,37);
                                $pdf::MultiCell($l+(154-$rest),8,utf8_decode($materia_titulo[$m]['nombre']),1,"C",0);
                            }else{
                                $pdf::setXY(106+$l*$m,37);
                                $pdf::MultiCell($l,8,utf8_decode($materia_titulo[$m]['nombre']),1,"C",0);
                            } 

                        }

                    }

                    
                    $l=floor(154/count($materia_cursando));

                    $rest=0;
                    for ($k=0; $k <count($materia_cursando) ; $k++) { 
                      
                        $rest=$rest+$l;

                        if($k==(count($materia_cursando)-1)){
                                $pdf::setXY(106+$l*$k,45+$i*4);
                                //$pdf::setXY(106,37);
                                $pdf::MultiCell($l+(154-$rest),4,$materia_cursando[$k]['examen_final'],1,"C",0);

                            }else{
                                $pdf::setXY(106+$l*$k,45+$i*4);
                                $pdf::MultiCell($l,4,$materia_cursando[$k]['examen_final'],1,"C",0);
                            } 

                        $sum_ef=$sum_ef+$materia_cursando[$k]['examen_final'];

                    }

                    $pdf::setXY(212,45+$i*4);
                  
                    $p_ef=round($sum_ef/count($materia_cursando),2);

                    $pdf::setXY(260,45+$i*4);
                    $pdf::MultiCell(10,4,number_format($p_ef,2,'.',''),1,"C",0);

                    
                    $pdf::setXY(270,45+$i*4);
                    $pdf::MultiCell(25,4,"",1,"C",0);

                    //muestra de notas
                }

            }else{
                $pdf::cell(15,4,"Ningun registro",1,0,"C");
            }   
        }

        $pdf::Ln(10);
        $pdf::SetFont('Arial','B',7); 
        $pdf::cell(140,5,"Coordinador de Modulo",0,0,"C");
        
        $pdf::cell(140,5,"Jefe de Departamento",0,0,"C");
        $pdf::Output();
        exit;

    }

     public function ActaAcaPdf($idpromocion, $idmodulo){

        $pdf = new Fpdf();
        $pdf::SetMargins(10,10,10); 
        $pdf::AddPage('L','A4');
        $pdf::AliasNbPages();
        $pdf::SetFont('Arial','B',13); 
        $pdf::cell(0,4,utf8_decode("SEGUIMIENTO AL MODULO"),0,0,"C");
        $pdf::SetFont('Arial','',10); 
        $pdf::Ln();
        $pdf::cell(0,4,utf8_decode("ESPECIALISTAS"),0,0,"C");

        $cabecera=CicloAcademico::where('id',$idpromocion)
            ->get();

        $modulo=Modulo::where('id',$idmodulo)->get();

        $especialistas=Matricula::join('clasifica_persona','clasifica_persona.id','matricula.clasifica_persona_id')
            ->join('persona','persona.id','clasifica_persona.persona_id')
            ->select('cedula','nombres','appaterno','apmaterno','matricula.id as idmatricula')
            ->where('matricula.anio_academico_id',$idpromocion)
            ->get();

        
        $pdf::Ln();
        $pdf::SetFont('Arial','B',10); 
        $pdf::cell(25,3,utf8_decode("PROMOCIÓN:"),0,0,"");
        $pdf::SetFont('Arial','',10); 
        $pdf::cell(90,3,utf8_decode($cabecera[0]['nro_promocion']),0,0,"");
        $pdf::SetFont('Arial','B',10); 
        $pdf::Ln();

        $pdf::cell(25,3,utf8_decode("DIVISIÓN:"),0,0,"");
        $pdf::SetFont('Arial','',10); 
        $pdf::cell(113,3,utf8_decode($cabecera[0]['division']),0,0,"");

        $pdf::Ln();
        $pdf::SetFont('Arial','B',10); 
        $pdf::cell(25,3,utf8_decode("MODULO:"),0,0,"");
        $pdf::SetFont('Arial','',10); 
        $pdf::cell(113,3,utf8_decode($modulo[0]['nombre']),0,0,"");

        $pdf::Ln(5);
        $pdf::SetFont('Arial','B',7); 
        $pdf::cell(7,16,utf8_decode("ORD"),1,0,"C");
        $pdf::cell(17,16,utf8_decode("CEDULA"),1,0,"C");
        $pdf::cell(12,16,utf8_decode("GRADO"),1,0,"C");
        $pdf::cell(60,16,utf8_decode("APELLIDOS Y NOMBRES"),1,0,"C");
     
        $pdf::cell(154,8,"ACTITUD ANDRAGOGICA (ACA)",1,0,"C");

        $pdf::SetFillColor(197, 216, 237); 
     
         $pdf::setXY(260,29);
        $pdf::MultiCell(10,16,"PROM",1,"C",0);

        $pdf::setXY(270,29);

        $pdf::MultiCell(25,16,"FIRMA",1,"C",1);

       
        $pdf::SetFont('Arial','',7); 



        for ($i=0; $i <count($especialistas) ; $i++){ 
          
            $sum_aca=0;

            $pdf::cell(7,4,utf8_decode($i+1),1,0,"C");
            $pdf::cell(17,4,utf8_decode($especialistas[$i]['cedula']),1,0,"C");
            $pdf::cell(12,4,utf8_decode($cabecera[0]['grado']),1,0,"C");
            $pdf::cell(60,4,utf8_decode($especialistas[$i]['appaterno'].' '.$especialistas[$i]['apmaterno'].' , '.$especialistas[$i]['nombres']),1,0);
           

            $modulo_cursando=ModuloCursando::where('matricula_id',$especialistas[$i]['idmatricula'])
                    ->where('modulo_id',$idmodulo)
                    ->get();

            if($modulo_cursando->isNotEmpty()){
                
                $materia_cursando=MateriaCursando::where('modulo_cursando_id',$modulo_cursando[0]['id'])
                    ->where('idmatricula_mat',$especialistas[$i]['idmatricula'])
                    ->get();

                if($materia_cursando->isNotEmpty()){
                    if($i==0){  
                        $materia_titulo=MateriaCursando::join('area_conocimiento','area_conocimiento.id','materia_cursando.area_conocimiento_id')->where('modulo_cursando_id',$modulo_cursando[0]['id'])
                            ->orderBy('materia_cursando.id','asc')
                            ->get();

                        $rest=0;
                        if(count($materia_titulo)>0){
                            $l=floor(154/count($materia_titulo));
                        } 

                        

                        for ($m=0; $m <count($materia_titulo); $m++) { 
                            
                            $rest=$rest+$l;

                            if($m==(count($materia_titulo)-1)){
                                $pdf::setXY(106+$l*$m,37);
                                //$pdf::setXY(106,37);
                                $pdf::MultiCell($l+(154-$rest),8,utf8_decode($materia_titulo[$m]['nombre']),1,"C",0);
                            }else{
                                $pdf::setXY(106+$l*$m,37);
                                $pdf::MultiCell($l,8,utf8_decode($materia_titulo[$m]['nombre']),1,"C",0);
                            } 

                        }

                    }

                    
                    $l=floor(154/count($materia_cursando));

                    $rest=0;
                    for ($k=0; $k <count($materia_cursando) ; $k++) { 
                      
                        $rest=$rest+$l;

                        if($k==(count($materia_cursando)-1)){
                                $pdf::setXY(106+$l*$k,45+$i*4);
                                //$pdf::setXY(106,37);
                                $pdf::MultiCell($l+(154-$rest),4,$materia_cursando[$k]['nota_aca'],1,"C",0);

                            }else{
                                $pdf::setXY(106+$l*$k,45+$i*4);
                                $pdf::MultiCell($l,4,$materia_cursando[$k]['nota_aca'],1,"C",0);
                            } 

                        $sum_aca=$sum_aca+$materia_cursando[$k]['nota_aca'];

                    }

                    $pdf::setXY(212,45+$i*4);
                  
                    $p_aca=round($sum_aca/count($materia_cursando),2);

                    $pdf::setXY(260,45+$i*4);
                    $pdf::MultiCell(10,4,number_format($p_aca,2,'.',''),1,"C",0);

                    
                    $pdf::setXY(270,45+$i*4);
                    $pdf::MultiCell(25,4,"",1,"C",0);

                    //muestra de notas
                }

            }else{
                $pdf::cell(15,4,"Ningun registro",1,0,"C");
            }   
        }

        $pdf::Ln(10);
        $pdf::SetFont('Arial','B',7); 
        $pdf::cell(140,5,"Coordinador de Modulo",0,0,"C");
        $pdf::cell(140,5,"Jefe de Departamento",0,0,"C");
        $pdf::Output();
        exit;

    }



     public function SeguimientoPdf($idpromocion, $idmodulo){


        $pdf = new Fpdf();
        $pdf::SetMargins(10,10,10); 
        $pdf::AddPage('L','A3');
        $pdf::AliasNbPages();
        $pdf::SetFont('Arial','B',13); 
        $pdf::cell(0,4,utf8_decode("SEGUIMIENTO AL MODULO"),0,0,"C");
        $pdf::SetFont('Arial','',10); 
        $pdf::Ln();
        $pdf::cell(0,4,utf8_decode("ESPECIALISTAS"),0,0,"C");

        $cabecera=CicloAcademico::where('id',$idpromocion)
            ->get();

        $modulo=Modulo::where('id',$idmodulo)->get();

        $especialistas=Matricula::join('clasifica_persona','clasifica_persona.id','matricula.clasifica_persona_id')
            ->join('persona','persona.id','clasifica_persona.persona_id')
            ->select('cedula','nombres','appaterno','apmaterno','matricula.id as idmatricula')
            ->where('matricula.anio_academico_id',$idpromocion)
            ->get();

        
        $pdf::Ln();
        $pdf::SetFont('Arial','B',10); 
        $pdf::cell(25,3,utf8_decode("PROMOCIÓN:"),0,0,"");
        $pdf::SetFont('Arial','',10); 
        $pdf::cell(90,3,utf8_decode($cabecera[0]['nro_promocion']),0,0,"");
        $pdf::SetFont('Arial','B',10); 
        $pdf::Ln();

        $pdf::cell(25,3,utf8_decode("DIVISIÓN:"),0,0,"");
        $pdf::SetFont('Arial','',10); 
        $pdf::cell(113,3,utf8_decode($cabecera[0]['division']),0,0,"");

        $pdf::Ln();
        $pdf::SetFont('Arial','B',10); 
        $pdf::cell(25,3,utf8_decode("MODULO:"),0,0,"");
        $pdf::SetFont('Arial','',10); 
        $pdf::cell(113,3,utf8_decode($modulo[0]['nombre']),0,0,"");

        $pdf::Ln(5);
        $pdf::SetFont('Arial','B',7); 
        $pdf::cell(7,16,utf8_decode("ORD"),1,0,"C");
        $pdf::cell(17,16,utf8_decode("CEDULA"),1,0,"C");
        $pdf::cell(12,16,utf8_decode("GRADO"),1,0,"C");
        $pdf::cell(60,16,utf8_decode("APELLIDOS Y NOMBRES"),1,0,"C");

        $evaluacion_formadora=1;



        $evaluacion_integradora=1;




        if($evaluacion_formadora>0) $pdf::cell(116,8,"TAREA FORMADORA",1,0,"C");
        


        if($evaluacion_integradora>0)$pdf::cell(116,8,"TAREA INTEGRADORA",1,0,"C");
        if($evaluacion_integradora>0)$pdf::MultiCell(42,8,"ACTIVIDAD INTEGRADORA",1,"C");

       

        $pdf::SetFillColor(197, 216, 237); 
     
         $pdf::setXY(380,29);
        $pdf::MultiCell(10,8,"PROM. MOD",1,"C",0);

        $pdf::setXY(390,29);

        $pdf::cell(25,16,"FIRMA",1,0,"C");

        $pdf::setXY(338,37);
        $pdf::SetFont('Arial','B',6); 
        $pdf::cell(15,8,"INDIVIDUAL",1,0,"C");
        $pdf::cell(15,8,"GRUPAL",1,0,"C");
        $pdf::cell(12,8,"ACA",1,0,"C");


        $pdf::SetFillColor(197, 216, 237); 
        $pdf::setXY(212,37);
        $pdf::MultiCell(10,8,"PROM",1,"C",1);

        $pdf::SetFillColor(197, 216, 237); 
        $pdf::setXY(328,37);
        $pdf::MultiCell(10,8,"PROM",1,"C",1);

        $pdf::SetFont('Arial','',7); 



        for ($i=0; $i <count($especialistas) ; $i++){ 
            $sum1=0;
            $sum2=0;
            $sum_aca=0;
            $sum_ef=0;

            if($i>0) $pdf::setXY(10,53+($i-1)*8);
            $pdf::cell(7,8,utf8_decode($i+1),1,0,"C");
            $pdf::cell(17,8,utf8_decode($especialistas[$i]['cedula']),1,0,"C");
            $pdf::cell(12,8,utf8_decode($cabecera[0]['grado']),1,0,"C");
            $pdf::cell(60,8,utf8_decode($especialistas[$i]['appaterno'].' '.$especialistas[$i]['apmaterno'].' , '.$especialistas[$i]['nombres']),1,0);
           

            $modulo_cursando=ModuloCursando::where('matricula_id',$especialistas[$i]['idmatricula'])
                    ->where('modulo_id',$idmodulo)
                    ->get();

            if($modulo_cursando->isNotEmpty()){
                
                $materia_cursando=MateriaCursando::where('modulo_cursando_id',$modulo_cursando[0]['id'])
                    ->where('idmatricula_mat',$especialistas[$i]['idmatricula'])
                    ->get();

                if($materia_cursando->isNotEmpty()){
                    if($i==0){
                        $materia_titulo=MateriaCursando::join('area_conocimiento','area_conocimiento.id','materia_cursando.area_conocimiento_id')->where('modulo_cursando_id',$modulo_cursando[0]['id'])
                            ->orderBy('materia_cursando.id','asc')
                            ->get();

                        $rest=0;
                        if(count($materia_titulo)>0){
                            $l=floor(106/count($materia_titulo));
                        } 

                        

                        for ($m=0; $m <count($materia_titulo); $m++) { 
                            
                            $rest=$rest+$l;

                            if($m==(count($materia_titulo)-1)){
                                $pdf::setXY(106+$l*$m,37);
                                //$pdf::setXY(106,37);
                                $pdf::MultiCell($l+(106-$rest),8,utf8_decode($materia_titulo[$m]['nombre']),1,"C",0);

                                $pdf::setXY(222+$l*$m,37);
                                //$pdf::setXY(106,37);
                                $pdf::MultiCell($l+(106-$rest),8,utf8_decode($materia_titulo[$m]['nombre']),1,"C",0);
                            }else{
                                $pdf::setXY(106+$l*$m,37);
                                $pdf::MultiCell($l,8,utf8_decode($materia_titulo[$m]['nombre']),1,"C",0);

                                $pdf::setXY(222+$l*$m,37);
                                $pdf::MultiCell($l,8,utf8_decode($materia_titulo[$m]['nombre']),1,"C",0);
                            } 

                        }


                    }

                    
                    $l=floor(106/count($materia_cursando));

                    $rest=0;
                    for ($k=0; $k <count($materia_cursando) ; $k++) { 

                      
                        $rest=$rest+$l;

                        $nota_formadora=ContenidoCursando::join('evaluacion_especialista','contenido_cursando.id','evaluacion_especialista.contenido_cursando_id')
                            ->select(DB::raw('cast(avg(nota) as decimal(18,2)) as nota'))
                            ->where('materia_cursando_id',$materia_cursando[$k]['id'])
                            ->where('tipo_nota','FORMADORA')
                            ->get();

                        $sum1=$sum1+$nota_formadora[0]['nota'];

                        $nota_integradora=ContenidoCursando::join('evaluacion_especialista','contenido_cursando.id','evaluacion_especialista.contenido_cursando_id')
                            ->select(DB::raw('cast(avg(nota) as decimal(18,2)) as nota'))
                            ->where('materia_cursando_id',$materia_cursando[$k]['id'])
                            ->where('tipo_nota','INTEGRADORA')
                            ->get();

                        $sum2=$sum2+$nota_integradora[0]['nota'];

                        if($k==(count($materia_cursando)-1)){
                                $pdf::setXY(106+$l*$k,45+$i*8);
                                //$pdf::setXY(106,37);
                                $pdf::MultiCell($l+(106-$rest),8,$nota_formadora[0]['nota'],1,"C",0);

                                $pdf::setXY(222+$l*$k,45+$i*8);
                                //$pdf::setXY(106,37);
                                $pdf::MultiCell($l+(106-$rest),8,$nota_integradora[0]['nota'],1,"C",0);
                            }else{
                                $pdf::setXY(106+$l*$k,45+$i*8);
                                $pdf::MultiCell($l,8,$nota_formadora[0]['nota'],1,"C",0);

                                $pdf::setXY(222+$l*$k,45+$i*8);
                                $pdf::MultiCell($l,8,$nota_integradora[0]['nota'],1,"C",0);
                            } 

                        $sum_aca=$sum_aca+$materia_cursando[$k]['nota_aca'];
                        $sum_ef=$sum_ef+$materia_cursando[$k]['examen_final'];

                    }

                    $pdf::setXY(212,45+$i*8);
                    $p1=round($sum1/count($materia_cursando),2);
                    $p2=round($sum2/count($materia_cursando),2);
                    $p_aca=round($sum_aca/count($materia_cursando),2);
                    $p_ef=round($sum_ef/count($materia_cursando),2);



                    $pdf::MultiCell(10,8,number_format($p1,2,'.',''),1,"C",0);

                    $pdf::setXY(328,45+$i*8);
                    $pdf::MultiCell(10,8,number_format($p2,2,'.',''),1,"C",0);

                    $pdf::setXY(338,45+$i*8);
                    $p_ind=($p1+$p2)/2;
                    $pdf::MultiCell(15,8,number_format($p_ef,2,'.',''),1,"C",0);

                    $pdf::setXY(353,45+$i*8);
                    $nota_aig=$modulo_cursando[0]['nota_aig'];
                    $pdf::MultiCell(15,8,number_format($nota_aig,2,'.',''),1,"C",0);

                    $pdf::setXY(368,45+$i*8);
                    $pdf::MultiCell(12,8,number_format($p_aca,2,'.',''),1,"C",0);

                    $pdf::setXY(380,45+$i*8);
                    $promedio=round(($p_ef*0.70+$nota_aig*0.25+$p_aca*0.05),2);
                    $pdf::MultiCell(10,8,number_format($promedio,2,'.',''),1,"C",0);

                    $pdf::setXY(390,45+$i*8);
                    $pdf::MultiCell(25,8,"",1,"C",0);


                    //muestra de notas
                }

            }else{
                $pdf::cell(15,8,"Ningun registro",1,0,"C");
            }   

              $pdf::Ln();



        }

        $pdf::Ln(15);
        $pdf::SetFont('Arial','B',7); 
        $pdf::cell(140,5,"Coordinador de Modulo",0,0,"C");
        $pdf::cell(140,5,"Jefe de Departamento",0,0,"C");


        $pdf::Output();
        exit;

    }

    public function CuadroGeneralPdf($idpromocion){

    $h=CicloAcademico::where('id',$idpromocion)->get();

    if($h->isNotEmpty()){

        Excel::create("kardex",function($excel) use($h,$idpromocion){
           
            $excel->sheet("Cuadro General",function($sheet) use($h,$idpromocion){

               
                $data=[];
                 $sheet->mergeCells("A1:E1");
                 $sheet->mergeCells("F1:AW1");
                 $sheet->mergeCells("AX1:BM1");
                 $sheet->mergeCells("BN1:BO1");
                 $sheet->mergeCells("BP1:BP7");
                 $sheet->mergeCells("BQ1:BQ7");

                 $sheet->mergeCells("A2:E4");
                 $sheet->mergeCells("A5:A7");
                 $sheet->mergeCells("B5:B7");
                 $sheet->mergeCells("C5:C7");
                 $sheet->mergeCells("D5:D7");
                 $sheet->mergeCells("E5:E7");

                 $sheet->mergeCells("F2:AM2");
                 $sheet->mergeCells("F3:AK3");

                 $sheet->mergeCells("F4:M4");
                 $sheet->mergeCells("F5:G5");
                 $sheet->mergeCells("H5:I5");
                 $sheet->mergeCells("J5:K5");
                 $sheet->mergeCells("L5:L7");
                 $sheet->mergeCells("F6:G7");
                 $sheet->mergeCells("H6:I7");
                 $sheet->mergeCells("J6:K7");
                 $sheet->mergeCells("M6:M7");



                 $sheet->mergeCells("N4:U4");
                 $sheet->mergeCells("N5:O5");
                 $sheet->mergeCells("P5:Q5");
                 $sheet->mergeCells("R5:S5");
                 $sheet->mergeCells("T5:T7");
                 $sheet->mergeCells("N6:O7");
                 $sheet->mergeCells("P6:Q7");
                 $sheet->mergeCells("R6:S7");
                 $sheet->mergeCells("U6:U7");



                 $sheet->mergeCells("V4:AC4");
                 $sheet->mergeCells("V5:W5");
                 $sheet->mergeCells("X5:Y5");
                 $sheet->mergeCells("Z5:AA5");
                 $sheet->mergeCells("AB5:AB7");
                 $sheet->mergeCells("V6:W7");
                 $sheet->mergeCells("X6:Y7");
                 $sheet->mergeCells("Z6:AA7");
                 $sheet->mergeCells("AC6:AC7");

                 $sheet->mergeCells("AD4:AK4");
                 $sheet->mergeCells("AD5:AE5");
                 $sheet->mergeCells("AF5:AG5");
                 $sheet->mergeCells("AH5:AI5");
                 $sheet->mergeCells("AD6:AE7");
                 $sheet->mergeCells("AF6:AG7");
                 $sheet->mergeCells("AH6:AI7");
                 $sheet->mergeCells("AJ5:AJ7");
                 $sheet->mergeCells("AK6:AK7");


                 $sheet->mergeCells("AL3:AL7");
                 $sheet->mergeCells("AM3:AM5");
                 $sheet->mergeCells("AM6:AM7");

                 //COEVALUACION INICIO
                 $sheet->mergeCells("AN2:AS4");
                 $sheet->mergeCells("AN5:AN7");
                 $sheet->mergeCells("AO5:AO7");
                 $sheet->mergeCells("AP5:AP7");
                 $sheet->mergeCells("AQ5:AQ7");

                 $sheet->mergeCells("AR5:AR7");
                 $sheet->mergeCells("AS5:AS6");
                 //COEVALUACION FIN

                 //PIC INICIO
                 $sheet->mergeCells("AT2:AU4");
                 $sheet->mergeCells("AT5:AT7");
                 $sheet->mergeCells("AU6:AU7");
                 //PIC FIN


                //PROM FINAL INICIO
                 $sheet->mergeCells("AV2:AV5");
                 $sheet->mergeCells("AV6:AV7");
                //PROM FINAL FIN

                //PROM FINAL INICIO
                 $sheet->mergeCells("AW2:AW6");
                //PROM FINAL FIN

                //Condicion Fisica FINAL INICIO
                 $sheet->mergeCells("AX2:BA2");
                 $sheet->mergeCells("AX3:AX7");
                 $sheet->mergeCells("AY3:AY7");
                 $sheet->mergeCells("AZ3:AZ7");
                 $sheet->mergeCells("BA3:BA5");
                 $sheet->mergeCells("BA6:BA7");
                //Condicion Fisica FINAL FIN


                 //Condicion MILITAR FINAL INICIO
                 $sheet->mergeCells("BB2:BE2");
                 $sheet->mergeCells("BB3:BB7");
                 $sheet->mergeCells("BC3:BC7");
                 $sheet->mergeCells("BD3:BD7");
                 $sheet->mergeCells("BE3:BE5");
                 $sheet->mergeCells("BE6:BE7");
                //Condicion MILITAR FINAL FIN


                //Condicion MILITAR FINAL INICIO
                 $sheet->mergeCells("BF2:BK2");
                 $sheet->mergeCells("BF3:BF7");
                 $sheet->mergeCells("BG3:BG7");
                 $sheet->mergeCells("BH3:BH7");
                 $sheet->mergeCells("BI3:BI7");
                 $sheet->mergeCells("BJ3:BJ7");
                 $sheet->mergeCells("BK3:BK5");
                 $sheet->mergeCells("BK6:BK7");
                //Condicion MILITAR FINAL FIN

                 //PROMEDIO_FINAL FINAL INICIO
                 $sheet->mergeCells("BL2:BL5");
                 $sheet->mergeCells("BL6:BL7");
                //PROMEDIO_FINAL FINAL FIN

                 //Aptitud para el servicio FINAL INICIO
                 $sheet->mergeCells("BM2:BM5");
                 $sheet->mergeCells("BM6:BM7");
                //Aptitud para el servicio FINAL FIN

                 //PROMEDIO FINAL_2 FINAL INICIO
                 $sheet->mergeCells("BN2:BN5");
                 $sheet->mergeCells("BN6:BN7");
                //PROMEDIO FINAL_2 FINAL FIN


                //Conducta INICIO
                 $sheet->mergeCells("BO2:BO5");
                 $sheet->mergeCells("BO6:BO7");
                //Conducta FIN









                $sheet->cells("A1:E1", function($cells) {
                    $cells->setBackground("#70AD47");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                   
                });

                $sheet->cells("F1:AW1", function($cells) {
                    $cells->setBackground("#FFC000");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });

                $sheet->cells("AX1:BM1", function($cells) {
                    $cells->setBackground("#FFFFFF");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });

                $sheet->cells("BN1:BO1", function($cells) {
                    $cells->setBackground("#FFFFFF");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });

                $sheet->cells("BP1:BP7", function($cells) {
                    $cells->setBackground("#FFFFFF");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });

                $sheet->cells("BQ1:BQ7", function($cells) {
                    $cells->setBackground("#FFFFFF");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });

               

                $sheet->cells("A2:E4", function($cells) {
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("A5:A7", function($cells) {
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("B5:B7", function($cells) {
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("C5:C7", function($cells) {
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("D5:D7", function($cells) {
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("E5:E7", function($cells) {
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });



                $sheet->cells("F4:M4", function($cells) {
                    $cells->setBackground("#FFFF00");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("F5:G5", function($cells) {
                    $cells->setBackground("#FFFF00");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("H5:I5", function($cells) {
                    $cells->setBackground("#FFFF00");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("J5:K5", function($cells) {
                    $cells->setBackground("#FFFF00");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("L5:L7", function($cells) {
                    $cells->setBackground("#FFFF00");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("F6:G7", function($cells) {
                    $cells->setBackground("#FFFF00");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("H6:I7", function($cells) {
                    $cells->setBackground("#FFFF00");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("J6:K7", function($cells) {
                    $cells->setBackground("#FFFF00");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("M6:M7", function($cells) {
                    $cells->setBackground("#FFFF00");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("M5", function($cells) {
                    $cells->setBackground("#FFFF00");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });




                $sheet->cells("N4:U4", function($cells) {
                    $cells->setBackground("#0070C0");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("N5:O5", function($cells) {
                    $cells->setBackground("#0070C0");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("P5:Q5", function($cells) {
                    $cells->setBackground("#0070C0");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("R5:S5", function($cells) {
                    $cells->setBackground("#0070C0");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("T5:T7", function($cells) {
                    $cells->setBackground("#0070C0");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("N6:O7", function($cells) {
                    $cells->setBackground("#0070C0");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("P6:Q7", function($cells) {
                    $cells->setBackground("#0070C0");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("R6:S7", function($cells) {
                    $cells->setBackground("#0070C0");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("U6:U7", function($cells) {
                    $cells->setBackground("#0070C0");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("U5", function($cells) {
                    $cells->setBackground("#0070C0");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });


                $sheet->cells("V4:AC4", function($cells) {
                    $cells->setBackground("#A9D08E");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("V5:W5", function($cells) {
                    $cells->setBackground("#A9D08E");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("X5:Y5", function($cells) {
                    $cells->setBackground("#A9D08E");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("Z5:AA5", function($cells) {
                    $cells->setBackground("#A9D08E");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AB5:AB7", function($cells) {
                    $cells->setBackground("#A9D08E");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("V6:W7", function($cells) {
                    $cells->setBackground("#A9D08E");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("X6:Y7", function($cells) {
                    $cells->setBackground("#A9D08E");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("Z6:AA7", function($cells) {
                    $cells->setBackground("#A9D08E");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AC6:AC7", function($cells) {
                    $cells->setBackground("#A9D08E");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AC5", function($cells) {
                    $cells->setBackground("#A9D08E");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });




                $sheet->cells("AD4:AK4", function($cells) {
                    $cells->setBackground("#9BC2E6");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AD5:AE5", function($cells) {
                    $cells->setBackground("#9BC2E6");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AF5:AG5", function($cells) {
                    $cells->setBackground("#9BC2E6");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AH5:AI5", function($cells) {
                    $cells->setBackground("#9BC2E6");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AD6:AE7", function($cells) {
                    $cells->setBackground("#9BC2E6");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AF6:AG7", function($cells) {
                    $cells->setBackground("#9BC2E6");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AH6:AI7", function($cells) {
                    $cells->setBackground("#9BC2E6");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AK6:AK7", function($cells) {
                    $cells->setBackground("#9BC2E6");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AK5", function($cells) {
                    $cells->setBackground("#9BC2E6");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AJ5:AJ7", function($cells) {
                    $cells->setBackground("#9BC2E6");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });



                $sheet->cells("AL3:AL7", function($cells) {
                    $cells->setBackground("#FFFF00");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AM3:AM5", function($cells) {
                    $cells->setBackground("#FFFF00");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AM6:AM7", function($cells) {
                    $cells->setBackground("#FFFF00");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });

                $sheet->cells("F2:AM2", function($cells) {
                    $cells->setBackground("#0070C0");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });


                //COEVALUACION INICIO
                $sheet->cells("AN2:AS4", function($cells) {
                    $cells->setBackground("#A5A5A5");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AN5:AN7", function($cells) {
                    $cells->setBackground("#A5A5A5");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AO5:AO7", function($cells) {
                    $cells->setBackground("#A5A5A5");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AP5:AP7", function($cells) {
                    $cells->setBackground("#A5A5A5");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AQ5:AQ7", function($cells) {
                    $cells->setBackground("#A5A5A5");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });


                $sheet->cells("AR5:AR7", function($cells) {
                    $cells->setBackground("#FFFF00");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AS5:AS6", function($cells) {
                    $cells->setBackground("#FFFF00");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AS7", function($cells) {
                    $cells->setBackground("#FFFF00");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });

                 //COEVALUACION FIN


                 //PIC INICIO
                $sheet->cells("AT2:AU4", function($cells) {
                    $cells->setBackground("#00CCFF");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AT5:AT7", function($cells) {
                    $cells->setBackground("#00CCFF");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AU6:AU7", function($cells) {
                    $cells->setBackground("#00CCFF");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                 $sheet->cells("AU5", function($cells) {
                    $cells->setBackground("#00CCFF");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                 //PIC FIN



                 //PROM FINAL INICIO
                $sheet->cells("AV2:AV5", function($cells) {
                    $cells->setBackground("#F4B084");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AV6:AV7", function($cells) {
                    $cells->setBackground("#F4B084");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                
                //PROM FINAL FIN

                //PROM FINAL INICIO
                
                $sheet->cells("AW2:AW6", function($cells) {
                    $cells->setBackground("#FFFF00");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AW7", function($cells) {
                    $cells->setBackground("#FFFF00");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                //PROM FINAL FIN

                //Condicion Fisica FINAL INICIO
                $sheet->cells("AX2:BA2", function($cells) {
                    $cells->setBackground("#CCFF66");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AX3:AX7", function($cells) {
                    $cells->setBackground("#CCFF66");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AY3:AY7", function($cells) {
                    $cells->setBackground("#CCFF66");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("AZ3:AZ7", function($cells) {
                    $cells->setBackground("#CCFF66");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("BA3:BA5", function($cells) {
                    $cells->setBackground("#CCFF66");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("BA6:BA7", function($cells) {
                    $cells->setBackground("#CCFF66");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                //Condicion Fisica FINAL FIN


                 //Condicion MILITAR FINAL INICIO
                $sheet->cells("BB2:BE2", function($cells) {
                    $cells->setBackground("#CCFF66");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("BB3:BB7", function($cells) {
                    $cells->setBackground("#CCFF66");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("BC3:BC7", function($cells) {
                    $cells->setBackground("#CCFF66");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("BD3:BD7", function($cells) {
                    $cells->setBackground("#CCFF66");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("BE3:BE5", function($cells) {
                    $cells->setBackground("#CCFF66");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("BE6:BE7", function($cells) {
                    $cells->setBackground("#CCFF66");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                //Condicion MILITAR FINAL FIN


                //Condicion MILITAR FINAL INICIO
                
                $sheet->cells("BF2:BK2", function($cells) {
                    $cells->setBackground("#2F75B5");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("BF3:BF7", function($cells) {
                    $cells->setBackground("#2F75B5");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("BG3:BG7", function($cells) {
                    $cells->setBackground("#2F75B5");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("BH3:BH7", function($cells) {
                    $cells->setBackground("#2F75B5");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("BI3:BI7", function($cells) {
                    $cells->setBackground("#2F75B5");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("BJ3:BJ7", function($cells) {
                    $cells->setBackground("#2F75B5");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("BK3:BK5", function($cells) {
                    $cells->setBackground("#2F75B5");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("BK6:BK7", function($cells) {
                    $cells->setBackground("#2F75B5");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                //Condicion MILITAR FINAL FIN

                 //PROMEDIO_FINAL FINAL INICIO
                $sheet->cells("BL2:BL5", function($cells) {
                    $cells->setBackground("#ED7D31");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("BL6:BL7", function($cells) {
                    $cells->setBackground("#ED7D31");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                //PROMEDIO_FINAL FINAL FIN

                 //Aptitud para el servicio FINAL INICIO
                $sheet->cells("BM2:BM5", function($cells) {
                    $cells->setBackground("#FFFF00");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("BM6:BM7", function($cells) {
                    $cells->setBackground("#FFFF00");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                //Aptitud para el servicio FINAL FIN

                 //PROMEDIO FINAL_2 FINAL INICIO
                 #00B050
                $sheet->cells("BN2:BN5", function($cells) {
                    $cells->setBackground("#00B050");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("BN6:BN7", function($cells) {
                    $cells->setBackground("#00B050");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });

                //PROMEDIO FINAL_2 FINAL FIN


                //Conducta INICIO
                 #FFFF00
                $sheet->cells("BO2:BO5", function($cells) {
                    $cells->setBackground("#FFFF00");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                $sheet->cells("BO6:BO7", function($cells) {
                    $cells->setBackground("#FFFF00");
                    $cells->setBorder('thin','thin','thin','thin');
                    $cells->setValignment('center');
                });
                //Conducta FIN




                
                $sheet->setWidth(array(
                    'A'     => 4,
                    'B'     =>  16,
                    'C'     =>  8,
                    'D'     =>  6,
                    'E'     =>  44,
                    'F'     =>  7.43,
                    'G'     =>  7.71,
                    'H'     =>  7.57,
                    'I'     =>  6.45,
                    'J'     =>  8.14,
                    'K'     =>  7.43,

                    'L'     =>  7.29,
                    'M'     =>  12.57,
                    'N'     =>  8.86,
                    'O'     =>  9,
                    'P'     =>  9.29,
                    'Q'     =>  8.71,
                    'R'     =>  7.14,
                    'S'     =>  6.71,
                    'T'     =>  7.57,
                    'U'     =>  9.14,
                    'V'     =>  9.57,
                    'W'     =>  9,
                    'X'     =>  6.57,
                    'Y'     =>  8.29,
                    'Z'     =>  7,

                    'AA'     => 7.71,
                    'AB'     =>  7,
                    'AC'     =>  6.57,
                    'AD'     =>  7.71,
                    'AE'     =>  7.71,
                    'AF'     =>  6.57,
                    'AG'     =>  8.29,
                    'AH'     =>  7,
                    'AI'     =>  7.86,
                    'AJ'     =>  7,
                    'AK'     =>  7.57,
                    'AL'     => 8.43,
                    'AM'     =>  7.14,
                    'AN'     =>  7.14,
                    'AO'     =>  7.43,
                    'AP'     =>  6.86,
                    'AQ'     =>  6.86,
                    'AR'     =>  8.71,
                    'AR'     =>  6.71,
                    'AS'     =>  7,
                    'AT'     =>  7,
                    'AU'     =>  8,
                    'AV'     =>  7.71,
                    'AW'     =>  7.57,
                    'AX'     =>  8.43,
                    'AY'     =>  9.29,
                    'AZ'     =>  7.29,
                    'BA'     =>  7.43,
                    'BB'     =>  9.43,
                    'BC'     =>  7.43,
                    'BD'     =>  9.86,
                    'BE'     =>  7.43,
                    'BF'     =>  8.43,
                    'BG'     =>  8.14,
                    'BH'     =>  8.14,
                    'BI'     =>  7.43,
                    'BJ'     =>  8.71,
                    'BK'     =>  6,
                    'BL'     =>  7.43,
                    'BM'     =>  5.71,
                    'BN'     =>  12,
                    'BO'     =>  10.14,
                    'BP'     =>  11.71,
                    'BQ'     =>  26
                ));
                

                $sheet->setHeight(array(
                    1=>25,
                    2=>40,
                    3=>16,
                    4=>32,
                    5=>111,
                    6=>23,
                    7=>27

                ));

               


                $sheet->getStyle("F5")->getAlignment()->setTextRotation(90);
                $sheet->getStyle("F5")->getAlignment()->setWrapText(90);

                $sheet->getStyle("H5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("H5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("J5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("J5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("L5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("L5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("M5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("M5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("N5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("N5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("P5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("P5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("R5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("R5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("T5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("T5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("U5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("U5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("V5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("V5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("X5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("X5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("Z5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("Z5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("AB5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("AB5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("AC5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("AC5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("AD5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("AD5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("AF5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("AF5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("AH5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("AH5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("AI5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("AI5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("AK5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("AK5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("AL3")->getAlignment()->setWrapText(90);
                $sheet->getStyle("AL3")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("AM3")->getAlignment()->setWrapText(90);
                $sheet->getStyle("AM3")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("AN5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("AN5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("AO5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("AO5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("AP5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("AP5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("AQ5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("AQ5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("AR5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("AR5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("AS5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("AS5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("AT5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("AT5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("AU5")->getAlignment()->setWrapText(90);
                $sheet->getStyle("AU5")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("AV2")->getAlignment()->setWrapText(90);
                $sheet->getStyle("AV2")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("AE2")->getAlignment()->setWrapText(90);
                $sheet->getStyle("AW2")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("AX3")->getAlignment()->setWrapText(90);
                $sheet->getStyle("AX3")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("AY3")->getAlignment()->setWrapText(90);
                $sheet->getStyle("AY3")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("AZ3")->getAlignment()->setWrapText(90);
                $sheet->getStyle("AZ3")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("BA3")->getAlignment()->setWrapText(90);
                $sheet->getStyle("BA3")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("BB3")->getAlignment()->setWrapText(90);
                $sheet->getStyle("BB3")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("BC3")->getAlignment()->setWrapText(90);
                $sheet->getStyle("BC3")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("BD3")->getAlignment()->setWrapText(90);
                $sheet->getStyle("BD3")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("BE3")->getAlignment()->setWrapText(90);
                $sheet->getStyle("BE3")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("BF3")->getAlignment()->setWrapText(90);
                $sheet->getStyle("BF3")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("BG3")->getAlignment()->setWrapText(90);
                $sheet->getStyle("BG3")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("BH3")->getAlignment()->setWrapText(90);
                $sheet->getStyle("BH3")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("BI3")->getAlignment()->setWrapText(90);
                $sheet->getStyle("BI3")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("BJ3")->getAlignment()->setWrapText(90);
                $sheet->getStyle("BJ3")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("BK3")->getAlignment()->setWrapText(90);
                $sheet->getStyle("BK3")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("BL2")->getAlignment()->setWrapText(90);
                $sheet->getStyle("BL2")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("BM2")->getAlignment()->setWrapText(90);
                $sheet->getStyle("BM2")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("BN2")->getAlignment()->setWrapText(90);
                $sheet->getStyle("BN2")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("BO2")->getAlignment()->setWrapText(90);
                $sheet->getStyle("BO2")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("BP1")->getAlignment()->setWrapText(90);
                $sheet->getStyle("BP1")->getAlignment()->setTextRotation(90);

                $sheet->getStyle("BQ1")->getAlignment()->setWrapText(90);
                $sheet->getStyle("BQ1")->getAlignment()->setTextRotation(90);


               // $sheet->getStyle("N5")->getAlignment()->setWrapText(90);






   
               // 




             

                array_push($data,array('CURSO FORMACION ESPECIALISTAS','','','','','EVALUACION DEL APRENDIZAJE','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','APTITUD PARA EL SERVICIO','','','','','','','','','','','','','','','CONDUCTA','','','CALIFICACION FINAL','TOME CONOCIMIENTO'));

                 array_push($data,array('DIVISION MIKE','','','','','RENDIMIENTO ACADEMICO','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','COEVALUACION','','','','','','PIC','','PROMEDIO FINAL','EVALUACIÓN DEL APRENDIZAJE','CONDICIÓN FISICA','','','','INSTRUCCIÓN MILITAR','','','','CARACTERISTICA PERSONAL','','','','','','PROMEDIO FINAL','CONDUCTA','PROMEDIO FINAL','APTITUD PARA EL SERVICIO','PROMEDIO FINAL','CONDUCTA','','',''));

                 array_push($data,array('','','','','','ACTIVIDAD INTEGRADORA MÓDULO 1-2-3-4','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','NOTA ACTIVIDAD INTEGRADORA','RENDIMIENTO ACADEMICO','','','','','','','','','','','PRIMERA NOTA','SEGUNDA NOTA','PROMEDIO','PONDERACIÓN','PRIMERA NOTA','SEGUNDA NOTA','PROMEDIO','PONDERACIÓN','MODULO 1','MODULO 2','MODULO 3','MODULO 4','PROMEDIO','PONDERACION','','','','','','','','','','','','','','','','','','',''));

                array_push($data,array('','','','','','MODULO 1','','','','','','','','MODULO 2','','','','','','','','MODULO 3','','','','','','','','MODULO 4','','','','','','','','ACTIVIDAD INTEGRADORA','RENDIMIENTO ACADEMICO','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''));

                array_push($data,array('N°','CEDULA','GRADO','ESP.','APELLIDOS Y NOMBRES','ACTIVIDAD INTEGRADORA     INDIVIDUAL','','ACTIVIDAD INTEGRADORA       GRUPAL','','ACTITUD      ANDRAGOGICA','','NOTA   MODULO 1','COEFICIENTE                    MODULO 1','ACTIVIDAD INTEGRADORA     INDIVIDUAL','','ACTIVIDAD INTEGRADORA       GRUPAL','','ACTITUD      ANDRAGOGICA','','NOTA   MODULO 2','COEFICIENTE                    MODULO 2','ACTIVIDAD INTEGRADORA     INDIVIDUAL','','ACTIVIDAD INTEGRADORA       GRUPAL','','ACTITUD      ANDRAGOGICA','','NOTA   MODULO 3','COEFICIENTE                    MODULO 3','ACTIVIDAD INTEGRADORA     INDIVIDUAL','','ACTIVIDAD INTEGRADORA       GRUPAL','','ACTITUD      ANDRAGOGICA','','NOTA   MODULO 4','COEFICIENTE                    MODULO 4','','','COEVALUACION                         MODULO 1','COEVALUACION                              MODULO 2','COEVALUACION                         MODULO 3','COEVALUACION                         MODULO 4','PROMEDIO COEVALUACION','PONDERACION              COEVALUACION','NOTA PIC','PONDERACION PIC','','','','','','','','','','','','','','','','','','','','','','','',''));

                array_push($data,array('','','','','','75%','','20%','','5%','','','?_4','75%','','20%','','5%','','','?_8','75%','','20%','','5%','','','?_12','75%','','20%','','5%','','','?_16','','90%','','','','','','','','9%','NOTA','','','','','35%','','','','35%','','','','','','30%','NOTA','20%','NOTA','20%','','','',''));

                array_push($data,array('','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','1%','','','','60%','','','','','','','','','','','','','','','','','','','','','',''));

                $sheet->fromArray($data,null,'A1',false,false);
            });

        })->download('xlsx');
    }
}


}
