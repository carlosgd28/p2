<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ModuloCursando extends Model
{
    public $timestamps=false;
    protected $table='modulo_cursando';
    protected $fillable=['id','modulo_id','matricula_id','estado_mc','caract_personal_nota','coevaluacion','nombre_modulo','eval_cursando','nota_aig'];
}
