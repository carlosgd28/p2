<?php

namespace App\Http\Controllers;
use App\Persona;
use App\ClasificaPersona;
use App\User;
use App\Matricula;
use App\CicloAcademico;
use App\Modulo;
use App\ModuloCursando;
use App\AreaConocimiento;
use App\MateriaCursando;
use App\ContenidoAsignado;
use App\DocenteArea;
use App\Evaluacion;
use App\ContenidoCursando;
use App\EvaluacionEspecialista;
use Illuminate\Http\Request;

class MatriculaController extends Controller
{
    public function Nuevo(Request $request){
        $reg_persona=Persona::where('cedula',$request['cedula'])->get();
        $count_matricula=0;
        if($reg_persona->isNotEmpty()){
            //si existe persona
                $cp=ClasificaPersona::where('tipo_persona','ESPECIALISTA')
                    ->where('persona_id',$reg_persona[0]['id'])
                    ->get();

                if($cp->isNotEmpty()) $count_matricula=Matricula::where('clasifica_persona_id',$cp[0]['id'])
                    ->where('anio_academico_id',$request['idciclo'])
                    ->count();

                if($count_matricula>0) return "repetido";


                if($cp->isNotEmpty() && $count_matricula==0){
                    $ciclo=CicloAcademico::where('id',$request['idciclo'])->get();


                    //si existe
                    $m=new Matricula();
                    $m->estado_mat='A';
                    $m->clasifica_persona_id=$cp[0]['id'];
                    $m->anio_academico_id=$request['idciclo'];
                    $m->nota_pic=0;
                    $m->nota_cf1=0;
                    $m->nota_cf2=0;
                    $m->nota_im1=0;
                    $m->nota_im2=0;
                    $m->nota_conducta=0;
                    $m->save();

                    $modulos=Modulo::get();

                    for ($i=0; $i <count($modulos) ; $i++) { 
                        
                        $modc=new ModuloCursando();
                        $modc->modulo_id=$modulos[$i]['id'];
                        $modc->matricula_id=$m->id;
                        $modc->estado_mc='A';
                        $modc->caract_personal_nota=0;
                        $modc->coevaluacion_nota=0;
                        $modc->nota_aig=0;
                        $modc->save();

                        $areas=AreaConocimiento::where('modulo_id',$modulos[$i]['id'])->get();

                        for ($j=0; $j <count($areas) ; $j++) { 
                            $matc=new MateriaCursando();
                            $matc->modulo_cursando_id=$modc->id;
                            $matc->area_conocimiento_id=$areas[$j]['id'];
                            $matc->estado_matc='A';
                            $matc->nota_aca=0;
                            $matc->examen_final=0;
                            $matc->idmatricula_mat=$m->id;
                            $matc->save();
                        }
                    }

                    //creacion de usuario
                      
                        $usuario=new User();
                        $usuario->name=$request['cedula'];
                        $usuario->email=$request['correo'];
                        $usuario->password=bcrypt($request['cedula']);
                        $usuario->codigo=$request['cedula'];
                        $usuario->estado="A";
                        $usuario->rol=4;
                        $usuario->clasifica_persona_id=$cp[0]['id'];
                        $usuario->save();

                }else{
                    //no existe
                    $hoy=date('Y-m-d');
                    $cp=new ClasificaPersona();
                    $cp->fecha_registro=$hoy;
                    $cp->tipo_persona='ESPECIALISTA';
                    $cp->estado='A';
                    $cp->persona_id=$reg_persona[0]['id'];
                    $cp->titulo='';
                    $cp->idusuario9=$request['idusuario'];
                    $cp->save();

                    $ciclo=CicloAcademico::where('id',$request['idciclo'])->get();


                    $m=new Matricula();
                    $m->estado_mat='A';
                    $m->clasifica_persona_id=$cp->id;
                    $m->anio_academico_id=$request['idciclo'];
                    $m->nota_pic=0;
                    $m->nota_cf1=0;
                    $m->nota_cf2=0;
                    $m->nota_im1=0;
                    $m->nota_im2=0;
                    $m->nota_conducta=0;
                    $m->save();

                    
                    $modulos=Modulo::get();

                    for ($i=0; $i <count($modulos) ; $i++) { 
                        
                        $modc=new ModuloCursando();
                        $modc->modulo_id=$modulos[$i]['id'];
                        $modc->matricula_id=$m->id;
                        $modc->estado_mc='A';
                        $modc->caract_personal_nota=0;
                        $modc->coevaluacion_nota=0;
                        $modc->nota_aig=0;
                        $modc->save();

                        $areas=AreaConocimiento::where('modulo_id',$modulos[$i]['id'])->get();

                        for ($j=0; $j <count($areas) ; $j++) { 
                            $matc=new MateriaCursando();
                            $matc->modulo_cursando_id=$modc->id;
                            $matc->area_conocimiento_id=$areas[$j]['id'];
                            $matc->estado_matc='A';
                            $matc->nota_aca=0;
                            $matc->examen_final=0;
                            $matc->idmatricula_mat=$m->id;
                            $matc->save();
                        }

                    }

                    //craeacion de usuario
                        $usuario=new User();
                        $usuario->name=$request['cedula'];
                        $usuario->email=$request['correo'];
                        $usuario->password=bcrypt($request['cedula']);
                        $usuario->codigo=$request['cedula'];
                        $usuario->estado="A";
                        $usuario->rol=4;
                        $usuario->clasifica_persona_id=$cp->id;
                        $usuario->save();
                }
            

        }else{
            //si no existe persona
            $hoy=date('Y-m-d H:i:s');
            $p=new Persona();
            $p->cedula=$request['cedula'];
            $p->nombres=$request['nombres'];
            $p->appaterno=$request['appaterno'];
            $p->apmaterno=$request['apmaterno'];
            $p->celular=$request['celular'];
            $p->correo=$request['correo'];
            $p->direccion=$request['direccion'];
            $p->estado="A";
            $p->fecha_nacimiento=$request['fecha_nacimiento'];
            $p->estado_civil=$request['estado_civil'];
            $p->genero=$request['genero'];
            $p->fecharegistro=$hoy;
            $p->idusuario1=$request['idusuario'];
            $p->save();

        
            $dia=date('Y-m-d');
            $cp=new ClasificaPersona();
            $cp->fecha_registro=$dia;
            $cp->tipo_persona='ESPECIALISTA';
            $cp->titulo='';
            $cp->estado="A";
            $cp->persona_id=$p->id;
            $cp->idusuario9=$request['idusuario'];
            $cp->save();


             $ciclo=CicloAcademico::where('id',$request['idciclo'])->get();


                    $m=new Matricula();
                    $m->estado_mat='A';
                    $m->clasifica_persona_id=$cp->id;
                    $m->anio_academico_id=$request['idciclo'];
                    $m->nota_pic=0;
                    $m->nota_cf1=0;
                    $m->nota_cf2=0;
                    $m->nota_im1=0;
                    $m->nota_im2=0;
                    $m->nota_conducta=0;
                    $m->save();

                    
                    $modulos=Modulo::get();

                    for ($i=0; $i <count($modulos) ; $i++) { 
                        
                        $modc=new ModuloCursando();
                        $modc->modulo_id=$modulos[$i]['id'];
                        $modc->matricula_id=$m->id;
                        $modc->estado_mc='A';
                        $modc->caract_personal_nota=0;
                        $modc->coevaluacion_nota=0;
                        $modc->nota_aig=0;
                        $modc->save();

                        $areas=AreaConocimiento::where('modulo_id',$modulos[$i]['id'])->get();

                        for ($j=0; $j <count($areas) ; $j++) { 
                            $matc=new MateriaCursando();
                            $matc->modulo_cursando_id=$modc->id;
                            $matc->area_conocimiento_id=$areas[$j]['id'];
                            $matc->estado_matc='A';
                            $matc->nota_aca=0;
                            $matc->examen_final=0;
                            $matc->idmatricula_mat=$m->id;
                            $matc->save();
                        }

                    }
                    //craeacion de usuario  
                        $usuario=new User();
                        $usuario->name=$request['cedula'];
                        $usuario->email=$request['correo'];
                        $usuario->password=bcrypt($request['cedula']);
                        $usuario->codigo=$request['cedula'];
                        $usuario->estado="A";
                        $usuario->rol=4;
                        $usuario->clasifica_persona_id=$cp->id;
                        $usuario->save();
        }

        return 1;
    }

