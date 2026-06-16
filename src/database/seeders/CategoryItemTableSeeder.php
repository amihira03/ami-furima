<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Item;
use App\Models\Category;

class CategoryItemTableSeeder extends Seeder
{
    public function run()
    {
        $now = now();

        $assignments = [
            '腕時計' => ['ファッション', 'メンズ'],
            'HDD' => ['家電'],
            '革靴' => ['ファッション', 'メンズ'],
            'ノートPC' => ['家電'],
            'マイク' => ['家電'],
            'ショルダーバッグ' => ['ファッション', 'レディース'],
            'タンブラー' => ['キッチン'],
            'コーヒーミル' => ['キッチン'],
            'メイクセット' => ['コスメ', 'レディース'],
        ];

        $categoryIds = Category::pluck('id', 'name')->toArray();

        $rows = [];
        $itemIds = [];

        foreach ($assignments as $itemName => $categoryNames) {
            $item = Item::where('name', $itemName)->first();

            if (!$item) {
                continue;
            }

            $itemIds[] = $item->id;

            foreach ($categoryNames as $categoryName) {
                $categoryId = $categoryIds[$categoryName] ?? null;

                if (!$categoryId) {
                    continue;
                }

                $rows[] = [
                    'item_id' => $item->id,
                    'category_id' => $categoryId,
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
            }
        }

        if (!empty($itemIds)) {
            DB::table('category_items')->whereIn('item_id', array_unique($itemIds))->delete();
        }

        if (!empty($rows)) {
            DB::table('category_items')->insert($rows);
        }
    }
}
