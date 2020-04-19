<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Modulo extends Model
{
    public $timestamps=false;
    protected $table='modulo';
    protected $fillable=['id','nombre','competencia','objetivo','estado','eval'];
}
