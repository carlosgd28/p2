<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ContenidoCursando extends Model
{
    public $timestamps=false;
    protected $table='contenido_cursando';
    protected $fillable=['id','materia_cursando_id','contenido_asignado_id','nombre_contenido','idmatricula_cont'];
}
