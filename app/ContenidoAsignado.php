<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ContenidoAsignado extends Model
{
    public $timestamps=false;
    protected $table='contenido_asignado';
    protected $fillable=['id','contenido_id','docentearea_id','estado_ca'];

     public function Evaluacion(){
    	return $this->hasMany('App\Evaluacion','contenido_asignado_id');
    }
}
