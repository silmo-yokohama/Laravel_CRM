<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Item;
use App\Models\Purchase;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            UserSeeder::class,
            ItemSeeder::class,

        ]);

        $items = Item::all();

        \App\Models\Customer::factory(1000)->create();
        Purchase::factory(100)->create()->each(function(Purchase $purchase) use ($items){
            $purchase->items()->attach(
                $items->random(rand(1,5))->pluck('id')->toArray(),
                ['count' => rand(1,3)]
            );
        } );
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
