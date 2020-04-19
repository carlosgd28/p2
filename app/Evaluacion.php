<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Evaluacion extends Model
{
    public $timestamps=false;
    protected $table='evaluacion';
    protected $fillable=['id','tipo','contenido_asignado_id','estado_eval'];
}
