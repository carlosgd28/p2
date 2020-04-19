<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contenido extends Model
{
    public $timestamps=false;
    protected $table='contenido';
    protected $fillable=['id','nombre','estado','area_conocimiento_id'];

    
}
