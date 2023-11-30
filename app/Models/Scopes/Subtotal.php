<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class Subtotal implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model): void
    {
        $query =
            "SELECT
                p.id as id ,
                ip.id as pivot_id ,
                i.id as item_id ,
                i.price as price ,
                ip.count as count ,
                i.price * ip.count as subtotal ,
                c.name as customer_name,
                p.is_cancelled ,
                p.created_at
            FROM purchases AS p
                LEFT JOIN item_purchase as ip
                    ON p.id = ip.purchase_id
                LEFT JOIN items AS i
                    ON ip.item_id = i.id
                LEFT JOIN customers AS c
                    ON p.customer_id = c.id
            WHERE p.is_deleted = false";

        $builder->fromSub($query ,'history');
    }
}
