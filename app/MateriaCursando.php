<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MateriaCursando extends Model
{
    public $timestamps=false;
    protected $table='materia_cursando';
    protected $fillable=['id','modulo_cursando_id','area_conocimiento_id','estado_matc','examen_final','nota_aca','idmatricula_mat','nombre_area'];
}
