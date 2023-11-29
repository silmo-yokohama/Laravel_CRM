<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'is_cancelled'
    ];


    function customer() {
        return $this->belongsTo(Customer::class);
    }

    function items() {
        return $this->belongsToMany(Item::class)->withPivot('count');
    }
}
