<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Auditoria extends Model
{
    public $timestamps=false;
    protected $table='auditoria';
    protected $fillable=['id','nombre_tabla','usuario_operacion','fecha_registro','tipo_operacion','observacion','nombre_pc'];
}
