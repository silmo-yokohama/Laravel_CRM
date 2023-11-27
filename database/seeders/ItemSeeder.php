<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Now()->format('Y-m-d H:i:s');
        DB::table('items')->insert([
            [
                'name'  => 'テーマ１',
                'memo'  => 'WordPressテーマのカスタマイズ',
                'price' => 50000,
                'is_deleted' => 0,
                'created_at' => $now,
                'updated_at' => $now,

            ],
            [
                'name'  => 'テーマ２',
                'memo'  => 'WordPressテーマのカスタマイズ',
                'price' => 80000,
                'is_deleted' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name'  => 'テーマ３',
                'memo'  => 'WordPressテーマのカスタマイズ',
                'price' => 30000,
                'is_deleted' => 0,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name'  => 'テーマ４',
                'memo'  => 'WordPressテーマのカスタマイズ',
                'price' => 49800,
                'is_deleted' => 0,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name'  => 'テーマ５',
                'memo'  => 'WordPressテーマのカスタマイズ',
                'price' => 15000,
                'is_deleted' => 0,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name'  => 'テーマ６',
                'memo'  => 'WordPressテーマのカスタマイズ',
                'price' => 30000,
                'is_deleted' => 0,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name'  => 'テーマ７',
                'memo'  => 'WordPressテーマのカスタマイズ',
                'price' => 10000,
                'is_deleted' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name'  => 'テーマ８',
                'memo'  => 'WordPressテーマのカスタマイズ',
                'price' => 20000,
                'is_deleted' => 0,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name'  => 'テーマ９',
                'memo'  => 'WordPressテーマのカスタマイズ',
                'price' => 30000,
                'is_deleted' => 0,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name'  => 'テーマ１０',
                'memo'  => 'WordPressテーマのカスタマイズ',
                'price' => 25000,
                'is_deleted' => 0,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
