<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    public function run()
    {
        $now = now();

        $users = [
            [
                'name' => '出品者A',
                'email' => 'seller_a@example.com',
            ],
            [
                'name' => '出品者B',
                'email' => 'seller_b@example.com',
            ],
            [
                'name' => 'ユーザーC',
                'email' => 'user_c@example.com',
            ],
        ];

        foreach ($users as $user) {
            $exists = DB::table('users')->where('email', $user['email'])->exists();

            if ($exists) {
                DB::table('users')
                    ->where('email', $user['email'])
                    ->update([
                        'name' => $user['name'],
                        'password' => Hash::make('password'),
                        'updated_at' => $now,
                    ]);
            } else {
                DB::table('users')->insert([
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'password' => Hash::make('password'),
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }
    }
}
