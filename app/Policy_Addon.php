<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Policy_Addon extends Model
{
    protected $table = 'policy_addons';

    protected $fillable = [
        'name', 'description', 'price'
    ];

    public function Policies(){
        return $this->hasMany(Policy::class,'addons','id');
    }
}
