<?php

namespace App\Http\Controllers;
use App\Persona;
use App\ClasificaPersona;
use App\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;  

class PersonaController extends Controller
{
    public function Nuevo(Request $request){

    	$hoy=date('Y-m-d H:i:s');
    	$dia=date('Y-m-d');
        $anio=date('Y');

    	

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

    	

    	$cp=new ClasificaPersona();
    	$cp->fecha_registro=$dia;
    	$cp->tipo_persona=$request['tipo'];
    	$cp->titulo='';
    	$cp->estado="A";
    	$cp->persona_id=$p->id;
        $cp->idusuario9=$request['idusuario'];
    	$cp->save();

        $nameuser=substr($request['nombres'],0,3).substr($request['appaterno'],0,3);
        $codacceso='$'.$p->cedula;
        $roluser=0;


        if($request['tipo']=='DOCENTE') $roluser=2;
        else if($request['tipo']=='SECRETARIA') $roluser=3;
        else if($request['tipo']=='ADMINISTRADOR') $roluser=1;
        else if($request['tipo']=='JEFE DEPARTAMENTO') $roluser=5;

        $usuario=new User();
        $usuario->name=$nameuser;
        $usuario->email=$request['correo'];
        $usuario->password=bcrypt($codacceso);
        $usuario->codigo=$codacceso;
        $usuario->estado="A";
        $usuario->rol=$roluser;
        $usuario->clasifica_persona_id=$cp->id;
        $usuario->save();

    	return 1;
    }

    public function Modificar(Request $request){
    	Persona::where('id',$request['id'])->update([
            'nombres'=>$request['nombres'],
            'appaterno'=>$request['appaterno'],
            'apmaterno'=>$request['apmaterno'],
            'celular'=>$request['celular'],
            'correo'=>$request['correo'],
            'direccion'=>$request['direccion'],
            'estado_civil'=>$request['estado_civil'],
            'genero'=>$request['genero'],
        ]);


        return 1;
    }

    public function Activar(Request $request){
        Persona::where('id',$request['idpersona'])->update([
            'estado'=>"A"
        ]);

        ClasificaPersona::where('persona_id',$request['idpersona'])->update([
            'estado'=>"A"
        ]);


        return 1;
    }

    public function Desactivar(Request $request){
        Persona::where('id',$request['idpersona'])->update([
            'estado'=>"I"
        ]);

        ClasificaPersona::where('persona_id',$request['idpersona'])->update([
            'estado'=>"I"
        ]);


        return 1;
    }

    public function Obtener(Request $request){
    	$person=Persona::with('clasificacion')
            ->paginate(5);

    	return [
            'pagination'  =>[
                'total'=>$person->total(),
                'current_page'=>$person->currentPage(),
                'per_page'=>$person->perPage(),
                'last_page'=>$person->lastPage(),
                'from'=>$person->firstItem(),
                'to'=>$person->lastPage()
            ],
            'persons'=>$person
        ];
    }   

    public function Consultar(Request $request){
    	$p=Persona::where('cedula',$request['cedula'])->get();
    	return $p;
    }

    public function GetUser(Request $request){
        $u=User::join('clasifica_persona','users.clasifica_persona_id','clasifica_persona.id')
            ->join('persona','clasifica_persona.persona_id','persona.id')
            ->select('users.id as idusuario','persona.id as idpersona','name','email','password','users.estado as estadousuario','rol','cedula','nombres','appaterno','apmaterno','celular','correo','direccion','persona.estado as estadopersona','fecha_registro','codigo')
            ->get();

        return $u;
    }
}
