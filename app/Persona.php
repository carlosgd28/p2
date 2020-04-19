<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Persona extends Model
{
    public $timestamps=false;
    protected $table='persona';
    protected $fillable=['id','cedula','nombres','appaterno','apmaterno','celular','correo','direccion','estado','fecha_nacimiento','estado_civil','genero','fecharegistro','idusuario1'];

   	 public function clasificacion(){
    	return $this->hasMany('App\ClasificaPersona','persona_id');
    }
}
