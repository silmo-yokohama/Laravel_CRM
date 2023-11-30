<?php

namespace App\Models;

use App\Models\Scopes\Subtotal;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    function scopeSearchOrder($query ,$searchInput = null) {
        if(!empty($searchInput)) {
            if(Order::where('name' ,'like' ,'%'.$searchInput.'%')) {
                return $query->where('name' ,'like' ,'%'.$searchInput.'%');
            }
        }
    }


    protected static function booted() {
        static::addGlobalScope(new Subtotal);
    }
}