    public function GetDatosEstudiante(Request $request){
        $estudiante=Matricula::join('clasifica_persona','clasifica_persona.id','matricula.clasifica_persona_id')
            ->join('persona','persona.id','clasifica_persona.persona_id')
            ->select('matricula.codigo as codigomatricula','cedula','nombres','appaterno','apmaterno')
            ->where('matricula.id',$request['idmatricula'])
            ->get();

        return $estudiante;
    }

    public function Get(Request $request){
        $m=Matricula::join('clasifica_persona','matricula.clasifica_persona_id','clasifica_persona.id')
            ->join('persona','persona.id','clasifica_persona.persona_id')
            ->select('matricula.estado_mat as estadomatricula','anio_academico_id','matricula.id as idmatricula','nombres','appaterno','apmaterno','cedula')
            ->where('anio_academico_id',$request['idciclo'])
            ->orderBy('matricula.id','desc')
            ->paginate(8);

        return [
            'pagination'  =>[
                'total'=>$m->total(),
                'current_page'=>$m->currentPage(),
                'per_page'=>$m->perPage(),
                'last_page'=>$m->lastPage(),
                'from'=>$m->firstItem(),
                'to'=>$m->lastPage()
            ],
            'matriculas'=>$m
        ];
    }   

    public function GetEvaluacion(Request $request){
        $m=Matricula::select('id','nota_pic','nota_cf1','nota_cf2','nota_im1','nota_im2','nota_conducta')->where('id',$request['idmatricula'])->get();

        return $m;
    }

