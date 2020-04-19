<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DocenteArea extends Model
{
     public $timestamps=false;
    protected $table='docentearea';
    protected $fillable=['id','id_clasifica_persona','anio_academico_id','area_conocimiento_id','estado_da'];


    public function Promocion(){
	   	return $this->belongsTo('App\CicloAcademico','anio_academico_id','id');
	}

	public function Area(){
	   	return $this->belongsTo('App\AreaConocimiento','area_conocimiento_id','id');
	}
}
