<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Horario extends Model
{
    public $timestamps=false;
    protected $table='horario';
    protected $fillable=['id','fecha_registro','inicio','termino','estado','area_conocimiento_id','idusuario7','dia','id_anio_academico'];
}
