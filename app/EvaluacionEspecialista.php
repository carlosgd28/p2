<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EvaluacionEspecialista extends Model
{
    public $timestamps=false;
    protected $table='evaluacion_especialista';
    protected $fillable=['id','nota','contenido_cursando_id','evaluacion_id','tipo_nota','idmatricula_eval'];
}
