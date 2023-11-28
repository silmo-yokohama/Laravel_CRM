<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $fillable = ['name','kana','email','tel','postcode','address','birthday','gender','memo'];

    function scopeSearchCustomer($query ,$searchInput = null) {
        if(!empty($searchInput)) {
            if(Customer::where('kana' ,'like' ,'%'.$searchInput.'%')->orWhere('tel' ,'like' ,$searchInput . '%')) {
                return $query->where('kana' ,'like' ,$searchInput.'%')->orWhere('tel' ,'like' ,$searchInput . '%')->where('is_deleted','=' ,false);
            }
        }
    }
}
