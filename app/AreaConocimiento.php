<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AreaConocimiento extends Model
{
    public $timestamps=false;
    protected $table='area_conocimiento';
    protected $fillable=['id','nombre','estado','modulo_id'];

    public function Modulo(){
	   	return $this->belongsTo('App\Modulo','modulo_id','id');
	}

}
