<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CicloAcademico extends Model
{
    public $timestamps=false;
    protected $table='anio_academico';
    protected $fillable=['id','nro_promocion','division','grado','estado_ac'];


	public function AnioAcademico(){
	   	return $this->belongsTo('App\Referencia','anio_academico_id','id');
	}

	public function Periodo(){
	   	return $this->belongsTo('App\Referencia','periodo_tiempo_id','id');
	}

	public function TipoEstudiante(){
	   	return $this->belongsTo('App\Referencia','tipo_estudiante','id');
	}

	public function Promocion(){
	   	return $this->belongsTo('App\Referencia','promocion_id','id');
	}


	public function Division(){
	   	return $this->belongsTo('App\Referencia','division_id','id');
	}

	public function Especialidad(){
	   	return $this->belongsTo('App\Referencia','especialidad_id','id');
	}

}
