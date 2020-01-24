<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Policy_Addon extends Model
{
    protected $fillable = [
        'name', 'price'
    ];

    public function Policies(){
        return $this->hasMany(Policy_Addon::class,'addons','id');
    }
}
