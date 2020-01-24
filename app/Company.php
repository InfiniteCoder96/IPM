<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{

    protected $fillable = [
        'comp_name', 'comp_address', 'comp_logo', 'policy_ids'
    ];

    public function Policies(){
        return $this->hasOne(Policy::class,'id','policy_ids');
    }


}