    public function RegistrarEvaluacion(Request $request){
        Matricula::where('id',$request['id'])
            ->update([
                'nota_pic'=>$request['nota_pic'],
                'nota_cf1'=>$request['nota_cf1'],
                'nota_cf2'=>$request['nota_cf2'],
                'nota_im1'=>$request['nota_im1'],
                'nota_im2'=>$request['nota_im2'],
                'nota_conducta'=>$request['nota_conducta'],
            ]);

        return 1;
    }

    public function GetModulos(Request $request){
        $mc=ModuloCursando::join('modulo','modulo_cursando.modulo_id','modulo.id')
            ->select('nombre','modulo_cursando.id as idmc','caract_personal_nota','coevaluacion_nota','nota_aig')
            ->where('matricula_id',$request['idmatricula'])->get();
        return $mc;
    }

    public function RegistrarNotaModulo(Request $request){
        ModuloCursando::where('id',$request['id'])
            ->update([
                'caract_personal_nota'=>$request['caract_personal_nota'],
                'coevaluacion_nota'=>$request['coevaluacion_nota'],
                'nota_aig'=>$request['nota_aig'],
            ]);

        return 1;
    }

    public function GetMateria(Request $request){
        $materias=MateriaCursando::join('area_conocimiento','area_conocimiento.id','materia_cursando.area_conocimiento_id')
            ->select('materia_cursando.id as idmc','nombre','nota_aca')
            ->where('modulo_cursando_id',$request['idmodulo'])->get();

        return $materias;

    }

    public function RegistrarNotaMateria(Request $request){
        MateriaCursando::where('id',$request['id'])
            ->update([
                'nota_aca'=>$request['nota_aca']
            ]);

        return 1;
    }

    public function GetMatriculadosMateria(Request $request){
        $docente_area=DocenteArea::where('id',$request['iddocentearea'])->get();


        $matriculados= Matricula::join('clasifica_persona','clasifica_persona.id','matricula.clasifica_persona_id')
            ->join('persona','persona.id','clasifica_persona.persona_id')
            ->select('cedula','nombres','appaterno','apmaterno','matricula.id as idmatricula')
            ->where('anio_academico_id',$docente_area[0]['anio_academico_id'])
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
}
