<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class ItemTableSeeder extends Seeder
{
    public function run()
    {
        $sellerA = User::where('email', 'seller_a@example.com')->first();
        $sellerB = User::where('email', 'seller_b@example.com')->first();

        if (!$sellerA || !$sellerB) {
            return;
        }

        $conditionMap = DB::table('conditions')->pluck('id', 'name')->toArray();

        $now = now();

        $items = [
            [
                'user_id' => $sellerA->id,
                'name' => '腕時計',
                'brand_name' => 'Rolax',
                'description' => 'スタイリッシュなデザインのメンズ腕時計',
                'price' => 15000,
                'condition_id' => $conditionMap['良好'],
                'image_path' => 'images/goods/watch.jpg',
                'shipping_postal_code' => null,
                'shipping_address' => null,
                'shipping_building' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'user_id' => $sellerA->id,
                'name' => 'HDD',
                'brand_name' => '西芝',
                'description' => '高速で信頼性の高いハードディスク',
                'price' => 5000,
                'condition_id' => $conditionMap['目立った傷や汚れなし'],
                'image_path' => 'images/goods/hdd.jpg',
                'shipping_postal_code' => null,
                'shipping_address' => null,
                'shipping_building' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'user_id' => $sellerA->id,
                'name' => '玉ねぎ',
                'brand_name' => 'なし',
                'description' => '新鮮な玉ねぎ3個',
                'price' => 300,
                'condition_id' => $conditionMap['やや傷や汚れあり'],
                'image_path' => 'images/goods/onion.jpg',
                'shipping_postal_code' => null,
                'shipping_address' => null,
                'shipping_building' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'user_id' => $sellerA->id,
                'name' => '革靴',
                'brand_name' => null,
                'description' => 'クラシックなデザインの革靴',
                'price' => 4000,
                'condition_id' => $conditionMap['状態が悪い'],
                'image_path' => 'images/goods/leathershoes.jpg',
                'shipping_postal_code' => null,
                'shipping_address' => null,
                'shipping_building' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'user_id' => $sellerA->id,
                'name' => 'ノートPC',
                'brand_name' => null,
                'description' => '高性能なノートパソコン',
                'price' => 45000,
                'condition_id' => $conditionMap['良好'],
                'image_path' => 'images/goods/notePC.jpg',
                'shipping_postal_code' => null,
                'shipping_address' => null,
                'shipping_building' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'user_id' => $sellerB->id,
                'name' => 'マイク',
                'brand_name' => 'なし',
                'description' => '高音質のレコーディング用マイク',
                'price' => 8000,
                'condition_id' => $conditionMap['目立った傷や汚れなし'],
                'image_path' => 'images/goods/mike.jpg',
                'shipping_postal_code' => null,
                'shipping_address' => null,
                'shipping_building' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'user_id' => $sellerB->id,
                'name' => 'ショルダーバッグ',
                'brand_name' => null,
                'description' => 'おしゃれなショルダーバッグ',
                'price' => 3500,
                'condition_id' => $conditionMap['やや傷や汚れあり'],
                'image_path' => 'images/goods/shoulderbag.jpg',
                'shipping_postal_code' => null,
                'shipping_address' => null,
                'shipping_building' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'user_id' => $sellerB->id,
                'name' => 'タンブラー',
                'brand_name' => 'なし',
                'description' => '使いやすいタンブラー',
                'price' => 500,
                'condition_id' => $conditionMap['状態が悪い'],
                'image_path' => 'images/goods/tumbler.jpg',
                'shipping_postal_code' => null,
                'shipping_address' => null,
                'shipping_building' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'user_id' => $sellerB->id,
                'name' => 'コーヒーミル',
                'brand_name' => 'Starbacks',
                'description' => '手動のコーヒーミル',
                'price' => 4000,
                'condition_id' => $conditionMap['良好'],
                'image_path' => 'images/goods/coffeemill.jpg',
                'shipping_postal_code' => null,
                'shipping_address' => null,
                'shipping_building' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'user_id' => $sellerB->id,
                'name' => 'メイクセット',
                'brand_name' => null,
                'description' => '便利なメイクアップセット',
                'price' => 2500,
                'condition_id' => $conditionMap['目立った傷や汚れなし'],
                'image_path' => 'images/goods/makeset.jpg',
                'shipping_postal_code' => null,
                'shipping_address' => null,
                'shipping_building' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        $itemNames = array_column($items, 'name');
        DB::table('items')->whereIn('name', $itemNames)->delete();

        DB::table('items')->insert($items);
    }
}
