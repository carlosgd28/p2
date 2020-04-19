<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClasificaPersona extends Model
{
    public $timestamps=false;
    protected $table='clasifica_persona';
    protected $fillable=['id','fecha_registro','tipo_persona','estado','persona_id','titulo','idusuario9'];
}
