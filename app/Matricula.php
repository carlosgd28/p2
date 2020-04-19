<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Matricula extends Model
{
    public $timestamps=false;
    protected $table='matricula';
    protected $fillable=['id','anio_academico_id','clasifica_persona_id','estado_mat','nota_pic','nota_cf1','nota_cf2','nota_im1','nota_im2','nota_conducta'];
}
