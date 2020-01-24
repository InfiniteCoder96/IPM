<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Policy extends Model
{
    protected $fillable = [
        'topic', 'content', 'price', 'addons'
    ];

    public function Addons(){
        return $this->hasOne(Policy_Addon::class,'id','addons');
    }
}
